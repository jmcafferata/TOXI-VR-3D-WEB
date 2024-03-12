// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(400, 400);
document.body.appendChild(renderer.domElement);

// Load and display the GLB model
const loader = new GLTFLoader();
loader.load('models/molecula.glb', function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.rotation.y = Math.PI; // Adjust if needed
});

// Create and position the plane with the transparent PNG texture
const planeGeometry = new THREE.PlaneGeometry(400, 80);
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('img/ar-logo.png'),
    transparent: true,
});
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, -160, 0); // Adjust position as needed
scene.add(plane);

// Position and point the camera
camera.position.z = 500;

// Animation loop for rotating the model
function animate() {
    requestAnimationFrame(animate);

    // Slowly rotate the model here
    if (loader.scene) {
        loader.scene.rotation.y += 0.001;
    }

    renderer.render(scene, camera);
}

animate();

// CSS for positioning the canvas (add this to your CSS file or a <style> tag)
/* CSS
canvas {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-200px);
}
*/
