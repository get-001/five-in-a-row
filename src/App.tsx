import React, { PureComponent } from "react";
import "./App.scss";
import Game from "./components/Game";

export default class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Game {...{ size: 30, row: 20, list: 20 }} />
      </div>
    );
  }
}
