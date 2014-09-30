function BehaviorFind (boid, target) {
  Behavior.call(this, boid); // call super constructor.
  this.target = target;
}


// subclass extends superclass
BehaviorFind.prototype = Object.create(Behavior.prototype);
BehaviorFind.prototype.constructor = BehaviorFind;


BehaviorFind.prototype = {

	update:function(){

		var sVEC = this.calcSeek()
		this.boid.sprite.body.acceleration.add(sVEC.x,sVEC.y);
		Behavior.prototype.update.call(this);

		MovementUtils.loopWalls(this.boid.sprite.body.position,this.boid.game.world);
	},

	calcSeek:function(){
		var seek = MovementUtils.seekFull(this.target.sprite.position,this.boid.sprite.position).normalize();
		var desired = new Phaser.Point(seek.x*this.boid.maxSpeed, seek.y*this.boid.maxSpeed);
		var steer = MovementUtils.limit(Phaser.Point.subtract(desired, this.boid.sprite.body.velocity),this.boid.maxForce)
		return steer;
	}
}