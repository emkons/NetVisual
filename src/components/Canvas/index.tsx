import { h, Component } from 'preact';
import { Graph } from '../../lib/Graphy/Graph';
import { NodeLinks } from '../../lib/Graphy/Examples/Renderers/NodeLinks';
import { Layout } from '../../lib/Graphy/Layout';
import { Renderer } from '../../lib/Graphy/Renderer';
import { ForceDirected } from '../../lib/Graphy/Examples/Layouts/ForceDirected';

import * as style from './style.scss';
import { Square } from '../../lib/Graphy/Abstract/Renderers/NodeLink/NodeRenderer/Shapes/Square';
import { Node } from '../../lib/Graphy/Node';

interface CanvasProps {}

interface CanvasState {
  graph: Graph | null;
  renderer: Renderer | null;
}

class Canvas extends Component<CanvasProps, CanvasState> {
  state: CanvasState = {
    graph: new Graph(),
    renderer: null,
  };
  layout: Layout;
  render(props) {
    return (
      <canvas
        ref={canvas =>
          (this.state.renderer = new NodeLinks(
            canvas,
            { fillStyle: 'rgba(255,0,0,0.3)' },
            { layout: this.layout },
          ))
        }
        class={`${style.canvas}`}
        id="mainCanvas"
        width="400"
        height="400"
      />
    );
  }

  componentDidMount(): void {
    const nodes: Node[] = [];
    for (let i = 0; i < 10; i++) {
      nodes.push(this.state.graph.newNode({}));
      if (i !== 0) {
        this.state.graph.newEdge(
          nodes[i],
          nodes[Math.floor(Math.random() * (nodes.length - 1))],
          {},
        );
      }
    }
    // for (let i = 0; i < 15; i++) {
    //   this.state.graph.newEdge(
    //     nodes[Math.floor(Math.random() * nodes.length)],
    //     nodes[Math.floor(Math.random() * nodes.length)],
    //     {},
    //   );
    // }
    // this.state.graph.newEdge(node1, node2, {});
    // this.state.graph.newEdge(node2, node3, {});
    // this.state.graph.newEdge(node1, node4, {});
    // this.state.graph.newEdge(node3, node4, {});
    this.layout = new ForceDirected(this.state.graph, {
      repulsion: 400,
      damping: 0.5,
      stiffness: 400,
    });
    this.state.renderer.setLayout(this.layout);
    this.layout.generate(
      this.state.renderer.setNodePoints,
      this.state.renderer.setEdgeSprings,
    );
  }
}

export default Canvas;
