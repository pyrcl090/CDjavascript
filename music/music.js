//create canvas
const canv = document.querySelector("canvas");

//set the with and height of the canvas
canv.width = window.innerWidth * 2;
canv.height = window.innerHeight * 2;

canv.style.width = window.innerWidth + "px";
canv.style.height = window.innerHeight + "px";

//-- Mouse Move Glitch Collage Using HTML Canvas from library.superhi.com --//
//set up 2d canvas
const ctx = canv.getContext("2d");
ctx.scale(2, 2);

//intitallize mouse position
let mouseX = null;
let mouseY = null;
let updateMouseX = null;
let updateMouseY = null;

//create array with images
let i = 0;
const uncomfyImgs = ["postc1.jpg", "postc2.jpg", "postc3.jpg", "postc4.jpg", "postc5.jpg", "postc6.jpg", "postc7.jpg", "postc8.jpg", "postc9.jpg", "postc10.jpg", "postc11.jpg", "postc12.jpg", "postc13.jpg" ].map(src => {
    const imgs = document.createElement("img");
    imgs.src = src;
    return imgs;
});

//get mouse position
document.addEventListener("mousemove", function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
    if (updateMouseX === null){
        updateMouseX = event.pageX;
        updateMouseY = event.pageY;
    }
});

canv.addEventListener("click", function (){

    // initialize js audio oscillator
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(updateMouseX - 100, audioCtx.currentTime); //a value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();
     
    const oscillator1 = audioCtx.createOscillator();         
    oscillator1.type = "sine";
    oscillator1.frequency.setValueAtTime(updateMouseY - 100, audioCtx.currentTime); //a value in hertz
    oscillator1.connect(audioCtx.destination);
    oscillator1.start();
    i = i + 1;
    if (i >= uncomfyImgs.length){
     i = 0;
    };
});

//
// function touchStarted() {
//     getAudioContext().resume();
//   }

//link image array to mouse move
const draw = function () {
    if (mouseX) {
        if(uncomfyImgs[i].complete) {
            ctx.drawImage(uncomfyImgs[i], updateMouseX - 20, updateMouseY - 70, 60, 100)       
        };
    
        updateMouseX = updateMouseX + (mouseX - updateMouseX) * 0.1;
        updateMouseY = updateMouseY + (mouseY - updateMouseY) * 0.1;
    }
    requestAnimationFrame(draw);
}

draw();

