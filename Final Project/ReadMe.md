Zombie vs. Robots Game Documentation
Zombie vs. Robots Game Project Documentation
Project Overview
Zombie vs. Robots is an interactive arcade-style game built using p5.js and Arduino. The player
controls a team of deployable robots to stop waves of incoming zombies before they reach the base.
The game integrates joystick hardware input via Arduino, creating a unique hybrid of software and
physical controls.
Technologies Used
- p5.js (JavaScript framework for creative coding)
- Arduino Uno with joystick and LEDs
- Serial Communication via Web Serial API
- Sound Effects & Music
- Custom animations using sprite sheets
Game Mechanics
- Zombies spawn on the left and move to the right.
- Robots are deployed on the right and walk leftward, destroying zombies on contact.
- Explosions occur when robots hit zombies.
- Lives decrease if zombies reach the end.
- Score increases for each successful zombie elimination.
Hardware Setup
Components:
- Arduino Uno
- Joystick module
- 3 LEDs (Player, Enemy, Game State)
- Breadboard & jumper wires
Controls:
- Joystick Button Press Deploy robot
Page 1
Zombie vs. Robots Game Documentation
- LED Feedback:
- Red: Player hit
- Blue: Enemy hit
- Green: Game is running
Serial Communication
Communication occurs between Arduino and browser using Web Serial API:
- GAME_ON, GAME_OFF, PLAYER_HIT, ENEMY_HIT commands
- Joystick input triggers 'DEPLOY' from Arduino to browser
Code Structure
- sketch.js Main game logic, visuals, sound, and serial interaction
- zombie_vs_robots.ino Arduino joystick/LED controller logic
- assets/ Sprite sheets and sound files
Future Improvements
- Add multiple robot types with unique abilities
- Introduce zombie variants (fast, armored)
- Health bars, wave system, and power-ups
- Multiplayer mode with 2-player joystick input
- Persistent high-score tracking
Page 2
