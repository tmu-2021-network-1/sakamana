rgbToHsl = (r, g, b) => {
 
  // Make r, g, and b fractions of 1
  r /= 212;
  g /= 216;
  b /= 215;
  
 
  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
 
  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
   // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;
    h = Math.round(h * 60);
 
  // Make negative hues positive behind 360°
  if (h < 0)
    h += 360;
 
  // Calculate lightness
  l = (cmax + cmin) / 2;
 
  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
 
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
 
  return [h, s, l];
}

const hsl = rgbToHsl( bgColor[0], bgColor[1], bgColor[2] );

window.addEventListener( 'scroll', () => {
  let y = ( window.scrollY || window.pageYOffset ) / 100;
  y = y < 0 ? 0 : y;  // Sarari でのエラスティック(マイナス方向への)スクロール対策
  
  // スクロール量を元に適度な lig 値を求める
  const lig = hsl[2] + y * 10,
         [ h, s, l ] = [ hsl[0], hsl[1], lig ];
 
  // 対象要素の background-color を HSL 形式で lig だけ変更
  //container.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`

  scene.background = new THREE.Color(`hsl(${h}, ${s}%, ${l}%)`);
 } );


const scene = new THREE.Scene();
//scene.background = new THREE.Color(0xb8bebf);
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
  cube.rotation.x = window.scrollY * 0.001 ;
  cube.rotation.y = window.scrollY * 0.001 ;
  renderer.render( scene, camera );
};
animate();