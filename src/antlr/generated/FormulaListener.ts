// Generated from Formula.g4 by ANTLR 4.13.2

import { ParseTreeListener } from "antlr4"

import { FormulaContext } from "./FormulaParser.js"
import { ExprContext } from "./FormulaParser.js"
import { AdditiveExprContext } from "./FormulaParser.js"
import { MultiplicativeExprContext } from "./FormulaParser.js"
import { UnaryExprContext } from "./FormulaParser.js"
import { PrimaryExprContext } from "./FormulaParser.js"
import { IfFunctionContext } from "./FormulaParser.js"
import { SumFunctionContext } from "./FormulaParser.js"
import { CellRefContext } from "./FormulaParser.js"
import { NumberExprContext } from "./FormulaParser.js"

/**
 * This interface defines a complete listener for a parse tree produced by
 * `FormulaParser`.
 */
export default class FormulaListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by `FormulaParser.formula`.
   * @param ctx the parse tree
   */
  enterFormula?: (ctx: FormulaContext) => void
  /**
   * Exit a parse tree produced by `FormulaParser.formula`.
   * @param ctx the parse tree
   */
  exitFormula?: (ctx: FormulaContext) => void
  /**
   * Enter a parse tree produced by `FormulaParser.expr`.
   * @param ctx the parse tree
   */
  enterExpr?: (ctx: ExprContext) => void
  /**
   * Exit a parse tree produced by `FormulaParser.expr`.
   * @param ctx the parse tree
   */
  exitExpr?: (ctx: ExprContext) => void
  /**
   * Enter a parse tree produced by `FormulaParser.additiveExpr`.
   * @param ctx the parse tree
   */
  enterAdditiveExpr?: (ctx: AdditiveExprContext) => void
  /**
   * Exit a parse tree produced by `FormulaParser.additiveExpr`.
   * @param ctx the parse tree
   */
  exitAdditiveExpr?: (ctx: AdditiveExprContext) => void
  /**
   * Enter a parse tree produced by `FormulaParser.multiplicativeExpr`.
   * @param ctx the parse tree
   */
  enterMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void
  /**
   * Exit a parse tree produced by `FormulaParser.multiplicativeExpr`.
   * @param ctx the parse tree
   */
  exitMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void
  /**
   * Enter a parse tree produced by `FormulaParser.unaryExpr`.
   * @param ctx the parse tree
   */
  enterUnaryExpr?: (ctx: UnaryExprContext) => void
  /**
   * Exit a parse tree produced by `FormulaParser.unaryExpr`.
   * @param ctx the parse tree
   */
  exitUnaryExpr?: (ctx: UnaryExprContext) => void
  /**
   * Enter a parse tree produced by `FormulaParser.primaryExpr`.
   * @param ctx the parse tree
   */
  enterPrimaryExpr?: (ctx: PrimaryExprContext) => void
  /**
   * Exit a parse tree produced by `FormulaParser.primaryExpr`.
   * @param ctx the parse tree
   */
  exitPrimaryExpr?: (ctx: PrimaryExprContext) => void
  /**
   * Enter a parse tree produced by `FormulaParser.ifFunction`.
   * @param ctx the parse tree
   */
  enterIfFunction?: (ctx: IfFunctionContext) => void
  /**
   * Exit a parse tree produced by `FormulaParser.ifFunction`.
   * @param ctx the parse tree
   */
  exitIfFunction?: (ctx: IfFunctionContext) => void
  /**
   * Enter a parse tree produced by `FormulaParser.sumFunction`.
   * @param ctx the parse tree
   */
  enterSumFunction?: (ctx: SumFunctionContext) => void
  /**
   * Exit a parse tree produced by `FormulaParser.sumFunction`.
   * @param ctx the parse tree
   */
  exitSumFunction?: (ctx: SumFunctionContext) => void
  /**
   * Enter a parse tree produced by `FormulaParser.cellRef`.
   * @param ctx the parse tree
   */
  enterCellRef?: (ctx: CellRefContext) => void
  /**
   * Exit a parse tree produced by `FormulaParser.cellRef`.
   * @param ctx the parse tree
   */
  exitCellRef?: (ctx: CellRefContext) => void
  /**
   * Enter a parse tree produced by `FormulaParser.numberExpr`.
   * @param ctx the parse tree
   */
  enterNumberExpr?: (ctx: NumberExprContext) => void
  /**
   * Exit a parse tree produced by `FormulaParser.numberExpr`.
   * @param ctx the parse tree
   */
  exitNumberExpr?: (ctx: NumberExprContext) => void
}
