import { Node } from './Graph'
import GraphyComponent from './Abstract'
import Graphy from '../Graphy'

interface ICameraCoords {
  x: number
  y: number
  zoom?: number
}

export interface INodeCamProps {
  x: number
  y: number
  size: number
}

export interface ICameraOptions {
  x?: number
  y?: number
  zoom?: number
}

export default class Camera extends GraphyComponent {
  public x: number = 0
  public y: number = 0
  public zoom: number = 2

  public readonly namespace = 'graphy.camera'

  private dragStart: {
    x: number
    y: number,
  }

  constructor(root: Graphy, options?: ICameraOptions) {
    super(root, options)
    this.init(this.namespace, options)
  }

  public initComponent() {
    this.root.events.subscribe('scroll', (event: WheelEvent) => {
      this.x -= event.clientX / this.zoom
      this.y -= event.clientY / this.zoom
      this.zoom -= event.deltaY / 1000
      this.zoom = Math.max(this.zoom, 0.1)
      this.x += event.clientX / this.zoom
      this.y += event.clientY / this.zoom
      this.zoom = Math.max(0.1, this.zoom)
      this.root.events.dispatch('render', null)
    })

    this.root.events.subscribe('dragStart', (event: MouseEvent) => {
      this.dragStart = {
        x: event.clientX,
        y: event.clientY,
      }
    })
    this.root.events.subscribe('drag', (event: MouseEvent) => {
      if (this.dragStart) {
        this.x += (event.clientX - this.dragStart.x) / this.zoom
        this.y += (event.clientY - this.dragStart.y) / this.zoom
        this.dragStart = {
          x: event.clientX,
          y: event.clientY,
        }
        this.root.events.dispatch('render', null)
      }
    })
    this.root.events.subscribe('dragEnd', (event: MouseEvent) => {
      this.dragStart = null
    })
  }

  public goTo(coords: ICameraCoords) {
    this.x = coords.x
    this.y = coords.y
    if (coords.zoom) {
      this.zoom = coords.zoom
    }
  }

  public getNodeCoords(nodes: Node[]): Node[] {
    return nodes.map(node => {
      if (!node.camProps) {
        node.camProps = { x: 0, y: 0, size: 0 }
      }
      node.camProps.x = (node.x + this.x) * this.zoom
      node.camProps.y = (node.y + this.y) * this.zoom
      node.camProps.size = (node.size || this.getOption('defaultNodeSize')) * this.zoom
      return node
    })
  }
}
