String.prototype.replaceAt=function(index, c) {
  return this.substr(0, index) + c + this.substr(index+c.length);
}

function Record() {
    this.text_1 = "";
    this.text_1_font_family = "Arial";
    this.text_1_size = 12;
    this.text_1_color = "#000000";
    this.text_1_style = "straight";
    
    this.text_2 = "";
    this.text_2_font_family = "Arial";
    this.text_2_size = 12;
    this.text_2_color = "#000000";
    this.text_2_style = "straight";
    
    this.text_3 = "";
    this.text_3_font_family = "Arial";
    this.text_3_size = 12;
    this.text_3_color = "#000000";
    this.text_3_style = "straight";
    
    this.art = new Array();
    this.images = new Array();
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
    $j("#i-" + e).remove();
    updatePrice();
}
function updatePrice() {
         
        var text_parts=0, parts = 0, print_front=0, print_back = 0, print_left = 0, print_right = 0, full_color=0, text_full_color = 0;
        var art_colors = new Array();
        var text_colors = new Array();
        var front_outside = 0, back_outside = 0, left_outside = 0, right_outside = 0;
        
        console.log("original price:"+ $j("#original-price").val());
       
        var price = $j("#original-price").val();
        price = Number(new String(price.replace(",","")));
        
        // Checking for multiple colors used in the text
        console.log("getting colors of PRINT")
        var text_canvas = document.getElementById("print");
        var text_context = text_canvas.getContext('2d');
        var text_pix = text_context.getImageData(0, 0, text_canvas.width, text_canvas.height).data;

        for (var j = 0, n = text_pix.length; j <n; j += 4) {
            if(text_pix[j+3]==255) {
                if(art_colors.length == 0) {
                    art_colors.push(text_pix[j] );
                    art_colors.push(text_pix[j +1]);
                    art_colors.push(text_pix[j+2]);
                    console.log("one color lang!");
                } else {
                    if( art_colors[0] != text_pix[j] || art_colors[1] != text_pix[j + 1] || art_colors[2] != text_pix[j+2]) {
                        full_color=1;
                        console.log("oh my! full color!");
                        break;
                    }
                }
            }
        }
        
        
        var children1 = document.getElementById('art-canvas').childNodes;
        for (var c in children1){
            if(children1[c].id !== undefined ) {
                console.log("id:"+children1[c].id);
                console.log("valid:" + $j("#"+children1[c].id).attr("valid"));
                
                if(full_color == 0) {
                    var canvas = document.getElementById(children1[c].id);
                    var context = canvas.getContext('2d');
                    var pix = context.getImageData(0, 0, canvas.width, canvas.height).data;

                    for (var i = 0, n = pix.length; i <n; i += 4) {

                        if(pix[i+3]==255) {
                            if(art_colors.length == 0) {
                                art_colors.push(pix[i] );
                                art_colors.push(pix[i +1]);
                                art_colors.push(pix[i+2]);

                                console.log("1one colored " + art_colors[0] + ":" + pix[i]);
                                    console.log("1one colored " + art_colors[1] + ":" + pix[i+1]);
                                    console.log("1one colored " + art_colors[2] + ":" + pix[i+2]);
                            } else {
                                //var pixel_color = pix[i] + pix[i+1] + pix[i+2];
                                if( art_colors[0] != pix[i] || art_colors[1] != pix[i + 1] || art_colors[2] != pix[i+2]) {
                                    console.log("1full colored " + art_colors[0] + ":" + pix[i]);
                                    console.log("1full colored " + art_colors[1] + ":" + pix[i+1]);
                                    console.log("1full colored " + art_colors[2] + ":" + pix[i+2]);
                                    full_color=1;
                                    break;
                                }
                            }
                    }
                    }
                
                }
                
                if($j("#"+children1[c].id).attr("valid")==0) {
                    parts++;
                    front_outside++;
                    break;
                //    alert("some print is invalid!");
                }  else {
                    print_front = 1;
                }
            
            }        
        }
        
        // Checking if elements are outside or inside border
        var allowed_left = $j("#allowed-left-1").val();
        var allowed_top = $j("#allowed-top-1").val();
        var allowed_right = $j("#allowed-right-1").val();
        var allowed_bottom = $j("#allowed-bottom-1").val();
        
        if(front.text_1.length > 0 ) {
            if (shape1.x >= allowed_left && shape1.y >= allowed_top && (shape1.x + shape1.w) <= allowed_right && (shape1.y + shape1.h) <= allowed_bottom ) {
                print_front = 1;
                console.log("print_front = 1");
            } else {
                if(front_outside == 0) {
                    parts++;
                    console.log("front1 part++");
                    front_outside++;  
                }
                
            }
        }
        
        if(front.text_2.length > 0) {
            if (shape2.x >= allowed_left && shape2.y >= allowed_top && (shape2.x + shape2.w) <= allowed_right && (shape2.y + shape2.h) <= allowed_bottom ) {
                print_front = 1;
            } else {
                if(front_outside == 0) {
                    parts++;
                    console.log("front2 part++");
                    front_outside++;
                    
                }
            }
        }
        
        if(front.text_3.length > 0 ) {
            if (shape3.x >= allowed_left && shape3.y >= allowed_top && (shape3.x + shape3.w) <= allowed_right && (shape3.y + shape3.h) <= allowed_bottom ) {
                print_front = 1;
            } else {
                if(front_outside == 0) {
                    parts++;
                    console.log("front3 part++");
                    front_outside++;
                }
                
            }
        }
        
        children1 = document.getElementById('art-canvas2').childNodes;
        for (var c2 in children1){
            if(children1[c2].id !== undefined ) {
                console.log("id:"+children1[c2].id);
                console.log("valid:" + $j("#"+children1[c2].id).attr("valid"));
                if(full_color == 0) {
                    var canvas2 = document.getElementById(children1[c2].id);
                    var context2 = canvas2.getContext('2d');
                    var pix2 = context2.getImageData(0, 0, canvas2.width , canvas2.height).data;

                    for (var i = 0, n = pix2.length; i <n; i += 4) {

                        if(pix2[i+3]==255) {
                            if(art_colors.length == 0) {
                                art_colors.push(pix2[i] );
                                art_colors.push(pix2[i +1]);
                                art_colors.push(pix2[i+2]);

                                console.log("1one colored " + art_colors[0] + ":" + pix2[i]);
                                    console.log("1one colored " + art_colors[1] + ":" + pix2[i+1]);
                                    console.log("1one colored " + art_colors[2] + ":" + pix2[i+2]);
                            } else {
                                //var pixel_color = pix[i] + pix[i+1] + pix[i+2];
                                if( art_colors[0] != pix2[i] || art_colors[1] != pix2[i + 1] || art_colors[2] != pix2[i+2]) {
                                    console.log("1full colored " + art_colors[0] + ":" + pix2[i]);
                                    console.log("1full colored " + art_colors[1] + ":" + pix2[i+1]);
                                    console.log("1full colored " + art_colors[2] + ":" + pix2[i+2]);
                                    full_color=1;
                                    break;
                                }
                            }
                    }
                    }
                }
                if($j("#"+children1[c2].id).attr("valid")==0) {
                    parts++;
                    break;
                //    alert("some print is invalid!");
                } else {
                    print_back = 1;
                }
            }        
        }
        
        // Checking if elements are outside or inside border
        allowed_left = $j("#allowed-left-2").val();
        allowed_top = $j("#allowed-top-2").val();
        allowed_right = $j("#allowed-right-2").val();
        allowed_bottom = $j("#allowed-bottom-2").val();
        
        if(back.text_1.length > 0 ) {
            if (shape21.x >= allowed_left && shape21.y >= allowed_top && (shape21.x + shape21.w) <= allowed_right && (shape21.y + shape21.h) <= allowed_bottom ) {
                print_back = 1;
            } else {
                if(back_outside == 0) {
                    parts++;
                    console.log("back1 part++");
                    back_outside++;
                }
                
            }
        }
        
        if(back.text_2.length > 0 ) {
            if (shape22.x >= allowed_left && shape22.y >= allowed_top && (shape22.x + shape22.w) <= allowed_right && (shape22.y + shape22.h) <= allowed_bottom ) {
                print_back = 1;
            } else {
                if(back_outside == 0) {
                    parts++;
                    console.log("back2 part++");
                    back_outside++;    
                }
                
            }
        }
        
        if(back.text_3.length > 0 ) {
            if (shape23.x >= allowed_left && shape23.y >= allowed_top && (shape23.x + shape23.w) <= allowed_right && (shape23.y + shape23.h) <= allowed_bottom ) {
                print_back = 1;
            } else {
                if(back_outside == 0) {
                    parts++;
                    console.log("back3 part++");
                    back_outside++;
                }
                
            }
        }
        
        children1 = document.getElementById('art-canvas3').childNodes;
        for (var c3 in children1){
            if(children1[c3].id !== undefined ) {
                console.log("id:"+children1[c3].id);
                console.log("valid:" + $j("#"+children1[c3].id).attr("valid"));
                if(full_color == 0) {
                    var canvas3 = document.getElementById(children1[c3].id);
                    var context3 = canvas3.getContext('2d');
                    var pix3 = context3.getImageData(0, 0, canvas3.width,canvas3.height).data;

                    for (var i = 0, n = pix3.length; i <n; i += 4) {

                        if(pix3[i+3]==255) {
                            if(art_colors.length == 0) {
                                art_colors.push(pix3[i] );
                                art_colors.push(pix3[i +1]);
                                art_colors.push(pix3[i+2]);

                                console.log("1one colored " + art_colors[0] + ":" + pix3[i]);
                                    console.log("1one colored " + art_colors[1] + ":" + pix3[i+1]);
                                    console.log("1one colored " + art_colors[2] + ":" + pix3[i+2]);
                            } else {
                                //var pixel_color = pix[i] + pix[i+1] + pix[i+2];
                                if( art_colors[0] != pix3[i] || art_colors[1] != pix3[i + 1] || art_colors[2] != pix3[i+2]) {
                                    console.log("1full colored " + art_colors[0] + ":" + pix3[i]);
                                    console.log("1full colored " + art_colors[1] + ":" + pix3[i+1]);
                                    console.log("1full colored " + art_colors[2] + ":" + pix3[i+2]);
                                    full_color=1;
                                    break;
                                }
                            }
                    }
                    }
                }
                if($j("#"+children1[c3].id).attr("valid")==0) {
                    parts++;
                    break;
                //    alert("some print is invalid!");
                } else {
                    print_left = 1;
                }
            }        
        }
        
        // Checking if elements are outside or inside border
        allowed_left = $j("#allowed-left-3").val();
        allowed_top = $j("#allowed-top-3").val();
        allowed_right = $j("#allowed-right-3").val();
        allowed_bottom = $j("#allowed-bottom-3").val();
        
        if(left.text_1.length > 0 && left_outside == 0) {
            if (shape31.x >= allowed_left && shape31.y >= allowed_top && (shape31.x + shape31.w) <= allowed_right && (shape31.y + shape31.h) <= allowed_bottom ) {
                print_left = 1;
            } else {
                parts++;
                console.log("left1 part++");
                left_outside++;
            }
        }
        
        if(left.text_2.length > 0 && left_outside == 0) {
            if (shape32.x >= allowed_left && shape32.y >= allowed_top && (shape32.x + shape32.w) <= allowed_right && (shape32.y + shape32.h) <= allowed_bottom ) {
                print_left = 1;
            } else {
                parts++;
                console.log("left2 part++");
                left_outside++;
            }
        }
        
        if(left.text_3.length > 0 && left_outside == 0) {
            if (shape33.x >= allowed_left && shape33.y >= allowed_top && (shape33.x + shape33.w) <= allowed_right && (shape33.y + shape33.h) <= allowed_bottom ) {
                print_left = 1;
            } else {
                parts++;
                console.log("left3 part++");
                left_outside++;
            }
        }
        
        children1 = document.getElementById('art-canvas4').childNodes;
        for (var c4 in children1){
            if(children1[c4].id !== undefined ) {
                console.log("id:"+children1[c4].id);
                console.log("valid:" + $j("#"+children1[c4].id).attr("valid"));
                if(full_color == 0) {
                    var canvas4 = document.getElementById(children1[c4].id);
                    var context4 = canvas4.getContext('2d');
                    var pix4 = context4.getImageData(0, 0, canvas4.width,canvas4.height).data;

                    for (var i = 0, n = pix4.length; i <n; i += 4) {

                        if(pix4[i+3]==255) {
                            if(art_colors.length == 0) {
                                art_colors.push(pix4[i] );
                                art_colors.push(pix4[i +1]);
                                art_colors.push(pix4[i+2]);

                                console.log("1one colored " + art_colors[0] + ":" + pix4[i]);
                                    console.log("1one colored " + art_colors[1] + ":" + pix4[i+1]);
                                    console.log("1one colored " + art_colors[2] + ":" + pix4[i+2]);
                            } else {
                                //var pix4el_color = pix4[i] + pix4[i+1] + pix4[i+2];
                                if( art_colors[0] != pix4[i] || art_colors[1] != pix4[i + 1] || art_colors[2] != pix4[i+2]) {
                                    console.log("1full colored " + art_colors[0] + ":" + pix4[i]);
                                    console.log("1full colored " + art_colors[1] + ":" + pix4[i+1]);
                                    console.log("1full colored " + art_colors[2] + ":" + pix4[i+2]);
                                    full_color=1;
                                    break;
                                }
                            }
                    }
                    }
                }
                if($j("#"+children1[c4].id).attr("valid")==0) {
                    parts++;
                    break;
                //    alert("some print is invalid!");
                } else {
                    print_right = 1;
                }
            }        
        }
        
        // Checking if elements are outside or inside border
        
        allowed_left = $j("#allowed-left-4").val();
        allowed_top = $j("#allowed-top-4").val();
        allowed_right = $j("#allowed-right-4").val();
        allowed_bottom = $j("#allowed-bottom-4").val();
        
        if(right.text_1.length > 0 && right_outside == 0) {
            if (shape41.x >= allowed_left && shape41.y >= allowed_top && (shape41.x + shape41.w) <= allowed_right && (shape41.y + shape41.h) <= allowed_bottom ) {
                print_right = 1;
            } else {
                parts++;
                console.log("right1 part++");
                right_outside++;
            }
        }
        
        if(right.text_2.length > 0 && right_outside == 0) {
            if (shape42.x >= allowed_left && shape42.y >= allowed_top && (shape42.x + shape42.w) <= allowed_right && (shape42.y + shape42.h) <= allowed_bottom ) {
                print_right = 1;
            } else {
                parts++;
                console.log("right2 part++");
                right_outside++;
            }
        }
        
        if(right.text_3.length > 0 && right_outside == 0) {
            if (shape43.x >= allowed_left && shape43.y >= allowed_top && (shape43.x + shape43.w) <= allowed_right && (shape43.y + shape43.h) <= allowed_bottom ) {
                print_right = 1;
            } else {
                parts++;
                console.log("right3 part++");
                right_outside++;
            }
        }
              if (text_full_color==1 || full_color==1) { price += 150;}
              
              var sides = 0;
              if (print_front==1) { sides++;}
              if (print_back==1) { sides++;}
              if (print_left==1) { sides++;}
              if (print_right==1) { sides++;}
              
              if(sides > 1) {
                  price += (200 * (sides-1));
              }
              console.log("parts:" + parts);
              console.log("sides:" + sides);
              
        /*
              if (print_back==1) { price+=200;};
              if (print_left==1) { price+=200;};
              if (print_right==1) { price+=200;};
              */
              price += (200 * parts);
              $j("#product-price").val( price);
              $j("#product-price-final").val( price);
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
 
 function getBaseURL() {
        var url = location.href;  // entire url including querystring - also: window.location.href;
        var baseURL = url.substring(0, url.indexOf('/', 14));


        if (baseURL.indexOf('http://localhost') != -1) {
            // Base Url for localhost
            var url = location.href;  // window.location.href;
            var pathname = location.pathname;  // window.location.pathname;
            var index1 = url.indexOf(pathname);
            var index2 = url.indexOf("/", index1 + 1);
            var baseLocalUrl = url.substr(0, index2);

            return baseLocalUrl + "/";
        }
        else {
            // Root Url for domain name
            return baseURL + "/shop/";
        }

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
                $j("div.sizes-content").css("display", "none");
                $j("div.front-content").fadeIn(); 
                
                $j("#print").css("display", "block");
                $j("#print2").css("display", "none");
                $j("#print3").css("display", "none");
                $j("#print4").css("display", "none");
                
                $j("#art-canvas").css("display", "block");  
                $j("#art-canvas2").css("display", "none");
                $j("#art-canvas3").css("display", "none");  
                $j("#art-canvas4").css("display", "none");
                
                active = "front";
                document.getElementById('main-preview').style.backgroundImage = "url('"+$j("#front-image-url").val()+"')"; //front_shirt_url;
                //document.getElementById('mini-preview').style.backgroundImage = "url('"+$j("#back-image-url").val()+"')";//back_shirt_url;
                
                $j(".text-selection").val('1');
                $j("#text-1").val(front.text_1);
                $j("#text-2").val(front.text_2);
                $j("#text-3").val(front.text_3);
                $j("#text-size").val(front.text_1_size);
                $j("#text-style").val(front.text_1_style);
                $j("#text-font").val(front.text_1_font_family);
                
                if ($j("#print-guide-border").is(':checked')) {
                    console.log("showborder1");
                    $j("#border-1").show();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                } else {
                    console.log("hideborder1");
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                }
                
                
            break;  
            case "back-menu":  
                $j("#front-menu").removeClass("active");  
                $j("#back-menu").addClass("active");  
                $j("#left-menu").removeClass("active");
                $j("#right-menu").removeClass("active");
                $j("#sizes-menu").removeClass("active");

                $j("div.front-content").css("display", "none");
                $j("div.sizes-content").css("display", "none");
                $j("div.front-content").fadeIn();  
                
                $j("#print2").css("display", "block");
                $j("#print").css("display", "none");
                $j("#print3").css("display", "none");
                $j("#print4").css("display", "none");
                
                $j("#art-canvas2").css("display", "block");  
                $j("#art-canvas").css("display", "none");
                $j("#art-canvas3").css("display", "none");  
                $j("#art-canvas4").css("display", "none");
                
                
                active = "back";
                document.getElementById('main-preview').style.backgroundImage = "url('"+$j("#back-image-url").val()+"')";//back_shirt_url;
               // document.getElementById('mini-preview').style.backgroundImage = "url('"+$j("#front-image-url").val()+"')";//front_shirt_url;
                
                
                $j(".text-selection").val('1');
                $j("#text-1").val(back.text_1);
                $j("#text-2").val(back.text_2);
                $j("#text-3").val(back.text_3);
                $j("#text-size").val(back.text_1_size);
                $j("#text-style").val(back.text_1_style);
                $j("#text-font").val(back.text_1_font_family);
                
                if ($j("#print-guide-border").is(':checked')) {
                    $j("#border-1").hide();
                    $j("#border-2").show();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                } else {
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                }
                
            break;  
            case "left-menu":  

                $j("#front-menu").removeClass("active");  
                $j("#back-menu").removeClass("active");  
                $j("#left-menu").addClass("active"); 
                $j("#right-menu").removeClass("active");
                $j("#sizes-menu").removeClass("active");

                $j("div.front-content").css("display", "none");
                $j("div.sizes-content").css("display", "none");
                $j("div.front-content").fadeIn();  
                
                $j("#print3").css("display", "block");
                $j("#print2").css("display", "none");
                $j("#print").css("display", "none");
                $j("#print4").css("display", "none");
                
                $j("#art-canvas3").css("display", "block");  
                $j("#art-canvas2").css("display", "none");
                $j("#art-canvas").css("display", "none");  
                $j("#art-canvas4").css("display", "none");
                
                
                active = "left";
                document.getElementById('main-preview').style.backgroundImage = "url('"+$j("#left-image-url").val()+"')";//back_shirt_url;
                //document.getElementById('mini-preview').style.backgroundImage = "url('"+$j("#right-image-url").val()+"')";//front_shirt_url;
                
                $j(".text-selection").val('1');
                $j("#text-1").val(left.text_1);
                $j("#text-2").val(left.text_2);
                $j("#text-3").val(left.text_3);
                $j("#text-size").val(left.text_1_size);
                $j("#text-style").val(left.text_1_style);
                $j("#text-font").val(left.text_1_font_family);
                
                if ($j("#print-guide-border").is(':checked')) {
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").show();
                    $j("#border-4").hide();
                } else {
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                }
                
            break; 
            
            case "right-menu":  

                $j("#front-menu").removeClass("active");  
                $j("#back-menu").removeClass("active");
                $j("#left-menu").removeClass("active");
                $j("#right-menu").addClass("active"); 
                $j("#sizes-menu").removeClass("active");

                $j("div.front-content").css("display", "none");
                $j("div.sizes-content").css("display", "none");
                $j("div.front-content").fadeIn();  
                
                $j("#print4").css("display", "block");
                $j("#print2").css("display", "none");
                $j("#print3").css("display", "none");
                $j("#print").css("display", "none");
                
                $j("#art-canvas4").css("display", "block");  
                $j("#art-canvas2").css("display", "none");
                $j("#art-canvas3").css("display", "none");  
                $j("#art-canvas").css("display", "none");
                
                
                active = "right";
                document.getElementById('main-preview').style.backgroundImage = "url('"+$j("#right-image-url").val()+"')";//back_shirt_url;
                //document.getElementById('mini-preview').style.backgroundImage = "url('"+$j("#left-image-url").val()+"')";//front_shirt_url;
                
                $j(".text-selection").val('1');
                $j("#text-1").val(right.text_1);
                $j("#text-2").val(right.text_2);
                $j("#text-3").val(right.text_3);
                $j("#text-size").val(right.text_1_size);
                $j("#text-style").val(right.text_1_style);
                $j("#text-font").val(right.text_1_font_family);
                
                if ($j("#print-guide-border").is(':checked')) {
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").show();
                } else {
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                }
            break; 
            case "sizes-menu":
                $j("#front-menu").removeClass("active");  
                $j("#back-menu").removeClass("active");
                $j("#left-menu").removeClass("active");
                $j("#right-menu").removeClass("active"); 
                $j("#sizes-menu").addClass("active");
                
                
                $j("div.front-content").css("display", "none");
                $j("div.sizes-content").fadeIn(); 
                if ($j("#print-guide-border").is(':checked')) {
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                } else {
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                }
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
    var text_color = "#000000";
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
    
    //$j("#text-print-1").draggable();
    
    var canvas = document.getElementById('print');
    //var canvas = document.getElementById('text-print-1');
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
        //var canvas = document.getElementById('text-print-1');
        
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
        
        
       updatePrice();
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
        updatePrice();
        
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
        updatePrice();
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
        updatePrice();
        
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
        updatePrice();
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
        updatePrice();
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
        updatePrice();
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
        updatePrice();
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
        updatePrice();
    });
    
    
    $j(".bordered").click(function(){
        console.log("MOUSEDOWN!");
        updatePrice();
    });
    
    $j("#art-category").change(function () {
        
        var categories = new Array("animals","fitness","floral","fruits","gifts","gushdesigns","military","miscellaneous","music","party","people","shapes","sports","techno","valentine");
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
    var art_color = "#000000";
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
            case "custom1":
                e.height = 160;
                e.width = 160;
                break;
			case "custom2":
                e.height = 200;
                e.width = 200;
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
        var f = document.getElementById(art_element_id);
        var i = new Image();
	i.src = f.src;
        i.onload = function () {
        
        
		//alert(i.width + 'x' + i.height);
		switch($j("#image-size").val()){
            case "10":
                e.height = i.height * 0.10;
                e.width = i.width * 0.10;
                break;
            case "15":
                e.height = i.height * 0.15;
                e.width = i.width * 0.15;
                break;
            case "20":
                e.height = i.height * 0.20;
                e.width = i.width * 0.20;
                break;
			case "25":
                e.height = i.height * 0.25;
                e.width = i.width * 0.25;
                break;
			case "30":
                e.height = i.height * 0.30;
                e.width = i.width * 0.30;
                break;
			case "40":
                e.height = i.height * 0.40;
                e.width = i.width * 0.40;
                break;
            case "50":
                e.height = i.height * 0.50;
                e.width = i.width * 0.50;
                break;
			case "60":
                e.height = i.height * 0.60;
                e.width = i.width * 0.60;
                break;
			case "75":
                e.height = i.height * 0.75;
                e.width = i.width * 0.75;
                break;
			case "100":
                e.height = i.height * 1.00;
                e.width = i.width * 1.00;
                break;
            
        }
        drawImage();
        };
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
			case "custom1":
                return 160;
                break;
			case "custom2":
                return 200;
                break;
            
        }
    }
    
    function drawArt() {
        console.log("drawArt");
        var art_canvas = document.getElementById(art_canvas_id);
        var art_context = art_canvas.getContext('2d');
        
        var art = art_canvas_id.split('-');
        art[0] = art[0].substr(1,art[0].length);
        //alert(art[0]);
        var img_path = "../../media/shirtdesigner/images/art/"+ art[0] + "/"+ art_element_id;
        var img= new Image();
        
		img.src= img_path;
        art_context.clearRect(0, 0, getArtSize(), getArtSize());
        art_context.drawImage(img, 0, 0, getArtSize(), getArtSize());
        
        var imgd = art_context.getImageData(0, 0, getArtSize(), getArtSize()),
        pix = imgd.data;
		
		if(art[0]!="gushdesigns")
		{
        	// Loops through all of the pixels and modifies the components.
        	for (var i = 0, n = pix.length; i <n; i += 4) {
              
				  pix[i] = hexToR(art_color);
				  pix[i+1] = hexToG(art_color);
				  pix[i+2] = hexToB(art_color);
				  //pix[i+3] is the transparency.
        	}
		}
		
        art_context.putImageData(imgd, 0, 0);
        updatePrice();
    }
    
    
    $j(".art-images > img").click(function(e){
        art_element_id = e.target.id;
        //alert(art_element_id);
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
            
            var link = document.getElementById(art_element_id).getAttribute("src");
            link = link.replace("../../", getBaseURL())
            
            
            var inputElement = document.createElement("input");
            inputElement.id = "i-" + art_canvas_id;
            inputElement.name = "i-" + art_canvas_id;
            inputElement.type = "hidden";
            inputElement.setAttribute('id-of-canvas',art_canvas_id);
            inputElement.setAttribute('value',link);
            inputElement.setAttribute('valid',0);
            switch(active){
                case "front":
                    $j("#art-canvas canvas").removeClass();
                    c.setAttribute('class','highlight-canvas-image');
                    document.getElementById('art-canvas').appendChild(c);
                    
                    document.getElementById('front-image-links').appendChild(inputElement);
                    break;
                case "back":
                    $j("#art-canvas2 canvas").removeClass();
                    c.setAttribute('class','highlight-canvas-image');
                    document.getElementById('art-canvas2').appendChild(c);
                    
                    document.getElementById('back-image-links').appendChild(inputElement);
                    break;
                case "left":
                    $j("#art-canvas3 canvas").removeClass();
                    c.setAttribute('class','highlight-canvas-image');
                    document.getElementById('art-canvas3').appendChild(c);
                    
                    document.getElementById('left-image-links').appendChild(inputElement);
                    break;
                case "right":
                    $j("#art-canvas4 canvas").removeClass();
                    c.setAttribute('class','highlight-canvas-image');
                    document.getElementById('art-canvas4').appendChild(c);
                    
                    document.getElementById('right-image-links').appendChild(inputElement);
                    break;
            }
            
            $j("#" + art_canvas_id).draggable({

                stop: function() {
                    var e = $j(this);
                    var p = $j(this).position();
                    console.log("art canvas: left: " + p.left + "; top:" +p.top + " width:" + $j(this).width() + " height:" + $j(this).height() );
                    
                    switch(active){
                        case "front":
                            if(p.left >= $j("#allowed-left-1").val() && p.top >= $j("#allowed-top-1").val() && (p.left + e.width() ) <= $j("#allowed-right-1").val() && (p.top + e.height() ) <= $j("#allowed-bottom-1").val()) {
                                $j(this).attr("valid",1);
                                console.log("valid position" + p.left + ">" + $j("#allowed-left-1").val() +" " + p.top + ">" + $j("#allowed-top-1").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-1").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-1").val());
                            } else {
                                $j(this).attr("valid",0);
                                console.log("invalid position" + p.left + ":" + $j("#allowed-left-1").val() +" " + p.top + ":" + $j("#allowed-top-1").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-1").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-1").val());
                            } 
                            break;
                        case "back":
                            if(p.left >= $j("#allowed-left-2").val() && p.top >= $j("#allowed-top-2").val() && (p.left + e.width() ) <= $j("#allowed-right-2").val() && (p.top + e.height() ) <= $j("#allowed-bottom-2").val()) {
                                $j(this).attr("valid",1);
                                console.log("valid position" + p.left + ">" + $j("#allowed-left-2").val() +" " + p.top + ">" + $j("#allowed-top-2").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-2").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-2").val());
                            } else {
                                $j(this).attr("valid",0);
                                console.log("invalid position" + p.left + ":" + $j("#allowed-left-2").val() +" " + p.top + ":" + $j("#allowed-top-2").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-2").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-2").val());
                            } 
                            break;
                        case "left":
                            if(p.left >= $j("#allowed-left-3").val() && p.top >= $j("#allowed-top-3").val() && (p.left + e.width() ) <= $j("#allowed-right-3").val() && (p.top + e.height() ) <= $j("#allowed-bottom-3").val()) {
                                $j(this).attr("valid",1);
                                console.log("valid position" + p.left + ">" + $j("#allowed-left-3").val() +" " + p.top + ">" + $j("#allowed-top-3").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-3").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-3").val());
                            } else {
                                $j(this).attr("valid",0);
                                console.log("invalid position" + p.left + ":" + $j("#allowed-left-3").val() +" " + p.top + ":" + $j("#allowed-top-3").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-3").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-3").val());
                            } 
                            break;
                        case "right":
                            
                            if(p.left >= $j("#allowed-left-4").val() && p.top >= $j("#allowed-top-4").val() && (p.left + e.width() ) <= $j("#allowed-right-4").val() && (p.top + e.height() ) <= $j("#allowed-bottom-4").val()) {
                                $j(this).attr("valid",1);
                                console.log("valid position" + p.left + ">" + $j("#allowed-left-4").val() +" " + p.top + ">" + $j("#allowed-top-4").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-4").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-4").val());
                            } else {
                                $j(this).attr("valid",0);
                                console.log("invalid position" + p.left + ":" + $j("#allowed-left-4").val() +" " + p.top + ":" + $j("#allowed-top-4").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-4").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-4").val());
                            } 
                            break;
                    }
                    updatePrice(); 
                }
            });
            
            drawArt();
        }
        
     });
     
     $j(".art-color-selections > div").click(function(e){
        art_color = "#"+e.target.id;
        art_canvas_id = highlighted_art_id;
        art_element_id = highlighted_art_id.substr(1,highlighted_art_id.length) + '.png';
        
        drawArt();
        updatePrice();
     });
     
     /******** ART EVENTS ********/
     /******** ART EVENTS ********/
     /******** ART EVENTS ********/
     
     function getImageSize() {
        switch($j("#image-size").val()){
            case "10":
                return 0.10;
                break;
            case "15":
                return 0.15;
                break;
            case "20":
                return 0.20;
                break;
            case "25":
                return 0.25;
                break;
			case "30":
                return 0.30;
                break;
			case "40":
                return 0.40;
                break;
			case "50":
                return 0.50;
                break;
            case "60":
                return 0.60;
                break;
            case "75":
                return 0.75;
                break;
			case "100":
                return 1.00;
                break;
        }
    }
    
     var image_canvas_id;
     var image_element_id;
     var design_id;
     function drawImage() {
        var image_canvas = document.getElementById(image_canvas_id);
        var image_context = image_canvas.getContext('2d');
        var img_path = "../../media/shirtdesigner/images/uploads/"+ design_id+"/"+image_element_id;
        console.log('check ID:' + image_element_id);
        
        var eff = document.getElementById(image_element_id);
        /*var i = new Image();
        i.src = eff.src;
        var h = i.height * getImageSize();
        var w = i.width * getImageSize();
        console.log('check width&hieght:' + i.height + 'x' + i.width);
        console.log('check src:' + i.src);
        */
        
        var img= new Image();
        img.src= eff.src;//img_path;
        /*var h = img.height * getImageSize();
        var w = img.width * getImageSize();
        console.log('check width&hieght:' + img.height + 'x' + img.width );
        */
        var h, w;
        
        img.onload = function () {
            h = img.height * getImageSize();
            w = img.width * getImageSize();
            console.log('check width&hieght:' + img.height + 'x' + img.width);
            console.log('check src:' + img.src);
        
            image_context.clearRect(0,0,w,h);
            image_context.drawImage(img,0,0,w,h);
            
            //var imgd = image_context.getImageData(0, 0, w, h),
            //pix = imgd.data;
            //image_context.putImageData(imgd, 0, 0);
            updatePrice();
        };
        
        
    }
    
    
     
     //$j(".upload-images > img").click(function(e){
     $j(document).on("click", ".upload-images > img", function(e) {
        var image_canvas = document.getElementById(e.target.id);
        design_id = image_canvas.getAttribute("design-id");
        //alert(image_canvas.getAttribute("design-id"));
        //alert(e.target.id);
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
            var c, h, w;
            //alert(image_element_id);
			var eff = document.getElementById(image_element_id);
			var i = new Image();
			i.src = eff.src;
                        i.onload = function () {
                            h = i.height * getImageSize();
                            w = i.width * getImageSize();

                            console.log("before drawImage " + h + "||" + w);

                            c = document.createElement("canvas");
                            c.id= image_canvas_id;
                            c.width= w;//100;
                            c.height=h;//100; 
                            c.setAttribute('ondblclick', 'removeCanvasImage("'+image_canvas_id+'")');
                            c.setAttribute('onclick', 'highlightCanvasImage("'+image_canvas_id+'")');
                            
                            highlighted_art_id = image_canvas_id;
                            $j("#image-canvas canvas").removeClass();
                            c.setAttribute('class','highlight-canvas-image');

                            var link = document.getElementById(image_element_id).getAttribute("src");
                            link = link.replace("../../", getBaseURL())


                            var inputElement = document.createElement("input");
                            inputElement.id = "i-" + image_canvas_id;
                            inputElement.name = "i-" + image_canvas_id;
                            inputElement.type = "hidden";
                            inputElement.setAttribute('id-of-canvas',image_canvas_id);
                            inputElement.setAttribute('valid',0);
                            inputElement.setAttribute('value',link);

                            switch(active){
                                case "front":
                                    document.getElementById('art-canvas').appendChild(c);
                                    document.getElementById('front-image-links').appendChild(inputElement);
                                    break;
                                case "back":
                                    document.getElementById('art-canvas2').appendChild(c);
                                    document.getElementById('back-image-links').appendChild(inputElement);
                                    break;
                                case "left":
                                    document.getElementById('art-canvas3').appendChild(c);
                                    document.getElementById('left-image-links').appendChild(inputElement);
                                    break;
                                case "right":
                                    document.getElementById('art-canvas4').appendChild(c);
                                    document.getElementById('right-image-links').appendChild(inputElement);
                                    break;
                            }
                            drawImage();
                        
            
            
            highlighted_art_id = image_canvas_id;
            $j("#art-canvas canvas").removeClass();
            $j("#" + image_canvas_id).addClass("highlight-canvas-image");
            $j("#" + image_canvas_id).draggable({

                stop: function() {
                    var e = $j(this);
                    var p = $j(this).position();
                    console.log("art canvas: left: " + p.left + "; top:" +p.top + " width:" + $j(this).width() + " height:" + $j(this).height() );
                    
                    switch(active){
                        case "front":
                            if(p.left >= $j("#allowed-left-1").val() && p.top >= $j("#allowed-top-1").val() && (p.left + e.width() ) <= $j("#allowed-right-1").val() && (p.top + e.height() ) <= $j("#allowed-bottom-1").val()) {
                                $j(this).attr("valid",1);
                                console.log("valid position" + p.left + ">" + $j("#allowed-left-1").val() +" " + p.top + ">" + $j("#allowed-top-1").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-1").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-1").val());
                            } else {
                                $j(this).attr("valid",0);
                                console.log("invalid position" + p.left + ":" + $j("#allowed-left-1").val() +" " + p.top + ":" + $j("#allowed-top-1").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-1").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-1").val());
                            } 
                            break;
                        case "back":
                            if(p.left >= $j("#allowed-left-2").val() && p.top >= $j("#allowed-top-2").val() && (p.left + e.width() ) <= $j("#allowed-right-2").val() && (p.top + e.height() ) <= $j("#allowed-bottom-2").val()) {
                                $j(this).attr("valid",1);
                                console.log("valid position" + p.left + ">" + $j("#allowed-left-2").val() +" " + p.top + ">" + $j("#allowed-top-2").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-2").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-2").val());
                            } else {
                                $j(this).attr("valid",0);
                                console.log("invalid position" + p.left + ":" + $j("#allowed-left-2").val() +" " + p.top + ":" + $j("#allowed-top-2").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-2").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-2").val());
                            } 
                            break;
                        case "left":
                            if(p.left >= $j("#allowed-left-3").val() && p.top >= $j("#allowed-top-3").val() && (p.left + e.width() ) <= $j("#allowed-right-3").val() && (p.top + e.height() ) <= $j("#allowed-bottom-3").val()) {
                                $j(this).attr("valid",1);
                                console.log("valid position" + p.left + ">" + $j("#allowed-left-3").val() +" " + p.top + ">" + $j("#allowed-top-3").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-3").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-3").val());
                            } else {
                                $j(this).attr("valid",0);
                                console.log("invalid position" + p.left + ":" + $j("#allowed-left-3").val() +" " + p.top + ":" + $j("#allowed-top-3").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-3").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-3").val());
                            } 
                            break;
                        case "right":
                            
                            if(p.left >= $j("#allowed-left-4").val() && p.top >= $j("#allowed-top-4").val() && (p.left + e.width() ) <= $j("#allowed-right-4").val() && (p.top + e.height() ) <= $j("#allowed-bottom-4").val()) {
                                $j(this).attr("valid",1);
                                console.log("valid position" + p.left + ">" + $j("#allowed-left-4").val() +" " + p.top + ">" + $j("#allowed-top-4").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-4").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-4").val());
                            } else {
                                $j(this).attr("valid",0);
                                console.log("invalid position" + p.left + ":" + $j("#allowed-left-4").val() +" " + p.top + ":" + $j("#allowed-top-4").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-4").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-4").val());
                            } 
                            break;
                    }
                    updatePrice(); 
                }
            });
           }; 
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
    
    
    
     $j("#border-1").draggable({
        stop: function() {
           var pos = $j(this).position();
             var pos_left = pos.left + 95;
             var pos_top = pos.top +120;
             var pos_right = pos.left + 95 + 200;
             var pos_bottom = pos.top +120 + 230;
             $j("#allowed-left-1").val(pos_left);
             $j("#allowed-top-1").val(pos_top);
             $j("#allowed-right-1").val(pos_right);
             $j("#allowed-bottom-1").val(pos_bottom);
             
             var children1 = document.getElementById('art-canvas').childNodes;
             for (var c in children1){
                if(children1[c].id !== undefined ) {
                    console.log("FRONT VALID ELEMENTS:"+$j("#"+children1[c].id).attr("valid") + $j("#"+children1[c].id).attr("id"));
                        var e = $j("#"+children1[c].id);
                        var p = $j("#"+children1[c].id).position();

                            if(p.left >= $j("#allowed-left-1").val() && p.top >= $j("#allowed-top-1").val() && (p.left + e.width() ) <= $j("#allowed-right-1").val() && (p.top + e.height() ) <= $j("#allowed-bottom-1").val()) {
                                //$j(this).attr("valid",1);
                                $j("#"+children1[c].id).attr("valid",1);
                                console.log("FRONT valid position" + p.left + ">" + $j("#allowed-left-1").val() +" " + p.top + ">" + $j("#allowed-top-1").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-1").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-1").val());
                            } else {
                                //$j(this).attr("valid",0);
                                $j("#"+children1[c].id).attr("valid",0);
                                console.log("FRONT invalid position" + p.left + ":" + $j("#allowed-left-1").val() +" " + p.top + ":" + $j("#allowed-top-1").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-1").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-1").val());
                            }

                }        
              }
             console.log("FRONT  TESTING BORDER: left: " + $j("#allowed-left-1").val() + "; top:" +$j("#allowed-top-1").val() + "bottom: " + $j("#allowed-bottom-1").val() + " right:" +$j("#allowed-right-1").val());
            updatePrice();   
        }
     });
     
     $j("#border-2").draggable({
        stop: function() {
           var pos = $j(this).position();
             var pos_left = pos.left + 95;
             var pos_top = pos.top +120;
             var pos_right = pos.left + 95 + 200;
             var pos_bottom = pos.top +120 + 230;
             
             $j("#allowed-left-2").val(pos_left);
             $j("#allowed-top-2").val(pos_top);
             $j("#allowed-right-2").val(pos_right);
             $j("#allowed-bottom-2").val(pos_bottom);
             
             var children2 = document.getElementById('art-canvas2').childNodes;
             for (var c in children2){
                if(children2[c].id !== undefined ) {
                    console.log("BACK VALID ELEMENTS:"+$j("#"+children2[c].id).attr("valid") + $j("#"+children2[c].id).attr("id"));
                        var e = $j("#"+children2[c].id);
                        var p = $j("#"+children2[c].id).position();

                            if(p.left >= $j("#allowed-left-2").val() && p.top >= $j("#allowed-top-2").val() && (p.left + e.width() ) <= $j("#allowed-right-2").val() && (p.top + e.height() ) <= $j("#allowed-bottom-2").val()) {
                                //$j(this).attr("valid",1);
                                $j("#"+children2[c].id).attr("valid",1);
                                console.log("FRONT valid position" + p.left + ">" + $j("#allowed-left-2").val() +" " + p.top + ">" + $j("#allowed-top-2").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-2").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-2").val());
                            } else {
                                //$j(this).attr("valid",0);
                                $j("#"+children2[c].id).attr("valid",0);
                                console.log("FRONT invalid position" + p.left + ":" + $j("#allowed-left-2").val() +" " + p.top + ":" + $j("#allowed-top-2").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-2").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-2").val());
                            }

                }        
              }
              console.log("BACK  TESTING BORDER: left: " + $j("#allowed-left-2").val() + "; top:" +$j("#allowed-top-2").val() + "bottom: " + $j("#allowed-bottom-2").val() + " right:" +$j("#allowed-right-2").val());
              updatePrice(); 
        }
     });
     
     $j("#border-3").draggable({
        stop: function() {
           var pos = $j(this).position();
             var pos_left = pos.left + 95;
             var pos_top = pos.top +120;
             var pos_right = pos.left + 95 + 200;
             var pos_bottom = pos.top +120 + 230;
             
             $j("#allowed-left-3").val(pos_left);
             $j("#allowed-top-3").val(pos_top);
             $j("#allowed-right-3").val(pos_right);
             $j("#allowed-bottom-3").val(pos_bottom);
             
             var children3 = document.getElementById('art-canvas3').childNodes;
             for (var c in children3){
                if(children3[c].id !== undefined ) {
                    console.log("LEFT VALID ELEMENTS:"+$j("#"+children3[c].id).attr("valid") + $j("#"+children3[c].id).attr("id"));
                        var e = $j("#"+children3[c].id);
                        var p = $j("#"+children3[c].id).position();

                            if(p.left >= $j("#allowed-left-3").val() && p.top >= $j("#allowed-top-3").val() && (p.left + e.width() ) <= $j("#allowed-right-3").val() && (p.top + e.height() ) <= $j("#allowed-bottom-3").val()) {
                                //$j(this).attr("valid",1);
                                $j("#"+children3[c].id).attr("valid",1);
                                console.log("LEFT valid position" + p.left + ">" + $j("#allowed-left-3").val() +" " + p.top + ">" + $j("#allowed-top-3").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-3").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-3").val());
                            } else {
                                //$j(this).attr("valid",0);
                                $j("#"+children3[c].id).attr("valid",0);
                                console.log("LEFT invalid position" + p.left + ":" + $j("#allowed-left-3").val() +" " + p.top + ":" + $j("#allowed-top-3").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-3").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-3").val());
                            }

                }        
              }
              console.log("LEFT  TESTING BORDER: left: " + $j("#allowed-left-3").val() + "; top:" +$j("#allowed-top-3").val() + "bottom: " + $j("#allowed-bottom-3").val() + " right:" +$j("#allowed-right-3").val());
              updatePrice(); 
        }
     });
     
     $j("#border-4").draggable({
         
         stop: function() {
             var pos = $j(this).position();
             var pos_left = pos.left + 95;
             var pos_top = pos.top +120;
             var pos_right = pos.left + 95 + 200;
             var pos_bottom = pos.top +120 + 230;
             
             $j("#allowed-left-4").val(pos_left);
             $j("#allowed-top-4").val(pos_top);
             $j("#allowed-right-4").val(pos_right);
             $j("#allowed-bottom-4").val(pos_bottom);
             
             var children4 = document.getElementById('art-canvas4').childNodes;
             for (var c in children4){
                if(children4[c].id !== undefined ) {
                    console.log("RIGHT VALID ELEMENTS:"+$j("#"+children4[c].id).attr("valid") + $j("#"+children4[c].id).attr("id"));
                        var e = $j("#"+children4[c].id);
                        var p = $j("#"+children4[c].id).position();

                            if(p.left >= $j("#allowed-left-4").val() && p.top >= $j("#allowed-top-4").val() && (p.left + e.width() ) <= $j("#allowed-right-4").val() && (p.top + e.height() ) <= $j("#allowed-bottom-4").val()) {
                                //$j(this).attr("valid",1);
                                $j("#"+children4[c].id).attr("valid",1);
                                console.log("RIGHT valid position" + p.left + ">" + $j("#allowed-left-4").val() +" " + p.top + ">" + $j("#allowed-top-4").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-4").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-4").val());
                            } else {
                                //$j(this).attr("valid",0);
                                $j("#"+children4[c].id).attr("valid",0);
                                console.log("RIGHT invalid position" + p.left + ":" + $j("#allowed-left-4").val() +" " + p.top + ":" + $j("#allowed-top-4").val() +" " + (p.left + e.width() ) + "<" + $j("#allowed-right-4").val() +" " + (p.top + e.height() ) + "<" + $j("#allowed-bottom-4").val());
                            }

                }        
              }
              console.log("RIGHT TESTING BORDER: left: " + $j("#allowed-left-4").val() + "; top:" +$j("#allowed-top-4").val() + "bottom: " + $j("#allowed-bottom-4").val() + " right:" +$j("#allowed-right-4").val());
              updatePrice(); 
        }
     });
     $j("#border-1").hide();
     $j("#border-2").hide();
     $j("#border-3").hide();
     $j("#border-4").hide();
     
     $j("#print-guide-border").click(function(){
         if ($j(this).is(':checked')) {
           // alert("checked");
            
            
            switch (active){
                case "front": 
                    $j("#border-1").show();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                    break;
                case "back":
                    $j("#border-1").hide();
                    $j("#border-2").show();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                    break;
                case "left": 
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").show();
                    $j("#border-4").hide();
                    break;
                case "right":
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").show();
                    break;
            }
         }else {
           // alert('unchecked');
            //$j("#border-1").hide();
            switch (active){
                case "front": 
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                    break;
                case "back":
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                    break;
                case "left": 
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                    break;
                case "right":
                    $j("#border-1").hide();
                    $j("#border-2").hide();
                    $j("#border-3").hide();
                    $j("#border-4").hide();
                    break;
            }
         }
         
     });
     
     
    
    $j('.submit').click(function(e) {
       if (($j("#s").val() == "") && ($j("#m").val() == "") && ($j("#l").val() == "") && ($j("#xl").val() == "")){
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
        
        // This it to gather front artwork links
        var inputChildren = document.getElementById('front-image-links').childNodes;
        var inputElements = new Array();
        for (var d in inputChildren){
            if(inputChildren[d].id != null   ){
                inputElements[d] = document.getElementById(inputChildren[d].id).getAttribute("value");  
            } 
        }
        
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
        arts.value = inputElements; //ids;
        document.getElementById('checkout-design').appendChild(arts);
        
        
        var printcanvas = document.getElementById('print');
        context.drawImage(printcanvas, 0, 0);
        var savedImageData = document.getElementById("output_image");
        savedImageData.src = output.toDataURL("image/png");
        
        // BACK/OUTPUT2
        var output2 = document.getElementById('output2');
        var context2 = output2.getContext('2d');
        
        // This it to gather front artwork links
        var inputChildren2 = document.getElementById('back-image-links').childNodes;
        var inputElements2 = new Array();
        for (var d in inputChildren2){
            if(inputChildren2[d].id != null   ){
                inputElements2[d] = document.getElementById(inputChildren2[d].id).getAttribute("value");  
            } 
        }
        
        var children2 = document.getElementById('art-canvas2').childNodes;
        var ids2 = new Array();
        for (var c in children2){
            if(children2[c].id != null   ){
                ids2[c] = children2[c].id.substr(1,children2[c].id.length);//children2[c].id;
                var canvas2 = document.getElementById(children2[c].id);
                console.log("BACK"+($j("#"+children2[c].id).position().left)+","+($j("#"+children2[c].id).position().top));
                context2.drawImage(canvas2, ($j("#"+children2[c].id).position().left), ($j("#"+children2[c].id).position().top)); //73
            }
        }
        
        var arts2 = document.createElement('input');
        arts2.type = "hidden";
        arts2.name = "arts2";
        arts2.value = inputElements2; //ids2;
        document.getElementById('checkout-design').appendChild(arts2);
        
        var printcanvas2 = document.getElementById('print2');
        context2.drawImage(printcanvas2, 0, 0);
        var savedImageData2 = document.getElementById("output2_image");
        savedImageData2.src = output2.toDataURL("image/png");
        
        // LEFT/OUTPUT3
        var output3 = document.getElementById('output3');
        var context3 = output3.getContext('2d');
        
        // This it to gather front artwork links
        var inputChildren3 = document.getElementById('left-image-links').childNodes;
        var inputElements3 = new Array();
        for (var d in inputChildren3){
            if(inputChildren3[d].id != null   ){
                inputElements3[d] = document.getElementById(inputChildren3[d].id).getAttribute("value");  
            } 
        }
        
        var children3 = document.getElementById('art-canvas3').childNodes;
        var ids3 = new Array();
        for (var c in children3){
            if(children3[c].id != null   ){
                ids3[c] = children3[c].id.substr(1,children3[c].id.length);//children3[c].id;
                var canvas3 = document.getElementById(children3[c].id);
                console.log("LEFT"+($j("#"+children3[c].id).position().left)+","+($j("#"+children3[c].id).position().top));
                context3.drawImage(canvas3, ($j("#"+children3[c].id).position().left ), ($j("#"+children3[c].id).position().top)); //73
                
            }
        }
        
        var arts3 = document.createElement('input');
        arts3.type = "hidden";
        arts3.name = "arts3";
        arts3.value = inputElements3; //ids3;
        document.getElementById('checkout-design').appendChild(arts3);
        
        var printcanvas3 = document.getElementById('print3');
        context3.drawImage(printcanvas3, 0, 0);
        var savedImageData3 = document.getElementById("output3_image");
        savedImageData3.src = output3.toDataURL("image/png");
        
        
        // RIGHT/OUTPUT4
        var output4 = document.getElementById('output4');
        var context4 = output4.getContext('2d');
        
        // This it to gather front artwork links
        var inputChildren4 = document.getElementById('right-image-links').childNodes;
        var inputElements4 = new Array();
        for (var d in inputChildren4){
            if(inputChildren4[d].id != null   ){
                inputElements4[d] = document.getElementById(inputChildren4[d].id).getAttribute("value");  
            } 
        }
        
        
        var children4 = document.getElementById('art-canvas4').childNodes;
        var ids4 = new Array();
        
        for (var c in children4){
            if(children4[c].id != null   ){
                ids4[c] = children4[c].id.substr(1,children4[c].id.length);//children4[c].id;
                
                var canvas4 = document.getElementById(children4[c].id);
                console.log(c);
                console.log("RIGHT"+($j("#"+children4[c].id).position().left )+","+($j("#"+children4[c].id).position().top));
                context4.drawImage(canvas4, ($j("#"+children4[c].id).position().left), ($j("#"+children4[c].id).position().top-394)); //73
            }
        }
        
        var arts4 = document.createElement('input');
        arts4.type = "hidden";
        arts4.name = "arts4";
        arts4.value = inputElements4; //ids4;
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
        
        
        
        
      }  
        
    });
    
            
     
});


