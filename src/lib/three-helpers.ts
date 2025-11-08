import * as THREE from 'three'

/**
 * Three.js helper utilities
 * Reusable functions for 3D scenes
 */

export function createBasicLighting(scene: THREE.Scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(10, 10, 5)
  directionalLight.castShadow = true
  scene.add(directionalLight)

  return { ambientLight, directionalLight }
}

export function createGroundPlane(size: number = 20, color: string = '#8AA357') {
  const geometry = new THREE.PlaneGeometry(size, size)
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.8 })
  const plane = new THREE.Mesh(geometry, material)
  plane.rotation.x = -Math.PI / 2
  plane.position.y = -1
  plane.receiveShadow = true
  return plane
}

export function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose()
      if (child.material instanceof THREE.Material) {
        child.material.dispose()
      } else if (Array.isArray(child.material)) {
        child.material.forEach(material => material.dispose())
      }
    }
  })
}

export function createFallbackGeometry() {
  // Simple vehicle-like geometry as fallback
  const group = new THREE.Group()
  
  // Body
  const bodyGeometry = new THREE.BoxGeometry(2, 1, 3)
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: '#5C3A2E',
    metalness: 0.3,
    roughness: 0.7 
  })
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
  body.castShadow = true
  group.add(body)
  
  // Wheels
  const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16)
  const wheelMaterial = new THREE.MeshStandardMaterial({ 
    color: '#2F2F2F',
    metalness: 0.8,
    roughness: 0.3
  })
  
  const wheelPositions = [
    [-0.8, -0.5, 1],
    [0.8, -0.5, 1],
    [-0.8, -0.5, -1],
    [0.8, -0.5, -1],
  ]
  
  wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
    wheel.position.set(pos[0], pos[1], pos[2])
    wheel.rotation.z = Math.PI / 2
    wheel.castShadow = true
    group.add(wheel)
  })
  
  return group
}