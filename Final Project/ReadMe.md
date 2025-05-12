******Zombie vs. Robots Game Documentation******

🎮 **Project Overview**

Zombie vs. Robots is a fast-paced, arcade-style game that blends physical joystick input with on-screen action. Developed using p5.js and integrated with an Arduino Uno, players deploy robots to fend off waves of zombies before they reach the base. The project showcases a unique hybrid of software-based game development and hardware interaction, providing a highly immersive gameplay experience.

🧰 **Technologies Used**

p5.js – JavaScript library for creative coding and rendering animations
Arduino Uno – Microcontroller for joystick and LED inputs/outputs
Web Serial API – Enables communication between Arduino and browser
Sprite Sheets – Custom animations for zombies, robots, and explosions
Sound Effects & Background Music – Enhances player immersion

🕹️ **Game Mechanics**

Zombies spawn from the left and move towards the right edge of the screen.
Robots are deployed from the right and move leftward, destroying zombies on contact.
Explosions are triggered upon collisions, providing visual feedback.
Lives are lost if a zombie reaches the right edge.
Score increases with each zombie eliminated.

🛠 **Hardware Setup**

Components:
Arduino Uno
Joystick module with built-in button
3 LEDs (Red, Blue, Green)
Breadboard & jumper wires
Physical Controls:
Joystick Button Press – Deploys a robot
LED Indicators:
🔴 Red LED: Player hit
🔵 Blue LED: Zombie eliminated
🟢 Green LED: Game active

**Serial Communication**

The game uses the Web Serial API for real-time interaction between the Arduino and the browser.

Commands:
GAME_ON / GAME_OFF – Controls game start and end states
PLAYER_HIT – Triggers red LED and deducts a life
ENEMY_HIT – Triggers blue LED and adds score
DEPLOY – Sent from Arduino to browser when joystick button is pressed

🧾 **Code Structure**

sketch.js – Core game logic including rendering, sound, collision detection, and serial communication
zombie_vs_robots.ino – Arduino script for reading joystick input and controlling LEDs
assets/ – Folder containing sprite sheets and sound files
🚀 Future Improvements

Add multiple robot types with distinct abilities (e.g., ranged attack, AoE explosion)
Introduce zombie variants such as fast movers and armored tanks
Include health bars, a wave system, and random power-ups
Enable 2-player multiplayer using dual joystick inputs
Add persistent high-score tracking with local storage or database integration
