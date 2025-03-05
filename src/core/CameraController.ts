import { ArcRotateCamera, Scene } from "@babylonjs/core";

import type { CelestialBody } from "@objects/CelestialBody";

export class CameraController {
  private camera: ArcRotateCamera;
  private targetPlanet: CelestialBody;

  constructor(scene: Scene, initialPlanet: CelestialBody) {
    this.targetPlanet = initialPlanet;
    this.camera = this.createOrbitCamera(scene);
  }

  attachToCanvas(canvas: HTMLCanvasElement) {
    this.camera.attachControl(canvas, true);
  }

  setTargetPlanet(planet: CelestialBody) {
    this.targetPlanet = planet;
  }

  update() {
    this.camera.target.copyFrom(this.targetPlanet.mesh.position);
  }

  private createOrbitCamera(scene: Scene): ArcRotateCamera {
    const camera = new ArcRotateCamera(
      "arcCamera",
      Math.PI / 4,
      Math.PI / 4,
      10,
      this.targetPlanet.mesh.position,
      scene
    );
    camera.wheelDeltaPercentage = 0.05;
    camera.minZ = 0.1;
    camera.lowerRadiusLimit = 1;

    return camera;
  }
}
