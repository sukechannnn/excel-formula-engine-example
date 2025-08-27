import { StackVM } from "./StackVM"
import { TokenType, RPNToken, EvaluationContext } from "./types"

describe("StackVM", () => {
  let vm: StackVM
  let context: EvaluationContext

  beforeEach(() => {
    vm = new StackVM()
    context = {
      dependencies: new Map(),
    }
  })

  describe("基本的な値の評価", () => {
    it("数値を返す", () => {
      const tokens: RPNToken[] = [{ type: TokenType.NUMBER, value: 42 }]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(42)
    })

    it("文字列を返す", () => {
      const tokens: RPNToken[] = [{ type: TokenType.STRING, value: "hello" }]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe("hello")
    })

    it("ブール値を返す", () => {
      const tokens: RPNToken[] = [{ type: TokenType.BOOLEAN, value: true }]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(true)
    })
  })

  describe("セル参照", () => {
    it("セルの値を取得", () => {
      context.dependencies.set("A1", 10)
      const tokens: RPNToken[] = [{ type: TokenType.CELL_REF, value: "A1" }]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(10)
    })

    it("存在しないセルは0として扱う", () => {
      const tokens: RPNToken[] = [{ type: TokenType.CELL_REF, value: "B1" }]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(0)
    })

    it("文字列の数値は数値に変換", () => {
      context.dependencies.set("A1", "123")
      const tokens: RPNToken[] = [{ type: TokenType.CELL_REF, value: "A1" }]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(123)
    })
  })

  describe("四則演算", () => {
    it("加算: 2 + 3 = 5", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 2 },
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.ADD },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(5)
    })

    it("減算: 5 - 3 = 2", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 5 },
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.SUBTRACT },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(2)
    })

    it("乗算: 3 * 4 = 12", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.NUMBER, value: 4 },
        { type: TokenType.MULTIPLY },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(12)
    })

    it("除算: 10 / 2 = 5", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 10 },
        { type: TokenType.NUMBER, value: 2 },
        { type: TokenType.DIVIDE },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(5)
    })

    it("ゼロ除算はエラー", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 10 },
        { type: TokenType.NUMBER, value: 0 },
        { type: TokenType.DIVIDE },
      ]
      expect(() => vm.evaluate(tokens, context)).toThrow("#DIV/0!")
    })

    it("複合演算: 2 + 3 * 4 = 14", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 2 },
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.NUMBER, value: 4 },
        { type: TokenType.MULTIPLY },
        { type: TokenType.ADD },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(14)
    })
  })

  describe("比較演算", () => {
    it("等しい: 5 = 5", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 5 },
        { type: TokenType.NUMBER, value: 5 },
        { type: TokenType.EQUAL },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(true)
    })

    it("等しくない: 5 <> 3", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 5 },
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.NOT_EQUAL },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(true)
    })

    it("大なり: 5 > 3", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 5 },
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.GREATER_THAN },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(true)
    })

    it("小なり: 3 < 5", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.NUMBER, value: 5 },
        { type: TokenType.LESS_THAN },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(true)
    })

    it("文字列の比較（大文字小文字を区別しない）", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.STRING, value: "Hello" },
        { type: TokenType.STRING, value: "hello" },
        { type: TokenType.EQUAL },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(true)
    })
  })

  describe("SUM関数", () => {
    it("単一の引数", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 10 },
        { type: TokenType.FUNCTION_CALL, value: "SUM", argCount: 1 },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(10)
    })

    it("複数の引数", () => {
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 10 },
        { type: TokenType.NUMBER, value: 20 },
        { type: TokenType.NUMBER, value: 30 },
        { type: TokenType.FUNCTION_CALL, value: "SUM", argCount: 3 },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(60)
    })

    it("セル参照を含む", () => {
      context.dependencies.set("A1", 10)
      context.dependencies.set("B1", 20)
      const tokens: RPNToken[] = [
        { type: TokenType.CELL_REF, value: "A1" },
        { type: TokenType.CELL_REF, value: "B1" },
        { type: TokenType.NUMBER, value: 5 },
        { type: TokenType.FUNCTION_CALL, value: "SUM", argCount: 3 },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(35)
    })
  })

  describe("IF関数（ジャンプ命令）", () => {
    it("条件がtrueの場合", () => {
      // IF(5 > 3, 100, 200) => 100
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 5 },
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.GREATER_THAN },
        { type: TokenType.JUMP_IF_FALSE, offset: 2 },
        { type: TokenType.NUMBER, value: 100 },
        { type: TokenType.JUMP, offset: 1 },
        { type: TokenType.NUMBER, value: 200 },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(100)
    })

    it("条件がfalseの場合", () => {
      // IF(3 > 5, 100, 200) => 200
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.NUMBER, value: 5 },
        { type: TokenType.GREATER_THAN },
        { type: TokenType.JUMP_IF_FALSE, offset: 2 },
        { type: TokenType.NUMBER, value: 100 },
        { type: TokenType.JUMP, offset: 1 },
        { type: TokenType.NUMBER, value: 200 },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(200)
    })

    it("elseブランチがfalseの場合", () => {
      // IF(3 > 5, 100) => false
      const tokens: RPNToken[] = [
        { type: TokenType.NUMBER, value: 3 },
        { type: TokenType.NUMBER, value: 5 },
        { type: TokenType.GREATER_THAN },
        { type: TokenType.JUMP_IF_FALSE, offset: 2 },
        { type: TokenType.NUMBER, value: 100 },
        { type: TokenType.JUMP, offset: 1 },
        { type: TokenType.BOOLEAN, value: false },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(false)
    })
  })

  describe("複雑な式", () => {
    it("A1+B1*2 (A1=10, B1=3)", () => {
      context.dependencies.set("A1", 10)
      context.dependencies.set("B1", 3)
      const tokens: RPNToken[] = [
        { type: TokenType.CELL_REF, value: "A1" },
        { type: TokenType.CELL_REF, value: "B1" },
        { type: TokenType.NUMBER, value: 2 },
        { type: TokenType.MULTIPLY },
        { type: TokenType.ADD },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(16)
    })

    it("SUM(A1,B1)*2+IF(C1>0,10,0)", () => {
      context.dependencies.set("A1", 5)
      context.dependencies.set("B1", 10)
      context.dependencies.set("C1", 1)

      const tokens: RPNToken[] = [
        // SUM(A1,B1)
        { type: TokenType.CELL_REF, value: "A1" },
        { type: TokenType.CELL_REF, value: "B1" },
        { type: TokenType.FUNCTION_CALL, value: "SUM", argCount: 2 },
        // *2
        { type: TokenType.NUMBER, value: 2 },
        { type: TokenType.MULTIPLY },
        // IF(C1>0,10,0)
        { type: TokenType.CELL_REF, value: "C1" },
        { type: TokenType.NUMBER, value: 0 },
        { type: TokenType.GREATER_THAN },
        { type: TokenType.JUMP_IF_FALSE, offset: 2 },
        { type: TokenType.NUMBER, value: 10 },
        { type: TokenType.JUMP, offset: 1 },
        { type: TokenType.NUMBER, value: 0 },
        // +
        { type: TokenType.ADD },
      ]
      const result = vm.evaluate(tokens, context)
      expect(result).toBe(40) // (5+10)*2 + 10 = 30 + 10 = 40
    })
  })
})
