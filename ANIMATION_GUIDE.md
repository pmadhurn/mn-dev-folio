# Hero Animation Guide

This project supports displaying an AI-generated animated video in the Hero section instead of the static portrait image.

## How it Works

The `Hero` component checks for the existence of `public/animations/hero-portrait.mp4`.
- If the file exists, it plays the video (autoplay, loop, muted).
- If the file is missing, it falls back to `src/assets/hero-portrait.jpg`.

## Generating the Animation

We have provided a script to generate the animation using [Replicate's](https://replicate.com) API and the **Kling v1** model (or similar image-to-video models).

### Prerequisites

1.  **Node.js** installed.
2.  A **Replicate Account** and API Token.
    - Sign up at [replicate.com](https://replicate.com).
    - Get your token from [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens).

### Steps to Generate

1.  Open your terminal.
2.  Export your API token:
    ```bash
    export REPLICATE_API_TOKEN=r8_YourReplicateTokenHere...
    ```
    *(On Windows PowerShell: `$env:REPLICATE_API_TOKEN = "r8_..."`)*

3.  Run the generation script:
    ```bash
    node scripts/generate_animation.js
    ```

4.  Wait for the script to finish. It will:
    - Upload your `hero-portrait.jpg`.
    - Request a prediction from the AI model.
    - Download the resulting MP4 to `public/animations/hero-portrait.mp4`.

5.  Restart or refresh your development server (`npm run dev`) to see the change.

## Customization

You can edit `scripts/generate_animation.js` to change the **prompt** or **model** used for generation.
