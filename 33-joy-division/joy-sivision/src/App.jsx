import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";

function App() {
  return (
    <Canvas camera={{ fov: 45, near: 0.1, far: 20, position: [0, 9, -8] }}>
      <Scene />
    </Canvas>
  );
}

export default App;
