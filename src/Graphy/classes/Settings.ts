import { resolveNestedPropWithFallback, createNestedPath } from '../util'

interface SettingsData {
  default?: Object
}

export default class Settings {
  private data: SettingsData = {}

  constructor(options: Object) {
    this.data = options
    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
  }

  public get(key: string, namespace?: string): any {
    console.log(this.data, namespace)
    if (namespace) {
      return resolveNestedPropWithFallback(namespace, key, this.data)
    }
    if (this.data.default && this.data.default[key]) {
      return this.data.default[key]
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
    return key => this.get(key, namespace)
  }

  public namespacedSetter(namespace: string): any {
    return (key, value) => {
      this.set(key, value, namespace)
    }
  }
}
