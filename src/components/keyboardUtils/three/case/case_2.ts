import * as THREE from 'three';
import store from '../../store/store';
import holes from './holes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCase = (layout: any, color?: string) => {
  color = color || '#cccccc';
  const cornerRadius = 0;
  const bevel = 0.04;
  const bezel = 0.25;
  const height = 1;
  const width = layout.width + bezel * 2;
  const depth = layout.height + bezel * 2;
  const size = store.getState().case.layout;

  //create geometry
  const shape = new THREE.Shape();

  //basic outline
  shape.moveTo(0, cornerRadius);
  shape.lineTo(width - cornerRadius, 0);
  shape.lineTo(width, depth - cornerRadius);
  shape.lineTo(cornerRadius, depth);
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

  // Note: Modern Three.js uses BufferGeometry which doesn't have vertices, faces, or faceVertexUvs
  // This code may need to be updated for the current Three.js version
  // For now, keeping the structure but removing the old API calls

  //create mesh
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: color })
  );
  mesh.name = 'CASE';
  mesh.rotation.x = Math.PI / 2;
  mesh.position.set(-bezel, 0, -bezel);

  return mesh;
};

export default createCase;
