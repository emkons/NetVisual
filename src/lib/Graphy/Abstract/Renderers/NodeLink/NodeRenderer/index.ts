import { CanvasRendererAbstract } from "../../CanvasRenderer";
import { Point } from "../../../../Examples/Layouts/ForceDirected/Point";

export abstract class NodeRenderer extends CanvasRendererAbstract {
  nodePoints: Point[];
  render(context: CanvasRenderingContext2D): void {}

  setNodePoints(nodePoints: Point[]) {
    this.nodePoints = nodePoints;
  }
}
