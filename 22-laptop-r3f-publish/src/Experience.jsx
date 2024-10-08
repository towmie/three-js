import {
  ContactShadows,
  Environment,
  Float,
  Html,
  PresentationControls,
  useGLTF,
  Text,
} from "@react-three/drei";

export default function Experience() {
  const computer = useGLTF(
    "https://threejs-journey.com/resources/models/macbook_model.gltf"
  );
  return (
    <>
      <Environment preset="city" />
      <color args={["#100a28"]} attach="background" />
      <PresentationControls
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        global
        rotation={[0.13, 0.1, 0]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <primitive object={computer.scene} position-y={-1.2}>
            <Html
              transform
              wrapperClass="html-screen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe
                src="https://andrei-ziuzin.vercel.app/"
                // frameborder="0"
              ></iframe>
            </Html>
          </primitive>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={1}
            position={[2, 0.75, 0.75]}
            rotation-y={-1.25}
            maxWidth={2}
            textAlign="center"
          >
            Andrei Ziuzin
          </Text>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.6} blur={2.4} />
    </>
  );
}
