import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

function BlockEnd({ position = [0, 0, 0], geometry, material }) {
  const hamb = useGLTF("./hamburger.glb");
  hamb.scene.children.forEach((child) => (child.castShadow = true));
  return (
    <>
      <group position={position}>
        <mesh
          geometry={geometry}
          material={material}
          scale={[4, 0.2, 4]}
          receiveShadow
          position={[0, 0, 0]}
        />
        <RigidBody
          type="fixed"
          colliders="hull"
          position={[0, 0.25, 0]}
          restitution={0.2}
          friction={0}
        >
          <primitive object={hamb.scene} scale={0.2} />
        </RigidBody>
      </group>
    </>
  );
}

export default BlockEnd;
