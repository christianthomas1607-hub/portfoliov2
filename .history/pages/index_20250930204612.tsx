"use client"
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { Gltf, KeyboardControls, GradientTexture } from '@react-three/drei'
import Controller from 'ecctrl'
import { useRef, useState } from 'react'
import TexturedBox from '../components/TexturedBox'
import Popup from '../components/popup'
import { WordAndImage as WordAndImageType } from '../components/data'

// function simulateKeyEvent(key: string, type: 'keydown' | 'keyup') {
//   window.dispatchEvent(new KeyboardEvent(type, { key }))
// }


function simulateKeyEvent( key: string, type: 'keydown' | 'keyup') {
  window.dispatchEvent(new KeyboardEvent(type, {key}))
}

export default function Page() {
  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
  ]
  
  const [showPopup, setShowPopup] = useState(false)
const [selectedItem, setSelectedItem] = useState<WordAndImageType | null>(null)
  // spawn position for the player (x, y, z)
  // const spawnPosition: [number, number, number] = [0, 1.3, 0];
  // ref to controller if we need to imperatively set translation later
  const controllerRef = useRef<any>(null);
  // Handler to show popup with item data
  function handleBoxClick(item: WordAndImageType) {
    setSelectedItem(item)
    setShowPopup(true)
  }

  // Handler to close popup
  function handleClosePopup() {
    setShowPopup(false)
  }


  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0 }}>
      {showPopup ? <Popup onClose={handleClosePopup} item={selectedItem}  /> : null}
      <div className="controls">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-black mx-2 py-2 px-4 rounded inline-flex items-center"
          onPointerDown={() => { simulateKeyEvent('w', 'keydown'); simulateKeyEvent('ArrowUp', 'keydown') }}
          onPointerUp={() => { simulateKeyEvent('w', 'keyup'); simulateKeyEvent('ArrowUp', 'keyup') }}
          onPointerLeave={() => { simulateKeyEvent('w', 'keyup'); simulateKeyEvent('ArrowUp', 'keyup') }}
        >
          <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.25" stroke-linecap="butt" stroke-linejoin="arcs"><path d="M12 19V6M5 12l7-7 7 7"/>
          </svg>
          forward
        </button>
        <div className="controls-middle-row">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-black mx-2 py-2 px-4 rounded inline-flex items-center"
          onPointerDown={() => { simulateKeyEvent('a', 'keydown'); simulateKeyEvent('ArrowLeft', 'keydown') }}
          onPointerUp={() => { simulateKeyEvent('a', 'keyup'); simulateKeyEvent('ArrowLeft', 'keyup') }}
          onPointerLeave={() => { simulateKeyEvent('a', 'keyup'); simulateKeyEvent('ArrowLeft', 'keyup') }}
        >
           <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.25" stroke-linecap="butt" stroke-linejoin="arcs"><path d="M19 12H6M12 5l-7 7 7 7"/>
           </svg>
          left
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-black mx-2 py-2 px-4 rounded inline-flex items-center"
          onPointerDown={() => { simulateKeyEvent('d', 'keydown'); simulateKeyEvent('ArrowRight', 'keydown') }}
          onPointerUp={() => { simulateKeyEvent('d', 'keyup'); simulateKeyEvent('ArrowRight', 'keyup') }}
          onPointerLeave={() => { simulateKeyEvent('d', 'keyup'); simulateKeyEvent('ArrowRight', 'keyup') }}
        >
          right
          <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.25" stroke-linecap="butt" stroke-linejoin="arcs"><path d="M5 12h13M12 5l7 7-7 7"/>
          </svg>
        </button>
        </div>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-black mx-2 py-2 px-4 rounded inline-flex items-center"
          onPointerDown={() => { simulateKeyEvent('s', 'keydown'); simulateKeyEvent('ArrowDown', 'keydown') }}
          onPointerUp={() => { simulateKeyEvent('s', 'keyup'); simulateKeyEvent('ArrowDown', 'keyup') }}
          onPointerLeave={() => { simulateKeyEvent('s', 'keyup'); simulateKeyEvent('ArrowDown', 'keyup') }}
        >
           <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3.25" stroke-linecap="butt" stroke-linejoin="arcs"><path d="M12 5v13M5 12l7 7 7-7"/>
           </svg>
          backward
        </button>
      </div>
      <Canvas>
         <color attach="background" args={["white"]} />
       {/*  .7 intensity for original glb setting */}
        <directionalLight intensity={3} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]}>
          <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
        </directionalLight>
        <ambientLight intensity={0.2} />
        <Physics timeStep="vary">
          <KeyboardControls map={keyboardMap}>
            <Controller ref={controllerRef} maxVelLimit={10} 
            // position={spawnPosition}
            >
              <Gltf castShadow receiveShadow scale={.005} position={[0, -.75, 0]} src="/images/r2d2.glb" />
            </Controller>
          </KeyboardControls>
          <RigidBody type="fixed" colliders="trimesh">
            <TexturedBox onClick={handleBoxClick} />
            {/* Use -2 for /images/hall-transformed.glb */}
            {/* Use .89 for /images/star_destroyer_hallway.glb*/}
                <mesh position={[0, .89, 12]}>
                <boxGeometry args={[8, 0, 30]} />
                  <meshBasicMaterial>
                    <GradientTexture
                    stops={[0, .5, 1]} // Define the positions of the color stops (0 to 1)
                    colors={['#d8d8d8','#bababa', '#838383']} // Define the colors at each stop (red to blue)
                    size={1024} // Optional: texture resolution (default is 1024)
                    />
                  </meshBasicMaterial>
                </mesh>
                {/* <mesh position={[0, .9, 12]}>
                <boxGeometry args={[8, 0, 31]} />
                <meshStandardMaterial/>
                </mesh> */}
                <Gltf castShadow receiveShadow position={[0, 2.85, 1.25]}  scale={} src="/images/holo-puck-transformed.glb" />
            <Gltf castShadow receiveShadow position={[0, 2.85, 1.25]} rotation={[0, -Math.PI / 1, 0]} scale={1.5} src="/images/star_destroyer_hallway.glb" />
            {/* <Gltf castShadow receiveShadow position={[0, 1.5, 27]} rotation={[0, -Math.PI / 2, 0]} scale={2} src="/images/hall-transformed.glb" /> */}
            {/* <Gltf castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} scale={0.11} src="/images/fantasy_game_inn2-transformed.glb" /> */}
          </RigidBody>
        </Physics>
      </Canvas>
    </div>
  )
}