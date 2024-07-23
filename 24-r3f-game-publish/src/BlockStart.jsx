function BlockStart({ position = [0, 0, 0], geometry, material }) {
  return (
    <>
      <group position={position}>
        <mesh
          geometry={geometry}
          material={material}
          scale={[4, 0.2, 4]}
          receiveShadow
          position={[0, -0.1, 0]}
        />
      </group>
    </>
  );
}

export default BlockStart;
