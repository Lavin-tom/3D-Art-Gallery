import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { SpotLight, Text, ScrollControls, Scroll, Html } from '@react-three/drei'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import { TextureLoader, Vector3 } from 'three'

const ART_PIECES = [
  {
    title: 'Art1',
    imgPath: '/ar1.jpg',
  },
  {
    title: 'Art2',
    imgPath: '/ar2.jpg',
  },
  {
    title: 'Art3',
    imgPath: '/ar3.jpg',
  },
  {
    title: 'Art4',
    imgPath: '/ar4.jpg',
  },
  {
    title: 'Art5',
    imgPath: '/ar5.jpg',
  },
  {
    title: 'Art6',
    imgPath: '/ar6.jpg',
  },
  {
    title: 'Art7',
    imgPath: '/ar7.jpg',
  },
  {
    title: 'Art8',
    imgPath: '/ar8.jpg',
  },
  {
    title: 'Art9',
    imgPath: '/ar9.jpg',
  },
  {
    title: 'Art10',
    imgPath: '/ar10.jpg',
  }
]

const WallArt = (props) => {
  const { art, i } = props
  const { width: w, height: h } = useThree((state) => state.viewport);
  const gap = 4;
  const wallHeight = 4.5; 
  const imageWidth = wallHeight; 
  const texture = useLoader(TextureLoader, art.imgPath)

  // Use the 'h' variable somewhere in your component to avoid the unused variable error
  console.log("Height:", h);

  return (
    <>
      <group>
        <SpotLight
          position={[(i + 1) * (imageWidth + gap) + (i + 1) - w / 4, 2.5, 1]}
          penumbra={1}
          angle={0.6}
          attenuation={1}
          anglePower={5}
          intensity={10}
          distance={10}
          castShadow
          color={0xffffff}
        />
        <mesh castShadow position={[(i + 1) * (imageWidth + gap) + (i + 1), 0, 0]}>
          <boxBufferGeometry attach="geometry" args={[imageWidth, imageWidth, 0.07]} />
          <meshStandardMaterial
            attach="material"
            map={texture}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        <mesh position={[(i + 1) * (imageWidth + gap) + (i + 1), -2.5, 0]}>
          <planeGeometry args={[1.25, 0.5]} />
          <meshStandardMaterial color={0xFAEBD7} />
          <Text
            position-z={0}
            scale={[2, 2, 2]}
            color="black"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
          >
            {art.title}
          </Text>
        </mesh>
      </group>
    </>
  )
}

const Scene = () => {
  const { width: screenWidth } = useThree((state) => state.viewport);
  console.log("screenWidth", screenWidth)
  const textScale = screenWidth < 5.5 ? 2 : 4

  return (
    <Suspense fallback={
      <Html style={{ fontSize: '6vw', whiteSpace: 'nowrap', color: 'white' }} center>
        Loading 3D Art Gallery...
      </Html>
    }>
      <ScrollControls infinite horizontal damping={4} pages={39 * Math.exp(-0.11 * screenWidth)} distance={1}>
        <Scroll>
          <Text
            position-z={0}
            anchorX="center"
            anchorY="bottom"
            scale={[textScale, textScale, textScale]}
            color="#94A6FF"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
            castShadow
          >
            Every stroke, no matter how small, embodies artistry when seen through that lens.
          </Text>
          <Text
            position-z={1}
            anchorX="center"
            anchorY="top"
            scale={[textScale, textScale, textScale]}
            color="#FBA90A"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
            castShadow
          >

          </Text>
          <Text
            position={[0, -0.5, 1.5]}
            anchorX="center"
            anchorY="top"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
          // castShadow
          >
            ~ Lavin Tom
          </Text>

          {ART_PIECES.map((art, i) => {
            return <WallArt
              key={i}
              i={i}
              art={art}
            />
          })
          }
        </Scroll>
      </ScrollControls>
    </Suspense >
  )
}

const Rig = () => {
  const { camera, mouse } = useThree()
  const vec = new Vector3()
  return useFrame(() => camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, camera.position.z), 0.2))
}

function App() {
  return (
    <Canvas shadows camera >
      <ambientLight intensity={0.6} color={0xffffff} />

      {/* This is the wall that supports shadows */}
      <mesh
        position={[0, 0, -0.1]}
        receiveShadow
      >
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial color={0x000000} />
      </mesh>
      <Scene />

      <EffectComposer>
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>

      <Rig />
    </Canvas>
  )
}

export default App;
