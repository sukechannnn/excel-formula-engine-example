// ANTLR で生成した Parse Tree から逆ポーランド記法（RPN）への変換

import FormulaVisitor from "./antlr/generated/FormulaVisitor"
import { TokenType, RPNToken, IntermediateRepresentation } from "./types"
import type {
  FormulaContext,
  ExprContext,
  AdditiveExprContext,
  MultiplicativeExprContext,
  UnaryExprContext,
  PrimaryExprContext,
  CellRefContext,
  NumberExprContext,
  IfFunctionContext,
  SumFunctionContext,
} from "./antlr/generated/FormulaParser"

export class FormulaToRPNConverter extends FormulaVisitor<void> {
  private tokens: RPNToken[] = []
  private dependencies: Set<string> = new Set()

  // エントリーポイント
  convert(ctx: FormulaContext): IntermediateRepresentation {
    this.tokens = []
    this.dependencies = new Set()

    this.visit(ctx)
    return {
      tokens: this.tokens,
      dependencies: Array.from(this.dependencies),
    }
  }

  // 以下に実装してある visitXxx の処理に委譲する
  visitFormula = (ctx: FormulaContext): void => {
    const expr = ctx.expr()
    if (expr) {
      this.visit(expr)
    }
  }

  // Formula.g4 で定義した文法ルール expr に対応するノードを訪問したときに呼ばれる
  // 引数 ctx にはその expr ノードの情報が入っている
  visitExpr = (ctx: ExprContext): void => {
    const additiveExprs = ctx.additiveExpr_list()

    if (additiveExprs.length === 1) {
      // 比較演算子なし
      this.visit(additiveExprs[0])
    } else if (additiveExprs.length === 2) {
      // 比較演算子ありの場合は左右の式を先に評価
      this.visit(additiveExprs[0])
      this.visit(additiveExprs[1])

      if (ctx.GT()) {
        this.tokens.push({ type: TokenType.GREATER_THAN })
      } else if (ctx.LT()) {
        this.tokens.push({ type: TokenType.LESS_THAN })
      } else if (ctx.GTEQ()) {
        this.tokens.push({ type: TokenType.GREATER_EQUAL })
      } else if (ctx.LTEQ()) {
        this.tokens.push({ type: TokenType.LESS_EQUAL })
      } else if (ctx.EQ()) {
        this.tokens.push({ type: TokenType.EQUAL })
      } else if (ctx.NEQ()) {
        this.tokens.push({ type: TokenType.NOT_EQUAL })
      }
    }
  }

  // Formula.g4 で定義した文法ルール additiveExpr に対応するノードを訪問したときに呼ばれる
  // 引数 ctx にはその additiveExpr ノードの情報が入っている
  visitAdditiveExpr = (ctx: AdditiveExprContext): void => {
    // ANTLR4の左再帰処理
    const additiveExpr = ctx.additiveExpr()
    const multiplicativeExpr = ctx.multiplicativeExpr()

    if (additiveExpr && multiplicativeExpr) {
      // 左側の式を先に処理
      this.visit(additiveExpr)
      // 右側の式を処理
      this.visit(multiplicativeExpr)

      // 演算子を追加
      if (ctx.PLUS()) {
        this.tokens.push({ type: TokenType.ADD })
      } else if (ctx.MINUS()) {
        this.tokens.push({ type: TokenType.SUBTRACT })
      }
    } else if (multiplicativeExpr) {
      // 乗除算式のみの場合
      this.visit(multiplicativeExpr)
    }
  }

  // Formula.g4 で定義した文法ルール multiplicativeExpr に対応するノードを訪問したときに呼ばれる
  // 引数 ctx にはその multiplicativeExpr ノードの情報が入っている（以下同様）
  visitMultiplicativeExpr = (ctx: MultiplicativeExprContext): void => {
    // ANTLR4の左再帰処理
    const multiplicativeExpr = ctx.multiplicativeExpr()
    const unaryExpr = ctx.unaryExpr()

    if (multiplicativeExpr && unaryExpr) {
      // 左側の式を先に処理
      this.visit(multiplicativeExpr)
      // 右側の式を処理
      this.visit(unaryExpr)

      // 演算子を追加
      if (ctx.MUL()) {
        this.tokens.push({ type: TokenType.MULTIPLY })
      } else if (ctx.DIV()) {
        this.tokens.push({ type: TokenType.DIVIDE })
      }
    } else if (unaryExpr) {
      // 単項式のみの場合
      this.visit(unaryExpr)
    }
  }

  visitUnaryExpr = (ctx: UnaryExprContext): void => {
    // 単項マイナスの場合は、先に0をpush
    if (ctx.MINUS()) {
      this.tokens.push({ type: TokenType.NUMBER, value: 0 })
    }

    const primaryExpr = ctx.primaryExpr()
    if (primaryExpr) {
      this.visit(primaryExpr)
    }

    // 単項マイナスの場合は、最後に引き算演算子をpush
    if (ctx.MINUS()) {
      this.tokens.push({ type: TokenType.SUBTRACT })
    }
  }

  // visitPrimaryExpr は無くても動く（自動的に移譲される）が、分かりやすさのために記述している
  visitPrimaryExpr = (ctx: PrimaryExprContext): void => {
    // IF関数
    const ifFunction = ctx.ifFunction()
    if (ifFunction) {
      this.visit(ifFunction)
      return
    }

    // SUM関数
    const sumFunction = ctx.sumFunction()
    if (sumFunction) {
      this.visit(sumFunction)
      return
    }

    // セル参照
    const cellRef = ctx.cellRef()
    if (cellRef) {
      this.visit(cellRef)
      return
    }

    // 数値
    const numberExpr = ctx.numberExpr()
    if (numberExpr) {
      this.visit(numberExpr)
      return
    }

    // 括弧内の式
    const expr = ctx.expr()
    if (ctx.LPAREN() && expr) {
      this.visit(expr)
      return
    }
  }

  visitCellRef = (ctx: CellRefContext): void => {
    const ref = ctx.getText()

    // 通常のセル参照（シート参照なし）
    const cleanRef = ref.replace(/\$/g, "")
    this.dependencies.add(cleanRef)
    this.tokens.push({ type: TokenType.CELL_REF, value: cleanRef })
  }

  visitNumberExpr = (ctx: NumberExprContext): void => {
    const value = parseFloat(ctx.getText())
    this.tokens.push({ type: TokenType.NUMBER, value })
  }

  visitSumFunction = (ctx: SumFunctionContext): void => {
    const exprs = ctx.expr_list()

    if (exprs && exprs.length > 0) {
      // 各引数を評価
      for (const expr of exprs) {
        this.visit(expr)
      }

      // SUM関数呼び出し（引数の数を記録）
      this.tokens.push({
        type: TokenType.FUNCTION_CALL,
        value: "SUM",
        argCount: exprs.length,
      })
    } else {
      // 引数なしの場合は0を返す
      this.tokens.push({ type: TokenType.NUMBER, value: 0 })
    }
  }

  visitIfFunction = (ctx: IfFunctionContext): void => {
    const exprs = ctx.expr_list()
    if (!exprs || exprs.length === 0) return

    // 条件式を評価
    this.visit(exprs[0])

    // 条件がfalseならelseブランチへジャンプ
    const jumpToElseIndex = this.tokens.length
    this.tokens.push({ type: TokenType.JUMP_IF_FALSE, offset: 0 }) // 後で更新

    // thenブランチ
    if (exprs[1]) {
      this.visit(exprs[1])
    }

    // elseブランチをスキップ
    const jumpToEndIndex = this.tokens.length
    this.tokens.push({ type: TokenType.JUMP, offset: 0 }) // 後で更新

    // elseブランチの開始位置
    const elseStartIndex = this.tokens.length

    // elseブランチ（省略可能）
    if (exprs.length > 2 && exprs[2]) {
      this.visit(exprs[2])
    } else {
      this.tokens.push({ type: TokenType.BOOLEAN, value: false })
    }

    // ジャンプオフセットを更新
    this.tokens[jumpToElseIndex].offset = elseStartIndex - jumpToElseIndex - 1
    this.tokens[jumpToEndIndex].offset = this.tokens.length - jumpToEndIndex - 1
  }
}
