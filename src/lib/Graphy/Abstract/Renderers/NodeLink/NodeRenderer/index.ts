import { CanvasRendererAbstract } from "../../CanvasRenderer";

export abstract class NodeRenderer extends CanvasRendererAbstract {
  render(context: CanvasRenderingContext2D): void {}
}
