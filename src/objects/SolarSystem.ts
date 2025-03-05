import { Scene } from "@babylonjs/core";
import { Sun } from "./Sun";
import { Earth } from "./Earth";
import { Mercury } from "./Mercury";
import { Venus } from "./Venus";
import { CelestialBody, CelestialBodyParams } from "./CelestialBody";
import { Mars } from "./Mars";
import { Planet, PLANETS, EARTH_TO_SUN_RATIO } from "./constants";
import { SunParams } from "./Sun";

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
  mars: Mars;
  planets: CelestialBody[];

  static getPlanetConfig({ referenceOrbitRadius, referenceDiameter, referenceOrbitSpeed }: SolarSystemParams) {
    const earth = PLANETS[Planet.Earth];
    const scaleOrbit = referenceOrbitRadius / earth.semiMajorAxis;
    const scaleDiameter = referenceDiameter / earth.diameter;
    const basePeriod = earth.period;

    return Object.fromEntries(
      Object.entries(PLANETS).map(([planetName, planetData]) => {
        const {
          semiMajorAxis,
          eccentricity,
          inclination,
          diameter,
          period,
          orbitColor,
        } = planetData;
  
        return [
          planetName as Planet,
          {
            semiMajorAxis: semiMajorAxis * scaleOrbit,
            eccentricity,
            inclination,
            diameter: diameter * scaleDiameter,
            orbitSpeed: referenceOrbitSpeed * (basePeriod / period),
            orbitColor,
          },
        ];
      })
    ) as { [key in Planet]: CelestialBodyParams };
  }

  static getSunParams(referenceDiameter: number): SunParams {
    return { diameter: referenceDiameter * EARTH_TO_SUN_RATIO };
  }

  constructor(scene: Scene, params: SolarSystemParams) {
    const planetParams = SolarSystem.getPlanetConfig(params);
    const sunParams = SolarSystem.getSunParams(params.referenceDiameter);

    this.sun = new Sun(scene, sunParams);
    this.mercury = new Mercury(scene, planetParams.mercury);
    this.venus = new Venus(scene, planetParams.venus);
    this.earth = new Earth(scene, planetParams.earth);
    this.mars = new Mars(scene, planetParams.mars);

    this.planets = [
      this.mercury,
      this.venus,
      this.earth,
      this.mars,
    ];
  }

  update(elapsedSeconds: number) {
    this.sun.update(elapsedSeconds);

    for (const planet of this.planets) {
      planet.update(elapsedSeconds);
    }
  }
}
