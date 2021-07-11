const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb8bebf);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.querySelector("#threeJS").appendChild( renderer.domElement );

const light = new THREE.DirectionalLight(0xffffff);
light.intensity = 2; // 光の強さを倍に
// シーンに追加
scene.add(light);
// ライトの位置を変更
light.position.set(10, 10, 10);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial( { color: 0x808080 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;

const animate = function () {
  requestAnimationFrame( animate );
  cube.rotation.x = window.scrollY * 0.001;
  cube.rotation.y = window.scrollY * 0.001;
  renderer.render( scene, camera );
};
animate();