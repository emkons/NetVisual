import { AbstractShape } from "./AbstractShape";

class Square extends AbstractShape {
  draw(x: number, y: number): void {
    this.render(this.context);
    this.context.strokeRect(x - this.size, y - this.size, this.size, this.size);
  }
}
