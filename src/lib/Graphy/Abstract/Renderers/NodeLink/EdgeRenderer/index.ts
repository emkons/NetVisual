import { CanvasRendererAbstract } from "../../CanvasRenderer";
import { Spring } from "../../../../Examples/Layouts/ForceDirected/Spring";

export abstract class EdgeRenderer extends CanvasRendererAbstract {
  edgeSprings: Spring[];
  render(context: CanvasRenderingContext2D): void {}

  setEdgeSprings(edgeSprings: Spring[]) {
    this.edgeSprings = edgeSprings;
  }
}
