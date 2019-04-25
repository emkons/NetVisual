import Layout, { ILayout } from '../classes/ILayout'
import Graph from '../classes/Graph'

export default class FruchtermanReingold extends Layout implements ILayout {
  public readonly incremental = true

  // Constants
  private SPEED_DIVISOR = 800
  private AREA_MULTIPLICATOR = 10000

  // Algorithm properties
  protected area = 10000
  protected speed = 1
  protected gravity = 10
  protected minMovement = 0.001

  // Internal variables
  private prevLimit: number

  protected process(graph: Graph) {
    const nodes = graph.nodes()
    const edges = graph.edges()

    this.initNodeLayoutProps(nodes)

    const maxDistance = Math.sqrt(this.AREA_MULTIPLICATOR * this.area) / 10
    const k = Math.sqrt((this.AREA_MULTIPLICATOR * this.area) / (1 + nodes.length))

    // Repulsion
    nodes.forEach(n1 => {
      nodes.forEach(n2 => {
        if (n1 !== n2) {
          const xDist = n1.x - n2.x
          const yDist = n1.y - n2.y
          const dist = Math.sqrt(xDist * xDist + yDist * yDist)

          if (dist > 0) {
            const force = (k * k) / dist
            n1.layoutProps.f.x += (xDist / dist) * force
            n1.layoutProps.f.y += (yDist / dist) * force
          }
        }
      })
    })

    // Attraction
    edges.forEach(e => {
      const nS = e.source
      const nT = e.target

      const xDist = nS.x - nT.x
      const yDist = nS.y - nT.y
      const dist = Math.sqrt(xDist * xDist + yDist * yDist)
      const force = (dist * dist) / k

      if (dist > 0) {
        nS.layoutProps.f.x -= (xDist / dist) * force
        nS.layoutProps.f.y -= (yDist / dist) * force
        nT.layoutProps.f.x += (xDist / dist) * force
        nT.layoutProps.f.y += (yDist / dist) * force
      }
    })

    // Gravity
    nodes.forEach(node => {
      const d = Math.sqrt(node.x * node.x + node.y * node.y)
      const gf = 0.01 * k * this.gravity * d
      node.layoutProps.f.x -= (gf * node.x) / d
      node.layoutProps.f.y -= (gf * node.y) / d
    })

    // Speed
    nodes.forEach(node => {
      const speedMultiplier = this.speed / this.SPEED_DIVISOR
      node.layoutProps.f.x *= speedMultiplier
      node.layoutProps.f.y *= speedMultiplier
    })
    this.prevLimit = 0

    // Apply force to position
    nodes.forEach(node => {
      const xDist = node.layoutProps.f.x
      const yDist = node.layoutProps.f.y
      const dist = Math.sqrt(xDist * xDist + yDist * yDist)
      // Consider adding node.isFixed()
      if (dist > 0) {
        const limitedDist = Math.min(maxDistance * (this.speed / this.SPEED_DIVISOR), dist)
        this.prevLimit = Math.max(this.prevLimit, limitedDist)
        node.x += (xDist / dist) * limitedDist
        node.y += (yDist / dist) * limitedDist
      }
    })
  }

  protected shouldContinue(graph: Graph) {
    return this.prevLimit > this.minMovement
  }
}
