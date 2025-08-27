// 数式エンジンの型定義

// RPN（逆ポーランド記法）のトークン種別
export enum TokenType {
  // 値
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  CELL_REF = "CELL_REF",
  RANGE_REF = "RANGE_REF",
  ERROR = "ERROR",

  // 演算子
  ADD = "ADD",
  SUBTRACT = "SUBTRACT",
  MULTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",

  // 比較演算子
  EQUAL = "EQUAL",
  NOT_EQUAL = "NOT_EQUAL",
  LESS_THAN = "LESS_THAN",
  GREATER_THAN = "GREATER_THAN",
  LESS_EQUAL = "LESS_EQUAL",
  GREATER_EQUAL = "GREATER_EQUAL",

  // 関数
  IF = "IF",
  SUM = "SUM",

  // 制御
  JUMP_IF_FALSE = "JUMP_IF_FALSE",
  JUMP = "JUMP",
  FUNCTION_CALL = "FUNCTION_CALL",
}

// RPNトークン
export interface RPNToken {
  type: TokenType
  value?: unknown
  argCount?: number // 関数の引数数
  offset?: number // ジャンプ命令のオフセット
}

// 中間表現（IR）
export interface IntermediateRepresentation {
  tokens: RPNToken[]
  dependencies: string[]
}

// 評価コンテキスト
export interface EvaluationContext {
  dependencies: Map<string, unknown>
}
