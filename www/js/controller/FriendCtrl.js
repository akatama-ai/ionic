angular.module('ubcc.friend', ['ngCordova'])

.controller('FriendCtrl', function($scope, Agenda, $ionicLoading) {
  $scope.events = [];

  $ionicLoading.show({
    template: 'Loading...'
  });

  Agenda.get()
  .then(function(events){
    $scope.events = events;
    $ionicLoading.hide();
  },function(err){
    $ionicLoading.hide();
  });

  $scope.adn = {};
  $scope.srchchange = function () {
        


     

    };

    $scope.ressetserach = function () {

        $scope.adn.item = "";
       
    }
})
.controller('DetailFriendCtrl', function($scope, Agenda, $stateParams, $ionicLoading) {
  var FriendId = $stateParams.friendId;

  $ionicLoading.show({
    template: 'Loading...'
  });

  Agenda.getEvent(FriendId)
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