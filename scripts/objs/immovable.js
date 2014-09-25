function Immovable(game) {
  GameEntity.call(this, game); // call super constructor.
}


// subclass extends superclass
Immovable.prototype = Object.create(GameEntity.prototype);
Immovable.prototype.constructor = Immovable;


Immovable.prototype.debugUpdate = function(){

}

Immovable.prototype.debugRender = function(){
}

