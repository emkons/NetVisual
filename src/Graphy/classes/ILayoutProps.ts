export interface ILayoutProps {
  f: {
    x: number
    y: number,
  }
  i?: {
    x: number
    y: number,
  }
  freeze?: number
  [key: string]: number | { x: number; y: number } | { [key: string]: string | number }
}
