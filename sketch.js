// =========================================
// 3-Link Planar Robot - Forward Kinematics
// =========================================

// ---------- Canvas ----------
const canvasW = 900;
const canvasH = 700;

// Robot Base
const baseX = 450;
const baseY = 350;

// Robot Parameters
let L1 = 120;
let L2 = 120;
let L3 = 100;

let t1 = 30;
let t2 = 20;
let t3 = -20;

// Sliders
let l1Slider, l2Slider, l3Slider;
let t1Slider, t2Slider, t3Slider;

function setup() {

  createCanvas(canvasW, canvasH);

  angleMode(DEGREES);
  textFont('Arial');

  // ----------------------------
  // Link Length Sliders
  // ----------------------------
  l1Slider = createSlider(50, 250, L1, 1);
  l2Slider = createSlider(50, 250, L2, 1);
  l3Slider = createSlider(50, 250, L3, 1);

  l1Slider.position(20, 30);
  l2Slider.position(20, 70);
  l3Slider.position(20, 110);

  // ----------------------------
  // Joint Angle Sliders
  // ----------------------------
  t1Slider = createSlider(-180, 180, t1, 1);
  t2Slider = createSlider(-180, 180, t2, 1);
  t3Slider = createSlider(-180, 180, t3, 1);

  t1Slider.position(20, 190);
  t2Slider.position(20, 230);
  t3Slider.position(20, 270);
}

function draw() {

  background(250);

  // Read Slider Values
  L1 = l1Slider.value();
  L2 = l2Slider.value();
  L3 = l3Slider.value();

  t1 = t1Slider.value();
  t2 = t2Slider.value();
  t3 = t3Slider.value();

  // Draw Background Grid
  drawGrid();

  // Draw Coordinate Axes
  drawAxes();

  // Forward Kinematics
  let x1 = baseX + L1 * cos(t1);
  let y1 = baseY + L1 * sin(t1);

  let x2 = x1 + L2 * cos(t1 + t2);
  let y2 = y1 + L2 * sin(t1 + t2);

  let x3 = x2 + L3 * cos(t1 + t2 + t3);
  let y3 = y2 + L3 * sin(t1 + t2 + t3);

  // Draw Robot links
  stroke(40);
  strokeWeight(8);

  line(baseX, baseY, x1, y1);
  line(x1, y1, x2, y2);
  line(x2, y2, x3, y3);

  // Draw Joints
  strokeWeight(2);

  fill(60);
  circle(baseX, baseY, 18);

  fill(80);
  circle(x1, y1, 18);

  fill(80);
  circle(x2, y2, 18);

  fill(255, 0, 0);
  circle(x3, y3, 16);

  // Draw End Effector Label
  fill(255, 0, 0);
  noStroke();
  textSize(14);
  text("End Effector", x3 + 10, y3);

  // Information Panel
  drawInfo(x3, y3);
}

// =========================================
// Draw Grid
// =========================================

function drawGrid() {

  stroke(220);
  strokeWeight(1);

  for (let x = 0; x < width; x += 25) {
    line(x, 0, x, height);
  }

  for (let y = 0; y < height; y += 25) {
    line(0, y, width, y);
  }

}

// =========================================
// Draw Coordinate Axes
// =========================================

function drawAxes() {

  strokeWeight(2);

  // X Axis
  stroke(255, 0, 0);
  line(baseX - 300, baseY, baseX + 300, baseY);

  // Y Axis
  stroke(0, 150, 0);
  line(baseX, baseY - 300, baseX, baseY + 300);

}

// =========================================
// Information Panel
// =========================================

function drawInfo(x3, y3) {

  fill(20);
  noStroke();

  textSize(18);
  text("3-Link Forward Kinematics", 20, 20);

  textSize(15);

  text("Link 1 Length : " + L1, 220, 45);
  text("Link 2 Length : " + L2, 220, 85);
  text("Link 3 Length : " + L3, 220, 125);

  text("θ1 : " + t1 + "°", 220, 205);
  text("θ2 : " + t2 + "°", 220, 245);
  text("θ3 : " + t3 + "°", 220, 285);

  textSize(18);

  text("End Effector Position", 20, 360);

  textSize(16);

  text("X : " + nf(x3 - baseX, 1, 2), 20, 390);
  text("Y : " + nf(y3 - baseY, 1, 2), 20, 420);

}