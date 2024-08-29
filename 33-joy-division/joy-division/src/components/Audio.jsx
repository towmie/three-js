import { PositionalAudio } from "@react-three/drei";
import track from "../assets/Interzone.mp3";
import { createRef, useEffect, useRef } from "react";
import { useStore } from "../store/store";
import * as THREE from "three";

export const analyserRef = createRef();

export default function Audio() {
  const audio = useRef();
  const isPlaying = useStore((state) => state.isPlaying);

  useEffect(() => {
    if (isPlaying) {
      analyserRef.current = new THREE.AudioAnalyser(audio.current, 512);
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
