ship = function (game) {
     this.game = game;
};

ship.prototype.create = function(index,asset) {

    var xpos = this.game.world.centerX  + Math.floor(Math.random()*200)
    var ypos = this.game.world.centerY + Math.floor(Math.random()*200)


    var xvel = 50;
    var yvel =0;

    // if(index%2 == 0)
    // {
    // 	xvel *= -1
    // }

    // if(index%3 == 0)
    // {
    // 	yvel *= -1
    // }

    // if(index%7 == 0)
    // {
    //     yvel *= -1
    // }

    // if(index%5 == 0)
    // {
    //     xvel *= -1
    // }

    this.entity = this.game.add.sprite(xpos, ypos, asset);
    this.entity.anchor.set(0.5);
    this.entity.id = index;
    this.game.physics.enable(this.entity, Phaser.Physics.ARCADE);
    this.entity.angle = 0;
    this.entity.body.velocity.x = xvel;
    this.entity.body.velocity.y = yvel;
}


ship.prototype.update = function(){

}