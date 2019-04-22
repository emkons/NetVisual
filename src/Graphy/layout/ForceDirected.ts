import { ILayout } from '../classes/ILayout'
import Graph, { Node } from '../classes/Graph'
import Events from '../classes/Events'
import { Vector } from '../util'

export default class ForceDirected extends Events implements ILayout {
  public readonly incremental = true

  private running = false
  private aForce = 10000
  private rForce = 5

  private iters = 0

  public start(graph: Graph): Promise<Graph> {
    this.running = true

    setTimeout(() => {
      this.iterate(graph)
    },         0)

    return new Promise<Graph>(resolve => {
      this.subscribe('done', resolve)
    })
  }

  private iterate(graph: Graph) {
    this.repulse(graph)
    this.attract(graph)
    this.updatePositions(graph)
    if (this.iters < 1000) {
      this.iters += 1
      // Check if should proceed
      this.dispatch('iteration', graph)
      setTimeout(() => {
        this.iterate(graph)
      },         0)
    } else {
      this.dispatch('done', graph)
    }
  }

  private attract(graph: Graph) {
    const edges = graph.edges()
    edges.forEach(e => {
      if (e.source !== e.target) {
        const dir = e.source.pos.clone().subtract(e.target.pos)
        const force = dir.norm().multiply(dir.dist2() / this.aForce)
        e.source.force.subtract(force)
        e.target.force.add(force)
      }
    })
  }

  private repulse(graph: Graph) {
    const nodes = graph.nodes()
    nodes.forEach(node => {
      node.force = new Vector(0, 0)
      node.pos = new Vector(node.x, node.y)
    })
    nodes.forEach(n1 => {
      nodes.forEach(n2 => {
        if (n1.id !== n2.id) {
          const dir = n1.pos.clone().subtract(n2.pos)
          const force = dir.norm().multiply((this.rForce * this.rForce) / dir.dist())
          n1.force.add(force)
          n2.force.subtract(force)
        }
      })
    })
  }

  private updatePositions(graph: Graph) {
    graph.nodes().forEach(node => {
      node.x += node.force.x
      node.y += node.force.y
    })
  }

  public stop(): boolean {
    this.running = false
    return this.running
  }
}
