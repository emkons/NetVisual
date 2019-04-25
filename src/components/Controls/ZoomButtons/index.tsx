import { h, Component } from 'preact'
import * as style from './style.scss'

import { graphy } from '../../../Graphy/Instance'

interface ZoomButtonsProps {}

interface ZoomButtonsState {
  zoom: number
}

export default class ZoomButtons extends Component<ZoomButtonsProps, ZoomButtonsState> {
  state = {
    zoom: 1,
  }
  protected zoomIn() {
    graphy.events.dispatch('scroll', {
      deltaY: -100,
    })
  }

  protected zoomOut() {
    graphy.events.dispatch('scroll', {
      deltaY: 100,
    })
  }

  render(props: ZoomButtonsProps, state: ZoomButtonsState) {
    return (
      <div class={style.container}>
        <button onClick={this.zoomIn} class={style.zoomBtn}>
          +
        </button>
        <button onClick={this.zoomOut} class={style.zoomBtn}>
          -
        </button>
        <span>Zoom {state.zoom.toFixed(1)}x</span>
      </div>
    )
  }

  componentDidMount() {
    graphy.events.subscribe('zoomChanged', (zoom: number) => {
      console.log('Zoom ', zoom)
      this.setState({ zoom })
    })
  }
}
