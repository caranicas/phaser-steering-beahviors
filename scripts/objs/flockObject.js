flockObject = function (game) {

	// Phaser objects
	this.game = game;
	this.entity = null;

	// Behavior Objects
	this.sepInfluence = 10;
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

	this.wanderCircleRad = 50;
	this.wanderCircleDist = 100;
	this.wanderAngle = 180;
	this.wanderVariance = 40;
	this.wanderDate = new Date();
	this.wanderTime = 1;

	this.wanderDebugVec = null;
	this.wanderDebugCircle = null;
	this.debugDisplacmentVec = null;

	this.debugExtension = new Phaser.Point(0,0);
	this.debugDisplacemt = new Phaser.Point(0,0);

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
			this.wanderDebugVec = new Phaser.Line(10,10,40,10);
			this.debugDisplacmentVec = new Phaser.Line(10,10,40,10)
			this.wanderDebugCircle = new Phaser.Circle(this.entity.position.x, this.entity.position.y, this.wanderCircleRad*2)
		}

		return this;
}

flockObject.prototype.debugUpdate = function(){

	this.debugVector.start.x = this.entity.position.x;
	this.debugVector.start.y = this.entity.position.y;
	this.debugVector.end.x = this.entity.position.x + this.entity.body.velocity.x;
	this.debugVector.end.y = this.entity.position.y + this.entity.body.velocity.y;

	this.wanderDebugVec.start.x = this.entity.position.x;
	this.wanderDebugVec.start.y = this.entity.position.y;
	this.wanderDebugVec.end.x = this.debugExtension.x;
	this.wanderDebugVec.end.y = this.debugExtension.y;

	this.wanderDebugCircle.x = this.wanderDebugVec.end.x;
	this.wanderDebugCircle.y = this.wanderDebugVec.end.y;


	this.debugDisplacmentVec.start.x = this.wanderDebugVec.end.x;
	this.debugDisplacmentVec.start.y = this.wanderDebugVec.end.y;
	this.debugDisplacmentVec.end.x = this.wanderDebugVec.end.x + this.debugDisplacemt.x;
	this.debugDisplacmentVec.end.y = this.wanderDebugVec.end.y+ this.debugDisplacemt.y;

}

flockObject.prototype.debugRender = function(){
	this.game.debug.spriteBounds(this.entity);
	this.debugVelocityRender();
	this.debugWanderRender();
}


flockObject.prototype.debugVelocityRender = function(){
	this.game.debug.geom(this.debugVector,'blue', true);

}


flockObject.prototype.debugWanderRender = function(){
	this.game.debug.geom(this.wanderDebugCircle,'green', true);
	this.game.debug.geom(this.wanderDebugVec,'white', true);
	this.game.debug.geom(this.debugDisplacmentVec,'red', true);

}



// call afactory method that pushes all relevent information into object
flockObject.prototype.syncWithFly = function(){

}
