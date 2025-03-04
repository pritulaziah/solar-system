import { Color3 } from "@babylonjs/core";

export enum Planets {
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

export type PlanetData = {
  semiMajorAxis: number;
  eccentricity: number;
  inclination: number;
  diameter: number;
  period: number;
  orbitColor: Color3;
};

export const REAL_PLANETS: { [key in Planets]: PlanetData } = {
  [Planets.Mercury]: {
    semiMajorAxis: 0.387,
    eccentricity: 0.2056,
    inclination: 7.01,
    diameter: 4879,
    period: 87.97,
    orbitColor: new Color3(0.7, 0.7, 0.7),
  },
  [Planets.Venus]: {
    semiMajorAxis: 0.723,
    eccentricity: 0.0067,
    inclination: 3.39,
    diameter: 12104,
    period: 224.7,
    orbitColor: new Color3(1, 0.85, 0.4),
  },
  [Planets.Earth]: {
    semiMajorAxis: 1.0,
    eccentricity: 0.0167,
    inclination: 0.0,
    diameter: 12742,
    period: 365.25,
    orbitColor: new Color3(0, 1, 0),
  },
  [Planets.Mars]: {
    semiMajorAxis: 1.524,
    eccentricity: 0.0934,
    inclination: 1.85,
    diameter: 6779,
    period: 686.98,
    orbitColor: new Color3(1, 0.2, 0.2),
  },
  [Planets.Jupiter]: {
    semiMajorAxis: 5.204,
    eccentricity: 0.0489,
    inclination: 1.31,
    diameter: 139822,
    period: 4332.59,
    orbitColor: new Color3(1, 0.6, 0.2),
  },
  [Planets.Saturn]: {
    semiMajorAxis: 9.583,
    eccentricity: 0.0565,
    inclination: 2.49,
    diameter: 116460,
    period: 10759.22,
    orbitColor: new Color3(0.9, 0.8, 0.5),
  },
  [Planets.Uranus]: {
    semiMajorAxis: 19.22,
    eccentricity: 0.0463,
    inclination: 0.77,
    diameter: 50724,
    period: 30688.5,
    orbitColor: new Color3(0.5, 0.8, 1),
  },
  [Planets.Neptune]: {
    semiMajorAxis: 30.1,
    eccentricity: 0.0086,
    inclination: 1.77,
    diameter: 49244,
    period: 60182,
    orbitColor: new Color3(0.3, 0.5, 1),
  },
  [Planets.Pluto]: {
    semiMajorAxis: 39.48,
    eccentricity: 0.2488,
    inclination: 17.16,
    diameter: 2376,
    period: 90560,
    orbitColor: new Color3(0.7, 0.5, 0.9),
  },
};

export const EARTH_TO_SUN_RATIO = 109;