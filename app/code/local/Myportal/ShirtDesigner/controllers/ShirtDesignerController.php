<?php

class Myportal_ShirtDesigner_ShirtDesignerController extends Mage_Adminhtml_Controller_Action
{

    public function indexAction() {
         
        
    
        $design = Mage::getModel('shirtdesigner/design');
        //$param = $this->getRequest()->getParams();
        
       $resource = Mage::getSingleton('core/resource');
        $readConnection = $resource->getConnection('core_read');
        $query = 'SELECT * FROM shirt_designer group by timestamp desc';
        $results = $readConnection->fetchAll($query);
        
        $this->loadLayout(); 
        $this->_setActiveMenu('shirtdesigner/adminhtml_shirtdesigner');
        $block = $this->getLayout()->createBlock(
		'Mage_Core_Block_Template',
		'shirtdesigneradminhtml',
		array('template' => 'shirtdesigner/adminhtml.phtml')
		);
        $block->setData('results',$results);
        $url = Mage::getUrl('',array('_secure'=>true));
        $block->setData('url',$url);
        $this->getLayout()->getBlock('head')->addCss('shirtdesigner/admin-style.css');
        $this->getLayout()->getBlock('content')->append($block);
        $this->renderLayout();
      
        
    }
    
    public function detailsAction(){
        $this->loadLayout(); 
        
        $param = $this->getRequest()->getParams();
        //echo $param['design_id'];
        
        //echo '<script type="text/javascript">alert("ORDER ID: '.$this->_design.'");</script>';
        
        $this->getLayout()->getBlock('head')->addCss('shirtdesigner/admin-style.css');
        $block = $this->getLayout()->createBlock(
		'Mage_Core_Block_Template',
		'shirtdesignerdetails',
		array('template' => 'shirtdesigner/details.phtml')
		);
        
        $model = Mage::getModel  ('shirtdesigner/design');
        $model->load($param['design_id']);     
        $data = $model->getData();
        $block->setData('data',$data);
        $block->setData('order_id',$param['order_id']);
        $this->getLayout()->getBlock('content')->append($block);
        $this->renderLayout();
    }
    
    function create_zip($files = array(),$destination = '',$overwrite = false) {
  
        if(file_exists($destination) && !$overwrite) { return false; }

        $valid_files = array();

        if(is_array($files)) {

            foreach($files as $file) {
            if(file_exists($file[0])) {

                $valid_files[] = $file;
            }
            }
        }
        if(count($valid_files)) {
            $zip = new ZipArchive();
            if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
            return false;
            }

            foreach($valid_files as $file) {
                $zip->addFile($file[0],$file[1]);
            }
            $zip->close();


            if (file_exists($destination)) {
                echo '<script type="text/javascript">alert("file exists");</script>';
                header("Content-Type: application/zip"); 
                header("Content-Disposition: attachment; filename=files.zip");   
                $zip = fopen($destination,"r"); // open the zip file
                echo fpassthru($zip); // deliver the zip file
                unlink($destination);
            } 
            return file_exists($destination);
        }
        else
        {
            return false;
        }
    }
    public function downloadFilesAction() {
        $param = $this->getRequest()->getParams();
        
        
        $model = Mage::getModel  ('shirtdesigner/design');
        $model->load($param['design_id']);     
        $data = $model->getData();
        
        
        $dir = 'design-'.$param['order_id'];

        $files_to_zip = array(
        array('/home/shop/public_html/'.$data['front_design_url'], $dir.'/front-design.jpg'),
        array('/home/shop/public_html/'.$data['back_design_url'], $dir.'/back-design.jpg'),
        array('/home/shop/public_html/'.$data['front_design_url'], $dir.'/left-design.jpg'),
        array('/home/shop/public_html/'.$data['back_design_url'], $dir.'/right-design.jpg')
        );

        $images = explode(",", $data['front_images']);
        foreach($images as $d) {
            $p = str_replace('https://www.gushshop.com/shop/','/home/shop/public_html/',$d);
            $q = explode("/",$p);
            $end = end($q);
            $files_to_zip[] = array($p,$dir.'/'.$end);
        }

        $images = explode(",", $data['back_images']);
        foreach($images as $d) {
            $p = str_replace('https://www.gushshop.com/shop/','/home/shop/public_html/',$d);
            $q = explode("/",$p);
            $end = end($q);
            $files_to_zip[] = array($p,$dir.'/'.$end);
        }

        $images = explode(",", $data['left_images']);
        foreach($images as $d) {
            $p = str_replace('https://www.gushshop.com/shop/','/home/shop/public_html/',$d);
            $q = explode("/",$p);
            $end = end($q);
            $files_to_zip[] = array($p,$dir.'/'.$end);
        }

        $images = explode(",", $data['right_images']);
        foreach($images as $d) {
            $p = str_replace('https://www.gushshop.com/shop/','/home/shop/public_html/',$d);
            $q = explode("/",$p);
            $end = end($q);
            $files_to_zip[] = array($p,$dir.'/'.$end);
        }


        $path = '/home/shop/public_html/media/'.$dir.'.zip';
        $result = $this->create_zip($files_to_zip,$path);

        /******/
        
        $this->loadLayout(); 
        
        $param = $this->getRequest()->getParams();
        
        
        $this->getLayout()->getBlock('head')->addCss('shirtdesigner/admin-style.css');
        $block = $this->getLayout()->createBlock(
		'Mage_Core_Block_Template',
		'shirtdesignerdetails',
		array('template' => 'shirtdesigner/details.phtml')
		);
        
        $block->setData('data',$data);
        $block->setData('order_id',$param['order_id']);
        $this->getLayout()->getBlock('content')->append($block);
        $this->renderLayout();
    }
}