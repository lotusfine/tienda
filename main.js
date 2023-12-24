import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


// configuracion inicial
const container = document.querySelector('#scene-container');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.gammaFactor = 2.0;
renderer.gammaOutput = true;
renderer.setClearColor(new THREE.Color(0xfffdd0));
container.appendChild(renderer.domElement);
const loader = new GLTFLoader();
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;
camera.position.y = 8;
camera.position.x = 10;

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
container.appendChild(labelRenderer.domElement);


//////////////////////////////////////////////////////////////////////////////////////

//control de camara
const controls = new OrbitControls(camera, labelRenderer.domElement);
controls.enabled = true;




///////////////////////////////////luces////////////////////////////////////////

// primera luz - Punto de luz
//const light1 = new THREE.PointLight(0xFFFFFF, 100, 100);
//light1.position.set(-10, -10, 10);
//scene.add(light1);

// segunda luz (izquierda)
//const light2 = new THREE.DirectionalLight(0xFFFFFF, 6, 50);
//light2.position.set(-90, 30, -10);
//scene.add(light2);

// tercera luz (derecha)
const light3 = new THREE.AmbientLight(0xFFFFFF, 6, 50);
light3.position.set(10, 30, -10);
scene.add(light3);

/////////////////////////////funciones////////////////////////////////////////////////////

// Define los puntos A y B en un alcance más amplio
//const pointA = new THREE.Vector3(-7, 0, 0);
//const pointB = new THREE.Vector3(15, 0, -130);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // Rotación continua
    if (lemonModel) {
        lemonModel.rotation.y += 0.00;
		lemonModel.rotation.x += 0.00; // Ajusta esta velocidad según sea necesario
    }
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

// Cargando el limón
// Cargando el modelo
let lemonModel;
loader.load('pentax/scene.gltf', function (gltf) {
    lemonModel = gltf.scene;

    // Mover el modelo un poco 
    lemonModel.position.y -= 2;


    lemonModel.traverse(function (child) {
        if (child.isMesh) {
            // Modificar la rugosidad (roughness)
            child.material.roughness = 0.5;  // Ajusta este valor según tus necesidades

            // Modificar la metalicidad (metalness)
            child.material.metalness = 0.5;  // Ajusta este valor según tus necesidades
        }
    });

    // Aquí creas y posicionas el CSS2DObject para el texto
    const textElement = document.getElementById('textoModelo');
    const textLabel = new CSS2DObject(textElement);
    textLabel.position.set(0, 7, 0); // Ajusta esta posición según tus necesidades
    lemonModel.add(textLabel);
    textElement.style.display = 'block';

    // Ahora agregas el modelo a la escena
    scene.add(lemonModel);

    // Inicia la animación de movimiento si es necesario
    //moveModel(pointB);
});



// Resto de tu código...


// Función para mover el modelo de A a B y viceversa
/*function moveModel(targetPosition) {
    gsap.to(lemonModel.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 5,
        ease: "power1.inOut",
        onComplete: () => {
            // Cuando llega a un punto, comienza la animación hacia el otro
            moveModel(targetPosition === pointA ? pointB : pointA);
        }
    });
}*/

animate();





