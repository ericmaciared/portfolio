let numKois =1;
let kois  = [];
let koiSkins = [];
let canvas;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, true);
}

function preload() {
    for (let i = 0; i < 10; i++) koiSkins[i] = "img/skin-" + i + ".png";
    //numKois = round(windowWidth / 100);

    for (let i = 0; i < numKois; i++) {
        let skinId = round(random(0, 9));
        kois[i] = new Koi(koiSkins[skinId]);
    }
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0, 0);
    canvas.style("z-index: -100");
    smooth();
    pixelDensity(2);
}

function draw() {
    // TODO: Dynamic water? Noise background for coloring?
    background(238);

    for (let i = 0; i < numKois; i++) kois[i].live();
}