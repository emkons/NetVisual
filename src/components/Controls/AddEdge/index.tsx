import { h, Component } from 'preact'
import { graphy } from '../../../Graphy/Instance'

export default class AddEdge extends Component {
  render() {
    return (
      <div>
        <button onClick={this.addEdge}>Add Edge</button>
        <button onClick={this.addNode}>Add Node</button>
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
