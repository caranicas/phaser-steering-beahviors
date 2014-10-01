function BehaviorEvade(boid) {
	Behavior.call(this, boid); // call super constructor.
}

// subclass extends superclass
BehaviorEvade.prototype = Object.create(Behavior.prototype);
BehaviorEvade.prototype.constructor = BehaviorEvade;
BehaviorEvade.prototype = {

	update:function(){
		var evadeVec = this.calcEvade()
		this.boid.sprite.body.acceleration.add(evadeVec.x,evadeVec.y);
		Behavior.prototype.update.call(this);
		MovementUtils.loopWalls(this.boid.sprite.position,this.boid.game.world);

	},

	calcEvade:function(){
		return new Phaser.Point(0,0);
	}
}
