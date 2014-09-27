
$(document).ready(function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

	var numBoids = 40;
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
   	createFlockingTest();
	}

	function createFlockingTest()
	{
	  createFlockOne();
    createFlockTwo();
	}

	function createFlockOne(){
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
    		boid.behavior = new BehaviorFlock(boid);
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
    		boid.behavior = new BehaviorFlock(boid);
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