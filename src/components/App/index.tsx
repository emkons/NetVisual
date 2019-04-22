import { h, Component } from 'preact'
import Canvas from '../Canvas'
import Controls from '../Controls'

export interface AppProps {}

export interface AppState {}

class App extends Component<AppProps, AppState> {
  render(props) {
    return (
      <div>
        <Canvas />
        <Controls />
      </div>
    )
  }
}

export default App
