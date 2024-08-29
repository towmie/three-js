import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import PlayButton from "./components/PlayButton";

function App() {
  return (
    <>
      <Canvas camera={{ fov: 45, near: 0.1, far: 20, position: [0, 9, -8] }}>
        <Scene />
      </Canvas>
      <PlayButton />
    </>
  );
}

export default App;
