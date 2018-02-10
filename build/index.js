(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

window.onload = function () {
    var meshGenerator = require("./meshGenerator");
    var width = window.innerWidth;
    var height = window.innerHeight;

    var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("myCanvas") });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    console.log("Window Width", width);
    console.log("Window Height", height);

    var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

    var scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.5);
    scene.add(pointLight);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });

    var meshs = meshGenerator.randomMeshs(window, scene, 10, 10);

    // Render the scene/camera combnation
    renderer.render(scene, camera);

    // Add an orbit control which allows us to move around the scene. See the three.js example for more details
    // https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 15, 0);
    controls.maxPolarAngle = Math.PI / 2;
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    }); // add this only if there is no animation loop (requestAnimationFrame)

    requestAnimationFrame(render);

    function render() {
        meshs.forEach(function (mesh, index) {
            //  mesh.position.set(index * 20, index * 10, -500);
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
        });
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
};

},{"./meshGenerator":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.randomMeshs = randomMeshs;
exports.distributedMeshs = distributedMeshs;
function randomMeshs(window, scene, xCount, yCount) {
    var meshs = [];
    var width = window.innerWidth;
    var height = window.innerHeight;
    for (var x = 0; x < xCount; x++) {
        for (var y = 0; y < yCount; y++) {
            var geometry = new THREE.BoxGeometry(20, 20, 20);
            var material = new THREE.MeshLambertMaterial();
            var mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(setRandomXorYPosition(width), setRandomXorYPosition(height), -1000);
            mesh.material.color.setHex(0xff0000);
            meshs.push(mesh);
            scene.add(mesh);
        }
    }

    return meshs;
}

function distributedMeshs(xCount, yCount) {
    for (var x = 0; x < xCount; x++) {
        for (var y = 0; y < yCount; y++) {
            var geometry = new THREE.BoxGeometry(8, 8, 8);
            var material = new THREE.MeshLambertMaterial();
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(setEqualDistributionXorYPostion(width, xCount, x), setEqualDistributionXorYPostion(height, yCount, y), -3000);
            meshs.push(mesh);
            scene.add(mesh);
        }
    }
}

function setEqualDistributionXorYPostion(scale, count, current) {
    var start = -(scale / 2) * 0.5;
    return start + scale / count * current;
}

function setRandomXorYPosition(scale) {
    var max = scale / 2 * 0.5;
    var min = -max;
    return Math.floor(Math.random() * (max - min) + min);
}

},{}]},{},[1]);
