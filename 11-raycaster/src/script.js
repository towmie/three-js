import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

let model = null;

const loader = new GLTFLoader();
loader.load("/models/Duck/glTF/Duck.gltf", (gltf) => {
  model = gltf.scene;
  scene.add(gltf.scene);
});

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(directionalLight, ambientLight);
/**
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object1.position.x = -2;

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object3.position.x = 2;

scene.add(object1, object2, object3);

// Raycaster
const raycaster = new THREE.Raycaster();
const rayOrigin = new THREE.Vector3(-3, 0, 0);
const rayDirection = new THREE.Vector3(10, 0, 0).normalize();

// console.log(intersect);

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

// Mouse

const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

window.addEventListener("click", () => {
  if (currentIntersect) {
    console.log("click");
  }
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
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const objectsArr = [object1, object2, object3];
let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
  object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
  object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

  if (model) {
    const modelIntersects = raycaster.intersectObject(model, true);
    console.log(modelIntersects);
  }
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objectsArr);

  objectsArr.forEach((object) => {
    object.material.color.set("#ff0000");
  });

  intersects.forEach((intersect) => {
    intersect.object.material.color.set("#0000ff");
  });

  if (intersects.length) {
    if (currentIntersect === null) {
      console.log("mouse enter");
    }
    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      console.log("mouse leave");
    }
    currentIntersect = null;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
