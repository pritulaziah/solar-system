import { Scene, CreateSphere, Mesh, Vector3, TransformNode, LinesMesh, CreateLines, Color3 } from "@babylonjs/core";
import { MercuryMaterial } from "./MercuryMaterial";

export class Mercury {
  private static readonly SEMI_MAJOR_AXIS = 193.5;
  private static readonly ECCENTRICITY = 0.2056;
  private static readonly INCLINATION = 7 * (Math.PI / 180);
  private static readonly SEMI_MINOR_AXIS =
    Mercury.SEMI_MAJOR_AXIS * Math.sqrt(1 - Mercury.ECCENTRICITY ** 2);
  private static readonly DIAMETER = 0.383;
  private static readonly ORBIT_SPEED = 0.01;

  mesh: Mesh;
  orbitPath: LinesMesh;
  orbitNode: TransformNode;

  constructor(scene: Scene) {
    const orbitNode = Mercury.createOrbitNode(scene);
    this.orbitNode = orbitNode;
    const mesh = Mercury.createMesh(scene);
    mesh.parent = orbitNode;
    this.mesh = mesh;
    this.orbitPath = Mercury.createOrbitPath(scene);
  }

  update(elapsedSeconds: number) {
    const theta = elapsedSeconds * Mercury.ORBIT_SPEED;
    const x = Mercury.SEMI_MAJOR_AXIS * Math.cos(theta);
    const z = Mercury.SEMI_MINOR_AXIS * Math.sin(theta);
    const y = Math.sin(Mercury.INCLINATION) * z;

    this.mesh.position.set(x, y, z);
  }

  private static createOrbitNode(scene: Scene): TransformNode {
    const orbitNode = new TransformNode("mercuryOrbit", scene);
    orbitNode.position = Vector3.Zero();

    return orbitNode;
  }

  private static createOrbitPath(scene: Scene): LinesMesh {
    const points: Vector3[] = [];
    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;
      const x = Mercury.SEMI_MAJOR_AXIS * Math.cos(theta);
      const z = Mercury.SEMI_MINOR_AXIS * Math.sin(theta);
      const y = Math.sin(Mercury.INCLINATION) * z;

      points.push(new Vector3(x, y, z));
    }

    const orbitPath = CreateLines("mercuryOrbitPath", { points }, scene);
    orbitPath.color = new Color3(1, 0.5, 0);

    return orbitPath;
  }

  private static createMesh(scene: Scene): Mesh {
    const mercury = CreateSphere("mercury", { diameter: Mercury.DIAMETER, segments: 64 }, scene);
    const mercuryMaterial = new MercuryMaterial(scene);
    mercury.rotation.y = Math.PI / 4;
    mercury.material = mercuryMaterial;
    return mercury;
  }
}
