import { Scene, Mesh, Color3, CreateSphere, TransformNode } from "@babylonjs/core";
import { UpdatebleMaterial } from "@materials/UpdatebleMaterial";
import { Orbit } from "./Orbit";

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
  mesh: Mesh;
  orbit: Orbit;
  meshNode: TransformNode;

  constructor(
    protected scene: Scene,
    protected name: string,
    protected params: CelestialBodyParams,
    protected material?: UpdatebleMaterial,
    protected parent?: TransformNode
  ) {
    this.orbit = new Orbit(scene, name, {
      eccentricity: params.eccentricity,
      inclination: params.inclination,
      orbitColor: params.orbitColor,
      orbitSpeed: params.orbitSpeed,
      semiMajorAxis: params.semiMajorAxis,
    }, parent);
    this.meshNode = new TransformNode(`${name}MeshNode`, this.scene);
    this.meshNode.parent = this.orbit.node;
    this.mesh = this.createMesh();
  }

  update(elapsedSeconds: number) {
    const orbitPos = this.orbit.getPositionOnOrbit(elapsedSeconds);
    this.mesh.rotation.y = elapsedSeconds * this.params.rotationSpeed;
    this.meshNode.position.copyFrom(orbitPos);
    // this.mesh.position.copyFrom(this.orbit.getPositionOnOrbit(elapsedSeconds));

    if (this.material) {
      this.material?.update(this.mesh);
    }
  }

  private createMesh(): Mesh {
    const mesh = CreateSphere(
      this.name,
      { diameter: this.params.diameter, segments: 64 },
      this.scene
    );

    if (this.material) {
      mesh.material = this.material;
    }

    mesh.rotation.x = this.params.obliquity;
    mesh.parent = this.meshNode;

    return mesh;
  }
}
