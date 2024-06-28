import * as THREE from "three";
const canvas = document.querySelector("canvas#canvas");
// Scene

const scene = new THREE.Scene();

// obj

const box = new THREE.BoxGeometry(1, 1, 1);
// Material
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(box, material);

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;
camera.position.y = 1;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);
