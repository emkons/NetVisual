import { Node } from "./Node";
import { Edge } from "./Edge";

export class Graph {
  nodeMap: Map<number, Node> = new Map<number, Node>();
  nodes: Node[] = [];
  edges: Edge[] = [];
  adjacency: {};

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

    if (!(edge.source.id in this.adjacency)) {
      this.adjacency[edge.source.id] = {};
    }
    if (!(edge.target.id in this.adjacency[edge.source.id])) {
      this.adjacency[edge.source.id][edge.target.id] = [];
    }

    exists = this.adjacency[edge.source.id][edge.target.id].some(
      e => e.id === edge.id,
      false
    );

    if (!exists) {
      this.adjacency[edge.source.id][edge.target.id].push(edge);
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

  getEdges(source: Node, target: Node): Edge[] {
    if (source.id in this.adjacency && target.id in this.adjacency[source.id]) {
      return this.adjacency[source.id][target.id];
    }
    return [];
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
    this.edges
      .filter(e => e.source.id === node.id || e.target.id === node.id)
      .forEach(e => this.removeEdge(e), this);
  }

  removeEdge(edge: Edge): boolean {
    this.edges = this.edges.filter(e => e.id !== edge.id);
    for (let x in this.adjacency) {
      for (let y in this.adjacency[x]) {
        this.adjacency[x][y] = this.adjacency[x][y].filter(
          e => e.id !== edge.id
        );
        if (this.adjacency[x][y].length === 0) {
          delete this.adjacency[x][y];
        }
      }
    }
    return false;
  }
}
