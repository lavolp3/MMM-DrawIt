var NodeHelper = require("node_helper");
var TextToSVG = require('text-to-svg');
var textToSVG = TextToSVG.loadSync('/home/pi/MagicMirror/modules/MMM-DrawIt/fonts/Roboto-BlackItalic.ttf');

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
      console.log("Converting SVG");
      var svg = textToSVG.getSVG(config.text, options);
      console.log(svg);
      this.sendSocketNotification("SVG", svg);
    }
  },

});
