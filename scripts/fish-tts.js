#!/usr/bin/env node

/**
 * Fish Audio TTS Generator for HyperFrames
 * Generates audio using Fish Audio API and prepares transcript for captions
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.FISH_AUDIO_API_KEY;
const API_ENDPOINT = 'https://api.fish.audio/v1/tts';

if (!API_KEY) {
  console.error('❌ FISH_AUDIO_API_KEY environment variable not set');
  console.error('   Set it with: export FISH_AUDIO_API_KEY="your-api-key"');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log(`
使い方:
  node fish-tts.js <script.txt> <output-dir> [voice] [language]

引数:
  script.txt    音声化するテキストファイル（1行1フレーズ）
  output-dir    音声ファイルとトランスクリプトの出力先
  voice         Fish Audioのボイスモデル ID（デフォルト: ja-JP-standard）
  language      言語コード（デフォルト: ja）

例:
  node fish-tts.js narration.txt ./audio ja-JP-standard ja
  `);
  process.exit(0);
}

const [scriptFile, outputDir, voice = 'ja-JP-standard', language = 'ja'] = args;

// スクリプトファイルを読み込む
if (!fs.existsSync(scriptFile)) {
  console.error(`❌ Script file not found: ${scriptFile}`);
  process.exit(1);
}

const script = fs.readFileSync(scriptFile, 'utf-8')
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0 && !line.startsWith('#'));

if (script.length === 0) {
  console.error('❌ No text found in script file');
  process.exit(1);
}

// 出力ディレクトリを作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`🎤 Fish Audio TTS Generator`);
console.log(`   Voice: ${voice}`);
console.log(`   Language: ${language}`);
console.log(`   Lines: ${script.length}`);
console.log('');

// トランスクリプトの初期化
const transcript = {
  duration: 0,
  segments: []
};

let currentTime = 0;

// 各行を処理
async function generateAudio() {
  for (let i = 0; i < script.length; i++) {
    const text = script[i];
    const outputFile = path.join(outputDir, `segment-${String(i + 1).padStart(3, '0')}.mp3`);
    
    console.log(`[${i + 1}/${script.length}] "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);
    
    try {
      // Fish Audio API呼び出し（実際のAPIエンドポイントとパラメータは要確認）
      const audioBuffer = await callFishAudioAPI(text, voice, language);
      
      // ファイルに保存
      fs.writeFileSync(outputFile, audioBuffer);
      
      // 音声の長さを推定（実際はffprobeなどで正確に取得すべき）
      const estimatedDuration = estimateDuration(text, language);
      
      // トランスクリプトに追加
      transcript.segments.push({
        start: currentTime,
        end: currentTime + estimatedDuration,
        text: text,
        file: path.basename(outputFile)
      });
      
      currentTime += estimatedDuration + 0.3; // 0.3秒の間隔
      
      console.log(`   ✓ Saved: ${path.basename(outputFile)} (${estimatedDuration.toFixed(2)}s)`);
      
    } catch (error) {
      console.error(`   ✗ Failed: ${error.message}`);
      process.exit(1);
    }
    
    // API制限を考慮して少し待機
    if (i < script.length - 1) {
      await sleep(500);
    }
  }
  
  transcript.duration = currentTime - 0.3;
  
  // トランスクリプトをJSONで保存
  const transcriptFile = path.join(outputDir, 'transcript.json');
  fs.writeFileSync(transcriptFile, JSON.stringify(transcript, null, 2));
  
  console.log('');
  console.log(`✅ Complete!`);
  console.log(`   Total duration: ${transcript.duration.toFixed(2)}s`);
  console.log(`   Transcript: ${transcriptFile}`);
  console.log('');
  console.log('次のステップ:');
  console.log(`   1. HyperFramesプロジェクトに音声ファイルをコピー`);
  console.log(`   2. index.htmlに<audio>要素を追加`);
  console.log(`   3. transcript.jsonを使用してキャプションを生成`);
}

// Fish Audio API呼び出し（実装例）
function callFishAudioAPI(text, voice, language) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      text: text,
      voice: voice,
      language: language,
      format: 'mp3'
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(API_ENDPOINT, options, (res) => {
      const chunks = [];
      
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(Buffer.concat(chunks));
        } else {
          reject(new Error(`API returned ${res.statusCode}: ${Buffer.concat(chunks).toString()}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

// 音声の長さを推定（文字数ベース）
function estimateDuration(text, language) {
  // 日本語: 約7文字/秒、英語: 約15文字/秒
  const charsPerSecond = language === 'ja' ? 7 : 15;
  return Math.max(1.0, text.length / charsPerSecond);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 実行
generateAudio().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
