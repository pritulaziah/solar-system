import { Scene } from "@babylonjs/core";
import { Sun, SunParams } from "./Sun";
import { Mercury } from "./Mercury";
import { Venus } from "./Venus";
import { Earth } from "./Earth";
import { Mars } from "./Mars";
import { Jupiter } from "./Jupiter";
import { Saturn } from "./Saturn";
import { Uranus } from "./Uranus";
import { Neptune } from "./Neptune";
import { CelestialBody } from "./CelestialBody";
import { Planet, PLANETS, EARTH_TO_SUN_RATIO } from "./constants";

export type SolarSystemParams = {
  referenceOrbitRadius: number;
  referenceDiameter: number;
  referenceOrbitSpeed: number;
  referenceRotationSpeed: number;
};

export class SolarSystem {
  sun: Sun;
  planets: Map<Planet, CelestialBody>;

  static getPlanetConfig({
    referenceOrbitRadius,
    referenceDiameter,
    referenceOrbitSpeed,
    referenceRotationSpeed,
  }: SolarSystemParams) {
    const earth = PLANETS[Planet.Earth];
    const scaleOrbit = referenceOrbitRadius / earth.semiMajorAxis;
    const scaleDiameter = referenceDiameter / earth.diameter;
    const basePeriod = earth.period;
    const earthRotationPeriod = earth.rotationPeriod;

    return Object.fromEntries(
      Object.entries(PLANETS).map(([planetName, planetData]) => {
        const {
          semiMajorAxis,
          eccentricity,
          inclination,
          diameter,
          period,
          orbitColor,
          rotationPeriod,
          obliquity,
        } = planetData;

        return [
          planetName as Planet,
          {
            semiMajorAxis: semiMajorAxis * scaleOrbit,
            eccentricity,
            inclination: inclination * (Math.PI / 180),
            diameter: diameter * scaleDiameter,
            orbitSpeed: referenceOrbitSpeed * (basePeriod / period),
            rotationSpeed: referenceRotationSpeed * (earthRotationPeriod / rotationPeriod),
            orbitColor,
            obliquity: obliquity * (Math.PI / 180),
          },
        ];
      })
    );
  }

  static getSunParams(referenceDiameter: number): SunParams {
    return { diameter: referenceDiameter * EARTH_TO_SUN_RATIO };
  }

  constructor(scene: Scene, params: SolarSystemParams) {
    const planetParams = SolarSystem.getPlanetConfig(params);
    const sunParams = SolarSystem.getSunParams(params.referenceDiameter);

    this.sun = new Sun(scene, sunParams);

    this.planets = new Map<Planet, CelestialBody>([
      [Planet.Mercury, new Mercury(scene, planetParams.mercury)],
      [Planet.Venus, new Venus(scene, planetParams.venus)],
      [Planet.Earth, new Earth(scene, planetParams.earth)],
      [Planet.Mars, new Mars(scene, planetParams.mars)],
      [Planet.Jupiter, new Jupiter(scene, planetParams.jupiter)],
      [Planet.Saturn, new Saturn(scene, planetParams.saturn)],
      [Planet.Uranus, new Uranus(scene, planetParams.uranus)],
      [Planet.Neptune, new Neptune(scene, planetParams.neptune)],
    ]);
  }

  getPlanet(planet: Planet) {
    return this.planets.get(planet)!;
  }

  update(elapsedSeconds: number) {
    this.sun.update(elapsedSeconds);

    for (const [_, planet] of this.planets) {
      planet.update(elapsedSeconds);
    }
  }
}
