/**
 * Original code by Nardove (https://github.com/nardove/p5Kois)
 * Adapted and converted to JS by Eric Macià @ericmaciared to use p5.js and WEBGL
 */

let numKois;
let kois  = [];
let ripples = [];
let koiSkins = [];
let canvas;
let water;
let lightMode = false;
let maxRippleRadius;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, true);
    maxRippleRadius = windowWidth/2;
}

function preload() {
    for (let i = 0; i < 10; i++) koiSkins[i] = "img/skin-" + i + ".png";
    numKois = round(windowWidth / 80);

    for (let i = 0; i < numKois; i++) {
        let skinId = round(random(0, 9));
        kois[i] = new Koi(koiSkins[skinId]);
    }
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0, 0);
    canvas.style("z-index: -100");
    water = new Water();
    maxRippleRadius = windowWidth/2;
    smooth();
    pixelDensity(2);    
}

function draw() {
    // TODO: Dynamic water? Noise background for coloring?
    water.live();

    for (let i = 0; i < numKois; i++) kois[i].live();
    for (let i = 0; i < ripples.length; i++) {
        ripples[i].live();
        if (ripples[i].radius <= maxRippleRadius) continue;
        else ripples.splice(i, 1);
    }
}

function changeLightMode() {
    water.lightMode = !water.lightMode;
}

function mousePressed() {
    ripples.push(new Ripple(mouseX, mouseY));
}

class Water {
    constructor() {
        this.rgbValue = 238;
        this.lightMode = true;
    }

    live() {
        this.update();
        this.display();
    }

    update() {
        if (this.lightMode) {
            if (this.rgbValue < 238) this.rgbValue += 5;
        }
        else {
            if (this.rgbValue > 30) this.rgbValue -= 5;
        }
    }

    display() {
        background(this.rgbValue);
    }
}

class Ripple {
    constructor(x, y) {
        this.x = x - windowWidth / 2;
        this.y = y - windowHeight / 2;
        this.radius = 0;
        this.velocity = random(2, 2.5);
    }

    live() {
        this.update();
        this.display();
    }

    update() {
        this.radius += this.velocity;
    }

    display() {
        let alpha = map(this.radius, 0, maxRippleRadius, 255, 0);
        stroke(200, 200, 200, alpha);
        strokeWeight(2);
        noFill();
        ellipse(this.x, this.y, this.radius, this.radius, 50);
    }
}