import Events from './Events'
import Graph, { Node } from './Graph'

export default abstract class Layout extends Events {
  public abstract readonly incremental: boolean
  protected timePerIteration: number = 3

  protected running: boolean = false
  protected totalRuntime: number = 0
  protected initRuntime: number = 0

  public start(graph: Graph): Promise<Graph> {
    const timeStart: number = window.performance.now()
    this.init(graph)
    const timeEnd: number = window.performance.now()
    this.initRuntime = timeEnd - timeStart
    this.totalRuntime = timeEnd - timeStart
    this.running = true
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
    this.totalRuntime += finishTime - startTime

    this.dispatch('iteration', graph)

    if (this.incremental && this.running && this.shouldContinue(graph)) {
      setTimeout(() => {
        this.iterate(graph)
      }, 0)
    } else {
      console.log(`Layout finished in ${this.totalRuntime}ms, init time: ${this.initRuntime}`)
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
