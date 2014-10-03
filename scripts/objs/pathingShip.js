function PathingShip(game, path) {
  PathingBoid.call(this, game, path); // call super constructor.
}

// subclass extends superclass
PathingShip.prototype = Object.create(PathingBoid.prototype);
PathingShip.prototype.constructor = PathingShip;


