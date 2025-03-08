import { Engine } from "@babylonjs/core";
import { SceneManager } from '@core/SceneManager';
import "./style.css";

export class App {
  engine: Engine;
  sceneManager: SceneManager;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = this.createEngine();
    this.sceneManager = new SceneManager(this.engine);
  }

  createEngine(): Engine {
    const engine = new Engine(this.canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      useHighPrecisionMatrix: true,
    });
    engine.setHardwareScalingLevel(1 / window.devicePixelRatio);

    return engine;
  }

  async init() {
    this.sceneManager.attachToCanvas(this.canvas);
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
