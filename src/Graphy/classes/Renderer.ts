import GraphyComponent, { IOptions } from './Abstract'
import Settings from './Settings'
import Graph from './Graph'
import Graphy from '../Graphy'

export default abstract class Renderer extends GraphyComponent {
  public readonly namespace: string = 'graphy.renderer'
  protected graph: Graph

  constructor(root: Graphy, options: IOptions, graph: Graph) {
    super(root, options)
    this.graph = graph
  }

  protected initComponent() {}

  public abstract render(options?: IOptions): Renderer
}
