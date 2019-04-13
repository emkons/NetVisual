import { Vector } from "./Vector";
import { Node } from "../../../Node";

export class Point {
  position: Vector;
  mass: number;
  velocity: Vector = new Vector(0, 0);
  acceleration: Vector = new Vector(0, 0);
  node: Node;
  constructor(position: Vector, mass: number, node?: Node) {
    this.position = position;
    this.mass = mass;
    this.node = node;
  }

  applyForce(force: Vector) {
    this.acceleration = this.acceleration.add(force.divide(this.mass));
  }
}
