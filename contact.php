<?php
if($_SERVER['REQUEST_METHOD']!=='POST'||!empty($_POST['website'])){header('Location: contact.html');exit;}
$c=fn($k)=>trim(strip_tags($_POST[$k]??''));
$name=$c('name');$phone=$c('phone');$email=filter_var($c('email'),FILTER_VALIDATE_EMAIL)?:'';
if(!$name||!$phone){header('Location: contact.html');exit;}
$body="Name: $name\nPhone: $phone\nEmail: $email\nService: ".$c('service')."\nBill: ".$c('bill')."\n\n".$c('msg');
$h="From: Website <noreply@greentechrenewable.com>\r\n".($email?"Reply-To: $email\r\n":'');
mail('info@greentechrenewable.com','New solar enquiry from '.$name,$body,$h);
header('Location: contact.html?sent=1#');
