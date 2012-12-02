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


    
$j(document).ready(function(){
     window.console = $j('<iframe>').hide().appendTo('body')[0].contentWindow.console;
     /*
      * @desc Initialize values here
      */
     $j("div.sizes-content").css("display", "none");
     $j("#neck-type").val("round");
     $j(".vneck-preview").css("display", "none");
     
    $j(".shirtdesigner-tabmenu > li").click(function(e){
        
        switch(e.target.id){  
            case "front-menu":
                $j("#front-menu").addClass("active");  
                $j("#sizes-menu").removeClass("active");
                

                $j("div.front-content").css("display", "none");
                $j("div.front-content").fadeIn(); 
                $j("div.sizes-content").css("display", "none");
                
                active = "front";
                
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
                
                break;
            return false; 
        }
    });
    $j(".preview-tabmenu > li").click(function(e){
        
        switch(e.target.id){ 
            case "design-menu":
                alert("design menu");
                break;
            case "swap-menu":
                alert("swap menu");
                break;
        }
    });
    
    $j(".neck-type-options").click(function(e){
        var neck_type = e.target.id;
         $j("#neck-type").val(neck_type);
         
        switch(e.target.id){ 
            case "round":
                $j(".vneck-preview").css("display", "none");
                $j(".round-preview").css("display", "block");
                var url = $j("#round-url").val();
                $j("#main-preview").css("background-image","url('"+url+"')");
                break;
            case "vneck":
                $j(".vneck-preview").css("display", "block");
                $j(".round-preview").css("display", "none");
                
                var url = $j("#vneck-url").val();
                $j("#main-preview ").css("background-image","url('"+url+"')");
                break;
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
     
     $j(".round-preview .shirt-color-box").click(function(e){
          var url =  $j("#round-url").val();
        var old_color = $j("#round-color").val();
        old_color = old_color.replace('.png','');
        var new_color = e.target.id;
        
        url = url.replace(old_color, new_color);
        
        $j("#round-color").val(new_color); 
        $j("#round-url").val(url);
        
        $j("#round-color").val(e.target.id);
        $j("#main-preview").css("background-image","url('"+url+"')");
                
    });
    
    $j(".vneck-preview .shirt-color-box").click(function(e){
        
        var url =  $j("#vneck-url").val();
        var old_color = $j("#vneck-color").val();
        old_color = old_color.replace('.png','');
        var new_color = e.target.id;
        console.log('old url'+url);
        url = url.replace(old_color, new_color);
        console.log('o'+old_color);
        console.log('n'+new_color);
        console.log('new url'+url);
        
        $j("#vneck-color").val(new_color); 
        $j("#vneck-url").val(url);
        
        $j("#vneck-color").val(e.target.id);
        $j("#main-preview ").css("background-image","url('"+url+"')");
                
    });
    
     
    $j('.submit').click(function(e) {
        if (($j("#s").val() == "") && ($j("#m").val() == "") && ($j("#l").val() == "") && ($j("#xl").val() == "")){
            alert("Please choose shirt size");
        } else {
            
            
            $j("#s-size").val($j("#s").val());
            $j("#m-size").val($j("#m").val());
            $j("#l-size").val($j("#l").val());
            $j("#xl-size").val($j("#xl").val());
            
            var reviewFront = document.getElementById("review-front");
            
            
            switch ($j("#neck-type").val()){
                case "round":
                    reviewFront.src = $j("#round-url").val();
                    
                    $j("#front-image-url").val($j("#round-url").val());
                    break;
                case "vneck":
                    reviewFront.src = $j("#vneck-url").val();
                    $j("#front-image-url").val($j("#vneck-url").val());
                    break;
            }
            
            review();
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


