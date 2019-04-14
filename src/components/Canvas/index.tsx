import { h, Component } from 'preact'
import * as style from './style.scss'
import Graphy from '../../Graphy/Graphy'

interface CanvasProps {}

interface CanvasState {
  sigma: any
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
    const graphy = new Graphy({
      graphy: {
        graph: {
          key: {
            key2: 'value2',
          },
        },
      },
    })
    console.log(graphy.graph.test('key.key2'))
  }
}

export default Canvas
