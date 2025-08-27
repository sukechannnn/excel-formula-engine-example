// Generated from Formula.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
  ATN,
  ATNDeserializer,
  DecisionState,
  DFA,
  FailedPredicateException,
  RecognitionException,
  NoViableAltException,
  BailErrorStrategy,
  Parser,
  ParserATNSimulator,
  RuleContext,
  ParserRuleContext,
  PredictionMode,
  PredictionContextCache,
  TerminalNode,
  RuleNode,
  Token,
  TokenStream,
  Interval,
  IntervalSet,
} from "antlr4"
import FormulaListener from "./FormulaListener.js"
import FormulaVisitor from "./FormulaVisitor.js"

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number

export default class FormulaParser extends Parser {
  public static readonly IF = 1
  public static readonly SUM = 2
  public static readonly EQ = 3
  public static readonly NEQ = 4
  public static readonly GTEQ = 5
  public static readonly LTEQ = 6
  public static readonly GT = 7
  public static readonly LT = 8
  public static readonly PLUS = 9
  public static readonly MINUS = 10
  public static readonly MUL = 11
  public static readonly DIV = 12
  public static readonly LPAREN = 13
  public static readonly RPAREN = 14
  public static readonly COMMA = 15
  public static readonly CELL_REF = 16
  public static readonly NUMBER = 17
  public static readonly WS = 18
  public static override readonly EOF = Token.EOF
  public static readonly RULE_formula = 0
  public static readonly RULE_expr = 1
  public static readonly RULE_additiveExpr = 2
  public static readonly RULE_multiplicativeExpr = 3
  public static readonly RULE_unaryExpr = 4
  public static readonly RULE_primaryExpr = 5
  public static readonly RULE_ifFunction = 6
  public static readonly RULE_sumFunction = 7
  public static readonly RULE_cellRef = 8
  public static readonly RULE_numberExpr = 9
  public static readonly literalNames: (string | null)[] = [
    null,
    null,
    null,
    "'='",
    "'<>'",
    "'>='",
    "'<='",
    "'>'",
    "'<'",
    "'+'",
    "'-'",
    "'*'",
    "'/'",
    "'('",
    "')'",
    "','",
  ]
  public static readonly symbolicNames: (string | null)[] = [
    null,
    "IF",
    "SUM",
    "EQ",
    "NEQ",
    "GTEQ",
    "LTEQ",
    "GT",
    "LT",
    "PLUS",
    "MINUS",
    "MUL",
    "DIV",
    "LPAREN",
    "RPAREN",
    "COMMA",
    "CELL_REF",
    "NUMBER",
    "WS",
  ]
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    "formula",
    "expr",
    "additiveExpr",
    "multiplicativeExpr",
    "unaryExpr",
    "primaryExpr",
    "ifFunction",
    "sumFunction",
    "cellRef",
    "numberExpr",
  ]
  public get grammarFileName(): string {
    return "Formula.g4"
  }
  public get literalNames(): (string | null)[] {
    return FormulaParser.literalNames
  }
  public get symbolicNames(): (string | null)[] {
    return FormulaParser.symbolicNames
  }
  public get ruleNames(): string[] {
    return FormulaParser.ruleNames
  }
  public get serializedATN(): number[] {
    return FormulaParser._serializedATN
  }

  protected createFailedPredicateException(
    predicate?: string,
    message?: string
  ): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message)
  }

  constructor(input: TokenStream) {
    super(input)
    this._interp = new ParserATNSimulator(
      this,
      FormulaParser._ATN,
      FormulaParser.DecisionsToDFA,
      new PredictionContextCache()
    )
  }
  // @RuleVersion(0)
  public formula(): FormulaContext {
    let localctx: FormulaContext = new FormulaContext(
      this,
      this._ctx,
      this.state
    )
    this.enterRule(localctx, 0, FormulaParser.RULE_formula)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 21
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === 3) {
          {
            this.state = 20
            this.match(FormulaParser.EQ)
          }
        }

        this.state = 23
        this.expr()
        this.state = 24
        this.match(FormulaParser.EOF)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public expr(): ExprContext {
    let localctx: ExprContext = new ExprContext(this, this._ctx, this.state)
    this.enterRule(localctx, 2, FormulaParser.RULE_expr)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 26
        this.additiveExpr(0)
        this.state = 29
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if ((_la & ~0x1f) === 0 && ((1 << _la) & 504) !== 0) {
          {
            this.state = 27
            _la = this._input.LA(1)
            if (!((_la & ~0x1f) === 0 && ((1 << _la) & 504) !== 0)) {
              this._errHandler.recoverInline(this)
            } else {
              this._errHandler.reportMatch(this)
              this.consume()
            }
            this.state = 28
            this.additiveExpr(0)
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }

  public additiveExpr(): AdditiveExprContext
  public additiveExpr(_p: number): AdditiveExprContext
  // @RuleVersion(0)
  public additiveExpr(_p?: number): AdditiveExprContext {
    if (_p === undefined) {
      _p = 0
    }

    let _parentctx: ParserRuleContext = this._ctx
    let _parentState: number = this.state
    let localctx: AdditiveExprContext = new AdditiveExprContext(
      this,
      this._ctx,
      _parentState
    )
    let _prevctx: AdditiveExprContext = localctx
    let _startState: number = 4
    this.enterRecursionRule(localctx, 4, FormulaParser.RULE_additiveExpr, _p)
    let _la: number
    try {
      let _alt: number
      this.enterOuterAlt(localctx, 1)
      {
        {
          this.state = 32
          this.multiplicativeExpr(0)
        }
        this._ctx.stop = this._input.LT(-1)
        this.state = 39
        this._errHandler.sync(this)
        _alt = this._interp.adaptivePredict(this._input, 2, this._ctx)
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent()
            }
            _prevctx = localctx
            {
              {
                localctx = new AdditiveExprContext(
                  this,
                  _parentctx,
                  _parentState
                )
                this.pushNewRecursionContext(
                  localctx,
                  _startState,
                  FormulaParser.RULE_additiveExpr
                )
                this.state = 34
                if (!this.precpred(this._ctx, 2)) {
                  throw this.createFailedPredicateException(
                    "this.precpred(this._ctx, 2)"
                  )
                }
                this.state = 35
                _la = this._input.LA(1)
                if (!(_la === 9 || _la === 10)) {
                  this._errHandler.recoverInline(this)
                } else {
                  this._errHandler.reportMatch(this)
                  this.consume()
                }
                this.state = 36
                this.multiplicativeExpr(0)
              }
            }
          }
          this.state = 41
          this._errHandler.sync(this)
          _alt = this._interp.adaptivePredict(this._input, 2, this._ctx)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.unrollRecursionContexts(_parentctx)
    }
    return localctx
  }

  public multiplicativeExpr(): MultiplicativeExprContext
  public multiplicativeExpr(_p: number): MultiplicativeExprContext
  // @RuleVersion(0)
  public multiplicativeExpr(_p?: number): MultiplicativeExprContext {
    if (_p === undefined) {
      _p = 0
    }

    let _parentctx: ParserRuleContext = this._ctx
    let _parentState: number = this.state
    let localctx: MultiplicativeExprContext = new MultiplicativeExprContext(
      this,
      this._ctx,
      _parentState
    )
    let _prevctx: MultiplicativeExprContext = localctx
    let _startState: number = 6
    this.enterRecursionRule(
      localctx,
      6,
      FormulaParser.RULE_multiplicativeExpr,
      _p
    )
    let _la: number
    try {
      let _alt: number
      this.enterOuterAlt(localctx, 1)
      {
        {
          this.state = 43
          this.unaryExpr()
        }
        this._ctx.stop = this._input.LT(-1)
        this.state = 50
        this._errHandler.sync(this)
        _alt = this._interp.adaptivePredict(this._input, 3, this._ctx)
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent()
            }
            _prevctx = localctx
            {
              {
                localctx = new MultiplicativeExprContext(
                  this,
                  _parentctx,
                  _parentState
                )
                this.pushNewRecursionContext(
                  localctx,
                  _startState,
                  FormulaParser.RULE_multiplicativeExpr
                )
                this.state = 45
                if (!this.precpred(this._ctx, 2)) {
                  throw this.createFailedPredicateException(
                    "this.precpred(this._ctx, 2)"
                  )
                }
                this.state = 46
                _la = this._input.LA(1)
                if (!(_la === 11 || _la === 12)) {
                  this._errHandler.recoverInline(this)
                } else {
                  this._errHandler.reportMatch(this)
                  this.consume()
                }
                this.state = 47
                this.unaryExpr()
              }
            }
          }
          this.state = 52
          this._errHandler.sync(this)
          _alt = this._interp.adaptivePredict(this._input, 3, this._ctx)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.unrollRecursionContexts(_parentctx)
    }
    return localctx
  }
  // @RuleVersion(0)
  public unaryExpr(): UnaryExprContext {
    let localctx: UnaryExprContext = new UnaryExprContext(
      this,
      this._ctx,
      this.state
    )
    this.enterRule(localctx, 8, FormulaParser.RULE_unaryExpr)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 54
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === 9 || _la === 10) {
          {
            this.state = 53
            _la = this._input.LA(1)
            if (!(_la === 9 || _la === 10)) {
              this._errHandler.recoverInline(this)
            } else {
              this._errHandler.reportMatch(this)
              this.consume()
            }
          }
        }

        this.state = 56
        this.primaryExpr()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public primaryExpr(): PrimaryExprContext {
    let localctx: PrimaryExprContext = new PrimaryExprContext(
      this,
      this._ctx,
      this.state
    )
    this.enterRule(localctx, 10, FormulaParser.RULE_primaryExpr)
    try {
      this.state = 66
      this._errHandler.sync(this)
      switch (this._input.LA(1)) {
        case 1:
          this.enterOuterAlt(localctx, 1)
          {
            this.state = 58
            this.ifFunction()
          }
          break
        case 2:
          this.enterOuterAlt(localctx, 2)
          {
            this.state = 59
            this.sumFunction()
          }
          break
        case 16:
          this.enterOuterAlt(localctx, 3)
          {
            this.state = 60
            this.cellRef()
          }
          break
        case 17:
          this.enterOuterAlt(localctx, 4)
          {
            this.state = 61
            this.numberExpr()
          }
          break
        case 13:
          this.enterOuterAlt(localctx, 5)
          {
            this.state = 62
            this.match(FormulaParser.LPAREN)
            this.state = 63
            this.expr()
            this.state = 64
            this.match(FormulaParser.RPAREN)
          }
          break
        default:
          throw new NoViableAltException(this)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public ifFunction(): IfFunctionContext {
    let localctx: IfFunctionContext = new IfFunctionContext(
      this,
      this._ctx,
      this.state
    )
    this.enterRule(localctx, 12, FormulaParser.RULE_ifFunction)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 68
        this.match(FormulaParser.IF)
        this.state = 69
        this.match(FormulaParser.LPAREN)
        this.state = 70
        this.expr()
        this.state = 71
        this.match(FormulaParser.COMMA)
        this.state = 72
        this.expr()
        this.state = 75
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === 15) {
          {
            this.state = 73
            this.match(FormulaParser.COMMA)
            this.state = 74
            this.expr()
          }
        }

        this.state = 77
        this.match(FormulaParser.RPAREN)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public sumFunction(): SumFunctionContext {
    let localctx: SumFunctionContext = new SumFunctionContext(
      this,
      this._ctx,
      this.state
    )
    this.enterRule(localctx, 14, FormulaParser.RULE_sumFunction)
    let _la: number
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 79
        this.match(FormulaParser.SUM)
        this.state = 80
        this.match(FormulaParser.LPAREN)
        this.state = 89
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if ((_la & ~0x1f) === 0 && ((1 << _la) & 206342) !== 0) {
          {
            this.state = 81
            this.expr()
            this.state = 86
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            while (_la === 15) {
              {
                {
                  this.state = 82
                  this.match(FormulaParser.COMMA)
                  this.state = 83
                  this.expr()
                }
              }
              this.state = 88
              this._errHandler.sync(this)
              _la = this._input.LA(1)
            }
          }
        }

        this.state = 91
        this.match(FormulaParser.RPAREN)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public cellRef(): CellRefContext {
    let localctx: CellRefContext = new CellRefContext(
      this,
      this._ctx,
      this.state
    )
    this.enterRule(localctx, 16, FormulaParser.RULE_cellRef)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 93
        this.match(FormulaParser.CELL_REF)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }
  // @RuleVersion(0)
  public numberExpr(): NumberExprContext {
    let localctx: NumberExprContext = new NumberExprContext(
      this,
      this._ctx,
      this.state
    )
    this.enterRule(localctx, 18, FormulaParser.RULE_numberExpr)
    try {
      this.enterOuterAlt(localctx, 1)
      {
        this.state = 95
        this.match(FormulaParser.NUMBER)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return localctx
  }

  public sempred(
    localctx: RuleContext,
    ruleIndex: number,
    predIndex: number
  ): boolean {
    switch (ruleIndex) {
      case 2:
        return this.additiveExpr_sempred(
          localctx as AdditiveExprContext,
          predIndex
        )
      case 3:
        return this.multiplicativeExpr_sempred(
          localctx as MultiplicativeExprContext,
          predIndex
        )
    }
    return true
  }
  private additiveExpr_sempred(
    localctx: AdditiveExprContext,
    predIndex: number
  ): boolean {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 2)
    }
    return true
  }
  private multiplicativeExpr_sempred(
    localctx: MultiplicativeExprContext,
    predIndex: number
  ): boolean {
    switch (predIndex) {
      case 1:
        return this.precpred(this._ctx, 2)
    }
    return true
  }

  public static readonly _serializedATN: number[] = [
    4, 1, 18, 98, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2,
    5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 1, 0, 3, 0, 22, 8,
    0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 3, 1, 30, 8, 1, 1, 2, 1, 2, 1, 2, 1,
    2, 1, 2, 1, 2, 5, 2, 38, 8, 2, 10, 2, 12, 2, 41, 9, 2, 1, 3, 1, 3, 1, 3, 1,
    3, 1, 3, 1, 3, 5, 3, 49, 8, 3, 10, 3, 12, 3, 52, 9, 3, 1, 4, 3, 4, 55, 8, 4,
    1, 4, 1, 4, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5, 67, 8, 5,
    1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 3, 6, 76, 8, 6, 1, 6, 1, 6, 1, 7,
    1, 7, 1, 7, 1, 7, 1, 7, 5, 7, 85, 8, 7, 10, 7, 12, 7, 88, 9, 7, 3, 7, 90, 8,
    7, 1, 7, 1, 7, 1, 8, 1, 8, 1, 9, 1, 9, 1, 9, 0, 2, 4, 6, 10, 0, 2, 4, 6, 8,
    10, 12, 14, 16, 18, 0, 3, 1, 0, 3, 8, 1, 0, 9, 10, 1, 0, 11, 12, 99, 0, 21,
    1, 0, 0, 0, 2, 26, 1, 0, 0, 0, 4, 31, 1, 0, 0, 0, 6, 42, 1, 0, 0, 0, 8, 54,
    1, 0, 0, 0, 10, 66, 1, 0, 0, 0, 12, 68, 1, 0, 0, 0, 14, 79, 1, 0, 0, 0, 16,
    93, 1, 0, 0, 0, 18, 95, 1, 0, 0, 0, 20, 22, 5, 3, 0, 0, 21, 20, 1, 0, 0, 0,
    21, 22, 1, 0, 0, 0, 22, 23, 1, 0, 0, 0, 23, 24, 3, 2, 1, 0, 24, 25, 5, 0, 0,
    1, 25, 1, 1, 0, 0, 0, 26, 29, 3, 4, 2, 0, 27, 28, 7, 0, 0, 0, 28, 30, 3, 4,
    2, 0, 29, 27, 1, 0, 0, 0, 29, 30, 1, 0, 0, 0, 30, 3, 1, 0, 0, 0, 31, 32, 6,
    2, -1, 0, 32, 33, 3, 6, 3, 0, 33, 39, 1, 0, 0, 0, 34, 35, 10, 2, 0, 0, 35,
    36, 7, 1, 0, 0, 36, 38, 3, 6, 3, 0, 37, 34, 1, 0, 0, 0, 38, 41, 1, 0, 0, 0,
    39, 37, 1, 0, 0, 0, 39, 40, 1, 0, 0, 0, 40, 5, 1, 0, 0, 0, 41, 39, 1, 0, 0,
    0, 42, 43, 6, 3, -1, 0, 43, 44, 3, 8, 4, 0, 44, 50, 1, 0, 0, 0, 45, 46, 10,
    2, 0, 0, 46, 47, 7, 2, 0, 0, 47, 49, 3, 8, 4, 0, 48, 45, 1, 0, 0, 0, 49, 52,
    1, 0, 0, 0, 50, 48, 1, 0, 0, 0, 50, 51, 1, 0, 0, 0, 51, 7, 1, 0, 0, 0, 52,
    50, 1, 0, 0, 0, 53, 55, 7, 1, 0, 0, 54, 53, 1, 0, 0, 0, 54, 55, 1, 0, 0, 0,
    55, 56, 1, 0, 0, 0, 56, 57, 3, 10, 5, 0, 57, 9, 1, 0, 0, 0, 58, 67, 3, 12,
    6, 0, 59, 67, 3, 14, 7, 0, 60, 67, 3, 16, 8, 0, 61, 67, 3, 18, 9, 0, 62, 63,
    5, 13, 0, 0, 63, 64, 3, 2, 1, 0, 64, 65, 5, 14, 0, 0, 65, 67, 1, 0, 0, 0,
    66, 58, 1, 0, 0, 0, 66, 59, 1, 0, 0, 0, 66, 60, 1, 0, 0, 0, 66, 61, 1, 0, 0,
    0, 66, 62, 1, 0, 0, 0, 67, 11, 1, 0, 0, 0, 68, 69, 5, 1, 0, 0, 69, 70, 5,
    13, 0, 0, 70, 71, 3, 2, 1, 0, 71, 72, 5, 15, 0, 0, 72, 75, 3, 2, 1, 0, 73,
    74, 5, 15, 0, 0, 74, 76, 3, 2, 1, 0, 75, 73, 1, 0, 0, 0, 75, 76, 1, 0, 0, 0,
    76, 77, 1, 0, 0, 0, 77, 78, 5, 14, 0, 0, 78, 13, 1, 0, 0, 0, 79, 80, 5, 2,
    0, 0, 80, 89, 5, 13, 0, 0, 81, 86, 3, 2, 1, 0, 82, 83, 5, 15, 0, 0, 83, 85,
    3, 2, 1, 0, 84, 82, 1, 0, 0, 0, 85, 88, 1, 0, 0, 0, 86, 84, 1, 0, 0, 0, 86,
    87, 1, 0, 0, 0, 87, 90, 1, 0, 0, 0, 88, 86, 1, 0, 0, 0, 89, 81, 1, 0, 0, 0,
    89, 90, 1, 0, 0, 0, 90, 91, 1, 0, 0, 0, 91, 92, 5, 14, 0, 0, 92, 15, 1, 0,
    0, 0, 93, 94, 5, 16, 0, 0, 94, 17, 1, 0, 0, 0, 95, 96, 5, 17, 0, 0, 96, 19,
    1, 0, 0, 0, 9, 21, 29, 39, 50, 54, 66, 75, 86, 89,
  ]

  private static __ATN: ATN
  public static get _ATN(): ATN {
    if (!FormulaParser.__ATN) {
      FormulaParser.__ATN = new ATNDeserializer().deserialize(
        FormulaParser._serializedATN
      )
    }

    return FormulaParser.__ATN
  }

  static DecisionsToDFA = FormulaParser._ATN.decisionToState.map(
    (ds: DecisionState, index: number) => new DFA(ds, index)
  )
}

export class FormulaContext extends ParserRuleContext {
  constructor(
    parser?: FormulaParser,
    parent?: ParserRuleContext,
    invokingState?: number
  ) {
    super(parent, invokingState)
    this.parser = parser
  }
  public expr(): ExprContext {
    return this.getTypedRuleContext(ExprContext, 0) as ExprContext
  }
  public EOF(): TerminalNode {
    return this.getToken(FormulaParser.EOF, 0)
  }
  public EQ(): TerminalNode {
    return this.getToken(FormulaParser.EQ, 0)
  }
  public get ruleIndex(): number {
    return FormulaParser.RULE_formula
  }
  public enterRule(listener: FormulaListener): void {
    if (listener.enterFormula) {
      listener.enterFormula(this)
    }
  }
  public exitRule(listener: FormulaListener): void {
    if (listener.exitFormula) {
      listener.exitFormula(this)
    }
  }
  // @Override
  public accept<Result>(visitor: FormulaVisitor<Result>): Result {
    if (visitor.visitFormula) {
      return visitor.visitFormula(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ExprContext extends ParserRuleContext {
  constructor(
    parser?: FormulaParser,
    parent?: ParserRuleContext,
    invokingState?: number
  ) {
    super(parent, invokingState)
    this.parser = parser
  }
  public additiveExpr_list(): AdditiveExprContext[] {
    return this.getTypedRuleContexts(
      AdditiveExprContext
    ) as AdditiveExprContext[]
  }
  public additiveExpr(i: number): AdditiveExprContext {
    return this.getTypedRuleContext(
      AdditiveExprContext,
      i
    ) as AdditiveExprContext
  }
  public GT(): TerminalNode {
    return this.getToken(FormulaParser.GT, 0)
  }
  public LT(): TerminalNode {
    return this.getToken(FormulaParser.LT, 0)
  }
  public GTEQ(): TerminalNode {
    return this.getToken(FormulaParser.GTEQ, 0)
  }
  public LTEQ(): TerminalNode {
    return this.getToken(FormulaParser.LTEQ, 0)
  }
  public EQ(): TerminalNode {
    return this.getToken(FormulaParser.EQ, 0)
  }
  public NEQ(): TerminalNode {
    return this.getToken(FormulaParser.NEQ, 0)
  }
  public get ruleIndex(): number {
    return FormulaParser.RULE_expr
  }
  public enterRule(listener: FormulaListener): void {
    if (listener.enterExpr) {
      listener.enterExpr(this)
    }
  }
  public exitRule(listener: FormulaListener): void {
    if (listener.exitExpr) {
      listener.exitExpr(this)
    }
  }
  // @Override
  public accept<Result>(visitor: FormulaVisitor<Result>): Result {
    if (visitor.visitExpr) {
      return visitor.visitExpr(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class AdditiveExprContext extends ParserRuleContext {
  constructor(
    parser?: FormulaParser,
    parent?: ParserRuleContext,
    invokingState?: number
  ) {
    super(parent, invokingState)
    this.parser = parser
  }
  public multiplicativeExpr(): MultiplicativeExprContext {
    return this.getTypedRuleContext(
      MultiplicativeExprContext,
      0
    ) as MultiplicativeExprContext
  }
  public additiveExpr(): AdditiveExprContext {
    return this.getTypedRuleContext(
      AdditiveExprContext,
      0
    ) as AdditiveExprContext
  }
  public PLUS(): TerminalNode {
    return this.getToken(FormulaParser.PLUS, 0)
  }
  public MINUS(): TerminalNode {
    return this.getToken(FormulaParser.MINUS, 0)
  }
  public get ruleIndex(): number {
    return FormulaParser.RULE_additiveExpr
  }
  public enterRule(listener: FormulaListener): void {
    if (listener.enterAdditiveExpr) {
      listener.enterAdditiveExpr(this)
    }
  }
  public exitRule(listener: FormulaListener): void {
    if (listener.exitAdditiveExpr) {
      listener.exitAdditiveExpr(this)
    }
  }
  // @Override
  public accept<Result>(visitor: FormulaVisitor<Result>): Result {
    if (visitor.visitAdditiveExpr) {
      return visitor.visitAdditiveExpr(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class MultiplicativeExprContext extends ParserRuleContext {
  constructor(
    parser?: FormulaParser,
    parent?: ParserRuleContext,
    invokingState?: number
  ) {
    super(parent, invokingState)
    this.parser = parser
  }
  public unaryExpr(): UnaryExprContext {
    return this.getTypedRuleContext(UnaryExprContext, 0) as UnaryExprContext
  }
  public multiplicativeExpr(): MultiplicativeExprContext {
    return this.getTypedRuleContext(
      MultiplicativeExprContext,
      0
    ) as MultiplicativeExprContext
  }
  public MUL(): TerminalNode {
    return this.getToken(FormulaParser.MUL, 0)
  }
  public DIV(): TerminalNode {
    return this.getToken(FormulaParser.DIV, 0)
  }
  public get ruleIndex(): number {
    return FormulaParser.RULE_multiplicativeExpr
  }
  public enterRule(listener: FormulaListener): void {
    if (listener.enterMultiplicativeExpr) {
      listener.enterMultiplicativeExpr(this)
    }
  }
  public exitRule(listener: FormulaListener): void {
    if (listener.exitMultiplicativeExpr) {
      listener.exitMultiplicativeExpr(this)
    }
  }
  // @Override
  public accept<Result>(visitor: FormulaVisitor<Result>): Result {
    if (visitor.visitMultiplicativeExpr) {
      return visitor.visitMultiplicativeExpr(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class UnaryExprContext extends ParserRuleContext {
  constructor(
    parser?: FormulaParser,
    parent?: ParserRuleContext,
    invokingState?: number
  ) {
    super(parent, invokingState)
    this.parser = parser
  }
  public primaryExpr(): PrimaryExprContext {
    return this.getTypedRuleContext(PrimaryExprContext, 0) as PrimaryExprContext
  }
  public PLUS(): TerminalNode {
    return this.getToken(FormulaParser.PLUS, 0)
  }
  public MINUS(): TerminalNode {
    return this.getToken(FormulaParser.MINUS, 0)
  }
  public get ruleIndex(): number {
    return FormulaParser.RULE_unaryExpr
  }
  public enterRule(listener: FormulaListener): void {
    if (listener.enterUnaryExpr) {
      listener.enterUnaryExpr(this)
    }
  }
  public exitRule(listener: FormulaListener): void {
    if (listener.exitUnaryExpr) {
      listener.exitUnaryExpr(this)
    }
  }
  // @Override
  public accept<Result>(visitor: FormulaVisitor<Result>): Result {
    if (visitor.visitUnaryExpr) {
      return visitor.visitUnaryExpr(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class PrimaryExprContext extends ParserRuleContext {
  constructor(
    parser?: FormulaParser,
    parent?: ParserRuleContext,
    invokingState?: number
  ) {
    super(parent, invokingState)
    this.parser = parser
  }
  public ifFunction(): IfFunctionContext {
    return this.getTypedRuleContext(IfFunctionContext, 0) as IfFunctionContext
  }
  public sumFunction(): SumFunctionContext {
    return this.getTypedRuleContext(SumFunctionContext, 0) as SumFunctionContext
  }
  public cellRef(): CellRefContext {
    return this.getTypedRuleContext(CellRefContext, 0) as CellRefContext
  }
  public numberExpr(): NumberExprContext {
    return this.getTypedRuleContext(NumberExprContext, 0) as NumberExprContext
  }
  public LPAREN(): TerminalNode {
    return this.getToken(FormulaParser.LPAREN, 0)
  }
  public expr(): ExprContext {
    return this.getTypedRuleContext(ExprContext, 0) as ExprContext
  }
  public RPAREN(): TerminalNode {
    return this.getToken(FormulaParser.RPAREN, 0)
  }
  public get ruleIndex(): number {
    return FormulaParser.RULE_primaryExpr
  }
  public enterRule(listener: FormulaListener): void {
    if (listener.enterPrimaryExpr) {
      listener.enterPrimaryExpr(this)
    }
  }
  public exitRule(listener: FormulaListener): void {
    if (listener.exitPrimaryExpr) {
      listener.exitPrimaryExpr(this)
    }
  }
  // @Override
  public accept<Result>(visitor: FormulaVisitor<Result>): Result {
    if (visitor.visitPrimaryExpr) {
      return visitor.visitPrimaryExpr(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class IfFunctionContext extends ParserRuleContext {
  constructor(
    parser?: FormulaParser,
    parent?: ParserRuleContext,
    invokingState?: number
  ) {
    super(parent, invokingState)
    this.parser = parser
  }
  public IF(): TerminalNode {
    return this.getToken(FormulaParser.IF, 0)
  }
  public LPAREN(): TerminalNode {
    return this.getToken(FormulaParser.LPAREN, 0)
  }
  public expr_list(): ExprContext[] {
    return this.getTypedRuleContexts(ExprContext) as ExprContext[]
  }
  public expr(i: number): ExprContext {
    return this.getTypedRuleContext(ExprContext, i) as ExprContext
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(FormulaParser.COMMA)
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(FormulaParser.COMMA, i)
  }
  public RPAREN(): TerminalNode {
    return this.getToken(FormulaParser.RPAREN, 0)
  }
  public get ruleIndex(): number {
    return FormulaParser.RULE_ifFunction
  }
  public enterRule(listener: FormulaListener): void {
    if (listener.enterIfFunction) {
      listener.enterIfFunction(this)
    }
  }
  public exitRule(listener: FormulaListener): void {
    if (listener.exitIfFunction) {
      listener.exitIfFunction(this)
    }
  }
  // @Override
  public accept<Result>(visitor: FormulaVisitor<Result>): Result {
    if (visitor.visitIfFunction) {
      return visitor.visitIfFunction(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class SumFunctionContext extends ParserRuleContext {
  constructor(
    parser?: FormulaParser,
    parent?: ParserRuleContext,
    invokingState?: number
  ) {
    super(parent, invokingState)
    this.parser = parser
  }
  public SUM(): TerminalNode {
    return this.getToken(FormulaParser.SUM, 0)
  }
  public LPAREN(): TerminalNode {
    return this.getToken(FormulaParser.LPAREN, 0)
  }
  public RPAREN(): TerminalNode {
    return this.getToken(FormulaParser.RPAREN, 0)
  }
  public expr_list(): ExprContext[] {
    return this.getTypedRuleContexts(ExprContext) as ExprContext[]
  }
  public expr(i: number): ExprContext {
    return this.getTypedRuleContext(ExprContext, i) as ExprContext
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(FormulaParser.COMMA)
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(FormulaParser.COMMA, i)
  }
  public get ruleIndex(): number {
    return FormulaParser.RULE_sumFunction
  }
  public enterRule(listener: FormulaListener): void {
    if (listener.enterSumFunction) {
      listener.enterSumFunction(this)
    }
  }
  public exitRule(listener: FormulaListener): void {
    if (listener.exitSumFunction) {
      listener.exitSumFunction(this)
    }
  }
  // @Override
  public accept<Result>(visitor: FormulaVisitor<Result>): Result {
    if (visitor.visitSumFunction) {
      return visitor.visitSumFunction(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class CellRefContext extends ParserRuleContext {
  constructor(
    parser?: FormulaParser,
    parent?: ParserRuleContext,
    invokingState?: number
  ) {
    super(parent, invokingState)
    this.parser = parser
  }
  public CELL_REF(): TerminalNode {
    return this.getToken(FormulaParser.CELL_REF, 0)
  }
  public get ruleIndex(): number {
    return FormulaParser.RULE_cellRef
  }
  public enterRule(listener: FormulaListener): void {
    if (listener.enterCellRef) {
      listener.enterCellRef(this)
    }
  }
  public exitRule(listener: FormulaListener): void {
    if (listener.exitCellRef) {
      listener.exitCellRef(this)
    }
  }
  // @Override
  public accept<Result>(visitor: FormulaVisitor<Result>): Result {
    if (visitor.visitCellRef) {
      return visitor.visitCellRef(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class NumberExprContext extends ParserRuleContext {
  constructor(
    parser?: FormulaParser,
    parent?: ParserRuleContext,
    invokingState?: number
  ) {
    super(parent, invokingState)
    this.parser = parser
  }
  public NUMBER(): TerminalNode {
    return this.getToken(FormulaParser.NUMBER, 0)
  }
  public get ruleIndex(): number {
    return FormulaParser.RULE_numberExpr
  }
  public enterRule(listener: FormulaListener): void {
    if (listener.enterNumberExpr) {
      listener.enterNumberExpr(this)
    }
  }
  public exitRule(listener: FormulaListener): void {
    if (listener.exitNumberExpr) {
      listener.exitNumberExpr(this)
    }
  }
  // @Override
  public accept<Result>(visitor: FormulaVisitor<Result>): Result {
    if (visitor.visitNumberExpr) {
      return visitor.visitNumberExpr(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}
