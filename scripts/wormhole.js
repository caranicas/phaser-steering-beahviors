
wormhole = function (game) {
	this.game = game;
};

wormhole.prototype.create = function(xpos, ypos, clickhandle, scope) {
  this.entity = this.game.add.sprite(xpos, ypos, 'wormhole');
  this.entity.anchor.set(0.5);
  this.game.physics.enable(this.entity, Phaser.Physics.ARCADE);
  this.entity.inputEnabled = true;
  this.entity.events.onInputDown.add(clickhandle, scope);
}


