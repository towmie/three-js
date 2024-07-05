import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
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
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const houseSize = {
  width: 4,
  height: 2.5,
  depth: 4,
};

const roofSize = {
  width: 3.5,
  height: 1.5,
  depth: 4,
};

const graveSizes = {
  width: 0.6,
  height: 0.8,
  depth: 0.2,
};

// Textures
const textureLoader = new THREE.TextureLoader();

const floorTexture = textureLoader.load("/floor/alpha.jpg");

const floorColorTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg"
);
const floorARMTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg"
);
const floorNormalTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg"
);
const floorDispTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg"
);

floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorDispTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorDispTexture.wrapS = THREE.RepeatWrapping;
floorDispTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

floorColorTexture.colorSpace = THREE.SRGBColorSpace;
/**
 * House
 */

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDispTexture,
    displacementBias: 0.3,
    displacementScale: -0.2,
  })
);
floor.rotation.x = -Math.PI * 0.5;

const houseGroup = new THREE.Group();

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(houseSize.width, houseSize.height, houseSize.depth),
  new THREE.MeshStandardMaterial()
);
walls.position.y = houseSize.height / 2;

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(roofSize.width, roofSize.height, roofSize.depth),
  new THREE.MeshStandardMaterial()
);
roof.position.y = houseSize.height + roofSize.height / 2;
roof.rotation.y = Math.PI * 0.25;

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2),
  new THREE.MeshStandardMaterial()
);
door.position.z = houseSize.depth / 2 + 0.01;
door.position.y = 1;

// Bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial();

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(0.8, 0.2, 2.2);
bush1.scale.setScalar(0.5);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.set(1.4, 0.1, 2.1);
bush2.scale.setScalar(0.25);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.scale.setScalar(0.4);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-1, 0.05, 2.6);
bush4.scale.setScalar(0.15);

// Graves

const graveGeometry = new THREE.BoxGeometry(
  graveSizes.width,
  graveSizes.height,
  graveSizes.depth
);
const graveMaterial = new THREE.MeshStandardMaterial();

const graves = new THREE.Group();

for (let i = 0; i < 30; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  const gravesRadius = Math.random() * 4 + 4;

  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * gravesRadius;
  const z = Math.sin(angle) * gravesRadius;

  grave.position.x = x;
  grave.position.z = z;
  grave.position.y = Math.random() * 0.4;
  grave.rotation.x = (Math.random() - 0.5) * 0.5;
  grave.rotation.y = (Math.random() - 0.5) * 0.5;
  grave.rotation.z = (Math.random() - 0.5) * 0.5;
  //   grave.rotation.y = (Math.random() - 0.5) * Math.PI;
  grave.scale.setScalar(Math.random() * 0.5 + 0.5);
  graves.add(grave);
}

houseGroup.add(walls, roof, door, bush1, bush2, bush3, bush4);
scene.add(floor, houseGroup, graves);
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#ffffff", 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
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
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
