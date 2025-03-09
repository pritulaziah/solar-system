import { GUI } from "lil-gui";
import { GlobalUniforms } from "@core/GlobalUniforms";
import { CameraController } from "@core/CameraController";
import { CelestialManager } from "@core/CelestialManager";
import { PlanetName } from "@objects/constants";
import { Engine, Scene, Color4 } from "@babylonjs/core";
import "./style.css";

export class App {
  engine: Engine;
  globalUniforms: GlobalUniforms;
  celestialManager: CelestialManager;
  cameraController: CameraController;
  params = {
    backgroundColor: "#1d1f2a",
    color: "#ff0000",
    targetPlanet: PlanetName.Earth,
  };
  gui: GUI;
  scene: Scene;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = this.createEngine();
    this.globalUniforms = GlobalUniforms.getInstance(this.engine);
    this.scene = this.createScene();
    this.celestialManager = new CelestialManager(this.scene, {
      referenceDiameter: 1,
      referenceOrbitRadius: 500,
      referenceOrbitSpeed: 0.01,
      referenceRotationSpeed: 0.1,
    });
    this.cameraController = new CameraController(
      this.scene,
      this.celestialManager.getPlanet(PlanetName.Earth)!.meshNode
    );
    this.gui = new GUI({ width: 400 });
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

  createScene(): Scene {
    const scene = new Scene(this.engine);
    scene.clearColor = Color4.FromHexString(this.params.backgroundColor);

    return scene;
  }

  initGui() {
    const planetNames = Object.values(PlanetName);

    this.gui
      .add(this.params, "targetPlanet", planetNames)
      .onChange((newPlanet: PlanetName) => {
        const planet = this.celestialManager.getPlanet(newPlanet);
        this.cameraController.setTargetPlanet(planet.meshNode);
      });
  }

  async init() {
    this.initGui();
    this.cameraController.attachToCanvas(canvas);
    let elapsedSeconds = 0;

    this.engine.runRenderLoop(() => {
      const deltaTime = this.engine.getDeltaTime() * 0.001;
      elapsedSeconds += deltaTime;

      this.globalUniforms.update(
        elapsedSeconds,
        this.celestialManager.sun.mesh.position
      );
      this.celestialManager.update(elapsedSeconds);
      this.cameraController.update();
      this.scene.render();
    });

    window.addEventListener("resize", () => this.engine.resize());
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const app = new App(canvas);

app.init();
