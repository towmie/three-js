import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  const texture = useTexture("./model/baked.jpg");
  texture.flipY = false;

  return (
    <>
      <color args={["#030202"]} attach="background" />

      <OrbitControls makeDefault />

      <mesh geometry={nodes.baked.geometry}>
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
}
