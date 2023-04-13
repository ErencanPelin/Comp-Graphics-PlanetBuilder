import * as THREE from 'three';

class MeshFace {
    constructor(resolution, localUp, index) {
        this.index = index;
        this.resolution = resolution;
        this.localUp = localUp;
        this.axisA = new THREE.Vector3(localUp.y, localUp.z, localUp.x);
        this.axisB = new THREE.Vector3().copy(this.localUp).cross(this.axisA);

        this.drawVertices();
        this.drawTris();
    }

    drawVertices() {
        this.vertices = [];
        this.normals = [];

        for (let x = 0; x < this.resolution; x++) {
            for (let y = 0; y < this.resolution; y++) {

                let percent = new THREE.Vector2(x, y).divideScalar(this.resolution - 1);

                let percentA = new THREE.Vector3().copy(this.axisA).multiplyScalar(2).multiplyScalar(percent.x - 0.5);
                let percentB = new THREE.Vector3().copy(this.axisB).multiplyScalar(2).multiplyScalar(percent.y - 0.5);

                let point = new THREE.Vector3().copy(this.localUp).add(percentA).add(percentB);
                //let pointSphere = new THREE.Vector3().copy(point).normalize();

                let x2 = point.x * point.x;
                let y2 = point.y * point.y;
                let z2 = point.z * point.z;
                let s = new THREE.Vector3();
                s.setX(point.x * Math.sqrt(1 - y2 / 2 - z2 / 2 + y2 * z2 / 3));
                s.setY(point.y * Math.sqrt(1 - x2 / 2 - z2 / 2 + x2 * z2 / 3));
                s.setZ(point.z * Math.sqrt(1 - x2 / 2 - y2 / 2 + x2 * y2 / 3));
                s.setLength(Math.random(10) + 5);
                this.vertices.push(s.x, s.y, s.z);
            }
        }
    }

    AccessGrid(x, y, subd) {
        var index = x * subd + y + this.index;
        return index;
    }

    drawTris() {
        this.triangles = [];

        for (let x = 0; x < this.resolution - 1; x++) {
            for (let y = 0; y < this.resolution - 1; y++) {
                var Idx0 = this.AccessGrid(x, y, this.resolution);
                var Idx1 = this.AccessGrid(x + 1, y, this.resolution);
                var Idx2 = this.AccessGrid(x + 1, y + 1, this.resolution);
                var Idx3 = this.AccessGrid(x, y + 1, this.resolution);

                this.triangles.push(Idx1, Idx0, Idx2);
                this.triangles.push(Idx2, Idx0, Idx3);
            }
        }
    }
}

export { MeshFace };