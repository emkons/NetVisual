import { h, Component } from 'preact'
import { DataObject } from '../../../Graphy/classes/Graph'
import Importer from '../Importer'
import * as style from './style.scss'

import { graphy } from '../../../Graphy/Instance'

interface DataObjectInfoProps {}

interface DataObjectInfoState {
  activeObject: DataObject | null
}

export default class DataObjectInfo extends Component<DataObjectInfoProps, DataObjectInfoState> {
  state: DataObjectInfoState = {
    activeObject: null,
  }

  render(props: DataObjectInfoProps, state: DataObjectInfoState) {
    const visibility = this.state.activeObject ? 'visible' : 'hidden'

    let nodeContent = (
      <div>
        <h1>Nothing selected</h1>
      </div>
    )
    if (state.activeObject) {
      nodeContent = (
        <div>
          <h1>{this.state.activeObject.id}</h1>
          <p>Position X: {this.state.activeObject.x}</p>
          <p>Position Y: {this.state.activeObject.y}</p>
        </div>
      )
    }

    return (
      <div class={style.container}>
        <Importer />
        {nodeContent}
      </div>
    )
  }

  componentDidMount() {
    graphy.events.subscribe('nodeClick', (node: DataObject | null) => {
      this.setState({ activeObject: node })
    })
  }
}
