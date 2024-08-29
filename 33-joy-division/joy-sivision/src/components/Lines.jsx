import { Center } from "@react-three/drei";
import { useRef, useMemo } from "react";
import Line from "./Line";
import { useFrame } from "@react-three/fiber";

export default function Lines() {
  const lineRef = useRef();

  const linesCount = useMemo(() => 69, []);
  const linesList = useMemo(() => [...Array(linesCount)], [linesCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const lines = lineRef.current;

    if (!lines) return;

    lines.children.forEach((line, index) => {
      line.children.forEach((plane) => {
        plane.material.uniforms.uTime.value = time;
      });
    });
  });

  return (
    <Center>
      <group ref={lineRef}>
        {linesList.map((_, i) => (
          <Line key={i} index={i} />
        ))}
      </group>
    </Center>
  );
}
