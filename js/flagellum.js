/*
* Fish locomotion class, simulates wave propagation through a kinetic array of nodes
*/
const numSpineNodes = 12;

class Flagellum {
  constructor(skinImg, _location) {
    this.location = _location;
    this.spine = [];
    this.count = 0;
    this.theta = 0;
    this.muscleRange = 6;                     // controls rotation angle of the neck
    this.muscleFreq = random(0.06, 0.07);     
    
    this.skin = loadImage(skinImg, img => {
      // random resize of fish
      let scalar = random(0.5, 1);
      this.skin.resize(this.skin.width * scalar, this.skin.height * scalar);
      
      // nodes spacing
      this.skinXspacing = img.width / float(numSpineNodes) + 0.5;
      this.skinYspacing = img.height / 2;

      // initialize nodes
      for (let n = 0; n < numSpineNodes; n++) this.spine[n] = createVector();
    });
  }

  move() {
    // head node
    this.spine[0].x = cos(radians(this.theta));
    this.spine[0].y = sin(radians(this.theta));

    // muscular node (neck)
    this.count += this.muscleFreq;
    let thetaMuscle = this.muscleRange * sin(this.count);
    this.spine[1].x = -this.skinXspacing * cos(radians(this.theta + thetaMuscle)) + this.spine[0].x;
    this.spine[1].y = -this.skinXspacing * sin(radians(this.theta + thetaMuscle)) + this.spine[0].y;

    // apply kinetic force trough body nodes (spine)
    for (let n = 2; n < numSpineNodes; n++) {
      let dx, dy, d;

      dx = this.spine[n].x - this.spine[n - 2].x;
      dy = this.spine[n].y - this.spine[n - 2].y;
      d = sqrt(dx * dx + dy * dy);

      this.spine[n].x = this.spine[n - 1].x + (dx * this.skinXspacing) / d;
      this.spine[n].y = this.spine[n - 1].y + (dy * this.skinXspacing) / d;
    }
  }

  display() {
    noStroke();
    beginShape(QUAD_STRIP);
    texture(this.skin);
    for (let n = 0; n < numSpineNodes; n++) {
      let dx, dy;
      if (n == 0) {
        dx = this.spine[1].x - this.spine[0].x;
        dy = this.spine[1].y - this.spine[0].y;
      }
      else {
        dx = this.spine[n].x - this.spine[n - 1].x;
        dy = this.spine[n].y - this.spine[n - 1].y;
      }
      let angle = -atan2(dy, dx);
      let x1 = this.spine[n].x + sin(angle) * -this.skinYspacing + this.location.x;
      let y1 = this.spine[n].y + cos(angle) * -this.skinYspacing + this.location.y;
      let x2 = this.spine[n].x + sin(angle) *  this.skinYspacing + this.location.x;
      let y2 = this.spine[n].y + cos(angle) *  this.skinYspacing + this.location.y;
      let u = this.skinXspacing * n;
      vertex(x1, y1, u, 0);
      vertex(x2, y2, u, this.skin.height);
    }
    endShape();  
  
  }
}