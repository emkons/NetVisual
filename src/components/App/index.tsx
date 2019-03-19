import { h, Component } from "preact";
import Canvas from "../Canvas";

export interface AppProps {}

export interface AppState {}

class App extends Component<AppProps, AppState> {
  render(props) {
    return (
      <div>
        <p>Hello World!</p>
        <Canvas />
      </div>
    );
  }
}

export default App;
