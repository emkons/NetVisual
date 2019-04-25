import { Node } from '../classes/Graph'

export function forceNodes(
  n1: Node,
  n2: Node,
  c: number | ((dist: number) => number),
  attract: boolean,
  size: boolean = false,
  biDirectional: boolean = true,
): void {
  const xDist = n1.x - n2.x
  const yDist = n1.y - n2.y
  let dist = sumSqrt(xDist, yDist)
  if (size) {
    dist -= n1.size + n2.size
  }
  if (dist > 0) {
    let force: number
    if (attract) force = getForce(-1 / dist, c)
    else force = getForce(dist / 0.1, c)

    assignForce(n2, xDist, yDist, dist, -force)
    if (biDirectional) assignForce(n1, xDist, yDist, dist, force)
  }
}

export function sumSqrt(x: number, y: number): number {
  return Math.sqrt(x * x + y * y)
}

function getForce(dist: number, c: number | ((dist: number) => number)): number {
  if (typeof c === 'number') {
    return (0.01 * c) / dist
  }
  return c(dist)
}

export function assignForce(n: Node, x: number, y: number, dist: number, force: number): void {
  n.layoutProps.f.x += (x / dist) * force
  n.layoutProps.f.y += (y / dist) * force
}
