// By Simon Sarris
// www.simonsarris.com
// sarris@acm.org
//
// Last update December 2011
//
// Free to use and distribute at will
// So long as you are nice to people, etc

// Constructor for Shape objects to hold data for all drawn objects.
// For now they will just be defined as rectangles.
function Shape(x, y, str, fill, style,text_size, font_family) {
    
  // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
  // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
  // But we aren't checking anything else! We could put "Lalala" for the value of x 
  this.str = str || "";
  this.fill = fill || '#AAAAAA';
  this.style = style || 'straight';
  this.text_size = text_size || 12;
  this.font_family = font_family || "Arial";
  this.x = x || 0;
  this.y = y || 0;
  this.w = str.length*7;
  this.h = text_size *1.5;
    this.valid = true;
    this.border = false;
  
  switch (this.style) {
        case "rectangle":
          this.w = 200;
          this.h = 230;
          break;
          
        case "straight":
            this.w = str.length*5;
            this.h = text_size *1.5;
            break;
            
        case "arc":
            this.w = str.length*7; 
            this.h = text_size * (str.length/3.5);//4.2;//
            break;
        case "circle":
            this.w = str.length*5.8;
            this.h = text_size * (str.length/2);//* 7.65;//h * 5.1;
            break;
        case "mirror":
            this.w = str.length*5;
            this.h = text_size *1.5;
            break;
        case "stroke":
            this.w = str.length*5;
            this.h = text_size *1.5;
            break;
        case "shadow":
            this.w = str.length*5;
            this.h = text_size *1.5;
            break;
        case "upsidedown":
            this.w = str.length*5;
            this.h = text_size *1.5;
            break;
        case "vertical1":
            this.w = text_size *1.5;
            this.h = str.length*5;
            break;
        case "vertical2":
            this.w = text_size *1.5;
            this.h = str.length*5;
            break;
  }
  
}

// Draws this shape to a given context
Shape.prototype.draw = function(context) {
  context.fillStyle = this.fill;
  context.font = " "+ this.text_size+ "px " + this.font_family;//+ text_font_family;
  
    switch (this.style) {
        case "rectangle":
            if (this.valid==true) {
            context.fillStyle = "black";
            context.strokeRect(this.x, this.y, this.w, this.h);
                }
            break;
        case "straight":
            
            context.fillText(this.str, this.x, this.y+this.text_size);
            break;
            
        case "arc":
            // FIX BUG DRAGGABLE AREA
            posX = this.x + (this.str.length * 3.5);
            posY = this.y + ((this.text_size/3) * this.str.length); 
            radius = this.str.length*(this.text_size/4);
            angle = Math.PI * 0.8;
            
            drawArcText(context, this.str, posX , posY, radius, angle);
            break;
            
        case "circle":
            // FIX BUG DRAGGABLE AREA
            posX = this.x + (this.str.length *2.8);
            posY = this.y + (this.str.length *2.8);
            radius = this.str.length*(this.text_size/6);
            context.fillTextCircle(this.str,posX,posY,radius);
            break;

        case "mirror":
            posX = this.x + (this.str.length * 5);
            posY = this.y + this.text_size; //(this.str.length *2);
            drawMirrorText(context, this.str, posX, posY);
            break;

        case "stroke":
            // FIX BUG DRAGGABLE AREA
            posX = this.x;
            posY = this.y + this.text_size; //(this.str.length *2);
            drawStrokeText(context, this.str, "black", posX, posY);
            break;

        case "shadow":
            // FIX BUG DRAGGABLE AREA
            posX = this.x;
            posY = this.y + this.text_size; 
            var offset = this.text_size/6.4;
            drawShadowText(context, this.str, offset, posX, posY);
            break;
        case "upsidedown":
            // FIX BUG DRAGGABLE AREA
            drawUpsidedownText(context, this.str, this.x, this.y);
            break;

        case "vertical1":
            // FIX BUG DRAGGABLE AREA
            drawVertical1Text(context,this.str, this.x, this.y);
            break;

        case "vertical2":
            // FIX BUG DRAGGABLE AREA
            posX = this.x + this.w;
            posY = this.y + this.h; 
            drawVertical2Text(context,this.str, posX, posY);
            break;
    }   

 }

// Determine if a point is inside the shape's bounds
Shape.prototype.contains = function(mx, my) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Height) and its Y and (Y + Height)
  return  (this.x <= mx) && (this.x + this.w >= mx) &&
          (this.y <= my) && (this.y + this.h >= my);
}


function CanvasState(canvas,context) {
  // **** First some setup! ****
  
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.context = context;//canvas.getContext('2d');
  // This complicates things a little but but fixes mouse co-ordinate problems
  // when there's a border or padding. See getMouse for more detail
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }
  // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
  // They will mess up mouse coordinates and this fixes that
  var html = document.body.parentNode;
  this.htmlTop = html.offsetTop;
  this.htmlLeft = html.offsetLeft;

  // **** Keep track of state! ****
  
  this.valid = false; // when set to false, the canvas will redraw everything
  this.shapes = [];  // the collection of things to be drawn
  this.dragging = false; // Keep track of when we are dragging
  // the current selected object. In the future we could turn this into an array for multiple selection
  this.selection = null;
  this.dragoffx = 0; // See mousedown and mousemove events for explanation
  this.dragoffy = 0;
  
  // **** Then events! ****
  
  // This is an example of a closure!
  // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
  // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
  // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
  // This is our reference!
  var myState = this;
  
  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
  // Up, down, and move are for dragging
  canvas.addEventListener('mousedown', function(e) {
    var mouse = myState.getMouse(e);
    var mx = mouse.x;
    var my = mouse.y;
    var shapes = myState.shapes;
    var l = shapes.length;
    for (var i = l-1; i >= 0; i--) {
      if (shapes[i].contains(mx, my)) {
        var mySel = shapes[i];
        // Keep track of where in the object we clicked
        // so we can move it smoothly (see mousemove)
        myState.dragoffx = mx - mySel.x;
        myState.dragoffy = my - mySel.y;
        myState.dragging = true;
        myState.selection = mySel;
        myState.valid = false;
        return;
      }
    }
    // havent returned means we have failed to select anything.
    // If there was an object selected, we deselect it
    if (myState.selection) {
      myState.selection = null;
      myState.valid = false; // Need to clear the old selection border
    }
  }, true);
  canvas.addEventListener('mousemove', function(e) {
                          
    if (myState.dragging){
      var mouse = myState.getMouse(e);
      // We don't want to drag the object by its top-left corner, we want to drag it
      // from where we clicked. Thats why we saved the offset and use it here
      myState.selection.x = mouse.x - myState.dragoffx;
      myState.selection.y = mouse.y - myState.dragoffy;   
      myState.valid = false; // Something's dragging so we must redraw
    }
  }, true);
  canvas.addEventListener('mouseup', function(e) {
    myState.dragging = false;
                          myState.clear();
                          var shapes = myState.shapes;
                          var border;
                          var l = shapes.length;
                          
                          for (var i = 0; i < l ; i++) {
                              var mySel = shapes[i];
                                  if(mySel.border==true) {
                                    border = mySel;
                                    break;
                                  }
                          }
                          
                          border.draw(context);
                          for (var i = 0; i < l ; i++) {
                              var mySel = shapes[i];
                              if(mySel.border==false) {
                                mySel.draw(context);
                              }
                          } 
                          
    
    
  }, true);
  // double click for making new shapes
  canvas.addEventListener('dblclick', function(e) {
    var mouse = myState.getMouse(e);
    myState.addShape(new Shape(mouse.x - 10, mouse.y - 10, 20, 20, 'rgba(0,255,0,.6)'));
        
  }, true);
  
  // **** Options! ****#CC0000
  
  this.selectionColor = 'blue';
  this.selectionWidth = 2;  
  this.interval = 30;
  setInterval(function() { myState.draw(); }, myState.interval);
}

CanvasState.prototype.addShape = function(shape) {
  if (shape !== undefined) {  
      this.shapes.push(shape);
      this.valid = false;
  }
}

CanvasState.prototype.clear = function() {
  this.context.clearRect(0, 0, this.width, this.height);
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
CanvasState.prototype.draw = function() {
  // if our state is invalid, redraw and validate!
  if (!this.valid) {
    var context = this.context;
    var shapes = this.shapes;
    this.clear();
    
    // ** Add stuff you want drawn in the background all the time here **
    
    // draw all shapes
    var l = shapes.length;
    for (var i = 0; i < l; i++) {
      var shape = shapes[i];
        if (shape !== undefined) {
            // We can skip the drawing of elements that have moved off the screen:
            if (shape.x > this.width || shape.y > this.height || shape.x + shape.w < 0 || shape.y + shape.h < 0 || (shape.valid == false)) continue;
            
            shapes[i].draw(context);
        }
          
      
      
    }
    
    // draw selection
    // right now this is just a stroke along the edge of the selected Shape
    if (this.selection != null) {
      //context.strokeStyle = this.selectionColor;
      context.lineWidth = this.selectionWidth;
      var mySel = this.selection;
      //context.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
    }
    
    // ** Add stuff you want drawn on top all the time here **
    
    this.valid = true;
  }
}


// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
CanvasState.prototype.getMouse = function(e) {
  var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
  
  // Compute the total offset
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;
  
  // We return a simple javascript object (a hash) with x and y defined
  return {x: mx, y: my};
}
