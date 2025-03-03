import "./style.css";
import {
  ArcRotateCamera,
  Engine,
  Scene,
  Color4,
} from "@babylonjs/core";
import { Earth } from "@objects/Earth";
import { Sun } from "@objects/Sun";
import { Mercury } from "@objects/Mercury";
import { GlobalUniforms } from "@core/GlobalUniforms";

class App {
  engine: Engine;
  scene: Scene;
  globalUniforms: GlobalUniforms;
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
  }

  async init() {
    const sun = new Sun(this.scene);
    const earth = new Earth(this.scene);
    const mercury = new Mercury(this.scene);

    // Camera
    const camera = new ArcRotateCamera(
      "arcCamera",
      Math.PI / 4,
      Math.PI / 4,
      10,
      earth.mesh.position,
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

      this.globalUniforms.update(elapsedSeconds, sun.mesh.position);
      earth.update(elapsedSeconds);
      mercury.update(elapsedSeconds);

      camera.target.copyFrom(earth.mesh.position);
      this.scene.render();
    });

    window.addEventListener("resize", () => this.engine.resize());
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const app = new App(canvas);

app.init();
