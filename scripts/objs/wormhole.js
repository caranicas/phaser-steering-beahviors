function Wormhole(game) {
  Immovable.call(this, game); // call super constructor.
}


// subclass extends superclass
Wormhole.prototype = Object.create(Immovable.prototype);
Wormhole.prototype.constructor = Wormhole;


Wormhole.prototype = {

	initalize:function(index, asset) {
		Immovable.prototype.initalize.call(this,index, asset);
		return this;
	},

	create:function( pos,vel,angle, debug, clickhandle, scope) {
		Immovable.prototype.create.call(this, pos,vel,angle, debug);
		this.sprite.inputEnabled = true;
		this.sprite.events.onInputDown.add(clickhandle, scope);
	}

}







