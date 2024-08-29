import { Center } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

export default function Lines() {
  const lineRef = useRef();

  const linesCount = useMemo(() => 69, []);
  const linesList = useMemo(() => [...Array(linesCount)], [linesCount]);

  return (
    <Center>
      <group ref={lineRef}>
        {linesList.map((_, i) => {
          return (
            <mesh key={i} position-z={-i * 0.095}>
              <boxGeometry args={[5, 0.03, 0.02]} />
              <meshBasicMaterial />
            </mesh>
          );
        })}
      </group>
    </Center>
  );
}
