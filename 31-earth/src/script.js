import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import earthVertexShader from "./shaders/earth/vertex.glsl";
import earthFragmentShader from "./shaders/earth/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphere/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Loaders
const textureLoader = new THREE.TextureLoader();

const earthDayTexture = textureLoader.load("./earth/day.jpg");
earthDayTexture.colorSpace = THREE.SRGBColorSpace;
earthDayTexture.anisotropy = 8;
const earthNightTexture = textureLoader.load("./earth/night.jpg");
earthNightTexture.colorSpace = THREE.SRGBColorSpace;
earthNightTexture.anisotropy = 8;

const earthSpecularTexture = textureLoader.load("./earth/specularClouds.jpg");
earthSpecularTexture.anisotropy = 8;

/**
 * Earth
 */
// Mesh

const earthParams = {
  atmoshpereColor: "#00aaff",
  atmosphereTwilightColor: "#ff6600",
};

gui.addColor(earthParams, "atmoshpereColor").onChange(() => {
  earthMaterial.uniforms.uAtmosphereColor.value.set(
    earthParams.atmoshpereColor
  );
  atmosphereMaterial.uniforms.uAtmosphereColor.value.set(
    earthParams.atmoshpereColor
  );
});

gui.addColor(earthParams, "atmosphereTwilightColor").onChange(() => {
  earthMaterial.uniforms.uAtmosphereTwilightColor.value.set(
    earthParams.atmosphereTwilightColor
  );
  atmosphereMaterial.uniforms.uAtmosphereTwilightColor.value.set(
    earthParams.atmosphereTwilightColor
  );
});

const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
const earthMaterial = new THREE.ShaderMaterial({
  vertexShader: earthVertexShader,
  fragmentShader: earthFragmentShader,
  uniforms: {
    uDayTexture: { value: earthDayTexture },
    uNightTexture: { value: earthNightTexture },
    uSpecularTexture: { value: earthSpecularTexture },
    uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
    uAtmosphereColor: { value: new THREE.Color(earthParams.atmoshpereColor) },
    uAtmosphereTwilightColor: {
      value: new THREE.Color(earthParams.atmosphereTwilightColor),
    },
  },
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

const atmosphereMaterial = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  transparent: true,

  vertexShader: atmosphereVertexShader,
  fragmentShader: atmosphereFragmentShader,
  uniforms: {
    uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
    uAtmosphereColor: { value: new THREE.Color(earthParams.atmoshpereColor) },
    uAtmosphereTwilightColor: {
      value: new THREE.Color(earthParams.atmosphereTwilightColor),
    },
  },
});

const atmosphere = new THREE.Mesh(earthGeometry, atmosphereMaterial);
atmosphere.scale.setScalar(1.04);
scene.add(atmosphere);

// Sun
const sunSpherical = new THREE.Spherical(1, Math.PI / 2, 0.5);
const sunDirection = new THREE.Vector3();
const debugSun = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.1, 2),
  new THREE.MeshBasicMaterial()
);
scene.add(debugSun);

const updareSun = () => {
  sunDirection.setFromSpherical(sunSpherical);

  debugSun.position.copy(sunDirection).multiplyScalar(5);

  earthMaterial.uniforms.uSunDirection.value.copy(sunDirection);
  atmosphereMaterial.uniforms.uSunDirection.value.copy(sunDirection);
};

updareSun();

gui.add(sunSpherical, "phi").min(0).max(Math.PI).step(0.01).onChange(updareSun);
gui
  .add(sunSpherical, "theta")
  .min(0)
  .max(Math.PI * 2)
  .step(0.01)
  .onChange(updareSun);

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 32, 32),
  new THREE.MeshBasicMaterial({ color: "yellow" })
);
sun.position.setFromSpherical(sunSpherical);
scene.add(sun);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(sizes.pixelRatio);
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
camera.position.x = 12;
camera.position.y = 5;
camera.position.z = 4;
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
renderer.setPixelRatio(sizes.pixelRatio);
renderer.setClearColor("#000011");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  earth.rotation.y = elapsedTime * 0.1;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();