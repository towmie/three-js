function Donut({ position, scale, rotation, matcapTexture }) {
  return (
    <mesh position={position} scale={scale} rotation={rotation}>
      <torusGeometry />

      <meshMatcapMaterial matcap={matcapTexture} />
    </mesh>
  );
}

export default Donut;
