# 🚀 GitHubへのアップロード手順

このリポジトリをGitHubにアップロードして共有する手順です。

## 📋 前提条件

- GitHubアカウントを持っていること
- Gitがインストールされていること（既にインストール済み）

---

## ステップ1️⃣: GitHubで新しいリポジトリを作成

1. **GitHubにログイン**
   - https://github.com にアクセス

2. **新しいリポジトリを作成**
   - 右上の「+」→「New repository」をクリック
   
3. **リポジトリ設定**
   ```
   Repository name: fish-audio-hyperframes-skill
   Description: Fish Audio × HyperFrames統合スキル - 台本から自動でナレーション付き動画を生成
   Public または Private を選択
   ✓ 「Initialize this repository with:」は全てチェックなし
   ```

4. **「Create repository」をクリック**

---

## ステップ2️⃣: ローカルリポジトリとGitHubを接続

GitHubでリポジトリを作成すると、接続用のコマンドが表示されます。
以下のコマンドをターミナルで実行してください：

### オプションA: 新しいリポジトリの場合（推奨）

```bash
cd ~/Desktop/fish-audio-hyperframes-skill

# GitHubのリポジトリURLを設定（YOUR_USERNAMEを実際のユーザー名に変更）
git remote add origin https://github.com/YOUR_USERNAME/fish-audio-hyperframes-skill.git

# メインブランチ名を設定
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

### オプションB: SSH接続を使う場合

```bash
cd ~/Desktop/fish-audio-hyperframes-skill

# SSH URLを設定
git remote add origin git@github.com:YOUR_USERNAME/fish-audio-hyperframes-skill.git

git branch -M main
git push -u origin main
```

---

## ステップ3️⃣: 認証

プッシュ時に認証が求められた場合：

### HTTPSの場合
- **Username**: GitHubのユーザー名
- **Password**: Personal Access Token（パスワードではありません）

**Personal Access Tokenの作成方法:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token」→「Generate new token (classic)」
3. Note: `fish-audio-hyperframes-skill`
4. Expiration: `90 days` または任意
5. Select scopes: `repo` にチェック
6. 「Generate token」をクリック
7. 表示されたトークンをコピー（後で見れないので注意！）

### SSHの場合
SSH鍵が設定されていない場合は、以下を参照：
https://docs.github.com/ja/authentication/connecting-to-github-with-ssh

---

## ステップ4️⃣: アップロード完了を確認

1. GitHubのリポジトリページにアクセス
2. ファイルが全てアップロードされていることを確認
3. README.mdが表示されていればOK！

---

## 📤 上司への共有方法

### パブリックリポジトリの場合

リポジトリのURLをそのまま共有：
```
https://github.com/YOUR_USERNAME/fish-audio-hyperframes-skill
```

メールやSlackで以下のように共有：
```
Fish Audio × HyperFrames スキルをGitHubにアップロードしました。

リポジトリURL:
https://github.com/YOUR_USERNAME/fish-audio-hyperframes-skill

使い方:
1. READMEを確認
2. QUICKSTARTで3分で理解
3. Cursorで「Fish Audioで動画を作って」と依頼

ぜひご確認ください！
```

### プライベートリポジトリの場合

1. **コラボレーターとして追加**
   - リポジトリ → Settings → Collaborators
   - 「Add people」で上司のGitHubアカウントを追加

2. **または、組織のリポジトリに移動**
   - リポジトリ → Settings → Transfer ownership

---

## 🔄 更新がある場合

スキルを更新したら、以下のコマンドでGitHubに反映：

```bash
cd ~/Desktop/fish-audio-hyperframes-skill

# 変更をステージング
git add .

# コミット
git commit -m "ドキュメント更新: XXXを追加"

# プッシュ
git push
```

---

## 📚 参考リンク

- [GitHub Docs (日本語)](https://docs.github.com/ja)
- [Git入門](https://git-scm.com/book/ja/v2)

---

## 🆘 トラブルシューティング

### エラー: `remote origin already exists`

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/fish-audio-hyperframes-skill.git
```

### エラー: `failed to push some refs`

```bash
git pull --rebase origin main
git push -u origin main
```

### 認証エラー

- HTTPSの場合: Personal Access Tokenを使用
- SSHの場合: SSH鍵を設定

---

**準備完了です！上記の手順に従ってGitHubにアップロードしてください。** 🚀
