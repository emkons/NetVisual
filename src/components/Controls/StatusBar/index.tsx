import { h, Component } from 'preact'
import Expander from '../Expander'
import DataObjectInfo from '../DataObjectInfo'

import { graphy } from '../../../Graphy/Instance'

import * as style from './style.scss'
import Layout from '../../../Graphy/classes/Layout'
import { getEdgeCrossings, calculateEdgeLengthStats } from '../../../Graphy/util'

interface Props {}

interface State {
  nodeCount: number
  edgeCount: number
  edgeCrossings: number
  edgeStats: {
    mean: number
    stdev: number
  }
}

export default class StatusBar extends Component<Props, State> {
  state = {
    nodeCount: 0,
    edgeCount: 0,
    edgeCrossings: 0,
    edgeStats: {
      mean: 0,
      stdev: 0,
    },
  }

  render() {
    return (
      <div class={style.statusBar}>
        <Expander>
          <p>Mezgli: {this.state.nodeCount}</p>
          <p>Malas: {this.state.edgeCount}</p>
          <p>Malu krustošanās: {this.state.edgeCrossings} </p>
          <p>Malu vidējais garums: {this.state.edgeStats.mean.toFixed(2)}</p>
          <p>Malu standartnovirze: {this.state.edgeStats.stdev.toFixed(2)}</p>
          <button onClick={this.calculateStats.bind(this)}>Aprēķināt</button>
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

  calculateStats() {
    const stats = calculateEdgeLengthStats(graphy.graph)
    this.setState({
      edgeCrossings: getEdgeCrossings(graphy.graph),
      edgeStats: stats,
    })
  }

  private updateNodeEdgeCount() {
    this.setState({
      nodeCount: graphy.graph.nodesCount,
      edgeCount: graphy.graph.edgesCount,
    })
  }
}
