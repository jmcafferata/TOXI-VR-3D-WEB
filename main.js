import './style.css'

import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// limited orbit controls
const controls = new OrbitControls(camera, document.querySelector('#bg'))
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true

// make #persona non draggable
let persona = document.getElementById('persona')
persona.ondragstart = function() { return false; }

// anti-aliasing
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
  alpha: true
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight

  camera.updateProjectionMatrix()
})

// Rotating sphere
const geometry = new THREE.SphereGeometry(32, 32, 32)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
const sphere = new THREE.Mesh(geometry, material)

scene.add(sphere)

// lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0,5,30)
pointLight.intensity = 200

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

let logo;
// add a gltf model from img/toxilogo.gltf
const loader = new GLTFLoader()
loader.load('img/toxilogo.gltf', (gltf) => {
  // position 
  gltf.scene.position.set(0, 3.5, 21)
  // scale
  gltf.scene.scale.set(0.1, 0.1, 0.1)
  scene.add(gltf.scene)

  logo = gltf.scene
})



let laberinto;
// add a gltf model from img/lab.gltf
loader.load('img/laberintoXport.gltf', (gltf) => {
  // position 
  gltf.scene.position.set(-5.2, -1, 23)
  // scale
  gltf.scene.scale.set(0.11,0.11,0.11)
  scene.add(gltf.scene)

  laberinto = gltf.scene
})


// add a plane with a texture from img/formas-logo.png. it has alpha channel
const formaTexture = new THREE.TextureLoader().load('img/formas-logo.png')




const forma = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshBasicMaterial({ map: formaTexture, transparent: true })
)

scene.add(forma)
// same position as laberitno
forma.position.set(-2.3, -10, 26)
forma.scale.set(0.06,0.017,0.11)
// move pivot to right
forma.geometry.translate(-15, 0, 0)




function animate() {
  requestAnimationFrame(animate)

  sphere.rotation.y += 0.0001

  if (logo) {
    logo.rotation.y += 0.01
  }

  if (laberinto) {
    laberinto.rotation.y += 0.001
  }

  if (forma) {
    // bob up and down
    forma.position.y = Math.sin(Date.now() * 0.002) * 0.1-1.2
    // wave left and right rotation
    


  }

  renderer.render(scene, camera)
}

animate()

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Fallback to 3000 if process.env.PORT is not set
app.listen(port, () => console.log(`Listening on port ${port}`));
