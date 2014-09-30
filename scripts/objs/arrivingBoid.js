function ArrivingBoid(game, target) {

  Boid.call(this, game); // call super constructor.

	this.arrivalTarget = target;

}

// subclass extends superclass
ArrivingBoid.prototype = Object.create(Boid.prototype);
ArrivingBoid.prototype.constructor = Boid;

ArrivingBoid.prototype.create = function(pos,vel,angle, debug){
	Boid.prototype.create.call(this, pos,vel,angle, debug);
}
ArrivingBoid.prototype.updateTarget = function(target){
	this.arrivalTarget = target;
}

ArrivingBoid.prototype.debugUpdate = function(){

	Boid.prototype.debugUpdate.call(this);
}

ArrivingBoid.prototype.debugRender = function(){
	Boid.prototype.debugRender.call(this);

}

