import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

function Walls({ length }) {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          scale={[0.3, 1, length * 4]}
          position={[2.15, 0.5, -(length * 2) + 2]}
          material={wallMaterial}
          castShadow
        >
          <boxGeometry />
        </mesh>
        <mesh
          scale={[0.3, 1, length * 4]}
          position={[-2.15, 0.5, -(length * 2) + 2]}
          material={wallMaterial}
          receiveShadow
        >
          <boxGeometry />
        </mesh>
        <mesh
          scale={[4, 1.5, 0.3]}
          position={[0, 0.75, -(length * 4) + 2]}
          material={wallMaterial}
          receiveShadow
        >
          <boxGeometry />
        </mesh>
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, 0.1 - length * 2 + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
}

export default Walls;
