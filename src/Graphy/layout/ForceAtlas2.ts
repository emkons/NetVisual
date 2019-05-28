import Layout from '../classes/Layout'
import { ILayout } from '../classes/ILayout'
import Graph from '../classes/Graph'

export default class ForceAtlas2 extends Layout implements ILayout {
  public incremental: boolean = true

  public process(graph: Graph) {
    const nodes = graph.nodes()
    const edges = graph.edges()
  }

  protected init(graph: Graph) {
    super.init(graph)
    graph.nodes().forEach(node => {
      if (!node.layoutProps) {
        node.layoutProps = {}
      }
      node.layoutProps.mass = graph.getDegree(node)
      node.layoutProps.oldDx = 0
      node.layoutProps.oldDy = 0
      node.layoutProps.dx = 0
      node.layoutProps.dy = 0
    })
  }

  protected shouldContinue(graph: Graph): boolean {
    return false
  }
}
