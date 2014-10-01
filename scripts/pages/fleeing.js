$(document).ready(function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

	var numBoids = 1;
  var Flockable = [];
	var self = this;
	var isDebugging = false;

  function preload () {
  	game.load.image('spaceBG', 'assets/space.jpg');
  	game.load.image('ship1', 'assets/ship1.png');
    game.load.image('ship3', 'assets/ship3.png');

  }

  function create () {
    var bg = game.add.sprite(game.world.centerX, game.world.centerY, 'spaceBG');
    bg.anchor.setTo(0.5, 0.5);
    createFleeingTest();
	}

	function createFleeingTest()
	{
    var preditor = createPursuingTarget();
    var prey = creatFleeingObject();
    preditor.updateTarget(prey);
    prey.updateAvoidance(preditor);
	}

  function createPursuingTarget()
  {
    var boid = new PursuingShip(game,null);
    boid.initalize(1,'ship1');
    var xpos = Math.floor(Math.random()*game.world.bounds.width);
    var ypos = Math.floor(Math.random()*game.world.bounds.height);
    var pos = new Phaser.Point(xpos,ypos);
    var vel = new Phaser.Point(0,0)
    boid.create(pos,vel, 0, isDebugging);
    boid.category = 1;
    boid.behavior = new BehaviorPursue(boid);
    Flockable.push(boid);
    return boid;
  }

  function creatFleeingObject(target)
  {
    var boid = new FleeingShip(game,null);
    boid.initalize(1,'ship3');
    var xpos = Math.floor(Math.random()*game.world.bounds.width);
    var ypos = Math.floor(Math.random()*game.world.bounds.height);
    var pos = new Phaser.Point(xpos,ypos);
    var vel = new Phaser.Point(30,20)
    boid.create(pos,vel, 0, isDebugging);
    boid.category = 1;
    boid.behavior = new BehaviorFlee(boid);
    Flockable.push(boid);
    return boid;
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