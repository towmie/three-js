import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import { useMemo } from "react";
import * as THREE from "three";
import planeFragmentShader from "../shaders/planeFragment.glsl";

const lineGeometry = new THREE.BoxGeometry(5, 0.03, 0.02, 256, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(5, 1.5, 128, 1);

function Line({ index }) {
  const uniforms = useMemo(
    () => ({
      uOffset: { value: index * 11 },
    }),
    [index]
  );
  return (
    <>
      <mesh position-z={-index * 0.095} geometry={lineGeometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <mesh
        position-z={-index * 0.095}
        position-y={-0.75}
        geometry={planeGeometry}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={planeFragmentShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
        {/* <meshBasicMaterial side={THREE.DoubleSide} color={"black"} /> */}
      </mesh>
    </>
  );
}

export default Line;
