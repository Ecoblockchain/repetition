const THREE = require('three');

//const HUSL = require('husl');

let scene;
let camera;
let renderer;
let geometry;
let material;
let mesh;

const origin = new THREE.Vector3(0, 0, 0);

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

//const birth = () => {
//  //let loc = origin.clone()
//  //if(scene.children.length>0) {
//  //  let parent =scene.children[Math.random()*(scene.children.length-1)|0];
//  //  loc.copy(parent.position);
//  //}
//  //let color  =  HUSL.toHex(Math.random()*360|0, 65,60);
//  //let material = new THREE.MeshBasicMaterial( { color, transparent: true, opacity: 0.8 } )
//  //geometry = new THREE.SphereGeometry( .1, 7, 7 )
//  //mesh = new THREE.Mesh( geometry, material )
//  //mesh.position.copy(loc)
//  //mesh.velocity = new THREE.Vector3((Math.random()-0.5),(Math.random()-0.5),(Math.random()-0.5))
//  //scene.add( mesh )
//};

const init = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 22;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xfaf7f0, 1);
  document.body.appendChild(renderer.domElement);
};


const animate = () => {
  requestAnimationFrame(animate);
  //scene.children.forEach(me => {
  //if(me.type!=="Mesh") return

  //me.geometry.normalize()
  //let scale =  1 + (1 * Math.cos(Date.now()/10000))
  //me.geometry.scale(scale,scale,scale);

  //let move = origin.clone()
  //scene.children.forEach(friend => {
  //  if(friend === me || friend.type !== "Mesh") return
  //  let distance = friend.position.clone().sub(me.position)
  //  let delta = distance.length()
  //  if(delta < 3) //avoid close neighbors
  //    move.sub(distance.setLength(Math.pow(delta, -1) * 10))
  //  else if(delta > 150) //attract to further neighbors
  //    move.add(distance.max(25))
  //  else
  //    mouseDown ? //rotate center
  //    move.add(origin.clone().crossVectors(me.velocity,friend.velocity).divideScalar(10)) :
  //    move.add(me.position.clone().cross(distance))
  //    // move.sub(me.position.clone().cross(distance)) :
  //
  //})
  //me.velocity.add(move.normalize().divideScalar(20))
  //me.velocity.sub(me.position.clone().divideScalar(cursor.y * 2))
  //me.position.add(me.velocity.normalize().divideScalar( 1 + (cursor.x / 100)))
  //})

  const c = Date.now();
  const tickTime = c - lastRender;

  lastRender = c;
  renderer.render(scene, camera);
};

init();
animate();
