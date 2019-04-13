import {
  CanvasRendererAbstract,
  CanvasStyleOptions
} from "../../../CanvasRenderer";

export abstract class AbstractShape extends CanvasRendererAbstract {
  size: number;
  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    styleOptions: CanvasStyleOptions,
    size: number
  ) {
    super(canvas, context, styleOptions);
    this.size = size;
  }
  render(context: CanvasRenderingContext2D): void {}

  abstract draw(x: number, y: number): void;
}
