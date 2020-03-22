import React from "react";
import "./index.scss";
import { IBack } from "../types";

export default function Back(props: IBack) {
  const { typeNum, size } = props;
  return (
    <span
      className={`back back-${typeNum}`}
      style={{ width: size, height: size }}
      onClick={() => {
        props.onClick!();
      }}
    ></span>
  );
}
