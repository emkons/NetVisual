import Settings from '../classes/Settings'
import Graph, { Node, Edge } from '../classes/Graph'
import Renderer from '../classes/Renderer'
import Graphy from '../Graphy'
import { isCanvas } from '../util'

export interface IContexts {
  [key: string]: CanvasRenderingContext2D
}

export default class CanvasRenderer extends Renderer {
  public readonly namespace: string = 'graphy.renderer.canvas'

  protected nodes: Node[]
  protected edges: Edge[]

  protected container: HTMLElement
  protected domElements: HTMLElement[] = []
  protected contexts: IContexts = {}

  protected width: number
  protected height: number

  constructor(root: Graphy, options: Object, graph: Graph) {
    super(root, options, graph)
    this.init(this.namespace)
  }

  protected initComponent() {
    this.initDOM('canvas', 'scene')
    this.contexts.edges = this.contexts.scene
    this.contexts.nodes = this.contexts.scene
    this.contexts.labels = this.contexts.scene

    // TODO: Implement mouse canvas

    this.resize()
  }

  protected initDOM(tag: string, id: string) {
    const el = document.createElement(tag)
    el.style.position = 'absolute'
    el.className = 'graphy-' + id
    this.container.appendChild(el)
    if (isCanvas(el)) {
      this.contexts[id] = el.getContext('2d')
    }
  }

  public resize(w?: number, h?: number) {
    const oldWidth = this.width
    const oldHeigth = this.height
    if (w !== undefined && h !== undefined) {
      this.width = w
      this.height = h
    } else {
      this.width = this.container.offsetWidth
      this.height = this.container.offsetHeight
    }

    if (oldWidth !== this.width || oldHeigth !== this.height) {
      this.domElements.forEach(el => {
        el.style.width = this.width + 'px'
        el.style.width = this.width + 'px'
        if (isCanvas(el)) {
          el.width = this.width
          el.height = this.height
        }
      })
    }
  }

  public render(options: Object = {}) {
    const graph = this.graph
    const nodes = graph.nodes
    const drawNodes = this.getOption('drawNodes')

    this.resize()

    this.clear()

    if (drawNodes) {
      const renderers = this.settings.get('graphy.renderer.canvas.nodes')
      const defaultRenderer = this.getOption('nodes.default')
      const nodeRenderers = Object.keys(renderers).filter(
        key => renderers[key] && renderers[key]['type'],
      )
    }

    return this
  }

  protected clear() {
    Object.values(this.contexts).forEach(c => {
      c.clearRect(0, 0, this.width, this.height)
    })
  }
}
