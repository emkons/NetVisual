import {
  CanvasRenderer,
  CanvasRendererOptions,
  CanvasStyleOptions
} from "../CanvasRenderer";
import { NodeRenderer } from "./NodeRenderer";
import { EdgeRenderer } from "./EdgeRenderer";

export interface NodeLinkRendererOptions extends CanvasRendererOptions {
  nodeRenderer?: NodeRenderer;
  edgeRenderer?: EdgeRenderer;
}

export class NodeLinkRenderer extends CanvasRenderer {
  options: NodeLinkRendererOptions;
  nodeRenderer: NodeRenderer;
  edgeRenderer: EdgeRenderer;
  constructor(
    canvas: HTMLCanvasElement,
    styleOptions: CanvasStyleOptions,
    options: NodeLinkRendererOptions
  ) {
    super(canvas, styleOptions, options);
    this.nodeRenderer = options.nodeRenderer;
    this.edgeRenderer = options.edgeRenderer;
    this.options = options;
  }
  render(context: CanvasRenderingContext2D): void {
    this.getEdgeRenderer().render(context);
    this.getNodeRenderer().render(context);
  }

  getNodeRenderer(): NodeRenderer {
    return this.options.nodeRenderer;
  }

  getEdgeRenderer(): EdgeRenderer {
    return this.options.edgeRenderer;
  }
}
