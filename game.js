// Initialize Kaboom
kaboom({
    width: 800,
    height: 600,
    scale: 2,
    clearColor: [0, 0, 0, 1], // black background
    debug: true,
});

// Player (Kael) as a blue rectangle
const kael = add([
    rect(32, 48),
    pos(100, 300),
    color(0, 0, 1),      // blue
    area(),
    body(),
]);

// Companion (Lux) as a yellow rectangle
const lux = add([
    rect(24, 24),
    pos(150, 250),
    color(1, 1, 0),      // yellow
    area()
]);

// Lux follows Kael smoothly
action(lux, () => {
    lux.pos = lux.pos.lerp(kael.pos.add(vec2(50, -50)), 0.05);
});

// Player movement
keyDown("left", () => kael.move(-120, 0));
keyDown("right", () => kael.move(120, 0));
keyDown("up", () => kael.move(0, -120));
keyDown("down", () => kael.move(0, 120));

// Light radius around Lux using a semi-transparent circle
const light = add([
    circle(80),                // radius
    pos(lux.pos),
    color(1, 1, 0, 0.3),       // semi-transparent yellow
    area(),
]);

// Make the light follow Lux
action(light, () => {
    light.pos = lux.pos;
});
