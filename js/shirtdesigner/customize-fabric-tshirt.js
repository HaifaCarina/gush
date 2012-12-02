var $j = jQuery.noConflict();

// GLOBAL VARIABLES
var highlighted_id;
var pockets_qty = 0;
var images = {};
var max = 0, count=0;
var front_keys = [];
var shirt_canvas ;
var shirt_context ; 


function removeCanvasImage(e){
    $j("#" + e).remove();
}

function highlightCanvasImage(e){
    highlighted_id = e;
    $j("#preview-panel canvas").removeClass("highlight-canvas-image");
    $j("#" + e).addClass("highlight-canvas-image");

}  

function generateHex(color) {
    switch(color) {
        case "black": 
            console.log("black");
            return "a30504";
            break;
        case "black": 
            console.log("black");
            return "000000";
            break;
    }
}

$j(document).ready(function(){
        window.console = $j('<iframe>').hide().appendTo('body')[0].contentWindow.console;
        
     // INITIALIZE CANVAS
        shirt_canvas = document.getElementById('body-outline');
        shirt_context = shirt_canvas.getContext('2d');
        $j("#body-color").val('black');
        
        // Matches fabric part of the the color of the input value used
        var color_matches = {
            front_collar_b: "body-color",
            front_collar_b_btm: "body-color",
            front_collar_lb1: "left-sleeve-outline-color",
            front_collar_lb2: "left-sleeve-color",
            front_collar_rb1: "right-sleeve-outline-color",
            front_collar_rb2: "right-sleeve-color",
            
            front_round_b: "body-color",
            front_round_b_btm: "body-color",
            front_round_lb1: "left-sleeve-outline-color",
            front_round_lb2: "left-sleeve-color",
            front_round_rb1: "right-sleeve-outline-color",
            front_round_rb2: "right-sleeve-color",
            
            front_vneck_b: "body-color",
            front_vneck_b_btm: "body-color",
            front_vneck_lb1: "left-sleeve-outline-color",
            front_vneck_lb2: "left-sleeve-color",
            front_vneck_rb1: "right-sleeve-outline-color",
            front_vneck_rb2: "right-sleeve-color",
            
            back_collar_b: "body-color",
            back_collar_b_btm: "body-color",
            back_collar_lb1: "left-sleeve-outline-color",
            back_collar_lb2: "left-sleeve-color",
            back_collar_rb1: "right-sleeve-outline-color",
            back_collar_rb2: "right-sleeve-color",
            
            back_round_b: "body-color",
            back_round_b_btm: "body-color",
            back_round_lb1: "left-sleeve-outline-color",
            back_round_lb2: "left-sleeve-color",
            back_round_rb1: "right-sleeve-outline-color",
            back_round_rb2: "right-sleeve-color",
            
            back_vneck_b: "body-color",
            back_vneck_b_btm: "body-color",
            back_vneck_lb1: "left-sleeve-outline-color",
            back_vneck_lb2: "left-sleeve-color",
            back_vneck_rb1: "right-sleeve-outline-color",
            back_vneck_rb2: "right-sleeve-color",
            
            right_collar_body: "body-color",
            right_collar_body_btm: "body-color",
            right_collar_neck: "neck-color",
            right_collar_sleeve: "right-sleeve-color",
            right_collar_btm: "right-sleeve-outline-color",
        
        
            left_collar_body: "body-color",
            left_collar_body_btm: "body-color",
            left_collar_neck: "neck-color",
            left_collar_sleeve: "left-sleeve-color",
            left_collar_btm: "left-sleeve-outline-color",
           
          
            neck_collar_b1: "neck-color",
            neck_vneck_b1: "neck-color",
            neck_round_b1: "neck-color",
           
            right_round_body: "body-color",
            right_round_body_btm: "body-color",
            right_round_neck: "neck-color",
            right_round_sleeve: "right-sleeve-color",
            right_round_btm: "right-sleeve-outline-color",
            
            left_round_body: "body-color",
            left_round_body_btm: "body-color",
            left_round_neck: "left-sleeve-outline-color",
            left_round_sleeve: "left-sleeve-color",
            left_round_btm: "left-sleeve-outline-color"

            };
        
        // sources variable provides url for each fabric part
        var sources = {
            front_collar_b: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-collar/b.png",
            front_collar_b_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-collar/b-btm.png",
            front_collar_lb1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-collar/lb1.png",
            front_collar_lb2: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-collar/lb2.png",
            front_collar_rb1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-collar/rb1.png",
            front_collar_rb2: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-collar/rb2.png",
            
            front_round_b: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-round/b.png",
            front_round_b_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-round/b-btm.png",
            front_round_lb1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-round/lb1.png",
            front_round_lb2: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-round/lb2.png",
            front_round_rb1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-round/rb1.png",
            front_round_rb2: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-round/rb2.png",
            
            front_vneck_b: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-vneck/b.png",
            front_vneck_b_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-vneck/b-btm.png",
            front_vneck_lb1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-vneck/lb1.png",
            front_vneck_lb2: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-vneck/lb2.png",
            front_vneck_rb1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-vneck/rb1.png",
            front_vneck_rb2: "../../media/shirtdesigner/images/illustration/female/tshirt/black/front-vneck/rb2.png",
            
            back_collar_b: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-collar/b.png",
            back_collar_b_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-collar/b-btm.png",
            back_collar_lb1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-collar/lb1.png",
            back_collar_lb2: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-collar/lb2.png",
            back_collar_rb1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-collar/rb1.png",
            back_collar_rb2: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-collar/rb2.png",
            
            back_round_b: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-round/b.png",
            back_round_b_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-round/b-btm.png",
            back_round_lb1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-round/lb1.png",
            back_round_lb2: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-round/lb2.png",
            back_round_rb1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-round/rb1.png",
            back_round_rb2: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-round/rb2.png",
            
            back_vneck_b: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-vneck/b.png",
            back_vneck_b_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-vneck/b-btm.png",
            back_vneck_lb1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-vneck/lb1.png",
            back_vneck_lb2: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-vneck/lb2.png",
            back_vneck_rb1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-vneck/rb1.png",
            back_vneck_rb2: "../../media/shirtdesigner/images/illustration/female/tshirt/black/back-vneck/rb2.png",
            
            right_collar_body: "../../media/shirtdesigner/images/illustration/female/tshirt/black/right-collar/right-body.png",
            right_collar_body_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/right-collar/right-body-btm.png",
            right_collar_neck: "../../media/shirtdesigner/images/illustration/female/tshirt/black/right-collar/right-neck.png",
            right_collar_sleeve: "../../media/shirtdesigner/images/illustration/female/tshirt/black/right-collar/right-sleeve.png",
            right_collar_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/right-collar/right-sleeve-btm.png",
        
        
            left_collar_body: "../../media/shirtdesigner/images/illustration/female/tshirt/black/left-collar/left-body.png",
            left_collar_body_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/left-collar/left-body-btm.png",
            left_collar_neck: "../../media/shirtdesigner/images/illustration/female/tshirt/black/left-collar/left-neck.png",
            left_collar_sleeve: "../../media/shirtdesigner/images/illustration/female/tshirt/black/left-collar/left-sleeve.png",
            left_collar_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/left-collar/left-sleeve-btm.png",
           
          
            neck_collar_b1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/collar/b1.png",
            neck_vneck_b1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/vneck/b1.png",
            neck_round_b1: "../../media/shirtdesigner/images/illustration/female/tshirt/black/round/b1.png",
           
            right_round_body: "../../media/shirtdesigner/images/illustration/female/tshirt/black/right-round/right-body.png",
            right_round_body_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/right-round/right-body-btm.png",
            right_round_neck: "../../media/shirtdesigner/images/illustration/female/tshirt/black/right-round/right-neck.png",
            right_round_sleeve: "../../media/shirtdesigner/images/illustration/female/tshirt/black/right-round/right-sleeve.png",
            right_round_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/right-round/right-sleeve-btm.png",
            
            left_round_body: "../../media/shirtdesigner/images/illustration/female/tshirt/black/left-round/left-body.png",
            left_round_body_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/left-round/left-body-btm.png",
            left_round_neck: "../../media/shirtdesigner/images/illustration/female/tshirt/black/left-round/left-neck.png",
            left_round_sleeve: "../../media/shirtdesigner/images/illustration/female/tshirt/black/left-round/left-sleeve.png",
            left_round_btm: "../../media/shirtdesigner/images/illustration/female/tshirt/black/left-round/left-sleeve-btm.png"
        };
        
        var c1 = document.createElement("canvas");
        c1.id= "specific";
        c1.width=387;
        c1.height=409; 
        c1.setAttribute('style', 'display:none');
        var context1 = c1.getContext('2d');
        document.getElementById('preview-panel').appendChild(c1);  
        
        // Intialize the display of black front fabric 
        updateCanvasAll();  
            
       function updateCanvasSpecific(path, shirt_context){
            console.log("updateCanvasSpecific" );
            var img_path = path; 
            var img= new Image();
            var w=387, h=409;
            img.src= img_path;
            console.log(max +":"+ count);
            img.onload = function () {
                shirt_context.drawImage(img, 0, 0, w,h);
            }
            shirt_context.drawImage(c1,0,0,w,h);
        }
        
        
        // Updates all parts of the shirt
        function updateCanvasAll() {
            console.log("updateCanvasAll");
            
            var w=387, h=409;
            shirt_context.clearRect(0, 0, w, h);
            switch($j('input[name=neck-selection]:checked').val()) {
                case "round-neck": 
                    front_keys = ["front_round_b", "front_round_b_btm","front_round_lb1", "front_round_lb2", "front_round_rb1", "front_round_rb2","neck_round_b1"];
                    break;
                case "v-neck":
                    front_keys = ["front_vneck_b", "front_vneck_b_btm","front_vneck_lb1", "front_vneck_lb2", "front_vneck_rb1", "front_vneck_rb2","neck_vneck_b1"];
                    break;
                case "collar":
                    front_keys = ["front_collar_b", "front_collar_b_btm","front_collar_lb1", "front_collar_lb2", "front_collar_rb1", "front_collar_rb2","neck_collar_b1"];
                    break;
            }
            
            
            if($j("#neck-same").is(':checked')){
                $j("#neck-color").val($j("#body-color").val()); 
            } 
            if($j("#left-sleeve-same").is(':checked')){
                $j("#left-sleeve-color").val($j("#body-color").val()); 
            }
            if($j("#left-sleeve-outline-same").is(':checked')){
                $j("#left-sleeve-outline-color").val($j("#body-color").val()); 
            }
            if($j("#right-sleeve-same").is(':checked')){
                $j("#right-sleeve-color").val($j("#body-color").val()); 
            }
            if($j("#right-sleeve-outline-same").is(':checked')){
                $j("#right-sleeve-outline-color").val($j("#body-color").val()); 
            }
            
            for (var i = 0; i < front_keys.length; i++) {
                var key = sources[front_keys[i]];
                var key_array = key.split("/");
                key_array[8] = $j("#" + color_matches[front_keys[i]]).val();
                key = key_array.join("/");
                
                updateCanvasSpecific(key,  shirt_context);
            }
            
        }
        // Generates the left view of the shirt
        function updateCanvasLeft() {
            console.log("updateCanvasLeft");
            var w=387, h=409, keys;
            
            switch($j('input[name=neck-selection]:checked').val()) {
                case "round-neck": 
                    keys = ["left_round_body", "left_round_body_btm","left_round_neck", "left_round_sleeve", "left_round_btm"];
                    break;
                case "v-neck":
                    keys = ["left_vneck_body", "left_vneck_body_btm","left_vneck_neck", "left_vneck_sleeve", "left_vneck_btm"];
                    break;
                case "collar":
                    keys = ["left_collar_body", "left_collar_body_btm","left_collar_neck", "left_collar_sleeve", "left_collar_btm"];
                    break;
            }
            
            
            if($j("#neck-same").is(':checked')){
                $j("#neck-color").val($j("#body-color").val()); 
            } 
            if($j("#left-sleeve-same").is(':checked')){
                $j("#left-sleeve-color").val($j("#body-color").val()); 
            }
            if($j("#left-sleeve-outline-same").is(':checked')){
                $j("#left-sleeve-outline-color").val($j("#body-color").val()); 
            }
            if($j("#right-sleeve-same").is(':checked')){
                $j("#right-sleeve-color").val($j("#body-color").val()); 
            }
            if($j("#right-sleeve-outline-same").is(':checked')){
                $j("#right-sleeve-outline-color").val($j("#body-color").val()); 
            }
            
            var c2 = document.createElement("canvas");
            c2.id= "specific-left";
            c2.width=w;
            c2.height=h; 
            c2.setAttribute('style', 'display:none');
            document.getElementById('preview-panel').appendChild(c2);  


            var canvas = document.getElementById(c2.id);
            var context = c2.getContext('2d');
            var max = keys.length, count=0;
            
            for (var i = 0; i < keys.length; i++) {
                var key = sources[keys[i]];
                var key_array = key.split("/");
                key_array[8] = $j("#" + color_matches[keys[i]]).val();
                key = key_array.join("/");
                
                context.clearRect(0, 0, w,h);
                
                var img_path = key; 
                var img= new Image();
               
                (function(i,img, img_path){
                    img.onload=function(){
                        context.drawImage(img,0,0,w,h);
                        count++;
                        if (max == count) {
                            // Value here will be used in submission
                            $j("#left-custom-shirt-code").val(canvas.toDataURL("image/png"));
                            var i = document.createElement("img");
                            i.id = 'left-custom-shirt-img';
                            i.src = canvas.toDataURL("image/png");
                            //document.getElementById('preview-panel').appendChild(i);
                            c2.remove();
                            
                            console.log("left max na printed na!");
                            
                        }
                    };
                    img.src = img_path;
                })(i,img, img_path);
                   
            }
            
        }
        
        // Generates the right view of the shirt
        function updateCanvasRight() {
            console.log("updateCanvasRight");
            var w=387, h=409, keys;
            
            switch($j('input[name=neck-selection]:checked').val()) {
                case "round-neck": 
                    keys = ["right_round_body", "right_round_body_btm","right_round_neck", "right_round_sleeve", "right_round_btm"];
                    break;
                case "v-neck":
                    keys = ["right_vneck_body", "right_vneck_body_btm","right_vneck_neck", "right_vneck_sleeve", "right_vneck_btm"];
                    break;
                case "collar":
                    keys = ["right_collar_body", "right_collar_body_btm","right_collar_neck", "right_collar_sleeve", "right_collar_btm"];
                    break;
            }
            
            
            if($j("#neck-same").is(':checked')){
                $j("#neck-color").val($j("#body-color").val()); 
            } 
            if($j("#right-sleeve-same").is(':checked')){
                $j("#right-sleeve-color").val($j("#body-color").val()); 
            }
            if($j("#right-sleeve-outline-same").is(':checked')){
                $j("#right-sleeve-outline-color").val($j("#body-color").val()); 
            }
            if($j("#right-sleeve-same").is(':checked')){
                $j("#right-sleeve-color").val($j("#body-color").val()); 
            }
            if($j("#right-sleeve-outline-same").is(':checked')){
                $j("#right-sleeve-outline-color").val($j("#body-color").val()); 
            }
            
            var c2 = document.createElement("canvas");
            c2.id= "specific-right";
            c2.width=w;
            c2.height=h; 
            c2.setAttribute('style', 'display:none');
            document.getElementById('preview-panel').appendChild(c2);  


            var canvas = document.getElementById(c2.id);
            var context = canvas.getContext('2d');
            var max = keys.length, count=0;
            
            for (var i = 0; i < keys.length; i++) {
                var key = sources[keys[i]];
                var key_array = key.split("/");
                key_array[8] = $j("#" + color_matches[keys[i]]).val();
                key = key_array.join("/");
                
                context.clearRect(0, 0, 387,409);
                
                var img_path = key; 
                var img= new Image();
               
                (function(i,img, img_path){
                    img.onload=function(){
                        context.drawImage(img,0,0,w,h);
                        count++;
                        if (max == count) {
                            // Value here will be used in submission
                            $j("#right-custom-shirt-code").val(canvas.toDataURL("image/png"));
                            var i = document.createElement("img");
                            i.id = 'right-custom-shirt-img';
                            i.src = canvas.toDataURL("image/png");
                            //document.getElementById('preview-panel').appendChild(i);
                            c2.remove();
                        }
                    };
                    img.src = img_path;
                })(i,img, img_path);
                   
            }
            
        }
        // Generates the back view of the shirt
        function updateCanvasBack() {
            console.log("updateCanvasBack");
            var w=387, h=409, keys;
            
            switch($j('input[name=neck-selection]:checked').val()) {
                case "round-neck": 
                    keys = ["back_round_b","back_round_b_btm","back_round_lb1","back_round_lb2","back_round_rb1","back_round_rb2"];
                    break;
                case "v-neck":
                    keys = ["back_vneck_b","back_vneck_b_btm","back_vneck_lb1","back_vneck_lb2","back_vneck_rb1","back_vneck_rb2"];
                    break;
                case "collar":
                    keys = ["back_collar_b","back_collar_b_btm","back_collar_lb1","back_collar_lb2","back_collar_rb1","back_collar_rb2"];
                    break;
            }
            
            
            if($j("#neck-same").is(':checked')){
                $j("#neck-color").val($j("#body-color").val()); 
            } 
            if($j("#right-sleeve-same").is(':checked')){
                $j("#right-sleeve-color").val($j("#body-color").val()); 
            }
            if($j("#right-sleeve-outline-same").is(':checked')){
                $j("#right-sleeve-outline-color").val($j("#body-color").val()); 
            }
            if($j("#right-sleeve-same").is(':checked')){
                $j("#right-sleeve-color").val($j("#body-color").val()); 
            }
            if($j("#right-sleeve-outline-same").is(':checked')){
                $j("#right-sleeve-outline-color").val($j("#body-color").val()); 
            }
            
            var c2 = document.createElement("canvas");
            c2.id= "specific-back";
            c2.width=w;
            c2.height=h; 
            c2.setAttribute('style', 'display:none');
            document.getElementById('preview-panel').appendChild(c2);  


            var canvas = document.getElementById(c2.id);
            var context = canvas.getContext('2d');
            var max = keys.length, count=0;
            
            for (var i = 0; i < keys.length; i++) {
                var key = sources[keys[i]];
                var key_array = key.split("/");
                key_array[8] = $j("#" + color_matches[keys[i]]).val();
                key = key_array.join("/");
                
                context.clearRect(0, 0, 387,409);
                
                var img_path = key; 
                var img= new Image();
               
                (function(i,img, img_path){
                    img.onload=function(){
                        context.drawImage(img,0,0,w,h);
                        count++;
                        if (max == count) {
                            
                            // Value here will be used in submission
                            $j("#back-custom-shirt-code").val(canvas.toDataURL("image/png"));
                            var i = document.createElement("img");
                            i.id = 'back-custom-shirt-img';
                            i.src = canvas.toDataURL("image/png");
                            //document.getElementById('preview-panel').appendChild(i);
                            c2.remove();
                            
                            // WHEN EVERYTHING IS LOADED, SUBMIT PAGE
                            $j("#create-shirt-design").submit();
                            
                        }
                    };
                    img.src = img_path;
                })(i,img, img_path);
                   
            }
        }
        
        
        $j("#body-color-selections > div").click(function(e){
            console.log("change body color" );
            $j("#body-color").val(e.target.id);
            updateCanvasAll();
        });
        
        $j(".neck-selection").change(function() {
            console.log("change neck selection" );
            updateCanvasAll();
        });
        
 /**
 *  Checkbox/Radio Button change functions
 * 
 */   
        $j("#neck-same").change(function () {
            console.log("chnge neck-same" );
            if($j("#neck-same").is(':checked')){
                $j("#neck-color").val($j("#body-color").val()); 
                updateCanvasAll();
                $j("div#neck-color-selections").css("display", "none");
            }else {
                $j("div#neck-color-selections").css("display", "block");
            }    
        });
        
        
        $j("#left-sleeve-same").change(function () {
            console.log("left sleeve same" );
            if($j("#left-sleeve-same").is(':checked')){
                $j("#left-sleeve-color").val($j("#body-color").val()); 
                updateCanvasAll();
                $j("div#left-sleeve-color-selections").css("display", "none");
            }else {
                $j("div#left-sleeve-color-selections").css("display", "block");
            }    
        });
        
        $j("#left-sleeve-outline-same").change(function () {
            console.log("left sleeve outline same" );
            if($j("#left-sleeve-outline-same").is(':checked')){
                $j("#left-sleeve-outline-color").val($j("#body-color").val()); 
                updateCanvasAll();
                $j("div#left-sleeve-outline-color-selections").css("display", "none");
            }else {
                $j("div#left-sleeve-outline-color-selections").css("display", "block");
            }    
        });

        $j("#right-sleeve-same").change(function () {
                console.log("right sleeve same" );
            if($j("#right-sleeve-same").is(':checked')){
                $j("#right-sleeve-color").val($j("#body-color").val()); 
                updateCanvasAll();
                $j("div#right-sleeve-color-selections").css("display", "none");
            }else {
                $j("div#right-sleeve-color-selections").css("display", "block");
            }    
        });

        $j("#right-sleeve-outline-same").change(function () {
            console.log("right sleeev outline change" );
            if($j("#right-sleeve-outline-same").is(':checked')){
                $j("#right-sleeve-outline-color").val($j("#body-color").val()); 
                updateCanvasAll();
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
        $j("#neck-color-selections > div").click(function(e){
            console.log("cang neck color" );
            $j("#neck-color").val(e.target.id);
            updateCanvasAll();
        });
        
        $j("#left-sleeve-color-selections > div").click(function(e){
            console.log("left sleeve color change" );
            $j("#left-sleeve-color").val(e.target.id);
            updateCanvasAll();
        });
        
        $j("#left-sleeve-outline-color-selections > div").click(function(e){
            console.log("left sleeve outlilne color change" );
            $j("#left-sleeve-outline-color").val(e.target.id);
            updateCanvasAll();
        });
        
        $j("#right-sleeve-color-selections > div").click(function(e){
            console.log("right sleeve color change" );
            $j("#right-sleeve-color").val(e.target.id);
            updateCanvasAll();
        });
        
        $j("#right-sleeve-outline-color-selections > div").click(function(e){
            console.log("right sleeve outline color change" );
            $j("#right-sleeve-outline-color").val(e.target.id);
            updateCanvasAll();
        }); 
        
        $j("#neck-color-selections > div").click(function(e){
            console.log("neck color change " );
            $j("#neck-color").val(e.target.id);
            updateCanvasAll();
        });
        $j("#pocket-color-selections > div").click(function(e){
            var color = generateHex(e.target.id);
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
            var color = generateHex(e.target.id);
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
        
        function createImageData() {
            var children = document.getElementById('pocket-area').childNodes;
            
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
            updateCanvasRight();
            updateCanvasBack();
            
            console.log("return sumbit");
            
        }
        
        $j("#submit-custom-shirt").click(function(){
            createImageData();
            // Note that the submit script is run in the UpdateCanvasBack when everything has been completed
        });
      
});      
