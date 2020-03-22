export interface Point {
  x: number;
  y: number;
}
export enum PieceType {
  black,
  white
}
export interface IPiece {
  size: number;
  type: PieceType;
  point: Point;
}

export interface IBack {
  onClick?: () => void;
  size: number;
  typeNum: number;
  point: Point;
}

export enum GameState {
  init = "准备就绪",
  playing_black = "黑方落子",
  playing_white = "白方落子",
  black_victory = "黑方胜利",
  white_victory = "白方胜利",
  draw = "平局"
}
