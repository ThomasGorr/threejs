
window.onload = () => {
const meshGenerator = require("./meshGenerator");
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("myCanvas")});
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    scene.add(pointLight);
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );

    let meshs =  meshGenerator.randomMeshs(window, scene, 10,10);


    // Render the scene/camera combnation
    renderer.render(scene, camera);

// Add an orbit control which allows us to move around the scene. See the three.js example for more details
// https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target = new THREE.Vector3(0,15,0);
    controls.maxPolarAngle = Math.PI / 2;
    controls.addEventListener( 'change', function() { renderer.render(scene, camera); } ); // add this only if there is no animation loop (requestAnimationFrame)

    requestAnimationFrame(render);

    function render() {
        meshs.forEach((mesh, index) => {
            //  mesh.position.set(index * 20, index * 10, -500);
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
        })
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
};
