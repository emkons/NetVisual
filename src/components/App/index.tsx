import { h, Component } from "preact";
import * as style from "./style.scss";

export interface AppProps {}

export interface AppState {}

class App extends Component<AppProps, AppState> {
  render(props) {
    return <p>Hello World!</p>;
  }
}

export default App;
