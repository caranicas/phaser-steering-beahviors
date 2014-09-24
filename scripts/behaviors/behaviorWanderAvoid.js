function BehaviorWanderAvoid(boid) {
	Behavior.call(this, boid); // call super constructor.
}


// subclass extends superclass
BehaviorWanderAvoid.prototype = Object.create(Behavior.prototype);
BehaviorWanderAvoid.prototype.constructor = BehaviorWanderAvoid;

BehaviorWanderAvoid.prototype = {

	update:function(objs){
		separation = separation.multiply(this.boid.sepWeight, this.boid.sepWeight);

	},

	wander:function(){

	}
}
