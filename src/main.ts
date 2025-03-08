import { Engine } from "@babylonjs/core";
import { SceneManager } from '@core/SceneManager';
import "./style.css";

export class App {
  engine: Engine;
  sceneManager: SceneManager;

  static createEngine(canvas: HTMLCanvasElement): Engine {
    const engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      useHighPrecisionMatrix: true,
    });
    engine.setHardwareScalingLevel(1 / window.devicePixelRatio);

    return engine;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.engine = App.createEngine(canvas);
    this.sceneManager = new SceneManager(this.engine);
  }

  async init() {
    this.sceneManager.attachToCanvas(canvas);
    let elapsedSeconds = 0;

    this.engine.runRenderLoop(() => {
      const deltaTime = this.engine.getDeltaTime() * 0.001;
      elapsedSeconds += deltaTime;

      this.sceneManager.update(elapsedSeconds);
    });

    window.addEventListener("resize", () => this.engine.resize());
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const app = new App(canvas);

app.init();
