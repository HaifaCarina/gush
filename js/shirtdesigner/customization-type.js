

var $j = jQuery.noConflict();

/*

$j(document).ready(function(){
        window.console = $j('<iframe>').hide().appendTo('body')[0].contentWindow.console;
        var link;
        
        var options = document.createElement('div');
        options.id = 'customize-options-dialog';
        options.setAttribute('ondblclick', 'hideCustomizeOptionsDialog()');
        options.setAttribute('style',
            'display: none; height: 244px; width: 430px; background-image: url("'+getBaseURL()+'media/shirtdesigner/images/choice.png");z-index: 10000;filter: alpha(opacity=100);filter:progid:DXImageTransform.Microsoft.Alpha(opacity=100);-moz-opacity: 1;-khtml-opacity: 1;   opacity: 1; background-color:#FFFFFF;position:fixed; top:35%; left:35%;  color:#FFFFFF ; text-align:center;vertical-align:middle;');
        $j("body").append(options);
        
        var closeImg = document.createElement('img');
        closeImg.src = getBaseURL()+'media/shirtdesigner/images/x.png';
        
        var close = document.createElement('a');
        close.className = 'modalCloseImg simplemodal-close';
        close.title = 'Close';
        close.id = "close-link";
        
        
        //$j("#close-link").append(closeImg);
        var c = '<a href="#" class="modalCloseImg simplemodal-close" ><img  src="'+getBaseURL()+'media/shirtdesigner/images/x.png'+'" /></a>';
        $j("#customize-options-dialog").append(c);
    
        
        var standard = document.createElement('div');
        standard.id = 'standard-option';
        standard.setAttribute('style','height: 244px;width: 50%;float: left;cursor: pointer;');
        $j("#customize-options-dialog").append(standard);
    
        var custom = document.createElement('div');
        custom.id = 'custom-option';
        custom.setAttribute('style','height: 244px;width: 50%;float: right;cursor: pointer;');
        $j("#customize-options-dialog").append(custom);
        
        
    $j(".customize-button").click(function(event){
        //event.isDefaultPrevented();
        event.preventDefault();
        //$j("#customize-options-dialog").css("display", "block");
        $j("#customize-options-dialog").modal();
        link = $j(this).attr("href"); 
        
    }); 
    
    $j("#standard-option").click(function(){
        //alert(link);
        window.location = link;
    });
    $j("#custom-option").click(function(){
       // alert("custom");
       //var link = "http://localhost/gush/shirtdesigner?sku=w-blouse&product_id=12";
       link = link.replace("shirtdesigner","shirtdesigner/index/decideShirtDesigner");
       window.location = link;
       //alert($j(".customize-button").attr("sku"));
    });
    
    $j('#customize-options-dialog').hover(function(){ 
        mouse_is_inside=true; 
        console.log('mouse inside');
    }, function(){ 
        mouse_is_inside=false; 
        console.log('mouse outside');
    });

    $j("body").mouseup(function(){ 
        if(! mouse_is_inside) $j('#customize-options-dialog').hide();
    });
    function hideCustomizeOptionsDialog() {
        $j("#customize-options-dialog").css("display", "none");
    }
    function getBaseURL() {
        var url = location.href;
        var pathname = location.pathname;  // window.location.pathname;
        var index1 = url.indexOf(pathname);
        var index2 = url.indexOf("/", index1 + 1);
        var baseLocalUrl = url.substr(0, index2);

        return  baseLocalUrl + "/";
    }
});
*/