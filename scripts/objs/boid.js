function Boid(game) {
  flockObject.call(this, game); // call super constructor.
}

// subclass extends superclass
Boid.prototype = Object.create(flockObject.prototype);
Boid.prototype.constructor = Boid;

