import { h, Component } from 'preact'
import Expander from '../Expander'
import DataObjectInfo from '../DataObjectInfo'

import { graphy } from '../../../Graphy/Instance'
import ForceDirected from '../../../Graphy/layout/ForceDirected'

import * as style from './style.scss'

interface Props {}

interface State {}

export default class StatusBar extends Component<Props, State> {
  startForce() {
    const fd = new ForceDirected()
    fd.subscribe('iteration', graph => {
      // console.log('increment', graph)
      graphy.events.dispatch('render', null)
    })
    fd.start(graphy.graph)
  }
  render() {
    return (
      <div class={style.statusBar}>
        <Expander>
          <div class={style.nodeCount}>123</div>
          <button onClick={this.startForce}>Start Force</button>
        </Expander>
      </div>
    )
  }
}
