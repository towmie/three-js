import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const gui = new GUI();
const globalDebugProps = {
  color: "#ff0000",
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
  subdivisions: 2,
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: globalDebugProps.color,
  wireframe: true,
});

// geometry.setAttribute("position", positionsAttribute);

const mesh = new THREE.Mesh(geometry, material);

gui.add(mesh.position, "x").min(-3).max(3).step(0.01).name("position x");
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("position y");
gui.add(mesh.position, "z").min(-3).max(3).step(0.01).name("position z");
gui.add(mesh, "visible").name("visible");
gui.add(material, "wireframe").name("wireframe");
gui.add(globalDebugProps, "spin").name("spin");
gui
  .add(globalDebugProps, "subdivisions")
  .min(1)
  .max(10)
  .step(1)
  .name("subdivisions")
  .onFinishChange(() => {
    mesh.geometry.dispose();
    const newGeometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      globalDebugProps.subdivisions,
      globalDebugProps.subdivisions,
      globalDebugProps.subdivisions
    );
    mesh.geometry = newGeometry;
  });

gui.addColor(globalDebugProps, "color").onChange(() => {
  material.color.set(globalDebugProps.color);
});

scene.add(mesh);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
camera.position.y = 1.25;
camera.lookAt(mesh.position);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

let time = Date.now();

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
camera.lookAt(mesh.position);

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

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

const tick = () => {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  // Update controls
  controls.update();

  // Update objects
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
