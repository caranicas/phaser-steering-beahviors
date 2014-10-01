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

		var seek = MovementUtils.seek(this.boid.arrivalTarget.sprite.position,this.boid.sprite.position).normalize();
		var distance = Phaser.Math.distance(this.boid.sprite.position.x, this.boid.sprite.position.y, this.boid.arrivalTarget.sprite.position.x, this.boid.arrivalTarget.sprite.position.y);

		var arrival = new Phaser.Point(0,0);
		if(distance <= this.boid.arrivalTarget.arrivalZone)
		{
			seek.setMagnitude(this.boid.maxSpeed*(distance/this.boid.arrivalTarget.arrivalZone));
		}
		else
		{
			seek.setMagnitude(this.boid.maxSpeed);
		}

		return Phaser.Point.subtract(seek, this.boid.sprite.body.velocity)
	}
}
