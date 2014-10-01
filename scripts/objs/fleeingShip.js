function FleeingShip(game, target) {
  FleeingBoid.call(this, game, target); // call super constructor.
}

// subclass extends superclass
FleeingShip.prototype = Object.create(FleeingBoid.prototype);
FleeingShip.prototype.constructor = FleeingShip;


