import { ArcRotateCamera, Scene, TransformNode } from "@babylonjs/core";

export class CameraController {
  private camera: ArcRotateCamera;
  private target: TransformNode;

  constructor(scene: Scene, initialTarget: TransformNode) {
    this.target = initialTarget;
    this.camera = this.createOrbitCamera(scene);
  }

  attachToCanvas(canvas: HTMLCanvasElement) {
    this.camera.attachControl(canvas, true);
  }

  setTargetPlanet(planet: TransformNode) {
    this.target = planet;
  }

  update() {
    this.camera.target.copyFrom(this.target.position);
  }

  private createOrbitCamera(scene: Scene): ArcRotateCamera {
    const camera = new ArcRotateCamera(
      "arcCamera",
      Math.PI / 4,
      Math.PI / 4,
      10,
      this.target.position,
      scene
    );
    camera.wheelDeltaPercentage = 0.05;
    camera.minZ = 0.1;
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 100;
    camera.maxZ = 50000;

    return camera;
  }
}
