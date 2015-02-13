

var flag=0,backup=1;

function labadd()
{ 
  if(hflag==1)
  {var x= parseInt($('#clab>span').text()) + +$('#laboureradd').val(); $('#clab>span').text(x);
  x=parseInt($('#bankres>span').text())- $('#laboureradd').val()*hirecharge;
  $('#bankres>span').text(x); hflag=0}
  else
  	alert("you cannot hire further this round");
  
}

function labsub()
{

if(fflag==1)
{
var x= parseInt($('#clab>span').text()) - +$('#labourersub').val(); 
if(x<minlab)
	{alert("minimum of "+minlab+ " labourers compulsory"); $('#clab>span').text(minlab);}
else
$('#clab>span').text(x);

x=parseInt($('#bankres>span').text())- $('#labourersub').val()*firecharge;
//$('#bankres>span').text(subletred);
$('#bankres>span').text(x);
fflag=0;
}
else
{
	alert("you cannot Fire further this week");
}
}

function manufacturer()
{
	

mancheck=0;

setInterval(function(){ 

	$.ajax({
                            type:"post",
                            url:"time.php",
                            data: {mancheck:mancheck},
                            success:function(data){
                            
                              var res = data.split(" ");
                              var roundtime=res[2]; 
                              var roundno=res[1];
                              alert ("roundno"+roundno);
                              //alert(roundtime);
                              var k= roundtime.split(":");
                              rm1=k[1]; rh=k[0]; 
                              
                              //alert(rh);
                              rm2= +rm1 +(rtime/4); 
                              rm3= +rm2 +(rtime/4); 
                              rm4= +rm3 +(rtime/4); 
                              rm5= +rm4 +(rtime/4);

                              if(rm1>60){rm1= +rm1-60; rh= +rh +1;}
                              if(rm2>60){rm1= +rm1-60; rh= +rh +1;}
                              if(rm3>60){rm1= +rm1-60; rh= +rh +1;}
                              if(rm4>60){rm1= +rm1-60; rh= +rh +1;}
                              if(rm5>60){rm1= +rm1-60; rh= +rh +1;}

                              var currtime=res[0]; 
                              //alert(currtime);
                               k= currtime.split(":");
                              cm=k[1]; ch=k[0]; 
                              if (ch==rh) 
                              	{//alert("in");
                              		if(cm==rm1||cm==rm2||cm==rm3||cm==rm4||cm==rm5)
                                    {
                              	       
                              	       hflag=0; fflag=0;subflag=0;
                                       //alert("inside");
                              	       var y=parseInt($('#Inv').text())+parseInt($('#clab>span').text())*properlabourer;
                              	       //alert(y);
                              	       $('#Inv').text(y);
                                    }    
                                } 

                              
                              
                            }
                               });

            	   }, 59000);

}


var roundupdat=0;
function roundupdate()
{var prevround=rno;
  //alert("prev"+prevround);
  setInterval(function(){
    $.ajax({type:"post",
  url:"time.php",
  data: {roundupdate:roundupdat},
  success:function(data){
    var res=data.split(' ');
    prevround=rno;
     rno=res[1]; 
     //alert("yolo"+rno);
     if(prevround!=rno){
        alert("new round");
        $('#Porder').text(0);
     }
    }
  });},10000)
  
}


function inventoryupdate(){
  //alert("yo");
  $.ajax({type:"post",
  url:"player.php",
  data: {roundno:rno,curr:curr,inventory:$('#Inv').text()},
  success:function(data){
    //alert("hey"); alert(data);
    }
  });
}
 

function sublet()
{           
	if(subflag==1)
	      {  //alert(subfc);
	        alert($('#sublet').val()*parseInt($('#subletcost>span').text()));
	        var subletred=parseInt($('#bankres>span').text())-(+subfc+$('#sublet').val()*parseInt($('#subletcost>span').text()));
            $('#bankres>span').text(subletred);
            var sublettime=parseInt($('#subletcost>span').text())*1000;

            setTimeout(function(){ 
            	alert("sublet return");
                              var x= parseInt($('#Inv').text())+ +$('#sublet').val();
                              $('#Inv').text(x);   }, sublettime);

supplybackup(); subflag=0;
}
else
{
	subflag=0; alert("you cannot use subsidiaries further");
}
}

////////////////START //////////////////////////////////////////////////////////////////////////////////////
  function supplybackup()
       {   alert(rno);
                         $.ajax({
                            type:"post",
                            url:"player.php",
							//YOU HAD USED .VAL() HERE
                            data: {curr:curr,backup:'1',inventory:$('#Inv').text(),porder:$('#Porder').text(),reserve:$('#bankres>span').text(),capacity:$('#ul>span').text(),roundno:rno},
                            success:function(data){
                              console.log(data);
                            }
                               });
       }
//////////////////END ///////////////////////////////////////////////////////////////////////////////////////////////////////       
	

   function supply(){  
                         flag=1;
                         var supcheck;
                         if(stage==4){
                         	if($('#supplyTo').val()=='Wholesaler1'){
                         		supcheck=parseInt($('#Porder1').text());
                         	}

                         	else{
                         		supcheck=parseInt($('#Porder2').text());
                         	}
                         }

                         else{

                         	supcheck=parseInt($('#Porder').text());
                         }


						if(($('#supply').val()<=parseInt($('#Inv').text())) && ($('#supply').val()<=supcheck)){
							//if retailer we call function calc
							if(stage==1){
							calculate();
							}
						
						var prv=prev,fc,pr;
                         if(stage==4){
                         	
                         		if($('#supplyTo').val()=='Wholesaler1'){
                         			prv=prev1;
									fc=fc3;
                         		}
                         		else{
                         			prv=prev2;
									fc=fc4;
										
                         		}
								pr=sp4;

                         } 

                         if(stage==2){
                         	fc=fc1;pr=sp2;
                         }

                         if(stage==3){
                         	fc=fc2;pr=sp3;
                         }
						 
						 if(stage==1){
							fc=0;
							pr=sp1;}




                         $.ajax({
                            type:"post",
                            url:"player.php",
                            data: {id:curr,to:prv,supply:$('#supply').val(), 
									order:'0',
                                   round:$('#Round>span').text(),
                                   f:flag},
                            success:function(data){
                                //$("#result").html(data);
								//alert(data);
								$('#Porder').text(parseInt($('#Porder').text())-parseInt($('#supply').val()));
								if($('#supplyTo').val()=='Wholesaler1'){
                         			$('#Porder1').text(parseInt($('#Porder1').text())-parseInt($('#supply').val()));
                         		}
                         		else{
                         			$('#Porder2').text(parseInt($('#Porder2').text())-parseInt($('#supply').val()));
                         		}
								$('#Inv').text(parseInt($('#Inv').text())-parseInt($('#supply').val()));
								alert("supplied");
								var temp=parseInt($('#bankres>span').text());
								var temp1=fc+pr*$('#supply').val();
                             	temp=temp+(fc+pr*$('#supply').val());
                             	$('#bankres>span').text(temp);
								alert("you have profitted by "+temp1+" bucks");
								supplybackup();
                             },
                             
                          });}
						  
						  else{
						alert("Invalid Transaction");}
                         
                      }




 function capacity(){
 	 var tmp= parseInt($('#bankres>span').text())-parseInt($('#ce>span').text())*$('#ext').val(); 
     $('#bankres>span').text(tmp);
     tmp=parseInt($('#ul>span').text()) + +$('#ext').val();
     $('#ul>span').text(tmp);
     supplybackup();

 }
 
 function setbackorder(){
						$.ajax({
                            type:"post",
                            url:"time.php",
                            data: {backorder:'1',curr:curr,round:rno},
                            success:function(data){
							var bck;
							if(stage==1){
								bck=bck1;}
							else if(stage==2){
								bck=bck2;}
							else if(stage==3){
								bck=bck3;}
							else{
							bck=bck4;}
							alert("you missed out"+data+" products");
							var temp=$('#bankres>span').text();
							temp=temp-data*bck;
							$('#bankres>span').text(temp);
							supplybackup();
                            }
                               });
 }
 
 
 function setorderseen(){
		$.ajax({
                            type:"post",
                            url:"time.php",
                            data: {orderseen:'1',curr:curr,round:rno},
                            success:function(data){
							var bck;
							if(stage==1){
								bck=bck1;}
							else if(stage==2){
								bck=bck2;}
							else if(stage==3){
								bck=bck3;}
							else{
							bck=bck4;}
							var res=data.split(' ');
							alert("you did not satisfy "+res[0]+" products");
							var temp=$('#bankres>span').text();
							temp=temp-res[0]*bck;
							$('#bankres>span').text(temp);
							$('#Porder').text(res[1]);
							supplybackup();
                            }
                               });
 
 }
 

              function order(){  
                         flag=2; 
                         var nxt=next,fc,pr;
						pr=pr3;
                         if(stage==1){
                         	//alert($('#orderTo').val());
                         		if($('#orderTo').val()=='Wholesaler1'){
                         			nxt=next1;
                         			fc=fc1;
                         			pr=pr1;
                         		}
                         		else{
                         			nxt=next2;
                         			fc=fc2;
                         			pr=pr2;
                         		}
                         } 
						 
						 else if(stage==2){
							fc=fc3;}
							
						else if(stage==3){
							fc=fc4;}

                         $.ajax({
                            type:"post",
                            url:"player.php",
                            data: {id:curr,to:nxt,order:$('#order').val(),
									supply:'0',
                                   round:rno,
                                   f:flag},
                            success:function(data){
								var temp1=fc+pr*$('#order').val();
								alert("The Order has cost you "+temp1+" bucks");
                                //alert("order has been placed");
                                var temp=parseInt($('#bankres>span').text());
                             	temp=temp-(fc+pr*$('#order').val());
                             	$('#bankres>span').text(temp);
                             	supplybackup();
                          }
                             });
                             
                      }
    




         /* window.onbeforeunload = function() {
        return "Do not Refresh the game. You will lose all data."; }*/

        window.onload=function(){
          if(stage==1){
            $('#curr').text('Retailer');
            $('#orderTo').show();
			$('.innerBox1').append('<p id="details">Wholesaler1</p><br><br><p id="details">Fixed cost:<span>'+fc1+'</span></p><br><br><p id="details">Product cost:<span>'+pr1+'</span></p><br><br><p id="details">Lead time:<span>'+l1+'</span></p><br><br>');
			$('.innerBox1').append('<p id="details">Wholesaler2</p><br><br><p id="details">Fixed cost:<span>'+fc2+'</span></p><br><br><p id="details">Product cost:<span>'+pr2+'</span></p><br><br><p id="details">Lead time:<span>'+l2+'</span></p><br><br>');
          roundupdate();
          inventoryupdate();
          }

          else if(stage==2){
            $('#curr').text('Wholesaler');
			$('.innerBox1').append('<p id="details">Manifacturer</p><br><br><p id="details">Fixed cost:<span>'+fc3+'</span></p><br><br><p id="details">Product cost:<span>'+pr3+'</span></p><br><br><p id="details">Lead time:<span>'+l3+'</span></p><br><br>');	
         roundupdate();
         inventoryupdate();
          }

          else if(stage==3){
            $('#curr').text('DISTRIBUTOR');
            $('.innerBox1').append('<p id="details">Manifacturer</p><br><br><p id="details">Fixed cost:<span>'+fc3+'</span></p><br><br><p id="details">Product cost:<span>'+pr3+'</span></p><br><br><p id="details">Lead time:<span>'+l4+'</span></p><br><br>');	
          roundupdate();
          inventoryupdate();
          }

          else if(stage==4){
            $('#curr').text('Factory');
            $('#supplyTo').show();
            $('#pending1').show();
            $('#pending2').show();
            $('#box3').show();
           	manufacturer();
            roundupdate();
            inventoryupdate();
          }

          backup=1;
                    $.ajax({
                            type:"post",
                            url:"backup.php",
                            data: {backup:'1',curr:curr},
                            success:function(data){
							var res = data.split(" ");
							$('#Inv').text(parseInt(res[0]));
							$('#Porder').text(parseInt(res[1]));
                            $('#bankres>span').text(parseInt(res[2]));
                            $('#ul>span').text(parseInt(res[3]));
                            $('#Icost>span').text(parseInt(res[4]));
							$('#Bcost>span').text(parseInt(res[5]));
                              
                            }
                               });
							   
					setbackorder();
					setorderseen();
                  }


         
