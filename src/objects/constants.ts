import { Color3 } from "@babylonjs/core";

export enum PlanetName {
  Mercury = "mercury",
  Venus = "venus",
  Earth = "earth",
  Mars = "mars",
  Jupiter = "jupiter",
  Saturn = "saturn",
  Uranus = "uranus",
  Neptune = "neptune",
  Pluto = "pluto",
}

export type OrbitalBody = {
  semiMajorAxis: number;
  eccentricity: number;
  inclination: number;
  diameter: number;
  period: number;
  orbitColor: Color3;
  rotationPeriod: number;
  obliquity: number;
};

export type MoonBody = OrbitalBody & { name: string }; 

export type PlanetBody = OrbitalBody & {
  moons?: MoonBody[];
}

export const PLANETS: { [key in PlanetName]: PlanetBody } = {
  [PlanetName.Mercury]: {
    semiMajorAxis: 57.9,
    eccentricity: 0.206,
    inclination: 7.0,
    diameter: 4879,
    period: 88.0,
    rotationPeriod: 1407.6,
    obliquity: 0.034,
    orbitColor: new Color3(0.7, 0.7, 0.7),
  },
  [PlanetName.Venus]: {
    semiMajorAxis: 108.2,
    eccentricity: 0.007,
    inclination: 3.4,
    diameter: 12104,
    period: 224.7,
    rotationPeriod: -5832.5,
    obliquity: 177.4,
    orbitColor: new Color3(1, 0.85, 0.4),
  },
  [PlanetName.Earth]: {
    semiMajorAxis: 149.6,
    eccentricity: 0.017,
    inclination: 0.0,
    diameter: 12756,
    period: 365.2,
    rotationPeriod: 23.9,
    obliquity: 23.4,
    orbitColor: new Color3(0, 1, 0),
    moons: [
      {
        name: "luna",
        semiMajorAxis: 0.384,
        eccentricity: 0.055,
        inclination: 5.1,
        diameter: 3475,
        period: 27.3,
        rotationPeriod: 655.7,
        obliquity: 6.7,
        orbitColor: new Color3(0.7, 0.7, 0.7),
      },
    ],
  },
  [PlanetName.Mars]: {
    semiMajorAxis: 228.0,
    eccentricity: 0.094,
    inclination: 1.8,
    diameter: 6792,
    period: 687.0,
    rotationPeriod: 24.6,
    obliquity: 25.2,
    orbitColor: new Color3(1, 0.2, 0.2),
  },
  [PlanetName.Jupiter]: {
    semiMajorAxis: 778.5,
    eccentricity: 0.049,
    inclination: 1.3,
    diameter: 142984,
    period: 4331,
    rotationPeriod: 9.9,
    obliquity: 3.1,
    orbitColor: new Color3(1, 0.6, 0.2),
  },
  [PlanetName.Saturn]: {
    semiMajorAxis: 1432.0,
    eccentricity: 0.052,
    inclination: 2.5,
    diameter: 120536,
    period: 10747,
    rotationPeriod: 10.7,
    obliquity: 26.7,
    orbitColor: new Color3(0.9, 0.8, 0.5),
  },
  [PlanetName.Uranus]: {
    semiMajorAxis: 2867.0,
    eccentricity: 0.047,
    inclination: 0.8,
    diameter: 51118,
    period: 30589,
    rotationPeriod: -17.2,
    obliquity: 97.8,
    orbitColor: new Color3(0.5, 0.8, 1),
  },
  [PlanetName.Neptune]: {
    semiMajorAxis: 4515.0,
    eccentricity: 0.01,
    inclination: 1.8,
    diameter: 49528,
    period: 59800,
    rotationPeriod: 16.1,
    obliquity: 28.3,
    orbitColor: new Color3(0.3, 0.5, 1),
  },
  [PlanetName.Pluto]: {
    semiMajorAxis: 5906.4,
    eccentricity: 0.244,
    inclination: 17.2,
    diameter: 2376,
    period: 90560,
    rotationPeriod: -153.3,
    obliquity: 119.5,
    orbitColor: new Color3(0.7, 0.5, 0.9),
  },
};

export const EARTH_TO_SUN_RATIO = 109;
