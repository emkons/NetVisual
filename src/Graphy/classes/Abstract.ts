import Settings from './Settings'

export interface IGraphyComponent {
  readonly namespace: string
}

export default abstract class GraphyComponent implements IGraphyComponent {
  protected settings: Settings
  protected options: Object
  abstract readonly namespace: string

  protected getOption: (key: string) => any
  protected setOption: (key: string, value: any) => any

  constructor(settings: Settings, options?: Object) {
    this.settings = settings
    this.options = options
  }

  protected initOptions() {
    this.getOption = this.settings.namespacedGetter(this.namespace)
    this.setOption = this.settings.namespacedSetter(this.namespace)
  }
}
