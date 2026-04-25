# Fish Audio × HyperFrames 実践例

## 例1: シンプルなナレーション動画（30秒）

### ナレーションスクリプト (`narration.txt`)

```
こんにちは、新しい未来へようこそ。
私たちは革新的なソリューションを提供します。
詳しくは、公式サイトをご覧ください。
```

### 音声生成

```bash
node ~/.cursor/skills/fish-audio-hyperframes/scripts/fish-tts.js \
  narration.txt \
  ./audio \
  ja-JP-Female-1 \
  ja
```

### コンポジション (`index.html`)

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
      font-family: 'Noto Sans JP', -apple-system, sans-serif;
      background: #000;
      color: #fff;
    }
  </style>
</head>
<body>
  <div data-composition-id="main" data-width="1920" data-height="1080">
    
    <!-- BGM -->
    <audio id="bgm" data-start="0" data-duration="10" data-track-index="10" data-volume="0.2" src="bgm.mp3"></audio>
    
    <!-- ナレーション音声 (3セグメントを連結したもの) -->
    <audio id="narration" data-start="0" data-duration="10" data-track-index="11" src="full-narration.mp3"></audio>
    
    <!-- シーン1 (0-3.5s) -->
    <div id="scene-1" data-start="0" data-duration="3.5" data-track-index="0">
      <div class="scene-content">
        <h1 class="title">こんにちは、<br>新しい未来へようこそ。</h1>
        <div class="decoration-circle"></div>
      </div>
    </div>
    
    <!-- シーン2 (3.5-7s) -->
    <div id="scene-2" data-start="3.5" data-duration="3.5" data-track-index="0">
      <div class="scene-content">
        <h2 class="subtitle">私たちは革新的な<br>ソリューションを提供します。</h2>
        <div class="icon-grid">
          <div class="icon">🚀</div>
          <div class="icon">💡</div>
          <div class="icon">⚡</div>
        </div>
      </div>
    </div>
    
    <!-- シーン3 (7-10s) -->
    <div id="scene-3" data-start="7" data-duration="3" data-track-index="0">
      <div class="scene-content">
        <h3 class="cta">詳しくは、<br>公式サイトをご覧ください。</h3>
        <div class="url">www.example.com</div>
      </div>
    </div>
    
    <!-- Audio-reactive背景 -->
    <div id="bg-gradient" data-start="0" data-duration="10" data-track-index="1"></div>

    <style>
      [data-composition-id="main"] {
        position: relative;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        overflow: hidden;
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
        position: relative;
      }
      
      .title {
        font-size: 96px;
        font-weight: 900;
        line-height: 1.2;
        color: #ffffff;
        text-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
        letter-spacing: -0.02em;
      }
      
      .subtitle {
        font-size: 72px;
        font-weight: 700;
        line-height: 1.3;
        color: #e0e0e0;
        text-shadow: 0 4px 24px rgba(0, 0, 0, 0.7);
      }
      
      .cta {
        font-size: 64px;
        font-weight: 700;
        line-height: 1.3;
        color: #ffffff;
        margin-bottom: 40px;
      }
      
      .url {
        font-size: 48px;
        font-weight: 500;
        color: #60a5fa;
        text-decoration: none;
        padding: 16px 48px;
        background: rgba(96, 165, 250, 0.1);
        border: 2px solid #60a5fa;
        border-radius: 16px;
      }
      
      .decoration-circle {
        position: absolute;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(138, 43, 226, 0.4) 0%, transparent 70%);
        z-index: -1;
      }
      
      .icon-grid {
        display: flex;
        gap: 60px;
        margin-top: 60px;
      }
      
      .icon {
        font-size: 120px;
        filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.5));
      }
      
      #bg-gradient {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
          circle at 50% 50%,
          rgba(138, 43, 226, 0.15) 0%,
          transparent 60%
        );
        z-index: 0;
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
      
      // シーン1: タイトルエントランス
      tl.from("#scene-1 .title", {
        y: 80,
        opacity: 0,
        duration: 1.0,
        ease: "expo.out"
      }, 0.3);
      
      tl.from("#scene-1 .decoration-circle", {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.4)"
      }, 0.5);
      
      // シーン1→2 クロスフェード
      tl.to("#scene-1", {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, 3.3);
      
      // シーン2: サブタイトル + アイコン
      tl.from("#scene-2 .subtitle", {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, 3.6);
      
      tl.from("#scene-2 .icon", {
        y: 40,
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, 4.2);
      
      // シーン2→3 スライド
      tl.to("#scene-2", {
        x: -1920,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
      }, 6.8);
      
      // シーン3: CTA
      tl.from("#scene-3 .cta", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
      }, 7.2);
      
      tl.from("#scene-3 .url", {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.4)"
      }, 7.7);
      
      // 最終フェードアウト
      tl.to("#scene-3", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      }, 9.5);
      
      // 背景グラデーションのパルス
      tl.to("#bg-gradient", {
        opacity: 0.5,
        duration: 2,
        ease: "sine.inOut",
        repeat: 4,
        yoyo: true
      }, 0);
      
      window.__timelines["main"] = tl;
    </script>
  </div>
</body>
</html>
```

### レンダリング

```bash
npx hyperframes render --output promo-30s.mp4
```

---

## 例2: チュートリアル動画（60秒、5ステップ）

### ナレーションスクリプト (`tutorial.txt`)

```
ステップ1: アプリをダウンロードします。
ステップ2: アカウントを作成します。
ステップ3: プロフィールを設定します。
ステップ4: 興味のあるトピックを選びます。
ステップ5: さあ、始めましょう！
```

### 特徴

- 各ステップに番号とアイコン
- プログレスバー
- ステップごとに異なる色アクセント
- シンプルなワイプ遷移

### コンポジション構造

```javascript
// ステップ1-5をループで生成
const steps = [
  { num: 1, text: "アプリをダウンロード", icon: "📱", color: "#3b82f6" },
  { num: 2, text: "アカウント作成", icon: "👤", color: "#8b5cf6" },
  { num: 3, text: "プロフィール設定", icon: "⚙️", color: "#ec4899" },
  { num: 4, text: "トピック選択", icon: "🎯", color: "#f59e0b" },
  { num: 5, text: "開始", icon: "🚀", color: "#10b981" }
];

// 各ステップ12秒、最後にCTA 10秒
// タイムラインで順次表示
```

---

## 例3: Audio-reactive ポッドキャストビジュアライザー

### ナレーション（長文）

```
# podcast-episode.txt
今日のエピソードへようこそ。
テクノロジーの未来について語ります。
AIは私たちの生活をどう変えるのか。
... (180秒分のスクリプト)
```

### 特徴

- 音声の周波数分析に基づく波形ビジュアライザー
- リアルタイムキャプション（単語レベル同期）
- 低音・中音・高音で異なるビジュアルエフェクト
- シンプルな背景、テキスト中心

### Audio-reactive実装

```javascript
// Web Audio API + Canvas
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 512;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function drawWaveform() {
  analyser.getByteFrequencyData(dataArray);
  
  // 低音 (0-100Hz)
  const bass = dataArray.slice(0, 10).reduce((a, b) => a + b) / 10;
  
  // 中音 (100-4000Hz)
  const mid = dataArray.slice(10, 80).reduce((a, b) => a + b) / 70;
  
  // 高音 (4000Hz+)
  const treble = dataArray.slice(80).reduce((a, b) => a + b) / (bufferLength - 80);
  
  // GSAPでビジュアルを更新
  gsap.to("#bass-circle", { scale: 1 + bass / 255, duration: 0.1 });
  gsap.to("#mid-bars", { scaleY: 1 + mid / 255, duration: 0.1 });
  gsap.to("#treble-glow", { opacity: treble / 255, duration: 0.1 });
}

// アニメーションループ
gsap.ticker.add(drawWaveform);
```

詳細は`hyperframes` skillの`references/audio-reactive.md`を参照。

---

## 例4: 多言語対応動画

### 英語版ナレーション

```bash
node ~/.cursor/skills/fish-audio-hyperframes/scripts/fish-tts.js \
  narration-en.txt \
  ./audio-en \
  en-US-Male-1 \
  en
```

### 日本語版ナレーション

```bash
node ~/.cursor/skills/fish-audio-hyperframes/scripts/fish-tts.js \
  narration-ja.txt \
  ./audio-ja \
  ja-JP-Female-1 \
  ja
```

### 2つのバージョンをビルド

```bash
# 英語版
cp audio-en/*.mp3 .
npx hyperframes render --output video-en.mp4

# 日本語版
rm *.mp3
cp audio-ja/*.mp3 .
npx hyperframes render --output video-ja.mp4
```

---

## 共通パターン: テンプレート生成スクリプト

ナレーションスクリプトから`index.html`を自動生成する簡易スクリプト:

```javascript
// generate-composition.js
const fs = require('fs');

const transcript = JSON.parse(fs.readFileSync('transcript.json', 'utf-8'));

let scenes = '';
let animations = '';

transcript.segments.forEach((seg, i) => {
  const sceneId = `scene-${i + 1}`;
  
  scenes += `
    <div id="${sceneId}" data-start="${seg.start}" data-duration="${seg.end - seg.start}" data-track-index="0">
      <div class="scene-content">
        <div class="caption">${seg.text}</div>
      </div>
    </div>
  `;
  
  animations += `
    // ${sceneId} エントランス
    tl.from("#${sceneId} .caption", {
      y: 60,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    }, ${seg.start + 0.2});
    
  `;
  
  if (i < transcript.segments.length - 1) {
    const nextStart = transcript.segments[i + 1].start;
    animations += `
    // ${sceneId}→scene-${i + 2} トランジション
    tl.to("#${sceneId}", {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut"
    }, ${seg.end - 0.2});
    
    `;
  }
});

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    /* スタイルをここに */
  </style>
</head>
<body>
  <div data-composition-id="main" data-width="1920" data-height="1080">
    <audio id="narration" data-start="0" data-duration="${transcript.duration}" data-track-index="10" src="full-audio.mp3"></audio>
    ${scenes}
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      ${animations}
      window.__timelines["main"] = tl;
    </script>
  </div>
</body>
</html>`;

fs.writeFileSync('index.html', html);
console.log('✅ index.html generated');
```

使用:

```bash
node generate-composition.js
```

---

これらの例を参考に、Fish Audio + HyperFramesで魅力的な音声同期動画を作成してください。
