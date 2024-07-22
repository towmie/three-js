import {
  Center,
  OrbitControls,
  Sparkles,
  useGLTF,
  useTexture,
  shaderMaterial,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import portalVertex from "./shaders/portal/vertex.glsl";
import portalFragment from "./shaders/portal/fragment.glsl";
import * as THREE from "three";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000"),
  },
  portalVertex,
  portalFragment
);

extend({ PortalMaterial });

export default function Experience() {
  const portalMaterialRef = useRef();

  const { nodes } = useGLTF("./model/portal.glb");
  const texture = useTexture("./model/baked.jpg");
  texture.flipY = false;

  useFrame((_, delta) => {
    portalMaterialRef.current.uTime += delta;
  });

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
        >
          <portalMaterial ref={portalMaterialRef} />
        </mesh>

        <Sparkles
          size={2}
          scale={[4, 2, 4]}
          position-y={1}
          count={40}
          speed={0.2}
        />
      </Center>
    </>
  );
}
