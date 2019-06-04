import { ID, isID, isIDArray, Vector, PriorityQueue } from '../util'
import GraphyComponent, { IOptions } from './Abstract'
import Settings from './Settings'
import Graphy from '../Graphy'
import { INodeCamProps } from './Camera'
import { ILayoutProps } from './ILayoutProps'
import nanoid from 'nanoid'

export interface ArbitraryData {
  [key: string]: any
}

export interface DataObject {
  id: ID
  data?: ArbitraryData
  color?: string
  x?: number
  y?: number
  size?: number
  type?: string
}

export interface Node extends DataObject {
  camProps?: INodeCamProps
  layoutProps?: ILayoutProps
}
export interface Edge extends DataObject {
  source: Node
  target: Node
}

interface AdjacencyList {
  [sourceId: string]: {
    [targetId: string]: {
      [edgeId: string]: Edge
    }
  }
}

export default class Graph extends GraphyComponent {
  private nodesArray: Node[] = []
  private edgesArray: Edge[] = []

  public readonly namespace = 'graphy.graph'

  constructor(root: Graphy, options?: IOptions) {
    super(root, options)
    this.init(this.namespace)
    if (options) {
      this.parseGraph(options)
    }
  }

  protected initComponent() {}

  /**
   * Node and edge indexes by id
   */
  private nodesIndex = {}
  private edgesIndex = {}

  /**
   * Edge indexes by node
   */
  private adjacencyListIn: AdjacencyList = {}
  private adjacencyListOut: AdjacencyList = {}
  private adjacencyListAll: AdjacencyList = {}

  public addNode(node: Node): Graph {
    if (this.nodesIndex[node.id]) {
      throw `Node with id ${node.id} already exists`
    }
    if (node.data && typeof node.data.x === 'number') {
      node.x = node.data.x
    }
    if (node.data && typeof node.data.y === 'number') {
      node.y = node.data.y
    }
    if (!node.x) node.x = Math.random() * 500
    if (!node.y) node.y = Math.random() * 500

    this.adjacencyListIn[node.id] = {}
    this.adjacencyListOut[node.id] = {}
    this.adjacencyListAll[node.id] = {}

    this.nodesArray.push(node)
    this.nodesIndex[node.id] = node

    this.root.events.dispatch('addNode', node)

    return this
  }

  public parseGraph(graph: { nodes?: Node[]; edges?: Edge[] }) {
    if (graph.nodes) {
      graph.nodes.forEach(node => {
        this.addNode(node)
      })
    }
    if (graph.edges) {
      graph.edges.forEach(edge => {
        this.addEdge(edge)
      })
    }
  }

  public clear(): void {
    this.nodesArray.length = 0
    this.edgesArray.length = 0
    this._clearObj(this.nodesIndex)
    this._clearObj(this.edgesIndex)
    this._clearObj(this.adjacencyListIn)
    this._clearObj(this.adjacencyListOut)
    this._clearObj(this.adjacencyListAll)
  }

  private _clearObj(obj: any): void {
    for (const prop of Object.keys(obj)) {
      delete obj[prop]
    }
  }

  public dropNode(id: ID): Graph {
    if (!this.nodesIndex[id]) {
      throw `Node with id ${id} doesn't exist`
    }

    delete this.nodesIndex[id]
    this.nodesArray = this.nodesArray.filter(node => node.id !== id)

    this.edgesArray.forEach(edge => {
      if (edge.source.id === id || edge.target.id === id) {
        this.dropEdge(edge.id)
      }
    })

    delete this.adjacencyListIn[id]
    delete this.adjacencyListOut[id]
    delete this.adjacencyListAll[id]

    for (const i in this.nodesIndex) {
      delete this.adjacencyListIn[i][id]
      delete this.adjacencyListOut[i][id]
      delete this.adjacencyListAll[i][id]
    }

    this.root.events.dispatch('removeNode', id)

    return this
  }

  public addEdge(edge: Edge): Graph {
    if (this.edgesIndex[edge.id]) {
      throw `Edge with id ${edge.id} already exists`
    }
    if (typeof edge.source === 'string') {
      edge.source = this.nodesIndex[edge.source]
    }
    if (typeof edge.target === 'string') {
      edge.target = this.nodesIndex[edge.target]
    }
    if (edge.id === undefined) {
      edge.id = nanoid()
    }

    this.edgesArray.push(edge)
    this.edgesIndex[edge.id] = edge

    if (!this.adjacencyListIn[edge.target.id][edge.source.id]) {
      this.adjacencyListIn[edge.target.id][edge.source.id] = {}
    }
    if (!this.adjacencyListOut[edge.source.id][edge.target.id]) {
      this.adjacencyListOut[edge.source.id][edge.target.id] = {}
    }
    if (!this.adjacencyListAll[edge.source.id][edge.target.id]) {
      this.adjacencyListAll[edge.source.id][edge.target.id] = {}
    }
    if (!this.adjacencyListAll[edge.target.id][edge.source.id]) {
      this.adjacencyListAll[edge.target.id][edge.source.id] = {}
    }

    this.adjacencyListIn[edge.target.id][edge.source.id][edge.id] = edge
    this.adjacencyListOut[edge.source.id][edge.target.id][edge.id] = edge
    this.adjacencyListAll[edge.target.id][edge.source.id][edge.id] = edge
    this.adjacencyListAll[edge.source.id][edge.target.id][edge.id] = edge

    this.root.events.dispatch('addEdge', edge)
    return this
  }

  public dropEdge(id: ID): Graph {
    if (!this.edgesIndex[id]) {
      throw `Edge with id ${id} doesn't exist`
    }

    const tmpEdge = this.edgesIndex[id]
    delete this.edgesIndex[id]
    this.edgesArray = this.edgesArray.filter(edge => edge.id !== id)

    delete this.adjacencyListIn[tmpEdge.target.id][tmpEdge.source.id][tmpEdge.id]
    if (Object.keys(this.adjacencyListIn[tmpEdge.target.id][tmpEdge.source.id]).length) {
      delete this.adjacencyListIn[tmpEdge.target.id][tmpEdge.source.id]
    }

    delete this.adjacencyListOut[tmpEdge.source.id][tmpEdge.target.id][tmpEdge.id]
    if (Object.keys(this.adjacencyListIn[tmpEdge.source.id][tmpEdge.target.id]).length) {
      delete this.adjacencyListIn[tmpEdge.source.id][tmpEdge.target.id]
    }

    delete this.adjacencyListAll[tmpEdge.target.id][tmpEdge.source.id][tmpEdge.id]
    if (Object.keys(this.adjacencyListAll[tmpEdge.target.id][tmpEdge.source.id]).length) {
      delete this.adjacencyListAll[tmpEdge.target.id][tmpEdge.source.id]
    }

    if (tmpEdge.source !== tmpEdge.target) {
      delete this.adjacencyListAll[tmpEdge.source.id][tmpEdge.target.id][tmpEdge.id]
      if (Object.keys(this.adjacencyListAll[tmpEdge.source.id][tmpEdge.target.id]).length) {
        delete this.adjacencyListAll[tmpEdge.source.id][tmpEdge.target.id]
      }
    }
    this.root.events.dispatch('removeEdge', tmpEdge)

    return this
  }

  public get nodesCount(): number {
    return this.nodesArray.length
  }

  public get edgesCount(): number {
    return this.edgesArray.length
  }

  public nodes(ids?: ID | ID[]): Node[] {
    if (!ids) {
      return this.nodesArray
    }

    if (isID(ids)) {
      return this.nodesIndex[ids]
    }

    if (isIDArray(ids)) {
      return ids.map(id => this.nodesIndex[id])
    }

    throw 'nodes: Wrong arguments.'
  }

  public edges(ids?: ID | ID[]): Edge[] {
    if (!ids) {
      return this.edgesArray
    }

    if (isID(ids)) {
      return this.edgesIndex[ids]
    }

    if (isIDArray(ids)) {
      return ids.map(id => this.edgesIndex[id])
    }

    throw 'edges: Wrong arguments.'
  }

  public getDegree(node: Node) {
    return Object.keys(this.adjacencyListAll[node.id]).length
  }

  public calcPaths(): Node[] {
    const nodes = this.nodesArray
    // Initiallize distance
    nodes.forEach(n1 => {
      n1.layoutProps.dist = {}
      nodes.forEach(n2 => {
        n1.layoutProps.dist[n2.id] = Infinity
      })
    })

    nodes.forEach(start => {
      const dist = start.layoutProps.dist
      dist[start.id] = 0
      const queue: Node[] = []
      // const queue = new PriorityQueue<Node>((n1, n2) => {
      //   return dist[n1.id] < dist[n2.id]
      // })
      nodes.forEach(node => {
        queue.push(node)
      })
      while (queue.length > 0) {
        let currentLength = Infinity
        let current = null
        let currentIndex = -1
        queue.forEach((n, index) => {
          if (dist[n.id] < currentLength) {
            currentIndex = index
          }
        })
        ;[queue[currentIndex], queue[queue.length - 1]] = [
          queue[queue.length - 1],
          queue[currentIndex],
        ]
        current = queue.pop()
        currentLength = dist[current.id]
        const adj = Object.keys(this.adjacencyListAll[current.id])
        adj.forEach(n => {
          if (dist[current.id] + 1 < dist[n]) {
            dist[n] = dist[current.id] + 1
          }
        })
      }
      nodes.forEach(n => {
        if (dist[n.id] === Infinity) debugger
      })
    })
    return nodes
  }
}
