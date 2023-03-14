//See if the browser supports Service Workers, if so try to register one
//navigator - an object in js that represent the browser and information about it
if("serviceWorker" in navigator){
  //register - asynchronous task which means it will take some time to execute and it returns to us a promise (speacial value in js)
    navigator.serviceWorker.register("./service-worker.js")
    .then(function(registering){
      // Registration was successful
      console.log("Browser: Service Worker registration is successful with the scope",registering.scope);
    }).catch(function(error){
      //The registration of the service worker failed
      console.log("Browser: Service Worker registration failed with the error",error);
    });
  } else {
    //The registration of the service worker failed
    console.log("Browser: I don't support Service Workers :(");
  }


//Get the gesture and the output element
const touchArea = document.getElementById("gesture");
const output = document.getElementById("desciption");


//Click and Double click
let timer;
let isSwiped = false;

    touchArea.onclick = event => {
    isSwiped = false;
    if (event.detail === 1) {
      if(!hasMoved){
        if (event.detail === 1) {
          timer = setTimeout(() => {
            output.textContent = "Click";
          }, 200)
    }
      }
    } else if (event.detail === 2) {
      clearTimeout(timer)
      output.textContent = "Double Click";
      isClick = false;
    }
 };


 //Holding

 var onlongtouch; 
 var time;
 var touchduration = 500; //length of time we want the user to touch before we do something

 function touchstart(e) {
     e.preventDefault();
     if (!time) {
         time = setTimeout(onlongtouch, touchduration);
     }
 }
 
 function touchend() {
     //stops short touches from firing the event
     if (time) {
         clearTimeout(time);
         time = null;
     }
 }
 
 onlongtouch = function() { 
     time = null;
     output.textContent = "Holding";
 };
 
 touchArea.addEventListener("mousedown", touchstart, false);
 touchArea.addEventListener("mouseup", touchend, false);
 

//swipe touch and mouse

 
 //Initial mouse X and Y positions are 0
 
let mouseX = 0;
let initialX = 0;
let mouseY = 0;
let initialY = 0;
let isClick;
let hasMoved = false;
let deviceType = "";

 //Events for touch and mouse
 let events = {
   mouse: {
     down: "mousedown",
     move: "mousemove",
     up: "mouseup",
   },
   touch: {
     down: "touchstart",
     move: "touchmove",
     up: "touchend",
   },
 };
  
 //Detect touch device
 const isTouchDevice = () => {
   try {
     //Try to create TouchEvent (it would fail for desktops and throw error)
     document.createEvent("TouchEvent");
     deviceType = "touch";
     return true;
   } catch (e) {
     deviceType = "mouse";
     return false;
   }
 };
 
 //Get left and top of touchArea
 let rectLeft = touchArea.getBoundingClientRect().left;
 let rectTop = touchArea.getBoundingClientRect().top;
 
 //Get Exact X and Y position of mouse/touch
 const getXY = (e) => {
   mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
   mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
 };
 
 isTouchDevice();
 
 //Start Swipe
 touchArea.addEventListener(events[deviceType].down, (event) => {
   isSwiped = true;
   hasMoved = false;
   //Get X and Y Position
   getXY(event);
   initialX = mouseX;
   initialY = mouseY;
 });
 
 //Mousemove / touchmove
 touchArea.addEventListener(events[deviceType].move, (event) => {

  if (!isTouchDevice()) {
     event.preventDefault();
   }
   if (isSwiped) {
     getXY(event);
     let diffX = mouseX - initialX;
     let diffY = mouseY - initialY;
     if (Math.abs(diffY) > Math.abs(diffX)) {
       output.innerText = diffY > 0 ? "Down Swipe" : "Up Swipe";
     } else {
       output.innerText = diffX > 0 ? "Right Swipe" : "Left Swipe";
     }
     hasMoved = true;
   }
 });
 
 //Stop moving
 touchArea.addEventListener(events[deviceType].up, () => {
  if(hasMoved){
   isSwiped = false;
  }
 });
 
  touchArea.addEventListener("mouseleave", () => {
    isSwiped = false;
  });
 
 window.onload = () => {
   isSwiped = false;
 };


