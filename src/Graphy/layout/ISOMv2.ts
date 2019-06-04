import Layout from '../classes/Layout'
import { ILayout } from '../classes/ILayout'
import Graph, { Node } from '../classes/Graph'
import { sumSqrt } from './util'

interface QueueListObject {
  node: Node
  dist: number
}

export default class ISOMv2 extends Layout implements ILayout {
  public incremental: boolean = true

  // Parameters
  protected maxIterations: number = 2000
  protected adaption: number = 0.8
  protected radius: number = 3
  protected cooling: number = 2
  protected iterPerRadius = 70

  protected bounds: number[] = [0, 0, 1000, 1000]

  // Internal
  protected t: number = 1
  protected minRadius: number = 1
  protected minAdaption = 0.15
  protected currAdaption: number

  public process(graph: Graph) {
    const nodes = graph.nodes()
    const edges = graph.edges()
    this.t += 1

    const tmp = {
      x: this.bounds[0] + Math.random() * (this.bounds[2] - this.bounds[0]),
      y: this.bounds[1] + Math.random() * (this.bounds[3] - this.bounds[1]),
    }

    let winner: Node
    let dist: number = Infinity
    nodes.forEach(node => {
      const dx = tmp.x - node.x
      const dy = tmp.y - node.y
      const distSqr = dx * dx + dy * dy
      if (distSqr < dist) {
        dist = distSqr
        winner = node
      }
    })

    // relax positions
    const queue: QueueListObject[] = [{ node: winner, dist: 1 }]
    const visited = {
      [winner.id]: true,
    }
    while (queue.length > 0) {
      const { node, dist } = queue.pop()

      const f = this.currAdaption / Math.pow(2, dist)

      node.x -= f * (node.x - tmp.x)
      node.y -= f * (node.y - tmp.y)

      // Enqueue neighbours
      if (dist < this.radius) {
        edges.forEach(edge => {
          let nb: Node | null = null
          if (edge.source === node) nb = edge.target
          else if (edge.target === node) nb = edge.source

          if (nb && !visited[nb.id]) {
            queue.push({ node: nb, dist: dist + 1 })
            visited[nb.id] = true
          }
        })
      }
    }

    const factor = Math.exp((-1 * this.cooling * this.t) / this.maxIterations)
    this.currAdaption = Math.max(this.minAdaption, factor * this.adaption)
    if (this.currAdaption === this.minAdaption) {
      this.minRadius = 0
    }
    if (this.radius > this.minRadius && this.t % this.iterPerRadius === 0) {
      this.radius -= 1
    }
  }

  protected init(graph: Graph): void {
    const nodes = graph.nodes()
    this.maxIterations = 20 * nodes.length
    this.radius = Math.ceil(Math.log(nodes.length) * 1.5)
    this.iterPerRadius = Math.floor(this.maxIterations / 1.2 / this.radius)
    const boundsEdgeSize = Math.sqrt(nodes.length) * 100
    this.bounds = [-boundsEdgeSize / 2, -boundsEdgeSize / 2, boundsEdgeSize / 2, boundsEdgeSize / 2]
    this.currAdaption = this.adaption
  }

  public shouldContinue(graph: Graph): boolean {
    return this.t < this.maxIterations
  }
}
