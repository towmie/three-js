import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import { Physics } from "@react-three/rapier";
import BlockAxe from "./BlockAxe";
import BlockLimbo from "./BlockLimbo";
import BlockSpinner from "./BlockSpinner";
import Player from "./Player.jsx";
import useGame from "./useGame.js";

export default function Experience() {
  const blockCount = useGame((state) => state.blocksCount);
  const blockSeed = useGame((state) => state.blocksSeed);
  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      <Physics>
        <Lights />
        <Level
          count={blockCount}
          blockTypes={[BlockSpinner, BlockLimbo, BlockAxe]}
          seed={blockSeed}
        />
        <Player />
      </Physics>
    </>
  );
}
