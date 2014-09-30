moveUtils = function(){

  function facing(vector)
  {
  	var newangle = Math.atan2(vector.x, -vector.y) * 180 / Math.PI;
  	return newangle;
  }

   function seek(target,point)
  {
    var desired = Phaser.Point.subtract(target,point);
    return desired;
  }

  function seekSteer(target,position,curVelocity, maxForce, maxSpeed){

    var seek = this.seek(target,position).normalize();
    var desired = new Phaser.Point(seek.x*maxSpeed, seek.y*maxSpeed);
    var steer = MovementUtils.limit(Phaser.Point.subtract(desired,curVelocity),maxForce)
    return steer;
  }

  function limit(vector, max)
  {
    if(vector.getMagnitude() > max)
    {
      vector.normalize();
      vector.multiply(max,max);
    }
    return vector;
  }

  function loopWalls(vector, bounds)
  {
    if (vector.x < 0)
    {
      vector.x = bounds.width;
    }
    else if (vector.x > bounds.width)
    {
      vector.x = 0;
    }
    if (vector.y < 0)
    {
      vector.y = bounds.height
    }
    else if (vector.y > bounds.height)
    {
      vector.y = 0
    }
  }

  function lookAhead(position, velocity, lookMag)
  {
    var aheadNorm = Phaser.Point.normalize(velocity)
    var aheadVel =  aheadNorm.multiply(lookMag,lookMag);
    return new Phaser.Point.add(position,aheadVel);
  }

  function avoidWalls(vector,bounds,  buffer, stregth){

    var avoidance = new Phaser.Point();
    if (vector.x < 0+buffer)
    {
      avoidance.x = stregth;
    }
    else if (vector.x > bounds.width-buffer)
    {
      avoidance.x = -stregth;
    }
    if (vector.y < 0+buffer)
    {
      avoidance.y = stregth
    }
    else if (vector.y > bounds.height-buffer)
    {
      avoidance.y = -stregth
    }
    return avoidance;
  }

  function lineIntersectsCircle(ahead, ahead2, target, rad){

    var d1 = Phaser.Math.distance(target.x,target.y, ahead.x, ahead.y);
    if(d1 <= rad)
    {
      return true;
    }

    var d2 = Phaser.Math.distance(target.x,target.y, ahead2.x,ahead2.y)
    if(d2 <= rad)
    {
      return true;
    }
    return false;
  }

  function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  return{
    facing:facing,
    seek:seek,
    seekSteer:seekSteer,
    limit:limit,
    loopWalls:loopWalls,
    avoidWalls:avoidWalls,
    lineIntersectsCircle:lineIntersectsCircle,
    getRandomBetween:getRandomBetween,
    lookAhead:lookAhead

  }
};

MovementUtils = new moveUtils();