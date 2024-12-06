// Get the video element from the DOM
const videoElement = document.querySelector('.input_video');

// Get the canvas element from the DOM
const canvasElement = document.querySelector('.output_canvas');
const canvasCtx = canvasElement.getContext('2d');

// Define the landmarks indices for reference
const LANDMARKS = {
  WRIST: 0,
  THUMB_CMC: 1,    // Thumb Carpometacarpal
  THUMB_MCP: 2,    // Thumb Metacarpophalangeal
  THUMB_IP: 3,     // Thumb Interphalangeal
  THUMB_TIP: 4,    // Thumb Tip
  INDEX_FINGER_MCP: 5,
  INDEX_FINGER_PIP: 6,
  INDEX_FINGER_DIP: 7,
  INDEX_FINGER_TIP: 8,
  MIDDLE_FINGER_MCP: 9,
  MIDDLE_FINGER_PIP: 10,
  MIDDLE_FINGER_DIP: 11,
  MIDDLE_FINGER_TIP: 12,
  RING_FINGER_MCP: 13,
  RING_FINGER_PIP: 14,
  RING_FINGER_DIP: 15,
  RING_FINGER_TIP: 16,
  LITTLE_FINGER_MCP: 17,
  LITTLE_FINGER_PIP: 18,
  LITTLE_FINGER_DIP: 19,
  LITTLE_FINGER_TIP: 20
};

// Define the function to extract landmarks
function extractLandmarks(handLandmarks) {
  const wrist = handLandmarks[LANDMARKS.WRIST];
  const thumbTip = handLandmarks[LANDMARKS.THUMB_TIP];
  const indexTip = handLandmarks[LANDMARKS.INDEX_FINGER_TIP];
  const middleTip = handLandmarks[LANDMARKS.MIDDLE_FINGER_TIP];
  const ringTip = handLandmarks[LANDMARKS.RING_FINGER_TIP];
  const littleTip = handLandmarks[LANDMARKS.LITTLE_FINGER_TIP];

  return {
    wrist,
    thumbTip,
    indexTip,
    middleTip,
    ringTip,
    littleTip
  };
}

// Function to clear previous landmarks drawn on the canvas
function clearLandmarks() {
  const existingLandmarks = document.querySelectorAll('.landmark');
  existingLandmarks.forEach(landmark => landmark.remove());
}

// Results handler for the hand tracking model
function onResults(results) {
  // Resize canvas to match the video dimensions
  clearLandmarks();
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;

  // Draw the video on the canvas
  canvasCtx.scale(-1, 1);
  canvasCtx.translate(-canvasElement.width, 0);
  canvasCtx.fillStyle = '#FF0000'; // Solid gray color
  canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  // Draw hand landmarks and connections if detected
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      // Extract landmarks using the defined constants
      const { wrist, thumbTip, indexTip, middleTip, ringTip, littleTip } = extractLandmarks(landmarks);
      
      // Optionally log or use the extracted landmarks
      console.log('Wrist:', wrist);
      console.log('Thumb Tip:', thumbTip);
      console.log('Index Tip:', indexTip);

      // Draw the landmarks on the canvas
      drawLandmarks(canvasCtx, landmarks, { color: '#8D0000', lineWidth: 2 });
    }
  }
}

// Set up the hands model
const handsModel = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

handsModel.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

// Start the camera and start processing frames
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await handsModel.send({ image: videoElement });
  },
  width: window.innerWidth,
  height: window.innerHeight,
});

camera.start();

// Set the hands model to use the onResults function
handsModel.onResults(onResults);
