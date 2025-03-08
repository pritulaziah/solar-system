import { Scene } from "@babylonjs/core";
import { Sun, SunParams } from "@materials/Sun";
import { PlanetMaterialFactory } from "@materials/PlanetMaterialFactory";
import { MoonMaterialFactory } from "@materials/MoonMaterialFactory";
import { Planet } from "@objects/Planet";
import { Moon } from "@objects/Moon";
import { CelestialBodyParams } from "@objects/CelestialBody";
import {
  PlanetName,
  PLANETS,
  EARTH_TO_SUN_RATIO,
  OrbitalBody,
  MoonBody,
  PlanetBody,
} from "@objects/constants";

export type CelestialManagerParams = {
  referenceOrbitRadius: number;
  referenceDiameter: number;
  referenceOrbitSpeed: number;
  referenceRotationSpeed: number;
};

type ScaleConfig = {
  scaleOrbit: number;
  scaleDiameter: number;
  basePeriod: number;
  baseRotationPeriod: number;
  scaleOrbitSpeed: number;
  scaleRotationSpeed: number;
};

export class CelestialManager {
  sun: Sun;
  planets = new Map<PlanetName, Planet>();
  scaleConfig: ScaleConfig;

  static getSunParams(referenceDiameter: number): SunParams {
    return { diameter: referenceDiameter * EARTH_TO_SUN_RATIO };
  }

  constructor(
    private scene: Scene,
    params: CelestialManagerParams
  ) {
    this.scaleConfig = this.makeScaleConfig(params);
    const sunParams = CelestialManager.getSunParams(params.referenceDiameter);

    this.createPlanets();

    this.sun = new Sun(scene, sunParams);
  }

  private createPlanets() {
    for (const [planetName, planetData] of Object.entries(PLANETS)) {
      const planet = this.createPlanet(planetName as PlanetName, planetData);
      this.planets.set(planetName as PlanetName, planet);
    }
  }

  private createPlanet(planetName: PlanetName, planetData: PlanetBody) {
    const planetParams = this.computeCelestialBodyParams(planetData);
    const planetMaterial = PlanetMaterialFactory.create(planetName, this.scene);
    const planet = new Planet(
      this.scene,
      planetName,
      planetParams,
      planetMaterial
    );

    for (const moonData of planetData.moons ?? []) {
      const moon = this.createMoon(moonData, planet);
      planet.addMoon(moon);
    }

    return planet;
  }

  private createMoon(moonData: MoonBody, hostPlanet: Planet) {
    const moonParams = this.computeCelestialBodyParams(moonData);
    const moonMaterial = MoonMaterialFactory.create(moonData.name, this.scene);
    return new Moon(
      this.scene,
      moonData.name,
      moonParams,
      hostPlanet,
      moonMaterial
    );
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

  private makeScaleConfig({
    referenceOrbitRadius,
    referenceDiameter,
    referenceOrbitSpeed,
    referenceRotationSpeed,
  }: CelestialManagerParams): ScaleConfig {
    const earth = PLANETS[PlanetName.Earth];

    return {
      scaleOrbit: referenceOrbitRadius / earth.semiMajorAxis,
      scaleDiameter: referenceDiameter / earth.diameter,
      basePeriod: earth.period,
      baseRotationPeriod: earth.rotationPeriod,
      scaleOrbitSpeed: referenceOrbitSpeed,
      scaleRotationSpeed: referenceRotationSpeed,
    };
  }

  private computeCelestialBodyParams(
    orbitBody: OrbitalBody
  ): CelestialBodyParams {
    const {
      semiMajorAxis,
      eccentricity,
      inclination,
      diameter,
      period,
      rotationPeriod,
      orbitColor,
      obliquity,
    } = orbitBody;
    const {
      scaleOrbit,
      scaleDiameter,
      basePeriod,
      baseRotationPeriod,
      scaleOrbitSpeed,
      scaleRotationSpeed,
    } = this.scaleConfig;
    return {
      semiMajorAxis: semiMajorAxis * scaleOrbit,
      eccentricity: eccentricity,
      inclination: inclination * (Math.PI / 180),
      diameter: diameter * scaleDiameter,
      orbitSpeed: scaleOrbitSpeed * (basePeriod / period),
      rotationSpeed: scaleRotationSpeed * (baseRotationPeriod / rotationPeriod),
      orbitColor: orbitColor,
      obliquity: obliquity * (Math.PI / 180),
    };
  }
}
