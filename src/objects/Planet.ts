import { Scene } from "@babylonjs/core";
import { UpdatableMaterial } from "@materials/UpdatableMaterial";
import { CelestialBody, CelestialBodyParams } from "@objects/CelestialBody";
import { Moon } from "@objects/Moon";

export type PlanetParams = CelestialBodyParams;

export class Planet extends CelestialBody {
  private moons: Moon[] = [];

  constructor(
    scene: Scene,
    name: string,
    params: PlanetParams,
    material?: UpdatableMaterial
  ) {
    super(scene, name, params, material);
  }

  addMoon(moon: Moon) {
    this.moons.push(moon);
  }

  update(elapsedSeconds: number): void {
    super.update(elapsedSeconds);

    for (const moon of this.moons) {
      moon.update(elapsedSeconds);
    }
  }
}
