import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import KeyManager from '@/src/three/key/KeyManager';
import CaseManager from '@/src/three/case/CaseManager';

export default class SceneManager {
  element: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  keyManager: KeyManager;
  caseManager: CaseManager;
  animationId: number | null;

  constructor(element: HTMLElement) {
    this.element = element;
    this.animationId = null;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = null;

    // Camera
    const aspect = element.clientWidth / element.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.set(0, 8, 10);
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
    this.controls.minDistance = 5;
    this.controls.maxDistance = 30;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.target.set(0, 1, 2.5); // Look at keyboard center

    // Lighting
    this.setupLighting();

    // Create keyboard components
    this.caseManager = new CaseManager(this.scene);
    this.keyManager = new KeyManager(this.scene);

    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this));
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

  tick() {
    this.animationId = requestAnimationFrame(this.tick.bind(this));

    // Update controls
    this.controls.update();

    // Update keys animation
    this.keyManager.update();

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
