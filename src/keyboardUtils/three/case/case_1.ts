import * as THREE from 'three';
import store from '../../store/store';
import holes from './holes';

interface Layout {
  width: number;
  height: number;
}

const createCase = (layout: Layout, color?: string) => {
  const finalColor = color || '#cccccc';
  const cornerRadius = 0.5;
  const bevel = 0.05;
  const bezel = 0.5;
  const height = 1;
  const width = layout.width + bezel * 2;
  const depth = layout.height + bezel * 2;
  const size = store.getState().case.layout;

  //create geometry
  const shape = new THREE.Shape();

  //basic outline
  shape.moveTo(0, cornerRadius);
  shape.quadraticCurveTo(0, 0, cornerRadius, 0);
  shape.lineTo(width - cornerRadius, 0);
  shape.quadraticCurveTo(width, 0, width, cornerRadius);
  shape.lineTo(width, depth - cornerRadius);
  shape.quadraticCurveTo(width, depth, width - cornerRadius, depth);
  shape.lineTo(cornerRadius, depth);
  shape.quadraticCurveTo(0, depth, 0, depth - cornerRadius);
  shape.lineTo(0, cornerRadius);

  shape.holes = holes(size, layout, bezel);

  const extrudeOptions = {
    depth: height,
    steps: 1,
    bevelSegments: 1,
    bevelEnabled: true,
    bevelSize: bevel,
    bevelThickness: bevel,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);

  // Note: faceVertexUvs and faces are deprecated in newer Three.js versions
  // This code may need updating for the current Three.js geometry system
  // which uses BufferGeometry and does not have faces property

  //create mesh
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: finalColor })
  );
  mesh.name = 'CASE';
  mesh.rotation.x = Math.PI / 2;
  mesh.position.set(-bezel, 0, -bezel);

  return mesh;
};

export default createCase;
