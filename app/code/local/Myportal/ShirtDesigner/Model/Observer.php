<?php
class Myportal_ShirtDesigner_Model_Observer
{
    
	   public function hookToAddToCartBefore($observer)
	   {
               Mage::log('hookToAddToCartBefore event called');
               echo '<script type="text/javascript">alert("stopWhenAddingToCartOKAAAAY!");</script>';
	   /*      $event = $observer->getEvent();
	         $model = $event->getPage();
	     		print_r($model->getData());
	         *///die('test');
	 } 
} 
?>
