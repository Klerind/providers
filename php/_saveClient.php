<?php
$data = $_REQUEST['data'];
$myfile = fopen("../json/inputs.json", "w") or die("Unable to open file!");
fwrite($myfile,$data);
fclose($myfile);
 ?>
