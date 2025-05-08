// File: zombie_vs_robots.ino

// Joystick pins
const int JOY_X = A0;
const int JOY_Y = A1;
const int JOY_BTN = 2;

// LED output pins
const int PLAYER_LED = 9;
const int ENEMY_LED = 10;
const int GAMEON_LED = 11;

bool readyToDeploy = true;

void setup() {
  pinMode(JOY_BTN, INPUT_PULLUP);
  pinMode(PLAYER_LED, OUTPUT);
  pinMode(ENEMY_LED, OUTPUT);
  pinMode(GAMEON_LED, OUTPUT);

  digitalWrite(GAMEON_LED, LOW); // Game off by default

  Serial.begin(9600);
  while (!Serial); // Optional: only needed for Leonardo/Micro
  Serial.println("🟢 Arduino Ready");
}

void loop() {
  int y = analogRead(JOY_Y);
  bool buttonPressed = digitalRead(JOY_BTN) == LOW;

  Serial.print("Y: ");
  Serial.print(y);
  Serial.print(" | BTN: ");
  Serial.print(buttonPressed);
  Serial.print(" | Ready: ");
  Serial.println(readyToDeploy);

  if (buttonPressed && readyToDeploy) {
    Serial.println("DEPLOY");
    flashLED(ENEMY_LED); // 🔵 Flash on deploy
  }


  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();

    if (cmd == "PLAYER_HIT") {
      flashLED(PLAYER_LED);
    } else if (cmd == "ENEMY_HIT") {
      flashLED(ENEMY_LED);
    } else if (cmd == "GAME_ON") {
      digitalWrite(GAMEON_LED, HIGH);
    } else if (cmd == "GAME_OFF") {
      digitalWrite(GAMEON_LED, LOW);
    }
  }

  delay(100);
}

void flashLED(int pin) {
  digitalWrite(pin, HIGH);
  delay(200);
  digitalWrite(pin, LOW);
}
