$(document).ready(function(){

//dataX=''; //  gloabal  var
//window.dataX2;
//coordsInput
//var hFinal='';
var newHTML = [];
window.b='';


//----------------------------------------------------
//Click SPLIT  Button
    $("#trimButton").click(function(){        // $(document).on("click", '.circle', function() {   // this  click  is  used  to   react  to  newly generated cicles;

if ($("#coordsInput").val()!="")
 {
			trimWaze();
 } //END ($("#coordsInput").val()!=null)
 else{hFinal='<h2 style="color:red;"></br>Error => No input detected</br></br></h2>';}

//-----


			$("#resultFinal").stop().fadeOut("slow",function(){ 
						    $(this).html(hFinal)
						}).fadeIn(2000);

			$("#resultFinal").css("border","1px solid red"); //  set  red  border  for  result  div
			//



 });
//END Click SPLIT  Button
//*****************************************************************************************************************************************************







  
//----------------------------------------------------
//CR Footer
    $("#cr_footer").click(function(){
        //var textareaCR=$("#coordsInput").val();
          
//below  flaf  is  used  to  trigger in trimWaze()  an  option  weather  or  not  to  add a Footer  CR
          window.flagged="true";
		trimWaze();
          window.flagged="false";
		//var textareaCR=textareaCR+"";
           hFinal=hFinal;
 //hFinal=hFinal+"<p>Best regards,</br>Waze support Team </p></br>";//used in Waze Trim
		 //$("#tableResults").append("<p>Please let me know if you have any additional questions. Feel free to contact us</br>Waze support Team </p>");
		 //$('<p>Text</p>').appendTo('#tableResults');
         
		
		$("#resultFinal").stop().fadeOut("slow",function(){ 
                $(this).html(hFinal)
            }).fadeIn(2000);

$("#resultFinal").css("border","1px solid red"); //  set  red  border  for  result  div

    });
//END Click CR Footer
//***********************************************






//not  working
//----------------------------------------------------
//CR Header
    $("#cr_header").click(function(){
       	trimWaze();
		//var textareaCR=textareaCR+"<p>Hello Wazer</br>Thanks for contacting us. </p>";
		hFinal="<p>Hello Wazer</br>Thanks for contacting us </p>"+hFinal; //last
		 
		
		
		$("#resultFinal").stop().fadeOut("slow",function(){ 
                $(this).html(hFinal)
            }).fadeIn(2000);

$("#resultFinal").css("border","1px solid red"); //  set  red  border  for  result  div

    });
//END Click CR Header
//***********************************************







//----------------------------------------------------
//Click Example  Button
    $("#examplebutton").click(function(){
    $("#coordsInput").val("Waze is a 100%       free turn-by-turn GPS navigation        application that provides real-time traffic updates\n plus all kinds             of cool social and geo-gaming elements       that actually make commuting fun."); //  was \n  in the  end

 });
//END Click Example  Button
//***********************************************







//----------------------------------------------------
//Click Instruction  Button
    $("#TrimInstructionButton").click(function(){
    $("#hiddenInstructions").toggle(1000);
if( $("#TrimInstructionButton").attr("value")=="instructions")
   { $("#TrimInstructionButton").val("Close");$("#TrimInstructionButton").css("background","red");} else { $("#TrimInstructionButton").val("instructions");$("#TrimInstructionButton").css("background","grey")}

 });
//END Click Instructions  Button
//***********************************************


//----------------------------------------------------
//Click Close Instruction  Button
/* $("#closeIt").click(function(){
    $("#hiddenInstructions").hide(2000);

 });*/
//END   Click Close Instruction  Button






//----------------------------------------------------
//CLEAR  Button
    $("#clearButton").click(function(){
    $("#hiddenInstructions").hide(2000);
    $("#coordsInput").val('');
    $("#resultFinal").hide(1000);
//hide  instr  &  change  button
    HideInstructions ();
//END  Hid e Instructuins  and  change  button
 $("#highLight_errors_button").hide(1000);// hide link highlight details
 $("#highLight_errors").hide(1000); //hide highlight details

//hide CAUTION in left top corner if ISSET(Help center)
if($('#popAlert').length > 0){$('#popAlert').remove();}

 });
//END CLEAR  Button
//***********************************************








//-------------------------------------------------------------------------------
//Copy Button
  $(document).on("click", '#copybutton', function() {   // this  click  is  used  to   react  to  newly generated cicles;
   // $("#copybutton").click(function(){
//tableResults

$('#flashMessage').html(' Copied!!!!!!!').fadeOut(4500);
//
// creating new textarea element and giveing it id 't'
  var t = document.createElement('textarea');
  t.id = 't';
  // Optional step to make less noise in the page, if any!
  t.style.height = 0;
  // You have to append it to your page somewhere, I chose <body>
  document.body.appendChild(t);
  // Copy whatever is in your div to our new textarea
  t.value = document.getElementById('tableResults').innerText;
  // Now copy whatever inside the textarea to clipboard;
  var selector = document.querySelector('#t');
  selector.select();
  document.execCommand('copy');
  // Remove the textarea;
  document.body.removeChild(t);

//
//$('#flashMessage').html(' Copied!!!!!!!').fadeOut(4500);
//alert("COPIED to  clipboard");    

 });
//END Copy  Button
//**********************************************************************************




//-----------------------------------------------------------
function HideInstructions (){
if ( $('#hiddenInstructions').css('display') == 'none' ){} else{

$("#hiddenInstructions").hide(2000);
        if( $("#TrimInstructionButton").attr("value")=="instructions")
       { $("#TrimInstructionButton").val("Close");$("#TrimInstructionButton").css("background","red");} else { $("#TrimInstructionButton").val("instructions");$("#TrimInstructionButton").css("background","grey")}
}
}
//---------------------------------------------------------------




//function dispalyError()
function  dispalyError(){
$("#resultFinal").stop().fadeOut("slow",function(){  $(this).html("<h1 style='color:red;'>ERROR-> check  your  input</h1>") }).fadeIn(2000);
              $("#resultFinal").css("border","1px solid red"); //  set  red  border  for  result  div
              HideInstructions ();}
//end func













//---------------------------------------------------------------------------
// **************************************************************************************
// **************************************************************************************
//                                                                                     ** 
function trimWaze(){
// replace multiple spaces with a single space
var textarea=$("#coordsInput").val();


//Here Listed all RG EXPRESSION Options!!!!!!!!!!!!!!1
//count diffrence occurance of errors (double space etc)---------------------
  //var regExp = new RegExp(\s\s+, "gi");
  var numb = (textarea.match(/  +/g) || []).length;
  //alert(numb);
  var numbComma = (textarea.match(/ \,+/g) || []).length; //count space+comma

  var numbDot = (textarea.match(/ \.+/g) || []).length; //count space+dot
  //alert("comma-> "+numbComma +" dot->"+numbDot);
  
  var doubleWords =(textarea.match(/\b(\w+)\s+\1\b/g) || []).length; // count all consecutive duplicate words
  
  var doubleCommas =(textarea.match(/(\,\,+)/g  ) || []).length; // count all consecutive duplicate commas (i.e ",,")

  var doubleDots =(textarea.match(/(\.\.+)/g  ) || []).length; // count all consecutive duplicate dots (i.e "..")


  

  //start Help Center issue---
  var hrefUrlBlankSpace =(textarea.match(/Help Center/gi) || []).length; // checking Help Center space; if blankspace is linked. Can't design it normally!!! 
         //$("body").append("<div id='popAlert' style='position:absolute;width:10%;height:20px;top:0px;left:0px;background:red;'><center>Caution -></center></div>");
         if(hrefUrlBlankSpace>0){/*alert("Caution -> URL detected!!!");*/
                                $("body").append("<div id='popAlert' style='position:absolute;width:8%;height:20px;top:0px;left:0px;background:red;'><center>Caution -></center></div>");
                              //$("#popAlert").hide(500); //$('#popAlert').remove();
                             }else{$('#popAlert').remove();}
  // END Help Center issue-----[

 

  var commaCharNoSpace =(textarea.match(/\,([^ ])/g) || []).length; // count comma followed by NO SPACE (i.e ",char")  //work here!!!!!!!

  // var dotCharNoSpace =(textarea.match(/\.(.)/g) || []).length; // count dot followed by NO SPACE (.char)//NOT IMPLEMENTED
   
  //Please know that(if that is missing)!!!!!!!!!!!!!!!!!!!!!!
		var RegExp_PlsKnow = /please (know||note)\s*(?!that)\w*/gi;  //Reg Expression itself  http://www.regextester.com/15 //please (know||note) [^t][^h][^a][^t]*\w* /gi;
        var PlsKnowErrCount =(textarea.match(RegExp_PlsKnow ) || []).length; //count "please know"
	    if(textarea.match(RegExp_PlsKnow)) {alert('Missing "that" Error => '+ PlsKnowErrCount);} //if at least 1 result


   
 // count all counts Errors all together (they are +-ed)
  var AllErrorsCount=numb+numbComma+numbDot+doubleWords+doubleCommas+doubleDots/*+PlsKnowErrCount*/ ;  //+commaCharNoSpace

//end  count occurance double space-----------------
//Here Listed all RG EXPRESSION Options!!!!!!!!!!!!!!1-----------------------------------------------






//START  Highlight Double Spaces(+comma+dots_dublicates)----------------------------------------------
var arrayX2HIGHLIGHT=textarea.split('\n');/*.join(',').split(','); */
var resHighlight='';
for(j=0;j<arrayX2HIGHLIGHT.length; j++)
 {  
     resHighlight+= arrayX2HIGHLIGHT[j]./*->double sapces*/replace(/  +/g, "&nbsp;<span style='background:red;'> __ </span>&nbsp;").replace(/ \,+/g, "&nbsp;<span style='background:red;'> __, </span>&nbsp;").replace(/ \.+/g, "&nbsp;<span style='background:red;'> __. </span>&nbsp;")./*dublicate*/replace(/\b(\w+)\s+\1\b/g, "&nbsp;<span style='background:red;'> \$1 \$1 </span>&nbsp;")./*double,,*/replace(/\,\,+/g, "&nbsp;<span style='background:red;'> ,, </span>&nbsp;")./*double..*/replace(/\.\.+/g, "&nbsp;<span style='background:red;'> .. </span>&nbsp;")/*comma char no space(,word)*//*.replace(/\,(.)/g, "&nbsp;<span style='background:red;'> ,</span>&nbsp;")*/                  +"</br>";//replace all double spaces with red
	//arrayX2HIGHLIGHT[j].replace(/  +/g, "&nbsp;<span style='background:red;'> __ </span>&nbsp;")+"</br>";//replace all double spaces with red
	//arrayX2HIGHLIGHT[j].replace(/ \,+/g, "&nbsp;<span style='background:red;'> __, </span>&nbsp;")+"</br>";//replace all spaces + Commas with red  /(\.\.+)/g
	
	//resHighlight+= arrayX2HIGHLIGHT[j];   
 }
$("#highLight_errors").html(resHighlight);
//$("#coordsInput").val(resHighlight);
//END  Highlight Double Spaces --------------------------------------------------








var arrayX2=textarea.split('\n');/*.join(',').split(','); */
//alert(textarea);



/*var stringTrimmed =textarea.replace( /\s\s+/g, ' ' )
$("#coordsInput").val(stringTrimmed);*/
$("#loadAjax").fadeIn(2000).html("Processed").fadeOut(3000);
// END  replace multiple spaces with a single space




//
var TextAfterCorrection;
if(AllErrorsCount==0){TextAfterCorrection="No correction was performed";}else{TextAfterCorrection="Text after correction";}

window.hFinal='</br><p><p id="ErrorShow" style="color:red;cursor:pointer;" title="click">Errors => '+AllErrorsCount+'</p><p id="ErrorHidden" style="color:red;display:none;">Double Spaces => '+numb+'; </br>Char followed by comma with space => '+numbComma+ '; Dots followed => '+numbDot+'; </br>Consecutive duplicates => '+doubleWords+'; </br>Double commas => '+doubleCommas+    '; Double dots => '+doubleDots+ /* '; </br>Comma+char with NO space => ' +commaCharNoSpace+ */  '</p><input type="button" value="Copy" id="copybutton"><span id="flashMessage"></span> </br><center><h5 style="color:red;">'+TextAfterCorrection+'</h5></center> </br><p id="tableResults"></br>';
  

 
//Correcting/Fixing spaces ,commas, dots, dublicates in result to HTML
 dataX='';
 for(j=0;j<arrayX2.length; j++) {  
 dataX=arrayX2[j].replace( /\s\s+/g, ' ' ).replace( / \,+/g, ',' ).replace( / \.+/g, '.' )./*word duplicate*/replace( /\b(\w+)\s+\1\b/g, '\$1' )./*double commas ,,*/replace( /\,\,+/g, ',' )./*double dots ..*/replace( /\.\.+/g, '.' )./*comma follwed by char no space*/replace(/\,(.)/g, ', \$1' )+'</br>';    
 hFinal=hFinal+dataX;
 }
 //  should  we  or  not add  a  footer to  result
if (window.flagged=="true"){hFinal=hFinal+"</br><span id='footer'>Best regards,</br>Waze Support team </span></p>";}
else{
hFinal=hFinal+"</p></br></br>";
    }    
//  END should  we  or  not add  a  footer to  result

//show details button
$("#highLight_errors_button").show();//show button
$("#highLight_errors").hide(); //hide content


}
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
//------------------------------------------------------------------
// End trimWaze()










// SHOW ERRORS DETAILS
//---------------------
$("#highLight_errors_button").click(function(){ 
 $("#highLight_errors").toggle(1000);
});
//-----------------------------------------------------
//END SHOW DETAILS




// SHOW AllErrors
//---------------------
 $(document).on("click", '#ErrorShow', function() { //Click for newly generated
 $("#ErrorHidden").toggle(500);
});
//-----------------------------------------------------
//END SHOW AllErrors





// END READY
});





/*
var newHTML = [];
for (var i = 0; i < vehicles.length; i++) {
    newHTML.push('<p class="resultArray"><span>' + vehicles[i] +'</span>  '+  '<span class="deleteItem" id="'+[i]+'">' + '<img src="images/delete2.png"/></span></p>');
}

$(".resultMy").html(newHTML.join(""));
*/
