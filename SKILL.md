---
name: fish-audio-hyperframes
description: Fish Audio音声とHyperFramesを統合して、音声同期アニメーション動画を生成する。音声生成、トランスクリプト作成、キャプション同期、audio-reactiveアニメーションを含む完全なワークフロー。「Fish Audioで動画」「音声アニメーション」「TTS動画」「ナレーション動画」と言及された際に使用。
---

# Fish Audio × HyperFrames

Fish Audio APIで生成した高品質音声をHyperFramesコンポジションに統合し、音声に完全同期したHTMLアニメーション動画を作成します。

## 🎯 このスキルでできること

1. **Fish Audio音声生成** - 多言語・多声優の高品質TTS
2. **自動トランスクリプト生成** - セグメントごとのタイミング情報
3. **音声同期キャプション** - 単語・フレーズレベルの同期
4. **Audio-reactiveアニメーション** - 音声の周波数・振幅に反応するビジュアル
5. **シーン遷移** - 音声のナレーション区切りに合わせた場面転換

## 📋 前提条件

```bash
# Fish Audio APIキーを設定
export FISH_AUDIO_API_KEY="your-api-key-here"

# HyperFrames CLIがインストール済みであること
npx hyperframes --version
```

Fish Audio APIキーの取得: [https://fish.audio/](https://fish.audio/)

## 🚀 クイックスタート

### Step 1: ナレーションスクリプトを作成

`narration.txt`ファイルを作成し、1行1セグメントで記述:

```
こんにちは、今日は新しい製品をご紹介します。
この製品は革新的な技術を採用しています。
詳しくは公式サイトをご覧ください。
```

**ルール:**
- 1行 = 1音声セグメント
- `#`で始まる行はコメント（無視される）
- 空行は無視される
- 各セグメントは明確な意味の区切り（文章、フレーズ）

### Step 2: 音声を生成

```bash
node ~/.cursor/skills/fish-audio-hyperframes/scripts/fish-tts.js \
  narration.txt \
  ./audio \
  ja-JP-Female-1 \
  ja
```

**出力:**
```
audio/
├── segment-001.mp3
├── segment-002.mp3
├── segment-003.mp3
└── transcript.json
```

**transcript.json の構造:**
```json
{
  "duration": 12.5,
  "segments": [
    {
      "start": 0,
      "end": 3.8,
      "text": "こんにちは、今日は新しい製品をご紹介します。",
      "file": "segment-001.mp3"
    },
    {
      "start": 4.1,
      "end": 7.9,
      "text": "この製品は革新的な技術を採用しています。",
      "file": "segment-002.mp3"
    }
  ]
}
```

### Step 3: HyperFramesプロジェクトを初期化

```bash
npx hyperframes init my-project
cd my-project
```

### Step 4: 音声ファイルをコピー

```bash
cp audio/*.mp3 .
cp audio/transcript.json .
```

### Step 5: コンポジションを作成

`transcript.json`を元に`index.html`を生成します。以下のテンプレートを使用:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Noto Sans JP', sans-serif;
      background: #000;
      color: #fff;
    }
  </style>
</head>
<body>
  <div data-composition-id="main" data-width="1920" data-height="1080">
    
    <!-- 音声トラック: 全セグメントを連結 -->
    <audio id="narration" data-start="0" data-duration="12.5" data-track-index="10">
      <!-- 実際の実装では単一ファイルに結合するか、複数<audio>を配置 -->
    </audio>
    
    <!-- シーン1: セグメント1 (0-3.8s) -->
    <div id="scene-1" data-start="0" data-duration="4.1" data-track-index="0">
      <div class="scene-content">
        <div class="caption-group">
          <div class="caption">こんにちは、今日は新しい製品をご紹介します。</div>
        </div>
      </div>
    </div>
    
    <!-- シーン2: セグメント2 (4.1-7.9s) -->
    <div id="scene-2" data-start="4.1" data-duration="3.8" data-track-index="0">
      <div class="scene-content">
        <div class="caption-group">
          <div class="caption">この製品は革新的な技術を採用しています。</div>
        </div>
      </div>
    </div>
    
    <!-- Audio-reactive背景 -->
    <div id="audio-viz" data-start="0" data-duration="12.5" data-track-index="1">
      <canvas id="viz-canvas" width="1920" height="1080"></canvas>
    </div>

    <style>
      [data-composition-id="main"] {
        position: relative;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
      }
      
      .scene-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 120px 160px;
        text-align: center;
      }
      
      .caption {
        font-size: 64px;
        font-weight: 700;
        line-height: 1.4;
        color: #ffffff;
        text-shadow: 0 4px 24px rgba(0, 0, 0, 0.8);
      }
      
      #audio-viz {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      }
      
      #viz-canvas {
        width: 100%;
        height: 100%;
        opacity: 0.3;
      }
      
      [id^="scene-"] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
      }
    </style>

    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      
      // シーン1: エントランスアニメーション
      tl.from("#scene-1 .caption", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out"
      }, 0.2);
      
      // シーン1→2 トランジション (3.8秒地点)
      tl.to("#scene-1", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      }, 3.8);
      
      // シーン2: エントランスアニメーション
      tl.from("#scene-2 .caption", {
        scale: 0.9,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.4)"
      }, 4.2);
      
      // Audio-reactive背景 (簡易実装 - 実際はWeb Audio APIを使用)
      const canvas = document.getElementById('viz-canvas');
      const ctx = canvas.getContext('2d');
      
      // シンプルなパルスエフェクト
      tl.to({}, {
        duration: 12.5,
        onUpdate: function() {
          const t = this.time();
          const intensity = Math.sin(t * 3) * 0.5 + 0.5;
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, 600 + intensity * 200
          );
          gradient.addColorStop(0, `rgba(138, 43, 226, ${intensity * 0.3})`);
          gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }, 0);
      
      window.__timelines["main"] = tl;
    </script>
  </div>
</body>
</html>
```

### Step 6: プレビューとレンダリング

```bash
# プレビュー
npx hyperframes preview

# レンダリング
npx hyperframes render --output video.mp4
```

## 🎨 高度なテクニック

### 1. Audio-reactive アニメーション

音声の周波数・振幅に反応するビジュアルを追加します。HyperFramesの`audio-reactive`機能を使用:

```html
<div id="reactive-circle" 
     data-start="0" 
     data-duration="10"
     data-track-index="2"
     data-audio-reactive="true"
     data-audio-source="#narration"
     data-frequency-band="bass">
</div>

<script>
// audio-reactive属性により、自動的に音声分析が実行される
tl.to("#reactive-circle", {
  scale: 1.5,  // 音声の振幅に応じて0.8-1.5の間で変動
  duration: 10,
  ease: "none"
}, 0);
</script>
```

詳細は`hyperframes` skillの`references/audio-reactive.md`を参照。

### 2. 単語レベルの同期キャプション

より細かい同期が必要な場合は、`hyperframes transcribe`で単語レベルのタイムスタンプを取得:

```bash
# 生成した音声を結合
ffmpeg -i "concat:segment-001.mp3|segment-002.mp3|segment-003.mp3" -acodec copy full-audio.mp3

# 単語レベルの文字起こし
npx hyperframes transcribe full-audio.mp3 --model large --word-timestamps
```

出力される`full-audio.json`を使用してキャプションを実装。詳細は`hyperframes` skillの`references/captions.md`を参照。

### 3. シーン遷移のカスタマイズ

各セグメントの境界で視覚的な遷移を追加:

```javascript
// クロスフェード
tl.to("#scene-1", { opacity: 0, duration: 0.5 }, 3.6);
tl.from("#scene-2", { opacity: 0, duration: 0.5 }, 3.8);

// ワイプ
tl.to("#scene-1", { x: -1920, duration: 0.6, ease: "power2.inOut" }, 3.5);
tl.from("#scene-2", { x: 1920, duration: 0.6, ease: "power2.inOut" }, 3.5);
```

詳細は`hyperframes` skillの`references/transitions.md`を参照。

### 4. 複数音声トラックの統合

BGM + ナレーションの場合:

```html
<!-- BGM -->
<audio id="bgm" data-start="0" data-duration="12.5" data-track-index="10" data-volume="0.3">
  <source src="bgm.mp3" type="audio/mpeg">
</audio>

<!-- ナレーション -->
<audio id="narration" data-start="0" data-duration="12.5" data-track-index="11" data-volume="1">
  <source src="full-audio.mp3" type="audio/mpeg">
</audio>
```

## 📝 ベストプラクティス

### ナレーションスクリプト作成

1. **セグメント長を適切に** - 1セグメント2-8秒が理想（長すぎると退屈、短すぎると忙しい）
2. **意味のある区切り** - 文章単位、フレーズ単位で分割
3. **音声の間** - セグメント間に0.3-0.5秒の無音を挿入（自動処理される）
4. **抑揚を考慮** - 疑問文、強調部分を別セグメントに

### アニメーション設計

1. **Layout Before Animation** - まず静的レイアウトを完成させる
2. **Entrance Only** - 各シーンはエントランスアニメーションのみ（exitは遷移が担当）
3. **Vary Eases** - 同じシーン内で異なるイージングを使用
4. **Offset Timing** - アニメーションは0.1-0.3秒遅延して開始

### パフォーマンス

1. **音声ファイル最適化** - MP3 128kbps以上、不要な無音をトリム
2. **Transform優先** - `x`, `y`, `scale`, `rotation`を使用（reflow回避）
3. **will-change** - アニメーション要素に`will-change: transform`
4. **Canvas最小化** - audio-reactive背景は低解像度で描画

## 🔧 トラブルシューティング

### Fish Audio APIエラー

**問題:** `API returned 401: Unauthorized`

```bash
# APIキーを再設定
export FISH_AUDIO_API_KEY="正しいAPIキー"

# 確認
echo $FISH_AUDIO_API_KEY
```

### 音声が再生されない

1. **ファイルパスを確認**
```bash
ls -la *.mp3  # index.htmlと同じディレクトリにあるか
```

2. **audio要素のsrc属性を確認**
```html
<!-- 相対パスが正しいか -->
<audio src="segment-001.mp3">
```

3. **data-durationが正確か**
```bash
# 実際の音声長を取得
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 segment-001.mp3
```

### アニメーションが音声と同期しない

1. **タイムラインを検証**
```bash
npx hyperframes lint
npx hyperframes validate
```

2. **transcript.jsonのタイミングを確認** - `start`と`end`が正確か
3. **ブラウザプレビューでデバッグ**
```bash
npx hyperframes preview
# ブラウザのDevToolsコンソールでタイムラインを確認
console.log(window.__timelines.main.totalDuration())
```

## 📚 参考リソース

- **HyperFrames公式** - [hyperframes.dev](https://hyperframes.dev)
- **Fish Audio API** - [fish.audio/docs](https://fish.audio/docs)
- **GSAP Documentation** - [gsap.com/docs](https://gsap.com/docs)

関連スキル:
- `hyperframes` - HyperFrames基礎
- `hyperframes-cli` - CLI詳細
- `gsap` - アニメーションパターン

## 🎬 実践例

完全なサンプルプロジェクト: `.cursor/skills/fish-audio-hyperframes/examples/`

1. **製品紹介動画** - 30秒、3シーン、BGM+ナレーション
2. **チュートリアル動画** - 60秒、5ステップ、ステップごとのキャプション
3. **ポッドキャストビジュアライザー** - 180秒、audio-reactive背景

## ⚡ クイックコマンド

```bash
# 音声生成からレンダリングまで一気に
node ~/.cursor/skills/fish-audio-hyperframes/scripts/fish-tts.js narration.txt ./audio && \
cp audio/*.mp3 . && \
cp audio/transcript.json . && \
# (index.htmlを生成) && \
npx hyperframes render --output video.mp4

# プレビューしながら編集
npx hyperframes preview --watch
```

---

**重要**: このスキルはFish Audio API + HyperFramesの統合を扱います。基本的なHyperFrames使用法は`hyperframes` skillを、CLI詳細は`hyperframes-cli` skillを参照してください。
