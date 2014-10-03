function Waypoint(game) {
  Immovable.call(this, game); // call super constructor.
}

// subclass extends superclass
Waypoint.prototype = Object.create(Immovable.prototype);
Waypoint.prototype.constructor = Waypoint;
