import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
import gsap from "gsap";

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
  count: 400,
  position: new THREE.Vector3(),
  size: 0.5,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
  radius: 1,
  color: new THREE.Color("#8affff"),
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
const textures = [
  textureLoader.load("./particles/1.png"),
  textureLoader.load("./particles/2.png"),
  textureLoader.load("./particles/3.png"),
  textureLoader.load("./particles/4.png"),
  textureLoader.load("./particles/5.png"),
  textureLoader.load("./particles/6.png"),
  textureLoader.load("./particles/7.png"),
  textureLoader.load("./particles/8.png"),
];

const createFireworks = (count, position, size, texture, radius, color) => {
  const positionArr = new Float32Array(count * 3);
  const sizesArr = new Float32Array(count);
  const timeMultiplierArr = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    const spherical = new THREE.Spherical(
      radius * (0.75 + Math.random() * 0.25),
      Math.random() * Math.PI,
      Math.random() * Math.PI * 2
    );

    const position = new THREE.Vector3();
    position.setFromSpherical(spherical);

    positionArr[i3] = position.x;
    positionArr[i3 + 1] = position.y;
    positionArr[i3 + 2] = position.z;

    sizesArr[i] = Math.random();
    timeMultiplierArr[i] = 1 + Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positionArr, 3)
  );
  geometry.setAttribute("aSize", new THREE.Float32BufferAttribute(sizesArr, 1));
  geometry.setAttribute(
    "aTimeMultiplier",
    new THREE.Float32BufferAttribute(timeMultiplierArr, 1)
  );

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
      uColor: { value: color },
      uProgress: new THREE.Uniform(0),
    },
  });

  const fireWork = new THREE.Points(geometry, material);
  fireWork.position.copy(position);
  scene.add(fireWork);

  const destroy = () => {
    scene.remove(fireWork);
    geometry.dispose();
    material.dispose();
  };

  gsap.to(material.uniforms.uProgress, {
    value: 1,
    duration: 3,
    ease: "linear",
    onComplete: destroy,
  });
};

const createRandomFirework = () => {
  const count = Math.round(400 + Math.random() * 1000);
  const position = new THREE.Vector3(
    (Math.random() - 0.5) * 2,
    Math.random(),
    (Math.random() - 0.5) * 2
  );
  const size = 0.1 + Math.random() * 0.1;
  const texture = textures[Math.floor(Math.random() * textures.length)];
  const radius = 0.5 + Math.random();
  const color = new THREE.Color();
  color.setHSL(Math.random(), 1, 0.7);
  createFireworks(count, position, size, texture, radius, color);
};

window.addEventListener("click", createRandomFirework);

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
