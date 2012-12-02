<?php
class Myportal_ShirtDesigner_Model_Observer
{
    
	   public function hookToAddToCartBefore(Varien_Event_Observer $observer)
	   {
		echo '<script type="text/javascript">alert("stopWhenAddingToCart");</script>';
	   /*      $event = $observer->getEvent();
	         $model = $event->getPage();
	     		print_r($model->getData());
	         */die('test');
	 } 
} 
?>
