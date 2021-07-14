// rgbToHsl = (r, g, b) => {
 
//   // Make r, g, and b fractions of 1
//   r /= 212;
//   g /= 216;
//   b /= 215;
  
 
//   // Find greatest and smallest channel values
//   let cmin = Math.min(r,g,b),
//     cmax = Math.max(r,g,b),
//     delta = cmax - cmin,
//     h = 0,
//     s = 0,
//     l = 0;
 
//   // Calculate hue
//   // No difference
//   if (delta == 0)
//     h = 0;
//   // Red is max
//   else if (cmax == r)
//     h = ((g - b) / delta) % 6;
//    // Green is max
//   else if (cmax == g)
//     h = (b - r) / delta + 2;
//   // Blue is max
//   else
//     h = (r - g) / delta + 4;
//     h = Math.round(h * 60);
 
//   // Make negative hues positive behind 360°
//   if (h < 0)
//     h += 360;
 
//   // Calculate lightness
//   l = (cmax + cmin) / 2;
 
//   // Calculate saturation
//   s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
 
//   // Multiply l and s by 100
//   s = +(s * 100).toFixed(1);
//   l = +(l * 100).toFixed(1);
 
//   return [h, s, l];
// }

// const hsl = rgbToHsl( bgColor[0], bgColor[1], bgColor[2] );

// window.addEventListener( 'scroll', () => {
//   let y = ( window.scrollY || window.pageYOffset ) / 100;
//   y = y < 0 ? 0 : y;  // Sarari でのエラスティック(マイナス方向への)スクロール対策
  
//   // スクロール量を元に適度な lig 値を求める
//   const lig = hsl[2] + y * 10,
//          [ h, s, l ] = [ hsl[0], hsl[1], lig ];
 
//   // 対象要素の background-color を HSL 形式で lig だけ変更
//   //container.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`

//   scene.background = new THREE.Color(`hsl(${h}, ${s}%, ${l}%)`);//これじゃダメ、、、
//  } );


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb8bebf);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.querySelector("#threeJS").appendChild( renderer.domElement );

var light = new THREE.DirectionalLight(0xffffff);
light.intensity = 2; // 光の強さを倍に

// directionalLight.shadow.camera.left = -10;
//     directionalLight.shadow.camera.right = 10;
//     directionalLight.shadow.camera.top = -10;
//     directionalLight.shadow.camera.bottom = 10;
//上追加すると真っ暗になる。光判定はあるっぽい？

// ライトの位置を変更
light.position.set(0, 1, 0).normalize();

scene.add(light);

const geometry1 = new THREE.BoxGeometry(2, 2, 2);
const material1 = new THREE.MeshBasicMaterial( { color: 0x808080 } );
const cube1 = new THREE.Mesh( geometry1, material1 );

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial( { color: 0x808080 } );
const cube2 = new THREE.Mesh( geometry2, material2 );


scene.add( cube1 );

scene.add( cube2 );
cube2.position.set(3, 3, 0);
camera.position.z = 5;

const animate = function () {
  requestAnimationFrame( animate );
  // cube.rotation.x +=　0.001 ;
  // cube.rotation.y +=　0.001 ;
  // //cube.rotation.x = window.scrollY * 0.001 ;//どんどん加速しちゃう
  //cube.rotation.y = window.scrollY * 0.001 ;
  renderer.render( scene, camera );

  // var isScrolling = 0 ;
  // var timeoutId ;

  // window.addEventListener( "scroll", function () {
	//   isScrolling = 1 ;

	  // スクロールを停止して500ms後に終了とする
	  //clearTimeout( timeoutId ) ;

	  // timeoutId = setTimeout( function () {
		//   isScrolling = 0 ;
	  // }, 500 ) ;
  //} ) ;

  // if(isScrolling = 1){
    cube1.rotation.x = window.scrollY * 0.001 ;
    cube1.rotation.y = window.scrollY * 0.001 ;

    cube2.rotation.x = window.scrollY * 0.002 ;
    cube2.rotation.y = window.scrollY * 0.002 ;
  // }
  // else if(isScrolling = 0){
  //   cube1.rotation.x +=　0.001 ;
  //   cube1.rotation.y +=　0.001 ;
  // }
};
animate();


// $(document).ready( function() {
//   // Rendererを用意
//   var renderer = new THREE.WebGLRenderer( { 'canvas' : $('#canvas')[0] } );

//   // Cameraを用意
//   var camera = new THREE.PerspectiveCamera();
//   camera.position.z = 500;

//   // 物体の用意
//   var geometry = new THREE.CubeGeometry(200, 200, 200);
//   var material = new THREE.MeshLambertMaterial( { color: 0x00ff88 } )
//   var mesh = new THREE.Mesh( geometry, material );
//   mesh.rotation.x = 0.5;
//   mesh.rotation.y = 0.5;

//   // Sceneを用意
//   var scene = new THREE.Scene();
//   scene.add( mesh );

//   // render
//   renderer.render( scene, camera );      
// } );