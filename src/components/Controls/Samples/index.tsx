import { h, Component } from 'preact'
import { GraphMLParser } from '../../../Graphy/parser/GraphMLParser'
import { graphy } from '../../../Graphy/Instance'

interface URLMap {
  url: string
  name: string
}

export default class Samples extends Component {
  urls: URLMap[] = [
    {
      url: 'examples/test.graphml',
      name: 'TEST',
    },
    {
      url: 'examples/Airplanes.graphml',
      name: 'Airplanes',
    },
    {
      url: 'examples/UK_Subway.graphml',
      name: 'UK Subway',
    },
  ]
  render() {
    const examples = this.urls.map(url => (
      <button
        onClick={event => {
          this.loadSample(url.url)
        }}
        key={url.name}
      >
        {url.name}
      </button>
    ))
    return (
      <div>
        Examples:
        <br />
        {examples}
      </div>
    )
  }

  loadSample(url: string) {
    const parser = new GraphMLParser()
    fetch(url).then(response => {
      response.text().then(text => {
        parser.parse(text, graphy)
      })
    })
  }
}
