<?
$data = strip_tags($_POST['data']);
$data = str_replace("\n","",$data);
$data = str_replace("\\","",$data);
$data = str_replace("  "," ",$data);

$fp = fopen('data.json', 'w');
fwrite($fp, $data);
fclose($fp);
?>
