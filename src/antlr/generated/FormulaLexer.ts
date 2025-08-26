// Generated from Formula.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class FormulaLexer extends Lexer {
	public static readonly IF = 1;
	public static readonly SUM = 2;
	public static readonly EQ = 3;
	public static readonly NEQ = 4;
	public static readonly GTEQ = 5;
	public static readonly LTEQ = 6;
	public static readonly GT = 7;
	public static readonly LT = 8;
	public static readonly PLUS = 9;
	public static readonly MINUS = 10;
	public static readonly MUL = 11;
	public static readonly DIV = 12;
	public static readonly LPAREN = 13;
	public static readonly RPAREN = 14;
	public static readonly COMMA = 15;
	public static readonly CELL_REF = 16;
	public static readonly NUMBER = 17;
	public static readonly WS = 18;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, "'='", 
                                                            "'<>'", "'>='", 
                                                            "'<='", "'>'", 
                                                            "'<'", "'+'", 
                                                            "'-'", "'*'", 
                                                            "'/'", "'('", 
                                                            "')'", "','" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "IF", 
                                                             "SUM", "EQ", 
                                                             "NEQ", "GTEQ", 
                                                             "LTEQ", "GT", 
                                                             "LT", "PLUS", 
                                                             "MINUS", "MUL", 
                                                             "DIV", "LPAREN", 
                                                             "RPAREN", "COMMA", 
                                                             "CELL_REF", 
                                                             "NUMBER", "WS" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"IF", "SUM", "EQ", "NEQ", "GTEQ", "LTEQ", "GT", "LT", "PLUS", "MINUS", 
		"MUL", "DIV", "LPAREN", "RPAREN", "COMMA", "CELL_REF", "NUMBER", "WS",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, FormulaLexer._ATN, FormulaLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "Formula.g4"; }

	public get literalNames(): (string | null)[] { return FormulaLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return FormulaLexer.symbolicNames; }
	public get ruleNames(): string[] { return FormulaLexer.ruleNames; }

	public get serializedATN(): number[] { return FormulaLexer._serializedATN; }

	public get channelNames(): string[] { return FormulaLexer.channelNames; }

	public get modeNames(): string[] { return FormulaLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,18,105,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,2,1,2,1,3,1,3,1,3,1,4,1,4,1,
	4,1,5,1,5,1,5,1,6,1,6,1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,1,11,1,11,1,12,
	1,12,1,13,1,13,1,14,1,14,1,15,4,15,75,8,15,11,15,12,15,76,1,15,1,15,5,15,
	81,8,15,10,15,12,15,84,9,15,1,16,4,16,87,8,16,11,16,12,16,88,1,16,1,16,
	4,16,93,8,16,11,16,12,16,94,3,16,97,8,16,1,17,4,17,100,8,17,11,17,12,17,
	101,1,17,1,17,0,0,18,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,
	23,12,25,13,27,14,29,15,31,16,33,17,35,18,1,0,9,2,0,73,73,105,105,2,0,70,
	70,102,102,2,0,83,83,115,115,2,0,85,85,117,117,2,0,77,77,109,109,1,0,65,
	90,1,0,49,57,1,0,48,57,3,0,9,10,13,13,32,32,110,0,1,1,0,0,0,0,3,1,0,0,0,
	0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,
	0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,
	27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,0,0,1,37,1,0,
	0,0,3,40,1,0,0,0,5,44,1,0,0,0,7,46,1,0,0,0,9,49,1,0,0,0,11,52,1,0,0,0,13,
	55,1,0,0,0,15,57,1,0,0,0,17,59,1,0,0,0,19,61,1,0,0,0,21,63,1,0,0,0,23,65,
	1,0,0,0,25,67,1,0,0,0,27,69,1,0,0,0,29,71,1,0,0,0,31,74,1,0,0,0,33,86,1,
	0,0,0,35,99,1,0,0,0,37,38,7,0,0,0,38,39,7,1,0,0,39,2,1,0,0,0,40,41,7,2,
	0,0,41,42,7,3,0,0,42,43,7,4,0,0,43,4,1,0,0,0,44,45,5,61,0,0,45,6,1,0,0,
	0,46,47,5,60,0,0,47,48,5,62,0,0,48,8,1,0,0,0,49,50,5,62,0,0,50,51,5,61,
	0,0,51,10,1,0,0,0,52,53,5,60,0,0,53,54,5,61,0,0,54,12,1,0,0,0,55,56,5,62,
	0,0,56,14,1,0,0,0,57,58,5,60,0,0,58,16,1,0,0,0,59,60,5,43,0,0,60,18,1,0,
	0,0,61,62,5,45,0,0,62,20,1,0,0,0,63,64,5,42,0,0,64,22,1,0,0,0,65,66,5,47,
	0,0,66,24,1,0,0,0,67,68,5,40,0,0,68,26,1,0,0,0,69,70,5,41,0,0,70,28,1,0,
	0,0,71,72,5,44,0,0,72,30,1,0,0,0,73,75,7,5,0,0,74,73,1,0,0,0,75,76,1,0,
	0,0,76,74,1,0,0,0,76,77,1,0,0,0,77,78,1,0,0,0,78,82,7,6,0,0,79,81,7,7,0,
	0,80,79,1,0,0,0,81,84,1,0,0,0,82,80,1,0,0,0,82,83,1,0,0,0,83,32,1,0,0,0,
	84,82,1,0,0,0,85,87,7,7,0,0,86,85,1,0,0,0,87,88,1,0,0,0,88,86,1,0,0,0,88,
	89,1,0,0,0,89,96,1,0,0,0,90,92,5,46,0,0,91,93,7,7,0,0,92,91,1,0,0,0,93,
	94,1,0,0,0,94,92,1,0,0,0,94,95,1,0,0,0,95,97,1,0,0,0,96,90,1,0,0,0,96,97,
	1,0,0,0,97,34,1,0,0,0,98,100,7,8,0,0,99,98,1,0,0,0,100,101,1,0,0,0,101,
	99,1,0,0,0,101,102,1,0,0,0,102,103,1,0,0,0,103,104,6,17,0,0,104,36,1,0,
	0,0,7,0,76,82,88,94,96,101,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!FormulaLexer.__ATN) {
			FormulaLexer.__ATN = new ATNDeserializer().deserialize(FormulaLexer._serializedATN);
		}

		return FormulaLexer.__ATN;
	}


	static DecisionsToDFA = FormulaLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}