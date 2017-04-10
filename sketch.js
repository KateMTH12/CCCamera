//Inspired by Shiffman's https://www.youtube.com/watch?v=oLiaUEKsRws

var video;
var img;
var pics = [];
var maxShots;
var counter = 0;
var mX = 0;
var mY = 0;
var bw = false;
var Green = false;
var Blue = false;
var Red = false;
var rainbow = false;
var plain = true;
var multi = false;
var counter2 = 0;


function setup() {
  createCanvas(640, 500);
  background(0);
  video = createCapture(VIDEO);
  img = createImage(640, 480);
  img.loadPixels();
}

function draw() {
  video.loadPixels();
  mX = map(mouseX, 0, width, 0, 255);
  mY = map(mouseY, 0, height, 0, 255);

  for (var i = 0; i < video.pixels.length; i += 4) {
    var r = video.pixels[i];
    var g = video.pixels[i + 1];
    var b = video.pixels[i + 2];
    var a = video.pixels[i + 3];

    if (Red === true) {
      r = r;
      g = 0;
      b = 0;
    } else if (Green === true) {
      r = 0;
      g = g;
      b = 0;
    } else if (Blue === true) {
      r = 0;
      g = 0;
      b = b;
    } else if (bw === true) {
      r = r;
      b = r;
      g = r;
    } else if (rainbow === true) {
      r = abs(b - mX) % 255;
      g = abs(mY - r) % 255;
      b = abs(mX + g) % 255;
    } else if (plain === true) {
      r = r;
      g = g;
      b = b;
    }

    img.pixels[i] = r;
    img.pixels[i + 1] = g;
    img.pixels[i + 2] = b;
    img.pixels[i + 3] = a;

  }
  img.updatePixels();
  translate(img.width, 0);
  scale(-1, 1);
  var x = 0;
  var y = 0;
  var picW = 160;
  var picH = 120;

  for (var j = 0; j < pics.length; j++) {
    image(pics[j], x, y, picW, picH);
    x += picW;

    if (x > width - picW) {
      x = 0;
      y += picH;
    }
    if (y > height - picH) {
      x = 0;
      y = 0;
    }

  }
  if (pics.length > 16) {
    pics.splice(0, 1);
    x = 0;
    y = 0;
  }
  noStroke();
  fill(255, 0, 0);
  rect(0, 480, 128, 20);
  fill(0, 255, 0);
  rect(128, 480, 128, 20);
  fill(0, 0, 255);
  rect(256, 480, 128, 20);
  for (var k = 120; k < 512; k += 20) {
    fill(k % 255);
    rect(k + 264, 480, k, 20);
  }
  for (var m = 120; m < width; m += 8) {
    for (var n = 100; n < height; n += 5) {
      fill(m % 255, 180, n % 255);
      rect(m + 392, n + 380, 8, 5);
    }
  }

}

function mouseReleased() {
  if (mouseY < 480) {
    if (multi === true) {
      pics.push(video);
    } else {
      pics.push(img.get());
    }
    counter++;
  }
}


function mousePressed() {
  if (mouseY >= 480) {
    if (mouseX < 128) {
      bw = false;
      Green = false;
      Blue = false;
      Red = false;
      rainbow = true;
      plain = false;
    } else if (mouseX < 256) {
      bw = true;
      Green = false;
      Blue = false;
      Red = false;
      rainbow = false;
      plain = false;
    } else if (mouseX < 384) {
      bw = false;
      Green = false;
      Blue = true;
      Red = false;
      rainbow = false;
      plain = false;
    } else if (mouseX < 512) {
      bw = false;
      Green = true;
      Blue = false;
      Red = false;
      rainbow = false;
      plain = false;
    } else if (mouseX < width) {
      bw = false;
      Green = false;
      Blue = false;
      Red = true;
      rainbow = false;
      plain = false;
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    bw = false;
    Green = false;
    Blue = false;
    Red = false;
    rainbow = false;
    plain = true;

  }
  if (keyCode == ENTER || keyCode == RETURN) {
    counter2++;
    if (counter2 % 2 == 1) {
      multi = false;
    } else {
      multi = true;
    }
  }
}
