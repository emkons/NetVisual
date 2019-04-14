import Graph from './classes/Graph'
import { IGraphyComponent } from './classes/Abstract'
import Settings from './classes/Settings'

export default class Graphy implements IGraphyComponent {
  public readonly namespace = 'graphy'
  private settings: Settings
  public graph: Graph

  constructor(options?: Object) {
    this.settings = new Settings(options)
    // TODO: Separate passed
    this.graph = new Graph(this.settings, options)
  }
}
