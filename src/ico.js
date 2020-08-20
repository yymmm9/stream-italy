var $container = $('#icosahedron');
  var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setSize(window.innerHeight, window.innerHeight);
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);


  var camera = new THREE.PerspectiveCamera(80, 1, 0.1, 10000);
  var scene = new THREE.Scene();
  {
  const color = 0x000000;
  const near = 10;
  const far = 320;
  scene.fog = new THREE.Fog(color, near, far);
}
  var Ico;
  scene.add(camera);
  
  // Making the canvas responsive
  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerHeight / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerHeight, window.innerHeight);

}
  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
  // renderer.setSize($container.innerWidth, $container.innerHeight);
  $container.append(renderer.domElement);
  // Camera
  camera.position.z = 200;
  // Material
  var greyMat = new THREE.MeshPhongMaterial({
    color: new THREE.Color("rgb(255,255,255)"),
    wireframe: true,
    wireframeLinewidth: 1,

  });
        
  var Ico = new THREE.Mesh(new THREE.IcosahedronGeometry(85, 1), greyMat);
  Ico.rotation.z = 0.5;
  scene.add(Ico);

  var ambientLight = new THREE.AmbientLight(0xffffff );
  scene.add(ambientLight);

  var trackballControl = new THREE.TrackballControls(camera, renderer.domElement);
  trackballControl.rotateSpeed = 1.0; // need to speed it up a little
  trackballControl.noZoom = true;

  function update() {
    Ico.rotation.x += 2 / 500;
    Ico.rotation.y += 2 / 500;
  }
  // Render
  function render() {
    trackballControl.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    update();
  }
  render();