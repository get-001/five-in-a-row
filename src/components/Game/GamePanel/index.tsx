import React, { PureComponent } from "react";
import "./index.scss";
import Back from "./Back";
import Piece from "./Piece";
import { PieceType, IBack, IPiece, GameState } from "./types";
import { Tool } from "./Tool";

interface IProps {
  initData: { size: number; row: number; list: number };
  nextPieceType: PieceType;
  gameState: GameState;
  setGameState: (state: GameState) => void;
  pieceData: IPiece[]; // 历史数据
  onPush: (piece: IPiece) => void;
}

interface IState {
  backData: IBack[];
}

export default class GamePanel extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { initData } = this.props;
    this.state = {
      backData: Tool.setBack(initData.size, initData.row, initData.list)
    };
  }

  render() {
    const { backData } = this.state;
    const { nextPieceType } = this.props;
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
                    // 游戏结束 不能继续点击
                    return;
                  }
                  this.props.onPush({
                    point: it.point,
                    size,
                    type: nextPieceType
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
