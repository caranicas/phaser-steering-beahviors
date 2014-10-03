$(document).ready(function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

	var numBoids = 1;
  var Flockable = [];
	var self = this;
	var isDebugging = false;
  var pathLen = 8;
  var vertPathBuffer = 80;

  function preload () {
  	game.load.image('spaceBG', 'assets/space.jpg');
  	game.load.image('ship1', 'assets/ship1.png');
    game.load.image('waypoint', 'assets/waypoint.png');

  }

  function create () {
    var bg = game.add.sprite(game.world.centerX, game.world.centerY, 'spaceBG');
    bg.anchor.setTo(0.5, 0.5);
    createPathingTest();
	}

	function createPathingTest()
	{
    var path = createPath();
   creatPathingObjects(path);
	}

  function createPath()
  {
    var arr = [];
    var spacing = game.world.width/pathLen;
    var xstart = spacing/2

    for(var i =0; i < pathLen; ++i)
    {
      var way = new Waypoint(game)
      way.initalize(i,'waypoint');
      var xpos = xstart + spacing*i;
      var ypos = Math.floor(Math.random()*game.world.height-vertPathBuffer)+(vertPathBuffer/2);
      var pos = new Phaser.Point(xpos,ypos);
      var vel = new Phaser.Point(0,0)
      way.create(pos,vel, 0, isDebugging);
      arr.push(way);
    }
    return new WayPath(arr);
  }

  function creatPathingObjects(path)
  {
    var boid = new PathingShip(game, path);
    boid.initalize(1,'ship1');
    var xpos = Math.floor(Math.random()*game.world.width);
    var ypos = Math.floor(Math.random()*game.world.height);
    var pos = new Phaser.Point(xpos,ypos);
    var vel = new Phaser.Point(10,10)
    boid.create(pos,vel, 0, isDebugging);
    boid.category = 1;
    boid.behavior = new BehaviorPathing(boid);
    Flockable.push(boid);
  }

   //LOOP
  function update(){
  	for (var i = 0; i < Flockable.length; i++)
  	{
      Flockable[i].behavior.update(Flockable);

  		if(isDebugging)
  		{
  		  Flockable[i].debugUpdate();
  		}
  	}
  }

  function render(){

		if(isDebugging)
		{
				for (var i = 0; i < Flockable.length; i++)
				{
					Flockable[i].debugRender();
				}
		}
  }


});