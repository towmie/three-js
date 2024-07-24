import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";
const floorTwoMaterial = new THREE.MeshStandardMaterial({
  color: "greenyellow",
});
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });

function BlockSpinner({ position = [0, 0, 0], geometry }) {
  const obstRef = useRef();
  const [speed] = useState(
    () => (Math.random() + 0.3) * (Math.random() > 0.5 ? 1 : -1)
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstRef.current.setNextKinematicRotation(rotation);
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
          position={[0, 0.3, 0]}
          restitution={0.2}
          friction={0}
          ref={obstRef}
        >
          <mesh
            geometry={geometry}
            material={obstacleMaterial}
            scale={[3.5, 0.3, 0.3]}
            castShadow
            receiveShadow
          />
        </RigidBody>
      </group>
    </>
  );
}

export default BlockSpinner;
