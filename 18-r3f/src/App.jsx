import {
  PivotControls,
  OrbitControls,
  TransformControls,
  Text,
} from "@react-three/drei";
import { useRef } from "react";
import { depth } from "three/examples/jsm/nodes/Nodes.js";

function App() {
  const cubeRef = useRef();
  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 4]} />
      <ambientLight intensity={0.5} />
      <PivotControls anchor={[0, 0, 0]} depthTest={false} lineWidth={1}>
        <mesh position-x={-2}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial args={[{ color: "red" }]} />
        </mesh>
      </PivotControls>

      <mesh ref={cubeRef} position-x={2} scale={2}>
        <boxGeometry />
        <meshStandardMaterial args={[{ color: "blue" }]} />
      </mesh>
      <TransformControls object={cubeRef} />

      <mesh position-y={-2} scale={10} rotation-x={Math.PI * -0.5}>
        <planeGeometry />
        <meshStandardMaterial args={[{ color: "green" }]} />
      </mesh>
      <Text>ALALAL </Text>
    </>
  );
}

export default App;
