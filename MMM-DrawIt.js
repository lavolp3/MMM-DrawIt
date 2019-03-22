Module.register("MMM-Timetable", {
  defaults: {
    text : "MAGIC MIRROR",
    fillColor : "none",
    strokeColor : "white",
    fontSize: 72,
  },




  start: function () {
    var wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    return wrapper;
  },

  getScripts: function () {
    return [
      this.file('node_modules/text-to-svg/index.js'), // will try to load it from the vendor folder, otherwise it will load is from the module folder.
    ]
  },

  getDom: function() {
    var wrapper = document.getElementById("wrapper");
    var ns = "http://www.w3.org/2000/svg";
    //var svg = document.createElementNS(ns, "svg");
    //svg.setAttributeNS(null, 'width', '100%');
    //svg.setAttributeNS(null, 'height', '100%');
    //var path = document.createElementNS(ns, "p");
    //svg.appendChild(path);
    const textToSVG = TextToSVG.loadSync();
    var attributes = {
      fill: this.fillColor,
      stroke: this.strokeColor,
    };
    var options = {
      x: 0,
      y: 0,
      fontSize: this.fontSize,
      anchor: "top",
      attributes: attributes
    };
    var svg = textToSvg.getSVG(this.text, options);
    wrapper.innerHTML = svg;
    return wrapper;
  },

  notificationReceived: function() {},

  socketNotificationReceived: function() {},

});
