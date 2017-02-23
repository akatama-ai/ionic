angular.module('ubcc.map', ['ngCordova'])




.controller('MapCtrl', function($scope, $ionicLoading, $state, $compile, $cordovaGeolocation, $http, Maps, $ionicLoading) {
    var map = new google.maps.Map(document.getElementById("map"), {
          center: new google.maps.LatLng(10.7795835, 106.64823909999996),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
       var marker = new google.maps.Marker({
          position:new google.maps.LatLng(10.7795835, 106.64823909999996),
          map: map,
          title: 'Me'
        });
        
         $http.get('map.json').success(function(data) {
        // Get the element with id summary and set the inner text to the result.
       
       var json = data;
       var infoWindow = new google.maps.InfoWindow();

      // Looping through the JSON data
      for (var i = 0, length = json.length; i < length; i++) {
        var data = json[i],
          latLng = new google.maps.LatLng(data.lat, data.lng);

        // Creating a marker and putting it on the map
        marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: data.title
        });

        // Creating a closure to retain the correct data, notice how I pass the current data in the loop into the closure (marker, data)
        (function(marker, data) {

          // Attaching a click event to the current marker
          google.maps.event.addListener(marker, "click", function(e) {
            infoWindow.setContent(data.description);
            infoWindow.open(map, marker);
          });


        })(marker, data);

      }
    });

      $scope.centerOnMe = function() {


         var options = {
            enableHighAccuracy: true,
            maximumAge: 3600000
         }
        
         var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

         function onSuccess(position) {
              // // var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              // // map.panTo(center);
               // var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
               //  marker.setPosition(myLatLng);
               //  map.panTo(myLatLng); 
               //  map.setCenter(myLatLng);


            //   // map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            // var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            // var options = {
            //   zoom: 15,
            //   center: coords,
            //   mapTypeControl: false,
            //   navigationControlOptions: {
            //       style: google.maps.NavigationControlStyle.SMALL
            //   },
            //   mapTypeId: google.maps.MapTypeId.ROADMAP
            // };
            // var map = new google.maps.Map(document.getElementById("map"), options);
            // var marker = new google.maps.Marker({
            //     position: coords,
            //     map: map,
            //     animation: google.maps.Animation.DROP,
            //     title:"You are here!"
            // });

            alert('Latitude: '          + position.coords.latitude          + '\n' +
               'Longitude: '         + position.coords.longitude         + '\n' +
               'Altitude: '          + position.coords.altitude          + '\n' +
               'Accuracy: '          + position.coords.accuracy          + '\n' +
               'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
               'Heading: '           + position.coords.heading           + '\n' +
               'Speed: '             + position.coords.speed             + '\n' +
               'Timestamp: '         + position.timestamp                + '\n');
         };

         function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
         }
      }
})
