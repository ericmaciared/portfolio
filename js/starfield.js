let canvas;
let stars = [];
let starDensity;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    starDensity = windowWidth / 3;
    stars = [];

    for(let i = 0; i < starDensity; i++){
        stars.push(new Star());
    }
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index: -100");

    starDensity = windowWidth / 3;

    for(let i = 0; i < starDensity; i++){
        stars.push(new Star());
    }
}

function draw(){
    colorMode(RGB);
    background(238);
    speed = map(mouseX, 0, width, -5, 5);
    speedY = map(mouseY, 0, height, -5, 5);
    translate(width/2, height/2);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update(speed, speedY);
        stars[i].show();
    }
}

class Star {
    constructor() {
        this.x = random(-width/2, width/2);
        this.y = random(-height/2, height/2);
        this.z = random(width);
    }

    update(speed, speedY) {
        this.x = this.x - speed;
        this.y = this.y - speedY;
        //this.z = this.z - speed;

        // Reset star
        if (this.z < 1 || this.x < -width/2 - windowWidth/8 || this.x > width/2 + windowWidth/8 || 
        this.y < -height/2 - windowHeight/8 || this.y > height/2 + windowHeight/8 ) {
            this.x = random(-width/2, width/2);
            this.y = random(-height/2, height/2);
            this.z = random(width);
        }
    }

    show() {
        colorMode(HSB, 400);
        let colorMap = map(this.z, 0, width, 220, 230)
        stroke(colorMap, map(this.z, 0, width, 0, 400), 400);
        strokeWeight(map(this.z, 0, width, 32, 0));

        let sx = map(this.x/this.z, 0, 1, 0, width);
        let sy = map(this.y/this.z, 0, 1, 0, height);

        point(sx, sy);
    }
}