import { Node } from "./Node";

export class Edge {
  id: number;
  source: Node;
  target: Node;
  data: any;

  constructor(id: number, source: Node, target: Node, data: any) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.data = data;
  }
}
