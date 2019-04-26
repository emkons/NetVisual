import Events from './Events'
import Graph, { Node } from './Graph'

export default abstract class Layout extends Events {
  public abstract readonly incremental: boolean
  protected timePerIteration: number = 3

  protected running: boolean = false

  public start(graph: Graph): Promise<Graph> {
    this.init(graph)
    setTimeout(() => {
      this.iterate(graph)
    }, 0)
    return new Promise<Graph>(resolve => {
      this.subscribe('done', resolve)
    })
  }

  protected iterate(graph: Graph): void {
    const startTime = window.performance.now()
    let finishTime = 0
    do {
      this.process(graph)
      finishTime = window.performance.now()
    } while (finishTime - startTime < this.timePerIteration && this.shouldContinue(graph))

    this.dispatch('iteration', graph)

    if (this.incremental && this.shouldContinue(graph)) {
      setTimeout(() => {
        this.iterate(graph)
      }, 0)
    } else {
      this.dispatch('done', graph)
    }
  }

  public stop() {
    this.running = false
    return this.running
  }

  protected initNodeLayoutProps(nodes: Node[], resetForce: boolean = true): void {
    nodes.forEach(node => {
      if (!node.layoutProps) {
        node.layoutProps = {
          f: {
            x: 0,
            y: 0,
          },
          i: {
            x: 0,
            y: 0,
          },
        }
      }
      if (resetForce) {
        node.layoutProps.f = {
          x: 0,
          y: 0,
        }
      }
    })
  }

  protected init(graph: Graph): void {
    this.initNodeLayoutProps(graph.nodes())
  }

  protected abstract process(graph: Graph): void

  protected abstract shouldContinue(graph: Graph): boolean
}
