import { evaluate } from "./FormulaEngine";

describe("evaluate", () => {
  describe("セル参照", () => {
    it("数値を返す", () => {
      const result = evaluate("=42", new Map());
      expect(result).toBe(42);
    });

    it("セル参照の値を返す", () => {
      const cellValues = new Map([["A1", 100]]);
      const result = evaluate("=A1", cellValues);
      expect(result).toBe(100);
    });
  });

  describe("四則演算", () => {
    it("加算: 10 + 20 = 30", () => {
      const result = evaluate("=10+20", new Map());
      expect(result).toBe(30);
    });

    it("減算: 50 - 15 = 35", () => {
      const result = evaluate("=50-15", new Map());
      expect(result).toBe(35);
    });

    it("乗算: 6 * 7 = 42", () => {
      const result = evaluate("=6*7", new Map());
      expect(result).toBe(42);
    });

    it("除算: 100 / 4 = 25", () => {
      const result = evaluate("=100/4", new Map());
      expect(result).toBe(25);
    });

    it("複合演算（優先順位）: 10 + 5 * 2 = 20", () => {
      const result = evaluate("=10+5*2", new Map());
      expect(result).toBe(20);
    });

    it("括弧付き: (10 + 5) * 2 = 30", () => {
      const result = evaluate("=(10+5)*2", new Map());
      expect(result).toBe(30);
    });
  });

  describe("セル参照を含む計算", () => {
    it("A1 + B1 * 2", () => {
      const cellValues = new Map([
        ["A1", 10],
        ["B1", 3],
      ]);
      const result = evaluate("=A1+B1*2", cellValues);
      expect(result).toBe(16);
    });

    it("複数セルの計算", () => {
      const cellValues = new Map([
        ["A1", 20],
        ["B1", 30],
        ["C1", 2],
      ]);
      const result = evaluate("=(A1+B1)/C1", cellValues);
      expect(result).toBe(25);
    });

    it("存在しないセルは0として扱う", () => {
      const result = evaluate("=A1+10", new Map());
      expect(result).toBe(10);
    });
  });

  describe("比較演算", () => {
    it("大なり: 10 > 5 = true", () => {
      const result = evaluate("=10>5", new Map());
      expect(result).toBe(true);
    });

    it("小なり: 3 < 8 = true", () => {
      const result = evaluate("=3<8", new Map());
      expect(result).toBe(true);
    });

    it("以上: 10 >= 10 = true", () => {
      const result = evaluate("=10>=10", new Map());
      expect(result).toBe(true);
    });

    it("以下: 5 <= 3 = false", () => {
      const result = evaluate("=5<=3", new Map());
      expect(result).toBe(false);
    });

    it("等しい: 7 = 7 = true", () => {
      const result = evaluate("=7=7", new Map());
      expect(result).toBe(true);
    });

    it("等しくない: 5 <> 3 = true", () => {
      const result = evaluate("=5<>3", new Map());
      expect(result).toBe(true);
    });

    it("セル参照との比較", () => {
      const cellValues = new Map([["A1", 15]]);
      const result = evaluate("=A1>10", cellValues);
      expect(result).toBe(true);
    });
  });

  describe("SUM関数", () => {
    it("数値の合計", () => {
      const result = evaluate("=SUM(10,20,30)", new Map());
      expect(result).toBe(60);
    });

    it("セル参照を含む合計", () => {
      const cellValues = new Map([
        ["A1", 15],
        ["B1", 25],
      ]);
      const result = evaluate("=SUM(A1,B1,10)", cellValues);
      expect(result).toBe(50);
    });

    it("計算式を含む合計", () => {
      const cellValues = new Map([
        ["A1", 10],
        ["B1", 5],
      ]);
      const result = evaluate("=SUM(A1*2,B1+10)", cellValues);
      expect(result).toBe(35); // 20 + 15
    });

    it("引数なしのSUM", () => {
      const result = evaluate("=SUM()", new Map());
      expect(result).toBe(0);
    });

    it("単一引数のSUM", () => {
      const result = evaluate("=SUM(42)", new Map());
      expect(result).toBe(42);
    });
  });

  describe("IF関数", () => {
    it("条件がtrueの場合", () => {
      const result = evaluate("=IF(15>10,100,200)", new Map());
      expect(result).toBe(100);
    });

    it("条件がfalseの場合", () => {
      const result = evaluate("=IF(5>10,100,200)", new Map());
      expect(result).toBe(200);
    });

    it("セル参照を含む条件", () => {
      const cellValues = new Map([["A1", 20]]);
      const result = evaluate("=IF(A1>15,1,0)", cellValues);
      expect(result).toBe(1);
    });

    it("計算式を含む条件", () => {
      const cellValues = new Map([
        ["A1", 5],
        ["B1", 3],
      ]);
      const result = evaluate("=IF(A1+B1>7,100,200)", cellValues);
      expect(result).toBe(100);
    });

    it("elseブランチ省略（falseを返す）", () => {
      const result = evaluate("=IF(3>10,100)", new Map());
      expect(result).toBe(false);
    });

    it("ネストしたIF（外側true、内側true）", () => {
      const result = evaluate("=IF(10>5,IF(3>1,1,2),3)", new Map());
      expect(result).toBe(1);
    });

    it("ネストしたIF（外側true、内側false）", () => {
      const result = evaluate("=IF(10>5,IF(1>3,1,2),3)", new Map());
      expect(result).toBe(2);
    });

    it("ネストしたIF（外側false）", () => {
      const result = evaluate("=IF(5>10,IF(3>1,1,2),3)", new Map());
      expect(result).toBe(3);
    });
  });

  describe("複合的な式", () => {
    it("SUM関数と算術演算", () => {
      const cellValues = new Map([
        ["A1", 10],
        ["B1", 20],
      ]);
      const result = evaluate("=SUM(A1,B1)*2+10", cellValues);
      expect(result).toBe(70); // (10+20)*2+10
    });

    it("IF関数とSUM関数の組み合わせ", () => {
      const cellValues = new Map([
        ["A1", 10],
        ["B1", 15],
      ]);
      const result = evaluate("=IF(SUM(A1,B1)>20,100,0)", cellValues);
      expect(result).toBe(100);
    });

    it("複雑な条件式", () => {
      const cellValues = new Map([
        ["A1", 10],
        ["B1", 20],
        ["C1", 5],
      ]);
      const result = evaluate("=IF(A1+B1>25,SUM(A1,B1,C1),C1*2)", cellValues);
      expect(result).toBe(35); // 条件true: SUM(10,20,5)
    });
  });

  describe("単項演算子", () => {
    it("単項マイナス", () => {
      const result = evaluate("=-10", new Map());
      expect(result).toBe(-10);
    });

    it("単項プラス", () => {
      const result = evaluate("=+10", new Map());
      expect(result).toBe(10);
    });

    it("セル参照に単項マイナス", () => {
      const cellValues = new Map([["A1", 25]]);
      const result = evaluate("=-A1", cellValues);
      expect(result).toBe(-25);
    });

    it("計算式に単項マイナス", () => {
      const result = evaluate("=-(5+3)", new Map());
      expect(result).toBe(-8);
    });
  });

  describe("エラーケース", () => {
    it("ゼロ除算でエラーをスロー", () => {
      expect(() => evaluate("=10/0", new Map())).toThrow("#DIV/0!");
    });

    it("ゼロ除算（計算結果）", () => {
      expect(() => evaluate("=10/(5-5)", new Map())).toThrow("#DIV/0!");
    });
  });

  describe("エッジケース", () => {
    it("小数の計算", () => {
      const result = evaluate("=0.1+0.2", new Map());
      expect(result).toBeCloseTo(0.3);
    });

    it("大きな数値", () => {
      const result = evaluate("=1000000*1000000", new Map());
      expect(result).toBe(1000000000000);
    });

    it("深くネストした括弧", () => {
      const result = evaluate("=(((((1+1)*2)*2)*2)*2)", new Map());
      expect(result).toBe(32);
    });

    it("長い式", () => {
      const result = evaluate("=1+2+3+4+5+6+7+8+9+10", new Map());
      expect(result).toBe(55);
    });
  });
});
