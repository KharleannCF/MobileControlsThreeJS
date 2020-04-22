//Creacion general de la escena

const THREE = require('three');
import CameraControls from 'camera-controls';

CameraControls.install({THREE : THREE});

const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({canvas, alpha:true});
const clock = new THREE.Clock();
let loader = new THREE.CubeTextureLoader();

let bgTexture = loader.load(['Textures/side1.jpg', 'Textures/side2.jpg','Textures/sky.jpg', 'Textures/floor.jpg','Textures/front.jpg', 'Textures/back.jpg'])
scene.background = bgTexture;

const camera = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight, 0.1, 50);
const cameraControls = new CameraControls( camera, renderer.domElement );
cameraControls.setLookAt( 0, 2, -20, 0, 2, -19.999, false );
cameraControls.truckSpeed = 0;
cameraControls.dollySpeed = 0;


loader = new THREE.TextureLoader();
let geoFloor = new THREE.PlaneGeometry(1000, 1000, 32);
let texture = loader.load('Textures/ground.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
const timesToRepeatHorizontally = 500;
const timesToRepeatVertically = 500;
texture.repeat.set(timesToRepeatHorizontally, timesToRepeatVertically);


let matFloor = new THREE.MeshBasicMaterial({map:texture, side: THREE.DoubleSide});
let mesh = new THREE.Mesh(geoFloor, matFloor);
mesh.position.set(0,0,0);
mesh.rotateX(Math.PI/2);
scene.add(mesh);

var size = 1000;
var divisions = 1000;

var gridHelper = new THREE.GridHelper( size, divisions, 0x0, 0x0 );
gridHelper.position.set(0,0.01,0);
scene.add( gridHelper );


//controles Moviles

let speedMovement = 50;
let rotateSpeed = 0.5;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let rotateUp = false;
let rotateDown = false;
let rotateLeft = false;
let rotateRight = false;

//this function receive a speed, defined before, and a delta
//the delta is defined by the threeJS clock
//Delta values is in the order of 10^-2
//This would decrease your movement speed
//example: if your movement speed is 5 the final result would be 0.05
//this is assuming delta is only 10^-2 (it is a irational number)
function movement(speed, delta){
	let moveZ = Number(moveForward) -Number(moveBackward);
  	let moveX = Number(moveRight) - Number(moveLeft);
  	if (moveZ) {
  		cameraControls.forward(speed*delta*moveZ,true);
  	}
  	if (moveX) {
	  	cameraControls.truck(speed*delta*moveX,0,true);
  	}
}

function rotation(delta){
	let rotateY = Number(rotateUp) -Number(rotateDown);
  	let rotateX = Number(rotateLeft) - Number(rotateRight);
  	if (rotateY) {
  		cameraControls.rotate(0,rotateSpeed*delta*rotateY,true);
  	}
  	if (rotateX) {
	  	cameraControls.rotate(rotateSpeed*delta*rotateX,0,true);
  	}
}

const noMove = function(){
	moveBackward = false;
	moveForward = false;
	moveRight = false;
	moveLeft = false;
}
const noRotate = function(){
	rotateUp = false;
	rotateDown = false;
	rotateLeft = false;
	rotateRight = false;
}




let onKeyDown = function ( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = true;
			break;
		case 37: // left
		case 65: // a
			moveLeft = true;
			break;
		case 40: // down
		case 83: // s
			moveBackward = true;
			break;
		case 39: // right
		case 68: // d
			moveRight = true;
			break;
		}

};
//event function that works when a key is released
let onKeyUp = function ( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = false;
			break;
		case 37: // left
		case 65: // a
			moveLeft = false;
			break;
		case 40: // down
		case 83: // s
			moveBackward = false;
			break;
		case 39: // right
		case 68: // d
			moveRight = false;
			break;
		}
};

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

//Codigo Temporal
const up = document.getElementById("up");
const left = document.getElementById("left");
const right = document.getElementById("right");
const down = document.getElementById("down");


const upRot = document.getElementById("upRot");
const leftRot = document.getElementById("leftRot");
const rightRot = document.getElementById("rightRot");
const downRot = document.getElementById("downRot");




const touchMoveDown = function(event){
	event.preventDefault();
	event.stopPropagation();
	switch (event.target.id){
		case 'up':
			moveForward = true;
			break;
		case 'left':
			moveLeft = true;
			break;
		case 'right':
			moveRight = true;
			break;
		case 'down':
			moveBackward = true;
			break;
	}
}
const touchMoveUp = function(event){
	event.preventDefault();
	event.stopPropagation();
	switch (event.target.id){
		case 'up':
			moveForward = false;
			break;
		case 'left':
			moveLeft = false;
			break;
		case 'right':
			moveRight = false;
			break;
		case 'down':
			moveBackward = false;
			break;
	}
}

const touchRotationDown = function(event){
	event.preventDefault();
	event.stopPropagation();
	switch (event.target.id){
		case 'upRot':
			rotateUp = true;
			break;
		case 'leftRot':
			rotateLeft = true;
			break;
		case 'rightRot':
			rotateRight = true;
			break;
		case 'downRot':
			rotateDown = true;
			break;
	}
}
const touchRotationUp = function(event){
	event.preventDefault();
	event.stopPropagation();
	switch (event.target.id){
		case 'upRot':
			rotateUp = false;
			break;
		case 'leftRot':
			rotateLeft = false;
			break;
		case 'rightRot':
			rotateRight = false;
			break;
		case 'downRot':
			rotateDown = false;
			break;
	}
}



up.addEventListener('touchstart', touchMoveDown);
up.addEventListener('touchend', touchMoveUp);
left.addEventListener('touchstart', touchMoveDown);
left.addEventListener('touchend', touchMoveUp);
right.addEventListener('touchstart', touchMoveDown);
right.addEventListener('touchend', touchMoveUp);
down.addEventListener('touchstart', touchMoveDown);
down.addEventListener('touchend', touchMoveUp);

upRot.addEventListener('touchstart', touchRotationDown);
upRot.addEventListener('touchend', touchRotationUp);
leftRot.addEventListener('touchstart', touchRotationDown);
leftRot.addEventListener('touchend', touchRotationUp);
rightRot.addEventListener('touchstart', touchRotationDown);
rightRot.addEventListener('touchend', touchRotationUp);
downRot.addEventListener('touchstart', touchRotationDown);
downRot.addEventListener('touchend', touchRotationUp);





//Fin codigo Temporal




//responsive function
function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const pixelRatio = window.devicePixelRatio;
	const width  = canvas.clientWidth  * pixelRatio | 0;
	const height = canvas.clientHeight * pixelRatio | 0;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
	  renderer.setSize(width, height, false);
	}
	return needResize;
}

function render() {
	const delta = clock.getDelta();
	
	//It is important to call this function while rendering
	//this permit controls to work properly, if you move the camera
	//in the keydown event the event will be overwritten when you
	//hold two keys down and would not keep moving if you release the second key
	movement(speedMovement, delta);
	rotation(delta);

	//this let the render know that the camera matrix changed
	
	const hasControlUpdated = cameraControls.update(delta);
	


	if ( hasControlUpdated ) {
		renderer.render( scene, camera );
	}


	if (resizeRendererToDisplaySize(renderer)){
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}
	renderer.render(scene, camera);

	requestAnimationFrame(render);
}
requestAnimationFrame(render);
