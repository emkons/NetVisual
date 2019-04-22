import Graph from './Graph'

export interface ILayout {
  // Indicated wheter layout can be incrementally subscribed to
  readonly incremental: boolean
  // Start layout processing
  start(graph: Graph): Promise<Graph>
  // Stop Layout processing, return true successfully stopped
  stop(): boolean
}
