import { Scene } from "@babylonjs/core";
import { Sun, SunParams } from "@materials/Sun";
import { Planet, PlanetParams } from "@objects/Planet";
import { PlanetMaterialFactory } from "@materials/PlanetMaterialFactory";
import { PlanetName, PLANETS, EARTH_TO_SUN_RATIO } from "./constants";

export type SolarSystemParams = {
  referenceOrbitRadius: number;
  referenceDiameter: number;
  referenceOrbitSpeed: number;
  referenceRotationSpeed: number;
};

export class SolarSystem {
  sun: Sun;
  planets = new Map<PlanetName, Planet>();

  static getSunParams(referenceDiameter: number): SunParams {
    return { diameter: referenceDiameter * EARTH_TO_SUN_RATIO };
  }

  constructor(
    private scene: Scene,
    private params: SolarSystemParams
  ) {
    const sunParams = SolarSystem.getSunParams(params.referenceDiameter);
    this.createPlanets();

    this.sun = new Sun(scene, sunParams);
  }

  createPlanets() {
    const {
      referenceOrbitRadius,
      referenceDiameter,
      referenceOrbitSpeed,
      referenceRotationSpeed,
    } = this.params;

    const earth = PLANETS[PlanetName.Earth];
    const scaleOrbit = referenceOrbitRadius / earth.semiMajorAxis;
    const scaleDiameter = referenceDiameter / earth.diameter;
    const basePeriod = earth.period;
    const earthRotationPeriod = earth.rotationPeriod;

    for (const [planetName, planetData] of Object.entries(PLANETS)) {
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

      const planetParams: PlanetParams = {
        semiMajorAxis: semiMajorAxis * scaleOrbit,
        eccentricity,
        inclination: inclination * (Math.PI / 180),
        diameter: diameter * scaleDiameter,
        orbitSpeed: referenceOrbitSpeed * (basePeriod / period),
        rotationSpeed:
          referenceRotationSpeed * (earthRotationPeriod / rotationPeriod),
        orbitColor,
        obliquity: obliquity * (Math.PI / 180),
      };

      const material = PlanetMaterialFactory.create(planetName as PlanetName, this.scene);
      const planet = new Planet(this.scene, planetName, planetParams, material);
      this.planets.set(planetName as PlanetName, planet);
    }
  }

  getPlanet(planet: PlanetName): Planet {
    return this.planets.get(planet)!;
  }

  update(elapsedSeconds: number) {
    this.sun.update(elapsedSeconds);

    for (const [_, planet] of this.planets) {
      planet.update(elapsedSeconds);
    }
  }
}
