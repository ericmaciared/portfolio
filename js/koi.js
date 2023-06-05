class Koi extends Flagellum {

  constructor(skinImg) {
    super(skinImg, getOffScreenLocation());

    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = random(0.8, 1.9);
    this.rushSpeed = random(3, 6);
    this.maxForce = 0.2;
    this.wandertheta = random(0, 360);

    this.timeCheck = false;
    this.timeCount = 0;
    this.lastTimeCheck = 0;
    this.timeCountLimit = 10;
    this.visible = false;
  }

  // Main live loop
  // TODO: add a "brain" to the fish
  live() {
    //if (mouseIsPressed) {
      let mouseLocation = createVector(mouseX - width/2, mouseY - height/2);
      if (this.location.dist(mouseLocation) < 100) {
        this.evade(mouseLocation);
      }
    //} 
    this.wander();
    this.update();
    if (this.visible) this.borders();
    this.display();
  }

  steer(target, slowdown) {
    let steer;
    let desired = target.sub(this.location);
    let d = desired.mag();

    if (d > 0) {
      desired.normalize();

      if (slowdown && d < 100) {
        desired.mult(this.maxSpeed * (d / 100));
      }
      else {
        desired.mult(this.maxSpeed);
      }

      steer = desired.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    else {
      steer = createVector(0, 0);
    }

    return steer;
  }

  seek(target) {
    this.acceleration.add(this.steer(target, false));
  }

  flee(target) {
    this.acceleration.sub(this.steer(target, false));
  }
  
  evade(target) {
    this.timeCheck = true;
    if (dist(target.x, target.y, this.location.x, this.location.y) < 100) {
      let lookAhead = this.location.dist(target) / (this.maxSpeed * 2);
      let predictedTarget = createVector(target.x - lookAhead, target.y - lookAhead);
      this.flee(predictedTarget);
    }
  }

  wander() {
    let wanderR = 10;
    let wanderD = 100;
    let change = 0.05;

    this.wandertheta += random(-change, change);

    let circleLocation = this.velocity.copy();
    circleLocation.normalize();
    circleLocation.mult(wanderD);
    circleLocation.add(this.location);

    let circleOffset = createVector(wanderR * cos(this.wandertheta), wanderR * sin(this.wandertheta));
    let target = circleLocation.add(circleOffset);
    this.acceleration.add(this.seek(target));
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    super.muscleFreq = norm(this.velocity.mag(), 0, 1) * 0.06;
    super.move();

    // Rotate fish
    let angle = this.velocity.heading() + radians(180);
    this.theta = degrees(angle) + 180;

    if (this.timeCheck) {
      if (millis() > this.lastTimeCheck + 200) {
        this.lastTimeCheck = millis();

        if (this.timeCount <= this.timeCountLimit) {
          // derease maxSpeed in relation with time cicles
          // this formula needs a proper look
          this.maxSpeed = this.rushSpeed - (norm(this.timeCount, 0, this.timeCountLimit) * 3);
          this.timeCount++;
        }
        else if (this.timeCount >= this.timeCountLimit) {
          // once the time cicle is complete
          // resets timer variables,
          this.timeCount = 0;
          this.timeCheck = false;

          // set default speed values
          this.maxSpeed = random(0.8, 1.9);
          this.maxForce = 0.2;
        }
      }
    }

    //
    if (!this.visible) {
      if (this.location.x < windowWidth/2 && this.location.x > -windowWidth/2 && this.location.y < windowHeight/2 && this.location.y > -windowHeight/2) this.visible = true;
    }
  }

  // wrapper, appear opposit side
  borders() {
    let offsetFactor = 1;
    if (this.location.x < -offsetFactor*windowWidth / 2 - this.skin.width) {
      this.location.x = offsetFactor*windowWidth / 2;
    }
    if (this.location.x > offsetFactor*windowWidth / 2 + this.skin.width) {
      this.location.x = -offsetFactor*windowWidth / 2;
    }
    if (this.location.y < -offsetFactor*windowHeight / 2 -this.skin.width) {
      this.location.y = offsetFactor*windowHeight / 2 ;
    } 
    if (this.location.y > offsetFactor*windowHeight / 2 + this.skin.width) {
      this.location.y = -offsetFactor*windowHeight / 2;
    }
  }
}

function getOffScreenLocation() {
  let offsetFactor = 1.3;

  switch (round(random(0, 3))) {
    // left
    case 0:
      return createVector(-offsetFactor*windowWidth / 2, random(-windowHeight/2, windowHeight/2));
    // right
    case 1:
      return createVector(offsetFactor*windowWidth / 2, random(-windowHeight/2, windowHeight/2));
    // top
    case 2:
      return createVector(random(-windowWidth/2, windowWidth/2), -offsetFactor*windowHeight/2);
    // bottom
    case 3:
      return createVector(random(-windowWidth/2, windowWidth/2), offsetFactor*windowHeight/2);
  }
}
  