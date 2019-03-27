import { Layout } from './Layout';
import { Point } from './Examples/Layouts/ForceDirected/Point';
import { Spring } from './Examples/Layouts/ForceDirected/Spring';

export interface RendererOptions {
  layout?: Layout;
}

export interface Renderer {
  setLayout(layout: Layout): void;
  setNodePoints(nodePoints: Point[]): void;
  setEdgeSprings(edgeSprings: Spring[]): void;
  render(object?: any): void;
}
