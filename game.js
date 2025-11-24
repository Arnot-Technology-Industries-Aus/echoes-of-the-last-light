// ---------------------------
// Initialize Kaboom
// ---------------------------
kaboom({
    width: 800,
    height: 600,
    scale: 1,
    clearColor: [0,0,0,1],
    debug: true,
    fullscreen: false,
});

// ---------------------------
// Load sprites & sounds
// ---------------------------
loadSprite("kael_idle", "assets/sprites/kael_idle.png");
loadSprite("kael_walk1", "assets/sprites/kael_walk1.png");
loadSprite("kael_walk2", "assets/sprites/kael_walk2.png");
loadSprite("lux", "assets/sprites/lux.png");
loadSprite("shadow", "assets/sprites/shadow.png");
loadSprite("switch", "assets/sprites/switch.png");
loadSprite("door_closed", "assets/sprites/door_closed.png");
loadSprite("door_open", "assets/sprites/door_open.png");
loadSprite("item", "assets/sprites/item.png");

loadSound("bgm", "assets/sounds/bgm.mp3");
loadSound("collect", "assets/sounds/collect.wav");
loadSound("switchSound", "assets/sounds/switch.wav");
loadSound("hit", "assets/sounds/hit.wav");
loadSound("levelup", "assets/sounds/levelup.wav");

play("bgm", { loop: true });

// ---------------------------
// Player Kael
// ---------------------------
const kael = add([
    sprite("kael_idle"),
    pos(100, 300),
    area(),
    "player",
]);

// Walk animation
let walkAnim = ["kael_walk1", "kael_walk2"];
let animIndex = 0;
let walkTimer = 0;

// Lux companion
const lux = add([
    sprite("lux"),
    pos(150, 250),
    area(),
]);

action(lux, () => {
    lux.pos = lux.pos.lerp(kael.pos.add(vec2(50, -50)), 0.05);
});

// ---------------------------
// Circular Light around Lux
// ---------------------------
const light = add([
    circle(80),
    pos(lux.pos),
    color(1,1,0,0.3),
]);

action(light, () => {
    light.pos = lux.pos;
});

// ---------------------------
// Player movement
// ---------------------------
keyDown("left", () => {
    kael.move(-200,0);
    kael.sprite = walkAnim[animIndex];
});
keyDown("right", () => {
    kael.move(200,0);
    kael.sprite = walkAnim[animIndex];
});
keyDown("up", () => {
    kael.move(0,-200);
    kael.sprite = walkAnim[animIndex];
});
keyDown("down", () => {
    kael.move(0,200);
    kael.sprite = walkAnim[animIndex];
});

// Animate walk every 0.2s
action(() => {
    walkTimer += dt();
    if (walkTimer > 0.2) {
        animIndex = (animIndex + 1) % walkAnim.length;
        walkTimer = 0;
    }
});

// ---------------------------
// Puzzles: Switch & Door
// ---------------------------
const door = add([
    sprite("door_closed"),
    pos(600, 200),
    area(),
    "door",
]);

const switchBtn = add([
    sprite("switch"),
    pos(300, 300),
    area(),
    "switch",
]);

let doorOpen = false;

collides(kael, switchBtn, () => {
    doorOpen = !doorOpen;
    play("switchSound");
    door.use(sprite(doorOpen ? "door_open" : "door_closed"));
});

// ---------------------------
// Collectible item
// ---------------------------
const item = add([
    sprite("item"),
    pos(500, 400),
    area(),
    "item",
]);

collides(kael, item, () => {
    destroy(item);
    play("collect");
});

// ---------------------------
// Shadow enemy
// ---------------------------
const shadow = add([
    sprite("shadow"),
    pos(400, 100),
    area(),
    "enemy",
]);

let dir = 1;
action(shadow, () => {
    shadow.move(100*dir,0);
    if(shadow.pos.x>700) dir=-1;
    if(shadow.pos.x<100) dir=1;
});

// Enemy collision resets player
collides(kael, shadow, () => {
    kael.pos = vec2(100,300);
    play("hit");
});

// ---------------------------
// Door win condition
// ---------------------------
collides(kael, door, () => {
    if(doorOpen){
        add([
            text("Level Complete!", 32),
            pos(200,250),
            color(1,1,1)
        ]);
        play("levelup");
    }
});

// ---------------------------
// Particle effects for light interactions
// ---------------------------
action(() => {
    if(Math.random() < dt()*10){
        add([
            rect(2,2),
            pos(lux.pos.add(vec2(rand(-50,50),rand(-50,50)))),
            color(1,1,0,0.5),
            lifespan(0.5)
        ]);
    }
});

// ---------------------------
// UI
// ---------------------------
add([
    text("Collect the item and open the door!", 24),
    pos(10,10),
    color(1,1,1),
    fixed()
]);
