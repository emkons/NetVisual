import { ILayout } from '../classes/ILayout'
import Layout from '../classes/Layout'
import Graph, { Node } from '../classes/Graph'
import Events from '../classes/Events'

export default class ForceDirected extends Layout implements ILayout {
  public readonly incremental = true

  private aForce = 10000
  private rForce = 5

  private iters = 0

  protected process(graph: Graph) {
    this.iters += 1
    this.repulse(graph)
    this.attract(graph)
    this.updatePositions(graph)
  }

  private attract(graph: Graph) {
    const edges = graph.edges()
    edges.forEach(e => {
      if (e.source !== e.target) {
        const distX = e.target.x - e.source.x
        const distY = e.target.y - e.target.y
        const dist = Math.sqrt(distX * distX + distY * distY)
        const force = (dist * dist) / this.aForce
        e.source.layoutProps.f.x += force * distX
        e.source.layoutProps.f.y += force * distY
        e.target.layoutProps.f.x -= force * distX
        e.target.layoutProps.f.y -= force * distY
      }
    })
  }

  private repulse(graph: Graph) {
    const nodes = graph.nodes()
    this.initNodeLayoutProps(nodes)
    nodes.forEach(n1 => {
      nodes.forEach(n2 => {
        if (n1.id !== n2.id) {
          const distX = n2.x - n1.x
          const distY = n2.y - n1.y
          const dist = Math.sqrt(distX * distX + distY * distY)
          const force = (this.rForce * this.rForce) / dist
          n1.layoutProps.f.x += force * distX
          n1.layoutProps.f.y += force * distY
          n2.layoutProps.f.x -= force * distX
          n2.layoutProps.f.y -= force * distY
        }
      })
    })
  }

  private updatePositions(graph: Graph) {
    graph.nodes().forEach(node => {
      node.x += node.layoutProps.f.x
      node.y += node.layoutProps.f.y
    })
  }

  protected shouldContinue(graph: Graph): boolean {
    return this.iters < 10000
  }
}
