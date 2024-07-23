import BlockAxe from "./BlockAxe";
import BlockLimbo from "./BlockLimbo";
import BlockSpinner from "./BlockSpinner";
import BlockStart from "./BlockStart";
import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorOneMaterial = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floorTwoMaterial = new THREE.MeshStandardMaterial({
  color: "greenyellow",
});
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

function Level() {
  return (
    <>
      <BlockAxe
        position={[0, 0, 0]}
        geometry={boxGeometry}
        material={floorTwoMaterial}
        obstMaterial={obstacleMaterial}
      />
      <BlockSpinner
        position={[0, 0, 4]}
        geometry={boxGeometry}
        material={floorTwoMaterial}
        obstMaterial={obstacleMaterial}
      />
      <BlockLimbo
        position={[0, 0, 8]}
        geometry={boxGeometry}
        material={floorTwoMaterial}
        obstMaterial={obstacleMaterial}
      />

      <BlockStart
        position={[0, 0, 12]}
        geometry={boxGeometry}
        material={floorOneMaterial}
      />
    </>
  );
}

export default Level;
