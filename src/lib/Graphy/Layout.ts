import { Graph } from "./Graph";
import { Point } from "./Examples/Layouts/ForceDirected/Point";

export interface Layout {
  graph: Graph;
  generate(cb: (nodePoints: Point[]) => void, incremental?: boolean): void;
}
