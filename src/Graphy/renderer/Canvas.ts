import Settings from '../classes/Settings'
import Graph, { Node, Edge } from '../classes/Graph'
import Renderer from '../classes/Renderer'
import Graphy from '../Graphy'
import { isCanvas } from '../util'
import CanvasNodes, { ICanvasNodeRenderer } from './Canvas/CanvasNodes'
import { IOptions } from '../classes/Abstract'
import CanvasEdges, { ICanvasEdgeRenderer } from './Canvas/CanvasEdges'

export interface IContexts {
  [key: string]: CanvasRenderingContext2D
}

export interface ICanvasNodeRenderers {
  [type: string]: ICanvasNodeRenderer
}

export interface ICanvasEdgeRenderers {
  [type: string]: ICanvasEdgeRenderer
}

export interface ICanvasRendererOptions {
  container: HTMLElement
}

export default class CanvasRenderer extends Renderer {
  public readonly namespace: string = 'graphy.renderer.canvas'

  protected queuedRender = false

  protected container: HTMLElement
  protected domElements: HTMLElement[] = []
  protected contexts: IContexts = {}

  protected nodeRenderers: ICanvasNodeRenderers = {}
  protected edgeRenderers: ICanvasEdgeRenderers = {}

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
    this.queueRender = this.queueRender.bind(this)
    this.root.events.subscribe('render', this.queueRender)
    this.container = options.container
    this.initDOM('canvas', 'scene')
    this.contexts.edges = this.contexts.scene
    this.contexts.nodes = this.contexts.scene
    this.contexts.labels = this.contexts.scene

    // Register default renderers
    this.registerNodeRenderer('default', new CanvasNodes())
    this.registerEdgeRenderer('default', new CanvasEdges())

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

  private queueRender() {
    if (!this.queuedRender) {
      this.queuedRender = true
      requestAnimationFrame(this.render)
    }
  }

  private addEventListeners() {
    this.domElements.forEach(el => {
      if (isCanvas(el)) {
        let hoverNodes: Node[] = []
        const handleMove = event => {
          const newHoverNodes = this.graph.nodes().filter(node => {
            const dX = node.camProps.x - event.clientX
            const dY = node.camProps.y - event.clientY
            const size = node.camProps.size
            return dX * dX + dY * dY < size * size
          })
          newHoverNodes.forEach(node => {
            node.camProps.hover = true
            this.root.events.dispatch('hoverNode', node)
          })
          hoverNodes
            .filter(node => newHoverNodes.indexOf(node) === -1)
            .forEach(node => {
              node.camProps.hover = false
              this.root.events.dispatch('hoverNodeEnd', node)
            })
          hoverNodes = newHoverNodes
        }
        el.addEventListener('click', event => {
          if (hoverNodes.length) {
            this.root.events.dispatch('nodeClick', hoverNodes[0])
          } else {
            this.root.events.dispatch('nodeClick', null)
          }
        })
        el.addEventListener('wheel', event => {
          event.preventDefault()
          this.root.events.dispatch('scroll', event)
        })
        el.addEventListener('mousedown', event => {
          // TODO: Recognize hovered nodes
          this.root.events.dispatch('dragStart', event)
        })
        el.addEventListener('touchstart', event => {
          console.log(event)
          // TODO: Recognize hovered nodes
          if (event.touches.length === 1) {
            event.preventDefault()
            this.root.events.dispatch('dragStart', event.touches[0])
          }
        })
        el.addEventListener('mousemove', event => {
          handleMove(event)
          this.root.events.dispatch('drag', event)
        })
        el.addEventListener('touchmove', event => {
          if (event.touches.length === 1) {
            event.preventDefault()
            handleMove(event)
            this.root.events.dispatch('drag', event.touches[0])
          }
        })
        el.addEventListener('mouseup', event => {
          this.root.events.dispatch('dragEnd', event)
        })
        el.addEventListener('touchend', event => {
          if (event.touches.length === 1) {
            event.preventDefault()
            this.root.events.dispatch('dragEnd', event.touches[0])
          }
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
    const edges = graph.edges()

    this.resize()

    this.clear()

    Object.values(edges).forEach(edge => {
      if (edge.type && this.edgeRenderers[edge.type]) {
        this.edgeRenderers[edge.type].render(edge, this.contexts.edges, this.getOption)
      } else {
        this.edgeRenderers.default.render(edge, this.contexts.edges, this.getOption)
      }
    })

    // if (drawNodes) {
    Object.values(nodes).forEach(node => {
      if (node.type && this.nodeRenderers[node.type]) {
        this.nodeRenderers[node.type].render(node, this.contexts.nodes, this.getOption)
      } else {
        this.nodeRenderers.default.render(node, this.contexts.nodes, this.getOption)
      }
    })
    // }

    this.queuedRender = false

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

  public registerEdgeRenderer(name: string, renderer: ICanvasEdgeRenderer) {
    // TODO: Make async loading?
    this.edgeRenderers[name] = renderer
  }
}
