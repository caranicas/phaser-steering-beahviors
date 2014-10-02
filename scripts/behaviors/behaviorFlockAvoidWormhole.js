function BehaviorFlockAvoidWormhole(boid) {
	Behavior.call(this, boid); // call super constructor.
}


// subclass extends superclass
BehaviorFlockAvoidWormhole.prototype = Object.create(Behavior.prototype);
BehaviorFlockAvoidWormhole.prototype.constructor = BehaviorFlockAvoidWormhole;

BehaviorFlockAvoidWormhole.prototype = {

	update:function(objs){

	  var avoidObjs = this.calcAvoidForce(objs);
	  var avoidWall = MovementUtils.avoidWalls(this.boid.sprite.position,this.boid.game.world, 50,1);

    var separation = this.calcSeparate(objs);
		var alignment = this.calcAlignment(objs);
		var cohesion = this.calcCohesion(objs);
		separation = separation.multiply(this.boid.sepWeight, this.boid.sepWeight);
    alignment = alignment.multiply(this.boid.aligWeight,this.boid.aligWeight);
    cohesion = cohesion.multiply(this.boid.cohWeight,this.boid.cohWeight);

    this.boid.sprite.body.acceleration.add(separation.x,separation.y);
    this.boid.sprite.body.acceleration.add(alignment.x,alignment.y);
    this.boid.sprite.body.acceleration.add(cohesion.x,cohesion.y);

    this.boid.sprite.body.acceleration.add(avoidObjs.x,avoidObjs.y);
    this.boid.sprite.body.acceleration.add(avoidWall.x,avoidWall.y);


    // Handle the Orientaion and other post velocity additions
		Behavior.prototype.update.call(this);

		this.boid.sprite.angle = MovementUtils.facing(this.boid.sprite.body.velocity);


	},

	calcAvoidForce:function(objs)
	{

		var ahead = MovementUtils.lookAhead(this.boid.sprite.position,this.boid.sprite.body.velocity, this.boid.maxSeeAhead);
		var aheadTwo =  MovementUtils.lookAhead(this.boid.sprite.position, this.boid.sprite.body.velocity,this.boid.maxSeeAhead/2);
		var avoidMe = this.findAvoidObject(objs,ahead,aheadTwo);

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



	findAvoidObject:function(list,ahead,aheadTwo)
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
	},

	calcAlignment:function(objs){

		var total = new Phaser.Point(0,0);
		var count = 0;
	 	for(var j = 0; j < objs.length; ++j)
	  {
	  	var test = (objs[j] instanceof Wormhole);
	  	//console.log('test',test);

	  	if (this.boid != objs[j] && !test)
			{
				var distance = Phaser.Math.distance(this.boid.sprite.position.x, this.boid.sprite.position.y, objs[j].sprite.position.x, objs[j].sprite.position.y);
				if(distance > 0 && distance < this.boid.aligInfluence)
				{

					total.add(objs[j].sprite.body.velocity.x, objs[j].sprite.body.velocity.y)
					count++;

					// Have Objects in same category extra align
					if(objs[j].category == this.boid.category)
					{
						total.add(objs[j].sprite.body.velocity.x, objs[j].sprite.body.velocity.y)
						count++;
					}
				}
			}
		}

		if (count > 0)
		{

			total = total.divide(count,count);
			total.normalize();
			total.setMagnitude(this.boid.maxSpeed);
			var steer = new Phaser.Point(0, 0);
			steer = Phaser.Point.subtract(total, this.boid.sprite.body.velocity);
			steer = MovementUtils.limit(steer, this.boid.maxForce);
			return steer;
		}

		else
		{
			return new Phaser.Point(0, 0);
		}

	},
	calcCohesion:function(objs){

		var total = new Phaser.Point(0,0);
		var count = 0;
		for(var j = 0; j < objs.length; ++j)
	  {
	  	var test = (objs[j] instanceof Wormhole);
	  	if (this.boid != objs[j] && !test)
			{
				var distance = Phaser.Math.distance(this.boid.sprite.position.x, this.boid.sprite.position.y, objs[j].sprite.position.x, objs[j].sprite.position.y);
				if (distance > 0 && distance < this.boid.cohInfluence)
				{
					total.add(objs[j].sprite.position.x,  objs[j].sprite.position.y)
					count++;
				}

				// Have Objects in same category extra cohese
				if(objs[j].category == this.boid.category)
				{
					total.add(objs[j].sprite.position.x,  objs[j].sprite.position.y)
					count++;
				}
			}
		}

		if (count > 0)
		{
			total = total.divide(count,count);
			return MovementUtils.seekSteer(total, this.boid.getPosition(), this.boid.getVelocity(), this.boid.maxForce, this.boid.maxSpeed);
			//return MovementUtils.seek(total, this.boid.sprite.position).normalize();
		}
		else
		{
			return new Phaser.Point(0,0);
		}

	},

	calcSeparate:function(objs){
		var steer = new Phaser.Point(0,0);
		var count = 0;
		var vector = new Phaser.Point(0,0);
		for(var j = 0; j < objs.length; ++j)
		{

			if (this.boid != objs[j])
			{
				var distance = Phaser.Math.distance(this.boid.sprite.position.x, this.boid.sprite.position.y, objs[j].sprite.position.x, objs[j].sprite.position.y);
				if((distance > 0) && (distance < this.boid.sepInfluence))
				{
					var diff = Phaser.Point.subtract(this.boid.sprite.position, objs[j].sprite.position);
					diff.normalize();
					diff = diff.divide(distance, distance);
					steer = steer.add(diff.x, diff.y)
					count++;

					// Have Objects in same category extra Separate
					if(objs[j].category != this.boid.category)
					{
						var diffX = Phaser.Point.subtract(this.boid.sprite.position, objs[j].sprite.position);
						diffX.normalize();
						diffX = diffX.divide(distance, distance);
						steer = steer.add(diffX.x, diffX.y)
						count++;
					}
		 		}
		 	}
	  }

	  if (count > 0)
	 	{
	 		steer = steer.divide(count, count);
	 	}

	 	if (steer.getMagnitude() > 0)
	 	{
	 		steer.setMagnitude(this.boid.maxSpeed);
	 		steer = steer.subtract(this.boid.sprite.body.velocity.x,this.boid.sprite.body.velocity.y);
	 		steer = MovementUtils.limit(steer, this.boid.maxForce)
	 	}

		return steer;

		}

}
