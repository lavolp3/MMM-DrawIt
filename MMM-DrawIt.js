Module.register("MMM-DrawIt", {
  defaults: {
    text : "MAGIC MIRROR",
    fillColor : "none",
    strokeColor : "white",
    strokeWidth: 3,
    fontSize: 172,
    fontPath: "/home/pi/MagicMirror/modules/MMM-DrawIt/fonts/",
    fontName: "Matilda.ttf",
    debug: true,
  },

  start: function () {
    Log.info("Starting module: " + this.name);

  },

  getScripts: function () {
    return [
      //this.file('node_modules/text-to-svg/index.js'), // will try to load it from the vendor folder, otherwise it will load is from the module folder.
    ];
  },

  getStyles: function() {
    return [
      'MMM-DrawIt.css',
    ];
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    return wrapper;
  },

  notificationReceived: function(noti) {
    switch(noti) {
    case "DOM_OBJECTS_CREATED":
      this.log("Sending payload: "+this.config);
      this.sendSocketNotification("DRAW", this.config);
      break;
    }
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "SVG") {
      this.log("Received payload: "+payload);
      
      /*Convert the svg element to one with multiple path.
	    * The string is cut at every M position inside the path element.
	    *
	    */
	    var svgArray = [];
	    var pos = payload.indexOf("M");
	    svgArray.push(payload.slice(0,pos+1));      //first moveto needs to be retained
	    svgArray.push(payload.replace(/M/g, '\"/><path fill=\"'+this.config.fillColor+'\" stroke=\"'+this.config.strokeColor+'\" d=\"M'));  //all other moveto's are replaced by a new path (incl. moveto)
	    var svgString = svgArray.join('');
	    this.log("Converted payload to "+svgString)
	  
      wrapper = document.getElementById("wrapper");
      wrapper.innerHTML = svgString;

      
      wrapper = document.getElementById("wrapper");
      wrapper.innerHTML = payload;

      var path = document.querySelector("path");
      path.style.strokeWidth = this.config.strokeWidth;
      var length = path.getTotalLength();
      this.log("Length: "+length);

      // Clear any previous transition
      path.style.transition = path.style.WebkitTransition = 'none';
      // Set up the starting positions
      path.style.strokeDasharray = length + ' ' + length;
      path.style.strokeDashoffset = length;
      // Trigger a layout so styles are calculated & the browser
      // picks up the starting position before animating
      path.getBoundingClientRect();
      // Define our transition
      path.style.transition = path.style.WebkitTransition =
        'stroke-dashoffset 20s ease-in-out';
      // Go!
      path.style.strokeDashoffset = '0';

      return wrapper;
    }
  },

  log: function(msg) {
    if (this.config.debug) {
      console.log(msg);
    }
  },

});
