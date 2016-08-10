
const THREE = require('three');
const HUSL = require('husl');
const OrbitControls = require('three-orbit-controls')(THREE);
const ndarray = require('ndarray');


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
//

class Pillars {
  constructor(numPillars, width, x0, y0) {
    const sqr = numPillars * numPillars;
    const tnum = sqr * 6;
    const vnum = sqr * 6;

    this.width = width;
    this.x0 = x0;
    this.y0 = y0;
    this.numPillars = numPillars;
    this.tnum = tnum;
    this.vnum = vnum;

    this.nvert = 0;
    this.ntri = 0;

    this.index = new Uint16Array(tnum * 3);
    this.position = new Float32Array(vnum * 3);
    this.color = new Float32Array(vnum * 3);
    this.normal = new Float32Array(vnum * 3);

    this.ndindex = ndarray(this.index, [tnum, 3]);
    this.ndposition = ndarray(this.position, [vnum, 3]);
    this.ndcolor = ndarray(this.color, [vnum, 3]);
    this.ndnormal = ndarray(this.normal, [vnum, 3]);

    this.geometry = new THREE.BufferGeometry();

    this.geometry.setIndex(new THREE.BufferAttribute(this.index, 1));
    this.geometry.addAttribute('position', new THREE.BufferAttribute(this.position, 3));
    this.geometry.addAttribute('normal', new THREE.BufferAttribute(this.normal, 3));
    this.geometry.addAttribute('color', new THREE.BufferAttribute(this.color, 3));

    for (let t = 0; t < this.tnum; t++){
      this.ndindex.set(t, 0, 0);
      this.ndindex.set(t, 1, 0);
      this.ndindex.set(t, 2, 0);
    }

    for (let v = 0; v < this.vnum; v++){
      this.ndposition.set(v, 0, 0);
      this.ndposition.set(v, 1, 0);
      this.ndposition.set(v, 2, 0);

      this.ndcolor.set(v, 0, 0);
      this.ndcolor.set(v, 1, 0);
      this.ndcolor.set(v, 2, 0);

      this.ndnormal.set(v, 0, 0);
      this.ndnormal.set(v, 1, 0);
      this.ndnormal.set(v, 2, 0);
    }

    this.geometry.index.needsUpdate = true;
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.normal.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;

    this.ntri = 0;
    this.nvert = 0;
  }

  addPillar(x, y, w, h, b) {
    let nvert = this.nvert;
    let ntri = this.ntri;
    const shift = Math.random() * Math.PI * 2;

    for (let i = 0; i < 3; i++){
      const theta = shift + i * Math.PI / 3.0 * 2.0;
      const xx = x + Math.cos(theta) * w;
      const yy = y + Math.sin(theta) * w;
      this.ndposition.set(nvert, 0, xx);
      this.ndposition.set(nvert, 1, yy);
      this.ndposition.set(nvert, 2, b);
      nvert++;
    }

    for (let i = 0; i < 3; i++){
      const theta = shift + i * Math.PI / 3.0 * 2.0;
      const xx = x + Math.cos(theta) * w;
      const yy = y + Math.sin(theta) * w;
      this.ndposition.set(nvert, 0, xx);
      this.ndposition.set(nvert, 1, yy);
      this.ndposition.set(nvert, 2, h);
      nvert++;
    }

    this.geometry.attributes.position.needsUpdate = true;

    this.ndindex.set(ntri, 0, nvert - 3);
    this.ndindex.set(ntri, 1, nvert - 2);
    this.ndindex.set(ntri, 2, nvert - 6);
    ntri++;

    this.ndindex.set(ntri, 0, nvert - 2);
    this.ndindex.set(ntri, 1, nvert - 5);
    this.ndindex.set(ntri, 2, nvert - 6);
    ntri++;

    this.ndindex.set(ntri, 0, nvert - 2);
    this.ndindex.set(ntri, 1, nvert - 1);
    this.ndindex.set(ntri, 2, nvert - 4);
    ntri++;

    this.ndindex.set(ntri, 0, nvert - 2);
    this.ndindex.set(ntri, 1, nvert - 5);
    this.ndindex.set(ntri, 2, nvert - 4);
    ntri++;

    this.ndindex.set(ntri, 0, nvert - 1);
    this.ndindex.set(ntri, 1, nvert - 3);
    this.ndindex.set(ntri, 2, nvert - 4);
    ntri++;

    this.ndindex.set(ntri, 0, nvert - 3);
    this.ndindex.set(ntri, 1, nvert - 6);
    this.ndindex.set(ntri, 2, nvert - 4);
    ntri++;

    this.geometry.index.needsUpdate = true;

    this.nvert = nvert;
    this.ntri = ntri;
  }

  makeGrid() {
    const w = this.width;
    let h = 10;
    let b = 0;
    for (let i = 0; i < this.numPillars; i++){
      for (let j = 0; j < this.numPillars; j++){
        //h += (0.5 - Math.random()) * 2;
        //b += (0.5 - Math.random()) * 2;
        const x = this.x0 + w * (0.5 - i / this.numPillars);
        const y = this.y0 + w * (0.5 - j / this.numPillars);
        this.addPillar(x, y, 0.1, h, b);
      }
    }
  }

  makeMesh(mat){
    this.geometry.computeFaceNormals();
    this.geometry.computeVertexNormals();
    this.mesh = new THREE.Mesh(this.geometry, mat);
    this.mesh.frustumCulled = false;
  }
}

let scene;
let camera;
let renderer;
let lastRender = new Date();

const grid = () => {
  const num = 100;
  const width = 200;

  //const accent = '#00FFFF';
  //const materialAccent = new THREE.MeshBasicMaterial({
  //  color: accent
  //});
  const black = '#000000';
  const materialBlack = new THREE.MeshBasicMaterial({
    color: black
  });

  const allGrids = [];
  const numGrids = 10;

  for (let i = 0; i < numGrids; i++){
    for (let j = 0; j < numGrids; j++){
      const x0 = i * width;
      const y0 = j * width;
      const P = new Pillars(num, width, x0, y0);

      P.makeGrid();
      P.makeMesh(materialBlack);
      camera.add(P.mesh);
      scene.add(P.mesh);
      allGrids.push(P);
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

