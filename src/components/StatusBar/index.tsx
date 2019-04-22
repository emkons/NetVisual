import { h, Component } from 'preact'
import * as style from './style.scss'

interface StatusBarProps {}

interface StatusBarState {}

export default class StatusBar extends Component<StatusBarProps, StatusBarState> {
  render() {
    return (
      <div class={style.statusBar}>
        <div class={style.nodeCount}>123</div>
      </div>
    )
  }
}
