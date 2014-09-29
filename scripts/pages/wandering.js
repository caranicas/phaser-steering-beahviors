
$(document).ready(function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

	var numBoids = 10;
  var Flock = [];
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
   	createWanderTest()
	}

	function createWanderTest()
	{
      for(var i = 0; i < numBoids; ++i)
      {
  			var boid = new WanderingShip(game);
    		boid.initalize(i,'ship1');
    		var pos = new Phaser.Point( game.world.centerX, game.world.centerY);
    		var vel = new Phaser.Point(0,-10)
    		boid.create(pos,vel, 0, isDebugging);
    		boid.category = 1;
    		boid.behavior = new BehaviorWander(boid);
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