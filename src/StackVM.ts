// スタックVMベースの数式評価エンジン

import { TokenType, RPNToken, EvaluationContext } from "./types"

export class StackVM {
  private stack: unknown[] = []
  private pc = 0 // プログラムカウンタ

  // RPNトークン列を評価
  evaluate(tokens: RPNToken[], context: EvaluationContext): unknown {
    this.stack = []
    this.pc = 0

    while (this.pc < tokens.length) {
      const token = tokens[this.pc]

      switch (token.type) {
        // 値をスタックにプッシュ
        case TokenType.NUMBER:
        case TokenType.STRING:
        case TokenType.BOOLEAN:
          this.stack.push(token.value)
          break

        // セル参照
        case TokenType.CELL_REF: {
          const cellRef = token.value as string
          const value = context.dependencies.get(cellRef)

          // セル値が見つからない場合は0として扱う
          if (value === undefined || value === null || value === "") {
            this.stack.push(0)
          } else {
            this.stack.push(this.normalizeValue(value))
          }
          break
        }

        // 算術演算子
        case TokenType.ADD: {
          const b = this.popNumber()
          const a = this.popNumber()
          this.stack.push(a + b)
          break
        }

        case TokenType.SUBTRACT: {
          const b = this.popNumber()
          const a = this.popNumber()
          this.stack.push(a - b)
          break
        }

        case TokenType.MULTIPLY: {
          const b = this.popNumber()
          const a = this.popNumber()
          this.stack.push(a * b)
          break
        }

        case TokenType.DIVIDE: {
          const b = this.popNumber()
          const a = this.popNumber()
          if (b === 0) {
            // ゼロ除算エラー
            throw new Error("#DIV/0!")
          }
          this.stack.push(a / b)
          break
        }

        // 比較演算子
        case TokenType.EQUAL: {
          const b = this.stack.pop()
          const a = this.stack.pop()
          this.stack.push(this.compareEqual(a, b))
          break
        }

        case TokenType.NOT_EQUAL: {
          const b = this.stack.pop()
          const a = this.stack.pop()
          this.stack.push(!this.compareEqual(a, b))
          break
        }

        case TokenType.LESS_THAN: {
          const b = this.popNumber()
          const a = this.popNumber()
          this.stack.push(a < b)
          break
        }

        case TokenType.GREATER_THAN: {
          const b = this.popNumber()
          const a = this.popNumber()
          this.stack.push(a > b)
          break
        }

        case TokenType.LESS_EQUAL: {
          const b = this.popNumber()
          const a = this.popNumber()
          this.stack.push(a <= b)
          break
        }

        case TokenType.GREATER_EQUAL: {
          const b = this.popNumber()
          const a = this.popNumber()
          this.stack.push(a >= b)
          break
        }

        // ジャンプ命令
        case TokenType.JUMP_IF_FALSE: {
          const condition = this.popBoolean()
          if (!condition) {
            this.pc += token.offset!
          }
          break
        }

        case TokenType.JUMP: {
          this.pc += token.offset!
          break
        }

        // 関数呼び出し
        case TokenType.FUNCTION_CALL: {
          const funcName = token.value as string
          const argCount = token.argCount!

          if (funcName === "SUM") {
            const args = this.popArgs(argCount)
            const result = this.sumFunction(args)
            this.stack.push(result)
          } else {
            throw new Error(`Unknown function: ${funcName}`)
          }
          break
        }

        default:
          throw new Error(`Unknown token type: ${token.type}`)
      }

      this.pc++
    }

    return this.stack.length > 0 ? this.stack[0] : undefined
  }

  // ヘルパー関数
  private popNumber(): number {
    const value = this.stack.pop()
    return this.toNumber(value)
  }

  private popBoolean(): boolean {
    const value = this.stack.pop()
    return this.toBoolean(value)
  }

  private popArgs(count: number): unknown[] {
    const args: unknown[] = []
    for (let i = 0; i < count; i++) {
      args.unshift(this.stack.pop())
    }
    return args
  }

  private toNumber(value: unknown): number {
    if (typeof value === "number") return value
    if (typeof value === "boolean") return value ? 1 : 0
    if (typeof value === "string") {
      const num = Number(value)
      return isNaN(num) ? 0 : num
    }
    if (value === null || value === undefined) return 0
    return 0
  }

  private toBoolean(value: unknown): boolean {
    if (typeof value === "boolean") return value
    if (typeof value === "number") return value !== 0
    if (typeof value === "string") return value !== ""
    if (value === null || value === undefined) return false
    return false
  }

  private compareEqual(a: unknown, b: unknown): boolean {
    // 型が同じ場合は直接比較
    if (typeof a === typeof b) {
      if (typeof a === "string" && typeof b === "string") {
        // 文字列の場合は大文字小文字を区別しない
        return a.toUpperCase() === b.toUpperCase()
      }
      return a === b
    }

    // 型が異なる場合は数値に変換して比較
    const numA = this.toNumber(a)
    const numB = this.toNumber(b)
    return numA === numB
  }

  private normalizeValue(value: unknown): unknown {
    if (value === null || value === undefined || value === "") return 0
    if (typeof value === "string") {
      // 文字列が数値の場合は変換
      const num = Number(value)
      if (!isNaN(num)) return num
    }
    return value
  }

  private sumFunction(args: unknown[]): number {
    let sum = 0
    for (const arg of args) {
      if (Array.isArray(arg)) {
        // 配列の場合は各要素を合計
        for (const v of arg) {
          sum += this.toNumber(v)
        }
      } else {
        sum += this.toNumber(arg)
      }
    }
    return sum
  }
}
