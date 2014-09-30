function BehaviorArrive(boid) {
	Behavior.call(this, boid); // call super constructor.
}


// subclass extends superclass
BehaviorArrive.prototype = Object.create(Behavior.prototype);
BehaviorArrive.prototype.constructor = BehaviorArrive;

BehaviorArrive.prototype = {

	update:function(){

		var arrive = this.calcArrival();
		this.boid.sprite.body.acceleration.add(arrive.x,arrive.y);
		Behavior.prototype.update.call(this);
		MovementUtils.loopWalls(this.boid.sprite.body.position,this.boid.game.world);

	},

	calcArrival:function(){


		var sVec = MovementUtils.seek(this.boid.arrivalTarget.sprite.position,this.boid.sprite.position,this.boid.sprite.body.velocity, this.boid.maxSpeed, this.boid.maxForce)
		return sVec;



	},
}
