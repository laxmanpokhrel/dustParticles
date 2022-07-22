var canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init();
});

var mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener("mousemove", function (event) {
  //managing the mouse movement.
  mouse.x = event.x;
  mouse.y = event.y;
});

var minx1 = 10;
var miny1 = 10;
var minx2 = 10;
var miny2 = 10;
var maxx1 = 10;
var maxy1 = 10;
var maxx2 = 150;
var maxy2 = 150;

var x1 = Math.random() + 1 * 10;
var y1 = Math.random() + 1 * 10;
var x2 = x1 + Math.floor((Math.random() + 1) * 100);
var y2 = y1 + Math.floor((Math.random() + 1) * 100);

c.fillStyle = "blue";
c.fillRect(minx1, miny1, minx2, miny2);
c.fillStyle = "gray";
c.fillRect(x1, y1, x2, y2);

for (var i = 0; i <= 1000; i++) {
  x1 += 1;
  x2 += 1;
  c.clearRect(0, 0, window.innerWidth, window.innerHeight)
  c.fillRect(x1, 50, x2, 100);
}

var colorArray = ["#BF0B3B", "#D50DD9", "#1835D9", "#238C2A", "#F2B90C"];

var maxwidth = 80;
var maxheight = 80;
var minheight;
var minwidth;
function Rectangle(x, y, width, height, dx, dy) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.dx = dx;
  this.dy = dy;
  this.minheight = height;
  this.minwidth = width;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.fillRect(this.x, this.y, this.width, this.height);
    c.fillStyle = this.color;
  };

  this.update = function () {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x + this.width > innerWidth || this.x - this.width < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.height > innerHeight || this.y - this.height < 0) {
      this.dy = -this.dy;
    }

    //interaction
    if (
      mouse.x - this.x < 60 &&
      mouse.x - this.x > -60 &&
      mouse.y - this.y < 60 &&
      mouse.y - this.y > -60
    ) {
      if (this.width < maxwidth && this.height < maxheight) {
        this.width += 1;
        this.height += 1;
      }
    } else if (this.width > this.minwidth && this.height > this.minheight) {
      this.width -= 1;
      this.height -= 1;
    }
  };
}
var rectangleArray = [];

function init() {
  rectangleArray = [];
  for (var i = 0; i <= 1000; i++) {
    var x = Math.random() * (window.innerWidth - width * 2) + width;
    var dx = (Math.random() - 0.5) * 8;
    var y = Math.random() * (window.innerHeight - height * 2) + height;
    var dy = (Math.random() - 0.5) * 8;
    var width = Math.random() * 8 + 1;
    var height = Math.random() * 8 + 1;
    rectangleArray.push(new Rectangle(x, y, width, height, dx, dy));
  }
}

function animate() {
  //anyName
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight); //clear the page....
  // c.font = "80px Geaogia Italic";
  // c.fillStyle = "blue";
  // c.fillText("Simulation and modeling\n by Laxman", mouse.x, mouse.y);

  for (var i = 0; i < rectangleArray.length; i++) {
    rectangleArray[i].draw();
    rectangleArray[i].update();
  }
}
init();
animate();





// var i1 = document.querySelectorAll('.indicator1');
// var i2 = document.querySelectorAll('.indicator2');
// i1.addEventListener('onmouseover', () => {
//   document.body.style.width = "100%";
// });


// i2.addEventListener('onmouseover',() => {
//   document.body.style.width = 100 %;
// });