import Graph from './classes/Graph'
import GraphyComponent, { IGraphyComponent } from './classes/Abstract'
import Settings from './classes/Settings'
import Renderer from './classes/Renderer'
import CanvasRenderer from './renderer/Canvas'

export default class Graphy implements IGraphyComponent {
  public readonly namespace: string = 'graphy'
  public settings: Settings
  public graph: Graph
  public renderer: Renderer

  public getOption: (key: string) => any
  public setOption: (key: string, value: any) => any

  constructor(options?: Object) {
    this.settings = new Settings(options)
    this.initOptions(this.namespace)
    // TODO: Separate passed options
    this.graph = new Graph(this, options)
    this.renderer = new CanvasRenderer(this, options, this.graph)
    this.renderer.setOption('key', 'value')
    console.log(this.settings.get('graphy'))
  }

  private initOptions(namespace: string) {
    this.getOption = this.settings.namespacedGetter(namespace)
    this.setOption = this.settings.namespacedSetter(namespace)
  }

  protected initComponent() {}
}
