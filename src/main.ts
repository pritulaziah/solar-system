import "./style.css";
import { ArcRotateCamera, Vector3, Engine, Scene, Color4 } from "@babylonjs/core";
import { Earth } from "./objects/Earth";

class App {
  engine: Engine;
  scene: Scene;

  sizes = { width: window.innerWidth, height: window.innerHeight };

  params = {
    backgroundColor: "#1d1f2a",
    color: "#ff0000",
  };

  static createEngine(canvas: HTMLCanvasElement): Engine {
    const engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      useHighPrecisionMatrix: true,
    });
    engine.setHardwareScalingLevel(1 / window.devicePixelRatio);

    return engine;
  }

  static createScene(engine: Engine, backgroundColor: string): Scene {
    const scene = new Scene(engine);

    scene.clearColor = Color4.FromHexString(
      backgroundColor
    );

    return scene;
  }

  static createCamera(scene: Scene): ArcRotateCamera {
    const camera = new ArcRotateCamera(
      "arcCamera",
      Math.PI / 2,
      Math.PI / 2,
      15,
      new Vector3(0, 0, 0),
      scene
    );
    camera.wheelDeltaPercentage = 0.05;
    camera.minZ = 0.1; // Prevent camera from zooming inside the Earth
    camera.lowerRadiusLimit = 1.5;
    return camera;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.engine = App.createEngine(canvas);
    this.scene = App.createScene(this.engine, this.params.backgroundColor);
    const camera = App.createCamera(this.scene);
    camera.attachControl(canvas, true);
  }

  async init() {
    new Earth(this.scene);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener("resize", () => this.engine.resize());
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const app = new App(canvas);

app.init();
