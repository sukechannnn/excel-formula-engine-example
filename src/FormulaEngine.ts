import { CharStream, CommonTokenStream } from "antlr4"
import FormulaLexer from "./antlr/generated/FormulaLexer"
import FormulaParser from "./antlr/generated/FormulaParser"
import { FormulaToRPNConverter } from "./FormulaToRPNConverter"
import { StackVM } from "./StackVM"
import { EvaluationContext } from "./types"

export function evaluate(
  formula: string,
  cellValues: Map<string, unknown>
): unknown {
  // lexer 用の入力ストリーム (数式文字列 を 1 文字ずつ読み取れるようにしたもの) を用意
  const inputStream = new CharStream(formula)

  // 字句解析: 文字 → 記号（トークン）の並び
  const lexer = new FormulaLexer(inputStream)

  // parser 用のトークンストリーム (Lexer が生成したトークンを順番に並べて保持する) を用意
  const tokenStream = new CommonTokenStream(lexer)

  // 構文解析: トークン列 → 構文解析木
  const parser = new FormulaParser(tokenStream)
  const tree = parser.formula()

  // Parse Tree をRPNに変換
  const converter = new FormulaToRPNConverter()
  const ir = converter.convert(tree)

  // 評価コンテキストを作成
  const context: EvaluationContext = {
    dependencies: cellValues,
  }

  // StackVMで評価
  const vm = new StackVM()
  const result = vm.evaluate(ir.tokens, context)

  return result
}
