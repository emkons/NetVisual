import Settings from '../classes/Settings'
import Graph, { Node, Edge } from '../classes/Graph'
import Renderer from '../classes/Renderer'
import Graphy from '../Graphy'
import { isCanvas } from '../util'
import CanvasNodes, { ICanvasNodeRenderer } from './Canvas/CanvasNodes'
import { IOptions } from '../classes/Abstract'

export interface IContexts {
  [key: string]: CanvasRenderingContext2D
}

export interface ICanvasNodeRenderers {
  [type: string]: ICanvasNodeRenderer
}

export interface ICanvasRendererOptions {
  container: HTMLElement
}

export default class CanvasRenderer extends Renderer {
  public readonly namespace: string = 'graphy.renderer.canvas'

  protected nodes: Node[]
  protected edges: Edge[]

  protected container: HTMLElement
  protected domElements: HTMLElement[] = []
  protected contexts: IContexts = {}

  protected nodeRenderers: ICanvasNodeRenderers = {}

  protected width: number
  protected height: number

  constructor(root: Graphy, options: ICanvasRendererOptions, graph: Graph) {
    super(root, options, graph)
    this.init(this.namespace, options)
  }

  protected initComponent(options?: IOptions) {
    if (!options || !(options.container instanceof HTMLElement)) {
      throw 'Container not found.'
    }
    this.render = this.render.bind(this)
    this.root.events.subscribe('render', this.render)
    this.container = options.container
    this.initDOM('canvas', 'scene')
    this.contexts.edges = this.contexts.scene
    this.contexts.nodes = this.contexts.scene
    this.contexts.labels = this.contexts.scene

    // Register default renderers
    this.registerNodeRenderer('default', new CanvasNodes())

    // TODO: Implement mouse canvas
    this.addEventListeners()

    this.resize()
  }

  protected initDOM(tag: string, id: string) {
    const el = document.createElement(tag)
    el.style.position = 'absolute'
    el.className = 'graphy-' + id
    this.container.appendChild(el)
    this.domElements.push(el)
    if (isCanvas(el)) {
      this.contexts[id] = el.getContext('2d')
    }
  }

  private addEventListeners() {
    this.domElements.forEach(el => {
      if (isCanvas(el)) {
        el.addEventListener('wheel', event => {
          this.root.events.dispatch('scroll', event)
        })
        el.addEventListener('mousedown', event => {
          // TODO: Recognize hovered nodes
          this.root.events.dispatch('dragStart', event)
        })
        el.addEventListener('mouseup', event => {
          this.root.events.dispatch('dragEnd', event)
        })
        el.addEventListener('mousemove', event => {
          this.root.events.dispatch('drag', event)
        })
      }
    })
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
        console.log('resized', this.width, this.height)
      })
    }
  }

  public render(options: Object = {}) {
    const graph = this.graph
    const nodes = this.root.camera.getNodeCoords(graph.nodes())
    const drawNodes = this.getOption('drawNodes')

    this.resize()

    this.clear()

    // if (drawNodes) {
    Object.values(nodes).forEach(node => {
      if (node.type && this.nodeRenderers[node.type]) {
        this.nodeRenderers[node.type].render(node, this.contexts.nodes, this.getOption)
      } else {
        this.nodeRenderers.default.render(node, this.contexts.nodes, this.getOption)
      }
    })
    // }

    return this
  }

  protected clear() {
    Object.values(this.contexts).forEach(c => {
      c.clearRect(0, 0, this.width, this.height)
    })
  }

  public registerNodeRenderer(name: string, renderer: ICanvasNodeRenderer) {
    // TODO: Make async loading?
    this.nodeRenderers[name] = renderer
  }
}
