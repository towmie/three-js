import BlockEnd from "./BlockEnd";
import BlockAxe from "./BlockAxe";
import BlockLimbo from "./BlockLimbo";
import BlockSpinner from "./BlockSpinner";
import BlockStart from "./BlockStart";
import * as THREE from "three";
import { useMemo } from "react";
import Walls from "./Walls";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorOneMaterial = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floorTwoMaterial = new THREE.MeshStandardMaterial({
  color: "greenyellow",
});
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });

function Level({
  count = 5,
  blockTypes = [BlockSpinner, BlockLimbo, BlockAxe],
  seed = 0,
}) {
  const blocks = useMemo(() => {
    const newBlocks = [];
    for (let i = 0; i < count; i++) {
      const type = blockTypes[Math.floor(Math.random() * blockTypes.length)];
      newBlocks.push(type);
    }

    return newBlocks;
  }, [count, blockTypes, seed]);

  return (
    <>
      <BlockStart
        position={[0, 0, 0]}
        geometry={boxGeometry}
        material={floorOneMaterial}
      />
      {blocks.map((Block, i) => (
        <Block
          key={i}
          geometry={boxGeometry}
          material={floorOneMaterial}
          position={[0, 0, -(i + 1) * 4]}
        />
      ))}
      <BlockEnd
        position={[0, 0, -(count + 1) * 4]}
        geometry={boxGeometry}
        material={floorOneMaterial}
      />
      <Walls length={count + 2} />
    </>
  );
}

export default Level;
