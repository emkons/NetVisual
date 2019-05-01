import Graphy from '../Graphy'

export default abstract class Parser {
  abstract parse(content: string, graphy: Graphy): void
}
