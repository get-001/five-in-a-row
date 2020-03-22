import React, { PureComponent } from "react";
import "./index.scss";
import Back from "./Back";
import Piece from "./Piece";
import { PieceType, IBack, IPiece, GameState } from "./types";
import { Tool } from "./Tool";

interface IProps {
  initData: { size: number; row: number; list: number };
  newPieceType: PieceType;
  gameState: GameState;
  setGameState: (state: GameState) => void;
  pieceData: IPiece[]; // 历史数据
  onPush: (piece: IPiece) => void;
}

interface IState {
  backData: IBack[];
  nextPieceType: PieceType; // 下一个棋子类型
}

export default class GamePanel extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { initData, newPieceType } = this.props;
    this.state = {
      backData: Tool.setBack(initData.size, initData.row, initData.list),
      nextPieceType: newPieceType
    };
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    const { gameState, newPieceType } = nextProps;
    // 当传入的newPieceType发生变化的时候，更新state
    // 只有就绪状态才能改newPieceType
    if (gameState === GameState.init) {
      return {
        nextPieceType: newPieceType,
        pieceData: []
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }

  render() {
    const { backData, nextPieceType: pieceType } = this.state;
    const { size, list, row } = this.props.initData,
      width = list * size,
      height = row * size;
    // console.log(JSON.stringify(pieceData));
    return (
      <div className="game-panel">
        <div className="panel-back" style={{ width, height }}>
          {backData.map((it, i) => {
            return (
              <Back
                {...it}
                onClick={() => {
                  if (
                    this.props.gameState === GameState.draw ||
                    this.props.gameState === GameState.black_victory ||
                    this.props.gameState === GameState.white_victory
                  ) {
                    // 游戏结束
                    return;
                  }
                  const nextPieceType =
                    pieceType === PieceType.black
                      ? PieceType.white
                      : PieceType.black;
                  // ----------------------- 游戏开始，判断哪方出棋
                  const state =
                    nextPieceType === PieceType.black
                      ? GameState.playing_black
                      : GameState.playing_white;
                  this.props.setGameState(state);
                  this.props.onPush({
                    point: it.point,
                    size,
                    type: this.state.nextPieceType
                  });
                  this.setState({ nextPieceType }, () => {
                    const { pieceData } = this.props;
                    // ----------------------- 算法，判断哪方胜利
                    const triumphType = Tool.judgeTheWinningSide(pieceData);
                    if (triumphType === PieceType.black) {
                      // 黑方胜利
                      this.props.setGameState(GameState.black_victory);
                    } else if (triumphType === PieceType.white) {
                      // 白方胜利
                      this.props.setGameState(GameState.white_victory);
                    }
                    // ----------------------- 棋盘下满后还没有胜负，表示平局
                    if (pieceData.length === backData.length) {
                      this.props.setGameState(GameState.draw);
                    }
                  });
                }}
                key={i}
              />
            );
          })}

          {this.props.pieceData.map((it, i) => (
            <Piece {...it} key={i} />
          ))}
        </div>
      </div>
    );
  }
}
