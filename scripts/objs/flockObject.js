flockObject = function (game) {

	// Phaser objects
	this.game = game;
	this.entity = null;

	// Behavior Objects
	this.sepInfluence = 25;
	this.aligInfluence = 40;
	this.cohInfluence = 50;

	this.sepWeight = 1.8;
	this.cohWeight = 0.1;
	this.aligWeight = 0.3;
	this.maxSpeed = 70;
	this.minSpeed = 30;
	this.maxForce = 1;
	this.maxAvoid = 3;
	this.maxSeeAhead = 100;
	this.debugVector = null;


	//Categories
	this.category = -1;
	// function
	this.behavior = null;
};

flockObject.prototype.initalize = function(index, asset){
	this.entity = this.game.add.sprite(0,0,asset);
	this.entity.id = index;
	this.entity.anchor.set(0.5);
	this.game.physics.enable(this.entity, Phaser.Physics.ARCADE);
	return this;
}

flockObject.prototype.create = function(pos,vel,angle, debug){
		this.entity.angle = angle;
		this.entity.position.x = pos.x;
		this.entity.position.y = pos.y;
		this.entity.body.velocity.x = vel.x;
		this.entity.body.velocity.y = vel.y;

		if(debug)
		{
			this.debugVector = new Phaser.Line(10,10,40,10);
		}

		return this;
}

flockObject.prototype.debugUpdate = function(){

	this.debugVector.start.x = this.entity.position.x;
	this.debugVector.start.y = this.entity.position.y;
	this.debugVector.end.x = this.entity.position.x + this.entity.body.velocity.x;
	this.debugVector.end.y = this.entity.position.y + this.entity.body.velocity.y;
}

flockObject.prototype.debugRender = function(){
	this.game.debug.geom(this.debugVector,0x999999, true);
	this.game.debug.spriteBounds(this.entity);
}



// call afactory method that pushes all relevent information into object
flockObject.prototype.syncWithFly = function(){

}
