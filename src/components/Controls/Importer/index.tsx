import { h, Component } from 'preact'
import { GraphMLParser } from '../../../Graphy/parser/GraphMLParser'
import { graphy } from '../../../Graphy/Instance'
import Samples from '../Samples'

export default class Importer extends Component {
  render() {
    return (
      <div>
        <input type="file" onChange={this.upload} />
        <Samples />
      </div>
    )
  }

  upload(e: Event) {
    const input = e.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      const reader = new FileReader()
      const parser = new GraphMLParser()
      reader.onload = (e: Event) => {
        parser.parse((e.target as any).result, graphy)
      }
      reader.readAsText(input.files[0])
    }
  }
}
