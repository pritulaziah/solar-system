import { Scene } from "@babylonjs/core";

import { MoonMaterial } from "@materials/Moon/MoonMaterial";
import { UpdatebleMaterial } from "@materials/UpdatebleMaterial";

export class MoonMaterialFactory {
  static create(
    moonName: string,
    scene: Scene
  ): UpdatebleMaterial | undefined {
    switch (moonName) {
      case 'luna':
        return new MoonMaterial(scene);
      default:
        return undefined;
    }
  }
}
