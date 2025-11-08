import * as THREE from 'three';

const GUTTER = 0.05;
const CORNER = 0.05;
const INSET = 0.15;
const INSET_TOP = 0.05;

interface GeometryOptions {
  w: number;
  h: number;
  row: number;
}

const computedGeometries: Record<string, THREE.BufferGeometry> = {};

// Cherry profile key geometry
export const keyGeometry = (opts: GeometryOptions): THREE.BufferGeometry => {
  const key = `key${opts.w}${opts.h}${opts.row}`;

  if (computedGeometries[key]) {
    return computedGeometries[key].clone();
  }

  const w = opts.w - GUTTER;
  const d = opts.h - GUTTER;
  const h = 0.5;
  const i = INSET;
  const it = INSET_TOP;

  // Simplified geometry - just create a chamfered box
  // Bottom is full size, top is inset
  const geometry = new THREE.BufferGeometry();

  const vertices = new Float32Array([
    // Bottom face (4 vertices)
    0,
    0,
    0, // 0
    w,
    0,
    0, // 1
    w,
    0,
    d, // 2
    0,
    0,
    d, // 3

    // Top face (4 vertices) - inset
    i,
    h,
    it, // 4
    w - i,
    h,
    it, // 5
    w - i,
    h,
    d - it, // 6
    i,
    h,
    d - it, // 7
  ]);

  const indices = [
    // Top face (using material 1) - 2 triangles = 6 indices
    // Reversed winding order so texture faces outward
    4, 6, 5, 4, 7, 6,

    // Bottom face (using material 0) - 2 triangles = 6 indices
    0, 2, 1, 0, 3, 2,

    // Side faces (using material 0) - 4 sides × 2 triangles = 24 indices
    // Front
    0, 1, 5, 0, 5, 4,
    // Right
    1, 2, 6, 1, 6, 5,
    // Back
    2, 3, 7, 2, 7, 6,
    // Left
    3, 0, 4, 3, 4, 7,
  ];

  // UV coordinates for texture mapping
  // Each vertex needs a UV coordinate (u, v) where 0 <= u,v <= 1
  const uvs = new Float32Array([
    // Bottom face UVs (vertices 0-3)
    0, 0, // vertex 0
    1, 0, // vertex 1
    1, 1, // vertex 2
    0, 1, // vertex 3

    // Top face UVs (vertices 4-7) - for texture mapping
    // Rotated 180 degrees for correct orientation
    1, 1, // vertex 4 (was top-left, now bottom-right)
    0, 1, // vertex 5 (was top-right, now bottom-left)
    0, 0, // vertex 6 (was bottom-right, now top-left)
    1, 0, // vertex 7 (was bottom-left, now top-right)
  ]);

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  
  // Set UV2 for AO map (same as UV for now)
  geometry.setAttribute('uv2', new THREE.BufferAttribute(uvs, 2));
  
  geometry.computeVertexNormals();

  // Set material groups - top uses material 1, everything else uses material 0
  geometry.clearGroups();
  geometry.addGroup(0, 6, 1); // Top face (material 1 = texture)
  geometry.addGroup(6, 30, 0); // Bottom and sides (material 0 = solid color)

  computedGeometries[key] = geometry;
  return geometry;
};

export const keyGeometryISOEnter = (): THREE.BufferGeometry => {
  if (computedGeometries['isoent']) {
    return computedGeometries['isoent'].clone();
  }

  const w = 1.25 - GUTTER;
  const d = 2 - GUTTER;
  const h = 0.4;
  const o = 0.25;
  const i = INSET;
  const it = INSET_TOP;
  const c = CORNER;

  const geometry = new THREE.BufferGeometry();

  const vertices = new Float32Array([
    -o,
    0,
    0, // 0
    w,
    0,
    0, // 1
    w,
    0,
    d, // 2
    0,
    0,
    d, // 3
    0,
    0,
    1, // 4
    -o,
    0,
    1, // 5
    // Top vertices
    i - o,
    h,
    it + c, // 6
    i + c - o,
    h,
    it, // 7
    w - i - c,
    h,
    it, // 8
    w - i,
    h,
    it + c, // 9
    w - i,
    h,
    d - i - c, // 10
    w - i - c,
    h,
    d - i, // 11
    i + c,
    h,
    d - i, // 12
    i,
    h,
    d - i - c, // 13
    i,
    h,
    1 - i, // 14
    i - c,
    h,
    1 - i, // 15
    i + c - o,
    h,
    1 - i, // 16
    i - o,
    h,
    1 - i - c, // 17
  ]);

  const indices = [
    // Top
    6, 9, 7, 7, 9, 8, 6, 17, 15, 17, 16, 15, 6, 15, 9, 15, 14, 9, 14, 10, 9, 14,
    13, 10, 13, 11, 10, 13, 12, 11,
    // Corners
    0, 6, 7, 1, 8, 9, 2, 10, 11, 3, 12, 13, 4, 14, 15, 5, 16, 17,
    // Sides
    0, 7, 8, 0, 8, 1, 9, 10, 2, 9, 2, 1, 3, 2, 11, 3, 11, 12, 4, 3, 13, 4, 13,
    14, 5, 4, 15, 5, 15, 16, 0, 5, 17, 0, 17, 6,
  ];

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  computedGeometries['isoent'] = geometry;
  return geometry;
};
