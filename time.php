<?php


include_once("config.lib.php");


if(isset($_POST['backorder'])){
$curr=$_POST['curr'];
$rno=$_POST['round'];
	$sql='SELECT sum(placedorder) as backsum from player where seen=0 and sendto='.$curr.' and round<'.$rno.'';
	$result=mysqli_query($conn,$sql);
	$found=mysqli_num_rows($result); 
	if($found>0){
	$row=mysqli_fetch_array($result);
	echo $row['backsum'];
	$query ="UPDATE player SET seen='1' WHERE sendto =  '$curr' AND seen='0' AND `round`<'$rno'"; 
	$result=mysqli_query($conn,$query);
	}
	
	else{
		echo '0';}
		
	
	}
	
	if(isset($_POST['orderseen'])){
$curr=$_POST['curr'];
$rno=$_POST['round'];
$x=$rno-1;
$clms='r'.$x;
$x=$x-1;
while($x>0){
	$clms=$clms.'+'.'r'.$x;
	$x--;}
	$sql='SELECT sum('.$clms.') as psum,r'.$rno.' as porder from orders where id='.$curr.'';
	$result=mysqli_query($conn,$sql);
	$found=mysqli_num_rows($result); 
	if($found>0){
	$row=mysqli_fetch_array($result);
	echo $row['psum']." ".$row['porder'];
	}
	}
	
	


if(isset($_POST['mancheck']))
{


$var = date("H:i");
echo $var; echo " ";


$sql="SELECT * 
FROM  `timecheck` 
WHERE DATE =  '2015-02-13'
AND TIME <= '$var'
ORDER BY TIME DESC 
LIMIT 1";

$result=mysqli_query($conn,$sql);

$row=mysqli_fetch_array($result);
$sno=$row['sno'];

echo $sno; echo " ";

echo $row['time']; echo " ";

/*$sql= "SELECT * FROM `customerdemandseen` WHERE sno=1";

$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_array($result);

$x=$sno;


//echo $row[$seen];

$flag=0;

while($x>0)
{
	//echo $x; $x=$x-1;
$seen="r".$x;


if($row[$seen]==0)
{$x=$x-1;}
else {$flag=1;break;}

}


echo $x+1;*/
}


if(isset($_POST['roundupdate']))
{
$var = date("H:i");
echo $var; echo " ";


$sql="SELECT * 
FROM  `timecheck` 
WHERE DATE =  '2015-02-13'
AND TIME <= '$var'
ORDER BY TIME DESC 
LIMIT 1";

$result=mysqli_query($conn,$sql);

$row=mysqli_fetch_array($result);
$sno=$row['sno'];

echo $sno; echo " ";

echo $row['time']; echo " ";
}

?>



