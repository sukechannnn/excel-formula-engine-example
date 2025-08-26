import { CharStream, CommonTokenStream } from "antlr4";
import FormulaLexer from "./antlr/generated/FormulaLexer";
import FormulaParser from "./antlr/generated/FormulaParser";
import { FormulaToRPNConverter } from "./FormulaToRPNConverter";
import { StackVM } from "./StackVM";
import { EvaluationContext } from "./types";

export function evaluate(formula: string, cellValues: Map<string, unknown>): unknown {
  // 入力ストリームを作成
  const inputStream = new CharStream(formula);
  const lexer = new FormulaLexer(inputStream);

  // トークンストリームを作成
  const tokenStream = new CommonTokenStream(lexer);

  // 構文解析
  const parser = new FormulaParser(tokenStream);
  const tree = parser.formula();

  // Parse Tree をRPNに変換
  const converter = new FormulaToRPNConverter();
  const ir = converter.convert(tree);

  // 評価コンテキストを作成
  const context: EvaluationContext = {
    dependencies: cellValues,
  };

  // StackVMで評価
  const vm = new StackVM();
  const result = vm.evaluate(ir.tokens, context);

  return result;
}
