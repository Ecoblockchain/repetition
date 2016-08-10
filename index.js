
import THREE from 'three';
import Grid from './grid';

const OrbitControls = require('three-orbit-controls')(THREE);

let scene;
let camera;
let renderer;
let lastRender = new Date();

const makeGrids = () => {
  const num = 100;
  const width = 200;

  const allGrids = [];
  const numGrids = 10;

  const uniforms = {
    time: {
      type: 'f',
      value: 1.0
    },
    scale: {
      type: 'f',
      value: 1.0 / numGrids / width
    }
  };

  for (let i = 0; i < numGrids; i++){
    for (let j = 0; j < numGrids; j++){
      const x0 = (0.5 + i) * width;
      const y0 = (0.5 + j) * width;

      const g = new Grid(num, width, x0, y0, uniforms);

      g.makeGrid();
      g.makeMesh();
      camera.add(g.mesh);
      scene.add(g.mesh);
      allGrids.push(g);
    }
  }
  return allGrids;
};


const init = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 22;

  // eslint-disable-next-line
  const controls = new OrbitControls(camera);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xfaf7f0, 1);

  const allGrids = makeGrids();
  document.body.appendChild(renderer.domElement);
};


const animate = () => {
  requestAnimationFrame(animate);

  const c = Date.now();
  const tickTime = c - lastRender;

  lastRender = c;
  renderer.render(scene, camera);
};

init();
animate();

