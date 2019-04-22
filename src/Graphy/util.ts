export type ID = string | number

export function isID(id: any): id is ID {
  return typeof id === 'string' || typeof id === 'number'
}

export function isIDArray(ids: any): ids is ID[] {
  if (!Array.isArray(ids)) {
    return false
  }
  return ids.every(id => isID(id))
}

export function isCanvas(el: any): el is HTMLCanvasElement {
  return el instanceof HTMLCanvasElement
}

export function resolveNestedProp(path: string | string[], object: any): any {
  const properties = Array.isArray(path) ? path : path.split('.')
  return properties.reduce((prev, curr) => prev && prev[curr], object)
}

export function resolveNestedPropWithFallback(path: string, key: string, object: any): any {
  let currPath = path
  let res: any
  while (currPath.indexOf('.') !== -1 && !res) {
    res = resolveNestedProp(`${currPath}.${key}`, object)
    currPath = currPath.substr(0, currPath.lastIndexOf('.'))
  }
  return res
}

export function createNestedPath(path: string | string[], object: any): any {
  const properties = Array.isArray(path) ? path : path.split('.')
  return properties.reduce((prev, curr) => (prev[curr] = prev[curr] || {}), object)
}

export class Vector {
  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public add(v2: Vector) {
    this.x += v2.x
    this.y += v2.y
    return this
  }

  public multiply(c: number) {
    this.x *= c
    this.y *= c
    return this
  }

  public subtract(v2: Vector) {
    this.x -= v2.x
    this.y -= v2.y
    return this
  }

  public dist2() {
    return this.x * this.x + this.y * this.y
  }

  public dist() {
    return Math.sqrt(this.dist2())
  }

  public norm() {
    return this.clone().multiply(1 / this.dist())
  }

  public clone() {
    return new Vector(this.x, this.y)
  }
}
