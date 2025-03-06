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
import { UpdatebleMaterial } from "@materials/UpdatebleMaterial";

export type CelestialBodyParams = {
  semiMajorAxis: number;
  eccentricity: number;
  inclination: number;
  diameter: number;
  orbitSpeed: number;
  orbitColor: Color3;
  rotationSpeed: number;
  obliquity: number;
};

export abstract class CelestialBody {
  orbitNode: TransformNode;
  orbitPath: LinesMesh;
  mesh: Mesh;

  constructor(
    protected scene: Scene,
    protected name: string,
    protected params: CelestialBodyParams,
    protected material?: UpdatebleMaterial
  ) {
    this.orbitNode = this.createOrbitNode();
    this.mesh = this.createMesh();
    this.orbitPath = this.createOrbitPath(params.orbitColor);
  }

  get semiMinorAxis() {
    return (
      this.params.semiMajorAxis * Math.sqrt(1 - this.params.eccentricity ** 2)
    );
  }

  update(elapsedSeconds: number) {
    const theta = elapsedSeconds * this.params.orbitSpeed;
    const x = this.params.semiMajorAxis * Math.cos(theta);
    const z = this.semiMinorAxis * Math.sin(theta);
    const y = Math.sin(this.params.inclination) * z;

    this.mesh.rotation.y = elapsedSeconds * this.params.rotationSpeed;
    this.mesh.position.set(x, y, z);

    if (this.material) {
      this.material?.update(this.mesh);
    }
  }

  private createOrbitNode(): TransformNode {
    const orbitNode = new TransformNode(`${this.name}Orbit`, this.scene);
    orbitNode.position = Vector3.Zero();

    return orbitNode;
  }

  private createOrbitPath(color: Color3): LinesMesh {
    const points: Vector3[] = [];
    const steps = 1000;

    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;
      const x = this.params.semiMajorAxis * Math.cos(theta);
      const z = this.semiMinorAxis * Math.sin(theta);
      const y = Math.sin(this.params.inclination) * z;

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
      { diameter: this.params.diameter, segments: 64 },
      this.scene
    );

    if (this.material) {
      planetMesh.material = this.material;
    }

    planetMesh.rotation.x = this.params.obliquity;
    planetMesh.parent = this.orbitNode;

    return planetMesh;
  }
}
