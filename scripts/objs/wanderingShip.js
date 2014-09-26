function WanderingShip(game) {
  WanderingBoid.call(this, game); // call super constructor.
}

// subclass extends superclass
WanderingShip.prototype = Object.create(WanderingBoid.prototype);
WanderingShip.prototype.constructor = WanderingShip;


