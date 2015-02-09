<?php
include_once("config.lib.php");
session_start();
$_SESSION["id"]=$_POST['id'];
$id=$_POST['id'];
$result = mysqli_query($conn,"SELECT * FROM team WHERE Player1=$id OR Player2=$id OR Player3=$id OR Player4=$id");
$prev=0;$next=0;$prev1=0;$prev2=0;$next1=0;$next2=0;
if($result)
{
        $found=mysqli_num_rows($result); 
        if($found>0)
        {  $row = mysqli_fetch_array($result);
           $team_id=$row['sno']; 
          if($row['Player1']==$id){
            $next1=$row['Player2']; 
            $next2=$row['Player3'];
            $stage=1;
            echo '<script src="js/check1.js"></script>';
            echo '<script src="js/retailer.js"></script>';

          }

          else if($row['Player2']==$id){
            $next=$row['Player4'];
            $prev=$row['Player1'];
            $stage=2;
            echo '<script src="js/check2.js"></script>';
            echo '<script src="js/check1.js"></script>';
          }

          else if($row['Player3']==$id){
            $next=$row['Player4'];
            $prev=$row['Player1'];
            $stage=3;
            echo '<script src="js/check1.js"></script>';
            echo '<script src="js/check2.js"></script>';
          }

          else if($row['Player4']==$id){
            $prev1=$row['Player2'];
            $prev2=$row['Player3'];
            $stage=4;
            echo '<script src="js/check2.js"></script>';
          }
        }

       
}



//echo $id.$next.$prev.$stage;

 echo"<script> var team_id=$team_id; </script>";
 echo "<script>var curr=$id;var next=$next;var prev=$prev;var stage=$stage;</script>";
 echo "<script>var prev1=$prev1;var prev2=$prev2; var next1=$next1;var next2=$next2;</script>";

?>


<html>
<head>
<script type="text/javascript" src="js/jquery.js"></script>
<script src="js/stage.js"></script>
<script src="js/global.js"></script>
<script src="js/transaction.js"></script>
<script src="js/main.js"></script>
<link rel="stylesheet" href="magnific-popup/magnific-popup.css"> 
<script src="magnific-popup/jquery.magnific-popup.js"></script>
<link rel="stylesheet" type="text/css" href="css/layout.css">
</head>

<body>

<center>
	<h1>BEER Factory</h1>
</center>

<div class="cost">
<div class="innerBox1">

<p id="Icost">Inventory cost:<span>200</span></p><br><br>
	<p id="Bcost">Backlog cost:<span>300</span></p><br><br>
	<p id="bankres">Bank Reserve:<span>1000</span></p><br><br>
	<p id="ul">Capacity:<span>35</span></p><br><br>
	<p id="ce">Extension Cost:<span>20</span></p><br><br>
	</div>
	</div>
	
	
	

<div class="box effect">
	<p id="Round">Round No:<span>1</span></p>

<div class="innerBox2">
<center>
	<h2 id="curr">WHOLESALER</h2>
</center>
<div id="orderdiv" >
	<p>ORDER:</p>
	<select id="orderTo" >
		<option value="Wholesaler1">Wholesaler1</option>
		<option value="Wholesaler2">Wholesaler2</option>
	</select>
	<input type="number" id="order" class="field" name="order" min="1">
	<input type="button" id="orderbutton" class="button" onclick="order()" value="ok">
</div>
<div id="supplydiv" >
	<p>SUPPLY:</p>
	<select id="supplyTo" >
		<option value="Wholesaler1">Wholesaler1</option>
		<option value="Wholesaler2">Wholesaler2</option>
	</select>
	<input type="number" id="supply" class="field" name="supply" min="1">
	<input type="button" id="supplybutton" class="button" onclick="supply()" value="ok">

</div>
<div id="extension">
	<p>CAPACITY INCREMENT:</p>
	<input type="number" id="ext" class="field" name="capacityextensionamount" min="1">
	<input type="button" id="capacitybutton" class="button" onclick="capacity()" value="ok">

</div>
<br>
<div class="details">
	<p>Pending order:<span id="Porder">20</span></p>
	<p id="pending1">From wholesaler1:<span id="Porder1">20</span></p>
	<p id="pending2">From wholesaler2:<span id="Porder2">3</span></p>

	<p>Inventory:<span id="Inv">30</span></p>
	</div>
</div>

</div>
<button onclick="show()">View Transactions</button>

<div class="box3" id="box3"style="display:none">
	<p>SUBSIDIARY</p>
	<input type="number" id="sublet" class="field" name="sublet" min="1">
	<input type="button" id="subletbutton" class="button" onclick="sublet()" value="ok">
    <p id="subletcost">Cost for 1 Product: <span id="subcost">3</span></p> 
    <p id="sublettime">Delay time:<span id="subtime">3</span></p> 
    <br>
    <p>LABOURERS</p>
	<p id="clab">Current labourers:<span id="currlab">20</span></p>
	Supply:<input type="number" id="labsupply" class="field" name="labsupply" min="1">
	<input type="button" id="labsup" class="button" onclick="labourer()" value="ok">
	<p>labourer add</p>
    <input type="number" id="laboureradd" class="field" name="laboureradd" min="1">
	<input type="button" id="labadd" class="button" onclick="labadd()" value="ok">
    <p>labourer sub</p>
    <input type="number" id="labourersub" class="field" name="labourersub" min="1">
	<input type="button" id="labsub" class="button" onclick="labsub()" value="ok">
    
</div>

</body>

</html>
