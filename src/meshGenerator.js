export function randomMeshs(window, scene, xCount, yCount) {
    let meshs = [];
    const width = window.innerWidth;
    const height = window.innerHeight;
    for (let x = 0; x < xCount; x++) {
        for (let y = 0; y < yCount; y++) {
            const geometry = new THREE.BoxGeometry(20, 20, 20);
            const material = new THREE.MeshLambertMaterial();
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(setRandomXorYPosition(width), setRandomXorYPosition(height), -1000);
            mesh.material.color.setHex(0xff0000);
            meshs.push(mesh);
            scene.add(mesh);
        }
    }

    return meshs;
}


export function distributedMeshs(window, scene, xCount, yCount) {
    let meshs = [];
    const width = window.innerWidth;
    const height = window.innerHeight;
    for (let x = 0; x < xCount; x++) {
        for (let y = 0; y < yCount; y++) {
            const geometry = new THREE.BoxGeometry(8, 8, 8);
            const material = new THREE.MeshLambertMaterial();
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(setEqualDistributionXorYPostion(width, xCount, x), setEqualDistributionXorYPostion(height, yCount, y), -3000);
            meshs.push(mesh);
            scene.add(mesh);
        }
    }
    return meshs;
}


function setEqualDistributionXorYPostion(scale, count, current) {
    const start = -(scale / 2) * 0.5;
    return start + (scale / count) * current;
}

function setRandomXorYPosition(scale) {
    const max = (scale / 2) * 0.5;
    const min = -max;
    return Math.floor(Math.random() * (max - min) + min);
}

