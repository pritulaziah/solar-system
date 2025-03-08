import { Scene } from "@babylonjs/core";

import { MoonMaterial } from "@materials/Moon/MoonMaterial";
import { UpdatableMaterial } from "@materials/UpdatableMaterial";

export class MoonMaterialFactory {
  static create(
    moonName: string,
    scene: Scene
  ): UpdatableMaterial | undefined {
    switch (moonName) {
      case 'luna':
        return new MoonMaterial(scene);
      default:
        return undefined;
    }
  }
}
