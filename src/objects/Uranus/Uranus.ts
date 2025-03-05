import { Scene } from "@babylonjs/core";
import { UranusMaterial } from "./UranusMaterial";
import { CelestialBody, CelestialBodyParams } from "../CelestialBody";

export class Uranus extends CelestialBody {
  constructor(scene: Scene, params: CelestialBodyParams) {
    super(scene, "uranus", params);
    const material = new UranusMaterial(scene);
    this.mesh.material = material;
  }
}
