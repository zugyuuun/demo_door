ZGN(function()
{
  var solenoidRelayPin = '17';
  var reedSwitchPin = '22';

  var gpio = ZGN.term('1').gpio;

  gpio.pinMode(solenoidRelayPin, ZGN.OUTPUT);
  gpio.pinMode(reedSwitchPin, ZGN.INPUT);

  $(function() {
    $('body').on('click', function() {
      gpio.digitalWrite(solenoidRelayPin, ZGN.HIGH);
      setTimeout(function() {
        gpio.digitalWrite(solenoidRelayPin, ZGN.LOW);
      }, 300);
    });

    var before = null;
    setInterval(function() {
      gpio.digitalRead(reedSwitchPin, function(data) {
        if (before != data) {
          if (data) {
            $('#status').text('CLOSE!');
            $('#btn').removeClass('active');
          } else {
            $('#status').text('OPEN!');
            $('#btn').addClass('active');
          }
          before = data;
        }
      });
    }, 100);
  });
});
