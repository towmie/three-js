import { OrbitControls } from "@react-three/drei";
import Lines from "./Lines";

export default function Scene() {
  return (
    <>
      <color attach="background" args={["#021119"]} />
      <OrbitControls />
      <Lines />
    </>
  );
}
