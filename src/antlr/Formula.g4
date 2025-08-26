// `四則演算`, `SUM`, `IF`, `セル参照` に対応
// `SUM(A1:B5)` のような範囲参照は扱わない

grammar Formula;

formula
    : EQ? expr EOF
    ;

expr
    : additiveExpr ( (GT | LT | GTEQ | LTEQ | EQ | NEQ) additiveExpr )?
    ;

additiveExpr
    : additiveExpr (PLUS | MINUS) multiplicativeExpr
    | multiplicativeExpr
    ;

multiplicativeExpr
    : multiplicativeExpr (MUL | DIV) unaryExpr
    | unaryExpr
    ;

unaryExpr
    : (PLUS | MINUS)? primaryExpr
    ;

primaryExpr
    : ifFunction
    | sumFunction
    | cellRef
    | numberExpr
    | LPAREN expr RPAREN
    ;

ifFunction
    : IF LPAREN expr COMMA expr (COMMA expr)? RPAREN
    ;

sumFunction
    : SUM LPAREN (expr (COMMA expr)*)? RPAREN
    ;

cellRef
    : CELL_REF
    ;

numberExpr
    : NUMBER
    ;

// ===== Lexer =====
IF  : [Ii] [Ff] ;
SUM : [Ss] [Uu] [Mm] ;

EQ   : '=' ;
NEQ  : '<>' ;
GTEQ : '>=' ;
LTEQ : '<=' ;
GT   : '>' ;
LT   : '<' ;

PLUS : '+' ;
MINUS: '-' ;
MUL  : '*' ;
DIV  : '/' ;

LPAREN : '(' ;
RPAREN : ')' ;
COMMA  : ',' ;

CELL_REF : [A-Z]+ [1-9][0-9]* ;
NUMBER   : [0-9]+ ('.' [0-9]+)? ;

WS : [ \t\r\n]+ -> skip ;
