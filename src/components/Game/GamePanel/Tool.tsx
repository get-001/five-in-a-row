import { IBack, Point, IPiece, PieceType } from "./types";

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
   * 通过坐标获取 pieceData 中的 item
   * @private
   * @static
   * @param {IPiece[]} pieceData
   * @param {Point} point 坐标
   * @param {PieceType} [pieceType] 更严格的筛选，
   * @returns {(IPiece | null)}
   * @memberof Tool
   */
  private static getArrItem(
    pieceData: IPiece[],
    point: Point,
    pieceType?: PieceType
  ): IPiece | null {
    const item = pieceData.filter(it => {
      const {
        point: { x, y },
        type
      } = it;
      let is = false;
      if (point.x === x && point.y === y) {
        is = true;
        if (pieceType !== undefined && type !== pieceType) is = false;
      }
      return is;
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
  static isVictory(pieceData: IPiece[], piece: IPiece) {
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
      return rowArr.every((it: IPiece) => {
        return this.getArrItem(pieceData, it.point, it.type) !== null;
      });
    });
    return is ? piece : null;
  }
  static judgeTheWinningSide(pieceData: IPiece[]): null | PieceType {
    const item =
      pieceData.filter(it => {
        return Tool.isVictory(pieceData, it);
      })[0] || null;
    return item && item.type;
  }
}
