var globalToastCounter = 0;
var left;
var isLeft;
var touchLeft
<<<<<<< HEAD
<<<<<<< HEAD
$( document ).ready(function() {
    Materialize.toast("First toast",999999999,'', function(){newToast();});
    $.mobile.hidePageLoadingMsg();
    $.mobile.ajaxEnabled = false; 
    $.mobile.pageLoading();
});


=======
=======
>>>>>>> 54524df7fdd743ae5525962eb273282352f81fd4

$( document ).ready(function() {
    Materialize.toast("First toast",999999999,'', function(){newToast();});
});

 
<<<<<<< HEAD
>>>>>>> 54524df7fdd743ae5525962eb273282352f81fd4
=======
>>>>>>> 54524df7fdd743ae5525962eb273282352f81fd4
globalToastCounter++;
$( "#toast-container" ).mousedown(function() {
    left = $(".toast").offset().left;
    console.log("mouse down " + left);
});

$( "#toast-container" ).mouseup(function() {
    var newleft = $(".toast").offset().left;
    console.log("mouse up " + newleft);
    if(left < newleft){
        isLeft = false;
    }
    else{
        isLeft = true;
    }
});

$( "#toast-container" ).on("swipeleft", (function(){
    console.log("you swiped left!");
    touchLeft = true;
}));

$( "#toast-container" ).on("swiperight", (function(){
    console.log("you swiped right!");
    touchLeft = false;
}));

function newToast(){
    //var left = $(this).offset().left;
    console.log("toast dismissed " + isLeft);
    if(isLeft || touchLeft){
        Materialize.toast("I AM NEW TOAST, you swiped left",999999999,'', function(){
            newToast();
        });
    }
    else{
        Materialize.toast("I AM NEW TOAST, you swiped right",999999999,'', function(){
            newToast();
        });
    }

}
<<<<<<< HEAD
<<<<<<< HEAD

// setTimeout(function(){
//     console.log("in timer");
//     if(globalToastCounter <10){
//         console.log("toast number: " + globalToastCounter);
//         globalToastCounter ++;
//         newToast("new toast" + globalToastCounter);
//         console.log("toasting");
//     }
// }, 5000);
=======
>>>>>>> 54524df7fdd743ae5525962eb273282352f81fd4
=======
>>>>>>> 54524df7fdd743ae5525962eb273282352f81fd4
