'use strict';

// define constants
var BLOCK = {
    HEIGHT: 83,
    WIDTH: 101
};
var CANVAS = {
    HEIGHT: BLOCK.HEIGHT * 12,
    WIDTH: BLOCK.WIDTH * 10,
    OFFSET: 20
};

// superclas Character
var Character = function(x, y, sprite) {
    this.x = x * BLOCK.WIDTH;
    this.y = y * BLOCK.HEIGHT - CANVAS.OFFSET;
    this.sprite = sprite;

    // Draw the enemy on the screen, required method for game
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

// Enemies our player must avoid
var Enemy = function(x, y, speed, direction) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Character.call(this, x, y, 'images/enemy-bug.png');
    this.speed = speed;
    this.direction = direction;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    this.x += dt * BLOCK.WIDTH * this.direction*this.speed;

    // direction = -1 means from right to left
    if( this.direction == -1 ){
        if (this.x < 0) {
            this.x = CANVAS.WIDTH + BLOCK.WIDTH;
        }       
    }
    else if ( this.direction == 1){
        if (this.x > CANVAS.WIDTH) {
            this.x = -BLOCK.WIDTH;
        }               
    }


};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    Character.call(this, x, y, 'images/char-boy.png');
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    var i = 0, enemy;
    // winning condition
    if (this.y < 0) {
        alert('you win!');
        this.resetPosition();
    }

    // losing condition
    for (i; i < allEnemies.length; i++) {
        enemy = allEnemies[i];
        if ((this.x <= enemy.x + BLOCK.WIDTH / 3
             && this.x >= enemy.x -BLOCK.WIDTH / 3)
            && Math.round(enemy.y - this.y) === 0) {
            alert('you lost!');
            this.resetPosition();
            break;
        }
    }
};

Player.prototype.resetPosition = function() {
    this.x = 5 * BLOCK.WIDTH;
    this.y = 11 * BLOCK.HEIGHT - CANVAS.OFFSET;
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if (this.x > 0) this.x -= BLOCK.WIDTH;
            break;
        case 'up':
            if (this.y >= 0) this.y -= BLOCK.HEIGHT;
            break;
        case 'right':
            if (this.x < CANVAS.WIDTH - BLOCK.WIDTH) this.x += BLOCK.WIDTH;
            break;
        case 'down':
            if (this.y < CANVAS.HEIGHT - BLOCK.HEIGHT) this.y += BLOCK.HEIGHT;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(5, 11);
var allEnemies = [];

for( var i=0; i<10+ Math.random()*10; i++){
  var startpoint, plusminus;
  if(Math.random()<0.5) {
    plusminus=-1;
    startpoint=11;
  }
  else{
    plusminus=1;
    startpoint=0;
  }
  allEnemies[i] = new Enemy(startpoint, 1+Math.round(Math.random()*9), Math.round(Math.random()*6), plusminus);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
    