'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, useGLTF, Stage } from '@react-three/drei'
import * as THREE from 'three'

interface RideModel3DProps {
  modelPath: string
}

function Model({ path }: { path: string }) {
  const meshRef = useRef<THREE.Group>(null)
  
  // In production, load actual glTF model
  // const { scene } = useGLTF(path)
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
  })

  return (
    <group ref={meshRef}>
      {/* Placeholder geometry */}
      <mesh castShadow>
        <boxGeometry args={[2, 1, 3]} />
        <meshStandardMaterial color="#5C3A2E" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Wheels */}
      {[
        [-0.8, -0.5, 1],
        [0.8, -0.5, 1],
        [-0.8, -0.5, -1],
        [0.8, -0.5, -1],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.3, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

export default function RideModel3D({ modelPath }: RideModel3DProps) {
  return (
    <div className="h-96 w-full rounded-xl overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[4, 2, 4]} fov={50} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={2}
        />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Stage environment="sunset" intensity={0.5}>
            <Model path={modelPath} />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  )
}