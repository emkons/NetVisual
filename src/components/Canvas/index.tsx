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
    for (let i = 0; i < 10; i += 1) {
      g.nodes.push({
        id: 'n' + i,
        x: Math.random() * 1000,
        y: Math.random() * 800,
        color: '#666',
      })
    }
    for (let i = 0; i < 10; i += 1) {
      g.edges.push({
        id: 'e' + i,
        source: 'n' + ((Math.random() * 10) | 0),
        target: 'n' + ((Math.random() * 10) | 0),
        color: '#666',
      })
    }
    graphy.graph.parseGraph(g)
    graphy.renderer = new CanvasRenderer(graphy, { container: this.container }, graphy.graph)
    const fd = new ForceDirected()
    fd.subscribe('iteration', graph => {
      // console.log('increment', graph)
      graphy.events.dispatch('render', null)
    })
    fd.start(graphy.graph)
  }
}

export default Canvas
