import { GUI } from "lil-gui";
import { GlobalUniforms } from "@core/GlobalUniforms";
import { CameraController } from "@core/CameraController";
import { CelestialManager } from "@core/CelestialManager";
import { PlanetName } from "@objects/constants";
import { Engine, Scene, Color4 } from "@babylonjs/core";

export class SceneManager {
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

  static createScene(engine: Engine): Scene {
    const scene = new Scene(engine);
    scene.clearColor = Color4.FromHexString("#1d1f2a");

    return scene;
  }

  constructor(protected engine: Engine) {
    this.globalUniforms = GlobalUniforms.getInstance(engine);
    this.scene = SceneManager.createScene(engine);
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
    this.initGui();
  }

  attachToCanvas(canvas: HTMLCanvasElement) {
    this.cameraController.attachToCanvas(canvas);
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

  update(elapsedSeconds: number) {
    this.globalUniforms.update(
      elapsedSeconds,
      this.celestialManager.sun.mesh.position
    );
    this.celestialManager.update(elapsedSeconds);
    this.cameraController.update();
    this.scene.render();
  }
}
