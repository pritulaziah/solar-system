import {
  Scene,
  Vector3,
  Color3,
  LinesMesh,
  CreateLines,
  TransformNode,
} from "@babylonjs/core";

export type OrbitParams = {
  semiMajorAxis: number;
  eccentricity: number;
  inclination: number;
  orbitSpeed: number;
  orbitColor: Color3;
};

export class Orbit {
  node: TransformNode;
  path: LinesMesh;

  constructor(
    private scene: Scene,
    public name: string,
    private params: OrbitParams,
    parent?: TransformNode
  ) {
    this.node = new TransformNode(`${name}OrbitNode`, scene);

    if (parent) {
      this.node.parent = parent;
    }

    this.path = this.drawPath();
  }

  private get semiMinorAxis() {
    return (
      this.params.semiMajorAxis * Math.sqrt(1 - this.params.eccentricity ** 2)
    );
  }

  private drawPath(): LinesMesh {
    const points: Vector3[] = [];
    const steps = 1000;

    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;
      const x = this.params.semiMajorAxis * Math.cos(theta);
      const z = this.semiMinorAxis * Math.sin(theta);
      const y = Math.sin(this.params.inclination) * z;

      points.push(new Vector3(x, y, z));
    }

    const orbitPath = CreateLines(`${this.name}OrbitPath`, { points }, this.scene);
    orbitPath.color = this.params.orbitColor;
    orbitPath.parent = this.node;

    return orbitPath;
  }

  getPositionOnOrbit(elapsedSeconds: number): Vector3 {
    const theta = elapsedSeconds * this.params.orbitSpeed;
    const x = this.params.semiMajorAxis * Math.cos(theta);
    const z = this.semiMinorAxis * Math.sin(theta);
    const y = Math.sin(this.params.inclination) * z;

    return new Vector3(x, y, z);
  }
}
