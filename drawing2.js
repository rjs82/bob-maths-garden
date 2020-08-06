
const BACKGROUND_COLOUR = '#000000';
const LINE_COLOUR = '#FFFFFF'; // use red to test B&W conversion  and thresholding '#FF0000';
const LINE_WIDTH = 15;

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;

var mouseDown = false;

var context;  // they are needed globally in this file
var canvas;

function prepareCanvas() {
//    console.log('Preparing canvas');
    canvas = document.getElementById('my-canvas');
    context = canvas.getContext('2d');

    context.fillStyle = BACKGROUND_COLOUR;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    context.strokeStyle = LINE_COLOUR;
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = 'round';

    document.addEventListener('mousedown', function (event) {
//        console.log('click!');
//        console.log('X: ' + event.clientX);
//        console.log('Y: ' + event.clientY);
        mouseDown = true;
//        console.log('Mouse Pressed');
    })

    document.addEventListener('mousemove', function (event) {
        //console.log('move!');
        previousX = currentX;
        currentX = event.clientX - canvas.offsetLeft;
        previousY = currentY;
        currentY = event.clientY - canvas.offsetTop;

        // could replace these 4 lines with a 'mouseleave' listener on the canvas
        //  would need some extra work on the initial mouse position on mousedown
        if (currentX < 0) mouseDown = false;
        if (currentY < 0) mouseDown = false;
        if (currentX > canvas.offsetWidth) mouseDown= false;
        if (currentY > canvas.offsetHeight) mouseDown = false;

        //console.log(`Current X: ${currentX}`);
        if (mouseDown) {
            draw();    
        }
    })

    document.addEventListener('mouseup', function (event) {
        mouseDown = false;
//        console.log('Mouse Released');
    })

    // listeners for touch events (phone, ipad etc)
    document.addEventListener('touchstart', function (event) {
//        console.log('click!');
//        console.log('X: ' + event.clientX);
//        console.log('Y: ' + event.clientY);
        mouseDown = true;
        console.log('Touch start');
        currentX = event.changedTouches[0].pageX - canvas.offsetLeft;
        currentY = event.changedTouches[0].pageY - canvas.offsetTop;
    })
   
    document.addEventListener('touchmove', function (event) {
//        console.log('move!');
        previousX = currentX;
        currentX = event.targetTouches[0].pageX - canvas.offsetLeft;
        //currentX = event.clientX - canvas.offsetLeft;
        previousY = currentY;
        currentY = event.targetTouches[0].pageY - canvas.offsetTop;
        //currentY = event.clientY - canvas.offsetTop;

        // could replace these 4 lines with a 'mouseleave' listener on the canvas
        //  would need some extra work on the initial mouse position on mousedown
        if (currentX < 0) mouseDown = false;
        if (currentY < 0) mouseDown = false;
        if (currentX > canvas.offsetWidth) mouseDown= false;
        if (currentY > canvas.offsetHeight) mouseDown = false;

//        console.log(`Current X: ${currentX}`);
        if (mouseDown) {
            draw();    
        }
    })

    document.addEventListener('touchend', function (event) {
        mouseDown = false;
//        console.log('Touch end');
    })

    // can't seem to get this to work, use logic with mouse position
//    canvas.addEventListener('mouseleave', function (event) {
//        mouseDown = false;
//    })

}

function draw() {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
}

function clearCanvas() {
    currentX = 0;
    currentY = 0;
    previousX = 0;
    previousY = 0; 
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

}