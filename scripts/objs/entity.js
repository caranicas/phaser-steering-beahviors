Entity = function (game) {

	// Phaser objects
	this.game = game;
	this.sprite = null

	// data for comparisons
	this.category = -1;

	// function
	this.behavior = null;
};

Entity.prototype.initalize = function(index, asset){
	this.sprite = this.game.add.sprite(0,0,asset);
	this.sprite.id = index;
	this.sprite.anchor.set(0.5);
	this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	return this;
}

Entity.prototype.create = function(pos,vel,angle, debug){

		this.sprite.angle = angle;
		this.sprite.position.x = pos.x;
		this.sprite.position.y = pos.y;
		this.sprite.body.velocity.x = vel.x;
		this.sprite.body.velocity.y = vel.y;

		return this;
}

Entity.prototype.debugUpdate = function(){

}

Entity.prototype.debugRender = function(){
	this.game.debug.spriteBounds(this.sprite);

}


// call afactory method that pushes all relevent information into object
Entity.prototype.syncWithFly = function(){

}
