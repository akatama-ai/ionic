angular.module('ubcc.controllers', [])

.controller('AppCtrl', function($scope) {

})

.controller('HomeCtrl', function($scope) {

})



.controller('DiscoverCtrl', function($scope) {

})
.controller('AccountCtrl', function($scope) {

})



.controller('SpeakersCtrl', function($scope, $http, Speakers, $ionicLoading) {
  $scope.speakers = [];

  $ionicLoading.show({
    template: 'Loading...'
  });

  Speakers.get()
  .then(function(speakers){
    $scope.speakers = speakers;
    $ionicLoading.hide();
  },function(err){
    $ionicLoading.hide();
  });

  $scope.goToUrl = function(url){
    //use inAppBrowser plugin
    window.open(url, '_blank', 'location=yes');
  }
})

.controller('VenueCtrl', function($scope) {
  //map with venue position
  $scope.position = {
    lat: -34.892589,
    lng: -56.194638
  };

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });
})

// .controller('MapCtrl', function($scope, $http, Maps, $ionicLoading) {
//   // Creating a new map
//     var map = new google.maps.Map(document.getElementById("map"), {
//           center: new google.maps.LatLng(10.7795835, 106.64823909999996),
//           zoom: 14,
//           mapTypeId: google.maps.MapTypeId.ROADMAP
//         });


        
//          $http.get('map.json').success(function(data) {
//         // Get the element with id summary and set the inner text to the result.
       
//        var json = data;
//        var infoWindow = new google.maps.InfoWindow();

//       // Looping through the JSON data
//       for (var i = 0, length = json.length; i < length; i++) {
//         var data = json[i],
//           latLng = new google.maps.LatLng(data.lat, data.lng);

//         // Creating a marker and putting it on the map
//         var marker = new google.maps.Marker({
//           position: latLng,
//           map: map,
//           title: data.title
//         });

//         // Creating a closure to retain the correct data, notice how I pass the current data in the loop into the closure (marker, data)
//         (function(marker, data) {

//           // Attaching a click event to the current marker
//           google.maps.event.addListener(marker, "click", function(e) {
//             infoWindow.setContent(data.description);
//             infoWindow.open(map, marker);
//           });


//         })(marker, data);

//       }
//     });
// })


.controller('AgendaCtrl', function($scope, Agenda, $ionicLoading) {
  $scope.events = [];

  $ionicLoading.show({
    template: 'Loading...'
  });

  Agenda.get()
  .then(function(events){
   console.log($ionicLoading);
    $scope.events = events;
    $ionicLoading.hide();
  },function(err){
    $ionicLoading.hide();
  });
})

.controller('EventCtrl', function($scope, Agenda, $stateParams, $ionicLoading) {
  var eventId = $stateParams.eventId;

  $ionicLoading.show({
    template: 'Loading...'
  });

  Agenda.getEvent(eventId)
  .then(function(event){
    $scope.event = event;
    $ionicLoading.hide();
  },function(err){
    $ionicLoading.hide();
  });

  $scope.shareEvent = function(event){
    var speakersText = "";

    _.each(event.speakers, function(speaker, index){
      speakersText += speaker.name;
      if((index+1) < event.speakers.length){
        speakersText += " & ";
      }
    });

    var messageToShare = event.title + " by " + speakersText + " at #ubcc";
    window.plugins.socialsharing.share(messageToShare);
  };

})
