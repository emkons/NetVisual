import { h, Component } from 'preact'
import * as style from './style.scss'
import StatusBar from './StatusBar'
import ZoomButtons from './ZoomButtons'
import DataObjectInfo from './DataObjectInfo'

interface ControlsProps {}

interface ControlsState {}

export default class Controls extends Component<ControlsProps, ControlsState> {
  render() {
    return (
      <div class={style.controls}>
        <DataObjectInfo />
        <ZoomButtons />
        <StatusBar />
      </div>
    )
  }
}
