import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const parameters = {
  count: 10000,
  sizes: 0.001,
  radius: 5,
  branches: 3,
  spin: 3,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#ff6030",
  outsideColor: "#1b3984",
};

let geometry = null;
let material = null;
let points = null;

// Galaxy
const galaxyGenerator = () => {
  // Remove previous galaxy

  if (points !== null) {
    scene.remove(points);
    geometry.dispose();
    material.dispose();
  }

  //   create new galaxy

  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  positions.forEach((position, index) => {
    const i = index * 3;
    const branchAngle =
      ((index % parameters.branches) / parameters.branches) * Math.PI * 2;

    const radius = Math.random();
    const spinAngle = radius * parameters.spin;
    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() > 0.5 ? 1 : -1) *
      parameters.randomness;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() > 0.5 ? 1 : -1) *
      parameters.randomness;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() > 0.5 ? 1 : -1) *
      parameters.randomness;

    positions[i + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i + 1] = 0 + randomY;
    positions[i + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius);

    colors[i + 0] = mixedColor.r;
    colors[i + 1] = mixedColor.g;
    colors[i + 2] = mixedColor.b;
  });

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    size: parameters.sizes,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);
};

galaxyGenerator();

gui
  .add(parameters, "count")
  .min(100)
  .max(100000)
  .step(100)
  .onFinishChange(galaxyGenerator);
gui
  .add(parameters, "sizes")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(galaxyGenerator);
gui
  .add(parameters, "radius")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(galaxyGenerator);

gui
  .add(parameters, "branches")
  .min(2)
  .max(100)
  .step(1)
  .onFinishChange(galaxyGenerator);

gui
  .add(parameters, "spin")
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(galaxyGenerator);

gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(galaxyGenerator);

gui.add(parameters, "randomnessPower").min(1).max(10).step(0.001);

gui.addColor(parameters, "insideColor").onFinishChange(galaxyGenerator);
gui.addColor(parameters, "outsideColor").onFinishChange(galaxyGenerator);

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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
