//screen
let screen_w = 750;
let screen_h = 500;

//images
let grass_image;
let dirt_image;
let player_normal_image;
let player_right_image;

//tilemap
let tilemap = [];
let tile_size = 50;
let draw_tilemap = true;

//camera
let camera_x = 0;
let move_camera = true;

//player
let player_x = (screen_w/2)-25;
let player_y = 350;
let player_w = 50;
let player_h = 100;
let player_speed = 5;
let player_image = null;

let is_on_ground = true;
let jump_velocity = 20;
let jumped = false;
let gravity = 7;

function preload(){
	grass_image = loadImage('Assets/Grass.png');
	dirt_image = loadImage('Assets/Dirt.png');
	player_normal_image = loadImage('Assets/Steve.png');
    player_right_image = loadImage('Assets/Steve_right.png')
	loadStrings('Assets/tilemap.txt', parseTilemap);
}

function setup(){
	createCanvas(screen_w,screen_h);
}

function parseTilemap(data) {
	for (let i = 0; i < data.length; i++) {
	  tilemap[i] = data[i].split(',').map(Number);
	}
}  

function player(){
	//animations
	if (keyIsDown(68)){
		image(player_right_image,player_x,player_y,player_w,player_h);
	} else if (keyIsDown(65)){
		push();
		translate(player_x + player_w, player_y)
		scale(-1,1);
		image(player_right_image,0,0,player_w,player_h);
		pop();
	} else {
		image(player_normal_image,player_x,player_y,player_w,player_h);
	}

	//world end collision
	if (player_x <= 0){
		player_x = 0;
	} else if (player_x + player_w >= screen_w){
		player_x = screen_w - player_w;
	}

	//jump
	if (keyIsDown(32) && is_on_ground === true){
		jumped = true;
	}

	if (jumped === true){
		is_on_ground = false;
		jump_velocity -= 1;
		player_y -= jump_velocity;
	}

	if (is_on_ground === true){
		jump_velocity = 20;
		jumped = false;
	}
}

class Block{
	constructor(x,y,w,h,id){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.id = id;
	}

	draw(img){
		image(img,this.x,this.y,this.w,this.h);
	}

	camera(blocks){
		if (keyIsDown(65) && player_x === (screen_w/2)){
			if (camera_x >= 0){
				this.x += player_speed;
				camera_x -= player_speed / blocks.length;
			}
		}

		if (keyIsDown(68) && player_x === (screen_w/2)){
			if (camera_x <= (tilemap[0].length - 23) * 50){
				this.x -= player_speed;
				camera_x += player_speed / blocks.length;
			}
		}
	}

	collision(){
	}
		
	// if (player_x <= this.x + this.w && player_x >= this.x){
	// 	if (player_y + player_h >= this.y && player_y + player_h <= this.y + this.h){
	// 		move_camera = false;
	// 		console.log(2);
	// 	}
	// }
	
	// if (player_x + player_w >= this.x && player_x <= this.x + this.w){
	// 	if (player_y <= this.y + this.h && player_y  >= this.y){
	// 		move_camera = false;
	// 		console.log(3);
	// 	}
	// }
	
	// if (player_x <= this.x + this.w && player_x >= this.x){
	// 	if (player_y <= this.y + this.h && player_y  >= this.y){
	// 		move_camera = false;
	// 		console.log(4);
	// 	}
	// }
}

let blocks = [];
let collided = false;

function draw_blocks(){
	if (draw_tilemap === true){
		for (let row = 0; row < tilemap.length; row++){
			for (let col = 0; col < tilemap[row].length; col++){
				tile = tilemap[row][col];
				if (tile === 1){
					blocks.push(new Block((col*tile_size)-50,row*tile_size,tile_size,tile_size,1));
					if (row+1 < tilemap.length){
						if (tilemap[row+1][col] != 2){
							tilemap[row+1][col] = 2;
						}
					}
				}
				if (tile === 2){
					blocks.push(new Block((col*tile_size)-50,row*tile_size,tile_size,tile_size,2))
					if (row+1 < tilemap.length){
						if (tilemap[row+1][col] != 2){
							tilemap[row+1][col] = 2;
						}
					}
				}
			}
		draw_tilemap = false;
		}
	}

	for (let i = 0; i < blocks.length; i++){
		blocks[i].collision();
		if (move_camera === true){
			blocks[i].camera(blocks);
		}
		console.log(move_camera);

		if (blocks[i].id == 1){
			blocks[i].draw(grass_image);
		} else if (blocks[i].id == 2) {
			blocks[i].draw(dirt_image);
		}
	}
}

function camera_control(){
	if (camera_x <= 0){
		camera_x = 0;
		if (keyIsDown(65) && player_x >= 0){
			player_x -= player_speed;
		}
		if (keyIsDown(68) && player_x <= screen_w - player_w){
			player_x += player_speed;
		}
		if (player_x >= (screen_w/2)){
			player_x = (screen_w/2);
		}
	}

	if (camera_x >= (tilemap[0].length - 23) * 50){
		if (keyIsDown(65)){
			player_x -= player_speed;
		}
		if (keyIsDown(68)){
			player_x += player_speed;
		}
	}
}

function draw(){
	background(135,206,235);
	camera_control();
	player();
	draw_blocks();
}