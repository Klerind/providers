<?php
//variables
$file = file_get_contents("../json/inputs.json");
$content = json_decode($file,true);
for ($i=0; $i < count($_GET['providers']); $i++) {
  $providers[] = ["id"=>$_GET['providers'][$i]];
}
//createClient
$content['clients'][] = [
  "name"=>$_GET['name'],
  "email"=>$_GET['email'],
  "phone"=>$_GET['phone'],
  "providers"=>$providers
];
//checks for providers in inputs.json file
if($content['providers'] == false){
  //createProviders
  $providers = [];
  for ($i=1; $i <= 5; $i++) {
    $providers[] = ["id"=>$i,"name"=>"Provider".$i];
  }
  $content['providers'] = $providers;
}
$dataToFile = json_encode($content);
$myfile = fopen("../json/inputs.json", "w") or die("Unable to open file!");
fwrite($myfile,$dataToFile);
fclose($myfile);
header("Location:../index.html");
//exit():
 ?>
