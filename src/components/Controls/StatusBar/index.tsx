import { h, Component } from 'preact'
import Expander from '../Expander'
import DataObjectInfo from '../DataObjectInfo'

import { graphy } from '../../../Graphy/Instance'

import * as style from './style.scss'

interface Props {}

interface State {}

export default class StatusBar extends Component<Props, State> {
  async startForceAtlas() {
    const fA = await import(
      /* webpackChunkName: 'layout' */
      '../../../Graphy/layout/KamadaKawai'
    )
    const fa = new fA.default()
    fa.subscribe('iteration', graph => {
      // console.log('increment', graph)
      graphy.events.dispatch('render', null)
    })
    fa.start(graphy.graph)
  }
  async startForceDirected() {
    const fD = await import(
      /* webpackChunkName: 'layout' */
      '../../../Graphy/layout/ForceDirected'
    )
    const fa = new fD.default()
    fa.subscribe('iteration', graph => {
      graphy.events.dispatch('render', null)
    })
    fa.start(graphy.graph)
  }
  async startFruchterman() {
    import(
      /* webpackChunkName: 'layout' */
      '../../../Graphy/layout/FruchtermanReingold'
    ).then(fR => {
      const fa = new fR.default()
      fa.subscribe('iteration', graph => {
        // console.log('increment', graph)
        graphy.events.dispatch('render', null)
      })
      fa.start(graphy.graph)
    })
  }
  render() {
    return (
      <div class={style.statusBar}>
        <Expander>
          <div class={style.nodeCount}>123</div>
          <button onClick={this.startForceAtlas}>Start KamadaKawai</button>
          <button onClick={this.startForceDirected}>Start ForceDirected</button>
          <button onClick={this.startFruchterman}>Start Fruchterman</button>
        </Expander>
      </div>
    )
  }
}
