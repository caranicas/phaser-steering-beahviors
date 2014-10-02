function WanderingBoid(game) {

  Boid.call(this, game); // call super constructor.

	this.wanderRadialMag = 50;
	this.distanceExtension = 100;
	this.wanderAngle = 0;
	this.wanderVariance = 180;
	this.wanderDate = new Date();
	this.wanderDelta = 200;

	// Debug Info
	this.debugWanderExtendCatch = null;
	this.debugWanderRadialCatch = null;
	this.debugWanderCatch = null;

	//Debug Display
	this.debugWanderExtendCatchDisplay = null;
	this.debugDisplacmentDisplay = null;
	this.debugSeekTestDisplay = null;
	this.debugSeekActualDisplay = null;
	this.debugCircleDisplay = null;
}

// subclass extends superclass
WanderingBoid.prototype = Object.create(Boid.prototype);
WanderingBoid.prototype.constructor = Boid;

WanderingBoid.prototype.create = function(pos,vel,angle, debug){

	Boid.prototype.create.call(this, pos,vel,angle, debug);

	if(debug)
	{
		this.debugWanderExtendCatch = new Phaser.Point(0,0);
		this.debugWanderRadialCatch = new Phaser.Point(0,0);
		this.debugWanderCatch = new Phaser.Point(0,0);

		this.debugWanderExtendCatchDisplay = new Phaser.Line(0,0,0,0);
		this.debugDisplacmentDisplay = new Phaser.Line(0,0,0,0);
		this.debugSeekTestDisplay = new Phaser.Line(0,0,0,0);
		this.debugSeekActualDisplay = new Phaser.Line(0,0,0,0);
		this.debugCircleDisplay = new Phaser.Circle(0,0, this.wanderRadialMag*2)
	}

	return this;
}

WanderingBoid.prototype.debugUpdate = function(){

	Boid.prototype.debugUpdate.call(this);
	this.debugWanderExtendCatchDisplay.start.x = this.sprite.position.x;
	this.debugWanderExtendCatchDisplay.start.y = this.sprite.position.y;
	this.debugWanderExtendCatchDisplay.end.x = this.debugWanderExtendCatch.x;
	this.debugWanderExtendCatchDisplay.end.y = this.debugWanderExtendCatch.y;

	this.debugCircleDisplay.x = this.debugWanderExtendCatchDisplay.end.x;
	this.debugCircleDisplay.y = this.debugWanderExtendCatchDisplay.end.y;

	this.debugDisplacmentDisplay.start.x = this.debugWanderExtendCatchDisplay.end.x;
	this.debugDisplacmentDisplay.start.y = this.debugWanderExtendCatchDisplay.end.y;
	this.debugDisplacmentDisplay.end.x = this.debugWanderExtendCatchDisplay.end.x + this.debugWanderRadialCatch.x;
	this.debugDisplacmentDisplay.end.y = this.debugWanderExtendCatchDisplay.end.y+ this.debugWanderRadialCatch.y;

	this.debugSeekTestDisplay.start.x = this.sprite.position.x;
	this.debugSeekTestDisplay.start.y = this.sprite.position.y;
	this.debugSeekTestDisplay.end.x = this.debugDisplacmentDisplay.end.x;
	this.debugSeekTestDisplay.end.y =this.debugDisplacmentDisplay.end.y;


	this.debugSeekActualDisplay.start.x = this.sprite.position.x;
	this.debugSeekActualDisplay.start.y = this.sprite.position.y;
	this.debugSeekActualDisplay.end.x = this.sprite.position.x + this.debugWanderCatch.x;
	this.debugSeekActualDisplay.end.y =this.sprite.position.y + this.debugWanderCatch.y;

}


WanderingBoid.prototype.debugRender = function(){
	Boid.prototype.debugRender.call(this);

	this.game.debug.geom(this.debugCircleDisplay,'green', true);
	this.game.debug.geom(this.debugWanderExtendCatchDisplay,'white', true);
	this.game.debug.geom(this.debugDisplacmentDisplay,'red', true);
	this.game.debug.geom(this.debugSeekTestDisplay,'orange', true);
	this.game.debug.geom(this.debugSeekActualDisplay,'black', true);


}

