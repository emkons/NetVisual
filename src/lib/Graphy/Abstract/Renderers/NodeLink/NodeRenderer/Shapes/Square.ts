import { AbstractShape } from "./AbstractShape";

export class Square extends AbstractShape {
  draw(x: number, y: number): void {
    this.render(this.context);
    this.context.strokeRect(
      x - this.size / 2,
      y - this.size / 2,
      this.size,
      this.size
    );
  }
}
