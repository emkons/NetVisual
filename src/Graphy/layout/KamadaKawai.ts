import Layout from '../classes/Layout'
import { ILayout } from '../classes/ILayout'
import Graph, { Node } from '../classes/Graph'
import { sumSqrt } from './util'

export default class KamadaKawai extends Layout implements ILayout {
  public incremental = true

  // Properties
  protected diameter: number = 6000
  protected sprConst: number = 10

  // Internal variables
  private currPass: number = 2
  private edgeLen: number

  private shouldStop: boolean = false

  // deltas
  private mDi: number = 0
  private mD: number = 10

  protected process(graph: Graph) {
    const nodes = graph.nodes()
    const edges = graph.edges()

    this.initNodeLayoutProps(nodes)

    const mDi = this.mDi
    const maxDeltaNode = nodes[mDi]
    // const originalX = maxDeltaNode.x
    // const originalY = maxDeltaNode.y

    let delta = this.mD
    let innerIters = 0
    while (delta > 0.001 && innerIters < 10) {
      innerIters += 1
      const oldX = maxDeltaNode.x
      const oldY = maxDeltaNode.y

      // Calculate Dx, Dy, A, B, C
      let A = 0
      let B = 0
      let C = 0
      nodes.forEach(node => {
        if (node === maxDeltaNode) return
        const dx = oldX - node.x
        const dy = oldY - node.y
        const dist = sumSqrt(dx, dy)
        const den = dist * (dx * dx + dy * dy)
        const k = maxDeltaNode.layoutProps.const[node.id]
        const l = maxDeltaNode.layoutProps.length[node.id]
        A += k * (1 - (l * dy * dy) / den)
        B += (k * l * dx * dy) / den
        C += k * (1 - (l * dx * dx) / den)
      })
      const myDx = maxDeltaNode.layoutProps.delta['x']
      const myDy = maxDeltaNode.layoutProps.delta['y']

      // Solve linear equations
      const deltaY = (myDx * B - myDy * A) / (A * C - B * B)
      const deltaX = (B * myDy - C * myDx) / (A * C - B * B)

      maxDeltaNode.x = oldX + deltaX
      maxDeltaNode.y = oldY + deltaY
      const newX = oldX + deltaX
      const newY = oldY + deltaY

      // Update delta values
      let newDxx = 0
      let newDyy = 0
      nodes.forEach(node => {
        if (node === maxDeltaNode) return
        const oldDx = oldX - node.x
        const oldDy = oldY - node.y
        const oldMiDist = sumSqrt(oldDx, oldDy)
        const newDx = newX - node.x
        const newDy = newY - node.y
        const newMiDist = sumSqrt(newDx, newDy)
        const k = maxDeltaNode.layoutProps.const[node.id]
        const l = maxDeltaNode.layoutProps.length[node.id]
        const delta = node.layoutProps.delta
        delta['x'] -= k * (oldDx - (l * oldDx) / oldMiDist)
        delta['y'] -= k * (oldDy - (l * oldDy) / oldMiDist)
        delta['x'] += k * (newDx - (l * newDx) / newMiDist)
        delta['y'] += k * (newDy - (l * newDy) / newMiDist)
        newDxx += k * (newDx - (l * newDx) / newMiDist)
        newDyy += k * (newDy - (l * newDy) / newMiDist)
      })

      const maxDeltaNodeDelta = maxDeltaNode.layoutProps.delta
      maxDeltaNodeDelta['x'] = newDxx
      maxDeltaNodeDelta['y'] = newDyy
      delta = newDxx * newDxx + newDyy * newDyy

      maxDeltaNode.x = newX
      maxDeltaNode.y = newY
    }

    // Calculate deltas
    let maxDelta = 0
    let maxDeltaIndex = 0
    nodes.forEach((node, index) => {
      const myDx = node.layoutProps.delta['x']
      const myDy = node.layoutProps.delta['y']
      const delta = myDx * myDx + myDy * myDy
      if (delta > maxDelta) {
        maxDelta = delta
        maxDeltaIndex = index
      }
    })
    this.mD = maxDelta
    this.mDi = maxDeltaIndex
  }

  protected init(graph: Graph): void {
    this.initNodeLayoutProps(graph.nodes())
    // Initialize dMax
    let dMax = 0

    // Get node distances and uniformify them
    const nodes = graph.calcPaths()
    nodes.forEach(n1 => {
      nodes.forEach(n2 => {
        if (n1 === n2) return
        const min = Math.min(n1.layoutProps.dist[n2.id], n2.layoutProps.dist[n1.id])
        dMax = Math.max(dMax, min)
        n1.layoutProps.dist[n2.id] = min
        n2.layoutProps.dist[n1.id] = min
      })
    })
    this.edgeLen = this.diameter / dMax

    // Calculate d, l and k
    nodes.forEach(n1 => {
      n1.layoutProps.length = {}
      n1.layoutProps.const = {}
      nodes.forEach(n2 => {
        if (n1 === n2) return
        if (!n2.layoutProps.length) n2.layoutProps.length = {}
        if (!n2.layoutProps.const) n2.layoutProps.const = {}
        const dist = this.edgeLen * n1.layoutProps.dist[n2.id]
        const k = this.sprConst / (dist * dist)
        n1.layoutProps.length[n2.id] = dist
        n2.layoutProps.length[n1.id] = dist
        n1.layoutProps.const[n2.id] = k
        n2.layoutProps.const[n1.id] = k
      })
    })

    // Position nodes
    const count = nodes.length
    const turn = (Math.PI * 2) / count
    let angle = 0

    nodes.forEach(node => {
      node.x = Math.sin(angle) * this.diameter
      node.y = Math.cos(angle) * this.diameter
      angle += turn
    })

    // Initialize Delta
    let maxDelta = 0
    let maxDeltaIndex = 0
    nodes.forEach((n1, index) => {
      let myD1 = 0
      let myD2 = 0
      nodes.forEach(n2 => {
        if (n1 === n2) return
        const dx = n1.x - n2.x
        const dy = n1.y - n2.y
        const miDist = sumSqrt(dx, dy)
        myD1 += n1.layoutProps.const[n2.id] * (dx - (n1.layoutProps.length[n2.id] * dx) / miDist)
        myD2 += n1.layoutProps.const[n2.id] * (dy - (n1.layoutProps.length[n2.id] * dy) / miDist)
      })
      const delta = myD1 * myD1 + myD2 * myD2
      if (delta <= 0) {
        debugger
      }
      if (delta > maxDelta) {
        maxDelta = delta
        maxDeltaIndex = index
      }
      n1.layoutProps.delta = {
        x: myD1,
        y: myD2,
      }
    })
    this.mD = maxDelta
    this.mDi = maxDeltaIndex
  }

  protected shouldContinue(graph: Graph): boolean {
    return this.mD > 0.001
  }
}
