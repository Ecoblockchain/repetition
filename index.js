
const THREE = require('three');
const HUSL = require('husl');
const OrbitControls = require('three-orbit-controls')(THREE);

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
  const num = 120;
  const width = 30;
  const rad = 0.07;

  const accent = '#00FFFF';
  const black = '#000000';

  const materialAccent = new THREE.MeshBasicMaterial({
    color: accent
  });
  const materialBlack = new THREE.MeshBasicMaterial({
    color: black
  });

  const geom = new THREE.SphereGeometry(rad, 1, 2);
  const sphereBlack = new THREE.Mesh(geom, materialBlack);
  const sphereAccent = new THREE.Mesh(geom, materialAccent);

  for (let j = 0; j < num; j++){
    for (let i = 0; i < num; i++){
      let s;
      if (Math.random() < 0.5) {
        s = sphereBlack.clone();
      } else {
        s = sphereAccent.clone();
      }

      //console.log(s);

      s.position.set(
        -0.5 * width + (i / num * width),
        -0.5 * width + (j / num * width),
         0
      );
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

