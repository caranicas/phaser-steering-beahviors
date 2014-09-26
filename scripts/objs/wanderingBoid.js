function WanderingBoid(game) {

  Boid.call(this, game); // call super constructor.
	this.wanderCircleRad = 50;
	this.wanderCircleDist = 100;
	this.wanderAngle = 180;
	this.wanderVariance = 40;
	this.wanderDate = new Date();
	this.wanderTime = 1;

	this.wanderExtentionDebugVec = null;
	this.debugDisplacmentVec = null;
	this.wanderingVelocityVecTest = null;
	this.wanderingVelocityVecActual = null;

	this.debugExtension = new Phaser.Point(0,0);
	this.wanderDebugCircle = new Phaser.Circle(0,0,0);
	this.debugDisplacemt = new Phaser.Point(0,0);
	this.wanderDebugTragectory = new Phaser.Point(0,0);


}

// subclass extends superclass
WanderingBoid.prototype = Object.create(Boid.prototype);
WanderingBoid.prototype.constructor = Boid;


WanderingBoid.prototype.create = function(pos,vel,angle, debug){

	Boid.prototype.create.call(this, pos,vel,angle, debug);
	if(debug)
	{
		this.wanderExtentionDebugVec = new Phaser.Line(0,0,0,0);
		this.debugDisplacmentVec = new Phaser.Line(0,0,0,0);
		this.wanderingVelocityVecTest = new Phaser.Line(0,0,0,0);
		this.wanderingVelocityVecActual = new Phaser.Line(0,0,0,0);
		this.wanderDebugCircle = new Phaser.Circle(0,0, this.wanderCircleRad*2)
	}

	return this;
}


WanderingBoid.prototype.debugUpdate = function(){

	Boid.prototype.debugUpdate.call(this);
	this.wanderExtentionDebugVec.start.x = this.sprite.position.x;
	this.wanderExtentionDebugVec.start.y = this.sprite.position.y;
	this.wanderExtentionDebugVec.end.x = this.debugExtension.x;
	this.wanderExtentionDebugVec.end.y = this.debugExtension.y;

	this.wanderDebugCircle.x = this.wanderExtentionDebugVec.end.x;
	this.wanderDebugCircle.y = this.wanderExtentionDebugVec.end.y;

	this.debugDisplacmentVec.start.x = this.wanderExtentionDebugVec.end.x;
	this.debugDisplacmentVec.start.y = this.wanderExtentionDebugVec.end.y;
	this.debugDisplacmentVec.end.x = this.wanderExtentionDebugVec.end.x + this.debugDisplacemt.x;
	this.debugDisplacmentVec.end.y = this.wanderExtentionDebugVec.end.y+ this.debugDisplacemt.y;

	this.wanderingVelocityVecTest.start.x = this.sprite.position.x;
	this.wanderingVelocityVecTest.start.y = this.sprite.position.y;
	this.wanderingVelocityVecTest.end.x = this.debugDisplacmentVec.end.x;
	this.wanderingVelocityVecTest.end.y =this.debugDisplacmentVec.end.y;


	this.wanderingVelocityVecActual.start.x = this.sprite.position.x;
	this.wanderingVelocityVecActual.start.y = this.sprite.position.y;
	this.wanderingVelocityVecActual.end.x = this.sprite.position.x + this.wanderDebugTragectory.x;
	this.wanderingVelocityVecActual.end.y =this.sprite.position.y + this.wanderDebugTragectory.y;

}


WanderingBoid.prototype.debugRender = function(){
	Boid.prototype.debugRender.call(this);
	this.game.debug.geom(this.wanderDebugCircle,'green', true);
	this.game.debug.geom(this.wanderExtentionDebugVec,'white', true);
	this.game.debug.geom(this.debugDisplacmentVec,'red', true);
	this.game.debug.geom(this.wanderingVelocityVecTest,'orange', true);
	this.game.debug.geom(this.wanderingVelocityVecActual,'black', true);

}

