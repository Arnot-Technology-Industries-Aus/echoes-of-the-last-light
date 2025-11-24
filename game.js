// Initialize Kaboom
kaboom({
    width: 800,
    height: 600,
    scale: 2,
    clearColor: [0, 0, 0, 1], // black background (darkness)
    debug: true,
});

// Load assets (placeholder colors for now)
loadSprite("kael", "https://i.imgur.com/qxH1fLk.png"); // example placeholder
loadSprite("lux", "https://i.imgur.com/3V3RQJx.png");  // example placeholder

// Add player (Kael)
const kael = add([
    sprite("kael"),
    pos(100, 300),
    area(),
    body(),
]);

// Add companion (Lux)
const lux = add([
    sprite("lux"),
    pos(150, 250),
    area(),
    { offset: vec2(0, 0) }
]);

// Lux follows Kael
action(lux, () => {
    const speed = 3;
    lux.pos = lux.pos.lerp(kael.pos.add(vec2(50, -50)), 0.05);
});

// Player movement
keyDown("left", () => {
    kael.move(-120, 0);
});
keyDown("right", () => {
    kael.move(120, 0);
});
keyDown("up", () => {
    kael.move(0, -120);
});
keyDown("down", () => {
    kael.move(0, 120);
});

// Add light radius (basic)
const light = add([
    pos(lux.pos),
    circle(80),              // radius of light
    color(1, 1, 0, 0.3),     // yellowish light, semi-transparent
    follow(lux)              // follow the Lux orb
]);

// Helper function: make 'follow' component
function follow(target) {
    return {
        update() {
            this.pos = target.pos;
        }
    }
}
