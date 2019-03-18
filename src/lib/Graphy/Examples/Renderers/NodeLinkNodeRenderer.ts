import { NodeRenderer } from "../../Abstract/Renderers/NodeLink/NodeRenderer";
import { Circle } from "../../Abstract/Renderers/NodeLink/NodeRenderer/Shapes/Circle";
import { CanvasStyleOptions } from "../../Abstract/Renderers/CanvasRenderer";

export class NodeLinkNodeRenderer extends NodeRenderer {
  shape: Circle;

  constructor(
    context: CanvasRenderingContext2D,
    styleOptions: CanvasStyleOptions
  ) {
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    super(context, styleOptions);
  }
  render(context: CanvasRenderingContext2D): void {
    this.shape = this.shape || new Circle(context, this.styleOptions, 20);
    super.render(context);
    if (this.nodePoints !== undefined) {
      this.nodePoints.forEach(p => {
        this.shape.draw(p.position.x, p.position.y);
      });
    }
  }
}
