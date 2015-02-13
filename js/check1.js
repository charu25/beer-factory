//supply

setInterval(function(){$.ajax({
                            type:"post",
                            url:"player.php",
                            data: {curr:curr,flag:1,round:rno},
                            success:function(data){var delay=5000;
                                if(data!='None')
                                 {  var res = data.split(" ");
                                    switch(stage){
                                    case 1:if(res[5]==next1){
                                            delay=l1;
                                    }

                                    else{
                                        delay=l2;
                                    }
                                    break;
                                    case 2:delay=l3;break;
                                    case 3:delay=l4;break;
                                 }

                                 setTimeout(function(){ var lastIndex = data.lastIndexOf(" ");
									var str = data.substring(0, lastIndex);
									alert(str);
                                    $('#Inv').text(parseInt($('#Inv').text())+parseInt(res[3]));
                                 if(parseInt($('#Inv').text())>parseInt($('#ul>span').text()))
                                 {
                                    $('#Inv').text(parseInt($('#ul>span').text()));
                                 }
                                 }, delay);
                                supplybackup();} 
                             

                                 }
                             });}, 1000);   
