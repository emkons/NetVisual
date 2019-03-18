import { Layout } from "./Layout";
import { Point } from "./Examples/Layouts/ForceDirected/Point";

export interface RendererOptions {
  layout?: Layout;
}

export interface Renderer {
  setLayout(layout: Layout): void;
  setNodePoints(nodePoints: Point[]): void;
  render(object?: any): void;
}
