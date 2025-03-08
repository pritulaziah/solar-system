import { Scene } from "@babylonjs/core";
import { PlanetName } from "@objects/constants";

import { EarthMaterial } from "@materials/Earth/EarthMaterial";
import { MarsMaterial } from "@materials/Mars/MarsMaterial";
import { JupiterMaterial } from "@materials/Jupiter/JupiterMaterial";
import { SaturnMaterial } from "@materials/Saturn/SaturnMaterial";
import { UranusMaterial } from "@materials/Uranus/UranusMaterial";
import { MercuryMaterial } from "@materials/Mercury/MercuryMaterial";
import { NeptuneMaterial } from "@materials/Neptune/NeptuneMaterial";
import { VenusMaterial } from "@materials/Venus/VenusMaterial";

import { UpdatableMaterial } from "@materials/UpdatableMaterial";

export class PlanetMaterialFactory {
  static create(
    planetName: PlanetName,
    scene: Scene
  ): UpdatableMaterial | undefined {
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
}
