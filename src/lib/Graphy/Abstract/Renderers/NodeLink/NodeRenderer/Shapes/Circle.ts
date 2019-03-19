import { AbstractShape } from "./AbstractShape";

export class Circle extends AbstractShape {
  draw(x: number, y: number): void {
    let scale = 1;
    this.render(this.context);
    this.context.beginPath();
    this.context.arc(x * scale, y * scale, this.size, 0, 2 * Math.PI);
    this.context.stroke();
  }
}
