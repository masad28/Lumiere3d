let scene;
let camera;
let renderer;
let perfumeModel;
let controls;
let isRotating = false;
let isWireframe = false;

init();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);

    camera = new THREE.PerspectiveCamera(
        75,
        1200 / 500,
        0.1,
        1000
    );

    camera.position.set(0, 1.5, 8);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(1200, 500);

    const clickSound = document.getElementById("clickSound");

    document.getElementById("three-container").appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.7;
    controls.panSpeed = 0.5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(3, 5, 4);
    scene.add(directionalLight);

    loadModel("rose-bloom");

    document.getElementById("roseBtn").addEventListener("click", function () {
        loadModel("rose-bloom");

        clickSound.currentTime = 0;
        clickSound.play();      

        document.getElementById("modelTitle").innerText = "Rose Bloom";

        document.getElementById("modelDescription").innerText = "Elegent floral fragrance with soft pink tones and a luxury glass finish."
    });

    document.getElementById("oceanBtn").addEventListener("click", function () {
        loadModel("ocean-mist");

        clickSound.currentTime = 0;
        clickSound.play();  

        document.getElementById("modelTitle").innerText = "Ocean Mist";

        document.getElementById("modelDescription").innerText = "Fresh aquatic fragrance inspired by ocean reflections and cool blue tones."
    });

    document.getElementById("midnightBtn").addEventListener("click", function () {
        loadModel("after-midnight");

        clickSound.currentTime = 0;
        clickSound.play();  

        document.getElementById("modelTitle").innerText = "After Midnight";

        document.getElementById("modelDescription").innerText = "Dark luxury fragrance with metallic bronze details and a nighttime aesthetic."
    });

    document.getElementById("rotateBtn").addEventListener("click", function () {
        isRotating = !isRotating;
        clickSound.currentTime = 0;
        clickSound.play();  
    });

    document.getElementById("wireframeBtn").addEventListener("click", function () {
        isWireframe = !isWireframe;
        clickSound.currentTime = 0;
        clickSound.play();  

        if (perfumeModel) {
            perfumeModel.traverse(function (child) {
                if (child.isMesh) {
                    child.material.wireframe = isWireframe;
                }
            });
        }
    });

    document.getElementById("frontViewBtn").addEventListener("click", function () {
        isRotating = false;
        clickSound.currentTime = 0;
        clickSound.play();  
        perfumeModel.rotation.set(0, -1.57, 0);
        camera.position.set(0, 1.5, 8);
        controls.target.set(0, 0, 0);
        controls.update();
    });

    document.getElementById("sideViewBtn").addEventListener("click", function () {
        isRotating = false;
        clickSound.currentTime = 0;
        clickSound.play();  
        perfumeModel.rotation.set(0, -1.57, 0);
        camera.position.set(8, 1.5, 0);
        controls.target.set(0, 0, 0);
        controls.update();
    });

    document.getElementById("resetViewBtn").addEventListener("click", function () {
        isRotating = false;
        clickSound.currentTime = 0;
        clickSound.play();  
        perfumeModel.rotation.set(0, -1.57, 0);
        camera.position.set(0, 1.5, 8);
        controls.target.set(0, 0, 0);
        controls.update();
    });
    animate();
}

function loadModel(modelName) {

    if (perfumeModel) {
        scene.remove(perfumeModel);
    }

    const mtlLoader = new THREE.MTLLoader();

    mtlLoader.load("assets/models/" + modelName + ".mtl", function (materials) {

        materials.preload();

        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load("assets/models/" + modelName + ".obj", function (object) {

            perfumeModel = object;

            perfumeModel.scale.set(0.35, 0.35, 0.35);
            perfumeModel.position.set(0, -1.6, 0);
            perfumeModel.rotation.set(0, -1.57, 0);

            scene.add(perfumeModel);

        });

    });
}

function animate() {

    requestAnimationFrame(animate);

    if (isRotating && perfumeModel) {
        perfumeModel.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
}