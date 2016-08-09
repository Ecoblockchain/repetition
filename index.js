
const THREE = require('three');
const HUSL = require('husl');
var OrbitControls = require('three-orbit-controls')(THREE)

let scene;
let camera;
let renderer;

//const origin = new THREE.Vector3(0, 0, 0);

let lastRender = new Date();

//document.onmousemove = e => {
//  cursor.x = window.innerWidth - e.clientX;
//  cursor.y = window.innerHeight - e.clientY;
//};
//document.body.onmousedown = e => {
//  mouseDown = 1;
//}
//document.body.onmouseup = e => {
//  mouseDown = 0;
//}

const grid = () => {
  const num = 50;
  const width = 30;
  const rad = 0.1;
  const polyCount = 3;

  const color = HUSL.toHex(180, 65, 60);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.8
  });
  const geom = new THREE.SphereGeometry(rad, polyCount, polyCount);
  const sphere = new THREE.Mesh(geom, material);

  for (let j = 0; j < num; j++){
    for (let i = 0; i < num; i++){
      const s = sphere.clone();
      s.position.set(
        -0.5 * width + (i / num * width),
        -0.5 * width + (j / num * width),
         0
      );
      //console.log(s);
      scene.add(s);
    }
  }
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

  grid();
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
