function BehaviorFind (boid, target) {
  Behavior.call(this, boid); // call super constructor.
  this.target = target;
}


// subclass extends superclass
BehaviorFind.prototype = Object.create(Behavior.prototype);
BehaviorFind.prototype.constructor = BehaviorFind;


BehaviorFind.prototype = {

	update:function(){
		var sVec = MovementUtils.seek(this.target.sprite.body.position,this.boid.sprite.body.position,this.boid.sprite.body.velocity, this.boid.maxSpeed, this.boid.maxForce)
		this.boid.sprite.body.acceleration.add(sVec.x,sVec.y);
		this.boid.sprite.body.velocity.add( this.boid.sprite.body.acceleration.x, this.boid.sprite.body.acceleration.y)
		this.boid.sprite.body.acceleration.multiply(0,0);
		MovementUtils.loopWalls(this.boid.sprite.body.position,this.boid.game.world);
		this.boid.sprite.angle = MovementUtils.facing(this.boid.sprite.body.velocity);
	}
}