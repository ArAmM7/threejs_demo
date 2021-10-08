import './three.min.js';
import {OrbitControls} from "./OrbitControls.js";

let renderer, scene, camera, controls, geometry, material, torus, pointLight, ambientLight;

function init() {

    renderer = new THREE.WebGLRenderer( { antialias:true, canvas: document.querySelector('#cv' ) } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.set( -10, -25 ,50 );

    controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener('change', renderer);
    controls.minDistance = 20;
    controls.maxDistance = 70;

    geometry  = new THREE.TorusKnotGeometry( 8, 2, 512, 16);
    material = new THREE.MeshStandardMaterial( { color: 0x36b01a, wireframe: true });
    torus = new THREE.Mesh( geometry, material );
    scene.add( torus );

    pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, -25, 50);

    ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    // let lightHelper = new THREE.PointLightHelper(pointLight)
    // let gridHelper = new THREE.GridHelper(200, 100, 0xffffff, 0xffffff );
    // scene.add( gridHelper);

    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load( '*/../assets/divine_ft.jpg');
    let texture_bk = new THREE.TextureLoader().load( '*/../assets/divine_bk.jpg');
    let texture_up = new THREE.TextureLoader().load( '*/../assets/divine_up.jpg');
    let texture_dn = new THREE.TextureLoader().load( '*/../assets/divine_dn.jpg');
    let texture_rt = new THREE.TextureLoader().load( '*/../assets/divine_rt.jpg');
    let texture_lf = new THREE.TextureLoader().load( '*/../assets/divine_lf.jpg');

    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

    for (let i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;
    let skyboxGeo = new THREE.BoxGeometry( 100, 100, 100);
    let skybox = new THREE.Mesh( skyboxGeo, materialArray );
    scene.add( skybox );

    animate();
}

    let xRot, yRot, zRot;
    xRot = THREE.MathUtils.randFloatSpread(0.07);
    yRot = THREE.MathUtils.randFloatSpread(0.07);
    zRot = THREE.MathUtils.randFloatSpread(0.07);

function animate(){
    renderer.render(scene,camera);
    torus.rotation.x += xRot;
    torus.rotation.y += yRot;
    torus.rotation.z += zRot;
    requestAnimationFrame(animate);
}

window.addEventListener( 'resize', () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();