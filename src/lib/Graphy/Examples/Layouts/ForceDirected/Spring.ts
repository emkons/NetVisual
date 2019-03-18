import { Point } from "./Point";

export class Spring {
  point1: Point;
  point2: Point;
  length: number;
  k: number;

  constructor(point1: Point, point2: Point, length: number, k: number) {
    this.point1 = point1;
    this.point2 = point2;
    this.length = length;
    this.k = k;
  }
}
