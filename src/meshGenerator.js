/**
 * Adds meshs to the scene with randomly positions.
 * @param window window-Object for properties like width and height
 * @param scene THREE.Scene
 * @param xCount Number of meshs on the X-Axis
 * @param yCount Number of meshs on the Y-Axis
 * @returns {Array} array of generated meshs
 */
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

/**
 * Adds meshs to the scene with distributed positions.
 * @param window window-Object for properties like width and height
 * @param scene THREE.Scene
 * @param xCount Number of meshs on the X-Axis
 * @param yCount Number of meshs on the Y-Axis
 * @returns {Array} array of generated meshs
 */
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

/**
 * Calculates the distributed X or Y position for a mesh within the current inner-window.
 * @param scale Scale of innerWidth or innerHeight of global Window-Object.
 * @param count Number of object on current axis.
 * @param current Current object on current axis.
 * @returns {number}
 */
function setEqualDistributionXorYPostion(scale, count, current) {
    const start = -(scale / 2) * 0.5;
    return start + (scale / count) * current;
}

/**
 * Calculates a random X or Y position for a mesh within the current inner-window.
 * @param scale Scale of innerWidth or innerHeight of global Window-Object.
 * @returns {number}
 */
function setRandomXorYPosition(scale) {
    const max = (scale / 2) * 0.5;
    const min = -max;
    return Math.floor(Math.random() * (max - min) + min);
}

