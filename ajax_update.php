<?
//$data = json_encode($_POST['data'], JSON_PRETTY_PRINT);
//$data = json_encode($_POST['data']);
$data = strip_tags($_POST['data']);
//$data = ltrim($data,$data[0]);
//$data = rtrim($data,'"');
$data = str_replace("\n","",$data);
$data = str_replace("\\","",$data);
$data = str_replace("  "," ",$data);

$fp = fopen('data.json', 'w');
fwrite($fp, $data);
fclose($fp);
?>