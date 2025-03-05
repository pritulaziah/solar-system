import "./style.css";
import { GUI } from "lil-gui";
import { Engine, Scene, Color4 } from "@babylonjs/core";
import { GlobalUniforms } from "@core/GlobalUniforms";
import { CameraController } from "@core/CameraController";
import { SolarSystem } from "@objects/SolarSystem";
import { Planet } from "@objects/constants";

class App {
  engine: Engine;
  scene: Scene;
  globalUniforms: GlobalUniforms;
  solarSystem: SolarSystem;
  cameraController: CameraController;
  params = {
    backgroundColor: "#1d1f2a",
    color: "#ff0000",
    targetPlanet: Planet.Earth,
  };
  gui: GUI;

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
    this.solarSystem = new SolarSystem(this.scene, {
      referenceDiameter: 1,
      referenceOrbitRadius: 500,
      referenceOrbitSpeed: 0.01,
    });
    this.cameraController = new CameraController(
      this.scene,
      this.solarSystem.getPlanet(Planet.Earth)!
    );
    this.cameraController.attachToCanvas(canvas);
    this.gui = new GUI({ width: 400 });
    this.initGui();
  }

  initGui() {
    const planetNames = Object.values(Planet).filter(value => value !== Planet.Pluto);

    this.gui
      .add(this.params, "targetPlanet", planetNames)
      .onChange((newPlanet: Planet) => {
        const planet = this.solarSystem.getPlanet(newPlanet);
        this.cameraController.setTargetPlanet(planet);
      });
  }

  async init() {
    // Render loop
    let elapsedSeconds = 0;

    this.engine.runRenderLoop(() => {
      const deltaTime = this.engine.getDeltaTime() * 0.001;
      elapsedSeconds += deltaTime;
      // Global uniforms
      this.globalUniforms.update(
        elapsedSeconds,
        this.solarSystem.sun.mesh.position
      );
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
