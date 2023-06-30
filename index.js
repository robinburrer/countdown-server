const express = require('express');
const maxmind = require('maxmind');
//const readLocation = require('./timeAndLocation');
const { createCanvas, registerFont } = require('canvas');
const GIFEncoder = require('gif-encoder-2');
const fs = require('fs');

const app = express();

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = process.env.PORT || normalizePort('4000');

// Register your font
registerFont('./resources/Portada-Bold.ttf', {
  family: 'YourFontName',
});

const generateDisplayString = (counter) => {
  let now = new Date();
  now = new Date(now.getTime() - counter * 1000);

  // 11.11 at 11.11 :-)
  const targetDate = new Date(2023, 10, 11, 11, 11);

  // Calculate the time difference in milliseconds
  const timeDiff = targetDate.getTime() - now.getTime();

  // Convert milliseconds to days, hours, minutes, and seconds
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  const displayString = `${days} ${
    days > 1 || days === 0 ? 'days' : 'day'
  } - ${remainingHours} ${
    remainingHours > 1 || remainingHours === 0 ? 'hours' : 'hour'
  } - ${remainingMinutes} ${
    remainingMinutes > 1 || remainingMinutes === 0 ? 'minutes' : 'minute'
  } - ${remainingSeconds} seconds`;

  return { displayString };
};

// END LOCATION

app.get('/', (req, res) => {
  // readLocation(req);
  res.set('Content-Type', 'image/gif');

  const canvasWidth = 600;
  const canvasHeight = 100;

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
  const countdownDuration = 30; // 10 seconds

  for (let i = countdownDuration; i >= 0; i--) {
    const { displayString } = generateDisplayString(i);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.font = '20px YourFontName'; // Use your desired font name here
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fontWeiht = 'bold';
    ctx.textBaseline = 'middle';

    ctx.fillText(`${displayString}`, canvasWidth / 2, canvasHeight / 2);

    encoder.addFrame(ctx);
  }

  encoder.finish();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
