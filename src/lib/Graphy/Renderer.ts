import { Layout } from "./Layout";

export interface RendererOptions {
  layout?: Layout;
}

export interface Renderer {
  render(object?: any): void;
}
