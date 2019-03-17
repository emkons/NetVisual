import {
  NodeLinkRenderer,
  NodeLinkRendererOptions
} from "../../Abstract/Renderers/NodeLink";
import { CanvasStyleOptions } from "../../Abstract/Renderers/CanvasRenderer";
import { NodeLinkEdgeRenderer } from "./NodeLinkEdgeRenderer";
import { NodeLinkNodeRenderer } from "./NodeLinkNodeRenderer";

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
  }

  render(context: CanvasRenderingContext2D): void {
    super.render(context);
  }
}
