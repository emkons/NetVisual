import { Node } from '../classes/Graph'

export function forceNodes(
  n1: Node,
  n2: Node,
  c: number | ((dist: number) => number),
  attract: boolean,
  size: boolean = false,
  biDirectional: boolean = true
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

export function calculateEigenVector(
  inMatrix: number[][]
): { values: number[]; vectors: number[][] } {
  // Copy matrix
  const matrix = inMatrix.map(row => row.map(col => col))
  const maxIters = 100000
  let iters = 0
  const outValues: number[] = []
  const outVectors: number[][] = []
  const ind: number[] = []
  const changed: boolean[] = []
  let state: number = matrix.length
  let c: number
  let s: number

  const maxIndex = (k: number) => {
    let m = k + 1
    for (let i = k + 2; i < matrix.length; i += 1) {
      if (matrix[k][i] > matrix[k][m]) m = i
    }
    return m
  }

  const update = (k: number, t: number) => {
    const y = outValues[k] || 0
    outValues[k] = y + t
    if (changed[k] && y === outValues[k]) {
      changed[k] = false
      state -= 1
    } else if (!changed[k] && y !== outValues[k]) {
      changed[k] = true
      state += 1
    }
  }

  const rotate = (k: number, l: number, i: number, j: number) => {
    const newSkl = c * matrix[k][l] - s * matrix[i][j]
    const newSij = s * matrix[k][l] + c * matrix[i][j]
    matrix[k][l] = newSkl
    matrix[i][j] = newSij
  }

  // Initialize
  state = matrix.length
  for (let i = 0; i < matrix.length; i += 1) {
    ind.push(maxIndex(i))
    outValues.push(matrix[i][i])
    changed.push(true)
    const oVCol: number[] = []
    outVectors.push(oVCol)
    for (let j = 0; j < matrix.length; j += 1) {
      if (i === j) oVCol.push(1)
      else oVCol.push(0)
    }
  }

  // Loop until no more changes or max iterations reached
  while (state > 0 && iters < maxIters) {
    iters += 1
    let m = 1
    for (let k = 2; k < matrix.length - 1; k += 1) {
      if (matrix[k][ind[k]] > matrix[m][ind[m]]) {
        m = k
      }
    }
    const k = m
    const l = ind[m]
    const p = matrix[k][l]
    // Calcualte cos and sin
    const y = (outValues[l] - outValues[k]) / 2
    const d = Math.abs(y) + sumSqrt(p, y)
    const r = sumSqrt(p, d)
    c = d / r
    s = p / r
    let t = (p * p) / d
    if (y < 0) {
      s = -s
      t = -t
    }
    matrix[k][l] = 0
    update(k, -t)
    update(l, t)
    // Rotate rows and columns
    for (let i = 0; i < k; i += 1) {
      rotate(i, k, i, l)
    }
    for (let i = k; i < l; i += 1) {
      rotate(k, i, i, l)
    }
    for (let i = l; i < matrix.length; i += 1) {
      rotate(k, i, l, i)
    }
    // Rotate eigenvectors
    for (let i = 0; i < matrix.length; i += 1) {
      const newEik = c * outVectors[i][k] - s * outVectors[i][l]
      const newEil = s * outVectors[i][k] + c * outVectors[i][l]
      outVectors[i][k] = newEik
      outVectors[i][l] = newEil
    }
    ind[k] = maxIndex(k)
    ind[l] = maxIndex(l)
  }

  return {
    values: outValues,
    vectors: outVectors,
  }
}

export function eigenPower(inMatrix: number[][]): { values: number[]; vectors: number[][] } {
  const values: number[] = []
  const vectors: number[][] = []

  // Copy matrix
  let matrix = inMatrix.map(row => row.map(col => col))
  const maxIters = 10000
  let iters = 0
  const n = matrix.length
  let err = Infinity
  let x: number[] = []
  for (let i = 0; i < n; i += 1) {
    x.push(Math.random())
  }
  let lambdaOld = 1

  // Get 1st eigenvector and eigenvalue
  while (err > 0.001 && iters < maxIters) {
    iters += 1
    // Multiply matrix with x
    const newX = matrix.map(row => row.reduce((prev, curr, index) => prev + curr * x[index], 0))
    const lambdaNew = newX.reduce(
      (prev, curr) => (Math.abs(curr) > prev ? Math.abs(curr) : prev),
      -Infinity
    )
    const newXNorm = newX.map(el => el / lambdaNew)
    x = newXNorm
    err = Math.abs(lambdaNew - lambdaOld)
    lambdaOld = lambdaNew
  }
  values.push(lambdaOld)
  vectors.push(x.map(el => el))
  console.log('vector', x)
  console.log('val', lambdaOld)
  console.log('matrix', matrix)

  // Remove 1st eigenvector from matrix
  let maxEl = -Infinity
  matrix.forEach(row => {
    row.forEach(col => {
      maxEl = col > maxEl ? col : maxEl
    })
  })
  matrix = matrix.map((row, i) => row.map((col, j) => col - (lambdaOld * x[i] * x[j]) / maxEl))

  // Get 2nd eigenvector and eigenvalue
  iters = 0
  err = Infinity
  x = x.map(el => Math.random())
  while (err > 0.001 && iters < maxIters) {
    iters += 1
    // Multiply matrix with x
    const newX = matrix.map(row => row.reduce((prev, curr, index) => prev + curr * x[index], 0))
    const lambdaNew = newX.reduce(
      (prev, curr) => (Math.abs(curr) > prev ? Math.abs(curr) : prev),
      -Infinity
    )
    const newXNorm = newX.map(el => el / lambdaNew)
    x = newXNorm
    err = Math.abs(lambdaNew - lambdaOld)
    lambdaOld = lambdaNew
  }
  values.push(lambdaOld)
  vectors.push(x.map(el => el))
  console.log('vector', x)
  console.log('val', lambdaOld)
  console.log('matrix', matrix)

  return {
    values,
    vectors,
  }
}
