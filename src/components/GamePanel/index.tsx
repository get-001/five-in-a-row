import React, { Component } from "react";
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
}

interface IState {
  backData: IBack[];
  pieceData: IPiece[]; // 历史数据
  nextPieceType: PieceType; // 下一个棋子类型
}

export default class GamePanel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { initData, newPieceType } = this.props;
    this.state = {
      backData: Tool.setBack(initData.size, initData.row, initData.list),
      pieceData: [],
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
    const { backData, pieceData, nextPieceType: pieceType } = this.state;
    const { size, list, row } = this.props.initData,
      width = list * size,
      height = row * size;
    const { setGameState, gameState } = this.props;
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
                    gameState === GameState.draw ||
                    gameState === GameState.black_victory ||
                    gameState === GameState.white_victory
                  ) {
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
                  setGameState(state);
                  this.setState(
                    {
                      pieceData: [
                        ...pieceData,
                        { point: it.point, type: pieceType, size }
                      ],
                      nextPieceType
                    },
                    () => {
                      const { pieceData } = this.state;
                      // ----------------------- 算法，判断哪方胜利
                      const item = pieceData.filter(it => {
                        return Tool.core(pieceData, it);
                      })[0];
                      if (item) {
                        if (item.type === PieceType.black) {
                          // 黑方胜利
                          setGameState(GameState.black_victory);
                        } else {
                          // 白方胜利
                          setGameState(GameState.white_victory);
                        }
                      }
                      // ----------------------- 棋盘下满后还没有胜负，表示平局
                      if (pieceData.length === backData.length) {
                        setGameState(GameState.draw);
                      }
                    }
                  );
                }}
                key={i}
              />
            );
          })}

          {pieceData.map((it, i) => (
            <Piece {...it} key={i} />
          ))}
        </div>
      </div>
    );
  }
}
