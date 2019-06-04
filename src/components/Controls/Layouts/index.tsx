import { h, Component } from 'preact'
import Layout from '../../../Graphy/classes/Layout'
import { graphy } from '../../../Graphy/Instance'
import Graph from '../../../Graphy/classes/Graph'

import * as style from './style.scss'

interface LayoutsState {
  selected: Layout
  running: boolean
}

interface LayoutsProps {}

export default class Layouts extends Component<LayoutsProps, LayoutsState> {
  state = {
    selected: null,
    running: false,
  }

  private algos: string[] = ['kamada', 'force-atlas', 'fruchterman', 'mds', 'isom']

  private selectedAlgo: string = 'kamada'
  private iterationCb = null
  private doneCb = null

  render(props: LayoutsProps, state: LayoutsState) {
    let startStopBtn = null
    if (!state.running) {
      startStopBtn = (
        <button class={style.start} onClick={this.startLayout.bind(this)}>
          Sākt
        </button>
      )
    } else {
      startStopBtn = (
        <button class={style.stop} onClick={this.stopLayout.bind(this)}>
          Beigt
        </button>
      )
    }

    let runtimeStats = null
    if (state.selected) {
      runtimeStats = (
        <div>
          <p>Init laiks: {state.selected.getInitRuntime().toFixed(2)}</p>
          <p>Kopējais laiks: {state.selected.getTotalRuntime().toFixed(2)}</p>
        </div>
      )
    }

    return (
      <div class={style.layouts}>
        <p>Izkārtošanas algoritmi</p>
        <select
          disabled={state.running}
          name="layout-algo"
          id="layout-algo"
          onChange={this.changeMethod.bind(this)}
        >
          {this.algos.map(algo => (
            <option value={algo} selected={algo === this.selectedAlgo}>
              {algo}
            </option>
          ))}
        </select>
        {startStopBtn}
        {runtimeStats}
      </div>
    )
  }

  changeMethod(event: Event) {
    this.selectedAlgo = event.target['value']
  }

  async startLayout() {
    switch (this.selectedAlgo) {
      case 'kamada':
        const kk = await import(
          /* webpackChunkName: 'layout' */
          '../../../Graphy/layout/KamadaKawai'
        )
        this.setState({
          selected: new kk.default(),
        })
        break
      case 'force-atlas':
        const fa = await import(
          /* webpackChunkName: 'layout' */
          '../../../Graphy/layout/ForceAtlas'
        )
        this.setState({
          selected: new fa.default(),
        })
        break
      case 'fruchterman':
        const fr = await import(
          /* webpackChunkName: 'layout' */
          '../../../Graphy/layout/FruchtermanReingold'
        )
        this.setState({
          selected: new fr.default(),
        })
        break
      case 'mds':
        const mds = await import(
          /* webpackChunkName: 'layout' */
          '../../../Graphy/layout/MDS'
        )
        this.setState({
          selected: new mds.default(),
        })
        break
      case 'isom':
        const isom = await import(
          /* webpackChunkName: 'layout' */
          '../../../Graphy/layout/ISOMv2'
        )
        this.setState({
          selected: new isom.default(),
        })
        break
    }
    if (this.state.selected) {
      this.state.selected.start(graphy.graph)
      this.setState({
        running: true,
      })
      this.iterationCb = this.state.selected.subscribe('iteration', (graph: Graph) => {
        graphy.events.dispatch('render', null)
      })
      this.doneCb = this.state.selected.subscribe('done', (graph: Graph) => {
        this.setState({
          running: false,
        })
      })
    }
  }

  stopLayout() {
    this.state.selected.stop()
  }
}
