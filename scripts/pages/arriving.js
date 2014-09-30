
$(document).ready(function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

	var numBoids = 10;
  var Flock = [];
  var Flockable = [];
  var destinations = [];
	var self = this;
	var isDebugging = false;

  function preload () {
  	game.load.image('spaceBG', 'assets/space.jpg');
  	game.load.image('ship1', 'assets/ship1.png');
 	 	game.load.image('spacestation', 'assets/spacestation.png');
  }

  function create () {
    var bg = game.add.sprite(game.world.centerX, game.world.centerY, 'spaceBG');
    bg.anchor.setTo(0.5, 0.5);
   	createArrivalTest()
	}

	function createArrivalTest()
	{

      var destination = new Spaceport(game);
      destination.initalize(1,'spacestation');
      var pos = new Phaser.Point( game.world.centerX, game.world.centerY);
      var vel = new Phaser.Point(0,0)
      destination.create(pos,vel, 0, isDebugging);
      destination.category = 1;
      destination.behavior = new Behavior(destination);
      destinations.push(destination);
      Flockable.push(destination);



      console.log('destination',destination.sprite);
			var boid = new ArrivingShip(game, destination);
  		boid.initalize(2,'ship1');
  		var pos = new Phaser.Point( game.world.centerX +100, game.world.centerY+100);
  		var vel = new Phaser.Point(0,-10)
  		boid.create(pos,vel, 0, isDebugging);
  		boid.category = 1;
  		boid.behavior = new BehaviorArrive(boid);
  		Flock.push(boid);
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