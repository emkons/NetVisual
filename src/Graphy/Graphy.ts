import Graph, { Node, Edge } from './classes/Graph'
import GraphyComponent, { IGraphyComponent } from './classes/Abstract'
import Settings from './classes/Settings'
import Renderer from './classes/Renderer'
import CanvasRenderer, { ICanvasRendererOptions } from './renderer/Canvas'
import Events from './classes/Events'
import Camera, { ICameraOptions } from './classes/Camera'

export interface IGraphyOptions {
  renderer?: ICanvasRendererOptions
  graph?: {
    nodes: Node[]
    edges: Edge[]
  }
  camera?: ICameraOptions
}
export default class Graphy implements IGraphyComponent {
  public readonly namespace: string = 'graphy'
  public settings: Settings
  public events: Events
  public graph: Graph
  public renderer: Renderer
  public camera: Camera

  public getOption: (key: string) => any
  public setOption: (key: string, value: any) => any

  constructor(options: IGraphyOptions) {
    this.settings = new Settings()
    this.initOptions(this.namespace)
    this.events = new Events()
    // TODO: Separate passed options
    this.camera = new Camera(this, options.camera)
    this.graph = new Graph(this, options.graph)
    if (options.renderer) {
      this.renderer = new CanvasRenderer(this, options.renderer, this.graph)
      this.renderer.render()
    }
  }

  private initOptions(namespace: string) {
    this.getOption = this.settings.namespacedGetter(namespace)
    this.setOption = this.settings.namespacedSetter(namespace)
  }

  protected initComponent() {}
}
