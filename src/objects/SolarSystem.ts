import { Scene } from "@babylonjs/core";
import { Sun, SunParams } from "@materials/Sun";
import { Planet, PlanetParams } from "@objects/Planet";
import { Moon, MoonParams } from "@objects/Moon";
import { PlanetMaterialFactory } from "@materials/PlanetMaterialFactory";
import { PlanetName, PLANETS, EARTH_TO_SUN_RATIO } from "./constants";
import { MoonMaterialFactory } from "@materials/MoonMaterialFactory";

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
        moons = [],
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

      const planetMaterial = PlanetMaterialFactory.create(
        planetName as PlanetName,
        this.scene
      );
      const planet = new Planet(this.scene, planetName, planetParams, planetMaterial);
      this.planets.set(planetName as PlanetName, planet);

      for (const moonData of moons) {
        const moonParams: MoonParams = {
          semiMajorAxis: moonData.semiMajorAxis * scaleOrbit,
          eccentricity: moonData.eccentricity,
          inclination: moonData.inclination * (Math.PI / 180),
          diameter: moonData.diameter * scaleDiameter,
          orbitSpeed: referenceOrbitSpeed * (basePeriod / moonData.period),
          rotationSpeed:
            referenceRotationSpeed *
            (earthRotationPeriod / moonData.rotationPeriod),
          orbitColor: moonData.orbitColor,
          obliquity: moonData.obliquity * (Math.PI / 180),
        };

        const moonMaterial = MoonMaterialFactory.create(
          moonData.name,
          this.scene
        );
        const moon = new Moon(
          this.scene,
          moonData.name,
          moonParams,
          planet,
          moonMaterial,
        );
        planet.addMoon(moon);
      }
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
