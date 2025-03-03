import {
  Scene,
  CreateSphere,
  Mesh,
  Vector3,
  TransformNode,
  CreateLines,
  Color3,
  LinesMesh,
} from "@babylonjs/core";
import { EarthMaterial } from "./EarthMaterial";

export class Earth {
  private static readonly SEMI_MAJOR_AXIS = 500;
  private static readonly ECCENTRICITY = 0.0167;
  private static readonly INCLINATION = 7 * (Math.PI / 180);
  private static readonly SEMI_MINOR_AXIS =
    Earth.SEMI_MAJOR_AXIS * Math.sqrt(1 - Earth.ECCENTRICITY ** 2);
  private static readonly DIAMETER = 1;
  private static readonly ORBIT_SPEED = 0.01;

  mesh: Mesh;
  orbitPath: LinesMesh;
  orbitNode: TransformNode;

  constructor(scene: Scene) {
    const orbitNode = Earth.createOrbitNode(scene);
    this.orbitNode = orbitNode;
    const mesh = Earth.createMesh(scene);
    mesh.parent = orbitNode;
    this.mesh = mesh;
    this.orbitPath = Earth.createOrbitPath(scene);
  }

  update(elapsedSeconds: number) {
    const theta = elapsedSeconds * Earth.ORBIT_SPEED;
    const x = Earth.SEMI_MAJOR_AXIS * Math.cos(theta);
    const z = Earth.SEMI_MINOR_AXIS * Math.sin(theta);
    const y = Math.sin(Earth.INCLINATION) * z;
    this.mesh.position.set(x, y, z);
    (this.mesh.material as EarthMaterial).update(this.mesh.absolutePosition);
  }

  private static createOrbitNode(scene: Scene): TransformNode {
    const orbitNode = new TransformNode("earthOrbit", scene);
    orbitNode.position = Vector3.Zero();

    return orbitNode;
  }

  private static createOrbitPath(scene: Scene) {
    const points: Vector3[] = [];
    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;
      const x = Earth.SEMI_MAJOR_AXIS * Math.cos(theta);
      const z = Earth.SEMI_MINOR_AXIS * Math.sin(theta);
      const y = Math.sin(Earth.INCLINATION) * z;

      points.push(new Vector3(x, y, z));
    }

    const orbitPath = CreateLines("earthOrbitPath", { points }, scene);
    orbitPath.color = new Color3(0, 1, 0);

    return orbitPath;
  }

  private static createMesh(scene: Scene) {
    const earth = CreateSphere("earth", { diameter: Earth.DIAMETER, segments: 64 }, scene);
    earth.rotation.y = Math.PI / 4;
    const earthMaterial = new EarthMaterial(scene);
    earth.material = earthMaterial;

    return earth;
  }
}
