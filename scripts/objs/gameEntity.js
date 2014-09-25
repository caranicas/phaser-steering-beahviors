GameEntity = function (game) {

	// Phaser objects
	this.game = game;
	this.sprite = null;
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

		if(debug)
		{
			this.debugVector = new Phaser.Line(10,10,40,10);
			this.wanderDebugVec = new Phaser.Line(10,10,40,10);
			this.debugDisplacmentVec = new Phaser.Line(10,10,40,10)
			this.wanderDebugCircle = new Phaser.Circle(this.sprite.position.x, this.sprite.position.y, this.wanderCircleRad*2)
		}

		return this;
}

GameEntity.prototype.debugUpdate = function(){

	this.debugVector.start.x = this.sprite.position.x;
	this.debugVector.start.y = this.sprite.position.y;
	this.debugVector.end.x = this.sprite.position.x + this.sprite.body.velocity.x;
	this.debugVector.end.y = this.sprite.position.y + this.sprite.body.velocity.y;

	this.wanderDebugVec.start.x = this.sprite.position.x;
	this.wanderDebugVec.start.y = this.sprite.position.y;
	this.wanderDebugVec.end.x = this.debugExtension.x;
	this.wanderDebugVec.end.y = this.debugExtension.y;

	this.wanderDebugCircle.x = this.wanderDebugVec.end.x;
	this.wanderDebugCircle.y = this.wanderDebugVec.end.y;


	this.debugDisplacmentVec.start.x = this.wanderDebugVec.end.x;
	this.debugDisplacmentVec.start.y = this.wanderDebugVec.end.y;
	this.debugDisplacmentVec.end.x = this.wanderDebugVec.end.x + this.debugDisplacemt.x;
	this.debugDisplacmentVec.end.y = this.wanderDebugVec.end.y+ this.debugDisplacemt.y;

}

GameEntity.prototype.debugRender = function(){
	this.game.debug.spriteBounds(this.sprite);
	this.debugVelocityRender();
	this.debugWanderRender();
}


GameEntity.prototype.debugVelocityRender = function(){
	this.game.debug.geom(this.debugVector,'blue', true);

}


GameEntity.prototype.debugWanderRender = function(){
	this.game.debug.geom(this.wanderDebugCircle,'green', true);
	this.game.debug.geom(this.wanderDebugVec,'white', true);
	this.game.debug.geom(this.debugDisplacmentVec,'red', true);

}



// call afactory method that pushes all relevent information into object
GameEntity.prototype.syncWithFly = function(){

}
