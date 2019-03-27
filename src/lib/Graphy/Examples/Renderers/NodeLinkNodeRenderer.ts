import { NodeRenderer } from '../../Abstract/Renderers/NodeLink/NodeRenderer';
import { Circle } from '../../Abstract/Renderers/NodeLink/NodeRenderer/Shapes/Circle';
import { CanvasStyleOptions } from '../../Abstract/Renderers/CanvasRenderer';
import { AbstractShape } from '../../Abstract/Renderers/NodeLink/NodeRenderer/Shapes/AbstractShape';
import { Point } from '../Layouts/ForceDirected/Point';

export class NodeLinkNodeRenderer extends NodeRenderer {
  shape: AbstractShape;
  dragNode: Point | null;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    styleOptions: CanvasStyleOptions,
  ) {
    super(canvas, context, styleOptions);
    canvas.addEventListener('mousedown', this.dragStart.bind(this));
    canvas.addEventListener('mousemove', this.drag.bind(this));
    canvas.addEventListener('mouseup', this.dragEnd.bind(this));
  }
  render(context: CanvasRenderingContext2D): void {
    this.shape =
      this.shape || new Circle(this.canvas, context, this.styleOptions, 20);
    super.render(context);
    if (this.nodePoints !== undefined) {
      this.nodePoints.map(this.mapToScreenCoords, this).forEach(p => {
        let shape = this.shape;
        if (p.node && p.node.data && p.node.data.shape) {
          shape = new p.node.data.shape(
            this.canvas,
            context,
            this.styleOptions,
            20,
          );
        }
        shape.draw(p.position.x, p.position.y);
      });
    }
  }

  dragStart(event: DragEvent): void {
    console.log('Drag start');
  }
  drag(event: DragEvent): void {
    console.log('Drag in progress');
  }
  dragEnd(event: DragEvent): void {
    console.log('Drag end');
  }
}
