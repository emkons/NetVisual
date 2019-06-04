import { h, Component } from 'preact'
import { graphy } from '../../../Graphy/Instance'
import * as style from './style.scss'

export default class AddEdge extends Component {
  render() {
    return (
      <div>
        <p>Pievienot:</p>
        <button class={style.addBtn} onClick={this.addEdge}>
          Malu
        </button>
        <button class={style.addBtn} onClick={this.addNode}>
          Mezglu
        </button>
      </div>
    )
  }

  addEdge() {
    graphy.events.dispatch('startEdgeAdd', null)
  }

  addNode() {
    // graphy.events.dispatch('startNodeAdd', null)
    const node = {
      id: 'generated' + Math.floor(Math.random() * 1000),
      x: Math.random() * 1000,
      y: Math.random() * 800,
    }
    graphy.graph.addNode(node)
    graphy.events.dispatch('nodeClick', node)
    graphy.events.dispatch('render', node)
  }
}
