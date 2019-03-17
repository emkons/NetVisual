import { h, Component } from "preact";
import { Graph } from "../../lib/Graphy/Graph";
import { NodeLinks } from "../../lib/Graphy/Examples/Renderers/NodeLinks";
import { Layout } from "../../lib/Graphy/Layout";
import { Renderer } from "../../lib/Graphy/Renderer";

interface CanvasProps {}

interface CanvasState {
  graph: Graph | null;
  renderer: Renderer | null;
  layout: Layout | null;
}

class Canvas extends Component<CanvasProps, CanvasState> {
  state: CanvasState = {
    graph: new Graph(),
    renderer: null,
    layout: null
  };
  render(props) {
    return (
      <canvas
        ref={canvas => (this.state.renderer = new NodeLinks(canvas, {}, {}))}
        id="mainCanvas"
        width="400"
        height="400"
      />
    );
  }

  componentDidMount(): void {}
}

export default Canvas;
