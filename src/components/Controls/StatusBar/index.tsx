import { h, Component } from 'preact'
import Expander from '../Expander'
import DataObjectInfo from '../DataObjectInfo'

import * as style from './style.scss'

interface Props {}

interface State {}

export default class StatusBar extends Component<Props, State> {
  render() {
    return (
      <div class={style.statusBar}>
        <Expander>
          <DataObjectInfo />
          <div class={style.nodeCount}>123</div>
        </Expander>
      </div>
    )
  }
}
