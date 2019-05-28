import Layout from '../classes/Layout'
import { ILayout } from '../classes/ILayout'
import Graph, { Node } from '../classes/Graph'
import { sumSqrt } from './util'

export default class ISOM extends Layout implements ILayout {
  public incremental: boolean = true

  // Epoch
  protected t: number = 1
  protected tMax: number = 500
  // Radius
  protected r: number = 100
  // Colling factor
  protected c: number = 0.4

  // Experimental attributes
  protected minAdaption: number = 0.01
  protected maxAdaption: number = 0.8
  protected rMax: number = 100
  protected rMin: number = 0
  protected interval: number = 50
  protected diameter: number = 1000

  public process(graph: Graph) {
    const nodes = graph.nodes()
    const adaption = Math.max(
      this.minAdaption,
      Math.exp(-this.c * (this.t / this.tMax)) * this.maxAdaption
    )
    const i = {
      x: Math.random() * this.diameter,
      y: Math.random() * this.diameter,
    }
    let minNode: Node = nodes[0]
    let dist: number = Infinity
    nodes.forEach(node => {
      const newDist = sumSqrt(node.x - i.x, node.y - i.y)
      if (newDist < dist) {
        minNode = node
        dist = newDist
      }
    })
    nodes
      .filter(node => {
        return sumSqrt(minNode.x - node.x, minNode.y - node.y) < this.r
      })
      .forEach(node => {
        const distance = sumSqrt(minNode.x - node.x, minNode.y - node.y)
        const adaptionCoef = Math.pow(2, -distance) * adaption
        const newX = node.x - adaptionCoef * (node.x - i.x)
        const newY = node.y - adaptionCoef * (node.y - i.y)
        node.x = newX
        node.y = newY
      })
    this.t += 1
    if (this.t % this.interval === 0 && this.r > this.rMin) {
      this.r -= 10
    }
  }

  protected init(graph: Graph): void {
    graph.nodes().forEach(node => {
      ;(node.x = Math.random() * this.diameter), (node.y = Math.random() * this.diameter)
    })
  }

  public shouldContinue(graph: Graph): boolean {
    return this.t <= this.tMax
  }
}
