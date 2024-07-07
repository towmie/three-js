import * as THREE from "three";
import GUI from "lil-gui";

/**
 * Debug
 */
const gui = new GUI();

const parameters = {
  materialColor: "#ffeded",
};

const objectsDistance = 4;

const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load("/textures/gradients/3.jpg");
texture.magFilter = THREE.NearestFilter;

gui.addColor(parameters, "materialColor").onChange(() => {
  material.color.set(parameters.materialColor);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 0);
/**
 * Test cube
 */

const material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: texture,
});
const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);

const mesh3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  material
);

mesh1.position.y = -objectsDistance * 0;
mesh1.position.x = 2;
mesh2.position.y = -objectsDistance * 1;
mesh2.position.x = -2;
mesh3.position.y = -objectsDistance * 2;
mesh3.position.x = 2;

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
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;

scene.add(camera, mesh1, mesh2, mesh3, directionalLight);

const objArray = [mesh1, mesh2, mesh3];

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// scroll
let scrollPosition;
document.addEventListener("scroll", () => {
  scrollPosition = window.scrollY;
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //   animate camera
  camera.position.y = (-scrollPosition / sizes.height) * objectsDistance;

  //   animate objects
  objArray.forEach((obj, index) => {
    obj.rotation.y = elapsedTime * 0.12;
    obj.rotation.x = elapsedTime * 0.1;
  });

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
