import React from "react";
import "./index.scss";
import { IPiece, PieceType } from "../types";

export default function index(props: IPiece) {
  const { size, type, point } = props;
  return (
    <span
      className={`piece piece-${type === PieceType.black ? "black" : "white"}`}
      style={{
        top: point.y * size,
        left: point.x * size,
        width: size,
        height: size
      }}
    ></span>
  );
}
