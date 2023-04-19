import * as THREE from 'three';
import { FBXLoader } from './loaders/FBXLoader.js';
import { PLYLoader } from './loaders/PLYLoader.js';

const fbxLoader = new FBXLoader();
const plyLoader = new PLYLoader();
const buildingModels = [];

fbxLoader.load('../models/Models/Building1_Ground.fbx', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            const texture = new THREE.TextureLoader().load("../models/Textures/Building/Ground/Building1_Ground_DefaultMaterial_AlbedoTransparency.png");
            const normal = new THREE.TextureLoader().load("../models/Textures/Building/Ground/Building1_Ground_DefaultMaterial_Normal.png");
            const metal = new THREE.TextureLoader().load("../models/Textures/Building/Ground/Building1_Ground_DefaultMaterial_MetallicSmoothness.png");
            const material = new THREE.MeshPhongMaterial();
            material.color = new THREE.Color(1, 1, 1);
            material.shininess = 1000;
            material.map = texture;
            material.reflectivity = 1;
            material.metalnessMap = metal;
            material.specularMap = metal;
            material.emissive = new THREE.Color(1, 1, 0.5);
            material.emissiveMap = metal;
            material.emissiveIntensity = 0;
            material.metalness = .2;
            material.normalMap = normal;
            child.material = material;
            child.position.set(0, 0, 0);
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    object.castShadow = true;
    object.receiveShadow = true;
    object.scale.set(.01, .01, .01);
    buildingModels.push(object);
});

fbxLoader.load('../models/Models/Building1_LevelA.fbx', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            const texture = new THREE.TextureLoader().load("../models/Textures/Building/LevelA/Building1_LevelA_DefaultMaterial_AlbedoTransparency.png");
            const normal = new THREE.TextureLoader().load("../models/Textures/Building/LevelA/Building1_LevelA_DefaultMaterial_Normal.png");
            const metal = new THREE.TextureLoader().load("../models/Textures/Building/LevelA/Building1_LevelA_DefaultMaterial_MetallicSmoothness.png");
            const material = new THREE.MeshPhongMaterial();
            material.color = new THREE.Color(1, 1, 1);
            material.shininess = 1000;
            material.map = texture;
            material.reflectivity = 1;
            material.metalnessMap = metal;
            material.specularMap = metal;
            material.emissive = new THREE.Color(1, 1, 0.5);
            material.emissiveMap = metal;
            material.emissiveIntensity = 0;
            material.metalness = .2;
            material.normalMap = normal;
            child.material = material;
            child.position.set(0, 0, 0);
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    object.castShadow = true;
    object.receiveShadow = true;
    object.scale.set(.01, .01, .01)
    buildingModels.push(object);
});


fbxLoader.load('../models/Models/Building1_Roof.fbx', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            const texture = new THREE.TextureLoader().load("../models/Textures/Building/Roof/Building1_Roof_DefaultMaterial_AlbedoTransparency.png");
            const normal = new THREE.TextureLoader().load("../models/Textures/Building/Roof/Building1_Roof_DefaultMaterial_Normal.png");
            const metal = new THREE.TextureLoader().load("../models/Textures/Building/Roof/Building1_Roof_DefaultMaterial_MetallicSmoothness.png");
            const material = new THREE.MeshPhongMaterial();
            material.color = new THREE.Color(1, 1, 1);
            material.shininess = 1000;
            material.map = texture;
            material.reflectivity = 1;
            material.metalnessMap = metal;
            material.specularMap = metal;
            material.emissive = new THREE.Color(1, 1, 0.5);
            material.emissiveMap = metal;
            material.emissiveIntensity = 0;
            material.metalness = .2;
            material.normalMap = normal;
            child.material = material;
            child.position.set(0, 0, 0);
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    object.castShadow = true;
    object.receiveShadow = true;
    object.scale.set(.01, .01, .01)
    buildingModels.push(object);
});

export { buildingModels };