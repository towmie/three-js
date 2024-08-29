import { Center } from "@react-three/drei";
import { useRef, useMemo } from "react";
import Line from "./Line";
import { useFrame } from "@react-three/fiber";
import { analyserRef } from "./Audio";
import { useStore } from "../store/store";

const map = (value, x1, y1, x2, y2) => {
  return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
};
const lerp = (a, b, n) => (1 - n) * a + n * b;

export default function Lines() {
  const lineRef = useRef();

  const linesCount = useMemo(() => 69, []);
  const linesList = useMemo(() => [...Array(linesCount)], [linesCount]);
  const isPlaying = useStore((state) => state.isPlaying);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const lines = lineRef.current;
    const frequencyData = analyserRef.current?.getFrequencyData();

    if (!lines) return;

    lines.children.forEach((line, index) => {
      line.children.forEach((plane) => {
        plane.material.uniforms.uTime.value = time;

        if (isPlaying) {
          const freq = frequencyData?.[index] ?? 0;
          const currentStrength = plane.material.uniforms.uStrength.value;
          const nextStrength = map(freq, 0, 255, 0, 1);
          plane.material.uniforms.uStrength.value = lerp(
            currentStrength,
            nextStrength,
            0.25
          );
        }
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
