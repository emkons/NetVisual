import { h, Component } from 'preact'
import * as style from './style.scss'
import StatusBar from '../StatusBar'

interface ControlsProps {}

interface ControlsState {}

export default class Controls extends Component<ControlsProps, ControlsState> {
  render() {
    return (
      <div class={style.controls}>
        <StatusBar />
      </div>
    )
  }
}
