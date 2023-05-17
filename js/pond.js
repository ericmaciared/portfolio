let canvas;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index: -100");
    background(0);
}

function draw(){
    ellipse(mouseX, mouseY, 50, 50)
}