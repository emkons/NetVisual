import { ILayout } from '../classes/ILayout'
import Layout from '../classes/Layout'
import Graph from '../classes/Graph'
import { forceNodes, sumSqrt, assignForce } from './util'

export default class ForceAtlas extends Layout implements ILayout {
  public incremental = true

  // Properties
  protected inertia: number = 0.1
  protected repStr: number = 200
  protected attrStr: number = 1
  protected maxDispl: number = 10
  protected freezeBal: boolean = false
  protected freezeStr: number = 80
  protected freezeIner: number = 0.2
  protected gravity: number = 1
  protected speed: number = 1
  protected cooling: number = 1
  protected outAttrDistr: boolean = true
  protected adjustSizes: boolean = false
  protected minMovement = 0.1

  // Internal variables
  private prevLimit: number

  protected process(graph: Graph) {
    // const isDynamicWeight: boolean
    const nodes = graph.nodes()
    const edges = graph.edges()

    this.initNodeLayoutProps(nodes, false)

    // Add inertia and reset force
    nodes.forEach(node => {
      node.layoutProps.i.x = node.layoutProps.f.x
      node.layoutProps.i.y = node.layoutProps.f.y
      node.layoutProps.f.x *= this.inertia
      node.layoutProps.f.y *= this.inertia
    })

    // Repulsion
    if (this.adjustSizes) {
      nodes.forEach(n1 => {
        nodes.forEach(n2 => {
          if (n1 !== n2) {
            forceNodes(
              n1,
              n2,
              this.repStr * (1 + graph.getDegree(n1)) * (1 + graph.getDegree(n2)),
              false,
              true,
            )
          }
        })
      })
    } else {
      nodes.forEach(n1 => {
        nodes.forEach(n2 => {
          if (n1 !== n2) {
            forceNodes(
              n1,
              n2,
              this.repStr * (1 + graph.getDegree(n1)) * (1 + graph.getDegree(n2)),
              false,
            )
          }
        })
      })
    }

    // Attraction
    if (this.adjustSizes) {
      if (this.outAttrDistr) {
        edges.forEach(edge => {
          const source = edge.source
          const target = edge.target
          // TODO: Possibly add weights
          forceNodes(source, target, this.attrStr / (1 + graph.getDegree(source)), true, true)
        })
      } else {
        edges.forEach(edge => {
          const source = edge.source
          const target = edge.target
          // TODO: Possibly add weights
          forceNodes(source, target, this.attrStr, true, true)
        })
      }
    } else {
      if (this.outAttrDistr) {
        edges.forEach(edge => {
          const source = edge.source
          const target = edge.target
          // TODO: Possibly add weights
          forceNodes(source, target, this.attrStr / (1 + graph.getDegree(source)), true)
        })
      } else {
        edges.forEach(edge => {
          const source = edge.source
          const target = edge.target
          // TODO: Possibly add weights
          forceNodes(source, target, this.attrStr, true)
        })
      }
    }

    // Gravity
    nodes.forEach(node => {
      const nx = node.x
      const ny = node.y
      const d = 0.0001 + sumSqrt(nx, ny)
      const gf = 0.0001 * this.gravity * d
      assignForce(node, nx, ny, d, -gf)
    })

    // Speed
    if (this.freezeBal) {
      nodes.forEach(node => {
        node.layoutProps.f.x *= this.speed * 10
        node.layoutProps.f.y *= this.speed * 10
      })
    } else {
      nodes.forEach(node => {
        node.layoutProps.f.x *= this.speed
        node.layoutProps.f.y *= this.speed
      })
    }

    this.prevLimit = 0
    // Apply forces
    nodes.forEach(node => {
      const layoutProps = node.layoutProps
      const dist = 0.0001 + sumSqrt(layoutProps.f.x, layoutProps.f.y)
      let ratio: number
      if (this.freezeBal) {
        if (!layoutProps.freeze) layoutProps.freeze = 0
        layoutProps.freeze =
          (this.freezeIner * layoutProps.freeze + (1 - this.freezeIner)) *
          0.1 *
          this.freezeStr *
          Math.sqrt(sumSqrt(layoutProps.i.x - layoutProps.f.x, layoutProps.i.y - layoutProps.f.y))
        ratio = Math.min(dist / (dist * (1 + layoutProps.freeze)), this.maxDispl / dist)
      } else {
        ratio = Math.min(1, this.maxDispl / dist)
      }
      layoutProps.f.x *= ratio / this.cooling
      layoutProps.f.y *= ratio / this.cooling
      console.log('dist', dist)
      console.log('ratio', ratio)
      this.prevLimit = Math.max(this.prevLimit, dist * ratio)
      node.x += layoutProps.f.x
      node.y += layoutProps.f.y
    })
  }

  protected shouldContinue(graph: Graph) {
    console.log(this.prevLimit)
    return this.prevLimit > this.minMovement
  }
}
