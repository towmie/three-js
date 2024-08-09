import {
  Center,
  Text3D,
  OrbitControls,
  useMatcapTexture,
  Clone,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";
import Donut from "./Donut";
import { useFrame } from "@react-three/fiber";

export default function Experience() {
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  const groupRef = useRef();

  useFrame((_, delta) => {
    groupRef.current.children.forEach((donut) => {
      donut.rotation.y += delta * 0.5;
    });
  });
  return (
    <>
      <OrbitControls makeDefault />

      <group ref={groupRef}>
        {[...Array(100)].map((_, i) => (
          <Donut
            key={i}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            matcapTexture={matcapTexture}
          />
        ))}
      </group>

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          curveSegments={12}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.02}
          bevelSegments={5}
          height={0.2}
        >
          whatsssp
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>
    </>
  );
}
