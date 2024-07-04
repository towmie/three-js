import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const loader = new THREE.TextureLoader();

const doorColorTexture = loader.load("/textures/door/color.jpg");
const doorAlphaTexture = loader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = loader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const heightTexture = loader.load("/textures/door/height.jpg");
const normalTexture = loader.load("/textures/door/normal.jpg");
const metalnessTexture = loader.load("/textures/door/metalness.jpg");
const roughnessTexture = loader.load("/textures/door/roughness.jpg");
const matcapTexture = loader.load("/textures/matcaps/1.png");
const gradientTexture = loader.load("/textures/gradients/3.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */

// const material = new THREE.MeshBasicMaterial({
//   map: doorColorTexture,
//   side: THREE.DoubleSide,
// });

const matObject = {
  color: new THREE.MeshBasicMaterial({ map: doorColorTexture }),
  alpha: new THREE.MeshBasicMaterial({
    map: doorAlphaTexture,
    transparent: true,
  }),
  ambientOcclusion: new THREE.MeshBasicMaterial({
    map: doorAmbientOcclusionTexture,
  }),
  height: new THREE.MeshBasicMaterial({ map: heightTexture }),
  normal: new THREE.MeshBasicMaterial({ map: normalTexture }),
  metalness: new THREE.MeshBasicMaterial({ map: metalnessTexture }),
  roughness: new THREE.MeshBasicMaterial({ map: roughnessTexture }),
  matcap: new THREE.MeshMatcapMaterial({ map: matcapTexture }),
  gradient: new THREE.MeshBasicMaterial({ map: gradientTexture }),
};

const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
const tourus = new THREE.Mesh(
  new THREE.TorusGeometry(0.7, 0.2, 16, 100),
  material
);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

tourus.position.x = 1.5;
sphere.position.x = -1.5;

scene.add(sphere, tourus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = elapsedTime * 0.1;
  plane.rotation.y = elapsedTime * 0.1;
  tourus.rotation.y = elapsedTime * 0.1;

  sphere.rotation.x = -elapsedTime * 0.15;
  plane.rotation.x = -elapsedTime * 0.15;
  tourus.rotation.x = -elapsedTime * 0.15;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
