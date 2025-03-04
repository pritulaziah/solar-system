import { Scene } from "@babylonjs/core";
import { Sun } from "./Sun";
import { Earth } from "./Earth";
import { Mercury } from "./Mercury";
import { Venus } from "./Venus";
import { Planet } from "./Planet";
import { calculatePlanetsParams, calculateSunParams } from "./utils";

export type SolarSystemParams = {
  referenceOrbitRadius: number;
  referenceDiameter: number;
  referenceOrbitSpeed: number;
}

export class SolarSystem {
  sun: Sun;
  earth: Earth;
  mercury: Mercury;
  venus: Venus;
  planets: Planet[];

  constructor(scene: Scene, params: SolarSystemParams) {
    const planetParams = calculatePlanetsParams(
      params.referenceOrbitRadius,
      params.referenceDiameter,
      params.referenceOrbitSpeed
    );
    const sunParams = calculateSunParams(params.referenceDiameter);

    this.sun = new Sun(scene, sunParams);
    this.mercury = new Mercury(scene, planetParams.mercury);
    this.venus = new Venus(scene, planetParams.venus);
    this.earth = new Earth(scene, planetParams.earth);

    this.planets = [
      this.mercury,
      this.venus,
      this.earth,
    ];
  }

  update(elapsedSeconds: number) {
    this.sun.update(elapsedSeconds);

    for (const planet of this.planets) {
      planet.update(elapsedSeconds);
    }
  }
}
