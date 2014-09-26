function BehaviorWander(boid) {
	Behavior.call(this, boid); // call super constructor.
}


// subclass extends superclass
BehaviorWander.prototype = Object.create(Behavior.prototype);
BehaviorWander.prototype.constructor = BehaviorWander;

BehaviorWander.prototype = {

	update:function(){
		var now = new Date();
		var diff = now - this.boid.wanderDate;
		if(diff > this.boid.wanderTime)
		{
			this.boid.wanderDate = now;
			var wand = this.wander();
			debugger;
			this.boid.wanderDebugTragectory = wand;
	    this.boid.sprite.body.acceleration.add(wand.x,wand.y);
	    this.boid.sprite.body.velocity.add(this.boid.sprite.body.acceleration.x, this.boid.sprite.body.acceleration.y)
	    this.boid.sprite.body.acceleration.multiply(0,0);
	  }
	  this.boid.sprite.body.velocity.setMagnitude(this.boid.maxSpeed);
    this.boid.sprite.angle = MovementUtils.facing(this.boid.sprite.body.velocity);
		MovementUtils.loopWalls(this.boid.sprite.position,this.boid.game.world);
	},

	extendCircle:function(){
		var normalVel = new Phaser.Point(this.boid.sprite.body.velocity.x,this.boid.sprite.body.velocity.y)
		normalVel.setMagnitude(this.boid.wanderCircleDist);
		var extend = Phaser.Point.add(normalVel, this.boid.sprite.position);
		return extend;
	},

	displacementVector:function(){
		var displacement = new Phaser.Point(0, -1);
		displacement.setMagnitude(this.boid.wanderCircleRad);
		return displacement;
	},

	wanderVector:function(displacement){
		var mag = displacement.getMagnitude();
		var wander = new Phaser.Point(0,0);
		wander.x = Math.cos(this.boid.wanderAngle) * mag;
		wander.y = Math.sin(this.boid.wanderAngle) * mag;
		return wander;
	},

	updateAngle:function(){
		this.boid.wanderAngle =0;//+= MovementUtils.getRandomBetween(this.boid.wanderVariance,-this.boid.wanderVariance);
		console.log('newAngle', this.boid.wanderAngle);
	},

	wander:function(){
		var extension = this.extendCircle();
		this.boid.debugExtension = extension;
		var displacement = this.displacementVector();
		var wanderVec = this.wanderVector(displacement);
		this.boid.debugDisplacemt = wanderVec;
		this.updateAngle();
		var wander = Phaser.Point.add(wanderVec, displacement);
		return MovementUtils.limit(wander, this.boid.maxForce);
	}
}
