import { Edge } from '../../classes/Graph'

export interface ICanvasEdgeRenderer {
  render(edge: Edge, context: CanvasRenderingContext2D, getter: (key: string) => any): void
}

export default class CanvasEdges implements ICanvasEdgeRenderer {
  render(edge: Edge, context: CanvasRenderingContext2D, getter: (key: string) => any): void {
    context.save()
    context.strokeStyle = edge.color || getter('defaultEdgeColor')
    // TODO: Get width from edge/camera
    context.lineWidth = getter('defaultEdgeWidth')
    context.beginPath()
    context.moveTo(edge.source.camProps.x, edge.source.camProps.y)
    context.lineTo(edge.target.camProps.x, edge.target.camProps.y)
    context.stroke()
    context.restore()
  }
}
