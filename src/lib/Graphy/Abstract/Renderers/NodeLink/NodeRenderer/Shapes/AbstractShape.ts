import {
  CanvasRendererAbstract,
  CanvasStyleOptions
} from "../../../CanvasRenderer";

export abstract class AbstractShape extends CanvasRendererAbstract {
  size: number;
  constructor(
    context: CanvasRenderingContext2D,
    styleOptions: CanvasStyleOptions,
    size: number
  ) {
    super(context, styleOptions);
    this.size = size;
  }
  render(context: CanvasRenderingContext2D): void {}

  abstract draw(x: number, y: number): void;
}
