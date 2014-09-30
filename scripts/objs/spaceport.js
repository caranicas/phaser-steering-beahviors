function Spaceport(game) {
  ArrivalDestination.call(this, game); // call super constructor.
}


// subclass extends superclass
Spaceport.prototype = Object.create(ArrivalDestination.prototype);
Spaceport.prototype.constructor = Spaceport;

Spaceport.prototype = {

	initalize:function(index, asset) {
		ArrivalDestination.prototype.initalize.call(this,index, asset);
		return this;
	},

	create:function( pos,vel,angle, debug, clickhandle, scope) {
		ArrivalDestination.prototype.create.call(this, pos,vel,angle, debug);
		//this.sprite.inputEnabled = true;
		//this.sprite.events.onInputDown.add(clickhandle, scope);
	}

}







