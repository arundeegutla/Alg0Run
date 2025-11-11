import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import KeyManager from '@/keyboardUtils/three/key/KeyManager';
import CaseManager from '@/keyboardUtils/three/case/CaseManager';
import {
  loadDefaultSettings,
  loadColorway,
  type KeyboardSettings,
} from '@/keyboardUtils/config/settings';

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

  constructor(element: HTMLElement) {
    this.element = element;
    this.animationId = null;
    this.keyManager = null;
    this.caseManager = null;
    this.isResetting = false;
    this.resetProgress = 0;
    this.startResetPosition = new THREE.Vector3();
    this.startResetTarget = new THREE.Vector3();
    this.isDragging = false;

    // Load settings from default config
    this.settings = loadDefaultSettings();
    this.colorway = null;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = null;

    // Camera
    const aspect = element.clientWidth / element.clientHeight;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    // Start at a rotated position for initial animation
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
    // (this is the final/original position, not the starting position)
    this.initialCameraPosition = new THREE.Vector3(0, 8, 10);
    this.initialControlsTarget = new THREE.Vector3(0, 1, 2.5);

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

    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this));
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

  destroy() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.renderer.dispose();
    this.element.removeChild(this.renderer.domElement);
  }
}
