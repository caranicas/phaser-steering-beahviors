function Immovable(game) {
  GameEntity.call(this, game); // call super constructor.
}

// subclass extends superclass
Immovable.prototype = Object.create(GameEntity.prototype);
Immovable.prototype.constructor = Immovable;






Immovable.prototype.initalize = function(index, asset){

	GameEntity.prototype.initalize.call(this,index, asset);
	return this;
}



Immovable.prototype.create = function(pos,vel,angle, debug){

	GameEntity.prototype.create.call(this, pos,vel,angle, debug);
	return this;
}


Immovable.prototype.debugUpdate = function(){
	GameEntity.prototype.debugUpdate.call(this);
}

Immovable.prototype.debugRender = function(){
	GameEntity.prototype.debugRender.call(this);
}

