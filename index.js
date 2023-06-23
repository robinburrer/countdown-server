const express = require('express');
const { createCanvas, registerFont } = require('canvas');
const GIFEncoder = require('gif-encoder-2');
const fs = require('fs');

const app = express();
const port = 4000;

// Register your font if you're using a custom font
// Register your font if you're using a custom font
registerFont('/System/Library/Fonts/Supplemental/Arial Black.ttf', {
  family: 'YourFontName',
});

app.get('/', (req, res) => {
  res.set('Content-Type', 'image/gif');

  const canvasWidth = 500;
  const canvasHeight = 300;

  // Create a canvas
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Create a GIF encoder
  const encoder = new GIFEncoder(canvasWidth, canvasHeight);
  encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
  encoder.setDelay(1000); // 1 second delay between frames

  // Pipe the encoder's output directly to the response
  encoder.createReadStream().pipe(res);

  encoder.start();

  // Draw the countdown frames
  const countdownDuration = 10; // 10 seconds
  for (let i = countdownDuration; i >= 0; i--) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.font = '40px YourFontName'; // Use your desired font name here
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Countdown: ${i}`, canvasWidth / 2, canvasHeight / 2);

    encoder.addFrame(ctx);
  }

  encoder.finish();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
