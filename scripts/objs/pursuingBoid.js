function PursuingBoid(game, target) {
	Boid.call(this, game); // call super constructor.
	this.pursuitTarget = target;

	this.pursuitPredict = 5;
	this.maxPursuitSpeed = 60;
	this.maxPursuitForce = 50;
}
// subclass extends superclass
PursuingBoid.prototype = Object.create(Boid.prototype);
PursuingBoid.prototype.constructor = Boid;

PursuingBoid.prototype.create = function(pos,vel,angle, debug){
	Boid.prototype.create.call(this, pos,vel,angle, debug);
}

PursuingBoid.prototype.updateTarget = function(target){
	this.pursuitTarget = target;
}

PursuingBoid.prototype.debugUpdate = function(){
	Boid.prototype.debugUpdate.call(this);
}

PursuingBoid.prototype.debugRender = function(){
	Boid.prototype.debugRender.call(this);

}

