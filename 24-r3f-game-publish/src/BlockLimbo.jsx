import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

function BlockLimbo({
  position = [0, 0, 0],
  geometry,
  material,
  obstMaterial,
}) {
  const obstRef = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    obstRef.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + Math.sin(timeOffset + time) + 1.15,
      z: position[2],
    });
  });

  return (
    <>
      <group position={position}>
        <mesh
          geometry={geometry}
          material={material}
          scale={[4, 0.2, 4]}
          receiveShadow
          position={[0, -0.1, 0]}
        />
        <RigidBody
          type="kinematicPosition"
          position={[0, 0.3, 0]}
          restitution={0.2}
          friction={0}
          ref={obstRef}
        >
          <mesh
            geometry={geometry}
            material={obstMaterial}
            scale={[3.5, 0.3, 0.3]}
            castShadow
            receiveShadow
          />
        </RigidBody>
      </group>
    </>
  );
}

export default BlockLimbo;
