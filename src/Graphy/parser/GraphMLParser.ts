import Parser from '../classes/Parser'
import { Node, ArbitraryData, Edge } from '../classes/Graph'
import Graphy from '../Graphy'

export class GraphMLParser extends Parser {
  protected parser: DOMParser
  constructor() {
    super()
    this.parser = new DOMParser()
  }
  parse(content: string, graphy: Graphy): void {
    const g = graphy.graph
    const xml: Document = this.parser.parseFromString(content, 'text/xml')
    const graph = xml.getElementsByTagName('graph')[0]
    const nodes = graph.getElementsByTagName('node')
    const edges = graph.getElementsByTagName('edge')

    // Clear existing graph
    g.clear()

    // Loop over nodes
    for (const node of nodes) {
      const attributes = node.getAttributeNames()
      const data: ArbitraryData = {}
      attributes.forEach(attr => {
        data[attr] = node.getAttribute(attr)
      })
      const n: Node = {
        data,
        id: data.id,
      }
      g.addNode(n)
    }

    // Loop over edges
    for (const edge of edges) {
      const attributes = edge.getAttributeNames()
      const data: ArbitraryData = {}
      attributes.forEach(attr => {
        data[attr] = edge.getAttribute(attr)
      })
      const e: Edge = {
        data,
        source: data.source,
        target: data.target,
        id: data.id,
      }
      g.addEdge(e)
    }
    graphy.events.dispatch('render', null)
  }
}
