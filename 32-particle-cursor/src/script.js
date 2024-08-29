import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import particlesVertexShader from "./shaders/particles/vertex.glsl";
import particlesFragmentShader from "./shaders/particles/fragment.glsl";

/**
 * Base
 */
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
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

  // Materials
  particlesMaterial.uniforms.uResolution.value.set(
    sizes.width * sizes.pixelRatio,
    sizes.height * sizes.pixelRatio
  );

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
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 18);
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
renderer.setClearColor("#181818");
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(sizes.pixelRatio);

const displaysment = {};

displaysment.canvas = document.createElement("canvas");
displaysment.canvas.width = 128;
displaysment.canvas.height = 128;
document.body.append(displaysment.canvas);
displaysment.canvas.style.position = "fixed";
displaysment.canvas.style.width = "256px";
displaysment.canvas.style.height = "256px";
displaysment.canvas.style.top = 0;
displaysment.canvas.style.left = 0;
displaysment.canvas.style.zIndex = 10;

displaysment.context = displaysment.canvas.getContext("2d");

displaysment.context.fillRect(
  0,
  0,
  displaysment.canvas.width,
  displaysment.canvas.height
);

displaysment.glowImage = new Image();
displaysment.glowImage.src = "./glow.png";

displaysment.interactivePlane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshBasicMaterial({
    color: "red",
  })
);
scene.add(displaysment.interactivePlane);

// raycaster
displaysment.raycaster = new THREE.Raycaster();
// Coordinates
displaysment.screenCoursor = new THREE.Vector2(9999, 9999);
displaysment.canvasCoursor = new THREE.Vector2(9999, 9999);

window.addEventListener("pointermove", (event) => {
  displaysment.screenCoursor.x = (event.clientX / sizes.width) * 2 - 1;
  displaysment.screenCoursor.y = -(event.clientY / sizes.height) * 2 + 1;
});

/**
 * Particles
 */
const particlesGeometry = new THREE.PlaneGeometry(10, 10, 128, 128);

const particlesMaterial = new THREE.ShaderMaterial({
  vertexShader: particlesVertexShader,
  fragmentShader: particlesFragmentShader,
  uniforms: {
    uResolution: new THREE.Uniform(
      new THREE.Vector2(
        sizes.width * sizes.pixelRatio,
        sizes.height * sizes.pixelRatio
      )
    ),
    uPictureTexture: new THREE.Uniform(textureLoader.load("./picture-3.png")),
  },
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  displaysment.raycaster.setFromCamera(displaysment.screenCoursor, camera);
  const intersections = displaysment.raycaster.intersectObject(
    displaysment.interactivePlane
  );
  const glowSize = displaysment.canvas.width * 0.25;

  if (intersections.length > 0) {
    const uv = intersections[0].uv;

    displaysment.canvasCoursor.x = uv.x * displaysment.canvas.width;
    displaysment.canvasCoursor.y = (1 - uv.y) * displaysment.canvas.height;
  }
  displaysment.context.globalCompositeOperation = "source-over";
  displaysment.context.globalAlpha = 0.05;
  displaysment.context.fillRect(
    0,
    0,
    displaysment.canvas.width,
    displaysment.canvas.height
  );

  displaysment.context.globalCompositeOperation = "lighten";
  displaysment.context.globalAlpha = 1;

  displaysment.context.drawImage(
    displaysment.glowImage,
    displaysment.canvasCoursor.x - glowSize / 2,
    displaysment.canvasCoursor.y - glowSize / 2,
    glowSize,
    glowSize
  );

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
