document.addEventListener("DOMContentLoaded", function() {
    function randomFlicker() {
        const flickerCount = Math.floor(Math.random() * 4) + 3; // 3 to 6 flickers per occurrence 
        let currentFlicker = 0;

        function triggerFlicker() {
            const button = document.querySelector('#playButton a');
            button.style.animation = 'none'; // Reset animation to clear previous settings
            button.style.animation = 'flicker-effect 0.1s ease-in-out forwards'; // Apply flickering effect
            
            if (++currentFlicker < flickerCount) {
                setTimeout(triggerFlicker, 100); // Trigger next flicker after 100 ms
            } else {
                setTimeout(() => {
                    button.style.animation = 'none'; // Clear the animation after the last flicker
                }, 100);
            }
        }

        triggerFlicker(); // Start the flickering effect

        const nextFlickerDelay = Math.floor(Math.random() * (10000 - 3000 + 1) + 3000); // 3 to 10 seconds until next flicker session
        setTimeout(randomFlicker, nextFlickerDelay); // Schedule the next round of flickers
    }

    randomFlicker(); // Start the flicker effect loop
});



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('card3D').appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
const textureFront = loader.load('cardfront.png');
const textureBack = loader.load('cardback.png');

const geometry = new THREE.BoxGeometry(2, 3, 0.1);
const materialFront = new THREE.MeshBasicMaterial({ map: textureFront });
const materialBack = new THREE.MeshBasicMaterial({ map: textureBack });
const materials = [
    new THREE.MeshBasicMaterial({ color: 0x333333 }),
    new THREE.MeshBasicMaterial({ color: 0x333333 }),
    new THREE.MeshBasicMaterial({ color: 0x333333 }),
    new THREE.MeshBasicMaterial({ color: 0x333333 }),
    materialFront,
    materialBack
];
const card = new THREE.Mesh(geometry, materials);
scene.add(card);
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    card.rotation.y += 0.01;
    renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

animate();
