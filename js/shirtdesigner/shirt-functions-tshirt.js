var $j = jQuery.noConflict();

// GLOBAL VARIABLES
var highlighted_id;
var pockets_qty = 0;
var images = {};
function removeCanvasImage(e){
    $j("#" + e).remove();
}

function highlightCanvasImage(e){
    highlighted_id = e;
    $j("#preview-panel canvas").removeClass("highlight-canvas-image");
    $j("#" + e).addClass("highlight-canvas-image");

}  

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

$j(document).ready(function(){
        window.console = $j('<iframe>').hide().appendTo('body')[0].contentWindow.console;
        
     // INITIALIZE CANVAS
        var shirt_canvas = document.getElementById('body-outline');
        var shirt_context = shirt_canvas.getContext('2d');
        $j("#body-color").val('ffffff');
        
        var sources = {
            body_outline: "../../media/shirtdesigner/images/illustration/tshirt/body/outline.png",
            body_b: "../../media/shirtdesigner/images/illustration/tshirt/body/b.png",
            body_lb1: "../../media/shirtdesigner/images/illustration/tshirt/body/lb1.png",
            body_lb2: "../../media/shirtdesigner/images/illustration/tshirt/body/lb2.png",
            body_rb1: "../../media/shirtdesigner/images/illustration/tshirt/body/rb1.png",
            body_rb2: "../../media/shirtdesigner/images/illustration/tshirt/body/rb2.png",
            neck_collar_b1: "../../media/shirtdesigner/images/illustration/tshirt/collar/b1.png",
            neck_collar_outline: "../../media/shirtdesigner/images/illustration/tshirt/collar/outline.png",
            right_collar_outline: "../../media/shirtdesigner/images/illustration/tshirt/right-collar/right-outline.png",
            right_collar_body: "../../media/shirtdesigner/images/illustration/tshirt/right-collar/right-body.png",
            right_collar_body_btm: "../../media/shirtdesigner/images/illustration/tshirt/right-collar/right-body-btm.png",
            right_collar_neck: "../../media/shirtdesigner/images/illustration/tshirt/right-collar/right-neck.png",
            right_collar_sleeve: "../../media/shirtdesigner/images/illustration/tshirt/right-collar/right-sleeve.png",
            right_collar_btm: "../../media/shirtdesigner/images/illustration/tshirt/right-collar/right-sleeve-btm.png",
            left_collar_outline: "../../media/shirtdesigner/images/illustration/tshirt/left-collar/left-outline.png",
            left_collar_body: "../../media/shirtdesigner/images/illustration/tshirt/left-collar/left-body.png",
            left_collar_body_btm: "../../media/shirtdesigner/images/illustration/tshirt/left-collar/left-body-btm.png",
            left_collar_neck: "../../media/shirtdesigner/images/illustration/tshirt/left-collar/left-neck.png",
            left_collar_sleeve: "../../media/shirtdesigner/images/illustration/tshirt/left-collar/left-sleeve.png",
            left_collar_btm: "../../media/shirtdesigner/images/illustration/tshirt/left-collar/left-sleeve-btm.png",
            neck_vneck_b1: "../../media/shirtdesigner/images/illustration/tshirt/vneck/b1.png",
            neck_vneck_outline: "../../media/shirtdesigner/images/illustration/tshirt/vneck/outline.png",
            neck_round_b1: "../../media/shirtdesigner/images/illustration/tshirt/round/b1.png",
            neck_round_outline: "../../media/shirtdesigner/images/illustration/tshirt/round/outline.png",
            right_round_outline: "../../media/shirtdesigner/images/illustration/tshirt/right-round/right-outline.png",
            right_round_body: "../../media/shirtdesigner/images/illustration/tshirt/right-round/right-body.png",
            right_round_body_btm: "../../media/shirtdesigner/images/illustration/tshirt/right-round/right-body-btm.png",
            right_round_neck: "../../media/shirtdesigner/images/illustration/tshirt/right-round/right-neck.png",
            right_round_sleeve: "../../media/shirtdesigner/images/illustration/tshirt/right-round/right-sleeve.png",
            right_round_btm: "../../media/shirtdesigner/images/illustration/tshirt/right-round/right-sleeve-btm.png",
            left_round_outline: "../../media/shirtdesigner/images/illustration/tshirt/left-round/left-outline.png",
            left_round_body: "../../media/shirtdesigner/images/illustration/tshirt/left-round/left-body.png",
            left_round_body_btm: "../../media/shirtdesigner/images/illustration/tshirt/left-round/left-body-btm.png",
            left_round_neck: "../../media/shirtdesigner/images/illustration/tshirt/left-round/left-neck.png",
            left_round_sleeve: "../../media/shirtdesigner/images/illustration/tshirt/left-round/left-sleeve.png",
            left_round_btm: "../../media/shirtdesigner/images/illustration/tshirt/left-round/left-sleeve-btm.png"

            };
                 
        for(var src in sources) {
            console.log("NOT okay:" + src);
            images[src] = new Image();
            images[src].onload = function() {
                updateCanvasKinetic(images[src], $j("#body-color").val());
            };
            images[src].src = sources[src];
            
         }
         
        var c1 = document.createElement("canvas");
        c1.id= "specific";
        c1.width=374;
        c1.height=394; 
        c1.setAttribute('style', 'display:none');
        var context1 = c1.getContext('2d');
        document.getElementById('preview-panel').appendChild(c1);  
        
        var c = document.createElement("canvas");
        c.id= "specific0";
        c.width=374;
        c.height=394; 
        c.setAttribute('style', 'display:none');
        var context = c.getContext('2d');
        document.getElementById('preview-panel').appendChild(c);
        
        var cn = document.createElement("canvas");
        cn.id= "neck-canvas";
        cn.setAttribute('style', 'display:none');
        var contextn = cn.getContext('2d');
        document.getElementById('preview-panel').appendChild(cn);
        
        
        var shirt_path = "../../media/shirtdesigner/images/illustration/tshirt/body/outline.png";
        var shirt_img= new Image();
        shirt_img.src= shirt_path;
        shirt_img.onload = function () {
           shirt_context.drawImage(shirt_img,0,0,374,394); 
        };    
        
        var neck_img = new Image();
        var neck_path = "../../media/shirtdesigner/images/illustration/tshirt/round/outline.png";
        neck_img.src= neck_path;
        
        neck_img.onload = function () {
           shirt_context.drawImage(neck_img,130,1,110,31);
        };
        
        
        function updateLeftSleeveCanvas(color){
            /*var c = document.createElement("canvas");
            c.id= "left-sleeve-canvas";
            c.width=374;
            c.height=394; 
            
            var context = c.getContext('2d');
            document.getElementById('preview-panel').appendChild(c);
            */
            context.clearRect(0, 0, 374,394);
            
            var img_path = "../../media/shirtdesigner/images/illustration/tshirt/body/lb2.png";
            var img= new Image();
            img.src= img_path;
            
            //img.onload = function () {
               context.drawImage(img, 0, 0, 374,394);
            //};

            var imgd = context.getImageData(0, 0, 374,394),
            pix = imgd.data;

            for (var i = 0, n = pix.length; i <n; i += 4) {
                  pix[i] = hexToR(color);
                  pix[i+1] = hexToG(color);
                  pix[i+2] = hexToB(color);
            }
            context.putImageData(imgd, 0, 0);
            
            shirt_context.drawImage(c,0,0,374,394);
            //c.remove();

        }
        function updateLeftSleeveOutlineCanvas(color){
            /*var c = document.createElement("canvas");
            c.id= "left-sleeve-canvas";
            c.width=374;
            c.height=394; 
            
            var context = c.getContext('2d');
            document.getElementById('preview-panel').appendChild(c);
            */
            context.clearRect(0, 0, 374,394);
            var img_path = "../../media/shirtdesigner/images/illustration/tshirt/body/lb1.png";
            var img= new Image();

            img.src= img_path;
            //img.onload = function () {
               context.drawImage(img, 0, 0, 374,394);
            //};
            var imgd = context.getImageData(0, 0, 374,394),
            pix = imgd.data;

            for (var i = 0, n = pix.length; i <n; i += 4) {
                  pix[i] = hexToR(color);
                  pix[i+1] = hexToG(color);
                  pix[i+2] = hexToB(color);
            }
            context.putImageData(imgd, 0, 0);
            
            shirt_context.drawImage(c,0,0,374,394);
            //c.remove();

        }
        function updateRightSleeveCanvas(color){
            /*var c = document.createElement("canvas");
            c.id= "left-sleeve-canvas";
            c.width=374;
            c.height=394; 
            
            var context = c.getContext('2d');
            document.getElementById('preview-panel').appendChild(c);
            */
            context.clearRect(0, 0, 374,394);
            var img_path = "../../media/shirtdesigner/images/illustration/tshirt/body/rb2.png";
            var img= new Image();

            img.src= img_path;
            //img.onload = function () {
               context.drawImage(img, 0, 0, 374,394);
            //};
            var imgd = context.getImageData(0, 0, 374,394),
            pix = imgd.data;

            for (var i = 0, n = pix.length; i <n; i += 4) {
                  pix[i] = hexToR(color);
                  pix[i+1] = hexToG(color);
                  pix[i+2] = hexToB(color);
            }
            context.putImageData(imgd, 0, 0);
            
            shirt_context.drawImage(c,0,0,374,394);
            //c.remove();
        }
        function updateRightSleeveOutlineCanvas(color){
            /*var c = document.createElement("canvas");
            c.id= "left-sleeve-canvas";
            c.width=374;
            c.height=394; 
            
            var context = c.getContext('2d');
            document.getElementById('preview-panel').appendChild(c);
            */
            context.clearRect(0, 0, 374,394);
            var img_path = "../../media/shirtdesigner/images/illustration/tshirt/body/rb1.png";
            var img= new Image();

            img.src= img_path;
            //img.onload = function () {
               context.drawImage(img, 0, 0, 374,394);
            //};
            
            var imgd = context.getImageData(0, 0, 374,394),
            pix = imgd.data;

            for (var i = 0, n = pix.length; i <n; i += 4) {
                  pix[i] = hexToR(color);
                  pix[i+1] = hexToG(color);
                  pix[i+2] = hexToB(color);
            }
            context.putImageData(imgd, 0, 0);
            
            shirt_context.drawImage(c,0,0,374,394);
            //c.remove();
            
        }
        
        function updateBodyCanvas(color){
            /*var c = document.createElement("canvas");
            c.id= "body-canvas";
            c.width=374;
            c.height=394; 
            
            var context = c.getContext('2d');
            document.getElementById('preview-panel').appendChild(c);
            */
            context.clearRect(0, 0, 374,394);
            var img_path = "../../media/shirtdesigner/images/illustration/tshirt/body/b.png";
            var img= new Image();
            img.src= img_path;
            //img.onload = function () {
               context.drawImage(img, 0, 0, 374,394);
            //};
            var imgd = context.getImageData(0, 0, 374,394),
            pix = imgd.data;

            for (var i = 0, n = pix.length; i <n; i += 4) {
                  pix[i] = hexToR(color);
                  pix[i+1] = hexToG(color);
                  pix[i+2] = hexToB(color);
            }
            context.putImageData(imgd, 0, 0);
            shirt_context.drawImage(c,0,0,374,394);
            //c.remove();
        }
        function updateOutlineCanvas(){
            // BODY OUTLINE
            var shirt_img = new Image();
            shirt_path = "../../media/shirtdesigner/images/illustration/tshirt/body/outline.png";
            shirt_img.src= shirt_path;
            
            //shirt_img.onload = function () {
               shirt_context.drawImage(shirt_img,0,0,374,394);
            //};
            
            switch($j('input[name=neck-selection]:checked').val()){
                case "round-neck":
                    var neck_img = new Image();
                    var neck_path = "../../media/shirtdesigner/images/illustration/tshirt/round/outline.png";
                    neck_img.src= neck_path;

                    neck_img.onload = function () {
                       shirt_context.drawImage(neck_img,130,1,110,31);
                    };
                    
                    break;
                case "v-neck":
                    var neck_img = new Image();
                    var neck_path = "../../media/shirtdesigner/images/illustration/tshirt/vneck/outline.png";
                    neck_img.src= neck_path;

                    neck_img.onload = function () {
                       shirt_context.drawImage(neck_img,132,1,110,31);
                    };
                    
                    break;
                case "collar":
                    var neck_img = new Image();
                    var neck_path = "../../media/shirtdesigner/images/illustration/tshirt/collar/outline.png";
                    neck_img.src= neck_path;

                    neck_img.onload = function () {
                       shirt_context.drawImage(neck_img,120,0,140,129);
                    };
                    
                    break;
            }
            
        }
        
        
        function updateNeckCanvas(color) {
            context1.clearRect(0, 0, 374,394);
            var img= new Image();
                    
            switch($j('input[name=neck-selection]:checked').val()){
                case "round-neck":
                    cn.width=110;
                    cn.height=31; 

                    var img_path = "../../media/shirtdesigner/images/illustration/tshirt/round/b1.png";
                    img.src= img_path;
                    
                    //img.onload = function () {
                       contextn.drawImage(img, 0, 0, 110,31);
                    //};
                    var imgd = contextn.getImageData(0, 0, 110,31),
                    pix = imgd.data;
                    for (var i = 0, n = pix.length; i <n; i += 4) {
                          pix[i] = hexToR(color);
                          pix[i+1] = hexToG(color);
                          pix[i+2] = hexToB(color);
                    }
                    contextn.putImageData(imgd, 0, 0);
                    shirt_context.drawImage(cn,130,1,110,31);
                    break;
                case "v-neck":
                    
                    cn.width=110;
                    cn.height=31; 

                    var img_path = "../../media/shirtdesigner/images/illustration/tshirt/vneck/b1.png";
                    img.src= img_path;
                    
                    //img.onload = function () {
                       contextn.drawImage(img, 0, 0, 110,31);
                    //};
                    var imgd = contextn.getImageData(0, 0, 110,31),
                    pix = imgd.data;
                    for (var i = 0, n = pix.length; i <n; i += 4) {
                          pix[i] = hexToR(color);
                          pix[i+1] = hexToG(color);
                          pix[i+2] = hexToB(color);
                    }
                    contextn.putImageData(imgd, 0, 0);
                    shirt_context.drawImage(cn,130,1,110,31);
                    
                    break;
                case "collar":
                    cn.width=140;
                    cn.height=129; 

                    var img_path = "../../media/shirtdesigner/images/illustration/tshirt/collar/b1.png";
                    img.src= img_path;
                    
                    //img.onload = function () {
                       contextn.drawImage(img, 0, 0, 140,129);
                    //};
                    var imgd = contextn.getImageData(0, 0, 140,129),
                    pix = imgd.data;
                    for (var i = 0, n = pix.length; i <n; i += 4) {
                          pix[i] = hexToR(color);
                          pix[i+1] = hexToG(color);
                          pix[i+2] = hexToB(color);
                    }
                    contextn.putImageData(imgd, 0, 0);
                    shirt_context.drawImage(cn,120,0,140,129);
                    break;
                
            }
            //cn.remove();
        }
        
        function updateCanvas(){
            
            shirt_context.clearRect(0, 0, 374,394);
            updateBodyCanvas($j("#body-color").val());
            
            
            if($j("#left-sleeve-same").is(':checked')){
                updateLeftSleeveCanvas($j("#body-color").val());
            }else {
                updateLeftSleeveCanvas($j("#left-sleeve-color").val());
            }
            
            if($j("#left-sleeve-outline-same").is(':checked')){
                updateLeftSleeveOutlineCanvas($j("#body-color").val());
            }else {
                updateLeftSleeveOutlineCanvas($j("#left-sleeve-outline-color").val());
            }
            
            if($j("#right-sleeve-same").is(':checked')){
                updateRightSleeveCanvas($j("#body-color").val());
            }else {
                updateRightSleeveCanvas($j("#right-sleeve-color").val());
            }
            
            if($j("#right-sleeve-outline-same").is(':checked')){
                updateRightSleeveOutlineCanvas($j("#body-color").val());
            }else {
                updateRightSleeveOutlineCanvas($j("#right-sleeve-outline-color").val());
            }
            
            
            updateOutlineCanvas();
            if($j("#neck-same").is(':checked')){
                updateNeckCanvas($j("#body-color").val());
            }else {
                updateNeckCanvas($j("#neck-color").val());
            }
        }
        
        function updateCanvasBack(){
            
            shirt_context.clearRect(0, 0, 374,394);
            updateBodyCanvas($j("#body-color").val());
            
            
            if($j("#left-sleeve-same").is(':checked')){
                updateLeftSleeveCanvas($j("#body-color").val());
            }else {
                updateLeftSleeveCanvas($j("#left-sleeve-color").val());
            }
            
            if($j("#left-sleeve-outline-same").is(':checked')){
                updateLeftSleeveOutlineCanvas($j("#body-color").val());
            }else {
                updateLeftSleeveOutlineCanvas($j("#left-sleeve-outline-color").val());
            }
            
            if($j("#right-sleeve-same").is(':checked')){
                updateRightSleeveCanvas($j("#body-color").val());
            }else {
                updateRightSleeveCanvas($j("#right-sleeve-color").val());
            }
            
            if($j("#right-sleeve-outline-same").is(':checked')){
                updateRightSleeveOutlineCanvas($j("#body-color").val());
            }else {
                updateRightSleeveOutlineCanvas($j("#right-sleeve-outline-color").val());
            }
            updateOutlineCanvas();
      }
      
      
          
      function updateCanvasSpecific(path,color){
            context1.clearRect(0, 0, 374,394);
            
            var img_path = path;
            var img= new Image();

            img.src= img_path;
            
            //img.onload = function () {
                context1.drawImage(img, 0, 0, 374,394);
            //}
            
            
            
            var imgd = context1.getImageData(0, 0, 374,394),
            pix = imgd.data;

            for (var i = 0, n = pix.length; i <n; i += 4) {
                  pix[i] = hexToR(color);
                  pix[i+1] = hexToG(color);
                  pix[i+2] = hexToB(color);
            }
            context1.putImageData(imgd, 0, 0);
            
            shirt_context.drawImage(c1,0,0,374,394);
            //c.remove();
            
        }
        
        function updateCanvasSpecific2(path,color){
            //context1.clearRect(0, 0, 374,394);
            
            var img_path = path;
            var img= new Image();

            img.src= img_path;
            
            img.onload = function () {
                context1.drawImage(img, 0, 0, 374,394);
            }
            
            
            
            var imgd = context1.getImageData(0, 0, 374,394),
            pix = imgd.data;

            for (var i = 0, n = pix.length; i <n; i += 4) {
                  pix[i] = hexToR(color);
                  pix[i+1] = hexToG(color);
                  pix[i+2] = hexToB(color);
            }
            context1.putImageData(imgd, 0, 0);
            
            //shirt_context.drawImage(c1,0,0,374,394);
            //c.remove();
            
        }
                
        
        
      function updateCanvasLeft() {
            shirt_context.clearRect(0, 0, 374,394);
            
            if ($j('input[name=neck-selection]:checked').val() == "collar") {
                var outline = "../../media/shirtdesigner/images/illustration/tshirt/left-collar/left-outline.png";
                updateCanvasSpecific(outline, "000000");
                

                var body = "../../media/shirtdesigner/images/illustration/tshirt/left-collar/left-body.png",
                    body_bottom = "../../media/shirtdesigner/images/illustration/tshirt/left-collar/left-body-btm.png",
                    neck = "../../media/shirtdesigner/images/illustration/tshirt/left-collar/left-neck.png",
                    sleeve = "../../media/shirtdesigner/images/illustration/tshirt/left-collar/left-sleeve.png",
                    sleeve_bottom = "../../media/shirtdesigner/images/illustration/tshirt/left-collar/left-sleeve-btm.png";
                    
                updateCanvasSpecific(body, $j("#body-color").val());
                updateCanvasSpecific(body_bottom, $j("#body-color").val());
            
                if($j("#left-sleeve-same").is(':checked')){
                    updateCanvasSpecific(sleeve,$j("#body-color").val());
                }else {
                    updateCanvasSpecific(sleeve,$j("#left-sleeve-color").val());
                }

                if($j("#left-sleeve-outline-same").is(':checked')){
                    updateCanvasSpecific(sleeve_bottom,$j("#body-color").val());
                }else {
                    updateCanvasSpecific(sleeve_bottom,$j("#left-sleeve-outline-color").val());
                }
                if($j("#neck-same").is(':checked')){
                    updateCanvasSpecific(neck,$j("#body-color").val());
                }else {
                    updateCanvasSpecific(neck,$j("#neck-color").val());
                }
            
            
            }else {
                var outline = "../../media/shirtdesigner/images/illustration/tshirt/left-round/left-outline.png";
                updateCanvasSpecific(outline, "000000");
                
                var body = "../../media/shirtdesigner/images/illustration/tshirt/left-round/left-body.png",
                    body_bottom = "../../media/shirtdesigner/images/illustration/tshirt/left-round/left-body-btm.png",
                    neck = "../../media/shirtdesigner/images/illustration/tshirt/left-round/left-neck.png",
                    sleeve = "../../media/shirtdesigner/images/illustration/tshirt/left-round/left-sleeve.png",
                    sleeve_bottom = "../../media/shirtdesigner/images/illustration/tshirt/left-round/left-sleeve-btm.png";
                    
                  
                
                updateCanvasSpecific(body, $j("#body-color").val());
                updateCanvasSpecific(body_bottom, $j("#body-color").val());
            
                if($j("#left-sleeve-same").is(':checked')){
                    updateCanvasSpecific(sleeve,$j("#body-color").val());
                }else {
                    updateCanvasSpecific(sleeve,$j("#left-sleeve-color").val());
                }

                if($j("#left-sleeve-outline-same").is(':checked')){
                    updateCanvasSpecific(sleeve_bottom,$j("#body-color").val());
                }else {
                    updateCanvasSpecific(sleeve_bottom,$j("#left-sleeve-outline-color").val());
                }
                if($j("#neck-same").is(':checked')){
                    updateCanvasSpecific(neck,$j("#body-color").val());
                }else {
                    updateCanvasSpecific(neck,$j("#neck-color").val());
                }
            
            }
            
      }
      
      function updateCanvasRight() {
            shirt_context.clearRect(0, 0, 374,394);
            
            if ($j('input[name=neck-selection]:checked').val() == "collar") {
                var outline = "../../media/shirtdesigner/images/illustration/tshirt/right-collar/right-outline.png";
                updateCanvasSpecific(outline, "000000");
                
                var body = "../../media/shirtdesigner/images/illustration/tshirt/right-collar/right-body.png",
                    body_bottom = "../../media/shirtdesigner/images/illustration/tshirt/right-collar/right-body-btm.png",
                    neck = "../../media/shirtdesigner/images/illustration/tshirt/right-collar/right-neck.png",
                    sleeve = "../../media/shirtdesigner/images/illustration/tshirt/right-collar/right-sleeve.png",
                    sleeve_bottom = "../../media/shirtdesigner/images/illustration/tshirt/right-collar/right-sleeve-btm.png";
                
                    
                updateCanvasSpecific(body, $j("#body-color").val());
                updateCanvasSpecific(body_bottom, $j("#body-color").val());
            
                if($j("#right-sleeve-same").is(':checked')){
                    updateCanvasSpecific(sleeve,$j("#body-color").val());
                }else {
                    updateCanvasSpecific(sleeve,$j("#right-sleeve-color").val());
                }

                if($j("#right-sleeve-outline-same").is(':checked')){
                    updateCanvasSpecific(sleeve_bottom,$j("#body-color").val());
                }else {
                    updateCanvasSpecific(sleeve_bottom,$j("#right-sleeve-outline-color").val());
                }
                if($j("#neck-same").is(':checked')){
                    updateCanvasSpecific(neck,$j("#body-color").val());
                }else {
                    updateCanvasSpecific(neck,$j("#neck-color").val());
                }
            
            
            }else {
                var outline = "../../media/shirtdesigner/images/illustration/tshirt/right-round/right-outline.png";
                
                updateCanvasSpecific(outline, "000000");
                
                var body = "../../media/shirtdesigner/images/illustration/tshirt/right-round/right-body.png",
                    body_bottom = "../../media/shirtdesigner/images/illustration/tshirt/right-round/right-body-btm.png",
                    neck = "../../media/shirtdesigner/images/illustration/tshirt/right-round/right-neck.png",
                    sleeve = "../../media/shirtdesigner/images/illustration/tshirt/right-round/right-sleeve.png",
                    sleeve_bottom = "../../media/shirtdesigner/images/illustration/tshirt/right-round/right-sleeve-btm.png";
                    
                updateCanvasSpecific(body, $j("#body-color").val());
                updateCanvasSpecific(body_bottom, $j("#body-color").val());
            
                if($j("#right-sleeve-same").is(':checked')){
                    updateCanvasSpecific(sleeve,$j("#body-color").val());
                }else {
                    updateCanvasSpecific(sleeve,$j("#right-sleeve-color").val());
                }

                if($j("#right-sleeve-outline-same").is(':checked')){
                    updateCanvasSpecific(sleeve_bottom,$j("#body-color").val());
                }else {
                    updateCanvasSpecific(sleeve_bottom,$j("#right-sleeve-outline-color").val());
                }
                if($j("#neck-same").is(':checked')){
                    updateCanvasSpecific(neck,$j("#body-color").val());
                }else {
                    updateCanvasSpecific(neck,$j("#neck-color").val());
                }
            
            }
            
      }
 /**
 *  Checkbox/Radio Button change functions
 * 
 */       
        $j(".neck-selection").change(function() { 
            updateCanvas();
        });
        $j("#neck-same").change(function () {

            if($j("#neck-same").is(':checked')){
                $j("div#neck-color-selections").css("display", "none");
            }else {
                $j("div#neck-color-selections").css("display", "block");
            }    
        });

        $j("#left-sleeve-same").change(function () {

            if($j("#left-sleeve-same").is(':checked')){
                $j("div#left-sleeve-color-selections").css("display", "none");
            }else {
                $j("div#left-sleeve-color-selections").css("display", "block");
            }    
        });

        $j("#left-sleeve-outline-same").change(function () {

            if($j("#left-sleeve-outline-same").is(':checked')){
                $j("div#left-sleeve-outline-color-selections").css("display", "none");
            }else {
                $j("div#left-sleeve-outline-color-selections").css("display", "block");
            }    
        });

        $j("#right-sleeve-same").change(function () {

            if($j("#right-sleeve-same").is(':checked')){
                $j("div#right-sleeve-color-selections").css("display", "none");
            }else {
                $j("div#right-sleeve-color-selections").css("display", "block");
            }    
        });

        $j("#right-sleeve-outline-same").change(function () {

            if($j("#right-sleeve-outline-same").is(':checked')){
                $j("div#right-sleeve-outline-color-selections").css("display", "none");
            }else {
                $j("div#right-sleeve-outline-color-selections").css("display", "block");
            }    
        });

        $j("#right-sleeve-outline-same").change(function () {

            if($j("#right-sleeve-outline-same").is(':checked')){
                $j("div#right-sleeve-outline-color-selections").css("display", "none");
            }else {
                $j("div#right-sleeve-outline-color-selections").css("display", "block");
            }    
        });

        $j("#add-pockets").change(function () {
            if($j("#add-pockets").is(':checked')){
                $j("#pocket-options").css("display", "block");
            }else {
                $j("#pocket-options").css("display", "none");
            }    
        });
/**
 *  Color change functions
 * 
 */
        $j("#body-color-selections > div").click(function(e){
            $j("#body-color").val(e.target.id);
            updateCanvas();
        });
        
        $j("#left-sleeve-color-selections > div").click(function(e){
            $j("#left-sleeve-color").val(e.target.id);
            updateCanvas();
        });
        
        $j("#left-sleeve-outline-color-selections > div").click(function(e){
            $j("#left-sleeve-outline-color").val(e.target.id);
            updateCanvas();
        });
        
        $j("#right-sleeve-color-selections > div").click(function(e){
            $j("#right-sleeve-color").val(e.target.id);
            updateCanvas();
        });
        
        $j("#right-sleeve-outline-color-selections > div").click(function(e){
            $j("#right-sleeve-outline-color").val(e.target.id);
            updateCanvas();
        }); 
        
        $j("#neck-color-selections > div").click(function(e){
            $j("#neck-color").val(e.target.id);
            updateCanvas();
        });
        
        $j("#pocket-color-selections > div").click(function(e){
            var color = e.target.id;
            var canvas = document.getElementById(highlighted_id);
            var pocket_context = canvas.getContext('2d');
            
            var c = document.createElement("canvas");
            c.id= "p-color";
            c.width=55;
            c.height=60; 
            
            var context = c.getContext('2d');
            document.getElementById('preview-panel').appendChild(c);
            
            var img_path = "../../media/shirtdesigner/images/illustration/pocket/b2.png";
            var img= new Image();

            img.src= img_path;
            
            context.drawImage(img, 0, 0, 55,60);

            var imgd = context.getImageData(0, 0, 55,60),
            pix = imgd.data;

            for (var i = 0, n = pix.length; i <n; i += 4) {
                  pix[i] = hexToR(color);
                  pix[i+1] = hexToG(color);
                  pix[i+2] = hexToB(color);
            }
            context.putImageData(imgd, 0, 0);
            pocket_context.drawImage(c,0,0,55,60);
            c.remove();
            
        });
        
        $j("#strip-pocket-color-selections > div").click(function(e){
            var color = e.target.id;
            var canvas = document.getElementById(highlighted_id);
            var pocket_context = canvas.getContext('2d');
            
            var c = document.createElement("canvas");
            c.id= "p-color";
            c.width=55;
            c.height=60; 
            
            var context = c.getContext('2d');
            document.getElementById('preview-panel').appendChild(c);
            
            var img_path = "../../media/shirtdesigner/images/illustration/pocket/b1.png";
            var img= new Image();

            img.src= img_path;
            
            context.drawImage(img, 0, 0, 55,60);

            var imgd = context.getImageData(0, 0, 55,60),
            pix = imgd.data;

            for (var i = 0, n = pix.length; i <n; i += 4) {
                  pix[i] = hexToR(color);
                  pix[i+1] = hexToG(color);
                  pix[i+2] = hexToB(color);
            }
            context.putImageData(imgd, 0, 0);
            pocket_context.drawImage(c,0,0,55,60);
            c.remove();
        });
 /**
 *  Button functions
 * 
 */       
        
        $j("#add-pocket").click(function(){

            var cp = document.createElement("canvas");
            cp.id= "pocket-" + pockets_qty;
            cp.width=55;
            cp.height=60; 
            cp.setAttribute('ondblclick', 'removeCanvasImage("'+cp.id+'")');
            cp.setAttribute('onclick', 'highlightCanvasImage("'+cp.id+'")');

            var i = document.createElement("input");
            i.className= pockets_qty + "-color";
            i.type = "hidden";
            document.getElementById('preview-panel').appendChild(i);

            var context = cp.getContext('2d');
            document.getElementById('pocket-area').appendChild(cp);

            var img_path = "../../media/shirtdesigner/images/illustration/pocket/pocket_outline.png";
            var img= new Image();
            img.src= img_path;

            img.onload = function () {
               context.drawImage(img, 0, 0, 55,60);
            };
            $j("#" + cp.id).draggable();

            pockets_qty++;
        });
        
        function quickFix() {
            var children = document.getElementById('pocket-area').childNodes;
            var ids = new Array();
            for (var c in children){

                if(children[c].id != null   ){
                    var canvas = document.getElementById(children[c].id);
                    shirt_context.drawImage(canvas, ($j("#"+children[c].id).position().left), ($j("#"+children[c].id).position().top+80));
                    canvas.remove();
                }
            }
            
            $j("#front-custom-shirt-code").val(shirt_canvas.toDataURL("image/png"));
            
            var i = document.createElement("img");
            i.id = 'front-custom-shirt-img';
            i.src = shirt_canvas.toDataURL("image/png");
            
            //document.getElementById('preview-panel').appendChild(i);
            
           
            updateCanvasLeft();
            
            $j("#left-custom-shirt-code").val(shirt_canvas.toDataURL("image/png"));
            var i = document.createElement("img");
            i.id = 'left-custom-shirt-img';
            i.src = shirt_canvas.toDataURL("image/png");
            
            //document.getElementById('preview-panel').appendChild(i);
            
            
            updateCanvasRight();
            $j("#right-custom-shirt-code").val(shirt_canvas.toDataURL("image/png"));
            var i = document.createElement("img");
            i.id = 'right-custom-shirt-img';
            i.src = shirt_canvas.toDataURL("image/png");
            
            //document.getElementById('preview-panel').appendChild(i);
            
             updateCanvasBack();
            $j("#back-custom-shirt-code").val(shirt_canvas.toDataURL("image/png"));
            var i = document.createElement("img");
            i.id = 'back-custom-shirt-img';
            i.src = shirt_canvas.toDataURL("image/png");
            
            //document.getElementById('preview-panel').appendChild(i);
            
        }
        
        updateCanvasLeft();
        updateCanvasRight();
        
        $j("#submit-custom-shirt").click(function(){
            //quickFix();
            quickFix();
            updateCanvas();
            
            $j("#create-shirt-design").submit();
        });
    
        
});
