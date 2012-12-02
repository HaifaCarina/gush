

/***** CIRCLE *******/
CanvasRenderingContext2D.prototype.fillTextCircle = function(text,x,y,radius){
   var numDegreesPerLetter = 2*Math.PI / text.length;
   
   this.save();
   this.translate(x,y);
   this.rotate(Math.PI / 2);

   for(var i=0;i<text.length;i++){
      this.save();
      this.translate(radius, 0);
      this.translate(10, -10);
      this.rotate(1.4)
      this.translate(-10, 10);          
      this.fillText(text[i],0,0);
      this.restore();
      this.rotate(numDegreesPerLetter);
   }
   this.restore();
}
/***** /CIRCLE *******/
//context.fillTextCircle("A whole day silence seems like forever.",150,150,75);


/***** /ARC *******/
function drawArcText(context, str, centerX, centerY, radius, angle){
    context.save();
    context.translate(centerX, centerY);
    context.rotate(-1 * angle / 2);
    context.rotate(-1 * (angle / str.length) / 2);
    
    for (var n = 0; n < str.length; n++) {
        context.rotate(angle / str.length);
        context.save();
        context.translate(0, -1 * radius);
        var c = str[n];
        context.fillText(c, 0, 0);
        context.restore();
    }
    context.restore();
}
/***** /ARC *******/
 
 
/***** /SMILE *******/
function drawSmileText(context, str, centerX, centerY, radius, angle){
    context.save();
    context.translate(centerX, centerY);
    context.rotate(1 * angle / 1.8);
    context.rotate(-1 * (angle / str.length) / 2);
    
    for (var n = 0; n < str.length; n++) {
        context.rotate(-angle / str.length);
        context.save();
        context.translate(0, 1 * radius);
        var c = str[n];
        context.fillText(c, 0, 0);
        context.restore();
    }
    context.restore();
}
/***** /SMILE *******/

 
 /***** UPDSIDE-DOWN *******/
function drawUpsidedownText(context, str, centerX, centerY){
    context.save();
    context.translate(centerX, centerY);
    context.scale(1,-1);
    context.fillText(str,0,0);
    context.restore();
}
/***** /UPDSIDE-DOWN *******/


 /***** MIRROR *******/
function drawMirrorText(context, str, centerX, centerY){
    context.save();
    context.translate(centerX, centerY);
    context.scale(-1,1);
    context.fillText(str,0,0);
    context.restore();
}
/***** /MIRROR *******/


/***** STROKE *******/
function drawStrokeText(context, str, color, centerX, centerY){
    context.save();
    context.translate(centerX, centerY);
    context.strokeStyle = color;
    context.strokeText(str,0,0);
    context.restore();
}
/***** /STROKE *******/


/***** SHADOW *******/
function drawShadowText(context, str, offset,  centerX, centerY){
    context.save();
    context.translate(centerX, centerY);
    context.shadowOffsetX = offset;
    context.shadowOffsetY = offset;
    context.shadowBlur = offset;
    context.shadowColor = "gray";
    context.fillText(str, 0, 0);
    context.restore();
}
/***** /SHADOW *******/



/***** VERTICAL1 *******/
function drawVertical1Text(context, str, centerX, centerY){
    context.save();
    context.translate(centerX, centerY);  
    context.rotate(Math.PI/2);  
    context.fillText(str, 0, 0);
    context.restore();
    context.restore(); 
   
}
/***** /VERTICAL1 *******/



/***** VERTICAL2 *******/
function drawVertical2Text(context, str, centerX, centerY){
    context.save();
    context.translate(centerX, centerY);  
    context.rotate(Math.PI/-2);  
    context.fillText(str, 0, 0);
    context.restore(); 
    context.restore(); 
}
/***** /VERTICAL2 *******/

function drawStraight(context, str, centerX, centerY){
    context.save();
    context.translate(centerX, centerY);  
    context.fillText(str, 0, 0);
    context.restore(); 
    context.restore(); 
}
/***** /VERTICAL2 *******/