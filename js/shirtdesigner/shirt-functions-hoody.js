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
            body_outline: "../../media/shirtdesigner/images/illustration/hoody/body/outline.png",
            body_b: "../../media/shirtdesigner/images/illustration/hoody/body/b.png",
            body_lb1: "../../media/shirtdesigner/images/illustration/hoody/body/lb1.png",
            body_lb2: "../../media/shirtdesigner/images/illustration/hoody/body/lb2.png",
            body_rb1: "../../media/shirtdesigner/images/illustration/hoody/body/rb1.png",
            body_rb2: "../../media/shirtdesigner/images/illustration/hoody/body/rb2.png",
            body_h1: "../../media/shirtdesigner/images/illustration/hoody/body/h1.png",
            body_h2: "../../media/shirtdesigner/images/illustration/hoody/body/h2.png",
            body_p1: "../../media/shirtdesigner/images/illustration/hoody/body/pb1.png",
            body_p2: "../../media/shirtdesigner/images/illustration/hoody/body/pb2.png",
            body_p3: "../../media/shirtdesigner/images/illustration/hoody/body/pb3.png",
            body_pocket: "../../media/shirtdesigner/images/illustration/hoody/body/pocket.png",
            body_zipper: "../../media/shirtdesigner/images/illustration/hoody/body/zipper.png",
            body_back_outline: "../../media/shirtdesigner/images/illustration/hoody/body-back/outline.png",
            body_back_block: "../../media/shirtdesigner/images/illustration/hoody/body-back/body-block.png",
            body_back_h2: "../../media/shirtdesigner/images/illustration/hoody/body-back/h2.png",
            right_outline: "../../media/shirtdesigner/images/illustration/hoody/right/right-outline.png",
            right_body: "../../media/shirtdesigner/images/illustration/hoody/right/right-body.png",
            right_body_block: "../../media/shirtdesigner/images/illustration/hoody/right/right-body-block.png",
            right_body_btm: "../../media/shirtdesigner/images/illustration/hoody/right/right-body-btm.png",
            right_head: "../../media/shirtdesigner/images/illustration/hoody/right/right-head.png",
            right_neck: "../../media/shirtdesigner/images/illustration/hoody/right/right-neck.png",
            right_sleeve: "../../media/shirtdesigner/images/illustration/hoody/right/right-sleeve.png",
            right_btm: "../../media/shirtdesigner/images/illustration/hoody/right/right-sleeve-btm.png",
            right_pocket_side: "../../media/shirtdesigner/images/illustration/hoody/right/right-pocket-side.png",
            right_pocket_outline: "../../media/shirtdesigner/images/illustration/hoody/right/right-pocket-outline.png",
            right_pocket_block: "../../media/shirtdesigner/images/illustration/hoody/right/right-pocket-block.png",
            left_outline: "../../media/shirtdesigner/images/illustration/hoody/left/left-outline.png",
            left_body: "../../media/shirtdesigner/images/illustration/hoody/left/left-body.png",
            left_body_block: "../../media/shirtdesigner/images/illustration/hoody/left/left-body-block.png",
            left_body_btm: "../../media/shirtdesigner/images/illustration/hoody/left/left-body-btm.png",
            left_head: "../../media/shirtdesigner/images/illustration/hoody/left/left-head.png",
            left_neck: "../../media/shirtdesigner/images/illustration/hoody/left/left-neck.png",
            left_sleeve: "../../media/shirtdesigner/images/illustration/hoody/left/left-sleeve.png",
            left_btm: "../../media/shirtdesigner/images/illustration/hoody/left/left-sleeve-btm.png",
            left_pocket_side: "../../media/shirtdesigner/images/illustration/hoody/left/left-pocket-side.png",
            left_pocket_outline: "../../media/shirtdesigner/images/illustration/hoody/left/left-pocket-outline.png",
            left_pocket_block: "../../media/shirtdesigner/images/illustration/hoody/left/left-pocket-block.png"
            
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
        
        var shirt_path = "../../media/shirtdesigner/images/illustration/hoody/body/outline.png";
        var shirt_img= new Image();
        shirt_img.src= shirt_path;
        shirt_img.onload = function () {
           shirt_context.drawImage(shirt_img,0,0,374,394); 
        };
        
        
        function updateCanvasFront(){
            
            shirt_context.clearRect(0, 0, 374,394);
            
            var left_sleeve_btm = "../../media/shirtdesigner/images/illustration/hoody/body/lb1.png";
            var left_sleeve = "../../media/shirtdesigner/images/illustration/hoody/body/lb2.png";
            var right_sleeve_btm = "../../media/shirtdesigner/images/illustration/hoody/body/rb1.png";
            var right_sleeve = "../../media/shirtdesigner/images/illustration/hoody/body/rb2.png";
            var outline = "../../media/shirtdesigner/images/illustration/hoody/body/outline.png";
            var body_block = "../../media/shirtdesigner/images/illustration/hoody/body/body-block.png";
            var h2 = "../../media/shirtdesigner/images/illustration/hoody/body/h2.png";
            
            updateCanvasSpecific(body_block, $j("#body-color").val());
            
            if(!$j("#hood-same").is(':checked')){
                updateCanvasSpecific(h2, $j("#hood-color").val());
            }
            
            
            if(!$j("#right-sleeve-same").is(':checked')){
                updateCanvasSpecific(right_sleeve, $j("#right-sleeve-color").val());
            }
            
            if(!$j("#right-sleeve-same").is(':checked')){
                updateCanvasSpecific(right_sleeve, $j("#right-sleeve-color").val());
            }
            
            if(!$j("#right-sleeve-outline-same").is(':checked')){
                updateCanvasSpecific(right_sleeve_btm, $j("#right-sleeve-outline-color").val());
            }
            
            if(!$j("#left-sleeve-same").is(':checked')){
                updateCanvasSpecific(left_sleeve, $j("#left-sleeve-color").val());
            }
            
            if(!$j("#left-sleeve-outline-same").is(':checked')){
                updateCanvasSpecific(left_sleeve_btm, $j("#left-sleeve-outline-color").val());
            } 
            
            
            updateCanvasSpecific(outline, "000000");
            
      }
        function updateCanvasBack(){
            
            shirt_context.clearRect(0, 0, 374,394);
            
            var left_sleeve_btm = "../../media/shirtdesigner/images/illustration/hoody/body/lb1.png";
            var left_sleeve = "../../media/shirtdesigner/images/illustration/hoody/body/lb2.png";
            var right_sleeve_btm = "../../media/shirtdesigner/images/illustration/hoody/body/rb1.png";
            var right_sleeve = "../../media/shirtdesigner/images/illustration/hoody/body/rb2.png";
            var outline = "../../media/shirtdesigner/images/illustration/hoody/body-back/outline.png";
            var body_block = "../../media/shirtdesigner/images/illustration/hoody/body-back/body-block.png";
            var h2 = "../../media/shirtdesigner/images/illustration/hoody/body-back/h2.png";
            
            updateCanvasSpecific(body_block, $j("#body-color").val());
            
            if(!$j("#hood-same").is(':checked')){
                updateCanvasSpecific(h2, $j("#hood-color").val());
            }
            
            
            if(!$j("#right-sleeve-same").is(':checked')){
                updateCanvasSpecific(right_sleeve, $j("#right-sleeve-color").val());
            }
            
            if(!$j("#right-sleeve-same").is(':checked')){
                updateCanvasSpecific(right_sleeve, $j("#right-sleeve-color").val());
            }
            
            if(!$j("#right-sleeve-outline-same").is(':checked')){
                updateCanvasSpecific(right_sleeve_btm, $j("#right-sleeve-outline-color").val());
            }
            
            if(!$j("#left-sleeve-same").is(':checked')){
                updateCanvasSpecific(left_sleeve, $j("#left-sleeve-color").val());
            }
            
            if(!$j("#left-sleeve-outline-same").is(':checked')){
                updateCanvasSpecific(left_sleeve_btm, $j("#left-sleeve-outline-color").val());
            } 
            
            
            updateCanvasSpecific(outline, "000000");
            
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
            
        }
        
        function updateCanvasPocket(path,color){
            
            var pocket_canvas = document.getElementById("pocket");
            var pocket_context = pocket_canvas.getContext('2d');
            
            var c = document.createElement("canvas");
            c.id= "tmp-pocket";
            c.width=374;
            c.height=394;
            var context = c.getContext('2d');
            document.getElementById('preview-panel').appendChild(c);
            
            var img_path = path
            var img= new Image();

            img.src= img_path;
            
            context.drawImage(img, 0, 0, 374,394);

            var imgd = context.getImageData(0, 0, 374,394),
            pix = imgd.data;

            for (var i = 0, n = pix.length; i <n; i += 4) {
                  pix[i] = hexToR(color);
                  pix[i+1] = hexToG(color);
                  pix[i+2] = hexToB(color);
            }
            context.putImageData(imgd, 0, 0);
            pocket_context.drawImage(c,0,0,374,394);
            c.remove();
            
        }
        
      function updateCanvasLeft() {
            shirt_context.clearRect(0, 0, 374,394);
               
            var left_sleeve_btm = "../../media/shirtdesigner/images/illustration/hoody/left/left-sleeve-btm.png";
            var left_sleeve = "../../media/shirtdesigner/images/illustration/hoody/left/left-sleeve.png";
            var outline = "../../media/shirtdesigner/images/illustration/hoody/left/left-outline.png";
            var pocket_outline = "../../media/shirtdesigner/images/illustration/hoody/left/left-pocket-outline.png";
            var body_block = "../../media/shirtdesigner/images/illustration/hoody/left/left-body-block.png";
            var left_head = "../../media/shirtdesigner/images/illustration/hoody/left/left-head.png";
            var left_pocket_side = "../../media/shirtdesigner/images/illustration/hoody/left/left-pocket-side.png";
            var left_pocket_block = "../../media/shirtdesigner/images/illustration/hoody/left/left-pocket-block.png";
            
            updateCanvasSpecific(body_block, $j("#body-color").val());
            
            if(!$j("#hood-same").is(':checked')){
                updateCanvasSpecific(left_head, $j("#hood-color").val());
            }
            if(!$j("#left-sleeve-same").is(':checked')){
                updateCanvasSpecific(left_sleeve, $j("#left-sleeve-color").val());
            }
            
            if(!$j("#left-sleeve-outline-same").is(':checked')){
                updateCanvasSpecific(left_sleeve_btm, $j("#left-sleeve-outline-color").val());
            } 
            
            if(!$j("#left-pocket-same").is(':checked')){
                updateCanvasSpecific(left_pocket_side, $j("#left-pocket-color").val());
            }
            
            if(!$j("#middle-pocket-same").is(':checked')){
                updateCanvasSpecific(left_pocket_block, $j("#middle-pocket-color").val());
            }
            
            if($j("#add-pocket").is(':checked')){
                updateCanvasSpecific(pocket_outline, "000000");
            }else {
                updateCanvasSpecific(outline, "000000");
            }
            
            
            
      }
      
      function updateCanvasRight() {
            shirt_context.clearRect(0, 0, 374,394);
                
            var right_sleeve_btm = "../../media/shirtdesigner/images/illustration/hoody/right/right-sleeve-btm.png";
            var right_sleeve = "../../media/shirtdesigner/images/illustration/hoody/right/right-sleeve.png";
            var outline = "../../media/shirtdesigner/images/illustration/hoody/right/right-outline.png";
            var pocket_outline = "../../media/shirtdesigner/images/illustration/hoody/right/right-pocket-outline.png";
            var body_block = "../../media/shirtdesigner/images/illustration/hoody/right/right-body-block.png";
            var right_head = "../../media/shirtdesigner/images/illustration/hoody/right/right-head.png";
            var right_pocket_side = "../../media/shirtdesigner/images/illustration/hoody/right/right-pocket-side.png";
            var right_pocket_block = "../../media/shirtdesigner/images/illustration/hoody/right/right-pocket-block.png";
            
            updateCanvasSpecific(body_block, $j("#body-color").val());
            
            if(!$j("#hood-same").is(':checked')){
                updateCanvasSpecific(right_head, $j("#hood-color").val());
            }
            if(!$j("#right-sleeve-same").is(':checked')){
                updateCanvasSpecific(right_sleeve, $j("#right-sleeve-color").val());
            }
            
            if(!$j("#right-sleeve-outline-same").is(':checked')){
                updateCanvasSpecific(right_sleeve_btm, $j("#right-sleeve-outline-color").val());
            } 
            if(!$j("#right-pocket-same").is(':checked')){
                updateCanvasSpecific(right_pocket_side, $j("#right-pocket-color").val());
            }
            if(!$j("#middle-pocket-same").is(':checked')){
                updateCanvasSpecific(right_pocket_block, $j("#middle-pocket-color").val());
            }
            
            if($j("#add-pocket").is(':checked')){
                updateCanvasSpecific(pocket_outline, "000000");
            }else {
                updateCanvasSpecific(outline, "000000");
            }
            
            
      }
 /**
 *  Checkbox/Radio Button change functions
 * 
 */       
        $j(".neck-selection").change(function() { 
            updateCanvas();
        });
        $j("#hood-same").change(function () {
            var h2 = "../../media/shirtdesigner/images/illustration/hoody/body/h2.png";
                
            if($j("#hood-same").is(':checked')){
                $j("div#hood-color-selections").css("display", "none");
                updateCanvasSpecific(h2, $j("#body-color").val());
            }else {
                $j("div#hood-color-selections").css("display", "block");
                updateCanvasSpecific(h2, $j("#hood-color").val());
            }    
        });
        
        $j("#hood-outline-same").change(function () {
            var h1 = "../../media/shirtdesigner/images/illustration/hoody/body/h1.png";
             
            if($j("#hood-outline-same").is(':checked')){
                $j("div#hood-outline-color-selections").css("display", "none");
                updateCanvasSpecific(h1, $j("#body-color").val());
            }else {
                $j("div#hood-outline-color-selections").css("display", "block");
                updateCanvasSpecific(h1, $j("#hood-outline-color").val());
            }    
        });

        $j("#left-sleeve-same").change(function () {
            var lb2 = "../../media/shirtdesigner/images/illustration/hoody/body/lb2.png";
            
            if($j("#left-sleeve-same").is(':checked')){
                $j("div#left-sleeve-color-selections").css("display", "none");
                updateCanvasSpecific(lb2, $j("#body-color").val());
            }else {
                $j("div#left-sleeve-color-selections").css("display", "block");
                updateCanvasSpecific(lb2, $j("#left-sleeve-color").val());
            }    
        });

        $j("#left-sleeve-outline-same").change(function () {
            var lb1 = "../../media/shirtdesigner/images/illustration/hoody/body/lb1.png";
            
            if($j("#left-sleeve-outline-same").is(':checked')){
                $j("div#left-sleeve-outline-color-selections").css("display", "none");
                updateCanvasSpecific(lb1, $j("#body-color").val());
            }else {
                $j("div#left-sleeve-outline-color-selections").css("display", "block");
                updateCanvasSpecific(lb1, $j("#left-sleeve-outline-color").val());
            }    
        });

        $j("#right-sleeve-same").change(function () {
            var rb2 = "../../media/shirtdesigner/images/illustration/hoody/body/rb2.png";
            
            if($j("#right-sleeve-same").is(':checked')){
                $j("div#right-sleeve-color-selections").css("display", "none");
                updateCanvasSpecific(rb2, $j("#body-color").val());
            }else {
                $j("div#right-sleeve-color-selections").css("display", "block");
                updateCanvasSpecific(rb2, $j("#right-sleeve-color").val());
            }    
        });

        $j("#right-sleeve-outline-same").change(function () {
            var rb1 = "../../media/shirtdesigner/images/illustration/hoody/body/rb1.png";
            
            if($j("#right-sleeve-outline-same").is(':checked')){
                $j("div#right-sleeve-outline-color-selections").css("display", "none");
                updateCanvasSpecific(rb1, $j("#body-color").val());
            }else {
                $j("div#right-sleeve-outline-color-selections").css("display", "block");
                updateCanvasSpecific(rb1, $j("#right-sleeve-outline-color").val());
            }    
        });
        

        $j("#add-pocket").change(function () {
            
            var cp = document.getElementById("pocket");
            var context = cp.getContext('2d');
            
            if($j("#add-pocket").is(':checked')){
                $j("#pocket-options").css("display", "block");
                
                var img_path = "../../media/shirtdesigner/images/illustration/hoody/body/pocket.png";
                var img= new Image();
                img.src= img_path;

                img.onload = function () {
                context.drawImage(img, 0, 0, 374,394);
                };
            }else {
                $j("#pocket-options").css("display", "none");
                context.clearRect(0, 0, 374,394);
                
            }    
        });
        
        $j("#left-pocket-same").change(function () {
            var pb1 = "../../media/shirtdesigner/images/illustration/hoody/body/pb1.png";
            if($j("#left-pocket-same").is(':checked')){
                $j("#left-pocket-color-selections").css("display", "none");
                updateCanvasPocket(pb1, $j("#body-color").val());
            }else {
                $j("#left-pocket-color-selections").css("display", "block");
                updateCanvasPocket(pb1, $j("#left-pocket-color").val());
            }
        });
        
        $j("#right-pocket-same").change(function () {
            var pb3 = "../../media/shirtdesigner/images/illustration/hoody/body/pb3.png";
            if($j("#right-pocket-same").is(':checked')){
                updateCanvasPocket(pb3, $j("#body-color").val());
                $j("#right-pocket-color-selections").css("display", "none");
            }else {
                $j("#right-pocket-color-selections").css("display", "block");
                updateCanvasPocket(pb3, $j("#right-pocket-color").val());
            }
        });
        
        $j("#middle-pocket-same").change(function () {
            var pb2 = "../../media/shirtdesigner/images/illustration/hoody/body/pb2.png";
            
            if($j("#middle-pocket-same").is(':checked')){
                updateCanvasPocket(pb2, $j("#body-color").val());
                $j("#middle-pocket-color-selections").css("display", "none");
            }else {
                $j("#middle-pocket-color-selections").css("display", "block");
                updateCanvasPocket(pb2, $j("#middle-pocket-color").val());
            }
        });
        
        
        $j("#add-zipper").change(function () {
            
            var cz = document.getElementById("zipper");
            var context = cz.getContext('2d');

            
            if($j("#add-zipper").is(':checked')){
                var img_path = "../../media/shirtdesigner/images/illustration/hoody/body/zipper.png";
                var img= new Image();
                img.src= img_path;

                img.onload = function () {
                context.drawImage(img, 0, 0, 374,394);
                };
            }else {
                context.clearRect(0, 0, 374,394);
            }    
            
        });
        
        
/**
 *  Color change functions
 * 
 */
        $j("#body-color-selections > div").click(function(e){
            $j("#body-color").val(e.target.id);
            
            var h2 = "../../media/shirtdesigner/images/illustration/hoody/body-back/body-block.png";
            updateCanvasSpecific(h2, $j("#body-color").val());
            
            shirt_context.clearRect(0, 0, 374,394);
            
            var left_sleeve_btm = "../../media/shirtdesigner/images/illustration/hoody/body/lb1.png";
            var left_sleeve = "../../media/shirtdesigner/images/illustration/hoody/body/lb2.png";
            var right_sleeve_btm = "../../media/shirtdesigner/images/illustration/hoody/body/rb1.png";
            var right_sleeve = "../../media/shirtdesigner/images/illustration/hoody/body/rb2.png";
            var outline = "../../media/shirtdesigner/images/illustration/hoody/body/outline.png";
            var body_block = "../../media/shirtdesigner/images/illustration/hoody/body/body-block.png";
            
            updateCanvasSpecific(body_block, $j("#body-color").val());
            
            if(!$j("#right-sleeve-same").is(':checked')){
                updateCanvasSpecific(right_sleeve, $j("#right-sleeve-color").val());
            }
            
            if(!$j("#right-sleeve-outline-same").is(':checked')){
                updateCanvasSpecific(right_sleeve_btm, $j("#right-sleeve-outline-color").val());
            }
            
            if(!$j("#left-sleeve-same").is(':checked')){
                updateCanvasSpecific(left_sleeve, $j("#left-sleeve-color").val());
            }
            
            if(!$j("#left-sleeve-outline-same").is(':checked')){
                updateCanvasSpecific(left_sleeve_btm, $j("#left-sleeve-outline-color").val());
            } 
            updateCanvasSpecific(outline, "000000");
            
        });
        $j("#hood-color-selections > div").click(function(e){
            $j("#hood-color").val(e.target.id);
            var h2 = "../../media/shirtdesigner/images/illustration/hoody/body/h2.png";
            updateCanvasSpecific(h2, $j("#hood-color").val());
        });
        
        $j("#hood-outline-color-selections > div").click(function(e){
            $j("#hood-outline-color").val(e.target.id);
            var h1 = "../../media/shirtdesigner/images/illustration/hoody/body/h1.png";
            updateCanvasSpecific(h1, $j("#hood-outline-color").val());
        });
        
        $j("#left-sleeve-color-selections > div").click(function(e){
            $j("#left-sleeve-color").val(e.target.id);
            var left_sleeve = "../../media/shirtdesigner/images/illustration/hoody/body/lb2.png";
            updateCanvasSpecific(left_sleeve, $j("#left-sleeve-color").val());
        });
        
        $j("#left-sleeve-outline-color-selections > div").click(function(e){
            $j("#left-sleeve-outline-color").val(e.target.id);
            var left_sleeve_btm = "../../media/shirtdesigner/images/illustration/hoody/body/lb1.png";
            updateCanvasSpecific(left_sleeve_btm, $j("#left-sleeve-outline-color").val());
        });
        
        $j("#right-sleeve-color-selections > div").click(function(e){
            $j("#right-sleeve-color").val(e.target.id);
            var right_sleeve = "../../media/shirtdesigner/images/illustration/hoody/body/rb2.png";
            updateCanvasSpecific(right_sleeve, $j("#right-sleeve-color").val());
        });
        
        $j("#right-sleeve-outline-color-selections > div").click(function(e){
            $j("#right-sleeve-outline-color").val(e.target.id);
            var right_sleeve_btm = "../../media/shirtdesigner/images/illustration/hoody/body/rb1.png";
            updateCanvasSpecific(right_sleeve_btm, $j("#right-sleeve-outline-color").val());
        }); 
        
        $j("#left-pocket-color-selections > div").click(function(e){
            var pb1 = "../../media/shirtdesigner/images/illustration/hoody/body/pb1.png";
            var color = e.target.id;
            $j("#left-pocket-color").val(color);
            updateCanvasSpecific(pb1, color);
            
        });
        
        $j("#middle-pocket-color-selections > div").click(function(e){
            var pb2 = "../../media/shirtdesigner/images/illustration/hoody/body/pb2.png";
            var color = e.target.id;
            $j("#middle-pocket-color").val(color);
            updateCanvasSpecific(pb2, color);
            
        });
        
        $j("#right-pocket-color-selections > div").click(function(e){
            var pb3 = "../../media/shirtdesigner/images/illustration/hoody/body/pb3.png";
            var color = e.target.id;
            $j("#right-pocket-color").val(color);
            updateCanvasSpecific(pb3, color);
            
        });
        
        $j("#strip-pocket-color-selections > div").click(function(e){
            var color = e.target.id;
            var canvas = document.getElementById(highlighted_id);
            var pocket_context = canvas.getContext('2d');
            
            var c = document.createElement("canvas");
            c.id= "p-color";
            c.width=25;
            c.height=30; 
            
            var context = c.getContext('2d');
            document.getElementById('preview-panel').appendChild(c);
            
            var img_path = "../../media/shirtdesigner/images/illustration/pocket/b1.png";
            var img= new Image();

            img.src= img_path;
            
            context.drawImage(img, 0, 0, 25,30);

            var imgd = context.getImageData(0, 0, 25,30),
            pix = imgd.data;

            for (var i = 0, n = pix.length; i <n; i += 4) {
                  pix[i] = hexToR(color);
                  pix[i+1] = hexToG(color);
                  pix[i+2] = hexToB(color);
            }
            context.putImageData(imgd, 0, 0);
            pocket_context.drawImage(c,0,0,25,30);
            c.remove();
        });
 /**
 *  Button functions
 * 
 */     updateCanvasLeft();
        updateCanvasRight();
        
        $j("#submit-custom-shirt").click(function(){
            
            
            var pocket_canvas = document.getElementById("pocket");
           shirt_context.drawImage(pocket_canvas, 0, 0);
             
           var zipper_canvas = document.getElementById("zipper");
           shirt_context.drawImage(zipper_canvas, 0, 0);
            
            $j("#front-custom-shirt-code").val(shirt_canvas.toDataURL("image/png"));
            
            var i = document.createElement("img");
            i.id = 'front-custom-shirt-img';
            i.src = shirt_canvas.toDataURL("image/png");
            
            //document.getElementById('preview-panel').appendChild(i);
            
            updateCanvasBack();
            $j("#back-custom-shirt-code").val(shirt_canvas.toDataURL("image/png"));
            var i = document.createElement("img");
            i.id = 'back-custom-shirt-img';
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
            updateCanvasFront();
            $j("#create-shirt-design").submit();
        });
    
        
});
