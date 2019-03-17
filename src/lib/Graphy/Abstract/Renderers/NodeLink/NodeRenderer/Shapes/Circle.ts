import { AbstractShape } from "./AbstractShape";

class Circle extends AbstractShape {
  draw(x: number, y: number): void {
    this.render(this.context);
    this.context.beginPath();
    this.context.arc(x, y, this.size, 0, 2 * Math.PI);
    this.context.stroke();
  }
}
