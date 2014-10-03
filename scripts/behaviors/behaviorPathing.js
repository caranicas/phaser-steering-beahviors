function BehaviorPathing(boid) {
	Behavior.call(this, boid); // call super constructor.
}

// subclass extends superclass
BehaviorPathing.prototype = Object.create(Behavior.prototype);
BehaviorPathing.prototype.constructor = BehaviorPathing;

BehaviorPathing.prototype = {

	update:function(){

		var sVEC = this.calcFind()
		this.boid.sprite.body.acceleration.add(sVEC.x,sVEC.y);
		Behavior.prototype.update.call(this);
		MovementUtils.loopWalls(this.boid.sprite.body.position,this.boid.game.world);
	},


	calcFind:function(){
		var seek = MovementUtils.seek(this.boid.currentTarget().getPosition(),this.boid.sprite.position)
		this.checkNext(seek);
		seek.normalize();
		var desired = new Phaser.Point(seek.x*this.boid.maxSpeed, seek.y*this.boid.maxSpeed);
		var steer = MovementUtils.limit(Phaser.Point.subtract(desired, this.boid.sprite.body.velocity),this.boid.maxForce)
		return steer;
	},

	checkNext:function (distance){
		if(distance.getMagnitude() <= this.boid.closeEnough)
		{
			this.boid.updateTarget();
		}
	}

}
