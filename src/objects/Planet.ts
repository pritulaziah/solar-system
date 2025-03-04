import {
  Scene,
  Mesh,
  TransformNode,
  LinesMesh,
  Vector3,
  CreateLines,
  Color3,
  CreateSphere,
} from "@babylonjs/core";

export type PlanetParams = {
  semiMajorAxis: number;
  eccentricity: number;
  inclination: number;
  diameter: number;
  orbitSpeed: number;
  orbitColor: Color3;
};

export abstract class Planet {
  orbitNode: TransformNode;
  orbitPath: LinesMesh;
  mesh: Mesh;
  semiMajorAxis: number;
  eccentricity: number;
  inclination: number;
  diameter: number;
  orbitSpeed: number;

  constructor(
    protected scene: Scene,
    protected name: string,
    params: PlanetParams
  ) {
    this.name = name;
    this.scene = scene;
    this.eccentricity = params.eccentricity;
    this.semiMajorAxis = params.semiMajorAxis;
    this.inclination = params.inclination * (Math.PI / 180);
    this.diameter = params.diameter;
    this.orbitSpeed = params.orbitSpeed;
    this.orbitNode = this.createOrbitNode();
    this.mesh = this.createMesh();
    this.mesh.parent = this.orbitNode;
    this.orbitPath = this.createOrbitPath(params.orbitColor);
  }

  get semiMinorAxis() {
    return this.semiMajorAxis * Math.sqrt(1 - this.eccentricity ** 2);
  }

  update(elapsedSeconds: number) {
    const theta = elapsedSeconds * this.orbitSpeed;
    const x = this.semiMajorAxis * Math.cos(theta);
    const z = this.semiMinorAxis * Math.sin(theta);
    const y = Math.sin(this.inclination) * z;

    this.mesh.position.set(x, y, z);
  }

  private createOrbitNode(): TransformNode {
    const orbitNode = new TransformNode(`${this.name}Orbit`, this.scene);
    orbitNode.position = Vector3.Zero();

    return orbitNode;
  }

  private createOrbitPath(color: Color3): LinesMesh {
    const points: Vector3[] = [];
    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;
      const x = this.semiMajorAxis * Math.cos(theta);
      const z = this.semiMinorAxis * Math.sin(theta);
      const y = Math.sin(this.inclination) * z;

      points.push(new Vector3(x, y, z));
    }

    const orbitPath = CreateLines(
      `${this.name}OrbitPath`,
      { points },
      this.scene
    );
    orbitPath.color = color;

    return orbitPath;
  }

  private createMesh(): Mesh {
    const planetMesh = CreateSphere(
      this.name,
      { diameter: this.diameter, segments: 64 },
      this.scene
    );
    planetMesh.rotation.y = Math.PI / 4;

    return planetMesh;
  }
}
