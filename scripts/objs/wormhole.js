function Wormhole(game) {
  Immovable.call(this, game); // call super constructor.
}


// subclass extends superclass
Wormhole.prototype = Object.create(Immovable.prototype);
Wormhole.prototype.constructor = Wormhole;


Wormhole.prototype = {

	create:function(xpos, ypos, clickhandle, scope) {
	  this.entity = this.game.add.sprite(xpos, ypos, 'wormhole');
	  this.entity.anchor.set(0.5);
	  this.game.physics.enable(this.entity, Phaser.Physics.ARCADE);
	  this.entity.inputEnabled = true;
	  this.entity.events.onInputDown.add(clickhandle, scope);
	}

}






