import { resolveNestedPropWithFallback, createNestedPath } from '../util'

interface SettingsData {
  default: Object
  [key: string]: any
}

export default class Settings {
  private data: SettingsData = {
    default: {
      defaultNodeSize: 10,
      defaultEdgeWidth: 2,
      defaultEdgeColor: '#7777',
      defaultNodeColor: '#000',
    },
  }

  constructor() {
    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
  }

  public get(key: string, namespace?: string): any {
    if (namespace) {
      return resolveNestedPropWithFallback(namespace, key, this.data) || this.data.default[key]
    }
    return this.data[key]
  }

  public set(key: string, value: any, namespace?: string) {
    if (namespace) {
      createNestedPath(namespace, this.data)[key] = value
      return
    }
    this.data[key] = value
  }

  public namespacedGetter(namespace: string): any {
    return (key: string) => this.get(key, namespace)
  }

  public namespacedSetter(namespace: string): any {
    return (key: string, value: any) => {
      this.set(key, value, namespace)
    }
  }
}
