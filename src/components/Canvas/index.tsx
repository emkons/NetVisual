import { h, Component } from 'preact'
import { sigma } from 'sigma'
import * as style from './style.scss'

interface CanvasProps {}

interface CanvasState {
  sigma: SigmaJs.Sigma
}

class Canvas extends Component<CanvasProps, CanvasState> {
  state: CanvasState = {
    sigma: null,
  }
  canvas: Canvas
  render() {
    return <div class={`${style.container}`} id="main-container" />
  }

  componentDidMount(): void {
    const N = 100
    const E = 500
    const graph = {
      nodes: [],
      edges: [],
    }
    // Generate a random graph:
    for (let i = 0; i < N; i += 1) {
      graph.nodes.push({
        id: 'n' + i,
        label: 'Node ' + i,
        x: Math.random(),
        y: Math.random(),
        size: Math.random(),
        color: '#666',
      })
    }
    for (let i = 0; i < E; i += 1) {
      graph.edges.push({
        id: 'e' + i,
        source: 'n' + ((Math.random() * N) | 0),
        target: 'n' + ((Math.random() * N) | 0),
        size: Math.random(),
        color: '#ccc',
      })
    }
    this.state.sigma = new sigma({
      graph,
      container: 'main-container',
    })
    console.log(this.state.sigma)
  }
}

export default Canvas
