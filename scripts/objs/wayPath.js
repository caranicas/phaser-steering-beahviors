function WayPath(points) {
	this.cur = 0;
	this.points = points;
}


WayPath.prototype.update = function(){


	if(++this.cur >= this.points.length)
	{
		this.cur = 0;
	}

}

WayPath.prototype.getCurrent = function(){
	return this.points[this.cur];
}
