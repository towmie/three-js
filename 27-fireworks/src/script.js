import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 });

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Loaders
const textureLoader = new THREE.TextureLoader();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const params = {
  count: 100,
  position: new THREE.Vector3(),
  size: 0.5,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};
params.resolution = new THREE.Vector2(
  sizes.width * params.pixelRatio,
  sizes.height * params.pixelRatio
);
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  params.pixelRatio = Math.min(window.devicePixelRatio, 2);
  params.resolution.set(
    sizes.width * params.pixelRatio,
    sizes.height * params.pixelRatio
  );

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(params.pixelRatio);
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  25,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(1.5, 0, 6);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(params.pixelRatio);

/**
 * Test
 */
const texture = [
  textureLoader.load("./particles/1.png"),
  textureLoader.load("./particles/2.png"),
  textureLoader.load("./particles/3.png"),
  textureLoader.load("./particles/4.png"),
  textureLoader.load("./particles/5.png"),
  textureLoader.load("./particles/6.png"),
  textureLoader.load("./particles/7.png"),
  textureLoader.load("./particles/8.png"),
];

const createFireworks = (count, position, size, texture) => {
  const positionArr = new Float32Array(count * 3);
  const sizesArr = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    positionArr[i3] = Math.random() - 0.5;
    positionArr[i3 + 1] = Math.random() - 0.5;
    positionArr[i3 + 2] = Math.random() - 0.5;

    sizesArr[i] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positionArr, 3)
  );
  geometry.setAttribute("aSize", new THREE.Float32BufferAttribute(sizesArr, 1));

  texture.flipY = false;
  const material = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uSize: new THREE.Uniform(size),
      uResolution: new THREE.Uniform(params.resolution),
      uTexture: new THREE.Uniform(texture),
    },
  });

  const fireWork = new THREE.Points(geometry, material);
  fireWork.position.copy(position);
  scene.add(fireWork);
};
createFireworks(params.count, params.position, params.size, texture[7]);

/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
