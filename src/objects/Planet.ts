import { Scene } from "@babylonjs/core";
import { UpdatebleMaterial } from "@materials/UpdatebleMaterial";
import { CelestialBody, CelestialBodyParams } from "@objects/CelestialBody";
import { Moon } from "@objects/Moon";

export type PlanetParams = CelestialBodyParams;

export class Planet extends CelestialBody {
  private moons: Moon[] = [];

  constructor(
    protected scene: Scene,
    protected name: string,
    protected params: PlanetParams,
    protected material?: UpdatebleMaterial
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
