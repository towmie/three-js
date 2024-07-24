import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const floorTwoMaterial = new THREE.MeshStandardMaterial({
  color: "greenyellow",
});
function BlockAxe({ position = [0, 0, 0], geometry, material }) {
  const obstRef = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    obstRef.current.setNextKinematicTranslation({
      x: position[0] + Math.sin(timeOffset + time) * 1.25,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <>
      <group position={position}>
        <RigidBody type="fixed">
          <mesh
            geometry={geometry}
            material={floorTwoMaterial}
            scale={[4, 0.2, 4]}
            receiveShadow
            position={[0, -0.1, 0]}
          />
        </RigidBody>
        <RigidBody
          type="kinematicPosition"
          position={[0, 1, 0]}
          restitution={0.2}
          friction={0}
          ref={obstRef}
        >
          <mesh
            geometry={geometry}
            material={obstacleMaterial}
            scale={[1.5, 1.5, 0.3]}
            castShadow
            receiveShadow
          />
        </RigidBody>
      </group>
    </>
  );
}

export default BlockAxe;
