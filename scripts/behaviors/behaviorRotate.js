function BehaviorRotate (boid) {
  Behavior.call(this, boid); // call super constructor.
}


// subclass extends superclass
BehaviorRotate.prototype = Object.create(Behavior.prototype);
BehaviorRotate.prototype.constructor = BehaviorRotate;


BehaviorRotate.prototype = {

	update:function(){
		this.boid.entity.angle = this.boid.entity.angle+1;
	}
}