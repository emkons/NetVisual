import { Node } from "./Node";
import { Edge } from "./Edge";

export class Graph {
  nodeMap: Map<number, Node> = new Map<number, Node>();
  nodes: Node[] = [];
  edges: Edge[] = [];

  nextNodeId: number = 0;
  nextEdgeId: number = 0;

  addNode(node: Node): Node {
    if (!this.nodeMap.has(node.id)) {
      this.nodeMap.set(node.id, node);
      this.nodes.push(node);
    }
    return node;
  }

  addNodes(nodes: Node[]): void {
    nodes.forEach(this.addNode, this);
  }

  addEdge(edge: Edge): Edge {
    let exists: boolean = this.edges.some(e => {
      return edge.id === e.id;
    });

    if (!exists) {
      this.edges.push(edge);
    }

    return edge;
  }

  addEdges(edges: Edge[]): void {
    edges.forEach(this.addEdge, this);
  }

  newNode(data: any): Node {
    let node = new Node(this.nextNodeId++, data);
    this.addNode(node);
    return node;
  }

  newEdge(source: Node, target: Node, data: any): Edge {
    let edge = new Edge(this.nextEdgeId++, source, target, data);
    this.addEdge(edge);
    return edge;
  }

  getEdgesByNodes(source: Node, target: Node): Edge | null {
    //TODO: Implement adjacency matrix
    return null;
  }

  removeNode(node: Node): boolean {
    if (this.nodeMap.has(node.id)) {
      this.nodeMap.delete(node.id);
      this.nodes.forEach((n, i) => {
        if (n.id === node.id) {
          this.nodes.splice(i, 1);
        }
      }, this);
      this.detachNode(node);
      return true;
    }
    return false;
  }

  detachNode(node: Node): void {
    // TODO: Implement unused edge removal
  }

  removeEdge(edge: Edge): boolean {
    // TODO: Implement unused edge removal
    return false;
  }
}
