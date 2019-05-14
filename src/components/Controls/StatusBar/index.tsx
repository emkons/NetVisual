import { h, Component } from 'preact'
import Expander from '../Expander'
import DataObjectInfo from '../DataObjectInfo'

import { graphy } from '../../../Graphy/Instance'

import * as style from './style.scss'
import Layout from '../../../Graphy/classes/Layout'

interface Props {}

interface State {
  nodeCount: number
  edgeCount: number
}

export default class StatusBar extends Component<Props, State> {
  state = {
    nodeCount: 0,
    edgeCount: 0,
  }
  private algos: string[] = ['kamada', 'force-atlas', 'force-directed', 'fruchterman', 'mds']
  private selectedAlgo: string = 'kamada'
  private algo: Layout
  private iterationCb: string = null

  changeMethod(event: Event) {
    this.selectedAlgo = event.target['value']
  }

  async startLayout() {
    this.stopLayout()
    switch (this.selectedAlgo) {
      case 'kamada':
        const kk = await import(
          /* webpackChunkName: 'layout' */
          '../../../Graphy/layout/KamadaKawai'
        )
        this.algo = new kk.default()
        break
      case 'force-atlas':
        const fa = await import(
          /* webpackChunkName: 'layout' */
          '../../../Graphy/layout/ForceAtlas'
        )
        this.algo = new fa.default()
        break
      case 'force-directed':
        const fd = await import(
          /* webpackChunkName: 'layout' */
          '../../../Graphy/layout/ForceDirected'
        )
        this.algo = new fd.default()
        break
      case 'fruchterman':
        const fr = await import(
          /* webpackChunkName: 'layout' */
          '../../../Graphy/layout/FruchtermanReingold'
        )
        this.algo = new fr.default()
        break
      case 'mds':
        const mds = await import(
          /* webpackChunkName: 'layout' */
          '../../../Graphy/layout/MDS'
        )
        this.algo = new mds.default()
        break
    }
    if (this.algo) {
      this.algo.start(graphy.graph)
    }
    this.iterationCb = this.algo.subscribe('iteration', graph => {
      graphy.events.dispatch('render', null)
    })
  }
  stopLayout() {
    if (this.algo) {
      this.algo.stop()
    }
    if (this.iterationCb) {
      this.algo.unsub('iteration', this.iterationCb)
      this.iterationCb = null
    }
  }

  render() {
    return (
      <div class={style.statusBar}>
        <Expander>
          <div class={style.nodeCount}>Mezgli: {this.state.nodeCount}</div>
          <div class={style.nodeCount}>Malas: {this.state.edgeCount}</div>
          <select name="layout-algo" id="layout-algo" onChange={this.changeMethod.bind(this)}>
            {this.algos.map(algo => (
              <option value={algo} selected={algo === this.selectedAlgo}>
                {algo}
              </option>
            ))}
          </select>
          <button onClick={this.startLayout.bind(this)}>Start Layout</button>
          <button onClick={this.stopLayout.bind(this)}>Stop Layout</button>
        </Expander>
      </div>
    )
  }

  componentDidMount() {
    this.updateNodeEdgeCount()
    graphy.events.subscribe('addNode', () => {
      this.updateNodeEdgeCount()
    })
    graphy.events.subscribe('removeNode', () => {
      this.updateNodeEdgeCount()
    })
    graphy.events.subscribe('addEdge', () => {
      this.updateNodeEdgeCount()
    })
    graphy.events.subscribe('removeNode', () => {
      this.updateNodeEdgeCount()
    })
  }

  private updateNodeEdgeCount() {
    this.setState({
      nodeCount: graphy.graph.nodesCount,
      edgeCount: graphy.graph.edgesCount,
    })
  }
}
