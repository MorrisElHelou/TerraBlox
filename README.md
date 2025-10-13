# TerraBlox

TerraBlox is a **2D Minecraft-inspired game** built with **p5.js**. I created this project for a school assignment over the course of **two weeks**. It demonstrates my ability to work with graphics, animations, player controls, camera systems, and interactive tile-based environments.

---

## Features

- **Tile-based world**: The map is loaded dynamically from a text file.
- **Player animations**: The player has directional sprites for moving left, right, and standing still.
- **Camera system**: 
  - Smoothly follows the player horizontally.
  - Stops at the edges of the map to prevent showing empty space.
- **Jumping mechanics**: Player can jump with gravity and collision detection.
- **Block placement and breaking**: Click to place or remove blocks with precise math-based calculations.
- **Interactive gameplay**: Player can move, jump, and modify the world interactively.

---

## Controls

- **A / D** → Move left / right  
- **Space** → Jump  
- **Left Click** → Place a block  
- **Right Click** → Remove a block  

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/terrablox.git```
2. Make sure the Assets folder with images (```Grass.png```, ```Dirt.png```, ```Wood.png```, ```Steve.png```, ```Steve_right.png```) and ```tilemap.txt``` are in the root directory.
3. Open ```index.html``` (or ```sketch.js``` in a p5.js environment) in your browser.

---

## Known Bugs
* When the player jumps and hits the bottom of a block, the game glitches and snaps the player above the block.
* Jumping against walls sometimes causes collision issues.
* Most glitches occur during jumping; a full rewrite of the jumping system may be necessary to fix them.

---

## What I Learned
* This project demonstrates several skills I developed in class:
* Reading and parsing text files to generate a map.
* Loading and animating images for a player character.
* Implementing a camera system with precise horizontal collisions and edge constraints.
* Designing a player jumping system with gravity and collision detection.
* Handling interactive block placement and removal using lists and custom math calculations.

---

## Future Improvements
* Rewrite the jumping system to prevent glitches.
* Add more block types and interactive items.
* Implement smoother animations and physics for better gameplay.

---

## License
This project is for educational purposes and is not licensed for commercial use.
