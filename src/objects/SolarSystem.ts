import { Scene } from "@babylonjs/core";
import { Sun } from "./Sun";
import { Earth } from "./Earth";
import { Mercury } from "./Mercury";
import { Venus } from "./Venus";
import { Planet } from "./Planet";

export class SolarSystem {
  sun: Sun;
  earth: Earth;
  mercury: Mercury;
  venus: Venus;
  planets: Planet[];

  constructor(scene: Scene) {
    this.sun = new Sun(scene);
    this.mercury = new Mercury(scene);
    this.venus = new Venus(scene);
    this.earth = new Earth(scene);

    this.planets = [
      this.mercury,
      this.venus,
      this.earth,
    ];
  }

  update(elapsedSeconds: number) {
    this.sun.update(elapsedSeconds);

    for (const planet of this.planets) {
      planet.update(elapsedSeconds);
    }
  }
}
