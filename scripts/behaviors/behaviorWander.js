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

		if(diff > this.boid.wanderDelta)
		{
			this.boid.wanderDate = now;
			var wand = this.calcWander();
			this.boid.sprite.body.acceleration.add(wand.x,wand.y);
			this.boid.sprite.body.velocity.add(this.boid.sprite.body.acceleration.x, this.boid.sprite.body.acceleration.y)
		}

		Behavior.prototype.update.call(this);
		MovementUtils.loopWalls(this.boid.sprite.position,this.boid.game.world);
	},


	calcWander:function(){
		var extenstion = this.distanceAhead();
		var radial = this.radialOffset();
		var target = Phaser.Point.add(extenstion, radial);

		//var wander = MovementUtils.limit( MovementUtils.seekSteer(target, this.boid.getPosition(), this.boid.getVelocity(), this.boid.maxForce, this.boid.maxSpeed));

		var wander = MovementUtils.limit(MovementUtils.seek(target, this.boid.sprite.position));
		this.boid.debugWanderCatch = wander;
		this.updateAngle()
		return wander;
	},

	distanceAhead:function(){
		var normalVel = new Phaser.Point(this.boid.sprite.body.velocity.x,this.boid.sprite.body.velocity.y)
		normalVel.setMagnitude(this.boid.distanceExtension);
		var extend = Phaser.Point.add(normalVel, this.boid.sprite.position);
		this.boid.debugWanderExtendCatch = extend;
		return extend;
	},

	radialOffset:function(){
		var wander = new Phaser.Point(0,0);
		wander.x = Math.cos(this.boid.wanderAngle) * this.boid.wanderRadialMag;
		wander.y = Math.sin(this.boid.wanderAngle) * this.boid.wanderRadialMag;
		this.boid.debugWanderRadialCatch = wander;
		return wander;
	},


	updateAngle:function(){
		this.boid.wanderAngle += MovementUtils.getRandomBetween(this.boid.wanderVariance,-this.boid.wanderVariance);
	}
}
