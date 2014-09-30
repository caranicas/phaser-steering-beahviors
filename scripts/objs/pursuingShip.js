function PursuingShip(game, target) {
  PursuingBoid.call(this, game, target); // call super constructor.
}

// subclass extends superclass
PursuingShip.prototype = Object.create(PursuingBoid.prototype);
PursuingShip.prototype.constructor = PursuingShip;


