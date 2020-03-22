import React, { PureComponent } from "react";
import GamePanel from "./GamePanel";
import OperatePanel from "./OperatePanel";
import { GameState, PieceType, IPiece } from "./GamePanel/types";
import { Tool } from "./GamePanel/Tool";

interface GameConfig {
  size: number;
  row: number;
  list: number;
}
export default class Game extends PureComponent<GameConfig> {
  state = {
    nextPieceType: PieceType.black,
    gameState: GameState.init,
    initData: this.props,
    pieceData: []
  };
  /**
   * 切换棋子
   * @param {PieceType} pieceType
   * @returns
   */
  private switchPieceType = (pieceType: PieceType) => {
    return pieceType === PieceType.black ? PieceType.white : PieceType.black;
  };
  /**
   * 添加棋子跟完整的判断胜负
   * @param {IPiece} piece
   */
  onPush = (piece: IPiece) => {
    const nextPieceType = this.switchPieceType(piece.type);
    const gameState =
      nextPieceType === PieceType.black
        ? GameState.playing_black
        : GameState.playing_white;
    this.setState(
      {
        pieceData: [...this.state.pieceData, piece],
        nextPieceType,
        gameState
      },
      () => {
        const { initData, pieceData } = this.state;
        // ----------------------- 算法，判断哪方胜利
        const triumphType = Tool.judgeTheWinningSide(pieceData);
        if (triumphType === PieceType.black) {
          // 黑方胜利
          this.setState({ gameState: GameState.black_victory });
        } else if (triumphType === PieceType.white) {
          // 白方胜利
          this.setState({ gameState: GameState.white_victory });
        }
        // ----------------------- 棋盘下满后还没有胜负，表示平局
        if (pieceData.length === initData.row * initData.list) {
          this.setState({ gameState: GameState.draw });
        }
      }
    );
  };
  /**
   * 悔棋
   * @memberof Game
   */
  undo = () => {
    if (this.state.pieceData.length < 2) return;
    let arr: IPiece[] = [...this.state.pieceData],
      item = arr.pop();
    if (!item) return;
    // 悔棋
    const gameState =
      item.type === PieceType.black
        ? GameState.playing_black
        : GameState.playing_white;
    this.setState({
      pieceData: arr,
      nextPieceType: item.type,
      gameState
    });
  };

  render() {
    const { gameState, nextPieceType } = this.state;
    return (
      <div className="Game wrap-center">
        <GamePanel
          {...this.state}
          setGameState={state => {
            this.setState({ gameState: state });
          }}
          onPush={this.onPush}
        />
        <OperatePanel
          gameState={gameState}
          nextPieceType={nextPieceType}
          showBtnUndo={
            (this.state.pieceData.length > 1 &&
              this.state.gameState === GameState.playing_black) ||
            (this.state.pieceData.length > 1 &&
              this.state.gameState === GameState.playing_white)
          }
          onClick={state => {
            if (state === GameState.init) {
              this.setState({ pieceData: [] });
            }
            this.setState({ gameState: state });
          }}
          onPriority={(nextPieceType: PieceType) => {
            this.setState({ nextPieceType });
          }}
          onUndo={this.undo}
        />
      </div>
    );
  }
}
