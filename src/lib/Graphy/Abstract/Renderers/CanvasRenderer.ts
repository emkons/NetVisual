import { Renderer, RendererOptions } from "../../Renderer";
import { Layout } from "../../Layout";
import { Point } from "../../Examples/Layouts/ForceDirected/Point";

export interface CanvasRendererOptions extends RendererOptions {}

export interface CanvasRendererInterface extends Renderer {
  context: CanvasRenderingContext2D;
  render(context: CanvasRenderingContext2D): void;
}

export interface CanvasStyleOptions {
  // Line Styles
  lineCap?: CanvasLineCap;
  lineDashOffset?: number;
  lineJoin?: CanvasLineJoin;
  lineWidth?: number;
  miterLimit?: number;

  // Text Styles
  direction?: CanvasDirection;
  font?: string;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;

  // Colors, Styles and Shadows
  fillStyle?: string | CanvasGradient | CanvasPattern;
  strokeStyle?: string | CanvasGradient | CanvasPattern;
  shadowBlur?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
}

export abstract class CanvasRendererAbstract
  implements CanvasRendererInterface {
  setNodePoints(nodePoints: Point[]): void {}
  canvas: HTMLCanvasElement;
  options: CanvasRendererOptions;
  setLayout(layout: Layout): void {
    this.options.layout = layout;
  }
  context: CanvasRenderingContext2D;
  styleOptions: CanvasStyleOptions;

  protected constructor(
    context: CanvasRenderingContext2D,
    styleOptions: CanvasStyleOptions
  ) {
    this.context = context;
    this.styleOptions = styleOptions;
  }
  protected preRender(context: CanvasRenderingContext2D): void {
    context.lineCap = this.styleOptions.lineCap || "square";
    context.lineDashOffset = this.styleOptions.lineDashOffset || 5;
    context.lineJoin = this.styleOptions.lineJoin || "bevel";
    context.lineWidth = this.styleOptions.lineWidth || 1;
    context.miterLimit = this.styleOptions.miterLimit || 1;
    context.direction = this.styleOptions.direction || "ltr";
    context.font = this.styleOptions.font || "arial";
    context.textAlign = this.styleOptions.textAlign || "start";
    context.textBaseline = this.styleOptions.textBaseline || "bottom";
    context.fillStyle = this.styleOptions.fillStyle || "#000";
    context.strokeStyle = this.styleOptions.strokeStyle || "#000";
    context.shadowBlur = this.styleOptions.shadowBlur || 0;
    context.shadowColor = this.styleOptions.shadowColor || "#000";
    context.shadowOffsetX = this.styleOptions.shadowOffsetX || 0;
    context.shadowOffsetY = this.styleOptions.shadowOffsetY || 0;
  }
  render(context: CanvasRenderingContext2D): void {
    this.preRender(context);
  }
}

export abstract class CanvasRenderer extends CanvasRendererAbstract {
  protected constructor(
    canvas: HTMLCanvasElement,
    styleOptions: CanvasStyleOptions,
    options: CanvasRendererOptions
  ) {
    super(
      canvas.getContext("2d") || new CanvasRenderingContext2D(),
      styleOptions
    );
    this.canvas = canvas;
    this.context.translate(canvas.width / 2, canvas.height / 2);
    this.options = options;
    window.requestAnimationFrame(() => this.drawFrame());
  }

  protected drawFrame() {
    this.render(this.context);
    window.requestAnimationFrame(() => this.drawFrame());
  }

  abstract render(context: CanvasRenderingContext2D): void;
}
