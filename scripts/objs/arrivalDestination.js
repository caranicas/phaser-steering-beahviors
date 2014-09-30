function ArrivalDestination(game) {
  Immovable.call(this, game); // call super constructor.
  this.arrivalZone = 50;
}

// subclass extends superclass
ArrivalDestination.prototype = Object.create(Immovable.prototype);
ArrivalDestination.prototype.constructor = ArrivalDestination;
