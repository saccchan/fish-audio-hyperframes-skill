# 📥 インストールガイド

このスキルを他の人と共有する際のインストール手順です。

---

## 🚀 クイックインストール（5分）

### ステップ1️⃣: ターミナルを開く

- **Mac**: Spotlight（Cmd + Space）で「ターミナル」と入力
- **Windows**: Git Bash を開く

### ステップ2️⃣: 以下のコマンドをコピー&ペースト

**個人用スキルとして（全プロジェクトで使える）:**

```bash
git clone https://github.com/saccchan/fish-audio-hyperframes-skill.git ~/.cursor/skills/fish-audio-hyperframes
```

**または、特定のプロジェクトだけで使う場合:**

```bash
cd /path/to/your/project
git clone https://github.com/saccchan/fish-audio-hyperframes-skill.git .cursor/skills/fish-audio-hyperframes
```

### ステップ3️⃣: Cursorを再起動

- Cursorを完全に終了して、もう一度開く
- または、`Cmd + Shift + P` → 「Reload Window」

### ステップ4️⃣: 動作確認

Cursorで以下を試してください：

```
Fish Audioで15秒のテスト動画を作ってください。

台本:
これはテストです。
スキルが正しくインストールされました。

声: 明るい女性の声
```

スキルが自動的に適用されれば成功です！🎉

---

## 🔧 トラブルシューティング

### エラー: `git: command not found`

Gitがインストールされていません。

**Mac:**
```bash
xcode-select --install
```

**Windows:**
https://git-scm.com/download/win からダウンロード

### エラー: `Permission denied`

`~/.cursor/skills/` ディレクトリが存在しない可能性があります。

```bash
mkdir -p ~/.cursor/skills
git clone https://github.com/saccchan/fish-audio-hyperframes-skill.git ~/.cursor/skills/fish-audio-hyperframes
```

### スキルが認識されない

1. **Cursorを完全に再起動**
2. **スキルの場所を確認:**
   ```bash
   ls ~/.cursor/skills/fish-audio-hyperframes
   ```
   ファイルが表示されればOK

3. **それでも認識されない場合:**
   ```bash
   # 一度削除して再インストール
   rm -rf ~/.cursor/skills/fish-audio-hyperframes
   git clone https://github.com/saccchan/fish-audio-hyperframes-skill.git ~/.cursor/skills/fish-audio-hyperframes
   ```

---

## 📚 インストール後の使い方

### 📘 まず読む
1. [QUICKSTART.md](QUICKSTART.md) - 3分で理解
2. [GUIDE_FOR_BEGINNERS.md](GUIDE_FOR_BEGINNERS.md) - 詳しい説明

### 🎬 すぐに試す
[CHEATSHEET.md](CHEATSHEET.md) からテンプレートをコピペして使う

---

## 🔄 更新方法

新しいバージョンがリリースされたら：

```bash
cd ~/.cursor/skills/fish-audio-hyperframes
git pull
```

Cursorを再起動すれば、最新版が適用されます。

---

## ❓ よくある質問

### Q: 複数のプロジェクトで使える？
**A: はい！** `~/.cursor/skills/` にインストールすれば、全プロジェクトで使えます。

### Q: プロジェクトごとに設定を変えたい
**A: 可能です。** `.cursor/skills/` にインストールすれば、プロジェクトごとに独立します。

### Q: アンインストールしたい
**A: フォルダを削除するだけ:**
```bash
rm -rf ~/.cursor/skills/fish-audio-hyperframes
```

### Q: 他の人と共有したい
**A: このGitHubリポジトリのURLを共有してください:**
```
https://github.com/saccchan/fish-audio-hyperframes-skill
```

---

## 📞 サポート

問題が解決しない場合は、以下の情報と一緒に報告してください：

1. OS（Mac/Windows/Linux）
2. Cursorのバージョン
3. エラーメッセージ（あれば）
4. 実行したコマンド

GitHubのIssuesで報告:
https://github.com/saccchan/fish-audio-hyperframes-skill/issues

---

**インストール完了です！楽しい動画制作を！** 🎬✨
