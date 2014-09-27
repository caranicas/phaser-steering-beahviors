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
			//this.boid.debugWanderCatch = wand;
			this.boid.sprite.body.acceleration.add(wand.x,wand.y);
			this.boid.sprite.body.velocity.add(this.boid.sprite.body.acceleration.x, this.boid.sprite.body.acceleration.y)
			this.boid.sprite.body.acceleration.multiply(0,0);
		}

		this.boid.sprite.body.velocity = MovementUtils.limit(this.boid.sprite.body.velocity,this.boid.maxSpeed);
		this.boid.sprite.angle = MovementUtils.facing(this.boid.sprite.body.velocity);
		MovementUtils.loopWalls(this.boid.sprite.position,this.boid.game.world);
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
		wander.x = Math.cos(this.boid.wanderAngle) * this.boid.wanderCircleRad;
		wander.y = Math.sin(this.boid.wanderAngle) * this.boid.wanderCircleRad;
		this.boid.debugWanderRadialCatch = wander;
		return wander;
	},

	wander:function(){
		var extenstion = this.distanceAhead();
		var radial = this.radialOffset();
		var target = Phaser.Point.add(extenstion, radial);

		var wander = MovementUtils.seek(target,this.boid.sprite.position,this.boid.sprite.body.velocity, this.boid.maxSpeed, this.boid.maxForce);

		this.boid.debugWanderCatch = wander;
		this.updateAngle()

		return wander;
	},

	updateAngle:function(){
		this.boid.wanderAngle += MovementUtils.getRandomBetween(this.boid.wanderVariance,-this.boid.wanderVariance);
	}
}
