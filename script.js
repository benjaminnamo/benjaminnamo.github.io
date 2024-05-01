document.addEventListener("DOMContentLoaded", function() {
    function randomGlitch() {
        const minTime = 5000; // 5 seconds
        const maxTime = 20000; // 20 seconds
        const glitchCount = Math.floor(Math.random() * 2) + 1; // 1 or 2 glitches
        
        function triggerGlitch() {
            const button = document.querySelector('#playButton a');
            button.style.animation = 'glitch-effect 0.5s ease-in-out';
            setTimeout(() => {
                button.style.animation = 'none';
            }, 500); // End the glitch after 0.5 seconds
        }

        for (let i = 0; i < glitchCount; i++) {
            setTimeout(triggerGlitch, i * 600); // Trigger each glitch 600 ms apart
        }

        const randomDelay = Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
        setTimeout(randomGlitch, randomDelay + glitchCount * 600); // Schedule the next round of glitches
    }

    randomGlitch(); // Start the glitch effect loop
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
