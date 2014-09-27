function BehaviorRotate (boid) {
  Behavior.call(this, boid); // call super constructor.
}


// subclass extends superclass
BehaviorRotate.prototype = Object.create(Behavior.prototype);
BehaviorRotate.prototype.constructor = BehaviorRotate;


BehaviorRotate.prototype = {

	update:function(){
		this.boid.sprite.angle = this.boid.sprite.angle+1;
	}
}


