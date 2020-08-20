

var container;
var camera, scene, renderer;
var mesh, group1, group2, group3, light;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    container = document.getElementById('icosahedron');

    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerWidth, 1, 10000);
    camera.position.z = 2000;

    
     
    scene = new THREE.Scene();

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1);  
    scene.add(light);

    var faceIndices = ['a', 'b', 'c', 'd'];
    var color, f, f2, f3, p, n, vertexIndex, 

    radius = 170,
    geometry = new THREE.IcosahedronGeometry(radius, 1);

    var materials = [
        new THREE.MeshLambertMaterial({
            color: 0x000000,
            shading: THREE.FlatShading,
            vertexColors: THREE.VertexColors
        }),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading,
            wireframe: true,
            transparent: true
        })
    ];

    group = THREE.SceneUtils.createMultiMaterialObject(geometry, materials);
 
    scene.add(group);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerWidth);
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);


    container.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);


}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerWidth;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerWidth);

}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}



function animate() {

    requestAnimationFrame(animate);
    
    render();
}

function render() {
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}