import { Center } from "@react-three/drei";
import { useRef, useMemo } from "react";
import Line from "./Line";

export default function Lines() {
  const lineRef = useRef();

  const linesCount = useMemo(() => 69, []);
  const linesList = useMemo(() => [...Array(linesCount)], [linesCount]);

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
