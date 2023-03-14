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
  
  
    // swipe
  
  
  //  document.getElementById('gesture').addEventListener('touchstart', handleTouchStart, false);        
  //  document.getElementById('gesture').addEventListener('touchmove', handleTouchMove, false);
  
  
  //  document.getElementById('gesture').addEventListener('touchstart', handleTouchStart, false);        
  //  document.getElementById('gesture').addEventListener('mousemove', handleTouchMove, false);
  
  
  //  var xDown = null;                                                        
  //  var yDown = null;
  
  //  function getTouches(evt) {
  //    return evt.touches ||             // browser API
  //           evt.originalEvent.touches; // jQuery
  //  }                                                     
                                                                           
  //  function handleTouchStart(evt) {
  //      const firstTouch = getTouches(evt)[0];                                      
  //      xDown = firstTouch.clientX;                                      
  //      yDown = firstTouch.clientY;                                      
  //  };                                                
                                                                           
  //  function handleTouchMove(evt) {
  //      if ( ! xDown || ! yDown ) {
  //          return;
  //      }
  
  //      var xUp = evt.touches[0].clientX;                                    
  //      var yUp = evt.touches[0].clientY;
  
  //      var xDiff = xDown - xUp;
  //      var yDiff = yDown - yUp;
                                                                           
  //      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
  //          if ( xDiff > 0 ) {
  //              document.getElementById("desciption").textContent = "right swipe"
  //          } else {
  //            document.getElementById("desciption").textContent = "left swipe"
  //              /* left swipe */
  //          }                       
  //      } else {
  //          if ( yDiff > 0 ) {
  //              /* down swipe */ 
  //              document.getElementById("desciption").textContent = "down swipe"
  
  //          } else { 
  //            document.getElementById("desciption").textContent = "up swipe"
  
  //              /* up swipe */
  //          }                                                                 
  //      }
  //      /* reset values */
  //      xDown = null;
  //      yDown = null;                                             
  //  };
  
  
  
  //swipe touch and mouse
  
   let touchArea = document.getElementById("gesture");
   let output = document.getElementById("desciption");
  
   
   //Initial mouse X and Y positions are 0
   
   let mouseX,
     initialX = 0;
   let mouseY,
     initialY = 0;
   let isSwiped = false;
   let isClick;
  
   let hasMoved = false;
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
   
   let deviceType = "";
   
   //Detect touch device
   
   const isTouchDevice = () => {
     try {
       //We try to create TouchEvent (it would fail for desktops and throw error)
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
     console.log("start");
   });
   
   //Mousemove / touchmove
   touchArea.addEventListener(events[deviceType].move, (event) => {
  
    console.log("move");
    if (!isTouchDevice()) {
       event.preventDefault();
     }
     if (isSwiped) {
       getXY(event);
       let diffX = mouseX - initialX;
       let diffY = mouseY - initialY;
       if (Math.abs(diffY) > Math.abs(diffX)) {
         output.innerText = diffY > 0 ? "Down" : "Up";
       } else {
         output.innerText = diffX > 0 ? "Right" : "Left";
       }
       hasMoved = true;
     }
   });
   
   //Stop Drawing
   
   touchArea.addEventListener(events[deviceType].up, () => {
    if(hasMoved){
     isSwiped = false;
     console.log("end swipe");
    }
   });
   
    touchArea.addEventListener("mouseleave", () => {
      isSwiped = false;
      console.log("leave");
    });
   
   window.onload = () => {
     isSwiped = false;
   };
  
  /*
    //tab, double tab - desktop 
    const detector = document.getElementById('gesture');
    let timer
    if(isClick === true){
    detector.addEventListener('click', function(event){
      console.log(isClick + " inside if");
      console.log("click");
      if (event.detail === 1) {
        timer = setTimeout(() => {
          document.getElementById("desciption").textContent = "Click";
        }, 200)
      }
    })
  }
  
  
    detector.addEventListener('dblclick', function() {
      clearTimeout(timer)
      document.getElementById("desciption").textContent = "Double Click";
      isClick = false;
    })
  */
  
  let holding = false;
  let timer
    document.getElementById('gesture').onclick = event => {
      isSwiped = false;
      if (event.detail === 1) {
        // it was a single click
        if(!hasMoved){
          //console.log(isClick + " inside if");
          //console.log("click");
          if (event.detail === 1) {
            timer = setTimeout(() => {
              document.getElementById("desciption").textContent = "Click";
            }, 200)
      }
        }
      } else if (event.detail === 2) {
        // it was a double click
        clearTimeout(timer)
        document.getElementById("desciption").textContent = "Double Click";
        isClick = false;
      }
   };
  
  
  //  setTimeout(function() {
  //   document.getElementById("desciption").textContent = "Press and Hold";
  // }, 500);
  
  var onlongtouch; 
  var time;
  var touchduration = 500; //length of time we want the user to touch before we do something
  
  function touchstart(e) {
      e.preventDefault();
      if (!time) {
          time = setTimeout(onlongtouch, touchduration);
      }
      console.log("holding");
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
      document.getElementById("desciption").textContent = "Holding";
  };
  
  document.getElementById('gesture').addEventListener("mousedown", touchstart, false);
  document.getElementById('gesture').addEventListener("mouseup", touchend, false);