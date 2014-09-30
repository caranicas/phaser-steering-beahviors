function ArrivingShip(game, target) {
  ArrivingBoid.call(this, game, target); // call super constructor.
}

// subclass extends superclass
ArrivingShip.prototype = Object.create(ArrivingBoid.prototype);
ArrivingShip.prototype.constructor = ArrivingShip;


