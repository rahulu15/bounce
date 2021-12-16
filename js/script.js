console.log("loaded js")
//interactive bouncing balls
window.onload = function () {
  // getting canvas from html and setting context
  let canvas = document.querySelector(".ball-canvas");
  let context = canvas.getContext("2d");

  const totalBalls = 100;
  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  function updateCanvasSize() {
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
  }
  //initial size
  updateCanvasSize();

  //change size on resize
  window.addEventListener("resize", function () {
    //change parameters based on innerWidth/height
    canvasSize.width = window.innerWidth;
    canvasSize.height = window.innerHeight;
    //change canvas size
    updateCanvasSize();
  });

  //ball class
  class Ball{
    constructor(radius) {
      this.x = Math.random() * canvasSize.width;
      this.y = Math.random() * canvasSize.height;
      this.radius = radius;
      
      //random col
      this.color = `rgb(${Math.random() * 300},${Math.random() * 300},${
        Math.random() * 250})`;

      let tempRandomCol = Math.random() * 256;
      // this.color = `rgb(${tempRandomCol},${tempRandomCol},${tempRandomCol})`;
      // this.color = `rgb(0,${tempRandomCol},${tempRandomCol})`;

      this.changeX = Math.random() * 6 - 3;
      this.changeY = Math.random() * 6 - 3;
    }
    updatePosition(){
      this.x += this.changeX;
      this.y += this.changeY;
  
      if (this.y - this.radius < 0) {
        //  top edge
        this.y = this.radius;
        this.changeY *= -1;
      } else if (this.y + this.radius > canvasSize.height) {
        //bottom edge
        this.y = canvasSize.height - this.radius;
        this.changeY *= -1;
      }
  
      if (this.x - this.radius < 0) {
        //left edge
        this.x = this.radius;
        this.changeX *= -1;
      } else if (this.x + this.radius > canvasSize.width) {
        // right edge
        this.x = canvasSize.width - this.radius;
        this.changeX *= -1;
      }
    }
  }

  //store ball objects  in this array
  let balls = [];
  //initial mouse coordinates to change radius
  let mouseX = -50;
  let mouseY = -50;
 
  for (let i = 0; i < totalBalls; i++) {
    balls.push(new Ball(5));
  }

  //event listeners on canvas
  canvas.addEventListener("mousemove", function (event) {
    let boundings = canvas.getBoundingClientRect();
    mouseX = event.clientX - boundings.left;
    mouseY = event.clientY - boundings.top;
  });
  canvas.addEventListener("mouseout", function (event) {
    mouseX = -50;
    mouseY = -50;
  });
  function checkVicinity(ball, mouseX, mouseY) {
    if (
      ball.x >= mouseX - 50 &&
      ball.x <= mouseX + 50 &&
      ball.y >= mouseY - 50 &&
      ball.y <= mouseY + 50
    ) ball.radius = ball.radius<20? ball.radius+5 : 20
    else ball.radius = ball.radius>5? ball.radius-1 : 5
  }


  //start animation
  window.requestAnimationFrame(animationLoop);
  function animationLoop() {
    // Clear Canvas
    context.clearRect(0, 0, canvasSize.width, canvasSize.height);
    context.fillStyle = "black";
    context.fillRect(0, 0,canvasSize.width, canvasSize.height);


    //draw the balls on the canvas and update the position each frame
    for (let i = 0; i < balls.length; i++) {
      balls[i].updatePosition();
      context.beginPath();
      context.fillStyle = balls[i].color;

      context.shadowBlur = 10;
      context.shadowColor = balls[i].color;
      //check if the balls are near the mouse
      checkVicinity(balls[i], mouseX, mouseY);
      context.arc(balls[i].x, balls[i].y, balls[i].radius, 0, 2 * Math.PI);
      context.fill();
    }
    // Animate
    window.requestAnimationFrame(animationLoop);
  }
};
