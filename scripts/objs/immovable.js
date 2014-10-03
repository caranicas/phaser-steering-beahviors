function Immovable(game) {
  Entity.call(this, game); // call super constructor.
}

// subclass extends superclass
Immovable.prototype = Object.create(Entity.prototype);
Immovable.prototype.constructor = Immovable;


Immovable.prototype.initalize = function(index, asset){

	Entity.prototype.initalize.call(this,index, asset);
	return this;
}

Immovable.prototype.create = function(pos,vel,angle, debug){
	Entity.prototype.create.call(this, pos,vel,angle, debug);
	return this;
}


Immovable.prototype.debugUpdate = function(){
	Entity.prototype.debugUpdate.call(this);
}

Immovable.prototype.debugRender = function(){
	Entity.prototype.debugRender.call(this);
}

