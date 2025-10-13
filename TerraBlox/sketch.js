//how does this project demonstrate what I learned in class?
//Well I made a map that is drawn by a text file
//I loaded images and gave the player animations
//Made a camera system with precise horizontal collisions
//Made the camera also stop following the player when player reaches edges of the map
//Made player jumping system
//Made precise block placement and breaking using lists and complex math equations that I definetly got myself :)

//Bugs :(
//When player jumps and hits the bottom of aaa block, game glitchaes and snaps player above the block
//When player jumps on a wall of blocks it also glitches
//Bugs mainly occur when jumping, tried MANY methods but none seem to work, looks like im going to have to rewrite jumping system but i dont think i would be able to finish it anytime soon.

//I hope this project demonstarted my capabilities with p5js and my knowledge gained during class well. Hope you enjoy playing this :)

//screen
let screen_w = 750;
let screen_h = 500;

//images
let grass_image;
let dirt_image;
let wood_image;
let player_normal_image;
let player_right_image;

//tilemap
let tilemap = [];
let tile_size = 50;
let update_tilemap = true;

//camera
let camera_x = 0;
let move_camera = true;

//player
let player_x = screen_w / 2 - 25;
let player_y = 300;
let player_w = 40;
let player_h = 100;
let player_speed = 5;
let player_image = null;

let is_on_ground = true;
let jump_velocity = 20;
let jumped = false;

//world
let gravity = 7;
let falling = false;

function preload() {
  //load images
  grass_image = loadImage("Assets/Grass.png");
  dirt_image = loadImage("Assets/Dirt.png");
  wood_image = loadImage("Assets/Wood.png");
  player_normal_image = loadImage("Assets/Steve.png");
  player_right_image = loadImage("Assets/Steve_right.png");
  loadStrings("Assets/tilemap.txt", parseTilemap);
}

function setup() {
  frameRate(120);
  createCanvas(screen_w, screen_h);
}

function parseTilemap(data) {
  //read and extract tilemap.txt
  for (let i = 0; i < data.length; i++) {
    tilemap[i] = data[i].split(",").map(Number);
  }
}

class Block {
  constructor(x, y, w, h, id) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
  }

  draw(img) {
    image(img, this.x, this.y, this.w, this.h);
  }

  camera(blocks) {
    if (keyIsDown(65) && player_x === screen_w / 2) {
      if (camera_x >= 0) {
        this.x += player_speed;
        if (move_camera) {
          camera_x -= player_speed / blocks.length;
        }
      }
    }

    if (keyIsDown(68) && player_x === screen_w / 2) {
      if (camera_x <= (tilemap[0].length - 23) * 50) {
        this.x -= player_speed;
        if (move_camera) {
          camera_x += player_speed / blocks.length;
        }
      }
    }
  }
}

let blocks = [];
let collided = false;

function draw_blocks() {
  //add blocks
  if (update_tilemap === true) {
    blocks = [];
    for (let row = 0; row < tilemap.length; row++) {
      for (let col = 0; col < tilemap[row].length; col++) {
        tile = tilemap[row][col];
        if (tile === 1) {
          blocks.push(
            new Block(
              col * tile_size - 50 - camera_x,
              row * tile_size,
              tile_size,
              tile_size,
              tile
            )
          );
        }
        if (tile === 2) {
          blocks.push(
            new Block(
              col * tile_size - 50 - camera_x,
              row * tile_size,
              tile_size,
              tile_size,
              tile
            )
          );
        }
        if (tile === 3) {
          blocks.push(
            new Block(
              col * tile_size - 50 - camera_x,
              row * tile_size,
              tile_size,
              tile_size,
              tile
            )
          );
        }
      }
      update_tilemap = false;
    }
  }

  //draw blocks
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].camera(blocks);

    if (blocks[i].id == 1) {
      blocks[i].draw(grass_image);
    } else if (blocks[i].id == 2) {
      blocks[i].draw(dirt_image);
    } else if (blocks[i].id == 3) {
      blocks[i].draw(wood_image);
    }
  }
}

function player() {
  // animations
  if (keyIsDown(68)) {
    image(player_right_image, player_x, player_y, 50, player_h);
  } else if (keyIsDown(65)) {
    push();
    translate(player_x + 50, player_y);
    scale(-1, 1);
    image(player_right_image, 0, 0, 50, player_h);
    pop();
  } else {
    image(player_normal_image, player_x, player_y, 50, player_h);
  }

  // world end collision
  if (player_x <= 0) {
    player_x = 0;
  } else if (player_x + player_w >= screen_w) {
    player_x = screen_w - player_w;
  }

  // jump
  if (keyIsDown(32) && is_on_ground) {
    jumped = true;
  }

  if (jumped) {
    is_on_ground = false;
    jump_velocity -= 1;
    player_y -= jump_velocity;
  }

  // check for collisions with top of blocks
  let grounded = false;
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i];
    if (
      player_y + player_h >= block.y &&
      player_y < block.y + block.h &&
      player_x + player_w > block.x &&
      player_x < block.x + block.w
    ) {
      grounded = true;
      if (jumped || falling) {
        player_y = block.y - player_h;
        falling = false;
        break;
      }
    }
  }

  is_on_ground = grounded;

  if (is_on_ground) {
    jump_velocity = 20;
    jumped = false;
  } else if (is_on_ground === false && jumped === false) {
    player_y += gravity;
    falling = true;
  }

  // check for collisions with blocks
  for (let i = 0; i < blocks.length; i++) {
    fill(0);
    let block = blocks[i];
    if (
      player_y + player_h > block.y &&
      player_y < block.y + block.h &&
      player_x + player_w >= block.x &&
      player_x <= block.x + block.w
    ) {
      fill(0);

      if (!falling) {
        if (player_x + player_w >= block.x && player_x <= block.x - 15) {
          if (camera_x <= 0 || camera_x >= (tilemap[0].length - 23) * 50) {
            player_x = block.x - player_w - 2;
          } else {
            for (let j = 0; j < blocks.length; j++) {
              blocks[j].x += player_speed;
              camera_x -= player_speed / blocks.length;
            }
          }
        }
        if (player_x + 10 <= block.x + block.w && player_x >= block.x) {
          if (camera_x <= 0 || camera_x >= (tilemap[0].length - 23) * 50) {
            player_x = block.x + block.w - (50 - player_w);
          } else {
            for (let j = 0; j < blocks.length; j++) {
              blocks[j].x -= player_speed;
              camera_x += player_speed / blocks.length;
            }
          }
        }
      }
    }
  }
}

function camera_control() {
  //update player_x when player is out of camera distance
  if (camera_x <= 0) {
    camera_x = 0;
    if (keyIsDown(65) && player_x >= 0) {
      player_x -= player_speed;
    }
    if (keyIsDown(68) && player_x <= screen_w - player_w) {
      player_x += player_speed;
    }
    if (player_x >= screen_w / 2) {
      player_x = screen_w / 2;
    }
  }

  if (camera_x >= (tilemap[0].length - 23) * 50) {
    camera_x = (tilemap[0].length - 23) * 50;
    if (keyIsDown(65)) {
      player_x -= player_speed;
    }
    if (keyIsDown(68)) {
      player_x += player_speed;
    }
    if (player_x <= screen_w / 2) {
      player_x = screen_w / 2;
    }
    player_speed = 5;
  }
}

function mousePressed() {
  // Check if the click is within the canvas
  if (mouseX >= 0 && mouseX < screen_w && mouseY >= 0 && mouseY < screen_h) {
    // Calculate the tile column and row
    let col = Math.floor((mouseX + camera_x) / tile_size);
    let row = Math.floor(mouseY / tile_size);

    // Ensure the indices are within the tilemap bounds
    if (
      col >= 0 &&
      col < tilemap[0].length &&
      row >= 0 &&
      row < tilemap.length
    ) {
      // Get the clicked tile
      let clickedTile = tilemap[row][col];
      console.log(`Clicked Tile: Row=${row}, Col=${col}, ID=${clickedTile}`);

      // Place and delete blocks
      if (mouseButton === RIGHT) {
        if (row != 9) {
          tilemap[row][col + 1] = 0;
          update_tilemap = true;
        }
      } else {
        if (tilemap[row][col + 1] === 0) {
          tilemap[row][col + 1] = 3;
          update_tilemap = true;
        }
      }
    }
  }
}

function draw() {
  background(135, 206, 235);
  player();
  draw_blocks();
  camera_control();
}
