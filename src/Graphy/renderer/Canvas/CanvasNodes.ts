import { Node } from '../../classes/Graph'

export interface ICanvasNodeRenderer {
  render(node: Node, context: CanvasRenderingContext2D, getter: (key: string) => any): void
}

export default class CanvasNodes implements ICanvasNodeRenderer {
  render(node: Node, context: CanvasRenderingContext2D, getter: (key: string) => any): void {
    context.save()
    if (node.camProps.hover) {
      context.fillStyle = '#f00'
    } else {
      context.fillStyle = node.color || getter('defaultNodeColor')
    }
    context.beginPath()
    context.arc(node.camProps.x, node.camProps.y, node.camProps.size, 0, Math.PI * 2)
    context.closePath()
    context.fill()
    context.restore()
    // TODO: Calculate bounding box
  }
}
