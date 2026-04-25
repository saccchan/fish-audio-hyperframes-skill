# シンプルデモ - 使い方

このディレクトリには、Fish Audio × HyperFramesの最もシンプルなデモが含まれています。

## 🎬 実行手順

### 1. Fish Audio APIキーを設定

```bash
export FISH_AUDIO_API_KEY="your-api-key"
```

### 2. 音声を生成

```bash
cd ~/.cursor/skills/fish-audio-hyperframes/examples/simple-demo

node ../../scripts/fish-tts.js \
  narration.txt \
  ./audio \
  ja-JP-Female-1 \
  ja
```

生成されるファイル:
```
audio/
├── segment-001.mp3  # "こんにちは、新しい未来へようこそ。"
├── segment-002.mp3  # "私たちは革新的なソリューションを提供します。"
├── segment-003.mp3  # "テクノロジーの力で、あなたのビジネスを加速させます。"
├── segment-004.mp3  # "詳しくは、公式サイトをご覧ください。"
├── segment-005.mp3  # "今すぐ始めましょう。"
└── transcript.json  # タイミング情報
```

### 3. 音声を結合（オプション）

```bash
# ffmpegがインストールされている場合
ffmpeg -i "concat:audio/segment-001.mp3|audio/segment-002.mp3|audio/segment-003.mp3|audio/segment-004.mp3|audio/segment-005.mp3" -acodec copy audio/full-narration.mp3
```

### 4. HyperFramesプロジェクトを作成

```bash
# 新しいプロジェクトディレクトリ
mkdir -p ~/Desktop/my-first-video
cd ~/Desktop/my-first-video

# 音声をコピー
cp ~/.cursor/skills/fish-audio-hyperframes/examples/simple-demo/audio/*.mp3 .
cp ~/.cursor/skills/fish-audio-hyperframes/examples/simple-demo/audio/transcript.json .
```

### 5. Cursorでコンポジションを作成

Cursorを開いて、AIエージェントに以下のように依頼してください:

```
transcript.jsonを読み込んで、HyperFramesのindex.htmlを作成してください。

要件:
- 各セグメントを1つのシーンとして表示
- クロスフェード遷移で繋ぐ
- 暗めの背景に明るいテキスト
- 各シーンにエントランスアニメーションを追加
- 最後のシーンでフェードアウト
```

または、`examples.md`の「例1」のHTMLをベースに修正してください。

### 6. プレビューとレンダリング

```bash
# プレビュー
npx hyperframes preview

# レンダリング
npx hyperframes render --output demo.mp4
```

## 📝 カスタマイズのヒント

### ナレーションを変更

`narration.txt`を編集して、ステップ2から再実行してください。

### ビジュアルスタイルを変更

Cursorで以下のように依頼:

```
ビジュアルスタイルを「ミニマル・ホワイト」に変更して
```

または

```
背景を鮮やかなグラデーションに変更して
```

### 音声の声を変更

ステップ2で`ja-JP-Female-1`を他のボイスIDに変更:

```bash
# 男性ボイス
node ../../scripts/fish-tts.js narration.txt ./audio ja-JP-Male-1 ja

# 別の女性ボイス
node ../../scripts/fish-tts.js narration.txt ./audio ja-JP-Female-2 ja
```

利用可能なボイスID: [Fish Audio公式ドキュメント](https://fish.audio/docs)を参照

## 🎯 期待される出力

- **長さ**: 約15-20秒
- **解像度**: 1920x1080 (Full HD)
- **フォーマット**: MP4 (H.264)
- **スタイル**: クリーンでモダンなプレゼンテーション

---

**次のステップ**: より高度な例は`examples.md`を参照してください。
