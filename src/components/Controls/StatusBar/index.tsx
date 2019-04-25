import { h, Component } from 'preact'
import Expander from '../Expander'
import DataObjectInfo from '../DataObjectInfo'

import { graphy } from '../../../Graphy/Instance'
import ForceDirected from '../../../Graphy/layout/ForceDirected'

import * as style from './style.scss'
import FruchtermanReingold from '../../../Graphy/layout/FruchtermanReingold'
import ForceAtlas from '../../../Graphy/layout/ForceAtlas'

interface Props {}

interface State {}

export default class StatusBar extends Component<Props, State> {
  startForceAtlas() {
    const fa = new ForceAtlas()
    fa.subscribe('iteration', graph => {
      // console.log('increment', graph)
      graphy.events.dispatch('render', null)
    })
    fa.start(graphy.graph)
  }
  startForceDirected() {
    const fa = new ForceDirected()
    fa.subscribe('iteration', graph => {
      graphy.events.dispatch('render', null)
    })
    fa.start(graphy.graph)
  }
  startFruchterman() {
    const fa = new FruchtermanReingold()
    fa.subscribe('iteration', graph => {
      // console.log('increment', graph)
      graphy.events.dispatch('render', null)
    })
    fa.start(graphy.graph)
  }
  render() {
    return (
      <div class={style.statusBar}>
        <Expander>
          <div class={style.nodeCount}>123</div>
          <button onClick={this.startForceAtlas}>Start ForceAtlas</button>
          <button onClick={this.startForceDirected}>Start ForceDirected</button>
          <button onClick={this.startFruchterman}>Start Fruchterman</button>
        </Expander>
      </div>
    )
  }
}
