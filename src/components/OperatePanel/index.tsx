import React from "react";
import "./index.scss";
import { GameState, PieceType } from "../GamePanel/types";

interface IProps {
  gameState: GameState;
  onClick: (state: GameState) => void;
  onPriority: (pieceType: PieceType) => void;
  newPieceType: PieceType;
}
export default function OperatePanel(props: IProps) {
  return (
    <div className="operate-panel">
      <p className="state">游戏状态: {props.gameState}</p>
      <button
        onClick={() => {
          if (props.gameState === GameState.init) {
            const state =
              props.newPieceType === PieceType.black
                ? GameState.playing_black
                : GameState.playing_white;
            props.onClick(state);
          } else {
            props.onClick(GameState.init);
          }
        }}
      >
        {props.gameState === GameState.init ? "开始" : "重玩"}
      </button>
      <p>优先出棋方:</p>
      <div className="radio-flex">
        {[
          { text: "黑方优先", PieceType: PieceType.black, default: true },
          { text: "白方优先", PieceType: PieceType.white }
        ].map((it, i) => {
          return (
            <label htmlFor={`radio-sv2-${i}`} key={i}>
              {it.text}
              <input
                type="radio"
                name="state"
                id={`radio-sv2-${i}`}
                value="black"
                defaultChecked={it.default}
                onClick={() => props.onPriority(it.PieceType)}
                disabled={props.gameState !== GameState.init}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
