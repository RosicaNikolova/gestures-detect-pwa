
//self - refers to the service worker itself

  //install service worker
  self.addEventListener("install",(installing)=>{
    console.log("Service Worker: I am being installed, hello world!");
  });
  
  //activate service worker
  self.addEventListener("activate",(activating)=>{	
    console.log("Service Worker: All systems online, ready to go!");
  });
  
  self.addEventListener("fetch",(fetching)=>{   
    console.log("Service Worker: User threw a ball, I need to fetch it!");
  });
  
  self.addEventListener("push",(pushing)=>{
      console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
  })
  