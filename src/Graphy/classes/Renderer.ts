import GraphyComponent from './Abstract'
import Settings from './Settings'
import Graph from './Graph'
import Graphy from '../Graphy'

export default abstract class Renderer extends GraphyComponent {
  public readonly namespace: string = 'graphy.renderer'
  protected graph: Graph

  constructor(root: Graphy, options: Object, graph: Graph) {
    super(root, options)
    this.graph = graph
    this.init(this.namespace)
  }

  protected initComponent() {}

  public abstract render(options?: Object): Renderer
}
