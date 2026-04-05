// Script to generate a video animation from the hero image using Replicate (Kling v1)
// Usage: node scripts/generate_animation.js
// Prerequisites:
// 1. Get a Replicate API Token from https://replicate.com/account/api-tokens
// 2. Set it as an environment variable: export REPLICATE_API_TOKEN=your_token_here

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const MODEL_VERSION = "kling-ai/kling-v1"; // Replicate model ID

const INPUT_IMAGE_PATH = path.join(__dirname, '../src/assets/hero-portrait.jpg');
const OUTPUT_DIR = path.join(__dirname, '../public/animations');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'hero-portrait.mp4');

if (!REPLICATE_API_TOKEN) {
  console.error('Error: REPLICATE_API_TOKEN environment variable is not set.');
  console.error('Please export your token: export REPLICATE_API_TOKEN=r8_...');
  process.exit(1);
}

if (!fs.existsSync(INPUT_IMAGE_PATH)) {
  console.error(`Error: Input image not found at ${INPUT_IMAGE_PATH}`);
  process.exit(1);
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateAnimation() {
  console.log('Reading input image...');
  const imageBuffer = fs.readFileSync(INPUT_IMAGE_PATH);
  // Convert to base64 data URI
  const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  console.log('Submitting prediction to Replicate...');

  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "a7ac5a69a63200dfcb9a45618400499e98b049286d9a0f44358a94632c0ef007", // Specific version hash for stability or use model name if supported by endpoint
        // Ideally use the model owner/name endpoint if version hash is unknown, but direct prediction endpoint often needs version
        // Let's try creating a prediction using the model path if the API supports it, otherwise we need the version.
        // For Replicate HTTP API, it's safer to POST to /v1/models/kling-ai/kling-v1/predictions
        input: {
          image: base64Image,
          prompt: "subtle breathing motion, slight head turn, professional, high quality, photorealistic",
          duration: 5,
          cfg_scale: 0.5
        }
      })
    });

    if (!response.ok) {
        // Try the model endpoint if version endpoint failed or if we want to use the simpler path
        const modelResponse = await fetch('https://api.replicate.com/v1/models/kling-ai/kling-v1/predictions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
              'Content-Type': 'application/json',
              'Prefer': 'wait' // Optional: wait for a bit to see if it finishes quickly
            },
            body: JSON.stringify({
              input: {
                input_image: base64Image, // Kling v1 usually takes 'input_image' or 'image'. Checking docs is key.
                // Common Kling params: prompt, negative_prompt, cfg_scale, duration
                prompt: "cinematic, 4k, subtle motion, breathing, slight smile, professional",
                duration: 5
              }
            })
        });

        if (!modelResponse.ok) {
             const errText = await modelResponse.text();
             throw new Error(`Replicate API Error: ${modelResponse.status} ${modelResponse.statusText} - ${errText}`);
        }

        var prediction = await modelResponse.json();
    } else {
        var prediction = await response.json();
    }

    console.log(`Prediction created. ID: ${prediction.id}`);
    console.log(`Status: ${prediction.status}`);

    // Poll for result
    while (prediction.status !== 'succeeded' && prediction.status !== 'failed' && prediction.status !== 'canceled') {
      await new Promise(r => setTimeout(r, 2000)); // Wait 2 seconds

      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: {
          'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        }
      });

      if (!pollResponse.ok) {
          throw new Error(`Polling failed: ${pollResponse.status}`);
      }

      prediction = await pollResponse.json();
      console.log(`Status: ${prediction.status}`);
    }

    if (prediction.status === 'succeeded') {
      const videoUrl = prediction.output; // Usually the output is a URL string or array of URLs
      const urlToFetch = Array.isArray(videoUrl) ? videoUrl[0] : videoUrl;

      console.log(`Generation success! Downloading video from ${urlToFetch}...`);

      const videoResponse = await fetch(urlToFetch);
      const videoArrayBuffer = await videoResponse.arrayBuffer();
      const videoBuffer = Buffer.from(videoArrayBuffer);

      fs.writeFileSync(OUTPUT_FILE, videoBuffer);
      console.log(`Video saved to ${OUTPUT_FILE}`);
    } else {
      console.error('Prediction failed or was canceled.');
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

generateAnimation();
