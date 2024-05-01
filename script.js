document.addEventListener("DOMContentLoaded", function() {
    function randomGlitch() {
        const minTimeBetweenGlitches = 5000; // 5 seconds minimum between glitches
        const maxTimeBetweenGlitches = 20000; // 20 seconds maximum between glitches
        const glitchCount = Math.floor(Math.random() * 2) + 1; // 1 or 2 glitches per occurrence
        
        function triggerGlitch() {
            const button = document.querySelector('#playButton a');
            const glitchDuration = Math.floor(Math.random() * (3000 - 100 + 1) + 100); // Random duration between 100ms and 3000ms
            button.style.animation = `glitch-effect ${glitchDuration}ms ease-in-out`;
            setTimeout(() => {
                button.style.animation = 'none';
            }, glitchDuration); // End the glitch after the random duration
        }

        for (let i = 0; i < glitchCount; i++) {
            const waitTime = i * 1000; // Waiting 1 second between multiple glitches in the same occurrence
            setTimeout(triggerGlitch, waitTime); // Trigger each glitch 1 second apart
        }

        const randomDelayBetweenGlitches = Math.floor(Math.random() * (maxTimeBetweenGlitches - minTimeBetweenGlitches + 1) + minTimeBetweenGlitches);
        setTimeout(randomGlitch, randomDelayBetweenGlitches + glitchCount * 1000); // Schedule the next round of glitches
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
