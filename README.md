# Breakout - my-sdd-project

シンプルなブロック崩しゲーム（HTML/CSS/JavaScript）。このリポジトリにはローカル実行用の最小実装、テスト、Lint/Format 設定、CI ワークフローが含まれます。

## 前提条件
- Node.js（推奨 LTS） と npm がインストールされていること（Windows の導入手順は `.github/notes` を参照、または公式サイト https://nodejs.org/ ）
- （任意）Python があれば簡易サーバとして使えます

## 依存インストール
リポジトリルートで実行:

```bash
npm install
```

## ローカルで動かす（ブラウザで確認）
- `web/` ディレクトリを静的サーバで配信します。Node がある場合:

```bash
npx http-server web -p 8080
# ブラウザで http://localhost:8080 を開く
```

- Python がある場合（代替）:

```bash
python -m http.server 8080 --directory web
# ブラウザで http://localhost:8080 を開く
```

## テスト
Jest を使用しています。依存インストール後に実行:

```bash
npm test
```

テストは ESM モジュールを使うため、`package.json` のスクリプトで `--experimental-vm-modules` を有効にしています。

## Lint / Format
ESLint / Prettier を導入しています。

```bash
npm run lint
npm run format
```

CI は PR 時に自動で Lint と Test を実行します（GitHub Actions）。

## デプロイ（GitHub Pages 例）
最も簡単な方法は `web/` を GitHub Pages で配信する設定にすることです。方法の一例:

1. リポジトリ設定 -> Pages でブランチを `main`、フォルダを `/root` または `gh-pages` ブランチを指定して `web/` を出力先にする（手動ステップ）
2. もしくは `gh-pages` パッケージを利用して `web/` を `gh-pages` ブランチにデプロイするスクリプトを追加する

（必要であればデプロイ用スクリプトを作成します）

## 開発フロー（簡易）
1. 新機能はブランチを切る（`feature/...`）
2. テストを追加してから実装（TDD）
3. PR を作成：CI が通ることを確認
4. マージ・デプロイ

## 追加情報
- 仕様: `specs/001-breakout-game/spec.md`
- タスク一覧: `specs/001-breakout-game/tasks.md`

---

作業に困ったら `npm test` の出力やブラウザのコンソールログを共有してください。