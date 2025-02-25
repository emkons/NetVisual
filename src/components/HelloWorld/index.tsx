import { h, Component } from 'preact';

export interface HelloWorldProps {
  name: string;
}

class HelloWorld extends Component<HelloWorldProps, any> {
  render(props) {
    return <p>Hello {props.name}!</p>;
  }
}

export default HelloWorld;
