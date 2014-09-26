GameEntity = function (game) {

	// Phaser objects
	this.game = game;
	this.sprite = null

	//
	this.category = -1;

	// function
	this.behavior = null;;
};

GameEntity.prototype.initalize = function(index, asset){
	this.sprite = this.game.add.sprite(0,0,asset);
	this.sprite.id = index;
	this.sprite.anchor.set(0.5);
	this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	return this;
}

GameEntity.prototype.create = function(pos,vel,angle, debug){

		this.sprite.angle = angle;
		this.sprite.position.x = pos.x;
		this.sprite.position.y = pos.y;
		this.sprite.body.velocity.x = vel.x;
		this.sprite.body.velocity.y = vel.y;

		return this;
}

GameEntity.prototype.debugUpdate = function(){

}

GameEntity.prototype.debugRender = function(){
	this.game.debug.spriteBounds(this.sprite);

}


// call afactory method that pushes all relevent information into object
GameEntity.prototype.syncWithFly = function(){

}
