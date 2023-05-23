
let numKois;
let kois  = [];
let koiSkins = [];
let canvas;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, true);
    let newKois = round(windowWidth / 200);
    if (numKois < newKois) {
        for (let i = 0; i < newKois; i++) {
            let skinId = round(random(0, 9));
            kois.push(new Koi(koiSkins[skinId]));
        }
    }
    numKois = round(windowWidth / 200);
}

function preload() {
    for (let i = 0; i < 10; i++) koiSkins[i] = "img/skin-" + i + ".png";
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0, 0);
    canvas.style("z-index: -100");
    smooth();
    pixelDensity(2);

    numKois = round(windowWidth / 200);

    for (let i = 0; i < numKois; i++) {
        let skinId = round(random(0, 9));
        kois[i] = new Koi(koiSkins[skinId]);
    }
}

function draw() {
    // TODO: Dynamic water? Noise background for coloring?
    background(238);

    for (let i = 0; i < numKois; i++) kois[i].live();
}