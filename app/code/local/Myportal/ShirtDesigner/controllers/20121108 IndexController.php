<?php
 
class Myportal_ShirtDesigner_IndexController extends Mage_Core_Controller_Front_Action
{
    protected $_t;
    // Shirt Designer (Standard)
    public function indexAction()
    {
        
        // Initialize array
        $list_round_tshirt = array("m-tshirts","m-vintagetees","m-vneck","w-blouse","w-jerseyshirt","w-ringertees",
            "w-sportyshirt","w-tshirts","w-vneck");
        $list_collar_tshirt = array("m-polo","w-polo");
        $list_round_longsleeves = array("m-longsleeves","w-longsleeves","m-3fourthsleeves","m-jackets");
        $list_hoody = array("w-custom-hoody","m-custom-hoody");
        $list_men = array("m-3fourthsleeves","m-jackets","m-longsleeves","m-polo","m-ringertees","m-sando","m-sleeveless","m-tanktop","m-tshirts","m-vintagetees","m-vneck");
        $list_women = array("w-blouse","w-jerseyshirt","w-longsleeves","w-polo","w-pololongsleeves","w-ringertees", "w-sportyshirt","w-tshirts","w-vneck");
        $list_existing_designs = array("m-d1","m-d2","m-d3","m-d4","m-d5","w-d1","w-d2","w-d3","w-d4","w-d5","w-d6","w-d7");
        $this->loadLayout(); 

        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-1.7.1.min.js');
        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-ui.min.js');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/sarris.js');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/text-styles.js');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/kinetic.js');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/functions.js');
        $this->getLayout()->getBlock('head')->addCss('shirtdesigner/style.css');
        
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/jquery.simplemodal.js.js');
        $this->getLayout()->getBlock('head')->addCss('shirtdesigner/customization-type.css');

        $block = $this->getLayout()->createBlock(
		'Mage_Core_Block_Template',
		'shirtdesigner',
		array('template' => 'shirtdesigner/shirtdesigner.phtml')
		);
        
        $params = $this->getRequest()->getParams();
        
        if($params['sku']=='m-custom-tshirt' || $params['sku']=='m-custom-longsleeves' || 
                $params['sku']=='w-custom-tshirt' || $params['sku']=='w-custom-longsleeves'|| 
                $params['sku']=='m-custom-hoody' || $params['sku']=='w-custom-hoody'){
             $url = Mage::getUrl();
             $url = $url.'shirtdesigner/index/customizeShirtDesign?sku='.$params['sku'];
             $this->_redirectUrl($url);
        } if (in_array($params['sku'],$list_existing_designs)){
            $url = Mage::getUrl();
            $url = $url.'shirtdesigner/index/chooseFromExistingDesigns?sku='.$params['sku'].'&product_id='.$params['product_id'];
            $this->_redirectUrl($url);
         
     }
        
        $sku = $params['sku']? $params['sku'] : "";
        $block->setData('sku',$sku);
        
        // SIDE IMAGES
        if (in_array($sku,$list_round_tshirt)){
            $url = Mage::getUrl();
            $left_url = $url."media/shirtdesigner/images/illustration/tshirt/standard-sides/round-left.png";
            $right_url = $url."media/shirtdesigner/images/illustration/tshirt/standard-sides/round-right.png";
        } else if (in_array($sku,$list_collar_tshirt)){
            $url = Mage::getUrl();
            $left_url = $url."media/shirtdesigner/images/illustration/tshirt/standard-sides/collar-left.png";
            $right_url = $url."media/shirtdesigner/images/illustration/tshirt/standard-sides/collar-right.png";
        } else if (in_array($sku,$list_round_longsleeves)){
            $url = Mage::getUrl();
            $left_url = $url."media/shirtdesigner/images/illustration/longsleeves/standard-sides/round-left.png";
            $right_url = $url."media/shirtdesigner/images/illustration/longsleeves/standard-sides/round-right.png";
        } else if ($sku == "w-pololongsleeves" ){
            $url = Mage::getUrl();
            $left_url = $url."media/shirtdesigner/images/illustration/longsleeves/standard-sides/collar-left.png";
            $right_url = $url."media/shirtdesigner/images/illustration/longsleeves/standard-sides/collar-right.png";
        }
        
        $block->setData('left-custom-shirt-url',$left_url);
        $block->setData('right-custom-shirt-url',$right_url);
        
        // SIZE CHARTS
        if ('m-' == substr($sku, 0, 2)){
            $url = Mage::getUrl();
            $size_chart_url = $url."media/shirtdesigner/images/size-charts/men.png";
        } else if ('w-' == substr($sku, 0, 2)){
            $url = Mage::getUrl();
            $size_chart_url = $url."media/shirtdesigner/images/size-charts/women.png";
        }
        
        $block->setData('size-chart-url',$size_chart_url);
        
        
        $block->setData('product_id',$params['product_id']);
        
        
        $resource = Mage::getSingleton('core/resource');
        $readConnection = $resource->getConnection('core_read');
        $query = 'SELECT max(design_id) FROM shirt_designer';
        $results = $readConnection->fetchAll($query);
        //echo $results[0]['max(design_id)'] + 1;
        $block->setData('design_id',$results[0]['max(design_id)'] + 1);
        //$this->createProduct();
        //$this->getLayout()->getBlock('content')->append($color_block);
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
         $url = Mage::getUrl();
         $url = $url.'shirtdesigner/index/customizeShirtDesign?sku='.$new_sku;
         $this->_redirectUrl($url);
         
     } else if (in_array($sku,$list_longsleeves)) {
         $new_sku = str_replace($to_be_replaced,"custom-longsleeves",$params['sku']);
         $url = Mage::getUrl();
         $url = $url.'shirtdesigner/index/customizeShirtDesign?sku='.$new_sku;
         $this->_redirectUrl($url);
     } else {
         
         $url = Mage::getUrl();
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
 /*
  * @desc Save the custom shirts and redirect to Shirt Designer 2 (Custom)
  * 
  */
  
 public function createShirtDesignAction(){
     $list_men = array("m-custom-tshirt","m-custom-longsleeves","m-custom-hoody");
     $list_women = array("w-custom-tshirt","w-custom-longsleeves","w-custom-hoody");
     
     $param = $this->getRequest()->getParams();
     
     //print_r($param);
     
     define('UPLOAD_DIR', 'media/shirtdesigner/images/custom-shirts/');
     //$path = Mage::getBaseDir().DS.'media/shirtdesigner/images/custom-shirts'.DS;
     define('UPLOAD_DIR', $path);
     $front_img = $param['front-custom-shirt-code'];
     $front_img = str_replace('data:image/png;base64,', '', $front_img);
     $front_img = str_replace(' ', '+', $front_img);
     $front_data = base64_decode($front_img);
     $front_url = UPLOAD_DIR  . 'f-'.$param['design-id'].'.png';
     $front_success = file_put_contents($front_url, $front_data);
    // mkdir("media/shirtdesigner/images/custom-shirts/", 0777);
     
     if($front_success) {
         echo '<script type="text/javascript">alert("'.$front_success.'");</script>';
     
     } else {
         echo '<script type="text/javascript">alert("error");</script>';
     
     }
     /*
     try {
         $front_sucess = file_put_contents($front_url, $front_data);
         echo '<script type="text/javascript">alert("SUCESS'.$front_success.'");</script>';
     }catch (Exception $e) {
         echo '<script type="text/javascript">alert("ERROR: '.$e.'");</script>';
     }
     */
   
     //$path = Mage::getBaseDir().DS.'media/shirtdesigner/images/custom-shirts'.DS;
     //echo '<script type="text/javascript">alert("'.$path.'");</script>';
     
     /*  try
    {
        $path = Mage::getBaseDir().DS.'customer_documents'.DS;  //desitnation directory
        $fname = $_FILES['docname']['name']; //file name
        $uploader = new Varien_File_Uploader('docname'); //load class
        $uploader->setAllowedExtensions(array('doc','pdf','txt','docx')); //Allowed extension for file
        $uploader->setAllowCreateFolders(true); //for creating the directory if not exists
        $uploader->setAllowRenameFiles(false); //if true, uploaded file's name will be changed, if file with the same name already exists directory.
        $uploader->setFilesDispersion(false);
        $uploader->save($path,$fname); //save the file on the specified path
        echo '<script type="text/javascript">alert("'.$front_success.'");</script>';
    }
    catch (Exception $e)
    {
        echo 'Error Message: '.$e->getMessage();
        echo '<script type="text/javascript">alert("error'.$e->getMessage().'");</script>';
    }
    */
     
     $back_img = $param['back-custom-shirt-code'];
     $back_img = str_replace('data:image/png;base64,', '', $back_img);
     $back_img = str_replace(' ', '+', $back_img);
     $back_data = base64_decode($back_img);
     $back_url = UPLOAD_DIR  . 'b-'.$param['design-id'].'.png';
     $back_success = file_put_contents($back_url, $back_data);
     
     //echo 'front'.$front_url.'<br/>';
     //   echo 'back'.$back_url;
        
     $left_img = $param['left-custom-shirt-code'];
     $left_img = str_replace('data:image/png;base64,', '', $left_img);
     $left_img = str_replace(' ', '+', $left_img);
     $left_data = base64_decode($left_img);
     $left_url = UPLOAD_DIR  . 'l-'.$param['design-id'].'.png';
     $left_success = file_put_contents($left_url, $left_data);
     
     
     $right_img = $param['right-custom-shirt-code'];
     $right_img = str_replace('data:image/png;base64,', '', $right_img);
     $right_img = str_replace(' ', '+', $right_img);
     $right_data = base64_decode($right_img);
     $right_url = UPLOAD_DIR  . 'r-'.$param['design-id'].'.png';
     $right_success = file_put_contents($right_url, $right_data);

     $this->loadLayout(); 

        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-1.7.1.min.js');
        $this->getLayout()->getBlock('head')->addJs('jquery/jquery-ui.min.js');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/sarris.js');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/text-styles.js');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/kinetic.js');
        $this->getLayout()->getBlock('head')->addJs('shirtdesigner/functions-custom.js');
        $this->getLayout()->getBlock('head')->addCss('shirtdesigner/style.css');
$this->getLayout()->getBlock('head')->addJs('shirtdesigner/ajaxupload.3.5.js');
        
        $block = $this->getLayout()->createBlock(
		'Mage_Core_Block_Template',
		'shirtdesigner',
		array('template' => 'shirtdesigner/shirtdesigner-custom.phtml')
		);
        $resource2 = Mage::getSingleton('core/resource');
        $readConnection2 = $resource2->getConnection('core_read');
        $query2 = 'SELECT entity_id FROM catalog_product_entity where sku="'.$param['sku'].'"';
        $results2 = $readConnection2->fetchAll($query2);
        $product_id = $results2[0][entity_id];
        
        
        $block->setData('sku',$param['sku']);
        $block->setData('product_id',$product_id); //FIND SOLUTION
        $block->setData('front-custom-shirt-url','../../'.$front_url);
        $block->setData('back-custom-shirt-url','../../'.$back_url);
        $block->setData('left-custom-shirt-url','../../'.$left_url);
        $block->setData('right-custom-shirt-url','../../'.$right_url);
        
        
        // SIZE CHARTS
        if ('m-' == substr($param['sku'], 0, 2)){
            $url = Mage::getUrl();
            $size_chart_url = $url."media/shirtdesigner/images/size-charts/men.png";
        } else if ('w-' == substr($param['sku'], 0, 2)){
            $url = Mage::getUrl();
            $size_chart_url = $url."media/shirtdesigner/images/size-charts/women.png";
        }
        
        $block->setData('size-chart-url',$size_chart_url);
        
        
        
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
        $block->setData('design_id',$results[0]['max(design_id)'] + 1);
        $this->getLayout()->getBlock('content')->append($block);	
	$this->renderLayout();
       
        
        
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
        
        $url = Mage::getUrl();
        $url = $url.'checkout/cart/add?product='.$param['product-id'].'&qty='.$qty;
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
            $url = Mage::getUrl();
            $size_chart_url = $url."media/shirtdesigner/images/size-charts/men.png";
        } else if ('w-' == substr($sku, 0, 2)){
            $url = Mage::getUrl();
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
        $url = Mage::getUrl();
        
        $url = str_replace($url,"",$param['front-image-url']);
        $design->setFrontDesignUrl($url);
        
        $qty = intval($param['s-size']) + intval($param['m-size']) + intval($param['l-size']) + intval($param['xl-size']);
        
        $design->save(); 
        
        Mage::getSingleton('core/session')->setDesignId($param['design-id']);
        
        $url = Mage::getUrl();
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
        
        //echo '<script type="text/javascript">alert("start");</script>';
        $url = Mage::getUrl();
        $uploaddir = 'media/shirtdesigner/images/uploads/';// .$design_id.'/'
        $file = $uploaddir .$design_id."-". basename($_FILES['uploadfile']['name']); 
        
        if (move_uploaded_file($_FILES['uploadfile']['tmp_name'], $file)) { 
            echo "success"; 
        } else {
            echo "error";
        } 
    }

    
}

?>