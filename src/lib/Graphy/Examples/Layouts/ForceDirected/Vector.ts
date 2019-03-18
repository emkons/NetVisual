export class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static random(): Vector {
    return new Vector(10 * (Math.random() - 0.5), 10 * (Math.random() - 0.5));
  }

  add(v2: Vector): Vector {
    return new Vector(this.x + v2.x, this.y + v2.y);
  }

  subtract(v2: Vector): Vector {
    return new Vector(this.x - v2.x, this.y - v2.y);
  }

  multiply(n: number): Vector {
    return new Vector(this.x * n, this.y * n);
  }

  divide(n: number): Vector {
    return new Vector(this.x / n, this.y / n);
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normal(): Vector {
    return new Vector(-this.y, this.x);
  }

  normalize(): Vector {
    return this.divide(this.magnitude());
  }
}
