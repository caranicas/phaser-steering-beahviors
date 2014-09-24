function Immovable(game) {
  flockObject.call(this, game); // call super constructor.
}


// subclass extends superclass
Immovable.prototype = Object.create(flockObject.prototype);
Immovable.prototype.constructor = Immovable;


Immovable.prototype.debugUpdate = function(){

}

Immovable.prototype.debugRender = function(){
}

