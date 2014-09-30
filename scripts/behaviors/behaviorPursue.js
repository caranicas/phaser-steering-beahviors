function BehaviorPursue(boid) {
	Behavior.call(this, boid); // call super constructor.
}

// subclass extends superclass
BehaviorPursue.prototype = Object.create(Behavior.prototype);
BehaviorPursue.prototype.constructor = BehaviorPursue;

BehaviorPursue.prototype = {

	update:function(){
		var targetPosition = new Phaser.Point(this.boid.pursuitTarget.getPosition().x + this.boid.pursuitTarget.getVelocity().x*this.boid.pursuitPredict,this.boid.pursuitTarget.getPosition().y + this.boid.pursuitTarget.getVelocity().y*this.boid.pursuitPredict);
		debugger;
		var pursuitVec = MovementUtils.seekSteer(this.boid.pursuitTarget.sprite.position, this.boid.sprite.position, this.boid.sprite.body.velocity, this.boid.maxPursuitForce, this.boid.maxPursuitSpeed)
		var avoidVec = MovementUtils.avoidWalls(this.boid.sprite.position,this.boid.game.world, 50,3);
		this.boid.sprite.body.acceleration.add(pursuitVec.x,pursuitVec.y);
		this.boid.sprite.body.acceleration.add(avoidVec.x,avoidVec.y);
		Behavior.prototype.update.call(this);
	},

	pursue:function(){
		var pursuit = new Phaser.Point(0,0);
		return pursuit;
	}
}
