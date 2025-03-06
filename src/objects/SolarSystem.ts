import { Scene } from "@babylonjs/core";
import { Sun, SunParams } from "@materials/Sun";
import { PlanetName, PLANETS, EARTH_TO_SUN_RATIO } from "./constants";
import { Planet, PlanetParams } from "./Planet";
import { EarthMaterial } from "@materials/Earth/EarthMaterial";
import { MarsMaterial } from "@materials/Mars/MarsMaterial";
import { JupiterMaterial } from "@materials/Jupiter/JupiterMaterial";
import { SaturnMaterial } from "@materials/Saturn/SaturnMaterial";
import { UranusMaterial } from "@materials/Uranus/UranusMaterial";
import { MercuryMaterial } from "@materials/Mercury/MercuryMaterial";
import { NeptuneMaterial } from "@materials/Neptune/NeptuneMaterial";
import { VenusMaterial } from "@materials/Venus/VenusMaterial";
import { UpdatebleMaterial } from "@materials/UpdatebleMaterial";

export type SolarSystemParams = {
  referenceOrbitRadius: number;
  referenceDiameter: number;
  referenceOrbitSpeed: number;
  referenceRotationSpeed: number;
};

export class SolarSystem {
  sun: Sun;
  planets = new Map<PlanetName, Planet>();

  static createPlanetMaterial(planetName: PlanetName, scene: Scene): UpdatebleMaterial | undefined {
    switch (planetName) {
      case PlanetName.Earth:
        return new EarthMaterial(scene);
      case PlanetName.Mars:
        return new MarsMaterial(scene);
      case PlanetName.Jupiter:
        return new JupiterMaterial(scene);
      case PlanetName.Saturn:
        return new SaturnMaterial(scene);
      case PlanetName.Uranus:
        return new UranusMaterial(scene);
      case PlanetName.Mercury:
        return new MercuryMaterial(scene);
      case PlanetName.Neptune:
        return new NeptuneMaterial(scene);
      case PlanetName.Venus:
        return new VenusMaterial(scene);
      default:
        return undefined;
    }
  }

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

      const material = SolarSystem.createPlanetMaterial(planetName as PlanetName, this.scene);
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
