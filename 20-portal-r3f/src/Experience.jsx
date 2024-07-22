import { Center, OrbitControls, useGLTF, useTexture } from "@react-three/drei";

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  const texture = useTexture("./model/baked.jpg");
  texture.flipY = false;

  return (
    <>
      <color args={["#030202"]} attach="background" />

      <OrbitControls makeDefault />
      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={texture} />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
          rotation={nodes.poleLightA.rotation}
          scale={nodes.poleLightA.scale}
        ></mesh>
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
          rotation={nodes.poleLightB.rotation}
          scale={nodes.poleLightB.scale}
        ></mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
          scale={nodes.portalLight.scale}
        ></mesh>
      </Center>
    </>
  );
}
