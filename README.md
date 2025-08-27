# Excel Formula Engine Example

Excelの数式エンジンの実装例です。四則演算、比較演算、SUM関数、IF関数、セル参照に対応しています。
簡略化のため、範囲参照（A1:B5）や他シート参照（sheet!A1）は対応していません。

実際に計算している様子は、テストコード src/FormulaEngine.spec.ts をご確認ください。

## 環境構築

MacOS の場合の環境構築方法です。

```
# 予め antlr のインストールが必要
$ brew install antlr

$ npm ci

$ npm run test
```

## 機能

- **四則演算**: `+`, `-`, `*`, `/`
- **比較演算**: `>`, `<`, `>=`, `<=`, `=`, `<>`
- **関数**: `SUM()`, `IF()`
- **セル参照**: `A1`, `B2` など
- **単項演算子**: `+`, `-`

## 処理の流れ

```
"=A1+B1*2"（数式文字列）
    ↓
[FormulaEngine.evaluate()]
    ↓
[Lexer (ANTLR4)] → トークン化
    ↓
["=", "A1", "+", "B1", "*", "2"]
    ↓
[Parser (ANTLR4)] → 構文解析
    ↓
      [+] （Parse Tree: 構文解析木）
     /   \
  [A1]   [*]
         / \
      [B1] [2]
    ↓
[FormulaToRPNConverter] → RPN変換 + 依存関係抽出
    ↓
    ├── RPN: ["A1", "B1", "2", "*", "+"] （逆ポーランド記法）
    └── 依存関係: ["A1", "B1"]
    ↓
[StackVM.evaluate()] → 実行
    ↓
    ├── 依存関係の値を取得（A1=10, B1=3）
    └── スタックで計算実行
        └── [10] [3] [2] → [10] [6] → [16]
    ↓
結果: 16
```

## アーキテクチャ

### 1. 字句解析・構文解析（ANTLR4）

`src/antlr/Formula.g4` で定義された文法に基づいて、数式文字列を解析します。

- **Lexer**: 文字列をトークンに分割
- **Parser**: トークンから構文解析木（Parse Tree）を生成

### 2. RPN変換（FormulaToRPNConverter）

Parse Treeを走査して逆ポーランド記法（RPN）に変換します。

- **Visitor Pattern**: Parse Tree の各ノードを訪問して処理
- **依存関係抽出**: セル参照を収集
- **短絡評価**: IF関数用のジャンプ命令を生成

### 3. 評価実行（StackVM）

RPNトークンをスタックマシンで評価します。

- **スタックベース**: 値をプッシュ、演算子でポップして計算
- **ジャンプ命令**: IF関数の条件分岐を実現
- **型変換**: 文字列を数値に自動変換

## 使用方法

```typescript
import { evaluateFormula } from './src/index';

// セルの値を設定
const cellValues = new Map([
  ['A1', 10],
  ['B1', 3]
]);

// 数式を評価
const result = evaluateFormula('=A1+B1*2', cellValues);
console.log(result); // 16
```
