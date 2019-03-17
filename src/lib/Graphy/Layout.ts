import { Graph } from "./Graph";

export interface Layout {
  graph: Graph;
  generate(cb: () => void, incremental?: boolean): void;
}
