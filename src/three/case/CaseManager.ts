import * as THREE from 'three';
import { LAYOUT_65 } from '@/src/config/keyboard';

export default class CaseManager {
  scene: THREE.Scene;
  group: THREE.Group;
  layout: typeof LAYOUT_65;
  color: string;
  bezel: number;
  height: number;
  angle: number;
  caseMesh!: THREE.Mesh;
  plate!: THREE.Mesh;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'CASE';
    this.layout = LAYOUT_65;
    this.color = '#f5f5f5'; // Light grey/white matte case
    this.bezel = 0.5;
    this.height = 1;
    this.angle = 6;
    this.setup();
  }

  get width() {
    return this.layout.width + this.bezel * 2;
  }

  get depth() {
    return this.layout.height + this.bezel * 2;
  }

  get angleOffset() {
    return Math.sin((this.angle * Math.PI) / 180) * this.depth;
  }

  setup() {
    this.createCase();
    this.createPlate();
    this.position();
    this.scene.add(this.group);
  }

  position() {
    this.group.rotation.x = (this.angle * Math.PI) / 180;
    this.group.position.x = -this.layout.width / 2;
    this.group.position.y = this.angleOffset + this.height;
  }

  createCase() {
    // Angular tray-mount case
    const caseWidth = this.width;
    const caseDepth = this.depth;
    const caseHeight = 0.8;
    const wallThickness = 0.3;

    // Outer shape
    const outerShape = new THREE.Shape();
    outerShape.moveTo(-caseWidth / 2, -caseDepth / 2);
    outerShape.lineTo(caseWidth / 2, -caseDepth / 2);
    outerShape.lineTo(caseWidth / 2, caseDepth / 2);
    outerShape.lineTo(-caseWidth / 2, caseDepth / 2);
    outerShape.lineTo(-caseWidth / 2, -caseDepth / 2);

    // Inner cutout (hollow case)
    const innerShape = new THREE.Shape();
    const innerWidth = caseWidth - wallThickness * 2;
    const innerDepth = caseDepth - wallThickness * 2;
    innerShape.moveTo(-innerWidth / 2, -innerDepth / 2);
    innerShape.lineTo(innerWidth / 2, -innerDepth / 2);
    innerShape.lineTo(innerWidth / 2, innerDepth / 2);
    innerShape.lineTo(-innerWidth / 2, innerDepth / 2);
    innerShape.lineTo(-innerWidth / 2, -innerDepth / 2);

    outerShape.holes.push(innerShape);

    // Extrude settings
    const extrudeSettings = {
      depth: caseHeight,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 2,
    };

    const geometry = new THREE.ExtrudeGeometry(outerShape, extrudeSettings);

    // Matte finish material
    const material = new THREE.MeshStandardMaterial({
      color: this.color,
      roughness: 1.0, // Matte finish
      metalness: 0,
    });

    this.caseMesh = new THREE.Mesh(geometry, material);
    this.caseMesh.rotation.x = -Math.PI / 2;
    this.caseMesh.position.y = -caseHeight;
    this.caseMesh.position.x = caseWidth / 2 - this.bezel;
    this.caseMesh.position.z = caseDepth / 2 - this.bezel;
    this.caseMesh.castShadow = true;
    this.caseMesh.receiveShadow = true;

    this.group.add(this.caseMesh);
  }

  createPlate() {
    // Black mounting plate
    const plateWidth = this.width - this.bezel * 2;
    const plateDepth = this.depth - this.bezel * 2;

    const geometry = new THREE.PlaneGeometry(plateWidth, plateDepth);
    const material = new THREE.MeshLambertMaterial({
      color: 0x000000,
    });

    this.plate = new THREE.Mesh(geometry, material);
    this.plate.rotation.x = -Math.PI / 2;
    this.plate.name = 'PLATE';
    this.plate.position.set(plateWidth / 2, -0.5, plateDepth / 2);

    this.group.add(this.plate);
  }
}
