function BehaviorFlockAvoidWormhole(boid) {
	Behavior.call(this, boid); // call super constructor.
}


// subclass extends superclass
BehaviorFlockAvoidWormhole.prototype = Object.create(Behavior.prototype);
BehaviorFlockAvoidWormhole.prototype.constructor = BehaviorFlockAvoidWormhole;

BehaviorFlockAvoidWormhole.prototype = {

	update:function(objs){

	  var avoidObjs = this.calcAvoidObjs(objs);
	  var avoidWall = MovementUtils.avoidWalls(this.boid.sprite.position,this.boid.game.world, 50,1);


    var separation = this.calcSeparate(flockObjs);
		var alignment = this.calcAlignment(flockObjs);
		var cohesion = this.calcCohesion(flockObjs);
		var avoid = this.calcCheckColision(avoidObjs);
		separation = separation.multiply(this.boid.sepWeight, this.boid.sepWeight);
    alignment = alignment.multiply(this.boid.aligWeight,this.boid.aligWeight);
    cohesion = cohesion.multiply(this.boid.cohWeight,this.boid.cohWeight);

    this.boid.sprite.body.acceleration.add(separation.x,separation.y);
    this.boid.sprite.body.acceleration.add(alignment.x,alignment.y);
    this.boid.sprite.body.acceleration.add(cohesion.x,cohesion.y);

    this.boid.sprite.body.acceleration.add(avoidObjs.x,avoidObjs.y);
    this.boid.sprite.body.acceleration.add(avoidWall.x,avoidWall.y);
    this.boid.sprite.body.velocity.add(this.boid.sprite.body.acceleration.x, this.boid.sprite.body.acceleration.y);
    this.boid.sprite.body.acceleration.multiply(0,0);
    this.boid.sprite.angle = MovementUtils.facing(this.boid.sprite.body.velocity);

    // Handle the Orientaion and other post velocity additions
		Behavior.prototype.update.call(this);

	},

	calcAvoidObjs:function(objs)
	{
		var ahead = new Phaser.Point(0,0);
		var aheadNorm = new Phaser.Point(0,0);
		aheadNorm = Phaser.Point.normalize(this.boid.sprite.body.velocity, aheadNorm)
		var aheadVel =  aheadNorm.multiply(this.boid.maxSeeAhead,this.boid.maxSeeAhead);
		ahead = new Phaser.Point.add(this.boid.sprite.position,aheadVel,ahead);

		var aheadTwo = new Phaser.Point(0,0);
		var aheadTwoNorm = new Phaser.Point(0,0);
		aheadTwoNorm = Phaser.Point.normalize(this.boid.sprite.body.velocity, aheadTwoNorm)
		var aheadTwoVel =  aheadTwoNorm.multiply(this.boid.maxSeeAhead,this.boid.maxSeeAhead/2);
		aheadTwo = new Phaser.Point.add(this.boid.sprite.position,aheadTwoVel,aheadTwo);

		var avoidMe = this.findAvoidObject(objs, ahead, aheadTwo);

		var avoidance = new Phaser.Point(0,0);
		if(avoidMe != null)
		{
			 avoidance.x = ahead.x - avoidMe.sprite.position.x;
       avoidance.y = ahead.y - avoidMe.sprite.position.y;
       avoidance.normalize();
       avoidance.setMagnitude(this.boid.maxAvoid);
		}

		return avoidance;
	},

	findAvoidObject:function(list,ahead, aheadTwo)
	{
		var closest = null
		var newDistance;
		for(var j = 0; j < list.length; ++j)
		{

			if(this.boid != list[j])
			{
				if((list[j] instanceof Wormhole))
				{
					var tester = list[j].sprite;
					if(MovementUtils.lineIntersectsCircle(ahead,aheadTwo,tester.position,(tester.width/2) ))
					{

						// Check if it is in danger of colliding with it. Dont alter path if object is moving faster
						if(this.boid.sprite.body.velocity.getMagnitude() > tester.body.velocity.getMagnitude())
						{
							if(closest == null)
							{
								closest = list[j];
							}

							else
							{
								var oldD = Phaser.Math.distance(closest.sprite.position, this.boid.sprite.position);
								var newD = Phaser.Math.distance(list[j].sprite.position, this.boid.sprite.position);
								if(newD < oldD)
								{
									closest = list[j];
								}
							}
						}
					}
				}
			}
		}
		return closest;
	}

}
