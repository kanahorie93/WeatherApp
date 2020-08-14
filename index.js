$(document).ready(function(){
    $('.short').hide();
    $('#switch').hide();
    if (navigator.geolocation) {
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function(position){
            currentPosition = position;
            // set latitude and longitude
            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;
            // console.log(latitude, longitude);
            var url = 'http://api.weatherstack.com/current?access_key=f80439bcd7974ceea5dda50d469f683a&query=';
            $.getJSON(url + latitude + ',' + longitude, function(data){
                // console.log('celsius call: ', data);
                // JSON.stringify turns a Javascript object into JSON text and stores that jSON text in a string
                var data = JSON.stringify(data);
                // JSON.parse turns a string of JSON text into a Javascript object
                var json = JSON.parse(data);

                var country = json.location.country;
                var city = json.location.name;
                var state = json.location.region;

                var temp = json.current.temperature;
                var temp_f = ''
                $.getJSON(url + latitude + ',' + longitude + "&units=f", function(data){
                    // console.log('fahrenheit call: ', data);
                    // JSON.stringify turns a Javascript object into JSON text and stores that jSON text in a string
                    var data = JSON.stringify(data);
                    // JSON.parse turns a string of JSON text into a Javascript object
                    var json = JSON.parse(data);
                    temp_f = json.current.temperature;
                });

                var wind = json.current.wind_speed;
                var humidity = json.current.humidity;
                var time = json.location.localtime.split(' ')[1];
                var cloud = json.current.cloudcover;
                $('#weather').html(city + ', ' + state + ', ' + country);

                if (temp < 18) {
                    $('.grey-jumbo').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/01/18/00/48/winter-landscape-1145816_960_720.jpg)'
                    });
                    $('#temp').html("<h1>It's a pretty cold day today...<hr></h1>")
                } else if (temp > 18 && temp < 28) {
                    $('.grey-jumbo').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/01/02/01/51/clouds-1117584_960_720.jpg)'
                    });
                    $('#temp').html("<h1>It's a sunny day today...<hr></h1>")
                } else {
                    $('.grey-jumbo').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2013/09/30/19/07/sahara-188683_960_720.jpg)'
                    });
                    $('#temp').html("<h1>It's a hot day today...<hr></h1>")
                }

                // toggle temperature
                $('#info1').html(time);
                $('#info2').html('Wind ' + wind + ' kph');
                $('#info3').html(temp + '&#8451');
                $('.short').show();
                $('#switch').show();

                var isC = true;
                $('#switch').on('click', function(){
                    if (isC) {
                        $('#info3').html(temp_f + '&#8457');
                        $('#switch').html('Show in Celsius');
                        isC = false;
                    } else {
                        $('#info3').html(temp + '&#8451')
                        $('#switch').html('Show in Fahrenheit');
                        isC = true;
                    }
                });
                // showing sky status
                if (cloud <= 30) {
                    $('#info5').html('Clear Sky');
                } else {
                    $('#info5').html('Cloudy Sky');
                }
                $('#info6').html('Humidity ' + humidity + '%')
            });

            // console.log(currentPosition);
        });

    }
});

// http://api.weatherstack.com/current?access_key=f80439bcd7974ceea5dda50d469f683a&query=New%20York