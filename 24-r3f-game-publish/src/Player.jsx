import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useGame from "./useGame";

function Player() {
  const ballRef = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount = useGame((state) => state.blocksCount);
  const { rapier, world } = useRapier();

  useFrame((state, delta) => {
    // Controls
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    ballRef.current.applyImpulse(impulse);
    ballRef.current.applyTorqueImpulse(torque);

    // Camera
    const ballPosition = ballRef.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(ballPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(ballPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);

    // phases
    if (ballPosition.z < -(blocksCount * 4 + 2)) end();
    if (ballPosition.y < -4) restart();
  });

  function jump() {
    const origin = ballRef.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit.timeOfImpact < 0.15) {
      ballRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  }
  function reset() {
    ballRef.current.setTranslation({ x: 0, y: 1, z: 0 });
    ballRef.current.setLinvel({ x: 0, y: 0, z: 0 });
    ballRef.current.setAngvel({ x: 0, y: 0, z: 0 });
  }

  useEffect(() => {
    const unsobsribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") reset();
      }
    );
    const unsubscribe = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump();
      }
    );
    const unsubscribeAny = subscribeKeys(() => {
      start();
    });
    return () => {
      unsubscribe();
      unsubscribeAny();
      unsobsribeReset();
    };
  }, []);

  return (
    <RigidBody
      linearDamping={0.5}
      angularDamping={0.5}
      ref={ballRef}
      canSleep={false}
      colliders="ball"
      restitution={0.2}
      friction={1}
      position={[0, 1, 0]}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="mediumpurple" flatShading />
      </mesh>
    </RigidBody>
  );
}

export default Player;
