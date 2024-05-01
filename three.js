const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('card3D').appendChild(renderer.domElement);

// Load textures
const loader = new THREE.TextureLoader();
const textureFront = loader.load('cardfront.png'); 
const textureBack = loader.load('cardback.png');   

const geometry = new THREE.BoxGeometry(2, 3, 0.1); // Dimensions for a card-like object

// Materials using textures
const materialFront = new THREE.MeshBasicMaterial({ map: textureFront });
const materialBack = new THREE.MeshBasicMaterial({ map: textureBack });

// Use texture materials
const cardMaterials = [
    new THREE.MeshBasicMaterial({color: 0xffffff}), // Side materials can be simple colors
    new THREE.MeshBasicMaterial({color: 0xffffff}),
    new THREE.MeshBasicMaterial({color: 0xffffff}),
    new THREE.MeshBasicMaterial({color: 0xffffff}),
    materialFront,
    materialBack
];

const card = new THREE.Mesh(geometry, cardMaterials);
scene.add(card);

camera.position.z = 5;

const animate = function () {
    requestAnimationFrame(animate);

    card.rotation.y += 0.01; // Rotates the card around the y-axis

    renderer.render(scene, camera);
};

animate();
