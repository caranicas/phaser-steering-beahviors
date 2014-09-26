
$(document).ready(function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

	var numBoids = 20;
  var Flock = [];
  var BlackHoles = [];
  var Flockable = [];
  var Test = [];
	var OneSeek = false;
	var TwoSeek = false;
	var WormHole;
	var self = this;
	var isDebugging = false;

  function preload () {
  	game.load.image('spaceBG', 'assets/space.jpg');
  	game.load.image('ship1', 'assets/ship1.png');
  	game.load.image('ship2', 'assets/ship2.png');
 	 	game.load.image('wormhole', 'assets/wormhole2.png');
  }

  function create () {
    var bg = game.add.sprite(game.world.centerX, game.world.centerY, 'spaceBG');
    bg.anchor.setTo(0.5, 0.5);
   	createAvoidanceTest()
	}

	function createAvoidanceTest()
	{
			createFlockOne();
			createAllWormholes();
	}

	function doNothing()
	{
		// foo bar
	}

	function createFlockOne()
	{
    for(var i = 0; i < numBoids; ++i)
    {
  		var boid = new Ship(game);
  		boid.initalize(i,'ship1');
  		var xpos = game.world.centerX-400 + Math.floor(Math.random()*200);
	 	  var ypos = game.world.centerY-300 + Math.floor(Math.random()*200);
  		var pos = new Phaser.Point(xpos,ypos);
  		var vel = new Phaser.Point(30,10)
  		boid.create(pos,vel, 0, isDebugging);
  		boid.category = 1;
  		boid.behavior = new BehaviorFlockAvoidWormhole(boid);
  		Flock.push(boid);
  		Flockable.push(boid);
    }
  }

  function createAllWormholes()
  {
  		var wormhole = new Wormhole(game);
			wormhole.initalize(1,'wormhole');
			var pos = new Phaser.Point(140,230);
   		var vel = new Phaser.Point(0,0);
			wormhole.create(pos,vel,0,isDebugging,doNothing, self);
			wormhole.behavior = new BehaviorRotate(wormhole);
			BlackHoles.push(wormhole);
			Flockable.push(wormhole);

			var wormhole = new Wormhole(game);
			wormhole.initalize(2,'wormhole');
			var pos = new Phaser.Point(100,500);
   		var vel = new Phaser.Point(0,0);
   		wormhole.create(pos,vel,0,isDebugging,doNothing, self);
			wormhole.behavior = new BehaviorRotate(wormhole);
			BlackHoles.push(wormhole);
			Flockable.push(wormhole);

			var wormhole = new Wormhole(game);
			wormhole.initalize(3,'wormhole');
			var pos = new Phaser.Point(295,340);
   		var vel = new Phaser.Point(0,0);
   		wormhole.create(pos,vel,0,isDebugging,doNothing, self);
			wormhole.behavior = new BehaviorRotate(wormhole);
			BlackHoles.push(wormhole);
			Flockable.push(wormhole);

			var wormhole = new Wormhole(game);
			wormhole.initalize(4,'wormhole');
			var pos = new Phaser.Point(380,175);
   		var vel = new Phaser.Point(0,0);
   		wormhole.create(pos,vel,0,isDebugging,doNothing, self);
			wormhole.behavior = new BehaviorRotate(wormhole);
			BlackHoles.push(wormhole);
			Flockable.push(wormhole);

			var wormhole = new Wormhole(game);
			wormhole.initalize(5,'wormhole');
			var pos = new Phaser.Point(500,430);
   		var vel = new Phaser.Point(0,0);
   		wormhole.create(pos,vel,0,isDebugging,doNothing, self);
			wormhole.behavior = new BehaviorRotate(wormhole);
			BlackHoles.push(wormhole);
			Flockable.push(wormhole);

			var wormhole = new Wormhole(game);
			wormhole.initalize(6,'wormhole');
			var pos = new Phaser.Point(600,200);
   		var vel = new Phaser.Point(0,0);
   		wormhole.create(pos,vel,0,isDebugging,doNothing, self);
			wormhole.behavior = new BehaviorRotate(wormhole);
			BlackHoles.push(wormhole);
			Flockable.push(wormhole);

			var wormhole = new Wormhole(game);
			wormhole.initalize(7,'wormhole');
			var pos = new Phaser.Point(650,350);
   		var vel = new Phaser.Point(0,0);
   		wormhole.create(pos,vel,0,isDebugging,doNothing, self);
			wormhole.behavior = new BehaviorRotate(wormhole);
			BlackHoles.push(wormhole);
			Flockable.push(wormhole);

			var wormhole = new Wormhole(game);
			wormhole.initalize(8,'wormhole');
			var pos = new Phaser.Point(350,500);
   		var vel = new Phaser.Point(0,0);
   		wormhole.create(pos,vel,0,isDebugging,doNothing, self);
			wormhole.behavior = new BehaviorRotate(wormhole);
			BlackHoles.push(wormhole);
			Flockable.push(wormhole);
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