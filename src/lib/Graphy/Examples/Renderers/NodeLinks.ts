import {
  NodeLinkRenderer,
  NodeLinkRendererOptions,
} from '../../Abstract/Renderers/NodeLink';
import { CanvasStyleOptions } from '../../Abstract/Renderers/CanvasRenderer';
import { NodeLinkEdgeRenderer } from './NodeLinkEdgeRenderer';
import { NodeLinkNodeRenderer } from './NodeLinkNodeRenderer';
import { Point } from '../Layouts/ForceDirected/Point';
import { Vector } from '../Layouts/ForceDirected/Vector';
import { Spring } from '../Layouts/ForceDirected/Spring';

export class NodeLinks extends NodeLinkRenderer {
  constructor(
    canvas: HTMLCanvasElement,
    styleOptions: CanvasStyleOptions,
    options: NodeLinkRendererOptions,
  ) {
    options.edgeRenderer =
      options.edgeRenderer ||
      new NodeLinkEdgeRenderer(
        canvas,
        canvas.getContext('2d') || new CanvasRenderingContext2D(),
        styleOptions,
      );
    options.nodeRenderer =
      options.nodeRenderer ||
      new NodeLinkNodeRenderer(
        canvas,
        canvas.getContext('2d') || new CanvasRenderingContext2D(),
        styleOptions,
      );
    super(canvas, styleOptions, options);
    this.setNodePoints = this.setNodePoints.bind(this);
    this.setEdgeSprings = this.setEdgeSprings.bind(this);
  }

  render(context: CanvasRenderingContext2D): void {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    super.render(context);
  }

  setNodePoints(nodePoints: Point[]) {
    super.setNodePoints(nodePoints);
    this.getNodeRenderer().setNodePoints(nodePoints);
  }

  setEdgeSprings(edgeSprings: Spring[]) {
    super.setEdgeSprings(edgeSprings);
    this.getEdgeRenderer().setEdgeSprings(edgeSprings);
  }
}
