function PathingBoid(game, path) {

  Boid.call(this, game); // call super constructor.
	this.followPath = path;
	this.closeEnough = 10;
}

// subclass extends superclass
PathingBoid.prototype = Object.create(Boid.prototype);
PathingBoid.prototype.constructor = Boid;

PathingBoid.prototype.create = function(pos,vel,angle, debug){
	Boid.prototype.create.call(this, pos,vel,angle, debug);
}

PathingBoid.prototype.updateTarget = function(){
	this.followPath.update();
}

PathingBoid.prototype.currentTarget = function(){
	return this.followPath.getCurrent();
}

PathingBoid.prototype.debugUpdate = function(){
	Boid.prototype.debugUpdate.call(this);
}

PathingBoid.prototype.debugRender = function(){
	Boid.prototype.debugRender.call(this);

}

