import { Float, Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

function BlockStart({ position = [0, 0, 0], geometry, material }) {
  return (
    <RigidBody type="fixed">
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.75, 0]}
          rotation-y={-0.25}
          font="./bebas-neue-v9-latin-regular.woff"
          scale={0.5}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <group position={position}>
        <mesh
          geometry={geometry}
          material={material}
          scale={[4, 0.2, 4]}
          receiveShadow
          position={[0, -0.1, 0]}
        />
      </group>
    </RigidBody>
  );
}

export default BlockStart;
