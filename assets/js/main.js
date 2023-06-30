// Create PIXI application
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  transparent: true,
});

// Set up the renderer
app.renderer.view.style.position = "fixed";
app.renderer.view.style.top = "0";
app.renderer.view.style.left = "0";
app.renderer.view.style.pointerEvents = "none";
document.body.appendChild(app.view);

// Configure trail settings
const historySize = 20;
const ropeSize = 100;
const trailTexture = PIXI.Texture.from("https://i.imgur.com/JvN5CLh.png");
const historyX = [];
const historyY = [];
const points = [];

// Create history array
for (let i = 0; i < historySize; i++) {
  historyX.push(0);
  historyY.push(0);
}

// Create rope points
for (let i = 0; i < ropeSize; i++) {
  points.push(new PIXI.Point(0, 0));
}

// Create the rope
const rope = new PIXI.SimpleRope(trailTexture, points);
rope.blendmode = PIXI.BLEND_MODES.ADD;
app.stage.addChild(rope);

// Update mouse position
const mousePosition = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
});

// Update the trail animation
app.ticker.add(() => {
  // Update the mouse values to history
  historyX.pop();
  historyX.unshift(mousePosition.x);
  historyY.pop();
  historyY.unshift(mousePosition.y);

  // Update the points to correspond with history
  for (let i = 0; i < ropeSize; i++) {
    const p = points[i];

    const ix = cubicInterpolation(historyX, (i / ropeSize) * historySize);
    const iy = cubicInterpolation(historyY, (i / ropeSize) * historySize);

    p.x = ix;
    p.y = iy;
  }
});

// Cubic interpolation function
function clipInput(k, arr) {
  if (k < 0) k = 0;
  if (k > arr.length - 1) k = arr.length - 1;
  return arr[k];
}

function getTangent(k, factor, array) {
  return (factor * (clipInput(k + 1, array) - clipInput(k - 1, array))) / 2;
}

function cubicInterpolation(array, t, tangentFactor) {
  if (tangentFactor == null) tangentFactor = 1;

  const k = Math.floor(t);
  const m = [
    getTangent(k, tangentFactor, array),
    getTangent(k + 1, tangentFactor, array),
  ];
  const p = [clipInput(k, array), clipInput(k + 1, array)];
  t -= k;
  const t2 = t * t;
  const t3 = t * t2;
  return (
    (2 * t3 - 3 * t2 + 1) * p[0] +
    (t3 - 2 * t2 + t) * m[0] +
    (-2 * t3 + 3 * t2) * p[1] +
    (t3 - t2) * m[1]
  );    // Create a Pixi application
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x333333
  });

  // Add the Pixi canvas to the HTML document
  document.body.appendChild(app.view);

  // Load the picture texture
  app.loader.add('picture', 'assets/images/image-1.jpg').load(() => {
    // Create a sprite for the picture
    const picture = new PIXI.Sprite(app.loader.resources.picture.texture);
    picture.anchor.set(0.5);
    picture.position.set(app.view.width / 2, app.view.height / 2);

    // Add the picture to the stage
    app.stage.addChild(picture);

    // Function to update the rotation of the picture
    function rotatePicture() {
      picture.rotation += 0.01; // Adjust the rotation speed as desired
    }

    // Render loop
    app.ticker.add(rotatePicture);
  });
}
