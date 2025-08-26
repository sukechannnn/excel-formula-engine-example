import { CharStream, CommonTokenStream } from "antlr4";
import FormulaLexer from "./antlr/generated/FormulaLexer";
import FormulaParser from "./antlr/generated/FormulaParser";
import { FormulaToRPNConverter } from "./FormulaToRPNConverter";
import { TokenType } from "./types";

describe("FormulaToRPNConverter", () => {
  function parseAndConvert(formula: string) {
    const inputStream = new CharStream(formula);
    const lexer = new FormulaLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new FormulaParser(tokenStream);
    const tree = parser.formula();
    
    const converter = new FormulaToRPNConverter();
    return converter.convert(tree);
  }

  describe("基本的な数式", () => {
    it("数値のみ", () => {
      const result = parseAndConvert("=42");
      expect(result.tokens).toEqual([
        { type: TokenType.NUMBER, value: 42 }
      ]);
      expect(result.dependencies).toEqual([]);
    });

    it("セル参照のみ", () => {
      const result = parseAndConvert("=A1");
      expect(result.tokens).toEqual([
        { type: TokenType.CELL_REF, value: "A1" }
      ]);
      expect(result.dependencies).toEqual(["A1"]);
    });
  });

  describe("四則演算", () => {
    it("加算", () => {
      const result = parseAndConvert("=1+2");
      expect(result.tokens).toEqual([
        { type: TokenType.NUMBER, value: 1 },
        { type: TokenType.NUMBER, value: 2 },
        { type: TokenType.ADD }
      ]);
    });

    it("減算", () => {
      const result = parseAndConvert("=5-3");
      expect(result.tokens).toEqual([
        { type: TokenType.NUMBER, value: 5 },
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.SUBTRACT }
      ]);
    });

    it("乗算", () => {
      const result = parseAndConvert("=3*4");
      expect(result.tokens).toEqual([
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.NUMBER, value: 4 },
        { type: TokenType.MULTIPLY }
      ]);
    });

    it("除算", () => {
      const result = parseAndConvert("=10/2");
      expect(result.tokens).toEqual([
        { type: TokenType.NUMBER, value: 10 },
        { type: TokenType.NUMBER, value: 2 },
        { type: TokenType.DIVIDE }
      ]);
    });

    it("複合演算（優先順位）", () => {
      const result = parseAndConvert("=2+3*4");
      expect(result.tokens).toEqual([
        { type: TokenType.NUMBER, value: 2 },
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.NUMBER, value: 4 },
        { type: TokenType.MULTIPLY },
        { type: TokenType.ADD }
      ]);
    });

    it("括弧を含む式", () => {
      const result = parseAndConvert("=(2+3)*4");
      expect(result.tokens).toEqual([
        { type: TokenType.NUMBER, value: 2 },
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.ADD },
        { type: TokenType.NUMBER, value: 4 },
        { type: TokenType.MULTIPLY }
      ]);
    });
  });

  describe("セル参照を含む演算", () => {
    it("A1+B1*2", () => {
      const result = parseAndConvert("=A1+B1*2");
      expect(result.tokens).toEqual([
        { type: TokenType.CELL_REF, value: "A1" },
        { type: TokenType.CELL_REF, value: "B1" },
        { type: TokenType.NUMBER, value: 2 },
        { type: TokenType.MULTIPLY },
        { type: TokenType.ADD }
      ]);
      expect(result.dependencies).toEqual(["A1", "B1"]);
    });
  });

  describe("比較演算", () => {
    it("大なり", () => {
      const result = parseAndConvert("=A1>10");
      expect(result.tokens).toEqual([
        { type: TokenType.CELL_REF, value: "A1" },
        { type: TokenType.NUMBER, value: 10 },
        { type: TokenType.GREATER_THAN }
      ]);
    });

    it("小なり", () => {
      const result = parseAndConvert("=A1<10");
      expect(result.tokens).toEqual([
        { type: TokenType.CELL_REF, value: "A1" },
        { type: TokenType.NUMBER, value: 10 },
        { type: TokenType.LESS_THAN }
      ]);
    });

    it("等しい", () => {
      const result = parseAndConvert("=A1=10");
      expect(result.tokens).toEqual([
        { type: TokenType.CELL_REF, value: "A1" },
        { type: TokenType.NUMBER, value: 10 },
        { type: TokenType.EQUAL }
      ]);
    });
  });

  describe("SUM関数", () => {
    it("単一の引数", () => {
      const result = parseAndConvert("=SUM(A1)");
      expect(result.tokens).toEqual([
        { type: TokenType.CELL_REF, value: "A1" },
        { type: TokenType.FUNCTION_CALL, value: "SUM", argCount: 1 }
      ]);
    });

    it("複数の引数", () => {
      const result = parseAndConvert("=SUM(A1,B1,10)");
      expect(result.tokens).toEqual([
        { type: TokenType.CELL_REF, value: "A1" },
        { type: TokenType.CELL_REF, value: "B1" },
        { type: TokenType.NUMBER, value: 10 },
        { type: TokenType.FUNCTION_CALL, value: "SUM", argCount: 3 }
      ]);
    });

    it("引数なし", () => {
      const result = parseAndConvert("=SUM()");
      expect(result.tokens).toEqual([
        { type: TokenType.NUMBER, value: 0 }
      ]);
    });

    it("計算式を含む引数", () => {
      const result = parseAndConvert("=SUM(A1+B1, C1*2)");
      expect(result.tokens).toEqual([
        { type: TokenType.CELL_REF, value: "A1" },
        { type: TokenType.CELL_REF, value: "B1" },
        { type: TokenType.ADD },
        { type: TokenType.CELL_REF, value: "C1" },
        { type: TokenType.NUMBER, value: 2 },
        { type: TokenType.MULTIPLY },
        { type: TokenType.FUNCTION_CALL, value: "SUM", argCount: 2 }
      ]);
    });
  });

  describe("IF関数", () => {
    it("基本的なIF文", () => {
      const result = parseAndConvert("=IF(A1>10, 100, 0)");
      const tokens = result.tokens;
      
      // 条件式
      expect(tokens[0]).toEqual({ type: TokenType.CELL_REF, value: "A1" });
      expect(tokens[1]).toEqual({ type: TokenType.NUMBER, value: 10 });
      expect(tokens[2]).toEqual({ type: TokenType.GREATER_THAN });
      
      // JUMP_IF_FALSE
      expect(tokens[3].type).toBe(TokenType.JUMP_IF_FALSE);
      expect(tokens[3].offset).toBe(2); // 100とJUMPをスキップ
      
      // thenブランチ
      expect(tokens[4]).toEqual({ type: TokenType.NUMBER, value: 100 });
      
      // JUMP
      expect(tokens[5].type).toBe(TokenType.JUMP);
      expect(tokens[5].offset).toBe(1); // elseブランチをスキップ
      
      // elseブランチ
      expect(tokens[6]).toEqual({ type: TokenType.NUMBER, value: 0 });
    });

    it("elseブランチ省略", () => {
      const result = parseAndConvert("=IF(A1>10, 100)");
      const tokens = result.tokens;
      
      // elseブランチがfalseになることを確認
      expect(tokens[6]).toEqual({ type: TokenType.BOOLEAN, value: false });
    });

    it("ネストしたIF", () => {
      const result = parseAndConvert("=IF(A1>10, IF(B1>5, 1, 2), 3)");
      expect(result.dependencies).toEqual(["A1", "B1"]);
      
      // トークンが正しく生成されていることを確認
      const hasNestedJumps = result.tokens.filter(t => 
        t.type === TokenType.JUMP_IF_FALSE || t.type === TokenType.JUMP
      ).length;
      expect(hasNestedJumps).toBe(4); // 外側IF×2 + 内側IF×2
    });
  });

  describe("単項演算子", () => {
    it("単項マイナス", () => {
      const result = parseAndConvert("=-5");
      expect(result.tokens).toEqual([
        { type: TokenType.NUMBER, value: 0 },
        { type: TokenType.NUMBER, value: 5 },
        { type: TokenType.SUBTRACT }
      ]);
    });

    it("単項プラス", () => {
      const result = parseAndConvert("=+5");
      expect(result.tokens).toEqual([
        { type: TokenType.NUMBER, value: 5 }
      ]);
    });

    it("セル参照に単項マイナス", () => {
      const result = parseAndConvert("=-A1");
      expect(result.tokens).toEqual([
        { type: TokenType.NUMBER, value: 0 },
        { type: TokenType.CELL_REF, value: "A1" },
        { type: TokenType.SUBTRACT }
      ]);
    });
  });

  describe("複雑な式", () => {
    it("関数と演算の組み合わせ", () => {
      const result = parseAndConvert("=SUM(A1,B1)*2+IF(C1>0,10,0)");
      expect(result.dependencies).toEqual(["A1", "B1", "C1"]);
      
      // SUMの処理
      expect(result.tokens[0]).toEqual({ type: TokenType.CELL_REF, value: "A1" });
      expect(result.tokens[1]).toEqual({ type: TokenType.CELL_REF, value: "B1" });
      expect(result.tokens[2]).toEqual({ type: TokenType.FUNCTION_CALL, value: "SUM", argCount: 2 });
      
      // *2の処理
      expect(result.tokens[3]).toEqual({ type: TokenType.NUMBER, value: 2 });
      expect(result.tokens[4]).toEqual({ type: TokenType.MULTIPLY });
      
      // IFの処理が続く
      expect(result.tokens[5]).toEqual({ type: TokenType.CELL_REF, value: "C1" });
    });
  });
});