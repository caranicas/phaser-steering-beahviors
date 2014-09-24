function BehaviorFind (boid, target) {
  Behavior.call(this, boid); // call super constructor.
  this.target = target;
}


// subclass extends superclass
BehaviorFind.prototype = Object.create(Behavior.prototype);
BehaviorFind.prototype.constructor = BehaviorFind;



BehaviorFind.prototype = {

	update:function(){
		var sVec = MovementUtils.seek(this.target.entity.body.position,this.boid.entity.body.position,this.boid.entity.body.velocity, this.boid.maxSpeed, this.boid.maxForce)
		this.boid.entity.body.acceleration.add(sVec.x,sVec.y);
		this.boid.entity.body.velocity.add( this.boid.entity.body.acceleration.x, this.boid.entity.body.acceleration.y)
		this.boid.entity.body.acceleration.multiply(0,0);
		MovementUtils.loopWalls(this.boid.entity.body.position,this.boid.game.world);
		this.boid.entity.angle = MovementUtils.facing(this.boid.entity.body.velocity);
	}
}