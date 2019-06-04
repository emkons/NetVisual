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
      url: 'examples/Sawmill_36-62.graphml',
      name: 'Kokzāģētava',
    },
    {
      url: 'examples/Emails.graphml',
      name: 'E-pasti',
    },
    {
      url: 'examples/Random_992-2545.graphml',
      name: 'Zinātniskie raksti',
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
