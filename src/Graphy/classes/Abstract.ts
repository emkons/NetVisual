import Settings from './Settings'
import Graphy from '../Graphy'

export interface IGraphyComponent {
  readonly namespace: string
  getOption: (key: string) => any
  setOption: (key: string, value: any) => any
}

export default abstract class GraphyComponent implements IGraphyComponent {
  protected settings: Settings
  protected options: Object
  protected root: Graphy
  abstract readonly namespace: string

  public getOption: (key: string) => any
  public setOption: (key: string, value: any) => any

  constructor(root: Graphy, options: Object) {
    this.settings = root.settings
    this.options = options
  }

  protected init(namespace: string, options?: Object) {
    this.initSettings(namespace)
    this.setOption('type', this)
    this.initComponent()
  }

  protected initSettings(namespace: string) {
    this.getOption = this.settings.namespacedGetter(namespace)
    this.setOption = this.settings.namespacedSetter(namespace)
  }

  protected abstract initComponent(): void
}
