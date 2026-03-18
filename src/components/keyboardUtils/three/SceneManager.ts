import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import KeyManager from '@/components/keyboardUtils/three/key/KeyManager';
import CaseManager from '@/components/keyboardUtils/three/case/CaseManager';
import {
  loadColorway,
  type KeyboardSettings,
} from '@/components/keyboardUtils/config/settings';
import store from '@/components/keyboardUtils/store/store';
// @ts-expect-error - redux-subscriber doesn't have types
import { subscribe } from 'redux-subscriber';
import { setColorway } from '@/components/keyboardUtils/store/slices/colorways';
import {
  setPrimaryColor,
  setColorSecondary,
  setStyle,
  setBezel,
  setLayout,
  setProfile as setCaseProfile,
  setMaterial,
  setAutoColor,
} from '@/components/keyboardUtils/store/slices/case';
import {
  setProfile as setKeyProfile,
  setLegendPrimaryStyle,
  setLegendSecondaryStyle,
  toggleVisible,
} from '@/components/keyboardUtils/store/slices/keys';

// Define Redux state type based on store structure
interface ReduxState {
  settings: KeyboardSettings['settings'];
  case: KeyboardSettings['case'];
  keys: KeyboardSettings['keys'];
  switches: KeyboardSettings['switches'];
  colorways: KeyboardSettings['colorways'];
}

interface Colorway {
  id: string;
  label: string;
  manufacturer: string;
  swatches: {
    base: { background: string; color: string };
    mods: { background: string; color: string };
    accent: { background: string; color: string };
    accent2: { background: string; color: string };
  };
  override: Record<string, string>;
}

export default class SceneManager {
  element: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  keyManager: KeyManager | null;
  caseManager: CaseManager | null;
  animationId: number | null;
  settings: KeyboardSettings;
  colorway: Colorway | null;
  initialCameraPosition: THREE.Vector3;
  initialControlsTarget: THREE.Vector3;
  isResetting: boolean;
  resetProgress: number;
  startResetPosition: THREE.Vector3;
  startResetTarget: THREE.Vector3;
  isDragging: boolean;
  unsubscribeStore: (() => void) | null;

  constructor(
    element: HTMLElement,
    customSettings?: Partial<KeyboardSettings>
  ) {
    this.element = element;
    this.animationId = null;
    this.keyManager = null;
    this.caseManager = null;
    this.isResetting = false;
    this.resetProgress = 0;
    this.startResetPosition = new THREE.Vector3();
    this.startResetTarget = new THREE.Vector3();
    this.isDragging = false;
    this.unsubscribeStore = null;

    // Get settings from Redux store or use custom settings
    const reduxState = store.getState();
    this.settings = customSettings
      ? (customSettings as KeyboardSettings)
      : {
          settings: reduxState.settings,
          case: reduxState.case,
          keys: reduxState.keys,
          switches: reduxState.switches,
          colorways: reduxState.colorways,
        };

    // If custom settings provided, dispatch them to Redux store
    if (customSettings) {
      this.dispatchInitialSettings(customSettings);
    }

    this.colorway = null;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = null;

    // Camera
    const aspect = element.clientWidth / element.clientHeight;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    // Start at a default position (will be updated by fitCameraToKeyboard)
    this.camera.position.set(-5, 10, 8);
    this.camera.lookAt(0, 1, 2.5); // Look at keyboard center

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(element.clientWidth, element.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Enable proper texture rendering
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    element.appendChild(this.renderer.domElement);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.target.set(0, 1, 2.5); // Look at keyboard center

    // Disable zoom
    this.controls.enableZoom = false;

    // Enable rotation with left mouse button (instead of right click)
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };

    // Store initial camera position and controls target for reset
    this.initialCameraPosition = new THREE.Vector3();
    this.initialControlsTarget = new THREE.Vector3();

    // Track dragging state
    this.controls.addEventListener('start', () => {
      this.isDragging = true;
      this.isResetting = false; // Cancel any ongoing reset
    });

    this.controls.addEventListener('end', () => {
      this.isDragging = false;
    });

    // Lighting
    this.setupLighting();

    // Initialize keyboard components (async)
    this.initializeKeyboard();

    // Subscribe to Redux store changes
    this.setupStoreSubscription();

    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  mergeSettings(
    defaults: KeyboardSettings,
    custom: Partial<KeyboardSettings>
  ): KeyboardSettings {
    return {
      settings: { ...defaults.settings, ...(custom.settings || {}) },
      case: { ...defaults.case, ...(custom.case || {}) },
      keys: { ...defaults.keys, ...(custom.keys || {}) },
      switches: { ...defaults.switches, ...(custom.switches || {}) },
      colorways: { ...defaults.colorways, ...(custom.colorways || {}) },
    };
  }
  fitCameraToKeyboard() {
    // Calculate bounding box of the keyboard (and everything in scene)
    const box = new THREE.Box3();
    box.setFromObject(this.scene);

    if (box.isEmpty()) return;

    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // 1. Center the controls target
    this.controls.target.copy(center);
    this.initialControlsTarget.copy(center);

    // 2. Adjust camera position to fit the object
    // We want to maintain a fixed "top-down angled" direction
    // Direction vector roughly (0, 0.8, 1) to match previous aesthetic
    const direction = new THREE.Vector3(0, 1, 1).normalize();

    // Use box dimensions for a tighter rectangular fit
    // This allows zooming in more on rectangular objects compared to a bounding sphere
    const vFov = this.camera.fov * (Math.PI / 180);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * this.camera.aspect);

    // Calculate vertical distance (fitting depth)
    // We use size.z as a safe approximation of projected height.
    // Since the camera is angled, the visible height is actually less than size.z (foreshortening),
    // so this is a conservative fitting that ensures the whole depth is visible.
    const distV = size.z / 2 / Math.tan(vFov / 2);

    // Calculate horizontal distance (fitting width)
    // Add extra buffer to x-axis (e.g. 15%) to ensure side padding
    const distH = (size.x * 1.15) / 2 / Math.tan(hFov / 2);

    // Use the larger distance to ensure both width and height fit
    const distance = Math.max(distV, distH);

    // Add minimal global padding (mostly for Y axis)
    const padding = 1.1;
    const finalDistance = distance * padding;

    // Set new camera position
    this.camera.position
      .copy(center)
      .add(direction.multiplyScalar(finalDistance));

    // Update initial position reference
    this.initialCameraPosition.copy(this.camera.position);

    // Ensure camera is looking at the target
    this.camera.lookAt(center);
    this.controls.update();
  }

  setupStoreSubscription() {
    // Subscribe to all relevant state changes
    this.unsubscribeStore = subscribe(
      'colorways.active',
      (state: ReduxState) => {
        const newColorway = state.colorways.active;
        if (newColorway !== this.settings.colorways.active) {
          this.handleColorwayChange(newColorway);
        }
      }
    );

    // Subscribe to case changes
    const caseUnsubscribe = subscribe('case', (state: ReduxState) => {
      this.settings.case = state.case;
      this.handleCaseChange();
    });

    // Subscribe to keys changes
    const keysUnsubscribe = subscribe('keys', (state: ReduxState) => {
      this.settings.keys = state.keys;
      this.handleKeysChange();
    });

    // Combine all unsubscribe functions
    const originalUnsubscribe = this.unsubscribeStore;
    this.unsubscribeStore = () => {
      if (originalUnsubscribe) originalUnsubscribe();
      caseUnsubscribe();
      keysUnsubscribe();
    };
  }

  dispatchInitialSettings(settings: Partial<KeyboardSettings>) {
    // Dispatch all initial settings to Redux store
    if (settings.colorways?.active) {
      store.dispatch(setColorway(settings.colorways.active));
    }

    if (settings.case) {
      if (settings.case.primaryColor) {
        store.dispatch(setPrimaryColor(settings.case.primaryColor));
      }
      if (settings.case.colorSecondary) {
        store.dispatch(setColorSecondary(settings.case.colorSecondary));
      }
      if (settings.case.style) {
        store.dispatch(setStyle(settings.case.style));
      }
      if (settings.case.bezel !== undefined) {
        store.dispatch(setBezel(settings.case.bezel));
      }
      if (settings.case.layout) {
        store.dispatch(setLayout(settings.case.layout));
      }
      if (settings.case.profile) {
        store.dispatch(setCaseProfile(settings.case.profile));
      }
      if (settings.case.material) {
        store.dispatch(setMaterial(settings.case.material));
      }
      if (settings.case.autoColor !== undefined) {
        store.dispatch(setAutoColor(settings.case.autoColor));
      }
    }

    if (settings.keys) {
      if (settings.keys.profile) {
        store.dispatch(setKeyProfile(settings.keys.profile));
      }
      if (settings.keys.legendPrimaryStyle) {
        store.dispatch(setLegendPrimaryStyle(settings.keys.legendPrimaryStyle));
      }
      if (settings.keys.legendSecondaryStyle) {
        store.dispatch(
          setLegendSecondaryStyle(settings.keys.legendSecondaryStyle)
        );
      }
    }
  }

  async handleColorwayChange(newColorwayId: string) {
    this.settings.colorways.active = newColorwayId;
    this.colorway = await loadColorway(newColorwayId);

    // Recreate key manager with new colorway
    if (this.keyManager) {
      this.keyManager.dispose();
      this.keyManager = null;
    }

    if (this.colorway) {
      this.keyManager = new KeyManager(
        this.scene,
        this.settings,
        this.colorway
      );
    }
  }

  handleCaseChange() {
    // Recreate case manager
    if (this.caseManager) {
      this.caseManager.dispose();
      this.caseManager = null;
    }

    this.caseManager = new CaseManager(this.scene, this.settings);

    // Update fit after case and potentially keys are updated
    // Small delay ensures keys/layout updates are processed
    setTimeout(() => {
      this.fitCameraToKeyboard();
    }, 50);
  }

  handleKeysChange() {
    // Recreate key manager with updated settings
    if (this.keyManager && this.colorway) {
      this.keyManager.dispose();
      this.keyManager = null;

      this.keyManager = new KeyManager(
        this.scene,
        this.settings,
        this.colorway
      );
    }
  }

  async initializeKeyboard() {
    // Load colorway based on settings
    this.colorway = await loadColorway(this.settings.colorways.active);

    // Create keyboard components with settings
    this.caseManager = new CaseManager(this.scene, this.settings);

    // Only create KeyManager if colorway loaded successfully
    if (this.colorway) {
      this.keyManager = new KeyManager(
        this.scene,
        this.settings,
        this.colorway
      );
    }

    // Fit camera to the newly initialized keyboard
    this.fitCameraToKeyboard();
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    this.scene.add(ambientLight);

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);

    // Back light
    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(0, 5, -10);
    this.scene.add(backLight);
  }

  handleResize() {
    const width = this.element.clientWidth;
    const height = this.element.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);

    // Recalculate component fit on resize
    this.fitCameraToKeyboard();
  }

  resetKeyboardOrientation() {
    // Capture current position at the moment reset starts
    this.startResetPosition.copy(this.camera.position);
    this.startResetTarget.copy(this.controls.target);

    // Start smooth reset animation
    this.isResetting = true;
    this.resetProgress = 0;
  }

  isOutOfPosition(): boolean {
    // Check if camera or target is out of original position
    const positionThreshold = 0.01;
    const targetThreshold = 0.01;

    const positionDistance = this.camera.position.distanceTo(
      this.initialCameraPosition
    );
    const targetDistance = this.controls.target.distanceTo(
      this.initialControlsTarget
    );

    return (
      positionDistance > positionThreshold || targetDistance > targetThreshold
    );
  }

  updateReset() {
    // If not dragging and out of position, start reset
    if (!this.isDragging && !this.isResetting && this.isOutOfPosition()) {
      this.resetKeyboardOrientation();
    }

    if (!this.isResetting) return;

    // Smoothly interpolate back to original position
    this.resetProgress += 0.03; // Speed of reset animation

    // Use easing function for smooth deceleration
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const t = Math.min(easeOutCubic(this.resetProgress), 1);

    // Interpolate camera position from start to initial
    this.camera.position.lerpVectors(
      this.startResetPosition,
      this.initialCameraPosition,
      t
    );

    // Interpolate controls target from start to initial
    this.controls.target.lerpVectors(
      this.startResetTarget,
      this.initialControlsTarget,
      t
    );

    // Check if reset is complete
    if (this.resetProgress >= 1) {
      this.isResetting = false;
      this.camera.position.copy(this.initialCameraPosition);
      this.controls.target.copy(this.initialControlsTarget);
    }

    this.controls.update();
  }

  tick() {
    this.animationId = requestAnimationFrame(this.tick.bind(this));

    // Update reset animation
    this.updateReset();

    // Update controls
    this.controls.update();

    // Update keys animation (only if initialized)
    if (this.keyManager) {
      this.keyManager.update();
    }

    // Render
    this.renderer.render(this.scene, this.camera);
  }

  // Trigger a key press animation programmatically
  triggerKeyPress(keyCode: string) {
    if (!this.keyManager) return;

    const key = this.keyManager.getKey(keyCode);
    if (key) {
      key.setState(3); // KEYSTATES.MOVING_DOWN

      // Auto-release after a short delay
      setTimeout(() => {
        if (key) {
          key.setState(2); // KEYSTATES.MOVING_UP
        }
      }, 150);
    }
  }

  async updateSettings(newSettings: KeyboardSettings) {
    // Update settings via Redux store dispatch
    // The store subscriptions will handle recreating components automatically

    // Update colorway if changed
    if (
      newSettings.colorways?.active &&
      newSettings.colorways.active !== this.settings.colorways.active
    ) {
      store.dispatch(setColorway(newSettings.colorways.active));
    }

    // Update case settings
    if (newSettings.case) {
      if (newSettings.case.primaryColor !== this.settings.case.primaryColor) {
        store.dispatch(setPrimaryColor(newSettings.case.primaryColor));
      }
      if (
        newSettings.case.colorSecondary !== this.settings.case.colorSecondary
      ) {
        store.dispatch(setColorSecondary(newSettings.case.colorSecondary));
      }
      if (newSettings.case.style !== this.settings.case.style) {
        store.dispatch(setStyle(newSettings.case.style));
      }
      if (newSettings.case.bezel !== this.settings.case.bezel) {
        store.dispatch(setBezel(newSettings.case.bezel));
      }
      if (newSettings.case.layout !== this.settings.case.layout) {
        store.dispatch(setLayout(newSettings.case.layout));
      }
      if (newSettings.case.profile !== this.settings.case.profile) {
        store.dispatch(setCaseProfile(newSettings.case.profile));
      }
      if (newSettings.case.material !== this.settings.case.material) {
        store.dispatch(setMaterial(newSettings.case.material));
      }
      if (newSettings.case.autoColor !== this.settings.case.autoColor) {
        store.dispatch(setAutoColor(newSettings.case.autoColor));
      }
    }

    // Update keys settings
    if (newSettings.keys) {
      if (newSettings.keys.profile !== this.settings.keys.profile) {
        store.dispatch(setKeyProfile(newSettings.keys.profile));
      }
      if (
        newSettings.keys.legendPrimaryStyle !==
        this.settings.keys.legendPrimaryStyle
      ) {
        store.dispatch(
          setLegendPrimaryStyle(newSettings.keys.legendPrimaryStyle)
        );
      }
      if (
        newSettings.keys.legendSecondaryStyle !==
        this.settings.keys.legendSecondaryStyle
      ) {
        store.dispatch(
          setLegendSecondaryStyle(newSettings.keys.legendSecondaryStyle)
        );
      }
      if (
        newSettings.keys.visible !== this.settings.keys.visible &&
        newSettings.keys.visible !== undefined
      ) {
        store.dispatch(toggleVisible());
      }
    }

    // The Redux subscriptions will handle updating the scene automatically
  }

  destroy() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }

    // Unsubscribe from Redux store
    if (this.unsubscribeStore) {
      this.unsubscribeStore();
      this.unsubscribeStore = null;
    }

    window.removeEventListener('resize', this.handleResize.bind(this));

    // Dispose of keyboard components
    if (this.keyManager) {
      this.keyManager.dispose();
    }
    if (this.caseManager) {
      this.caseManager.dispose();
    }

    this.renderer.dispose();
    this.element.removeChild(this.renderer.domElement);
  }
}
