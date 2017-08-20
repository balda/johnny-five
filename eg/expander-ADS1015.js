var Barcli = require("barcli");
var five = require("../lib/johnny-five.js");
var board = new five.Board();

board.on( "ready", function() {
  var bar = {
    raw: new Barcli({ label: "raw", range: [0, 2047] }),
    value: new Barcli({ label: "value", range: [0, 1023] }),
    analog: new Barcli({ label: "analog", range: [0, 255] }),
    scaled: new Barcli({ label: "scaled", range: [0, 100] })
  };
  var expander = new five.Board.Virtual(
    new five.Expander("ADS1015")
  );
  var analog = new five.Sensor({
    board: expander,
    pin: "A0"
  });
  analog.scale(0, 1023);
  analog.on("data", function() {
    bar.raw.update(this.raw);
    bar.value.update(this.value);
    bar.analog.update(this.analog);
    bar.scaled.update(analog.scaleTo(0, 100));
  });
});
