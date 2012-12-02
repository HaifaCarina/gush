<?php
 
class Myportal_ShirtDesigner_IndexController extends Mage_Core_Controller_Front_Action
{
    protected $_t;
    /*
     * @function indexAction
     * @desc Displays fabric customization panel after customize button is clicked
     */
    public function indexAction()
    {
        $params = $this->getRequest()->getParams();
        $sku = $params['sku'];
        
        $this->loadLayout(); 

        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-1.7.1.min.js');
        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-ui.min.js');
        $this->getLayout()->getBlock('head')->addCss('shirtdesigner/shirt-style.css');

        
        if (strstr($sku, 'longsleeves') || strstr($sku, 'jackets') ) {
            $this->getLayout()->getBlock('head')->addJs('shirtdesigner/customize-fabric-longsleeves.js');
            $block = $this->getLayout()->createBlock(
            'Mage_Core_Block_Template',
            'shirtdesigner',
            array('template' => 'shirtdesigner/customize-fabric.phtml')
            );
        } else if (strstr($sku, 'hoody')){
            /*$this->getLayout()->getBlock('head')->addJs('shirtdesigner/customize-fabric-hoody.js');
            $block = $this->getLayout()->createBlock(
		'Mage_Core_Block_Template',
		'shirtdesigner',
		array('template' => 'shirtdesigner/customize-fabric-hoody.phtml')
		);
            */
            
            //TESTING IN USING REAL SHIRT IMAGES
            $this->getLayout()->getBlock('head')->addJs('shirtdesigner/customize-fabric-tshirt-real.js');
            $block = $this->getLayout()->createBlock(
            'Mage_Core_Block_Template',
            'shirtdesigner',
            array('template' => 'shirtdesigner/customize-fabric-real.phtml')
            );
        } else {
            $this->getLayout()->getBlock('head')->addJs('shirtdesigner/customize-fabric-tshirt.js');
            $block = $this->getLayout()->createBlock(
            'Mage_Core_Block_Template',
            'shirtdesigner',
            array('template' => 'shirtdesigner/customize-fabric.phtml')
            );
        }
        
        
        
        $resource = Mage::getSingleton('core/resource');
        $readConnection = $resource->getConnection('core_read');
        $query = 'SELECT max(design_id) FROM shirt_designer';
        $results = $readConnection->fetchAll($query);
        $block->setData('design_id',$results[0]['max(design_id)'] + 1);
        
        //echo '<script type="text/javascript">alert("SKU: '.$sku.'");</script>';
        $block->setData('sku',$sku);
        
        
	$this->getLayout()->getBlock('content')->append($block);	
	$this->renderLayout();
       
    }
 /*
  *  @desc This function is called when user clicks the 'Customize' button in the products catalog
  *         User chooses standard or custom and redirects accordingly
  */   
 public function decideShirtDesignerAction(){
     $list_tshirt = array("m-tshirts","m-vintagetees","m-vneck","w-blouse","w-jerseyshirt","w-ringertees",
            "w-sportyshirt","w-tshirts","w-vneck","m-polo","w-polo");
     $list_longsleeves = array("m-longsleeves","w-longsleeves","w-pololongsleeves","m-3fourthsleeves");
        
     $params = $this->getRequest()->getParams();
     $sku = $params['sku'];
     $product_id = $params['product_id'];
     //echo $params['sku']."<br/>";
     $to_be_replaced = substr($params['sku'],2,strlen($params['sku']));
     
     //echo substr($params['sku'],2,strlen($params['sku']))."<br/>";
     //echo str_replace($to_be_replaced,"custom-tshirt",$params['sku']);
     if (in_array($sku,$list_tshirt)){
         $new_sku = str_replace($to_be_replaced,"custom-tshirt",$params['sku']);
         //echo $sku['sku'];
         $url = Mage::getUrl('',array('_secure'=>true));
         $url = $url.'shirtdesigner/index/customizeShirtDesign?sku='.$new_sku;
         $this->_redirectUrl($url);
         
     } else if (in_array($sku,$list_longsleeves)) {
         $new_sku = str_replace($to_be_replaced,"custom-longsleeves",$params['sku']);
         $url = Mage::getUrl('',array('_secure'=>true));
         $url = $url.'shirtdesigner/index/customizeShirtDesign?sku='.$new_sku;
         $this->_redirectUrl($url);
     } else {
         
         $url = Mage::getUrl('',array('_secure'=>true));
         $url = $url.'shirtdesigner/?sku='.$sku.'&product_id='.$product_id;
         $this->_redirectUrl($url);
     }
     
     
     
     
 }
 public function customizeShirtDesignAction(){
     $params = $this->getRequest()->getParams();
     
     $sku = $params['sku'];
     
     $this->loadLayout(); 

        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-1.7.1.min.js');
        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-ui.min.js');
        $this->getLayout()->getBlock('head')->addCss('shirtdesigner/shirt-style.css');

        if ($sku == "m-custom-tshirt" || $sku == "w-custom-tshirt") {
            $this->getLayout()->getBlock('head')->addJs('shirtdesigner/shirt-functions-tshirt.js');
            $block = $this->getLayout()->createBlock(
		'Mage_Core_Block_Template',
		'shirtdesigner',
		array('template' => 'shirtdesigner/shirtcustomizer.phtml')
		);
        } else if ($sku == "m-custom-longsleeves" || $sku == "w-custom-longsleeves") {
            $this->getLayout()->getBlock('head')->addJs('shirtdesigner/shirt-functions-longsleeves.js');
            $block = $this->getLayout()->createBlock(
		'Mage_Core_Block_Template',
		'shirtdesigner',
		array('template' => 'shirtdesigner/shirtcustomizer.phtml')
		);
        } else if ($sku == "m-custom-hoody" || $sku == "w-custom-hoody") {
            $this->getLayout()->getBlock('head')->addJs('shirtdesigner/shirt-functions-hoody.js');
            $block = $this->getLayout()->createBlock(
		'Mage_Core_Block_Template',
		'shirtdesigner',
		array('template' => 'shirtdesigner/shirtcustomizer-hoody.phtml')
		);
        }
        
        
        $block->setData('sku',$sku);
        
        $resource = Mage::getSingleton('core/resource');
        $readConnection = $resource->getConnection('core_read');
        $query = 'SELECT max(design_id) FROM shirt_designer';
        $results = $readConnection->fetchAll($query);
        $block->setData('design_id',$results[0]['max(design_id)'] + 1);
        
	$this->getLayout()->getBlock('content')->append($block);	
	$this->renderLayout();
       
 }
 /* @name createShirtDesign
  * @desc Displays the shirt print customization
  * 
  */
  
    public function createShirtDesignAction(){
     $list_men = array("m-custom-tshirt","m-custom-longsleeves","m-custom-hoody");
     $list_women = array("w-custom-tshirt","w-custom-longsleeves","w-custom-hoody");
     
     $param = $this->getRequest()->getParams();
        
     $this->loadLayout(); 

        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-1.7.1.min.js');
        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-ui.min.js');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/sarris.js'); //for text customization
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/text-styles.js');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/customize-print.js');
        $this->getLayout()->getBlock('head')->addCss('shirtdesigner/style.css');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/ajaxupload.3.5.js');
        
        $block = $this->getLayout()->createBlock(
		'Mage_Core_Block_Template',
		'shirtdesigner',
		array('template' => 'shirtdesigner/customize-print.phtml')
		);
        $resource2 = Mage::getSingleton('core/resource');
        $readConnection2 = $resource2->getConnection('core_read');
        $query2 = 'SELECT entity_id FROM catalog_product_entity where sku="'.$param['sku'].'"';
        $results2 = $readConnection2->fetchAll($query2);
        $product_id = $results2[0][entity_id];
        
        echo '<script type="text/javascript">console.log("SKU:'.$param['sku'].'");</script>';
        
        $block->setData('sku',$param['sku']);
        $block->setData('product_id',$product_id); //FIND SOLUTION
        $block->setData('front-custom-shirt-url',$param['front-custom-shirt-code']); 
        $block->setData('back-custom-shirt-url',$param['back-custom-shirt-code']); 
        $block->setData('left-custom-shirt-url',$param['left-custom-shirt-code']); 
        $block->setData('right-custom-shirt-url',$param['right-custom-shirt-code']); 
         
        // SIZE CHARTS
        if ('m-' == substr($param['sku'], 0, 2)){
            $url = Mage::getUrl('',array('_secure'=>true));
            $size_chart_url = $url."media/shirtdesigner/images/size-charts/men.png";
        } else if ('w-' == substr($param['sku'], 0, 2)){
            $url = Mage::getUrl('',array('_secure'=>true));
            $size_chart_url = $url."media/shirtdesigner/images/size-charts/women.png";
        }
        
        $block->setData('size-chart-url',$size_chart_url);
        
        echo '<script type="text/javascript">console.log("SIZE URL:'.$size_chart_url.'");</script>';
        
        
        $model = Mage::getModel('catalog/product');
        $_product = $model->load($product_id);
        $block->setData('product_price',number_format($_product->getPrice(), 2));  
        
                //echo "PHP: ".number_format($_product->getPrice(), 2) ;
        //echo $results[0]['max(design_id)'] + 1;
        //$block->setData('design_id',$results[0]['max(design_id)'] + 1);
        
        
        Mage::getSingleton('core/session')->setFrontCustomShirtCode($param['front-custom-shirt-code']);
        Mage::getSingleton('core/session')->setBackCustomShirtCode($param['back-custom-shirt-code']);
        Mage::getSingleton('core/session')->setFrontCustomShirtCode($param['left-custom-shirt-code']);
        Mage::getSingleton('core/session')->setBackCustomShirtCode($param['right-custom-shirt-code']);
        
        
        $resource = Mage::getSingleton('core/resource');
        $readConnection = $resource->getConnection('core_read');
        $query = 'SELECT max(design_id) FROM shirt_designer';
        $results = $readConnection->fetchAll($query);
        $design_id = $results[0]['max(design_id)'] + 1;
        $block->setData('design_id',$design_id);
        $this->getLayout()->getBlock('content')->append($block);	
	$this->renderLayout();
       
       // echo '<script type="text/javascript">alert("'.$design_id.'");</script>';
        
 }
 // Save data to custom-designs folder
    public function createNewDesignAction() {
        $design = Mage::getModel('shirtdesigner/design');
        $param = $this->getRequest()->getParams();
        
        define('UPLOAD_DIR', 'media/shirtdesigner/images/custom-designs/');
        $img = $param['front-image-code'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $file = UPLOAD_DIR  . 'f-'.$param['design-id'].'.png';
        $success = file_put_contents($file, $data);
        
        
        $img2 = $param['back-image-code'];
        $img2 = str_replace('data:image/png;base64,', '', $img2);
        $img2 = str_replace(' ', '+', $img2);
        $data2 = base64_decode($img2);
        $file2 = UPLOAD_DIR  . 'b-'.$param['design-id'].'.png';
        $success2 = file_put_contents($file2, $data2);
        
        $img3 = $param['left-image-code'];
        $img3 = str_replace('data:image/png;base64,', '', $img3);
        $img3 = str_replace(' ', '+', $img3);
        $data3 = base64_decode($img3);
        $file3 = UPLOAD_DIR  . 'l-'.$param['design-id'].'.png';
        $success3 = file_put_contents($file3, $data3);
        
        
        $img4 = $param['right-image-code'];
        $img4 = str_replace('data:image/png;base64,', '', $img4);
        $img4 = str_replace(' ', '+', $img4);
        $data4 = base64_decode($img4);
        $file4 = UPLOAD_DIR  . 'r-'.$param['design-id'].'.png';
        $success4 = file_put_contents($file4, $data4);
        
        
        
        $design->setShirtColor($param['shirt-color']);
        $design->setSku($param['sku']);
        if(strlen($param['front-text-1']) > 0){
            $design->setFrontText_1($param['front-text-1']);
            $design->setFrontText_1Size($param['front-text-1-size']);
            $design->setFrontText_1Color($param['front-text-1-color']);
            $design->setFrontText_1Font($param['front-text-1-font']);
            $design->setFrontText_1Style($param['front-text-1-style']);
        }
        if(strlen($param['front-text-2']) > 0){
            $design->setFrontText_2($param['front-text-2']);
            $design->setFrontText_2Size($param['front-text-2-size']);
            $design->setFrontText_2Color($param['front-text-2-color']);
            $design->setFrontText_2Font($param['front-text-2-font']);
            $design->setFrontText_2Style($param['front-text-2-style']);
        }
        
        if(strlen($param['front-text-3']) > 0){
            $design->setFrontText_3($param['front-text-3']);
            $design->setFrontText_3Size($param['front-text-3-size']);
            $design->setFrontText_3Color($param['front-text-3-color']);
            $design->setFrontText_3Font($param['front-text-3-font']);
            $design->setFrontText_3Style($param['front-text-3-style']);
        }
        if(strlen($param['back-text-1']) > 0){
            $design->setBackText_1($param['back-text-1']);
            $design->setBackText_1Size($param['back-text-1-size']);
            $design->setBackText_1Color($param['back-text-1-color']);
            $design->setBackText_1Font($param['back-text-1-font']);
            $design->setBackText_1Style($param['back-text-1-style']);
        }
        if(strlen($param['back-text-2']) > 0){
            $design->setBackText_2($param['back-text-2']);
            $design->setBackText_2Size($param['back-text-2-size']);
            $design->setBackText_2Color($param['back-text-2-color']);
            $design->setBackText_2Font($param['back-text-2-font']);
            $design->setBackText_2Style($param['back-text-2-style']);
        }
        if(strlen($param['back-text-3']) > 0){ 
            $design->setBackText_3($param['back-text-3']);
            $design->setBackText_3Size($param['back-text-3-size']);
            $design->setBackText_3Color($param['back-text-3-color']);
            $design->setBackText_3Font($param['back-text-3-font']);
            $design->setBackText_3Style($param['back-text-3-style']);
        }
        
        if(strlen($param['left-text-1']) > 0){
            $design->setLeftText_1($param['left-text-1']);
            $design->setLeftText_1Size($param['left-text-1-size']);
            $design->setLeftText_1Color($param['left-text-1-color']);
            $design->setLeftText_1Font($param['left-text-1-font']);
            $design->setLeftText_1Style($param['left-text-1-style']);
        }
        if(strlen($param['left-text-2']) > 0){
            $design->setLeftText_2($param['left-text-2']);
            $design->setLeftText_2Size($param['left-text-2-size']);
            $design->setLeftText_2Color($param['left-text-2-color']);
            $design->setLeftText_2Font($param['left-text-2-font']);
            $design->setLeftText_2Style($param['left-text-2-style']);
        }
        if(strlen($param['left-text-3']) > 0){ 
            $design->setLeftText_3($param['left-text-3']);
            $design->setLeftText_3Size($param['left-text-3-size']);
            $design->setLeftText_3Color($param['left-text-3-color']);
            $design->setLeftText_3Font($param['left-text-3-font']);
            $design->setLeftText_3Style($param['left-text-3-style']);
        }
        
        if(strlen($param['right-text-1']) > 0){
            $design->setRightText_1($param['right-text-1']);
            $design->setRightText_1Size($param['right-text-1-size']);
            $design->setRightText_1Color($param['right-text-1-color']);
            $design->setRightText_1Font($param['right-text-1-font']);
            $design->setRightText_1Style($param['right-text-1-style']);
        }
        if(strlen($param['right-text-2']) > 0){
            $design->setRightText_2($param['right-text-2']);
            $design->setRightText_2Size($param['right-text-2-size']);
            $design->setRightText_2Color($param['right-text-2-color']);
            $design->setRightText_2Font($param['right-text-2-font']);
            $design->setRightText_2Style($param['right-text-2-style']);
        }
        if(strlen($param['right-text-3']) > 0){ 
            $design->setRightText_3($param['right-text-3']);
            $design->setRightText_3Size($param['right-text-3-size']);
            $design->setRightText_3Color($param['right-text-3-color']);
            $design->setRightText_3Font($param['right-text-3-font']);
            $design->setRightText_3Style($param['right-text-3-style']);
        }
        
        
        $design->setFrontImages($param['arts']);
        $design->setBackImages($param['arts2']);
        $design->setLeftImages($param['arts3']);
        $design->setRightImages($param['arts4']);
        
        $design->setFrontDesignUrl(UPLOAD_DIR  . 'f-'.$param['design-id'].'.png');
        $design->setBackDesignUrl(UPLOAD_DIR  . 'b-'.$param['design-id'].'.png');
        $design->setLeftDesignUrl(UPLOAD_DIR  . 'l-'.$param['design-id'].'.png');
        $design->setRightDesignUrl(UPLOAD_DIR  . 'r-'.$param['design-id'].'.png');
             
        $design->setS($param['s-size']);
        $design->setM($param['m-size']);
        $design->setL($param['l-size']);
        $design->setXl($param['xl-size']);
        
        $qty = intval($param['s-size']) + intval($param['m-size']) + intval($param['l-size']) + intval($param['xl-size']);
        
        $design->save(); 
        
        Mage::getSingleton('core/session')->setDesignId($param['design-id']);
        
        $url = Mage::getUrl('',array('_secure'=>true));
        $url = $url.'checkout/cart/add?product='.$param['product-id'].'&qty='.$qty; //checkout/cart/add?product=14&qty=1
        //echo '<script type="text/javascript">alert("'.$url.'");</script>';
        $this->_redirectUrl($url);
          
    }
    
    public function chooseFromExistingDesignsAction() {
        $params = $this->getRequest()->getParams();
        $sku = $params['sku'];
        $product_id = $params['product_id'];
        
        
        $this->loadLayout(); 
        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-1.7.1.min.js');
        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-ui.min.js');
        $this->getLayout()->getBlock('head')->addCss('shirtdesigner/style.css');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/functions-existing-designs.js');
            $block = $this->getLayout()->createBlock(
		'Mage_Core_Block_Template',
		'shirtdesigner',
		array('template' => 'shirtdesigner/shirtdesigner-existing-designs.phtml')
		);
        
        $block->setData('sku',$sku);
        $block->setData('product_id',$product_id);
        
        // SIZE CHARTS
        if ('m-' == substr($sku, 0, 2)){
            $url = Mage::getUrl('',array('_secure'=>true));
            $size_chart_url = $url."media/shirtdesigner/images/size-charts/men.png";
        } else if ('w-' == substr($sku, 0, 2)){
            $url = Mage::getUrl('',array('_secure'=>true));
            $size_chart_url = $url."media/shirtdesigner/images/size-charts/women.png";
        }
        
        $block->setData('size-chart-url',$size_chart_url);
        
        
        $resource = Mage::getSingleton('core/resource');
        $readConnection = $resource->getConnection('core_read');
        $query = 'SELECT max(design_id) FROM shirt_designer';
        $results = $readConnection->fetchAll($query);
        $block->setData('design_id',$results[0]['max(design_id)'] + 1);
        
	$this->getLayout()->getBlock('content')->append($block);	
	$this->renderLayout();
    }
    
    public function saveExistingDesignAction () {
        $design = Mage::getModel('shirtdesigner/design');
        $param = $this->getRequest()->getParams();
        
        $design->setS($param['s-size']);
        $design->setM($param['m-size']);
        $design->setL($param['l-size']);
        $design->setXl($param['xl-size']);
        $design->setSku($param['sku']);
        $url = Mage::getUrl('',array('_secure'=>true));
        
        $url = str_replace($url,"",$param['front-image-url']);
        $design->setFrontDesignUrl($url);
        
        $qty = intval($param['s-size']) + intval($param['m-size']) + intval($param['l-size']) + intval($param['xl-size']);
        
        $design->save(); 
        
        Mage::getSingleton('core/session')->setDesignId($param['design-id']);
        
        $url = Mage::getUrl('',array('_secure'=>true));
        $url = $url.'checkout/cart/add?product='.$param['product-id'].'&qty='.$qty;
        
        $this->_redirectUrl($url);
        
        
    }
    
    public function testAction () {
        /*$this->loadLayout(); 
        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-1.7.1.min.js');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/ajaxupload.3.5.js');
        echo "test";
        echo '<script type="text/javascript">alert("asdasd");</script>';
        //$this->getLayout()->getBlock('content')->append($block);	
	$this->renderLayout();
        */
        
        $resource = Mage::getSingleton('core/resource');
        $readConnection = $resource->getConnection('core_read');
        $query = 'SELECT max(design_id) FROM shirt_designer';
        $results = $readConnection->fetchAll($query);
        $design_id = $results[0]['max(design_id)'] + 1;
        
        $url = Mage::getUrl('',array('_secure'=>true));
        $uploaddir = $url.'media/shirtdesigner/images/uploads/'.$design_id.'/';
        
        $file = $uploaddir .$design_id."-". basename($_FILES['uploadfile']['name']); 
        echo '<script type="text/javascript">console.log("url:'.$url.'");</script>';
        echo '<script type="text/javascript">console.log("uploaddir:'.$uploaddir.'");</script>';
       
        try {    
            $uploader = new Varien_File_Uploader('uploadfile');
            
            $uploader->setAllowedExtensions(array('jpg','jpeg','gif','png'));
            $uploader->setAllowRenameFiles(false);
            $uploader->setFilesDispersion(false);

            $path = Mage::getBaseDir('media').'/shirtdesigner/images/uploads/'.$design_id.'/';

            $uploader->save($path, basename($_FILES['uploadfile']['name']));
            echo "success";
            //echo '<script type="text/javascript">console.log("Message:SUCCESS");</script>';
        } catch (Exception $e) {
            echo "error";
            //echo '<script type="text/javascript">console.log("Message:'.$e->getMessage().'");</script>';    
        }
        
    }

    
}

?>