Behavior = function (boid) {
	this.boid = boid;
};

Behavior.prototype.update = function(objs){
	this.boid.sprite.body.velocity.add(this.boid.sprite.body.acceleration.x, this.boid.sprite.body.acceleration.y)
	this.boid.sprite.body.acceleration.multiply(0,0);
	MovementUtils.limit(this.boid.sprite.body.velocity, this.maxSpeed);
	this.boid.sprite.angle = MovementUtils.facing(this.boid.sprite.body.velocity);
}
