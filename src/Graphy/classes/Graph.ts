import { ID, isID, isIDArray } from '../util'
import GraphyComponent, { IOptions } from './Abstract'
import Settings from './Settings'
import Graphy from '../Graphy'

export interface DataObject {
  id: ID
  color?: string
  x?: number
  y?: number
  size?: number
}

export interface Node extends DataObject {}
export interface Edge extends DataObject {
  source: Node
  target: Node
}

interface AdjacencyList {
  [sourceId: string]: {
    [targetId: string]: {
      [edgeId: string]: Edge,
    },
  }
}

export default class Graph extends GraphyComponent {
  private nodesArray: Node[] = []
  private edgesArray: Edge[] = []

  public readonly namespace = 'graphy.graph'

  constructor(root: Graphy, options?: IOptions) {
    super(root, options)
    this.init(this.namespace)
    if (options && options.nodes) {
      options.nodes.forEach(node => {
        this.addNode(node)
      })
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

    this.adjacencyListIn[node.id] = {}
    this.adjacencyListOut[node.id] = {}
    this.adjacencyListAll[node.id] = {}

    this.nodesArray.push(node)
    this.nodesIndex[node.id] = node

    return this
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

    return this
  }

  public addEdge(edge: Edge): Graph {
    if (this.edgesIndex[edge.id]) {
      throw `Edge with id ${edge.id} already exists`
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

    return this
  }

  public nodes(ids?: ID | ID[]): Node | Node[] {
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

  public edges(ids?: ID | ID[]): Edge | Edge[] {
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

  public test(key: string): any {
    return this.getOption(key)
  }
}
