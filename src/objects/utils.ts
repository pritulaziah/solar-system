import { REAL_PLANETS, Planets, EARTH_TO_SUN_RATIO } from "./constants";
import type { PlanetParams } from "./Planet";
import type { SunParams } from "./Sun";

export function calculatePlanetsParams(
  referenceOrbitRadius: number,
  referenceDiameter: number,
  referenceOrbitSpeed: number
): { [key in Planets]: PlanetParams } {
  const earth = REAL_PLANETS[Planets.Earth];

  const scaleOrbit = referenceOrbitRadius / earth.semiMajorAxis;
  const scaleDiameter = referenceDiameter / earth.diameter;
  const basePeriod = earth.period;

  return Object.fromEntries(
    Object.values(Planets).map((planet) => {
      const {
        semiMajorAxis,
        eccentricity,
        inclination,
        diameter,
        period,
        orbitColor,
      } = REAL_PLANETS[planet];

      return [
        planet,
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
  ) as { [key in Planets]: PlanetParams };
}

export function calculateSunParams(referenceDiameter: number): SunParams {
  return { diameter: referenceDiameter * EARTH_TO_SUN_RATIO };
}
