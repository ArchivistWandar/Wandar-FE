import { GLView } from "expo-gl";
import { Renderer, TextureLoader } from "expo-three";
import { useEffect } from "react";
import {
  AmbientLight,
  BoxGeometry, // Change BoxBufferGeometry to BoxGeometry
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
} from "three";

import * as THREE from "three";
import CameraControls from "camera-controls";
import { Container } from "./Shared";

CameraControls.install({ THREE: THREE });

export default function TempLand() {
  let timeout;

  useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x6ad6f0;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(2, 5, 5);

    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(10, 10));

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    const cube = new IconMesh();
    cube.position.set(0, 0, 0);
    scene.add(cube);

    // Create CameraControls and attach it to the renderer's canvas
    const cameraControls = new CameraControls(camera, gl.canvas);

    function update() {
      cube.rotation.y += 0.05;
      cube.rotation.x += 0.025;
      cameraControls.update();
    }

    const myCube = new TileMesh(2, 2);
    myCube.position.set(1, 0, 0);
    scene.add(myCube);

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <Container>
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
    </Container>
  );
}

class IconMesh extends Mesh {
  constructor() {
    super(
      new BoxGeometry(1.5, 1.0, 1.0), // Change BoxBufferGeometry to BoxGeometry
      new MeshStandardMaterial({
        //map: new TextureLoader().load(require("./icon.jpg")),
        color: "yellow", // Yellow color instead of texture
      })
    );
  }
}

class TileMesh extends Mesh {
  constructor(x, y) {
    super(
      new BoxGeometry(x, 0.1, y), // Change BoxBufferGeometry to BoxGeometry
      new MeshStandardMaterial({
        color: "orange",
      })
    );
  }
}