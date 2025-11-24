// Initialize Kaboom
kaboom({
    width: 640,
    height: 480,
    scale: 1,
    clearColor: [0, 0, 0, 1], // black background
    debug: true,
});

// Create Kael (player) as blue rectangle
const kael = add([
    rect(32, 48),
    pos(100, 200),
    color(0, 0, 1), // blue
    area(),
]);

// Create Lux (companion) as yellow rectangle
const lux = add([
    rect(24, 24),
    pos(150, 150),
    color(1, 1, 0), // yellow
    area(),
]);

// Make Lux follow Kael smoothly
action(lux, () => {
    lux.pos = lux.pos.lerp(kael.pos.add(vec2(50, -50)), 0.05);
});

// Player movement with arrow keys
keyDown("left", () => kael.move(-120, 0));
keyDown("right", () => kael.move(120, 0));
keyDown("up", () => kael.move(0, -120));
keyDown("down", () => kael.move(0, 120));

// Light effect: yellow semi-transparent circle following Lux
const light = add([
    circle(80),
    pos(lux.pos),
    color(1, 1, 0, 0.3),
]);

action(light, () => {
    light.pos = lux.pos;
});
