// import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r119/three.min.js";

// const fragment = `
// uniform float time;
// uniform float porgress;
// uniform sampler2D texture1;

// void main(){
//   gl_FragColor = vec4(1., 0., 0., 1.);
// }`;
// const vertex = `
// uniform float time;
// varying vec2 vUv;
// varying vec2 vUv1;
// varying vec4 vPosition;
// varying vec3 vColor;
// varying vec3 vNormal;

// uniform sampler2D texture1;
// uniform sampler2D texture2;
// uniform vec2 pixels;
// uniform vec2 uxRate1;


// //	Simplex 3D Noise 
// //	by Ian McEwan, Ashima Arts
// //
// vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
// vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

// float snoise(vec3 v){ 
//   const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
//   const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// // First corner
//   vec3 i  = floor(v + dot(v, C.yyy) );
//   vec3 x0 =   v - i + dot(i, C.xxx) ;

// // Other corners
//   vec3 g = step(x0.yzx, x0.xyz);
//   vec3 l = 1.0 - g;
//   vec3 i1 = min( g.xyz, l.zxy );
//   vec3 i2 = max( g.xyz, l.zxy );

//   //  x0 = x0 - 0. + 0.0 * C 
//   vec3 x1 = x0 - i1 + 1.0 * C.xxx;
//   vec3 x2 = x0 - i2 + 2.0 * C.xxx;
//   vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// // Permutations
//   i = mod(i, 289.0 ); 
//   vec4 p = permute( permute( permute( 
//              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
//            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
//            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// // Gradients
// // ( N*N points uniformly over a square, mapped onto an octahedron.)
//   float n_ = 1.0/7.0; // N=7
//   vec3  ns = n_ * D.wyz - D.xzx;

//   vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

//   vec4 x_ = floor(j * ns.z);
//   vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

//   vec4 x = x_ *ns.x + ns.yyyy;
//   vec4 y = y_ *ns.x + ns.yyyy;
//   vec4 h = 1.0 - abs(x) - abs(y);

//   vec4 b0 = vec4( x.xy, y.xy );
//   vec4 b1 = vec4( x.zw, y.zw );

//   vec4 s0 = floor(b0)*2.0 + 1.0;
//   vec4 s1 = floor(b1)*2.0 + 1.0;
//   vec4 sh = -step(h, vec4(0.0));

//   vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
//   vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

//   vec3 p0 = vec3(a0.xy,h.x);
//   vec3 p1 = vec3(a0.zw,h.y);
//   vec3 p2 = vec3(a1.xy,h.z);
//   vec3 p3 = vec3(a1.zw,h.w);

// //Normalise gradients
//   vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
//   p0 *= norm.x;
//   p1 *= norm.y;
//   p2 *= norm.z;
//   p3 *= norm.w;

// // Mix final noise value
//   vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
//   m = m * m;
//   return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
//                                 dot(p2,x2), dot(p3,x3) ) );
// }


// vec3 hsv2rgb(vec3 c){
//     vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//     vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//     return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
// }

// void main() {
//     float noise = snoise(position*10. + time/20.);

//     vec3 newPosition = position*(noise + 0.5);

//     vColor = hsv2rgb(vec3(noise*0.1, 0.8, 0.8));

//     vNormal = normal;

//     gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
//  }`;

// const fragmentParticles = `
// uniform float time;
// uniform float porgress;
// uniform sampler2D texture1;
// uniform sampler2D texture2;
// uniform vec4 resolution;

// varying vec2 vUv;
// varying vec4 vPosition;

// varying vec3 vColor;
// varying vec3 vNormal;

// void main(){
//     vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

//     vec3 light = vec3(0.);
//     vec3 skyColor = vec3(1.000, 1.000, 0.547);
//     vec3 groundColor = vec3(0.562, 0.275, 0.111);

//     vec3lightDirection = normalize(vec3(0., -1., -1.));

//     light += dot(lightDirection, vNormal);

//     light = mix(skyColor, groundColor, dot(lightDirection, vNormal));

//     gl_FragColor = vec4(vColor, 1.);
//     gl_FragColor = vec4(light*vColor, 1.);
//     //gl_FragColor = vec4(vNormal,1.);
// }`;
// const vertexParticles = `
// uniform float time;
// varying vec2 vUv;
// varying vec2 vUv1;
// varying vec4 vPosition;

// uniform sampler2D texture1;
// uniform sampler2D texture2;
// uniform vec2 pixels;
// uniform vec2 uvRate1;

// void main( {
//   vUv = uv;

//   vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
//   gl_PointSize = 10. * (1. / - mvPosition.z);
//   gl_Position = projectionMatrix * mvPosition;
// }`;

import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import fragmentParticles from "./shaders/fragmentParticles.glsl";
import vertexParticles from "./shaders/vertexParticles.glsl";
// import * as dat from "dat.gui";


// import { TimelineMax } from "gsap";
// let OrbitControls = require("three-orbit-controls")(THREE);

export default class Sketch{
  constructor(selector){
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 1);

    this.container = document.getElementById("container");
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.0001,
      1000
    );

    this.camera.position.set(0, 0, 4);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElment);
    this.time = 0;

    this.paused = false;


    this.setupResize();

    this.addObjects();
    this.addParticles();
    this.resize();
    this.render();
  }


  setupResize(){
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize(){
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;



    this.camera.updateProjectionMatrix();
  }
  addObjects(){
  let that = this;
  this.material = new THREE.ShaderMaterial({
    extensions:{
      derivatices: "#extension GL_DES_standard_derivatives: enable"
    },
    side: THREE.DoubleSide,
    uniforms: {
      time: { type: "f", value: 0},
      resolution: { type:"v4", value: new THREE.Vector4() },
      uvRate1: {
        value: new THREE.Vector2(1, 1)
      }
    },

    vertexShader: vertex,
    fragmentShader: fragment
  });

  this.geometry= new THREE.SphereBufferGeometry( 1, 164, 164 );

  this.plane = new THREE.Mesh(this.geometry, this.material);
  this.scene.add(this.plane);
}

addParticles(){

  this.particleMaterial = new THREE.ShaderMaterial({
    extensions: {
      derivatices: "#extension GL_OES_standard_derivatives : enable"
    },
    side: THREE.DoubleSide,
    uniforms: {
      time: { type: "f", value: 0},
      resolution: { type: "v4", value: new THREE.Vector4( )},
      uvRate1: {
        value: new THREE.Vector2(1, 1)
      }
    },

    transparent: true,

    vertexShader: vertexParticles,
    fragmentShader: fragmentParticles
  });

  let n = 1000;
  let positions = new Float32Array( n * 3);

  this.particleGeometry = new THREE.BufferGeometry();

  let inc = Math.PI*(3 - Math.sqrt(5));
  
  let off = 2/n;
  let rad = 1.7;

  for(let i = 0; i < n ; i++){
    
    let y = i * off - 1 + (off/2);
    let r = Math.sqrt(1 - y*y);
    let phi = i * inc;

    positions[3*i] = rad*Math.cos(phi)*r;
    positions[3*i+1] = rad*y;
    positions[3*i+2] = rad*Math.sin(phi)*r;
  }

  this.particleGeometry.setAttribute( 'position', new THREE.BufferAttribute(positions, 3));
  this.points = new THREE.Points(this.particleGeometry, this.particleMaterial);

  // this.points = new THREE.Points(this.particleGeometry, this. particleMaterial);
  this.scene.add(this.points);
}

stop(){
  this.paused = true;
}

play(){
  this.paused = false;
  this.render();
}

render(){
  if(this.paused) return;
  this.time += 0.05;
  this.material.uniforms.time.value = this.time;
  this.particleMaterial.uniforms.time.value = this.time; 
  this.points.rotation.y = this.time/10; 
  requestAnimationFrame(this.render.bind(this));
  this.renderer.render(this.scene, this.camera);
}
}

new Sketch("container");