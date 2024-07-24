import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import { Physics } from "@react-three/rapier";
import BlockAxe from "./BlockAxe";
import BlockLimbo from "./BlockLimbo";
import BlockSpinner from "./BlockSpinner";
import Player from "./Player.jsx";

export default function Experience() {
  return (
    <>
      <Physics debug>
        <Lights />
        <Level count={7} blockTypes={[BlockSpinner, BlockLimbo, BlockAxe]} />
        <Player />
      </Physics>
    </>
  );
}
