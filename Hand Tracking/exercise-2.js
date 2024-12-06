let video;
var h, w;
let handPose;
let hands = [];
let painting;

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);  
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fingers = createGraphics(windowWidth, windowHeight);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  video.size(1200, windowHeight);
  video.position(0 ,  )
  handPose.detectStart(video, gotHands);
  frameRate(20);
}

function draw() {
  image(video, 0, 0);
  image(fingers, 0, 0);
  fingers.background(255,0,0);

  beginShape();
  if (hands.length > 0) {
    let hand = hands[0];

    let thumb1 = hand.thumb_tip;
    let thumba = hand.thumb_mcp;

    let index2 = hand.index_finger_tip;
    let indexb = hand.index_finger_mcp;

    let middle3 = hand.middle_finger_tip;
    let middlec = hand.middle_finger_mcp;

    let ring4 = hand.ring_finger_tip;
    let ringd = hand.ring_finger_mcp;

    let pinky5 = hand.pinky_finger_tip;
    let pinkye = hand.pinky_finger_mcp;

    let wristf = hand.wrist;

    fingers.textSize(32);
    fingers.fill(141,0,0);
    fingers.stroke(0);
    fingers.strokeWeight(0);

    fingers.text('1', thumb1.x, thumb1.y);
    fingers.text('2', index2.x, index2.y);
    fingers.text('3', middle3.x, middle3.y);
    fingers.text('4', ring4.x, ring4.y);
    fingers.text('5', pinky5.x, pinky5.y);

    fingers.text('a', thumba.x, thumba.y);
    fingers.text('b', indexb.x, indexb.y);
    fingers.text('c', middlec.x, middlec.y);
    fingers.text('d', ringd.x, ringd.y);
    fingers.text('e', pinkye.x, pinkye.y);

    fingers.text('f', wristf.x, wristf.y);

    let d = dist(index2.x, index2.y, thumb1.x, thumb1.y);
    let d1 = dist(middle3.x, middle3.y, thumb1.x, thumb1.y);
    let d2 = dist(ring4.x, ring4.y, thumb1.x, thumb1.y);
    let d3 = dist(pinky5.x, pinky5.y, thumb1.x, thumb1.y);
    let d4 = dist(index2.x, index2.y, thumb1.x, thumb1.y);

    if ( d < 50) {
      fingers.textSize(32);
      fingers.fill(134,134,134);
      fingers.stroke(134,134,134);
      fingers.strokeWeight(0);
      fingers.background(212,255,0);
      fingers.text('1', thumb1.x, thumb1.y);
      fingers.text('2', index2.x, index2.y);
    } else if (d > 50 && d1 < 50 ){
      fingers.textSize(32);
      fingers.fill(134,134,134);
      fingers.stroke(134,134,134);
      fingers.strokeWeight(0);
      fingers.background(212,255,0);
      fingers.text('1', thumb1.x, thumb1.y);
      fingers.text('3', middle3.x, middle3.y);
    } else if (d > 50 && d1 > 50 &&  d2 < 50){
      fingers.textSize(32);
      fingers.fill(134,134,134);
      fingers.stroke(134,134,134);
      fingers.strokeWeight(0);
      fingers.background(212,255,0);
      fingers.text('1', thumb1.x, thumb1.y);
      fingers.text('4', ring4.x, ring4.y);
    } else if (d > 50 && d1 > 50 &&  d2 > 50 && d3 < 50){
      fingers.textSize(32);
      fingers.fill(134,134,134);
      fingers.stroke(134,134,134);
      fingers.strokeWeight(0);
      fingers.background(212,255,0);
      fingers.text('job', thumb1.x, thumb1.y);
      fingers.text('good', pinky5.x, pinky5.y);
    }
    

    endShape();
    
  }
  
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   fingers(windowWidth, windowHeight);
// }
