String.prototype.replaceAt=function(index, c) {
  return this.substr(0, index) + c + this.substr(index+c.length);
}

function Record() {
    this.text_1 = "";
    this.text_1_font_family = "Arial";
    this.text_1_size = 12;
    this.text_1_color = "black";
    this.text_1_style = "straight";
    
    this.text_2 = "";
    this.text_2_font_family = "Arial";
    this.text_2_size = 12;
    this.text_2_color = "black";
    this.text_2_style = "straight";
    
    this.text_3 = "";
    this.text_3_font_family = "Arial";
    this.text_3_size = 12;
    this.text_3_color = "black";
    this.text_3_style = "straight";
    
    this.art = new Array();
    this.images = new Array();
    this.logo = "";
}


var front = new Record();
var back = new Record();
var left = new Record();
var right = new Record();


var $j = jQuery.noConflict();
var active = "front";
var highlighted_art_id;

function removeCanvasImage(e){
    $j("#" + e).remove();
}
  
function highlightCanvasImage(e){
    highlighted_art_id = e;
    
    switch (active){
        case "front":
            $j("#art-canvas canvas").removeClass();
            break;
        case "back":
            $j("#art-canvas2 canvas").removeClass();
            break;
        case "left":
            $j("#art-canvas3 canvas").removeClass();
            break;
        case "right":
            $j("#art-canvas4 canvas").removeClass();
            break;
    }
    $j("#" + e).addClass("highlight-canvas-image");
}  
    
$j(document).ready(function(){
     window.console = $j('<iframe>').hide().appendTo('body')[0].contentWindow.console;
     
    $j(".shirtdesigner-tabmenu > li").click(function(e){
        
        switch(e.target.id){  
            case "front-menu":
                $j("#front-menu").addClass("active");  
                $j("#back-menu").removeClass("active");  
                $j("#left-menu").removeClass("active"); 
                $j("#right-menu").removeClass("active");
                $j("#sizes-menu").removeClass("active");
                

                $j("div.front-content").css("display", "none");
                $j("div.front-content").fadeIn(); 
                $j("div.sizes-content").css("display", "none");
                
                $j("#print").css("display", "block");
                $j("#print2").css("display", "none");
                $j("#print3").css("display", "none");
                $j("#print4").css("display", "none");
                
                $j("#art-canvas").css("display", "block");  
                $j("#art-canvas2").css("display", "none");
                $j("#art-canvas3").css("display", "none");  
                $j("#art-canvas4").css("display", "none");
                
                switch(front.logo) {
                    case "logo-1":
                        $j("#logo-2").removeClass('shirt_type_box_selected');
                        $j("#logo-1").addClass('shirt_type_box_selected');
                        break;
                    case "logo-2":
                        $j("#logo-1").removeClass('shirt_type_box_selected');
                        $j("#logo-2").addClass('shirt_type_box_selected');
                        break;
                    default:
                        $j("#logo-1").removeClass('shirt_type_box_selected');
                        $j("#logo-2").removeClass('shirt_type_box_selected');
                        break;
                }
                
                active = "front";
                document.getElementById('main-preview').style.backgroundImage = "url('"+$j("#front-image-url").val()+"')"; //front_shirt_url;
                document.getElementById('mini-preview').style.backgroundImage = "url('"+$j("#back-image-url").val()+"')";//back_shirt_url;
                
                $j(".text-selection").val('1');
                $j("#text-1").val(front.text_1);
                $j("#text-2").val(front.text_2);
                $j("#text-3").val(front.text_3);
                $j("#text-size").val(front.text_1_size);
                $j("#text-style").val(front.text_1_style);
                $j("#text-font").val(front.text_1_font_family);
                
                
                
            break;  
            case "back-menu":
                $j("#front-menu").removeClass("active");  
                $j("#back-menu").addClass("active");  
                $j("#left-menu").removeClass("active");
                $j("#right-menu").removeClass("active");
                $j("#sizes-menu").removeClass("active");
                
                $j("div.front-content").css("display", "none");
                $j("div.front-content").fadeIn();  
                $j("div.sizes-content").css("display", "none");
                
                $j("#print2").css("display", "block");
                $j("#print").css("display", "none");
                $j("#print3").css("display", "none");
                $j("#print4").css("display", "none");
                
                $j("#art-canvas2").css("display", "block");  
                $j("#art-canvas").css("display", "none");
                $j("#art-canvas3").css("display", "none");  
                $j("#art-canvas4").css("display", "none");
                
                switch(back.logo) {
                    case "logo-1":
                        $j("#logo-2").removeClass('shirt_type_box_selected');
                        $j("#logo-1").addClass('shirt_type_box_selected');
                        break;
                    case "logo-2":
                        $j("#logo-1").removeClass('shirt_type_box_selected');
                        $j("#logo-2").addClass('shirt_type_box_selected');
                        break;
                    default:
                        $j("#logo-1").removeClass('shirt_type_box_selected');
                        $j("#logo-2").removeClass('shirt_type_box_selected');
                        break;
                }
                active = "back";
                document.getElementById('main-preview').style.backgroundImage = "url('"+$j("#back-image-url").val()+"')";//back_shirt_url;
                document.getElementById('mini-preview').style.backgroundImage = "url('"+$j("#front-image-url").val()+"')";//front_shirt_url;
                
                
                $j(".text-selection").val('1');
                $j("#text-1").val(back.text_1);
                $j("#text-2").val(back.text_2);
                $j("#text-3").val(back.text_3);
                $j("#text-size").val(back.text_1_size);
                $j("#text-style").val(back.text_1_style);
                $j("#text-font").val(back.text_1_font_family);
                
            break;  
            case "left-menu":

                $j("#front-menu").removeClass("active");  
                $j("#back-menu").removeClass("active");  
                $j("#left-menu").addClass("active"); 
                $j("#right-menu").removeClass("active");
                $j("#sizes-menu").removeClass("active");
                
                $j("div.front-content").css("display", "none");
                $j("div.front-content").fadeIn();  
                $j("div.sizes-content").css("display", "none");
                
                $j("#print3").css("display", "block");
                $j("#print2").css("display", "none");
                $j("#print").css("display", "none");
                $j("#print4").css("display", "none");
                
                $j("#art-canvas3").css("display", "block");  
                $j("#art-canvas2").css("display", "none");
                $j("#art-canvas").css("display", "none");  
                $j("#art-canvas4").css("display", "none");
                
                switch(left.logo) {
                    case "logo-1":
                        $j("#logo-2").removeClass('shirt_type_box_selected');
                        $j("#logo-1").addClass('shirt_type_box_selected');
                        break;
                    case "logo-2":
                        $j("#logo-1").removeClass('shirt_type_box_selected');
                        $j("#logo-2").addClass('shirt_type_box_selected');
                        break;
                    default:
                        $j("#logo-1").removeClass('shirt_type_box_selected');
                        $j("#logo-2").removeClass('shirt_type_box_selected');
                        break;
                }
                active = "left";
                document.getElementById('main-preview').style.backgroundImage = "url('"+$j("#left-image-url").val()+"')";//back_shirt_url;
                document.getElementById('mini-preview').style.backgroundImage = "url('"+$j("#right-image-url").val()+"')";//front_shirt_url;
                
                $j(".text-selection").val('1');
                $j("#text-1").val(left.text_1);
                $j("#text-2").val(left.text_2);
                $j("#text-3").val(left.text_3);
                $j("#text-size").val(left.text_1_size);
                $j("#text-style").val(left.text_1_style);
                $j("#text-font").val(left.text_1_font_family);
                
            break; 
            
            case "right-menu":

                $j("#front-menu").removeClass("active");  
                $j("#back-menu").removeClass("active");
                $j("#left-menu").removeClass("active");
                $j("#right-menu").addClass("active"); 
                $j("#sizes-menu").removeClass("active");
                
                $j("div.front-content").css("display", "none");
                $j("div.front-content").fadeIn();  
                $j("div.sizes-content").css("display", "none");
                
                $j("#print4").css("display", "block");
                $j("#print2").css("display", "none");
                $j("#print3").css("display", "none");
                $j("#print").css("display", "none");
                
                $j("#art-canvas4").css("display", "block");  
                $j("#art-canvas2").css("display", "none");
                $j("#art-canvas3").css("display", "none");  
                $j("#art-canvas").css("display", "none");
                
                switch(right.logo) {
                    case "logo-1":
                        $j("#logo-2").removeClass('shirt_type_box_selected');
                        $j("#logo-1").addClass('shirt_type_box_selected');
                        break;
                    case "logo-2":
                        $j("#logo-1").removeClass('shirt_type_box_selected');
                        $j("#logo-2").addClass('shirt_type_box_selected');
                        break;
                    default:
                        $j("#logo-1").removeClass('shirt_type_box_selected');
                        $j("#logo-2").removeClass('shirt_type_box_selected');
                        break;
                }
                active = "right";
                document.getElementById('main-preview').style.backgroundImage = "url('"+$j("#right-image-url").val()+"')";//back_shirt_url;
                document.getElementById('mini-preview').style.backgroundImage = "url('"+$j("#left-image-url").val()+"')";//front_shirt_url;
                
                $j(".text-selection").val('1');
                $j("#text-1").val(right.text_1);
                $j("#text-2").val(right.text_2);
                $j("#text-3").val(right.text_3);
                $j("#text-size").val(right.text_1_size);
                $j("#text-style").val(right.text_1_style);
                $j("#text-font").val(right.text_1_font_family);
            break; 
            
            case "sizes-menu":
                $j("#front-menu").removeClass("active");  
                $j("#back-menu").removeClass("active");
                $j("#left-menu").removeClass("active");
                $j("#right-menu").removeClass("active"); 
                $j("#sizes-menu").addClass("active");
                
                
                $j("div.front-content").css("display", "none");
                $j("div.sizes-content").fadeIn(); 
                break;
            case "design-menu":
                
                
                break;
            case "swap-menu":
                switch(active){
                    case "front":
                        document.getElementById('main-preview').style.backgroundImage = "url('"+$j("#back-image-url").val()+"')";//back_shirt_url;
                        document.getElementById('mini-preview').style.backgroundImage = "url('"+$j("#front-image-url").val()+"')";//front_shirt_url;
                        active="back";
                        break;
                    case "back":
                        document.getElementById('main-preview').style.backgroundImage = "url('"+$j("#front-image-url").val()+"')";//back_shirt_url;
                        document.getElementById('mini-preview').style.backgroundImage = "url('"+$j("#back-image-url").val()+"')";//front_shirt_url;
                        active="front";
                        break;
                    case "right":
                        document.getElementById('main-preview').style.backgroundImage = "url('"+$j("#right-image-url").val()+"')";//back_shirt_url;
                        document.getElementById('mini-preview').style.backgroundImage = "url('"+$j("#left-image-url").val()+"')";//front_shirt_url;
                        active="left";
                        break;
                    case "left":
                        document.getElementById('main-preview').style.backgroundImage = "url('"+$j("#left-image-url").val()+"')";//back_shirt_url;
                        document.getElementById('mini-preview').style.backgroundImage = "url('"+$j("#right-image-url").val()+"')";//front_shirt_url;
                        active="right";
                        break;
                }
                break;
            return false; 
        }
    });
    $j(".preview-tabmenu > li").click(function(e){
        
        switch(e.target.id){ 
            case "design-menu":
                //alert("design menu");
                break;
            case "swap-menu":
                //alert("swap menu");
                break;
        }
    });
    
    $j(".front-tabmenu > li").click(function(e){  
        switch(e.target.id){  
            case "front-text-menu":

                $j("#front-text-menu").addClass("active");  
                $j("#front-art-menu").removeClass("active");  
                $j("#front-image-menu").removeClass("active");  

                $j(".inside-content.text").fadeIn();  
                $j(".inside-content.art").css("display", "none");  
                $j(".inside-content.image").css("display", "none"); 

            break;  
            case "front-art-menu":

                $j("#front-text-menu").removeClass("active");  
                $j("#front-art-menu").addClass("active");  
                $j("#front-image-menu").removeClass("active");  

                $j(".inside-content.art").fadeIn();  
                $j(".inside-content.text").css("display", "none");  
                $j(".inside-content.image").css("display", "none");  

            break;  
            case "front-image-menu":

                $j("#front-text-menu").removeClass("active");  
                $j("#front-art-menu").removeClass("active");  
                $j("#front-image-menu").addClass("active"); 

                $j(".inside-content.image").fadeIn();  
                $j(".inside-content.art").css("display", "none");  
                $j(".inside-content.text").css("display", "none"); 

            break; 
            return false; 
        }
    });
    function getBaseURL() {
        var url = location.href;
        var pathname = location.pathname;  // window.location.pathname;
        var index1 = url.indexOf(pathname);
        var index2 = url.indexOf("/", index1 + 1);
        var baseLocalUrl = url.substr(0, index2);

        return  baseLocalUrl + "/";
    }
     var shirt_color_id;
     $j("#shirt-color-options > div").click(function(e){
        
        var sku = $j("#sku").val();
        
        shirt_color_id = e.target.id;
        
        $j("#back-image-url").val(getBaseURL()+"media/shirtdesigner/images/apparels/"+ sku + "/b-" + e.target.id +".jpg");
        $j("#front-image-url").val(getBaseURL()+"media/shirtdesigner/images/apparels/"+ sku + "/f-" + e.target.id +".jpg")
        
        $j("#shirt-color").val(e.target.id);
        $j("#main-preview").css("background-image","url('"+getBaseURL()+"media/shirtdesigner/images/apparels/"+ sku + "/f-" + e.target.id +".jpg')");
        $j("#mini-preview").css("background-image","url('"+getBaseURL()+"media/shirtdesigner/images/apparels/"+ sku + "/b-" + e.target.id +".jpg')");
                
    });
     $j("#shirt-type-options > div").click(function(e){
        
        $j("#print-type").val(e.target.id);
        
        console.log($j("#print-type").val());
        
        switch($j("#print-type").val()) {
            case "pressed":
                
                $j("#stitched").removeClass('shirt_type_box_selected');
                $j("#pressed").addClass('shirt_type_box_selected');
                break;
            case "stitched":
                
                $j("#pressed").removeClass('shirt_type_box_selected');
                $j("#stitched").addClass('shirt_type_box_selected');
                break;
        }

    });
     var f_logo = 0, b_logo = 0, r_logo = 0, l_logo = 0,count_logo = 0;;
     
     $j("#logo-options > div").click(function(e){
         switch(active) {
            case "front":
                front.logo = e.target.id;
                if (f_logo == 0){
                     createLogo(front.logo);
                     f_logo ++;
                     count_logo++;
                 }
                 
                $j("#front-logo-type").val(e.target.id);
                
                switch(front.logo) {
                    case "logo-1":
                        $j("#logo-2").removeClass('shirt_type_box_selected');
                        $j("#logo-1").addClass('shirt_type_box_selected');
                        break;
                    case "logo-2":
                        $j("#logo-1").removeClass('shirt_type_box_selected');
                        $j("#logo-2").addClass('shirt_type_box_selected');
                        break;
                }
                break;
            case "back":
                back.logo = e.target.id;
                if (b_logo == 0){
                     createLogo(back.logo);
                     b_logo ++;
                     count_logo++;
                 }
                $j("#back-logo-type").val(e.target.id);
                
                switch(back.logo) {
                    case "logo-1":
                        $j("#logo-2").removeClass('shirt_type_box_selected');
                        $j("#logo-1").addClass('shirt_type_box_selected');
                        break;
                    case "logo-2":
                        $j("#logo-1").removeClass('shirt_type_box_selected');
                        $j("#logo-2").addClass('shirt_type_box_selected');
                        break;
                }
                break;
            case "left":
                left.logo = e.target.id;
                if (l_logo == 0){
                     createLogo(left.logo);
                     l_logo ++;
                     count_logo++;
                 }
                $j("#left-logo-type").val(e.target.id);
                
                switch(left.logo) {
                    case "logo-1":
                        $j("#logo-2").removeClass('shirt_type_box_selected');
                        $j("#logo-1").addClass('shirt_type_box_selected');
                        break;
                    case "logo-2":
                        $j("#logo-1").removeClass('shirt_type_box_selected');
                        $j("#logo-2").addClass('shirt_type_box_selected');
                        break;
                }
                break;
            case "right":
                right.logo = e.target.id;
                if (r_logo == 0){
                     createLogo(right.logo);
                     r_logo ++;
                     count_logo++;
                 }
                $j("#right-logo-type").val(e.target.id);
                
                switch(right.logo) {
                    case "logo-1":
                        $j("#logo-2").removeClass('shirt_type_box_selected');
                        $j("#logo-1").addClass('shirt_type_box_selected');
                        break;
                    case "logo-2":
                        $j("#logo-1").removeClass('shirt_type_box_selected');
                        $j("#logo-2").addClass('shirt_type_box_selected');
                        break;
                }
                break;
        }
        drawLogo(e.target.id);
        

    });
    /******** TEXT EVENTS ********/
    /******** TEXT EVENTS ********/
    /******** TEXT EVENTS ********/
    
    function getTextRectWidth(str) {
        switch (text_style) {
            case "straight":
                return str.length*5;
                break;
            case "arc":
                return str.length*7; 
                break;
            case "circle":
                return str.length*5.8;
                break;
            case "mirror":
                return str.length*5;
                break;
            case "stroke":
                return str.length*5;
                break;
            case "shadow":
                return str.length*5;
                break;
            case "upsidedown":
                return str.length*5;
                break;
            case "vertical1":
                return text_size *1.5;
                break;
            case "vertical2":
                return text_size *1.5;
                break;
      }
    }
    function getTextRectHeight(str) {
        switch (text_style) {
            case "straight":
                return text_size *1.5;
                break;
            case "arc":
                return text_size * (str.length/3.5);
                break;
            case "circle":
                return text_size * (str.length/2);
                break;
            case "mirror":
                return text_size *1.5;
                break;
            case "stroke":
                return text_size *1.5;
                break;
            case "shadow":
                return text_size *1.5;
                break;
            case "upsidedown":
                return text_size *1.5;
                break;
            case "vertical1":
                return str.length*5;
                break;
            case "vertical2":
                return str.length*5;
                break;
      }
    }
    
    /*
     *   Set default values
     */
    $j("#print2").css("display", "none");
    $j("#print3").css("display", "none");
    $j("#print4").css("display", "none");
    $j("#art-canvas2").css("display", "none");
    $j("#art-canvas3").css("display", "none");
    $j("#art-canvas4").css("display", "none");    
    $j("#print-type").val("pressed");
    $j("div.sizes-content").css("display", "none");
    
    var text_size = parseInt($j("#text-size").val());
    var text_font_family = $j("#text-font").val();
    var text_color = "black";
    var text_style = "straight";
    var active_text = "1";
    $j("#front-text-1-size").val(text_size);
    $j("#front-text-1-color").val(text_color);
    $j("#front-text-1-font").val(text_font_family);
    $j("#front-text-1-style").val(text_style);
    
    $j("#front-text-2-size").val(text_size);
    $j("#front-text-2-color").val(text_color);
    $j("#front-text-2-font").val(text_font_family);
    $j("#front-text-2-style").val(text_style);
    
    $j("#front-text-3-size").val(text_size);
    $j("#front-text-3-color").val(text_color);
    $j("#front-text-3-font").val(text_font_family);
    $j("#front-text-3-style").val(text_style);
    
    $j("#back-text-1-size").val(text_size);
    $j("#back-text-1-color").val(text_color);
    $j("#back-text-1-font").val(text_font_family);
    $j("#back-text-1-style").val(text_style);
    
    $j("#back-text-2-size").val(text_size);
    $j("#back-text-2-color").val(text_color);
    $j("#back-text-2-font").val(text_font_family);
    $j("#back-text-2-style").val(text_style);
    
    $j("#back-text-3-size").val(text_size);
    $j("#back-text-3-color").val(text_color);
    $j("#back-text-3-font").val(text_font_family);
    $j("#back-text-3-style").val(text_style);
    
    $j("#left-text-1-size").val(text_size);
    $j("#left-text-1-color").val(text_color);
    $j("#left-text-1-font").val(text_font_family);
    $j("#left-text-1-style").val(text_style);
    
    $j("#left-text-2-size").val(text_size);
    $j("#left-text-2-color").val(text_color);
    $j("#left-text-2-font").val(text_font_family);
    $j("#left-text-2-style").val(text_style);
    
    $j("#left-text-3-size").val(text_size);
    $j("#left-text-3-color").val(text_color);
    $j("#left-text-3-font").val(text_font_family);
    $j("#left-text-3-style").val(text_style);
    
    $j("#right-text-1-size").val(text_size);
    $j("#right-text-1-color").val(text_color);
    $j("#right-text-1-font").val(text_font_family);
    $j("#right-text-1-style").val(text_style);
    
    $j("#right-text-2-size").val(text_size);
    $j("#right-text-2-color").val(text_color);
    $j("#right-text-2-font").val(text_font_family);
    $j("#right-text-2-style").val(text_style);
    
    $j("#right-text-3-size").val(text_size);
    $j("#right-text-3-color").val(text_color);
    $j("#right-text-3-font").val(text_font_family);
    $j("#right-text-3-style").val(text_style);
    
    $j("#text-3").attr("readonly",true);
    $j("#text-2").attr("readonly",true);
    var canvas = document.getElementById('print');
    var canvas2 = document.getElementById('print2');
    var canvas3 = document.getElementById('print3');
    var canvas4 = document.getElementById('print4');
    var context = canvas.getContext('2d');
    var context2 = canvas2.getContext('2d');
    var context3 = canvas3.getContext('2d');
    var context4 = canvas4.getContext('2d');

     
    var state = new CanvasState(canvas,context);
    var state2 = new CanvasState(canvas2,context2);
    var state3 = new CanvasState(canvas3,context3);
    var state4 = new CanvasState(canvas4,context4);
    
    var shape1 = new Shape(0,0, $j("#text-1").val(), text_color,text_style,text_size, text_font_family);
    state.addShape(shape1); 
    var shape2 = new Shape(0,0, $j("#text-2").val(), text_color, text_style, text_size, text_font_family);
    state.addShape(shape2);  
    var shape3 = new Shape(0,0, $j("#text-3").val(), text_color, text_style, text_size, text_font_family);
    state.addShape(shape3);
    
    var shape21 = new Shape(0,0, $j("#text-1").val(), text_color,text_style,text_size, text_font_family);
    state2.addShape(shape21); 
    var shape22 = new Shape(0,0, $j("#text-2").val(), text_color, text_style, text_size, text_font_family);
    state2.addShape(shape22);  
    var shape23 = new Shape(0,0, $j("#text-3").val(), text_color, text_style, text_size, text_font_family);
    state2.addShape(shape23); 
    
    var shape31 = new Shape(0,0, $j("#text-1").val(), text_color,text_style,text_size, text_font_family);
    state3.addShape(shape31); 
    var shape32 = new Shape(0,0, $j("#text-2").val(), text_color, text_style, text_size, text_font_family);
    state3.addShape(shape32);  
    var shape33 = new Shape(0,0, $j("#text-3").val(), text_color, text_style, text_size, text_font_family);
    state3.addShape(shape33); 
    
    var shape41 = new Shape(0,0, $j("#text-1").val(), text_color,text_style,text_size, text_font_family);
    state4.addShape(shape41); 
    var shape42 = new Shape(0,0, $j("#text-2").val(), text_color, text_style, text_size, text_font_family);
    state4.addShape(shape42);  
    var shape43 = new Shape(0,0, $j("#text-3").val(), text_color, text_style, text_size, text_font_family);
    state4.addShape(shape43); 
    
     
/******** TEXT1 ********/
    function textDraw1() {
        
        var canvas = document.getElementById('print');
        
        var x = canvas.width/2;
        var y = 0;
        
        switch(active) {
            case "front":
                console.log('draw1 FRONT' + front.text_1_color);
                text_font_family = front.text_1_font_family;
                text_size = front.text_1_size;
                text_color = front.text_1_color;
                text_style = front.text_1_style;
                
                shape1.fill = text_color;
                shape1.style = text_style;
                shape1.str = $j("#text-1").val();
                shape1.text_size = text_size;
                shape1.font_family = text_font_family;
                shape1.w = getTextRectWidth($j("#text-1").val());
                shape1.h = getTextRectHeight($j("#text-1").val());
                
                state.addShape(shape1);
                break;
                
            case "back":
                text_font_family = back.text_1_font_family;
                text_size = back.text_1_size;
                text_color = back.text_1_color;
                text_style = back.text_1_style;
                
                shape21.fill = text_color;
                shape21.style = text_style;
                shape21.str = $j("#text-1").val();
                shape21.text_size = text_size;
                shape21.font_family = text_font_family;
                shape21.w = getTextRectWidth($j("#text-1").val());
                shape21.h = getTextRectHeight($j("#text-1").val());
                
                state2.addShape(shape21);
                break;
            case "left":
                text_font_family = left.text_1_font_family;
                text_size = left.text_1_size;
                text_color = left.text_1_color;
                text_style = left.text_1_style;
                
                shape31.fill = text_color;
                shape31.style = text_style;
                shape31.str = $j("#text-1").val();
                shape31.text_size = text_size;
                shape31.font_family = text_font_family;
                shape31.w = getTextRectWidth($j("#text-1").val());
                shape31.h = getTextRectHeight($j("#text-1").val());
                
                state3.addShape(shape31);
                break;
            case "right":
                text_font_family = right.text_1_font_family;
                text_size = right.text_1_size;
                text_color = right.text_1_color;
                text_style = right.text_1_style;
                
                shape41.fill = text_color;
                shape41.style = text_style;
                shape41.str = $j("#text-1").val();
                shape41.text_size = text_size;
                shape41.font_family = text_font_family;
                shape41.w = getTextRectWidth($j("#text-1").val());
                shape41.h = getTextRectHeight($j("#text-1").val());
                
                state4.addShape(shape41);
                break;
        }
        
        
       
    }
 /******** TEXT2 ********/  
    function textDraw2() {
        

        var canvas = document.getElementById('print');
        
        var x = canvas.width/2;
        var y = 40;
        
        //layer.remove(box);
        switch(active) {
            case "front":
                text_font_family = front.text_2_font_family;
                text_size = front.text_2_size;
                text_color = front.text_2_color;
                text_style = front.text_2_style;
                
                shape2.fill = text_color;
                shape2.style = text_style;
                shape2.str = $j("#text-2").val();
                shape2.text_size = text_size;
                shape2.font_family = text_font_family;
                shape2.w = getTextRectWidth($j("#text-2").val());
                shape2.h = getTextRectHeight($j("#text-2").val());
                state.addShape(shape2);
                break;
                
            case "back":
                text_font_family = back.text_2_font_family;
                text_size = back.text_2_size;
                text_color = back.text_2_color;
                text_style = back.text_2_style;
                
                shape22.fill = text_color;
                shape22.style = text_style;
                shape22.str = $j("#text-2").val();
                shape22.text_size = text_size;
                shape22.font_family = text_font_family;
                shape22.w = getTextRectWidth($j("#text-2").val());
                shape22.h = getTextRectHeight($j("#text-2").val());
                state2.addShape(shape22);
                break;
            case "left":
                text_font_family = left.text_2_font_family;
                text_size = left.text_2_size;
                text_color = left.text_2_color;
                text_style = left.text_2_style;
                
                shape32.fill = text_color;
                shape32.style = text_style;
                shape32.str = $j("#text-2").val();
                shape32.text_size = text_size;
                shape32.font_family = text_font_family;
                shape32.w = getTextRectWidth($j("#text-2").val());
                shape32.h = getTextRectHeight($j("#text-2").val());
                
                state3.addShape(shape32);
                break;
            case "right":
                text_font_family = right.text_2_font_family;
                text_size = right.text_2_size;
                text_color = right.text_2_color;
                text_style = right.text_2_style;
                
                shape42.fill = text_color;
                shape42.style = text_style;
                shape42.str = $j("#text-2").val();
                shape42.text_size = text_size;
                shape42.font_family = text_font_family;
                shape42.w = getTextRectWidth($j("#text-2").val());
                shape42.h = getTextRectHeight($j("#text-2").val());
                
                state4.addShape(shape42);
                break;
        }
        
        
    }
 /******** TEXT3 ********/   
    function textDraw3() {
        
        var canvas = document.getElementById('print');
        
        var x = canvas.width/2;
        var y = 80 ;
        
        //layer.remove(box);
        switch(active) {
            case "front":
                text_font_family = front.text_3_font_family;
                text_size = front.text_3_size;
                text_color = front.text_3_color;
                text_style = front.text_3_style;
                
                shape3.fill = text_color;
                shape3.style = text_style;
                shape3.str = $j("#text-3").val();
                shape3.text_size = text_size;
                shape3.font_family = text_font_family;
                shape3.w = getTextRectWidth($j("#text-3").val());
                shape3.h = getTextRectHeight($j("#text-3").val());
                state.addShape(shape3);
                break;
                
            case "back":
                text_font_family = back.text_3_font_family;
                text_size = back.text_3_size;
                text_color = back.text_3_color;
                text_style = back.text_3_style;
                
                shape23.fill = text_color;
                shape23.style = text_style;
                shape23.str = $j("#text-3").val();
                shape23.text_size = text_size;
                shape23.font_family = text_font_family;
                shape23.w = getTextRectWidth($j("#text-3").val());
                shape23.h = getTextRectHeight($j("#text-3").val());
                state2.addShape(shape23);
                break;
            case "left":
                text_font_family = left.text_3_font_family;
                text_size = left.text_3_size;
                text_color = left.text_3_color;
                text_style = left.text_3_style;
                
                shape33.fill = text_color;
                shape33.style = text_style;
                shape33.str = $j("#text-3").val();
                shape33.text_size = text_size;
                shape33.font_family = text_font_family;
                shape33.w = getTextRectWidth($j("#text-3").val());
                shape33.h = getTextRectHeight($j("#text-3").val());
                
                state3.addShape(shape33);
                break;
            case "right":
                text_font_family = right.text_3_font_family;
                text_size = right.text_3_size;
                text_color = right.text_3_color;
                text_style = right.text_3_style;
                
                shape43.fill = text_color;
                shape43.style = text_style;
                shape43.str = $j("#text-3").val();
                shape43.text_size = text_size;
                shape43.font_family = text_font_family;
                shape43.w = getTextRectWidth($j("#text-3").val());
                shape43.h = getTextRectHeight($j("#text-3").val());
                
                state4.addShape(shape43);
                break;
        }
        
    }
    $j("#text-size").change(function () {
        text_size = parseInt($j("#text-size").val());
        switch(active) {
            case "front":
                
                switch (active_text) {
                    case "1":
                        front.text_1_size = text_size;
                        $j("#front-text-1-size").val(front.text_1_size);
                        textDraw1();
                        break;
                    case "2":
                        front.text_2_size = text_size;
                        $j("#front-text-2-size").val(front.text_2_size);
                        textDraw2();
                        break;
                    case "3":
                        front.text_3_size = text_size;
                        $j("#front-text-3-size").val(front.text_3_size);
                        textDraw3();
                        break;
                }
                
                break;
                
            case "back":
                switch (active_text) {
                    case "1":
                        back.text_1_size = text_size;
                        $j("#back-text-1-size").val(back.text_1_size);
                        textDraw1();
                        break;
                    case "2":
                        back.text_2_size = text_size;
                        $j("#back-text-2-size").val(back.text_2_size);
                        textDraw2();
                        break;
                    case "3":
                        back.text_3_size = text_size;
                        $j("#back-text-3-size").val(back.text_3_size);
                        textDraw3();
                        break;
                }
                break;
            case "left":
                switch (active_text) {
                    case "1":
                        left.text_1_size = text_size;
                        $j("#left-text-1-size").val(left.text_1_size);
                        textDraw1();
                        break;
                    case "2":
                        left.text_2_size = text_size;
                        $j("#left-text-2-size").val(left.text_2_size);
                        textDraw2();
                        break;
                    case "3":
                        left.text_3_size = text_size;
                        $j("#left-text-3-size").val(left.text_3_size);
                        textDraw3();
                        break;
                }
                break;
            case "right":
                switch (active_text) {
                    case "1":
                        right.text_1_size = text_size;
                        $j("#right-text-1-size").val(right.text_1_size);
                        textDraw1();
                        break;
                    case "2":
                        right.text_2_size = text_size;
                        $j("#right-text-2-size").val(right.text_2_size);
                        textDraw2();
                        break;
                    case "3":
                        right.text_3_size = text_size;
                        $j("#right-text-3-size").val(right.text_3_size);
                        textDraw3();
                        break;
                }
                break;
        }
        
    });
    
    $j("#text-font").change(function () {
        text_font_family = $j("#text-font").val();
        
        switch(active) {
            case "front":
                
                switch (active_text) {
                    case "1":
                        front.text_1_font_family = text_font_family;
                        $j("#front-text-1-font").val(front.text_1_font_family);
                        textDraw1();
                        break;
                    case "2":
                        front.text_2_font_family = text_font_family;
                        $j("#front-text-2-font").val(front.text_2_font_family);
                        textDraw2();
                        break;
                    case "3":
                        front.text_3_font_family = text_font_family;
                        $j("#front-text-3-font").val(front.text_3_font_family);
                        textDraw3();
                        break;
                }
                
                break;
                
            case "back":
                switch (active_text) {
                    case "1":
                        back.text_1_font_family = text_font_family;
                        $j("#back-text-1-font").val(back.text_1_font_family);
                        textDraw1();
                        break;
                    case "2":
                        back.text_2_font_family = text_font_family;
                        $j("#back-text-2-font").val(back.text_2_font_family);
                        textDraw2();
                        break;
                    case "3":
                        back.text_3_font_family = text_font_family;
                        $j("#back-text-3-font").val(back.text_3_font_family);
                        textDraw3();
                        break;
                }
                break;
            case "left":
                switch (active_text) {
                    case "1":
                        left.text_1_font_family = text_font_family;
                        $j("#left-text-1-font").val(left.text_1_font_family);
                        textDraw1();
                        break;
                    case "2":
                        left.text_2_font_family = text_font_family;
                        $j("#left-text-2-font").val(left.text_2_font_family);
                        textDraw2();
                        break;
                    case "3":
                        left.text_3_font_family = text_font_family;
                        $j("#left-text-3-font").val(left.text_3_font_family);
                        textDraw3();
                        break;
                }
                break;
            case "right":
                switch (active_text) {
                    case "1":
                        right.text_1_font_family = text_font_family;
                        $j("#right-text-1-font").val(right.text_1_font_family);
                        textDraw1();
                        break;
                    case "2":
                        right.text_2_font_family = text_font_family;
                        $j("#right-text-2-font").val(right.text_2_font_family);
                        textDraw2();
                        break;
                    case "3":
                        right.text_3_font_family = text_font_family;
                        $j("#right-text-3-font").val(right.text_3_font_family);
                        textDraw3();
                        break;
                }
                break;
        }
        
    });
    
    $j(".text-color-selections > div").click(function(e){
        text_color = "#"+e.target.id;
        console.log( '.text-color-selections > div' + active_text);
        
        switch(active) {
            case "front":
                
                switch (active_text) {
                    case "1":
                        console.log("front change color " + text_color);
                        front.text_1_color = text_color;
                        $j("#front-text-1-color").val(front.text_1_color);
                        textDraw1();
                        break;
                    case "2":
                        front.text_2_color = text_color;
                        $j("#front-text-2-color").val(front.text_2_color);
                        textDraw2();
                        break;
                    case "3":
                        front.text_3_color = text_color;
                        $j("#front-text-3-color").val(front.text_3_color);
                        textDraw3();
                        break;
                }
                
                break;
                
            case "back":
                console.log("back change color");
                switch (active_text) {
                    case "1":
                        back.text_1_color = text_color;
                        $j("#back-text-1-color").val(back.text_1_color);
                        textDraw1();
                        break;
                    case "2":
                        back.text_2_color = text_color;
                        $j("#back-text-2-color").val(back.text_2_color);
                        textDraw2();
                        break;
                    case "3":
                        back.text_3_color = text_color;
                        $j("#back-text-3-color").val(back.text_3_color);
                        textDraw3();
                        break;
                }
                break;
            case "left":
                switch (active_text) {
                    case "1":
                        left.text_1_color = text_color;
                        $j("#left-text-1-color").val(left.text_1_color);
                        textDraw1();
                        break;
                    case "2":
                        left.text_2_color = text_color;
                        $j("#left-text-2-color").val(left.text_2_color);
                        textDraw2();
                        break;
                    case "3":
                        left.text_3_color = text_color;
                        $j("#left-text-3-color").val(left.text_3_color);
                        textDraw3();
                        break;
                }
                break;
            case "right":
                switch (active_text) {
                    case "1":
                        right.text_1_color = text_color;
                        $j("#right-text-1-color").val(right.text_1_color);
                        textDraw1();
                        break;
                    case "2":
                        right.text_2_color = text_color;
                        $j("#right-text-2-color").val(right.text_2_color);
                        textDraw2();
                        break;
                    case "3":
                        right.text_3_color = text_color;
                        $j("#right-text-3-color").val(right.text_3_color);
                        textDraw3();
                        break;
                }
                break;
        }
        
     });
     
     
    $j("#text-style").change(function () {
        
        switch(active) {
            case "front":
                
                switch (active_text) {
                    case "1":
                        front.text_1_style = $j("#text-style").val();
                        $j("#front-text-1-style").val(front.text_1_style);
                        textDraw1();
                        break;
                    case "2":
                        front.text_2_style = $j("#text-style").val();
                        $j("#front-text-2-style").val(front.text_2_style);
                        textDraw2();
                        break;
                    case "3":
                        front.text_3_style = $j("#text-style").val();
                        $j("#front-text-3-style").val(front.text_3_style);
                        textDraw3();
                        break;
                }
                
                break;
                
            case "back":
                switch (active_text) {
                    case "1":
                        back.text_1_style = $j("#text-style").val();
                        $j("#back-text-1-style").val(back.text_1_style);
                        textDraw1();
                        break;
                    case "2":
                        back.text_2_style = $j("#text-style").val();
                        $j("#back-text-2-style").val(back.text_2_style);
                        textDraw2();
                        break;
                    case "3":
                        back.text_3_style = $j("#text-style").val();
                        $j("#back-text-3-style").val(back.text_3_style);
                        textDraw3();
                        break;
                }
                break;
            case "left":
                switch (active_text) {
                    case "1":
                        left.text_1_style = $j("#text-style").val();
                        $j("#left-text-1-style").val(left.text_1_style);
                        textDraw1();
                        break;
                    case "2":
                        left.text_2_style = $j("#text-style").val();
                        $j("#left-text-2-style").val(left.text_2_style);
                        textDraw2();
                        break;
                    case "3":
                        left.text_3_style = $j("#text-style").val();
                        $j("#left-text-3-style").val(left.text_3_style);
                        textDraw3();
                        break;
                }
                break;
            case "right":
                switch (active_text) {
                    case "1":
                        right.text_1_style = $j("#text-style").val();
                        $j("#right-text-1-style").val(right.text_1_style);
                        textDraw1();
                        break;
                    case "2":
                        right.text_2_style = $j("#text-style").val();
                        $j("#right-text-2-style").val(right.text_2_style);
                        textDraw2();
                        break;
                    case "3":
                        right.text_3_style = $j("#text-style").val();
                        $j("#right-text-3-style").val(right.text_3_style);
                        textDraw3();
                        break;
                }
                break;
        }
        
    });
    
    $j("#text-1").keyup(function(e,val){
        console.log($j("#text-1").val());
        switch(active) {
            case "front":
                front.text_1 = $j("#text-1").val();
                $j("#front-text-1").val($j("#text-1").val());
                break;
            case "back":
                back.text_1 = $j("#text-1").val();
                $j("#back-text-1").val($j("#text-1").val());
                break;
            case "left":
                left.text_1 = $j("#text-1").val();
                $j("#left-text-1").val($j("#text-1").val());
                break;
            case "right":
                right.text_1 = $j("#text-1").val();
                $j("#right-text-1").val($j("#text-1").val());
                break;
        }
        textDraw1();
    });
    
    $j("#text-2").keyup(function(e,val){
        console.log($j("#text-2").val());
        switch(active) {
            case "front":
                front.text_2 = $j("#text-2").val();
                $j("#front-text-2").val($j("#text-2").val());
                break;
            case "back":
                back.text_2 = $j("#text-2").val();
                $j("#back-text-2").val($j("#text-2").val());
                break;
            case "left":
                left.text_2 = $j("#text-2").val();
                $j("#left-text-2").val($j("#text-2").val());
                break;
            case "right":
                right.text_2 = $j("#text-2").val();
                $j("#right-text-2").val($j("#text-2").val());
                break;
        }
        textDraw2();
    });
    
    $j("#text-3").keyup(function(e,val){
        console.log($j("#text-3").val());
        switch(active) {
            case "front":
                front.text_3 = $j("#text-3").val();
                $j("#front-text-3").val($j("#text-3").val());
                break;
            case "back":
                back.text_3 = $j("#text-3").val();
                $j("#back-text-3").val($j("#text-3").val());
                break;
            case "left":
                left.text_3 = $j("#text-3").val();
                $j("#left-text-3").val($j("#text-3").val());
                break;
            case "right":
                right.text_3 = $j("#text-3").val();
                $j("#right-text-3").val($j("#text-3").val());
                break;
        }
        textDraw3();
    });
    
    $j("#art-category").change(function () {
        
        var categories = new Array("animals","fitness","floral","fruits","gifts","military","miscellaneous","music","party","people","shapes","sports","techno","valentine");
        art_category = $j("#art-category").val();
        
        for (var i = 0; i < categories.length; i++) {
            var x = "#"+categories[i];
            $j(x).css("display", "none");
        }
        
        var id = "#"+ art_category;
        $j(id).css("display", "block");
        
    });
    
    /******** ART EVENTS ********/
    /******** ART EVENTS ********/
    /******** ART EVENTS ********/
    var art_color = "blue";
    var art_canvas_id;
    var art_element_id;
    var art_size = $j("#art-size").val();
    
    $j("#art-size").change(function () {
        art_canvas_id = highlighted_art_id;
        art_element_id = highlighted_art_id.substr(1,highlighted_art_id.length) + '.png';
        
        var e = document.getElementById(highlighted_art_id);
        
        switch($j("#art-size").val()){
            case "small":
                e.height = 25;
                e.width = 25;
                break;
            case "medium":
                e.height = 50;
                e.width = 50;
                break;
            case "large":
                e.height = 100;
                e.width = 100;
                break;
            
        }
        drawArt();
    });
    
    $j("#image-size").change(function () {
        art_canvas_id = highlighted_art_id;
        art_element_id = highlighted_art_id.substr(1,highlighted_art_id.length);// + '.png';
        
        var inputs = document.getElementsByTagName("img");
        for (var i = 0; i < inputs.length; i++) {
          if(inputs[i].id.indexOf(art_element_id) == 0)
                art_element_id = inputs[i].id;
        }

        var e = document.getElementById(highlighted_art_id);
        
        switch($j("#image-size").val()){
            case "small":
                e.height = 25;
                e.width = 25;
                break;
            case "medium":
                e.height = 50;
                e.width = 50;
                break;
            case "large":
                e.height = 100;
                e.width = 100;
                break;
            
        }
        drawImage();
        
    });
    
    function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
    function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
    function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
    function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
    function getArtSize() {
        switch($j("#art-size").val()){
            case "small":
                return 25;
                break;
            case "medium":
                return 50;
                break;
            case "large":
                return 100;
                break;
            
        }
    }
    
    function drawArt() {
        
        var art_canvas = document.getElementById(art_canvas_id);
        var art_context = art_canvas.getContext('2d');
        
        var art = art_canvas_id.split('-');
        art[0] = art[0].substr(1,art[0].length);
        
        var img_path = "media/shirtdesigner/images/art/"+ art[0] + "/"+ art_element_id;
        var img= new Image();
        
        img.src= img_path;
        art_context.clearRect(0, 0, getArtSize(), getArtSize());
        art_context.drawImage(img, 0, 0, getArtSize(), getArtSize());
        
        var imgd = art_context.getImageData(0, 0, getArtSize(), getArtSize()),
        pix = imgd.data;

        // Loops through all of the pixels and modifies the components.
        for (var i = 0, n = pix.length; i <n; i += 4) {
              
              pix[i] = hexToR(art_color);
              pix[i+1] = hexToG(art_color);
              pix[i+2] = hexToB(art_color);
              //pix[i+3] is the transparency.
        }
        art_context.putImageData(imgd, 0, 0);
        
    }
    
    
    $j(".art-images > img").click(function(e){
        art_element_id = e.target.id;
        
        art_canvas_id = art_element_id.split('.');
        art_canvas_id = art_canvas_id[0];
        
        switch(active){
            case "front":
                art_canvas_id = "f"+ art_canvas_id;
                break;
            case "back":
                art_canvas_id = "b"+ art_canvas_id;
                break;
            case "left":
                art_canvas_id = "l"+ art_canvas_id;
                break;
            case "right":
                art_canvas_id = "r"+ art_canvas_id;
                break;
        }
        
        
        if ($j('#'+art_canvas_id).length > 0 ) {
            drawArt();
        }else {
            
            var c = document.createElement("canvas");
            c.id= art_canvas_id;
            c.width=getArtSize();
            c.height=getArtSize(); 
            c.setAttribute('ondblclick', 'removeCanvasImage("'+art_canvas_id+'")');
            c.setAttribute('onclick', 'highlightCanvasImage("'+art_canvas_id+'")');
            
            highlighted_art_id = art_canvas_id;
            
            
            switch(active){
                case "front":
                    $j("#art-canvas canvas").removeClass();
                    c.setAttribute('class','highlight-canvas-image');
                    document.getElementById('art-canvas').appendChild(c);
                    break;
                case "back":
                    $j("#art-canvas2 canvas").removeClass();
                    c.setAttribute('class','highlight-canvas-image');
                    document.getElementById('art-canvas2').appendChild(c);
                    break;
                case "left":
                    $j("#art-canvas3 canvas").removeClass();
                    c.setAttribute('class','highlight-canvas-image');
                    document.getElementById('art-canvas3').appendChild(c);
                    break;
                case "right":
                    $j("#art-canvas4 canvas").removeClass();
                    c.setAttribute('class','highlight-canvas-image');
                    document.getElementById('art-canvas4').appendChild(c);
                    break;
            }
            
            $j("#" + art_canvas_id).draggable();
            
            drawArt();
        }
        
     });
     
     $j(".art-color-selections > div").click(function(e){
        art_color = "#"+e.target.id;
        art_canvas_id = highlighted_art_id;
        art_element_id = highlighted_art_id.substr(1,highlighted_art_id.length) + '.png';
        
        drawArt();
     });
     
     /******** ART EVENTS ********/
     /******** ART EVENTS ********/
     /******** ART EVENTS ********/
     
     function getImageSize() {
        switch($j("#image-size").val()){
            case "small":
                return 25;
                break;
            case "medium":
                return 50;
                break;
            case "large":
                return 100;
                break;
            
        }
    }
    
        
        
     var logo_canvas;
     function createLogo(logo){
        logo_canvas = document.createElement("canvas");
        //alert("create logo");
        logo_canvas.width= 60;
        logo_canvas.height=25; 
            
        switch(active){
            case "front":
                logo_canvas.id= "f"+logo;
                logo_canvas.setAttribute('ondblclick', 'removeCanvasImage("'+logo_canvas.id+'")');
                document.getElementById('art-canvas').appendChild(logo_canvas);
                $j("#f"+logo).draggable();
                break;
            case "back":
                logo_canvas.id= "b"+logo;
                logo_canvas.setAttribute('ondblclick', 'removeCanvasImage("'+logo_canvas.id+'")');
                document.getElementById('art-canvas2').appendChild(logo_canvas);
                $j("#b"+logo).draggable();
                break;
            case "left":
                logo_canvas.id= "l"+logo;
                logo_canvas.setAttribute('ondblclick', 'removeCanvasImage("'+logo_canvas.id+'")');
                document.getElementById('art-canvas3').appendChild(logo_canvas);
                $j("#l"+logo).draggable();
                break;
            case "right":
                logo_canvas.id= "r"+logo;
                logo_canvas.setAttribute('ondblclick', 'removeCanvasImage("'+logo_canvas.id+'")');
                document.getElementById('art-canvas4').appendChild(logo_canvas);
                $j("#r"+logo).draggable();
                break;
        }
        
     }
     function drawLogo(id) {
        
        var logo_context = logo_canvas.getContext('2d');
        var img_path = "media/shirtdesigner/images/logo/"+id+".png";
        
        var img= new Image();
        img.src= img_path;
        img.onload = function () {
            logo_context.clearRect(0,0,60,25);
            logo_context.drawImage(img,0,0,60,25);
        };
        
        var imgd = logo_context.getImageData(0, 0, 60,25),
        pix = imgd.data;
        logo_context.putImageData(imgd, 0, 0);
        
        
     }
     var image_canvas_id;
     var image_element_id;
     
     function drawImage() {
        var image_canvas = document.getElementById(image_canvas_id);
        var image_context = image_canvas.getContext('2d');
        
        var img_path = "media/shirtdesigner/images/uploads/"+ image_element_id;
        
        var img= new Image();
        img.src= img_path;
        image_context.clearRect(0,0,getImageSize(),getImageSize());
        image_context.drawImage(img,0,0,getImageSize(),getImageSize());
        
        var imgd = image_context.getImageData(0, 0, getImageSize(), getImageSize()),
        pix = imgd.data;
        image_context.putImageData(imgd, 0, 0);
        
    }
    
     $j(".upload-images > img").click(function(e){
         
        image_element_id = e.target.id;
        image_canvas_id = image_element_id.split('.');
        image_canvas_id = image_canvas_id[0];
        
        switch(active){
            case "front":
                image_canvas_id = "f"+ image_canvas_id;
                break;
            case "back":
                image_canvas_id = "b"+ image_canvas_id;
                break;
            case "left":
                image_canvas_id = "l"+ image_canvas_id;
                break;
            case "right":
                image_canvas_id = "r"+ image_canvas_id;
                break;
        }
        
        if ($j('#'+image_canvas_id).length > 0 ) {
            drawImage();
        }else {
            
            var c = document.createElement("canvas");
            c.id= image_canvas_id;
            c.width= getImageSize();//100;
            c.height=getImageSize();//100; 
            c.setAttribute('ondblclick', 'removeCanvasImage("'+image_canvas_id+'")');
            c.setAttribute('onclick', 'highlightCanvasImage("'+image_canvas_id+'")');
            
            highlighted_art_id = image_canvas_id;
            $j("#image-canvas canvas").removeClass();
            c.setAttribute('class','highlight-canvas-image');
            
            switch(active){
                case "front":
                    document.getElementById('art-canvas').appendChild(c);
                    break;
                case "back":
                    document.getElementById('art-canvas2').appendChild(c);
                    break;
                case "left":
                    document.getElementById('art-canvas3').appendChild(c);
                    break;
                case "right":
                    document.getElementById('art-canvas4').appendChild(c);
                    break;
            }
            highlighted_art_id = image_canvas_id;
            $j("#art-canvas canvas").removeClass();
            $j("#" + image_canvas_id).addClass("highlight-canvas-image");
            
            $j("#" + image_canvas_id).draggable();
            drawImage();
        }
        
     });
    
    
    // RADIO BUTTONS for text selection
    $j('.text-selection').change(function(e) {
        
        switch (e.target.id) {
            case "text-selection-1":
                /*$j("#text-1").prop("readonly",false);
                $j("#text-2").prop("readonly",true);
                $j("#text-3").prop("readonly",true);
                */
                $j("#text-1").removeAttr("readonly");
                $j("#text-2").attr("readonly",true);
                $j("#text-3").attr("readonly",true);
                
                active_text = "1";
                break;
            case "text-selection-2":
                $j("#text-1").attr("readonly",true);
                $j("#text-2").removeAttr("readonly");
                $j("#text-3").attr("readonly",true);
                active_text = "2";
                break;
            case "text-selection-3":
                $j("#text-1").attr("readonly",true);
                $j("#text-2").attr("readonly",true);
                $j("#text-3").removeAttr("readonly");
                active_text = "3";
                break;
        }
        
        switch(active) {
            case "front":
                switch (active_text) {
                    case "1":
                        $j("#text-size").val(front.text_1_size);
                        $j("#text-style").val(front.text_1_style);
                        $j("#text-font").val(front.text_1_font_family);
                        break;
                    case "2":
                        $j("#text-size").val(front.text_2_size);
                        $j("#text-style").val(front.text_2_style);
                        $j("#text-font").val(front.text_2_font_family);
                        break;
                    case "3":
                        $j("#text-size").val(front.text_3_size);
                        $j("#text-style").val(front.text_3_style);
                        $j("#text-font").val(front.text_3_font_family);
                        break;
                }
                break;
                
            case "back":
                switch (active_text) {
                    case "1":
                        
                        $j("#text-size").val(back.text_1_size);
                        $j("#text-style").val(back.text_1_style);
                        $j("#text-font").val(back.text_1_font_family);

                    case "2":
                        $j("#text-size").val(back.text_2_size);
                        $j("#text-style").val(back.text_2_style);
                        $j("#text-font").val(back.text_2_font_family);
                        break;
                    case "3":
                        $j("#text-size").val(back.text_3_size);
                        $j("#text-style").val(back.text_3_style);
                        $j("#text-font").val(back.text_3_font_family);
                        break;
                }
                break;
            case "left":
                switch (active_text) {
                    case "1":
                        
                        $j("#text-size").val(left.text_1_size);
                        $j("#text-style").val(left.text_1_style);
                        $j("#text-font").val(left.text_1_font_family);

                    case "2":
                        $j("#text-size").val(left.text_2_size);
                        $j("#text-style").val(left.text_2_style);
                        $j("#text-font").val(left.text_2_font_family);
                        break;
                    case "3":
                        $j("#text-size").val(left.text_3_size);
                        $j("#text-style").val(left.text_3_style);
                        $j("#text-font").val(left.text_3_font_family);
                        break;
                }
                break;
            case "right":
                switch (active_text) {
                    case "1":
                        
                        $j("#text-size").val(right.text_1_size);
                        $j("#text-style").val(right.text_1_style);
                        $j("#text-font").val(right.text_1_font_family);

                    case "2":
                        $j("#text-size").val(right.text_2_size);
                        $j("#text-style").val(right.text_2_style);
                        $j("#text-font").val(right.text_2_font_family);
                        break;
                    case "3":
                        $j("#text-size").val(right.text_3_size);
                        $j("#text-style").val(right.text_3_style);
                        $j("#text-font").val(right.text_3_font_family);
                        break;
                }
                break;
        }
    });
    
    $j("#show-boundary").change(function () {
        
        if($j("#show-boundary").is(':checked')){
            $j("#print").addClass("bordered");
            $j("#print2").addClass("bordered");
            
        }else {
            $j("#print").removeClass("bordered");
            $j("#print2").removeClass("bordered");
        }    
    });
    
    $j('.submit').click(function(e) {
        if(count_logo == 0) {
            alert("Gush logo must be present");
        } else if (($j("#s").val() == "") && ($j("#m").val() == "") && ($j("#l").val() == "") && ($j("#xl").val() == "")){
            alert("Please choose shirt size");
        } else {
        $j("#s-size").val($j("#s").val());
        $j("#m-size").val($j("#m").val());
        $j("#l-size").val($j("#l").val());
        $j("#xl-size").val($j("#xl").val());
        
        $j("#art-canvas").css("display", "block");
        $j("#art-canvas2").css("display", "block");
        $j("#art-canvas3").css("display", "block");
        $j("#art-canvas4").css("display", "block");
        
        $j("#art-canvas canvas").removeClass('.highlight-canvas-image');
       
        var i = document.createElement("input");
        i.className= "art-input";
        i.type = "hidden";
        i.name = "testinput";
        document.getElementById('checkout-design').appendChild(i);
         
        // FRONT/OUTPUT
        var output = document.getElementById('output');
        var context = output.getContext('2d');
        
        var children = document.getElementById('art-canvas').childNodes;
        var ids = new Array();
        for (var c in children){
            if(children[c].id != null   ){
                ids[c] = children[c].id.substr(1,children[c].id.length);//children[c].id;
                var canvas = document.getElementById(children[c].id);
                console.log("FRONT"+($j("#"+children[c].id).position().left)+","+($j("#"+children[c].id).position().top));
                context.drawImage(canvas, ($j("#"+children[c].id).position().left), ($j("#"+children[c].id).position().top));
            }
        }
        
        var arts = document.createElement('input');
        arts.type = "hidden";
        arts.name = "arts";
        arts.value = ids;
        document.getElementById('checkout-design').appendChild(arts);
        
        var printcanvas = document.getElementById('print');
        context.drawImage(printcanvas, 0, 0);
        var savedImageData = document.getElementById("output_image");
        savedImageData.src = output.toDataURL("image/png");
        
        
        // BACK/OUTPUT2
        var output2 = document.getElementById('output2');
        var context2 = output2.getContext('2d');
        
        var children2 = document.getElementById('art-canvas2').childNodes;
        var ids2 = new Array();
        for (var c in children2){
            if(children2[c].id != null   ){
                ids2[c] = children2[c].id.substr(1,children2[c].id.length);
                var canvas2 = document.getElementById(children2[c].id);
                console.log("BACK"+($j("#"+children2[c].id).position().left)+","+($j("#"+children2[c].id).position().top));
                context2.drawImage(canvas2, ($j("#"+children2[c].id).position().left), ($j("#"+children2[c].id).position().top)); //73
            }
        }
        
        var arts2 = document.createElement('input');
        arts2.type = "hidden";
        arts2.name = "arts2";
        arts2.value = ids2;
        document.getElementById('checkout-design').appendChild(arts2);
        
        var printcanvas2 = document.getElementById('print2');
        context2.drawImage(printcanvas2, 0, 0);
        var savedImageData2 = document.getElementById("output2_image");
        savedImageData2.src = output2.toDataURL("image/png");
        
        
        // LEFT/OUTPUT3
        var output3 = document.getElementById('output3');
        var context3 = output3.getContext('2d');
        
        var children3 = document.getElementById('art-canvas3').childNodes;
        var ids3 = new Array();
        for (var c in children3){
            if(children3[c].id != null   ){
                ids3[c] = children3[c].id.substr(1,children3[c].id.length);
                var canvas3 = document.getElementById(children3[c].id);
                console.log("LEFT"+($j("#"+children3[c].id).position().left)+","+($j("#"+children3[c].id).position().top));
                context3.drawImage(canvas3, ($j("#"+children3[c].id).position().left ), ($j("#"+children3[c].id).position().top)); //73
                
            }
        }
        
        var arts3 = document.createElement('input');
        arts3.type = "hidden";
        arts3.name = "arts3";
        arts3.value = ids3;
        document.getElementById('checkout-design').appendChild(arts3);
        
        var printcanvas3 = document.getElementById('print3');
        context3.drawImage(printcanvas3, 0, 0);
        var savedImageData3 = document.getElementById("output3_image");
        savedImageData3.src = output3.toDataURL("image/png");
        
        
        // RIGHT/OUTPUT4
        var output4 = document.getElementById('output4');
        var context4 = output4.getContext('2d');
        
        var children4 = document.getElementById('art-canvas4').childNodes;
        var ids4 = new Array();
        
        for (var c in children4){
            if(children4[c].id != null   ){
                ids4[c] = children4[c].id.substr(1,children4[c].id.length);
                var canvas4 = document.getElementById(children4[c].id);
                console.log(c);
                console.log("RIGHT"+($j("#"+children4[c].id).position().left )+","+($j("#"+children4[c].id).position().top));
                context4.drawImage(canvas4, ($j("#"+children4[c].id).position().left), ($j("#"+children4[c].id).position().top-394)); //73
            }
        }
        
        var arts4 = document.createElement('input');
        arts4.type = "hidden";
        arts4.name = "arts4";
        arts4.value = ids4;
        document.getElementById('checkout-design').appendChild(arts4);
        
        var printcanvas4 = document.getElementById('print4');
        context4.drawImage(printcanvas4, 0, 0);
        var savedImageData4 = document.getElementById("output4_image");
        savedImageData4.src = output4.toDataURL("image/png");
        
        
        // FINAL FRONT IMAGE
        var ff_canvas = document.getElementById('final-output');
        var ff_context = ff_canvas.getContext('2d');
        var ff_path = $j("#front-image-url").val();
        
        var ff_img= new Image();
        ff_img.src= ff_path;
        ff_context.clearRect(0,0,374,394);
        ff_img.onload = function () {
            ff_context.drawImage(ff_img,0,0,374,394);
            ff_context.drawImage(output, 0,0 );
            $j("#front-image-code").val(ff_canvas.toDataURL("image/png"));
            var reviewFront = document.getElementById("review-front");
            reviewFront.src = ff_canvas.toDataURL("image/png");
        };
        
        // FINAL BACK IMAGE
        var fb_canvas = document.getElementById('final-output2');
        var fb_context = fb_canvas.getContext('2d');
        var fb_path = $j("#back-image-url").val();
        
        var fb_img= new Image();
        fb_img.src= fb_path;
        fb_context.clearRect(0,0,374,394);
        fb_img.onload = function() {
            fb_context.drawImage(fb_img,0,0,374,394);
            fb_context.drawImage(output2, 0, 0);
            $j("#back-image-code").val(fb_canvas.toDataURL("image/png"));
            var reviewBack = document.getElementById("review-back");
            reviewBack.src = fb_canvas.toDataURL("image/png");
        };
        
        // FINAL LEFT IMAGE
        var fl_canvas = document.getElementById('final-output3');
        var fl_context = fl_canvas.getContext('2d');
        var fl_path = $j("#left-image-url").val();
        
        var fl_img= new Image();
        fl_img.src= fl_path;
        fl_context.clearRect(0,0,374,394);
        fl_img.onload = function() {
            fl_context.drawImage(fl_img,0,0,374,394);
            fl_context.drawImage(output3, 0, 0);
            $j("#left-image-code").val(fl_canvas.toDataURL("image/png"));
            var reviewLeft = document.getElementById("review-left");
            reviewLeft.src = fl_canvas.toDataURL("image/png");
        };
        
        // FINAL RIGHT IMAGE
        var fr_canvas = document.getElementById('final-output4');
        var fr_context = fr_canvas.getContext('2d');
        var fr_path = $j("#right-image-url").val();
        
        var fr_img= new Image();
        fr_img.src= fr_path;
        fr_context.clearRect(0,0,374,394);
        fr_img.onload = function() {
            fr_context.drawImage(fr_img,0,0,374,394);
            fr_context.drawImage(output4, 0, 0);
            $j("#right-image-code").val(fr_canvas.toDataURL("image/png"));
            var reviewRight = document.getElementById("review-right");
            reviewRight.src = fr_canvas.toDataURL("image/png");
            
            review();
        };
        
        }
        
    });
    
    function review(){
	var thediv=document.getElementById('reviewbox');
        thediv.style.display = "";
    }
    
    $j('#submitfinal').click(function(e) {
        $j("#checkout-design").submit();
    });
    $j('#cancel').click(function(e) {
        var thediv=document.getElementById('reviewbox');
        thediv.style.display = "none";
    });
            
     
});


