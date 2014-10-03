
$(document).ready(function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

	var numBoids = 1;
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
   	createFlockingTest()
	}

	function createFlockingTest()
	{
	  createFlockOne();
    //createFlockTwo();
   	createWormholeOne();
   	//createWormholeTwo();
	}

	function createWanderTest()
	{
			var boid = new Ship(game);
  		boid.initalize(1,'ship1');
  		var xpos = game.world.centerX+400 + Math.floor(Math.random()*200);
	 	  var ypos = game.world.centerY+300 + Math.floor(Math.random()*200);
  		var pos = new Phaser.Point(xpos,ypos);
  		var vel = new Phaser.Point(30,10)
  		boid.create(pos,vel, 0, isDebugging);
  		boid.category = 1;
  		boid.behavior = new BehaviorWander(boid);
  		Flock.push(boid);
  		Flockable.push(boid);
	}

	function toggleGroupOne(){
		OneSeek = !OneSeek;
		group = selectGroup(1);

		if(OneSeek)
		{

			for(var i = 0; i < group.length; ++i)
		  {
		  		group[i].behavior = new BehaviorFind(group[i],BlackHoles[0]);
		  }
		}
		else
		{
			for(var i = 0; i < group.length; ++i)
		  {
		  	group[i].behavior = new BehaviorAdvFlock(group[i]);
		  }
		}
	}
	function toggleGroupTwo(){
		TwoSeek = !TwoSeek;
		group = selectGroup(2);
		if(TwoSeek)
		{
			for(var i = 0; i < group.length; ++i)
		  {
		  	group[i].behavior = new BehaviorFind(group[i],BlackHoles[1]);
		  }
		}
		else
		{
			for(var i = 0; i < group.length; ++i)
		  {
		  	group[i].behavior = new BehaviorAdvFlock(group[i]);
		  }
		}
	}

	function selectGroup(category)
	{
		group = [];
		for(var i = 0; i < Flock.length; ++i)
		{
			if(Flock[i].category == category)
			{
				group.push(Flock[i]);
			}
		}

		return group;
	}
	function createWormholeOne(){
		var wormhole = new Wormhole(game);
		wormhole.initalize(1,'wormhole');
		var pos = new Phaser.Point(100,230);
    var vel = new Phaser.Point(0,0)
		wormhole.create(pos,vel,0,isDebugging,toggleGroupOne, self);
		wormhole.behavior = new BehaviorRotate(wormhole);
		BlackHoles.push(wormhole);
		Flockable.push(wormhole);
	}
	function createWormholeTwo(){
		var wormhole = new Wormhole(game);
		wormhole.initalize(2,'wormhole');
		var pos = new Phaser.Point(500,500);
    var vel = new Phaser.Point(0,0)
		wormhole.create(pos,vel,0, isDebugging, toggleGroupTwo, self);
		wormhole.behavior = new BehaviorRotate(wormhole);
		BlackHoles.push(wormhole);
		Flockable.push(wormhole);
	}

	function createFlockOne(){
    for(var i = 0; i < numBoids; ++i)
    {
    		var boid = new Ship(game);
    		boid.initalize(i,'ship1');
    		var xpos = game.world.centerX;//-400 + Math.floor(Math.random()*200);
		 	  var ypos = game.world.centerY+200;//-300 + Math.floor(Math.random()*200);
    		var pos = new Phaser.Point(xpos,ypos);
    		var vel = new Phaser.Point(0,-40)
    		boid.create(pos,vel, 0, isDebugging);
    		boid.category = 1;
    		boid.behavior = new BehaviorAdvFlock(boid);
    		Flock.push(boid);
    		Flockable.push(boid);
    }
  }

  function createFlockTwo(){
    for(var i = 0; i < numBoids; ++i)
    {
    		var boid = new Ship(game);
    		boid.initalize(i,'ship2');

    		var xpos = game.world.centerX+200 + Math.floor(Math.random()*200);
		 	  var ypos = game.world.centerY+ Math.floor(Math.random()*200);
    		var pos = new Phaser.Point(xpos,ypos);
    		var vel = new Phaser.Point(-30,-10)
    		boid.create(pos,vel, 0, isDebugging);
    		boid.category = 2;
    		boid.behavior = new BehaviorAdvFlock(boid);
    		Flock.push(boid);
    		Flockable.push(boid);
    }
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