function Ship(game) {
  Boid.call(this, game); // call super constructor.
}

// subclass extends superclass
Ship.prototype = Object.create(Boid.prototype);
Ship.prototype.constructor = Ship;


