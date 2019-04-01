var NodeHelper = require("node_helper");
var TextToSVG = require('text-to-svg');

module.exports = NodeHelper.create({
  start: function() {},

  socketNotificationReceived: function(notification, config) {
    if (notification === "DRAW") {
      var attributes = {
        fill: config.fillColor,
        stroke: config.strokeColor,
      };
      var options = {
        x: 0,
        y: 0,
        fontSize: config.fontSize,
        anchor: "top",
        attributes: attributes
      };
      var textToSVG = TextToSVG.loadSync(config.fontPath + config.fontName);
      console.log("Converting SVG using " + config.fontName);
      var svg = textToSVG.getSVG(config.text, options);
      console.log(svg);
      this.sendSocketNotification("SVG", svg);
    }
  },

});
