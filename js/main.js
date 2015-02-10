
  var flag=0,backup=1;

function labadd()
{
  var x= parseInt($('#clab>span').text()) + +$('#laboureradd').val(); $('#clab>span').text(x);
  
}

function labsub()
{
var x= parseInt($('#clab>span').text()) - +$('#labourersub').val(); $('#clab>span').text(x);
    
}

function labourer()
{
	var constanttimedelay=3; var products=$('#labsupply').val();
    var people= parseInt($('#clab>span').text()); 
    var labtimedelay= ((constanttimedelay*products)/people)*1000;
    alert(labtimedelay);
    setTimeout(function(){ 
            	alert("labourer return");
                              var x= parseInt($('#Inv').text())+ +products;
                              $('#Inv').text(x);   }, labtimedelay);
    supplybackup();
}


function sublet()
{
	        alert($('#sublet').val()*parseInt($('#subletcost>span').text()));
	        var subletred=parseInt($('#bankres>span').text())-$('#sublet').val()*parseInt($('#subletcost>span').text())
            $('#bankres>span').text(subletred);
            var sublettime=parseInt($('#subletcost>span').text())*1000;

            setTimeout(function(){ 
            	alert("sublet return");
                              var x= parseInt($('#Inv').text())+ +$('#sublet').val();
                              $('#Inv').text(x);   }, sublettime);

supplybackup();

}
////////////////START //////////////////////////////////////////////////////////////////////////////////////
  function supplybackup()
       {
                         $.ajax({
                            type:"post",
                            url:"player.php",
							//YOU HAD USED .VAL() HERE
                            data: {curr:curr,backup:'1',inventory:$('#Inv').text(),porder:$('#Porder').text(),reserve:$('#bankres>span').text(),capacity:$('#ul>span').text()},
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
                                   round:$('#Round>span').text(),
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
    




          window.onbeforeunload = function() {
        return "Do not Refresh the game. You will lose all data."; }

        window.onload=function(){
          if(stage==1){
            $('#curr').text('Retailer');
            $('#orderTo').show();
			$('.innerBox1').append('<p id="details">Wholesaler1</p><br><br><p id="details">Fixed cost:<span>'+fc1+'</span></p><br><br><p id="details">Product cost:<span>'+pr1+'</span></p><br><br><p id="details">Lead time:<span>'+l1+'</span></p><br><br>');
			$('.innerBox1').append('<p id="details">Wholesaler2</p><br><br><p id="details">Fixed cost:<span>'+fc2+'</span></p><br><br><p id="details">Product cost:<span>'+pr2+'</span></p><br><br><p id="details">Lead time:<span>'+l2+'</span></p><br><br>');
          }

          else if(stage==2){
            $('#curr').text('Wholesaler');
			$('.innerBox1').append('<p id="details">Manifacturer</p><br><br><p id="details">Fixed cost:<span>'+fc3+'</span></p><br><br><p id="details">Product cost:<span>'+pr3+'</span></p><br><br><p id="details">Lead time:<span>'+l3+'</span></p><br><br>');	
          }

          else if(stage==3){
            $('#curr').text('DISTRIBUTOR');
            $('.innerBox1').append('<p id="details">Manifacturer</p><br><br><p id="details">Fixed cost:<span>'+fc3+'</span></p><br><br><p id="details">Product cost:<span>'+pr3+'</span></p><br><br><p id="details">Lead time:<span>'+l4+'</span></p><br><br>');	
          
          }

          else if(stage==4){
            $('#curr').text('Factory');
            $('#supplyTo').show();
            $('#pending1').show();
            $('#pending2').show();
            $('#box3').show();
           	
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
                  }


         