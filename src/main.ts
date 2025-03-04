import "./style.css";
import { ArcRotateCamera, Engine, Scene, Color4 } from "@babylonjs/core";
import { GlobalUniforms } from "@core/GlobalUniforms";
import { SolarSystem } from "@objects/SolarSystem";

class App {
  engine: Engine;
  scene: Scene;
  globalUniforms: GlobalUniforms;
  solarSystem: SolarSystem;
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
    scene.clearColor = Color4.FromHexString(backgroundColor);

    return scene;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.engine = App.createEngine(canvas);
    this.scene = App.createScene(this.engine, this.params.backgroundColor);
    this.globalUniforms = GlobalUniforms.getInstance(this.engine);
    this.solarSystem = new SolarSystem(this.scene);
  }

  async init() {
    // Camera
    const camera = new ArcRotateCamera(
      "arcCamera",
      Math.PI / 4,
      Math.PI / 4,
      10,
      this.solarSystem.earth.mesh.position,
      this.scene
    );
    camera.wheelDeltaPercentage = 0.05;
    camera.minZ = 0.1;
    camera.lowerRadiusLimit = 1;
    camera.attachControl(canvas, true);

    // Render loop
    let elapsedSeconds = 0;

    this.engine.runRenderLoop(() => {
      const deltaTime = this.engine.getDeltaTime() * 0.001;
      elapsedSeconds += deltaTime;
      this.globalUniforms.update(elapsedSeconds, this.solarSystem.sun.mesh.position);
      this.solarSystem.update(elapsedSeconds);
      // Camera
      camera.target.copyFrom(this.solarSystem.earth.mesh.position);
      this.scene.render();
    });

    window.addEventListener("resize", () => this.engine.resize());
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const app = new App(canvas);

app.init();
