import React, { Component } from "react";
import "./App.scss";
import GamePanel from "./components/GamePanel";
import OperatePanel from "./components/OperatePanel";
import { GameState, PieceType } from "./components/GamePanel/types";

export default class App extends Component {
  state = {
    newPieceType: PieceType.black,
    gameState: GameState.init,
    initData: { size: 30, row: 20, list: 20 }
  };
  render() {
    const { gameState, newPieceType } = this.state;
    return (
      <div className="App">
        <div className="wrap-center">
          <GamePanel
            {...this.state}
            setGameState={state => {
              this.setState({ gameState: state });
            }}
          />
          <OperatePanel
            gameState={gameState}
            newPieceType={newPieceType}
            onClick={state => {
              this.setState({ gameState: state });
            }}
            onPriority={(newPieceType: PieceType) => {
              this.setState({ newPieceType });
            }}
          />
        </div>
      </div>
    );
  }
}
