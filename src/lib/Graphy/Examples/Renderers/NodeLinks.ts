import {
  NodeLinkRenderer,
  NodeLinkRendererOptions
} from "../../Abstract/Renderers/NodeLink";
import { CanvasStyleOptions } from "../../Abstract/Renderers/CanvasRenderer";
import { NodeLinkEdgeRenderer } from "./NodeLinkEdgeRenderer";
import { NodeLinkNodeRenderer } from "./NodeLinkNodeRenderer";
import { Point } from "../Layouts/ForceDirected/Point";
import { Vector } from "../Layouts/ForceDirected/Vector";

export class NodeLinks extends NodeLinkRenderer {
  constructor(
    canvas: HTMLCanvasElement,
    styleOptions: CanvasStyleOptions,
    options: NodeLinkRendererOptions
  ) {
    options.edgeRenderer =
      options.edgeRenderer ||
      new NodeLinkEdgeRenderer(
        canvas.getContext("2d") || new CanvasRenderingContext2D(),
        styleOptions
      );
    options.nodeRenderer =
      options.nodeRenderer ||
      new NodeLinkNodeRenderer(
        canvas.getContext("2d") || new CanvasRenderingContext2D(),
        styleOptions
      );
    super(canvas, styleOptions, options);
    this.setNodePoints = this.setNodePoints.bind(this);
  }

  render(context: CanvasRenderingContext2D): void {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    super.render(context);
  }

  protected mapToScreenCoords(point: Point) {
      let newPoint: Point = new Point(point.position.multiply(10).add(new Vector(100, 100)), 1);
      return newPoint;
  }

  setNodePoints(nodePoints: Point[]) {
    super.setNodePoints(nodePoints);
    nodePoints = nodePoints.map(this.mapToScreenCoords);
    this.getNodeRenderer().setNodePoints(nodePoints);
  }
}
