import { Layout } from '../../Layout';
import { Graph } from '../../Graph';
import { Node } from '../../Node';
import { Point } from './ForceDirected/Point';
import { Spring } from './ForceDirected/Spring';
import { Vector } from './ForceDirected/Vector';
import { Edge } from '../../Edge';

export interface ForceDirectedOptions {
  stiffness?: number;
  repulsion?: number;
  damping?: number;
  minEnergy?: number;
  maxSpeed?: number;
}

export class ForceDirected implements Layout {
  graph: Graph;
  options: ForceDirectedOptions;
  nodePoints: Map<number, Point> = new Map<number, Point>();
  edgeSprings: Map<number, Spring> = new Map<number, Spring>();

  constructor(graph: Graph, options?: ForceDirectedOptions) {
    this.graph = graph;
    const defaultOptions: ForceDirectedOptions = {
      stiffness: 400,
      repulsion: 400,
      damping: 0.5,
      minEnergy: 0.0001,
      maxSpeed: Infinity,
    };
    this.options = Object.assign({}, defaultOptions, options);
  }

  async generate(
    nodeCallback: (nodePoints: Point[]) => void,
    edgeCallback: (edgeSprings: Spring[]) => void,
    incremental?: boolean,
  ) {
    const time = 0.03;
    const shouldStop = false;
    let counter = 0;
    do {
      counter += 1;
      await this.generateNextPosition(time);
      await this.sleep(1);
      nodeCallback(Array.from(this.nodePoints.values()));
      edgeCallback(Array.from(this.edgeSprings.values()));
    } while (!shouldStop); // && this.totalEnergy(time) > this.options.minEnergy);
    console.log('Total Iterations: ' + counter);
  }

  protected sleep(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  protected async generateNextPosition(timestep: number) {
    this.tick(timestep);
  }

  tick(timestep: number) {
    this.applyColumbsLaw();
    this.applyHookesLaw();
    this.attractToCenter();
    this.updateVelocity(timestep);
    this.updatePosition(timestep);
  }

  point(node: Node) {
    if (!this.nodePoints.has(node.id)) {
      const mass = node.data.mass !== undefined ? node.data.mass : 1;
      this.nodePoints.set(node.id, new Point(Vector.random(), mass, node));
    }
    return this.nodePoints.get(node.id);
  }

  spring(edge: Edge) {
    if (!(edge.id in this.edgeSprings)) {
      const length = edge.data.length !== undefined ? edge.data.length : 1;

      const from = this.graph.getEdges(edge.source, edge.target);
      let existingEdgeSpring: Edge = from.find(
        e => this.edgeSprings.has(edge.id),
        this,
      );

      if (existingEdgeSpring !== undefined) {
        const existingSpring = this.edgeSprings.get(existingEdgeSpring.id);
        return new Spring(existingSpring.point1, existingSpring.point2, 0, 0);
      }

      const to = this.graph.getEdges(edge.target, edge.source);
      existingEdgeSpring = to.find(e => this.edgeSprings.has(edge.id), this);

      if (existingEdgeSpring !== undefined) {
        const existingSpring = this.edgeSprings.get(existingEdgeSpring.id);
        return new Spring(existingSpring.point1, existingSpring.point2, 0, 0);
      }

      this.edgeSprings.set(
        edge.id,
        new Spring(
          this.point(edge.source),
          this.point(edge.target),
          length,
          this.options.stiffness,
        ),
      );
    }
    return this.edgeSprings.get(edge.id);
  }

  applyColumbsLaw() {
    this.graph.nodes.forEach(n1 => {
      const point1 = this.point(n1);
      this.graph.nodes.forEach(n2 => {
        const point2 = this.point(n2);
        if (point1 !== point2) {
          const d = point1.position.subtract(point2.position);
          const distance = d.magnitude() + 0.1;
          const direction = d.normalize();

          point1.applyForce(
            direction
              .multiply(this.options.repulsion)
              .divide(distance * distance * 0.5),
          );
          point2.applyForce(
            direction
              .multiply(this.options.repulsion)
              .divide(distance * distance * -0.5),
          );
        }
      },                       this);
    },                       this);
  }

  applyHookesLaw() {
    this.graph.edges.forEach(edge => {
      const spring = this.spring(edge);
      const d = spring.point2.position.subtract(spring.point1.position);
      const displacement = spring.length - d.magnitude();
      const direction = d.normalize();

      spring.point1.applyForce(
        direction.multiply(spring.k * displacement * -0.5),
      );
      spring.point2.applyForce(
        direction.multiply(spring.k * displacement * 0.5),
      );
    },                       this);
  }

  attractToCenter() {
    this.graph.nodes.forEach(n => {
      const point = this.point(n);
      const direction = point.position.multiply(-1);
      point.applyForce(direction.multiply(this.options.repulsion / 100));
    },                       this);
  }

  updateVelocity(timestep: number) {
    this.graph.nodes.forEach(n => {
      const point = this.point(n);
      point.velocity = point.velocity
        .add(point.acceleration.multiply(timestep))
        .multiply(this.options.damping);
      if (point.velocity.magnitude() > this.options.maxSpeed) {
        point.velocity = point.velocity
          .normalize()
          .multiply(this.options.maxSpeed);
      }
      point.acceleration = new Vector(0, 0);
    },                       this);
  }

  updatePosition(timestep: number) {
    this.graph.nodes.forEach(n => {
      const point = this.point(n);
      point.position = point.position.add(point.velocity.multiply(timestep));
    },                       this);
  }

  totalEnergy(timestep: number): number {
    let energy: number = 0;
    this.graph.nodes.forEach(n => {
      const point = this.point(n);
      const speed = point.velocity.magnitude();
      energy += 0.5 * point.mass * speed * speed;
    },                       this);
    return energy;
  }
}
