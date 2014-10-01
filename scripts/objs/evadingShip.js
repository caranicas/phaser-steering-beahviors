function EvadingShip(game, target) {
  EvadingBoid.call(this, game, target); // call super constructor.
}

// subclass extends superclass
EvadingShip.prototype = Object.create(EvadingBoid.prototype);
EvadingShip.prototype.constructor = EvadingShip;


