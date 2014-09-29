
$(document).ready(function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

	var numBoids = 20;
  var Flock = [];
  var FlockTwo = [];
  var Flockable = [];
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
   	//createAvoidanceTest()
    createAvoidanceTestTwo()
	}

	function createAvoidanceTest()
	{
			createFlockOne();
			createFlockTwo();
	}


  function createAvoidanceTestTwo()
  {
      var boid = new Ship(game);
      boid.initalize(1,'ship1');
      var xpos = game.world.centerX-200;
      var ypos = game.world.centerY;
      var pos = new Phaser.Point(xpos,ypos);
      var vel = new Phaser.Point(30,0)
      boid.create(pos,vel, 0, isDebugging);
      boid.category = 1;
      boid.behavior = new BehaviorFlockAndAvoid(boid);
      Flock.push(boid);
      Flockable.push(boid);

      var boid = new Ship(game);
      boid.initalize(2,'ship2');
      var xpos = game.world.centerX+200;
      var ypos = game.world.centerY+2;
      var pos = new Phaser.Point(xpos,ypos);
      var vel = new Phaser.Point(-30,0)
      boid.create(pos,vel, 0, isDebugging);
      boid.category = 1;
      boid.behavior = new BehaviorFlockAndAvoid(boid);
      FlockTwo.push(boid);
      Flockable.push(boid);
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
  		boid.behavior = new BehaviorFlockAndAvoid(boid);
  		Flock.push(boid);
  		Flockable.push(boid);
    }
  }

	function createFlockTwo()
	{
    for(var i = 0; i < numBoids; ++i)
    {
  		var boid = new Ship(game);
  		boid.initalize(i,'ship2');
  		var xpos = game.world.centerX+350 + Math.floor(Math.random()*200);
	 	  var ypos = game.world.centerY+150 + Math.floor(Math.random()*200);
  		var pos = new Phaser.Point(xpos,ypos);
  		var vel = new Phaser.Point(-30,-10)
  		boid.create(pos,vel, 0, isDebugging);
  		boid.category = 1;
  		boid.behavior = new BehaviorFlockAndAvoid(boid);
  		FlockTwo.push(boid);
  		Flockable.push(boid);
    }
  }

  //LOOP
  function update(){

    for (var i = 0; i < Flock.length; i++)
    {
      Flock[i].behavior.update(Flock,FlockTwo);

      if(isDebugging)
      {
        Flock[i].debugUpdate();
      }
    }

    for (var i = 0; i < FlockTwo.length; i++)
    {
      FlockTwo[i].behavior.update(FlockTwo, Flock);

      if(isDebugging)
      {
        FlockTwo[i].debugUpdate();
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