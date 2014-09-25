function Boid(game) {
  GameEntity.call(this, game); // call super constructor.

  // Behavior Objects
	this.sepInfluence = 10;
	this.aligInfluence = 40;
	this.cohInfluence = 50;

	this.sepWeight = 1.8;
	this.cohWeight = 0.1;
	this.aligWeight = 0.3;
	this.maxSpeed = 70;
	this.minSpeed = 30;
	this.maxForce = 1;
	this.maxAvoid = 3;
	this.maxSeeAhead = 100;
	this.debugVector = null;

	this.wanderCircleRad = 50;
	this.wanderCircleDist = 100;
	this.wanderAngle = 180;
	this.wanderVariance = 40;
	this.wanderDate = new Date();
	this.wanderTime = 1;

	this.wanderDebugVec = null;
	this.wanderDebugCircle = null;
	this.debugDisplacmentVec = null;

	this.debugExtension = new Phaser.Point(0,0);
	this.debugDisplacemt = new Phaser.Point(0,0);

	//Categories
	this.category = -1;
	// function
	this.behavior = null;
}

// subclass extends superclass
Boid.prototype = Object.create(GameEntity.prototype);
Boid.prototype.constructor = Boid;

