angular.module('ubcc.services', [])

.service('Speakers', function ($http, $q){

  this.get = function() {
    var dfd = $q.defer();

    $http.get('speakers.json')
    .success(function(data) {
      dfd.resolve(data);
    })
    .error(function(data) {
      dfd.reject(data);
    });

    return dfd.promise;
  };
})

.service('Maps', function ($http, $q){

  this.get = function() {
    var dfd = $q.defer();

    $http.get('https://ubcc.io/get-all-latlng')
    .success(function(data) {
      dfd.resolve(data);
    })
    .error(function(data) {
      dfd.reject(data);
    });

    return dfd.promise;
  };
})

.service('Agenda', function ($http, $q){

  this.get = function() {
    var dfd = $q.defer();

    $http.get('agenda.json')
    .success(function(data) {

      var day1 = _.filter(data, function(event){ return event.date =="day1" }),
          day2 = _.filter(data, function(event){ return event.date =="day2" });

      dfd.resolve({
        "day1": day1,
        "day2": day2
      });
    })
    .error(function(data) {
      dfd.reject(data);
    });

    return dfd.promise;
  };

  this.getEvent = function(eventId){
    var dfd = $q.defer();

    $http.get('agenda.json')
    .success(function(data) {
      var event = _.find(data, {id: eventId});
      dfd.resolve(event);
    })
    .error(function(data) {
      dfd.reject(data);
    });

    return dfd.promise;
  };
})


.service('GooglePlacesService', function($q){
  this.getPlacePredictions = function(query){
    var dfd = $q.defer(),
        service = new google.maps.places.AutocompleteService();

    service.getPlacePredictions({ input: query }, function(predictions, status){
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        dfd.resolve([]);
      }
      else
      {
        dfd.resolve(predictions);
      }
    });

    return dfd.promise;
  };

  this.getLatLng = function(placeId){
    var dfd = $q.defer(),
        geocoder = new google.maps.Geocoder;

    geocoder.geocode({'placeId': placeId}, function(results, status) {
      if(status === 'OK'){
        if(results[0]){
          dfd.resolve(results[0].geometry.location);
        }
        else {
          dfd.reject("no results");
        }
      }
      else {
        dfd.reject("error");
      }
    });

    return dfd.promise;
  };

  this.getPlacesNearby = function(location){
    // As we are already using a map, we don't need to pass the map element to the PlacesServices (https://groups.google.com/forum/#!topic/google-maps-js-api-v3/QJ67k-ATuFg)
    var dfd = $q.defer(),
        elem = document.createElement("div"),
        service = new google.maps.places.PlacesService(elem);

    service.nearbySearch({
      location: location,
      radius: '1000',
      types: ['restaurant']
    }, function(results, status){
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        dfd.resolve([]);
      }
      else {
        dfd.resolve(results);
      }
    });

    return dfd.promise;
  };

  this.getPlaceDetails = function(placeId){
    // As we are already using a map, we don't need to pass the map element to the PlacesServices (https://groups.google.com/forum/#!topic/google-maps-js-api-v3/QJ67k-ATuFg)
    var dfd = $q.defer(),
        elem = document.createElement("div"),
        service = new google.maps.places.PlacesService(elem);

    service.getDetails({
      placeId: placeId
    }, function(place, status){
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dfd.resolve(place);
      }
      else {
        dfd.resolve(null);
      }
    });

    return dfd.promise;
  };
})

;