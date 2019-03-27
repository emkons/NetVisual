import { Graph } from './Graph';
import { Point } from './Examples/Layouts/ForceDirected/Point';
import { Spring } from './Examples/Layouts/ForceDirected/Spring';

export interface Layout {
  graph: Graph;
  generate(
    nodeCallback: (nodePoints: Point[]) => void,
    edgeCallback: (edgeSprings: Spring[]) => void,
    incremental?: boolean,
  ): void;
}
