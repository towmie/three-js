import { PositionalAudio } from "@react-three/drei";
import track from "../assets/Interzone.mp3";
import { useEffect, useRef } from "react";
import { useStore } from "../store/store";

export default function Audio() {
  const audio = useRef();
  const isPlaying = useStore((state) => state.isPlaying);
  console.log(isPlaying);

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.stop();
    }
  }, [isPlaying]);

  return (
    <PositionalAudio
      ref={audio}
      url={track}
      distance={10000}
      autoplay={true}
      load
    />
  );
}
