import { h, Component } from 'preact'
import * as style from './style.scss'
import { graphy } from '../../Graphy/Instance'
import { Edge, Node } from '../../Graphy/classes/Graph'
import ForceDirected from '../../Graphy/layout/ForceDirected'
import CanvasRenderer from '../../Graphy/renderer/Canvas'

interface CanvasProps {}

interface CanvasState {
  sigma: any
}

class Canvas extends Component<CanvasProps, CanvasState> {
  state: CanvasState = {
    sigma: null,
  }
  container: HTMLElement
  render() {
    return (
      <div
        ref={container => (this.container = container)}
        class={`${style.container}`}
        id="main-container"
      />
    )
  }

  componentDidMount(): void {
    const g = {
      nodes: [],
      edges: [],
    }
    let edgeCount: number = 0
    for (let i = 0; i < 10; i += 1) {
      g.nodes.push({
        id: 'n' + i,
        x: Math.random() * 1000,
        y: Math.random() * 800,
        color: '#666',
      })
      for (let j = 0; j < Math.ceil(Math.random() * 2); j += 1) {
        g.edges.push({
          id: 'e' + edgeCount,
          source: 'n' + i,
          target: 'n' + ((Math.random() * i) | 0),
          color: '#666',
        })
        edgeCount += 1
      }
    }
    graphy.graph.clear()
    graphy.graph.parseGraph(g)
    graphy.renderer = new CanvasRenderer(graphy, { container: this.container }, graphy.graph)
    graphy.events.dispatch('render', null)
  }
}

export default Canvas
