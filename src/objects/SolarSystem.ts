import { Scene } from "@babylonjs/core";
import { Sun, SunParams } from "./Sun";
import { Mercury } from "./Mercury";
import { Venus } from "./Venus";
import { Earth } from "./Earth";
import { Mars } from "./Mars";
import { Jupiter } from "./Jupiter";
import { Saturn } from './Saturn';
import { Uranus } from './Uranus';
import { Neptune } from './Neptune';
import { CelestialBody, CelestialBodyParams } from "./CelestialBody";
import { Planet, PLANETS, EARTH_TO_SUN_RATIO } from "./constants";

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
  jupiter: Jupiter;
  saturn: Saturn;
  uranus: Uranus;
  neptune: Neptune;

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
    this.jupiter = new Jupiter(scene, planetParams.jupiter);
    this.saturn = new Saturn(scene, planetParams.saturn);
    this.uranus = new Uranus(scene, planetParams.uranus);
    this.neptune = new Neptune(scene, planetParams.neptune);

    this.planets = [
      this.mercury,
      this.venus,
      this.earth,
      this.mars,
      this.jupiter,
      this.saturn,
      this.uranus,
      this.neptune,
    ];
  }

  update(elapsedSeconds: number) {
    this.sun.update(elapsedSeconds);

    for (const planet of this.planets) {
      planet.update(elapsedSeconds);
    }
  }
}
