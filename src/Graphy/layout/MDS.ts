import Layout from '../classes/Layout'
import { ILayout } from '../classes/ILayout'
import Graph from '../classes/Graph'
import { eigenPower } from './util'

export default class MDS extends Layout implements ILayout {
  public incremental = false

  protected scale: number = 1000

  public process(graph: Graph) {
    const nodes = graph.calcPaths()
    const d: number[][] = []
    let sum = 0
    let count = 0

    // Calculate distance^2 and sum of distances
    nodes.forEach(n1 => {
      const n1M: number[] = []
      d.push(n1M)
      nodes.forEach(n2 => {
        const dist = n1.layoutProps.dist[n2.id]
        const dist2 = dist * dist
        n1M.push(dist2)
        sum += dist2
        count += 1
      })
    })

    // Calculate mean of distance^2 and subtract from matrix
    const mean = sum / d.length / d.length

    // Calculate row averages and subtract from matrix
    const averages = d.map(row => row.reduce((prev, col) => prev + col, 0) / row.length)
    const d3 = d.map((row, i) => row.map((col, j) => col - averages[i] - averages[j] + mean))

    // Calculate B matrix
    const B = d3.map(row => row.map(col => col * (-1 / 2)))

    // Get Eigenvector and 2 highest values
    const { values, vectors } = eigenPower(B)
    const maxEigen: number = Math.max(...values)
    const maxEigenIndex = values.indexOf(maxEigen)
    values[maxEigenIndex] = -Infinity
    const max2Eigen: number = Math.max(...values)
    const max2EigenIndex = values.indexOf(max2Eigen)
    values[maxEigenIndex] = maxEigen
    const maxEigenSqrt = Math.sqrt(maxEigen)
    const max2EigenSqrt = Math.sqrt(max2Eigen)

    // Calculate coordinates
    // vectors[1][0] = vectors[0][1]
    console.log('vectors', vectors)
    console.log('values', values)
    const n = values.length
    this.scale = this.scale / Math.max(values[0], values[1])
    nodes.forEach((node, index) => {
      node.x = vectors[0][index] * values[0] * this.scale
      node.y = vectors[1][index] * values[1] * this.scale
      // node.x = vectors[maxEigenIndex][index] * maxEigenSqrt * this.scale
      // node.y = vectors[max2EigenIndex][index] * max2EigenSqrt * this.scale
      // if (maxEigenIndex >= index) node.x = vectors[maxEigenIndex][index] * maxEigenSqrt * this.scale
      // else node.x = vectors[index][maxEigenIndex] * maxEigenSqrt * this.scale
      // if (max2EigenIndex >= index) {
      //   node.y = vectors[max2EigenIndex][index] * max2EigenSqrt * this.scale
      // } else node.y = vectors[index][max2EigenIndex] * max2EigenSqrt * this.scale
    })
  }

  public shouldContinue(graph: Graph): boolean {
    return false
  }
}
