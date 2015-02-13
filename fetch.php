<?php


include_once("config.lib.php");
$var = date("H:i");
echo $var;
$sql="SELECT * 
FROM  `timecheck` 
WHERE DATE =  '2015-02-11'
AND TIME < '$var'
ORDER BY TIME DESC 
LIMIT 1";

$result=mysqli_query($conn,$sql);

$row=mysqli_fetch_array($result);
$sno=$row['sno'];

echo $sno;

?>


