import { h, render } from "preact";
import App from "./components/App";

let root = document.getElementById("app") as Element;

root = render(<App />, document.body, root);
root.setAttribute("id", "app_root");

if (process.env.NODE_ENV !== "production") {
  require("preact/debug");

  module.hot.accept("./components/App", () => {
    import("./components/App").then(({ default: App }) => {
      root = render(<App />, document.body, root);
    });
  });
}
