import * as THREE from 'three';
import { MeshFace } from './face.js';

class Planet {
    constructor(diameter, resolution) {
        this.diameter = diameter;
        this.resolution = resolution;

        return this.constructMesh();
    }

    constructMesh() {
        let face1 = new MeshFace(this.resolution, new THREE.Vector3(0, 1, 0), 0);
        let vertices = face1.vertices;
        let indices = face1.triangles;
        let normals = face1.normals;

        let face2 = new MeshFace(this.resolution, new THREE.Vector3(1, 0, 0), ((this.resolution) * (this.resolution)));
        vertices.push(...face2.vertices);
        indices.push(...face2.triangles);
        normals.push(...face2.normals);
        
        let face3 = new MeshFace(this.resolution, new THREE.Vector3(-1, 0, 0), ((this.resolution) * (this.resolution)) * 2);
        vertices.push(...face3.vertices);
        indices.push(...face3.triangles);
        normals.push(...face3.normals);
        
        let face4 = new MeshFace(this.resolution, new THREE.Vector3(0, -1, 0), ((this.resolution) * (this.resolution)) * 3);
        vertices.push(...face4.vertices);
        indices.push(...face4.triangles);
        normals.push(...face4.normals);
        
        let face5 = new MeshFace(this.resolution, new THREE.Vector3(0, 0, 1), ((this.resolution) * (this.resolution)) * 4);
        vertices.push(...face5.vertices);
        indices.push(...face5.triangles);
        normals.push(...face5.normals);
        
        let face6 = new MeshFace(this.resolution, new THREE.Vector3(0, 0, -1), ((this.resolution) * (this.resolution)) * 5);
        vertices.push(...face6.vertices);
        indices.push(...face6.triangles);
        normals.push(...face6.normals);


        //        console.log(vertices.length);
        let geom = new THREE.BufferGeometry();

        geom.setIndex(indices);
        geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geom.computeVertexNormals();

        let mat = new THREE.MeshLambertMaterial();
        //mat.wireframe = true;
        mat.color = new THREE.Color(1, 1, 0.4);
        mat.side = THREE.DoubleSide;
        let mesh = new THREE.Mesh(geom, mat);

        mesh.geometry.computeVertexNormals();

        return mesh;
    }

    SetQuad(triangles, i, v00, v10, v01, v11) {
        triangles[i] = v00;
        triangles[i + 1] = v01;
        triangles[i + 2] = v10;
        triangles[i + 3] = v10;
        triangles[i + 4] = v01;
        triangles[i + 5] = v11;
        return i + 6;
    }

    CreateTopFace(triangles, t, ring) {
        let v = ring * this.diameter;
        for (let x = 0; x < this.diameter - 1; x++, v++) {
            t = this.SetQuad(triangles, t, v, v + 1, v + ring - 1, v + ring);
        }
        let vMin = ring * (this.diameter + 1) - 1;
        let vMid = vMin + 1;
        let vMax = v + 2;

        for (let z = 1; z < this.diameter - 1; z++, vMin--, vMid++, vMax++) {
            t = this.SetQuad(triangles, t, vMin, vMid, vMin - 1, vMid + this.diameter - 1);
            for (let x = 1; x < this.diameter - 1; x++, vMid++) {
                t = this.SetQuad(triangles, t, vMid, vMid + 1, vMid + this.diameter - 1, vMid + this.diameter);
            }
            t = this.SetQuad(triangles, t, vMid, vMax, vMid + this.diameter - 1, vMax + 1);
        }

        let vTop = vMin - 2;
        t = this.SetQuad(triangles, t, vMin, vMid, vTop + 1, vTop);
        for (let x = 1; x < this.diameter - 1; x++, vTop--, vMid++) {
            t = this.SetQuad(triangles, t, vMid, vMid + 1, vTop, vTop - 1);
        }
        t = this.SetQuad(triangles, t, vMid, vTop - 2, vTop, vTop - 1);

        return t;
    }

    CreateBottomFace(triangles, t, ring, vertices) {
        let v = 1;
        let vMid = vertices.Length - (this.diameter - 1) * (this.diameter - 1);
        t = this.SetQuad(triangles, t, ring - 1, vMid, 0, 1);
        for (let x = 1; x < this.diameter - 1; x++, v++, vMid++) {
            t = this.SetQuad(triangles, t, vMid, vMid + 1, v, v + 1);
        }
        t = this.SetQuad(triangles, t, vMid, v + 2, v, v + 1);

        let vMin = ring - 2;
        vMid -= this.diameter - 2;
        let vMax = v + 2;

        for (let z = 1; z < this.diameter - 1; z++, vMin--, vMid++, vMax++) {
            t = this.SetQuad(triangles, t, vMin, vMid + this.diameter - 1, vMin + 1, vMid);
            for (let x = 1; x < this.diameter - 1; x++, vMid++) {
                t = this.SetQuad(triangles, t, vMid + this.diameter - 1, vMid + this.diameter, vMid, vMid + 1);
            }
            t = this.SetQuad(triangles, t, vMid + this.diameter - 1, vMax + 1, vMid, vMax);
        }

        let vTop = vMin - 1;
        t = this.SetQuad(triangles, t, vTop + 1, vTop, vTop + 2, vMid);
        for (let x = 1; x < this.diameter - 1; x++, vTop--, vMid++) {
            t = this.SetQuad(triangles, t, vTop, vTop - 1, vMid, vMid + 1);
        }
        t = this.SetQuad(triangles, t, vTop, vTop - 1, vMid, vTop - 2);

        return t;
    }

    /*     AccessGrid(x, y, subd) {
            var index = x * subd + y;
            return index;
        } */
}

export { Planet }