import Graph, { Edge, Node } from './classes/Graph'
import { maxHeaderSize } from 'http'
import { sumSqrt } from './layout/util'

export type ID = string | number

export function isID(id: any): id is ID {
  return typeof id === 'string' || typeof id === 'number'
}

export function isIDArray(ids: any): ids is ID[] {
  if (!Array.isArray(ids)) {
    return false
  }
  return ids.every(id => isID(id))
}

export function isCanvas(el: any): el is HTMLCanvasElement {
  return el instanceof HTMLCanvasElement
}

export function resolveNestedProp(path: string | string[], object: any): any {
  const properties = Array.isArray(path) ? path : path.split('.')
  return properties.reduce((prev, curr) => prev && prev[curr], object)
}

export function resolveNestedPropWithFallback(path: string, key: string, object: any): any {
  let currPath = path
  let res: any
  while (currPath.indexOf('.') !== -1 && !res) {
    res = resolveNestedProp(`${currPath}.${key}`, object)
    currPath = currPath.substr(0, currPath.lastIndexOf('.'))
  }
  return res
}

export function createNestedPath(path: string | string[], object: any): any {
  const properties = Array.isArray(path) ? path : path.split('.')
  return properties.reduce((prev, curr) => (prev[curr] = prev[curr] || {}), object)
}

export class Vector {
  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public add(v2: Vector) {
    this.x += v2.x
    this.y += v2.y
    return this
  }

  public multiply(c: number) {
    this.x *= c
    this.y *= c
    return this
  }

  public subtract(v2: Vector) {
    this.x -= v2.x
    this.y -= v2.y
    return this
  }

  public dist2() {
    return this.x * this.x + this.y * this.y
  }

  public dist() {
    return Math.sqrt(this.dist2())
  }

  public norm() {
    return this.clone().multiply(1 / this.dist())
  }

  public clone() {
    return new Vector(this.x, this.y)
  }
}

export class PriorityQueue<T> {
  private top = 0

  private parent(i: number) {
    return ((i + 1) >>> 1) - 1
  }
  private left(i: number) {
    return (i << 1) + 1
  }

  private right(i: number) {
    return (i + 1) << 1
  }

  protected heap: T[] = []

  protected comp: (a: T, b: T) => boolean

  constructor(comp: (a: T, b: T) => boolean = (a: T, b: T) => a > b) {
    this.comp = comp
  }
  size(): number {
    return this.heap.length
  }
  isEmpty(): boolean {
    return this.size() === 0
  }
  peek(): T {
    return this.heap[this.top]
  }
  push(...values: T[]): number {
    values.forEach(value => {
      this.heap.push(value)
      this.siftUp()
    })
    return this.size()
  }
  pop(): T {
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > this.top) {
      this.swap(this.top, bottom)
    }
    this.heap.pop()
    this.siftDown()
    return poppedValue
  }
  replace(value: T): T {
    const replacedValue = this.peek()
    this.heap[this.top] = value
    this.siftDown()
    return replacedValue
  }
  private greater(i: number, j: number): boolean {
    return this.comp(this.heap[i], this.heap[j])
  }
  private swap(i: number, j: number): void {
    ;[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
  }
  private siftUp(): void {
    let node = this.size() - 1
    while (node > this.top && this.greater(node, this.parent(node))) {
      this.swap(node, this.parent(node))
      node = this.parent(node)
    }
  }
  private siftDown(): void {
    let node = this.top
    let left = this.left(node)
    let right = this.right(node)
    while (
      (left < this.size() && this.greater(left, node)) ||
      (right < this.size() && this.greater(right, node))
    ) {
      const maxChild = right < this.size() && this.greater(right, left) ? right : left
      this.swap(node, maxChild)
      node = maxChild
      left = this.left(node)
      right = this.right(node)
    }
  }
}

export function getEdgeCrossings(graph: Graph): number {
  const edges: Edge[] = graph.edges()

  const onSegment = (p: Node, q: Node, r: Node): boolean => {
    if (
      q.x <= Math.max(p.x, r.x) &&
      q.x >= Math.min(p.x, r.x) &&
      q.y <= Math.max(p.y, r.y) &&
      q.y >= Math.min(p.y, r.y)
    ) {
      return true
    }
    return false
  }

  const orientation = (p: Node, q: Node, r: Node): number => {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)
    if (val === 0) return 0
    return val > 0 ? 1 : 2
  }

  const doOverlap = (n1: Node, n2: Node): boolean => {
    return n1.x === n2.x && n1.y === n2.y
  }

  const doIntercest = (n1: Node, n2: Node, n3: Node, n4: Node): boolean => {
    // Ignore starting point overlaps
    if (doOverlap(n1, n3) || doOverlap(n1, n4) || doOverlap(n2, n3) || doOverlap(n2, n4)) {
      return false
    }
    const o1 = orientation(n1, n2, n3)
    const o2 = orientation(n1, n2, n4)
    const o3 = orientation(n3, n4, n1)
    const o4 = orientation(n3, n4, n2)

    if (o1 !== o2 && o3 !== o4) {
      return true
    }

    if (o1 === 0 && onSegment(n1, n3, n2)) {
      return true
    }

    if (o2 === 0 && onSegment(n1, n4, n2)) {
      return true
    }

    if (o3 === 0 && onSegment(n3, n1, n4)) {
      return true
    }

    if (o4 === 0 && onSegment(n3, n2, n4)) {
      return true
    }

    return false
  }
  let crossings = 0
  edges.forEach(e1 => {
    edges.forEach(e2 => {
      if (e1 === e2) return
      crossings += doIntercest(e1.source, e1.target, e2.source, e2.target) ? 1 : 0
    })
  })
  return crossings / 2
}

export function calculateEdgeLengthStats(graph: Graph): { mean: number; stdev: number } {
  const lengths = graph.edges().map(edge => {
    const dx = edge.target.x - edge.source.x
    const dy = edge.target.y - edge.source.y
    return sumSqrt(dx, dy)
  })

  const sum = lengths.reduce((prev, l) => prev + l, 0)
  const mean = sum / lengths.length

  const sumSQ = lengths.reduce((prev, l) => prev + (l - mean) * (l - mean))
  const stdev = Math.sqrt(sumSQ / lengths.length)

  return {
    mean,
    stdev,
  }
}
