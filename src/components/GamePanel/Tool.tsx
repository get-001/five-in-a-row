import { IBack, Point, IPiece } from "./types";

export class Tool {
  /**
   * 生成棋盘背景数组
   * @param {number} size
   * @param {number} row
   * @param {number} list
   * @returns {IBack[]}
   */
  static setBack(size: number, row: number, list: number): IBack[] {
    const data: IBack[] = [];
    for (let y = 0; y < row; y++) {
      for (let x = 0; x < list; x++) {
        let typeNum: number = 0,
          point: Point = { x, y };
        if (y === 0) {
          if (x === 0) {
            typeNum = 1;
          } else if (x === list - 1) {
            typeNum = 3;
          } else {
            typeNum = 2;
          }
        } else if (y === row - 1) {
          if (x === 0) {
            typeNum = 7;
          } else if (x === list - 1) {
            typeNum = 9;
          } else {
            typeNum = 8;
          }
        } else {
          if (x === 0) {
            typeNum = 4;
          } else if (x === list - 1) {
            typeNum = 6;
          } else {
            typeNum = 5;
          }
        }
        data.push({ typeNum, size, point });
      }
    }
    return data;
  }

  /**
   * 获取 pieceData 中的 item
   * @static
   * @param {IPiece[]} pieceData
   * @param {IPiece} piece
   * @returns {(IPiece | null)}
   * @memberof Tool
   */
  private static getArrItem(pieceData: IPiece[], piece: IPiece): IPiece | null {
    const item = pieceData.filter(it => {
      const {
        point: { x, y },
        type
      } = it;
      return piece.point.x === x && piece.point.y === y && piece.type === type;
    });
    return item[0] || null;
  }

  /**
   * 通过模板比较，判断黑方或白方胜利
   * @static
   * @param {IPiece[]} pieceData
   * @param {IPiece} piece
   * @returns 返回 piece | null
   * @memberof Tool
   */
  static core(pieceData: IPiece[], piece: IPiece) {
    const template: any[] = [[], [], [], []],
      { size, type, point } = piece;
    for (let i = -2; i < 3; i++) {
      template[0].push({ size, type, point: { x: point.x + i, y: point.y } });
      template[1].push({ size, type, point: { x: point.x, y: point.y + i } });
      template[2].push({
        size,
        type,
        point: { x: point.x + i, y: point.y + i }
      });
      template[3].push({
        size,
        type,
        point: { x: point.x - i, y: point.y + i }
      });
    }
    const is = template.some(rowArr => {
      const is = rowArr.every((it: IPiece) => {
        return this.getArrItem(pieceData, it) !== null;
      });
      return is;
    });
    return is ? piece : null;
  }
}
