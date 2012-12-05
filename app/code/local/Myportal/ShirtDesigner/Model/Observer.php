<?php
class Myportal_ShirtDesigner_Model_Observer
{
    
	   public function hookToAddToCartBefore($observer)
	   {
               Mage::log('hookToAddToCartBefore event called');
               $event = $observer->getEvent();
               $quote_item = $event->getQuoteItem();
               $price = $quote_item->getProduct()->getPrice();
                
               $new_price = Mage::getSingleton('core/session')->getNewPrice();
               
               $quote_item->setOriginalCustomPrice($new_price);
               $quote_item->save();
           
	 } 
} 
?>
