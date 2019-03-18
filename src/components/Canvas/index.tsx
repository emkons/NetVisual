import { h, Component } from "preact";
import { Graph } from "../../lib/Graphy/Graph";
import { NodeLinks } from "../../lib/Graphy/Examples/Renderers/NodeLinks";
import { Layout } from "../../lib/Graphy/Layout";
import { Renderer } from "../../lib/Graphy/Renderer";
import { ForceDirected } from "../../lib/Graphy/Examples/Layouts/ForceDirected";

interface CanvasProps {}

interface CanvasState {
  graph: Graph | null;
  renderer: Renderer | null;
}

class Canvas extends Component<CanvasProps, CanvasState> {
  state: CanvasState = {
    graph: new Graph(),
    renderer: null
  };
  layout: Layout;
  render(props) {
    return (
      <canvas
        ref={canvas =>
          (this.state.renderer = new NodeLinks(
            canvas,
            {},
            { layout: this.layout }
          ))
        }
        id="mainCanvas"
        width="400"
        height="400"
      />
    );
  }

  componentDidMount(): void {
    this.state.graph.newNode({ name: "hello" });
    this.state.graph.newNode({ name: "hello2" });
    this.state.graph.newNode({ name: "hello3" });
    this.state.graph.newNode({ name: "hello4" });
    this.layout = new ForceDirected(this.state.graph, {
      repulsion: 5000,
      damping: 0.05,
      stiffness: 5000
    });
    this.state.renderer.setLayout(this.layout);
    this.layout.generate(this.state.renderer.setNodePoints);
  }
}

export default Canvas;
