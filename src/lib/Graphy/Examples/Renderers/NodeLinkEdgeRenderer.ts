import { EdgeRenderer } from '../../Abstract/Renderers/NodeLink/EdgeRenderer';

export class NodeLinkEdgeRenderer extends EdgeRenderer {
  render(context: CanvasRenderingContext2D): void {
    super.render(context);
    if (this.edgeSprings !== undefined) {
      this.edgeSprings.forEach(e => {
        const p1 = this.mapToScreenCoords(e.point1);
        const p2 = this.mapToScreenCoords(e.point2);
        const normal = p2.position.subtract(p1.position).normal();
        const nor1 = p2.position.add(normal);
        const nor2 = p1.position.add(normal);
        context.moveTo(p1.position.x, p1.position.y);
        // context.bezierCurveTo(
        //   nor1.x,
        //   nor1.y,
        //   nor2.x,
        //   nor2.y,
        //   p2.position.x,
        //   p2.position.y,
        // );
        context.lineTo(p2.position.x, p2.position.y);
        context.stroke();
      });
    }
  }
}
