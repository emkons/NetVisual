import { isArray } from 'util'

export type ID = string | number

export function isID(id: any): id is ID {
  return typeof id === 'string' || typeof id === 'number'
}

export function isIDArray(ids: any): ids is ID[] {
  if (!isArray(ids)) {
    return false
  }
  return ids.every(id => isID(id))
}

export function isCanvas(el: any): el is HTMLCanvasElement {
  return el instanceof HTMLCanvasElement
}

export function resolveNestedProp(path: string | string[], object: any): any {
  const properties = isArray(path) ? path : path.split('.')
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
  const properties = isArray(path) ? path : path.split('.')
  return properties.reduce((prev, curr) => (prev[curr] = prev[curr] || {}), object)
}
