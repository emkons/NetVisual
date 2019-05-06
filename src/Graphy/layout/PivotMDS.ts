import Layout from '../classes/Layout'
import { ILayout } from '../classes/ILayout'
import Graph from '../classes/Graph'
import { eigenPower } from './util'

export default class PivotMDS extends Layout implements ILayout {
  public incremental = false

  public process(graph: Graph) {}

  protected shouldContinue(graph: Graph): boolean {
    return true
  }
}
