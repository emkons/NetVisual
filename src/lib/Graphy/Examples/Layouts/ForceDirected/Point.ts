import { Vector } from "./Vector";

export class Point {
  position: Vector;
  mass: number;
  velocity: Vector = new Vector(0, 0);
  acceleration: Vector = new Vector(0, 0);
  constructor(position: Vector, mass: number) {
    this.position = position;
    this.mass = mass;
  }

  applyForce(force: Vector) {
    this.acceleration = this.acceleration.add(force.divide(this.mass));
  }
}
