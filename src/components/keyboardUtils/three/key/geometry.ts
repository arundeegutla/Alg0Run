import * as THREE from 'three';

const GUTTER = 0.05;
const c = 0.05; // corner inset
const i = 0.15; // inset
const it = 0.05; // inset top edge

interface GeometryOptions {
  w: number;
  h: number;
  row: number;
}

// stores geometry for each possible size
const computed_geometries: Record<string, THREE.BufferGeometry> = {};

const lowerCapFace = (
  geometry: THREE.BufferGeometry,
  dist: number,
  distFront?: number,
  offset?: number
): THREE.BufferGeometry => {
  distFront = distFront ?? dist;
  offset = offset ?? 0;

  const position = geometry.getAttribute('position');
  const array = position.array as Float32Array;

  // Adjust vertices 4-11 (top vertices)
  array[4 * 3 + 1] -= dist; // vertex 4 y
  array[5 * 3 + 1] -= dist + offset; // vertex 5 y
  array[6 * 3 + 1] -= dist + offset; // vertex 6 y
  array[7 * 3 + 1] -= dist; // vertex 7 y
  array[8 * 3 + 1] -= distFront; // vertex 8 y
  array[9 * 3 + 1] -= distFront - offset; // vertex 9 y
  array[10 * 3 + 1] -= distFront - offset; // vertex 10 y
  array[11 * 3 + 1] -= distFront; // vertex 11 y

  position.needsUpdate = true;
  return geometry;
};

// Cherry profile key geometry
export const keyGeometry = (opts: GeometryOptions): THREE.BufferGeometry => {
  const key = `test${opts.w}${opts.h}${opts.row}`;

  if (computed_geometries[key]) {
    return computed_geometries[key].clone();
  }

  const w = (opts.w || 1) - GUTTER;
  const d = opts.h - GUTTER;
  const h = 0.5;

  const geometry = new THREE.BufferGeometry();

  const vertices = new Float32Array([
    // bottom vertices (0-3)
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
    // top for 1 (4-5)
    i,
    h,
    it + c, // 4
    i + c,
    h,
    it, // 5
    // top for 2 (6-7)
    w - i - c,
    h,
    it, // 6
    w - i,
    h,
    it + c, // 7
    // top for 3 (8-9)
    w - i,
    h,
    d - i - c, // 8
    w - i - c,
    h,
    d - i, // 9
    // top for 4 (10-11)
    i + c,
    h,
    d - i, // 10
    i,
    h,
    d - i - c, // 11
  ]);

  const indices = [
    // top top
    4, 7, 5, 7, 6, 5,
    // top bottom
    9, 11, 10, 9, 8, 11,
    // top center
    4, 11, 7, 8, 7, 11,
    // corner faces
    0, 4, 5, 1, 6, 7, 2, 8, 9, 3, 10, 11,
    // back side
    0, 5, 1, 1, 5, 6,
    // right side
    2, 7, 8, 2, 1, 7,
    // left side
    0, 3, 11, 0, 11, 4,
    // front side
    3, 2, 9, 3, 9, 10,
  ];

  const uvs = new Float32Array([
    // bottom vertices (0-3)
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    // top vertices (4-11) - flipped horizontally
    1,
    1 - c, // 4 (was 0, 1-c)
    1 - c,
    1, // 5 (was c, 1)
    c,
    1, // 6 (was 1-c, 1)
    0,
    1 - c, // 7 (was 1, 1-c)
    0,
    c, // 8 (was 1, c)
    c,
    0, // 9 (was 1-c, 0)
    1 - c,
    0, // 10 (was c, 0)
    1,
    c, // 11 (was 0, c)
  ]);

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setAttribute('uv2', new THREE.BufferAttribute(uvs, 2));

  // angle top faces for profile
  if (opts.h === 2 && opts.w < 1.25) {
    lowerCapFace(geometry, 0.1);
  }
  if (opts.row === 1) {
    lowerCapFace(geometry, -0.05);
  }
  if (opts.row === 2 && opts.h !== 2) {
    lowerCapFace(geometry, 0.1);
  }
  if (opts.row === 3 && opts.h !== 2) {
    lowerCapFace(geometry, 0.1);
    geometry.rotateX(-0.1);
    geometry.translate(0, -0.1, 0);
  }
  if (opts.row === 4 && opts.h !== 2) {
    geometry.rotateX(-0.2);
    geometry.translate(0, -0.19, 0);
  }

  geometry.computeVertexNormals();
  computed_geometries[key] = geometry;
  return geometry;
};

// geometry for enter key
export const keyGeometryISOEnter = (
  opts?: GeometryOptions
): THREE.BufferGeometry => {
  if (computed_geometries['isoent']) {
    return computed_geometries['isoent'].clone();
  }

  const w = (opts?.w || 1.25) - GUTTER;
  const d = (opts?.h || 2) - GUTTER;
  const h = 0.4;

  // extra width of top
  const o = 0.25;

  const geometry = new THREE.BufferGeometry();

  const vertices = new Float32Array([
    // bottom vertices (0-5)
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
    // top for 0 (6-7)
    i - o,
    h,
    it + c, // 6
    i + c - o,
    h,
    it, // 7
    // top for 1 (8-9)
    w - i - c,
    h,
    it, // 8
    w - i,
    h,
    it + c, // 9
    // top for 2 (10-11)
    w - i,
    h,
    d - i - c, // 10
    w - i - c,
    h,
    d - i, // 11
    // top for 3 (12-13)
    i + c,
    h,
    d - i, // 12
    i,
    h,
    d - i - c, // 13
    // top for 4 (inside corner) (14-15)
    i,
    h,
    1 - i, // 14
    i - c,
    h,
    1 - i, // 15
    // top for 5 (16-17)
    i + c - o,
    h,
    1 - i, // 16
    i - o,
    h,
    1 - i - c, // 17
  ]);

  const indices = [
    // top
    6, 9, 7, 7, 9, 8, 6, 17, 15, 17, 16, 15, 6, 15, 9, 15, 14, 9, 14, 10, 9, 14,
    13, 10, 13, 11, 10, 13, 12, 11,
    // corners
    0, 6, 7, 1, 8, 9, 2, 10, 11, 3, 12, 13, 4, 14, 15, 5, 16, 17,
    // sides
    0, 7, 8, 0, 8, 1, 9, 10, 2, 9, 2, 1, 3, 2, 11, 3, 11, 12, 4, 3, 13, 4, 13,
    14, 5, 4, 15, 5, 15, 16, 0, 5, 17, 0, 17, 6,
  ];

  const uxo = 0.2;
  const uyo = 0.35;

  const uvs = new Float32Array([
    // bottom vertices (0-5)
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    // top vertices (6-17) - flipped horizontally
    1,
    1 - c, // 6 (was 0, 1-c)
    1 - c,
    1, // 7 (was c, 1)
    c,
    1, // 8 (was 1-c, 1)
    0,
    1 - c, // 9 (was 1, 1-c)
    0,
    c, // 10 (was 1, c)
    c,
    0, // 11 (was 1-c, 0)
    1 - uxo - c,
    0, // 12 (was uxo+c, 0)
    1 - uxo,
    c, // 13 (was uxo, c)
    1 - uxo,
    uyo, // 14 (was uxo, uyo)
    1 - uxo + c,
    uyo, // 15 (was uxo-c, uyo)
    1 - c,
    uyo, // 16 (was c, uyo)
    1,
    uyo + c, // 17 (was 0, uyo+c)
  ]);

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setAttribute('uv2', new THREE.BufferAttribute(uvs, 2));

  geometry.computeVertexNormals();

  computed_geometries['isoent'] = geometry;
  return geometry;
};
