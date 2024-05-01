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
    new THREE.MeshBasicMaterial({ color: 0x333333 }), // side colors
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
animate();
