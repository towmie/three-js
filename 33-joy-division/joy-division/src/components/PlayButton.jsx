import { useStore } from "../store/store";
import { VscMute } from "react-icons/vsc";
import { VscUnmute } from "react-icons/vsc";

function PlayButton() {
  const setIsPlaying = useStore((state) => state.setIsPlaying);
  const isPlaying = useStore((state) => state.isPlaying);

  return (
    <div>
      <button id="play-button" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? <VscMute /> : <VscUnmute />}
      </button>
    </div>
  );
}

export default PlayButton;
