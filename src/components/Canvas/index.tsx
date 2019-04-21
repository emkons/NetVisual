import { h, Component } from 'preact'
import * as style from './style.scss'
import Graphy from '../../Graphy/Graphy'
import { Edge, Node } from '../../Graphy/classes/Graph'

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

    const graphy = new Graphy({
      renderer: {
        container: this.container,
      },
      graph: g,
    })
  }
}

export default Canvas
