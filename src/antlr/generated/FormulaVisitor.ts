// Generated from Formula.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { FormulaContext } from "./FormulaParser.js";
import { ExprContext } from "./FormulaParser.js";
import { AdditiveExprContext } from "./FormulaParser.js";
import { MultiplicativeExprContext } from "./FormulaParser.js";
import { UnaryExprContext } from "./FormulaParser.js";
import { PrimaryExprContext } from "./FormulaParser.js";
import { IfFunctionContext } from "./FormulaParser.js";
import { SumFunctionContext } from "./FormulaParser.js";
import { CellRefContext } from "./FormulaParser.js";
import { NumberExprContext } from "./FormulaParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `FormulaParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class FormulaVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `FormulaParser.formula`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormula?: (ctx: FormulaContext) => Result;
	/**
	 * Visit a parse tree produced by `FormulaParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;
	/**
	 * Visit a parse tree produced by `FormulaParser.additiveExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpr?: (ctx: AdditiveExprContext) => Result;
	/**
	 * Visit a parse tree produced by `FormulaParser.multiplicativeExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => Result;
	/**
	 * Visit a parse tree produced by `FormulaParser.unaryExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryExpr?: (ctx: UnaryExprContext) => Result;
	/**
	 * Visit a parse tree produced by `FormulaParser.primaryExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimaryExpr?: (ctx: PrimaryExprContext) => Result;
	/**
	 * Visit a parse tree produced by `FormulaParser.ifFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfFunction?: (ctx: IfFunctionContext) => Result;
	/**
	 * Visit a parse tree produced by `FormulaParser.sumFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSumFunction?: (ctx: SumFunctionContext) => Result;
	/**
	 * Visit a parse tree produced by `FormulaParser.cellRef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCellRef?: (ctx: CellRefContext) => Result;
	/**
	 * Visit a parse tree produced by `FormulaParser.numberExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberExpr?: (ctx: NumberExprContext) => Result;
}

