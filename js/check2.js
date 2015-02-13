setInterval(function(){$.ajax({
                            type:"post",
                            url:"player.php",
                            data: {curr:curr,flag:2,round:rno},
                            success:function(data){console.log(data);
                                if(data!='None')
                               { 
                                    var res = data.split(" ");
                                    
                                     var lastIndex = data.lastIndexOf(" ")
									var str = data.substring(0, lastIndex);alert(str); 
								 //alert(res[5]);
								 $('#Porder').text(parseInt($('#Porder').text())+parseInt(res[5]));

                                    if(stage==4){
                                        if(res[6]==prev1){
                                             $('#Porder1').text(parseInt($('#Porder1').text())+parseInt(res[5]));
                                        }
                                       else {
                                             $('#Porder2').text(parseInt($('#Porder2').text())+parseInt(res[5]));

                                      }
                                    }

                                                                  supplybackup();} 
                                 }
                             });}, 1000);   

