# CLAUDE.md — akagane-kogyo-sample-site

## Overview
新居浜の足場工事会社をイメージした、静的なコーポレートサイトのデモ・サンプル。研修用。
実在の企業名を題材にしているが、公式サイトではない。会社情報・数値・連絡先はすべて架空のまま保つこと。

## Tech Stack
- HTML / CSS / Vanilla JS（ビルドなし）
- Google Fonts（Noto Sans JP / Shippori Mincho B1 / Outfit）

## Directory Structure
- `index.html` — 1ページ構成
- `assets/css/style.css` — デザイン（色は `:root` の変数）
- `assets/js/main.js` — メニュー・スクロール表示・カウント・フォーム

## Development
- ビルド不要。`index.html` をブラウザで開く

## Rules
- 実在の企業の住所・電話番号・人物名・写真を入れない
- サンプルであることの告知（最上部バー・フッター・`noindex`）を消さない
- 日本語UIテキスト。専門用語には短い説明をつける
