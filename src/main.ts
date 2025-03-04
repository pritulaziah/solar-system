import "./style.css";
import { Engine, Scene, Color4 } from "@babylonjs/core";
import { GlobalUniforms } from "@core/GlobalUniforms";
import { CameraController} from "@core/CameraController";
import { SolarSystem } from "@objects/SolarSystem";

class App {
  engine: Engine;
  scene: Scene;
  globalUniforms: GlobalUniforms;
  solarSystem: SolarSystem;
  cameraController: CameraController;
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
    scene.clearColor = Color4.FromHexString(backgroundColor);

    return scene;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.engine = App.createEngine(canvas);
    this.scene = App.createScene(this.engine, this.params.backgroundColor);
    this.globalUniforms = GlobalUniforms.getInstance(this.engine);
    this.solarSystem = new SolarSystem(this.scene, { referenceDiameter: 1, referenceOrbitRadius: 500, referenceOrbitSpeed: 0.01 });
    this.cameraController = new CameraController(this.scene, this.solarSystem.earth);
    this.cameraController.attachToCanvas(canvas);
  }

  async init() {
    // Render loop
    let elapsedSeconds = 0;

    this.engine.runRenderLoop(() => {
      const deltaTime = this.engine.getDeltaTime() * 0.001;
      elapsedSeconds += deltaTime;
      // Global uniforms
      this.globalUniforms.update(elapsedSeconds, this.solarSystem.sun.mesh.position);
      // Solar System
      this.solarSystem.update(elapsedSeconds);
      // Camera
      this.cameraController.update();
      this.scene.render();
    });

    window.addEventListener("resize", () => this.engine.resize());
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const app = new App(canvas);

app.init();
