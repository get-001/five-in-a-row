import React, { PureComponent } from "react";
import "./App.scss";
import GamePanel from "./components/GamePanel";
import OperatePanel from "./components/OperatePanel";
import { GameState, PieceType } from "./components/GamePanel/types";

export default class App extends PureComponent {
  state = {
    newPieceType: PieceType.black,
    gameState: GameState.init,
    initData: { size: 30, row: 20, list: 20 },
    pieceData: []
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
            onPush={piece => {
              this.setState({ pieceData: [...this.state.pieceData, piece] });
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
            onUndo={() => {
              if (this.state.pieceData.length < 2) return;
              // 悔棋
              const arr = [...this.state.pieceData];
              // const newPieceType =
              //   this.state.newPieceType === PieceType.black
              //     ? PieceType.white
              //     : PieceType.black;
              arr.pop();
              this.setState({ pieceData: arr, newPieceType });
            }}
          />
        </div>
      </div>
    );
  }
}
