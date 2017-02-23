angular.module('underscore', ['ionic', 'ngCordova'])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('ubcc', [
  'ionic',
  'ubcc.controllers',
  'ubcc.map',
  'ubcc.friend',
  'ubcc.transfer',
  'ubcc.services',
  'ubcc.filters',
  'ubcc.directives',
  'ngMap',
  'ngCordova'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
$ionicConfigProvider.tabs.position('bottom')
$stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.speakers', {
    url: "/speakers",
    views: {
      'menuContent': {
        templateUrl: "templates/speakers.html",
        controller: 'SpeakersCtrl'
      }
    }
  })

  .state('app.venue', {
    url: "/venue",
    views: {
      'menuContent': {
        templateUrl: "templates/venue.html",
        controller: 'VenueCtrl'
      }
    }
  })

  .state('app.agenda', {
    url: "/agenda",
    views: {
      'menuContent': {
        templateUrl: "templates/agenda.html",
        controller: 'AgendaCtrl'
      }
    }
  })

  .state('app.event', {
    url: "/event/:eventId",
    views: {
      'menuContent': {
        templateUrl: "templates/event.html",
        controller: 'EventCtrl'
      }
    }
  })
  // =============Tab Home===========
  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  })
  // =============Tab Map===========
  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/map.html",
        controller: 'MapCtrl'
      }
    }
  })
  // =============Tab Friend===========
  .state('app.friend', {
    url: "/friend",
    views: {
      'menuContent': {
        templateUrl: "templates/friend.html",
        controller: 'FriendCtrl'
      }
    }
  })
  .state('app.detailFriend', {
    url: "/detailFriend/:friendId",
    views: {
      'menuContent': {
        templateUrl: "templates/page/friend/detail_friend.html",
        controller: 'DetailFriendCtrl'
      }
    }
  })
  // =============Tab Account===========
  .state('app.account', {
    url: "/account",
    views: {
      'menuContent': {
        templateUrl: "templates/account.html",
        controller: 'AccountCtrl'
      }
    }
  })
  // =============Tab Transfer===========
  .state('app.transfer', {
    url: "/transfer",
    views: {
      'menuContent': {
        templateUrl: "templates/page/transfer/transfer.html",
        controller: 'TransferCtrl'
      }
    }
  })
  .state('app.transferFriend', {
    url: "/transferFriend",
    views: {
      'menuContent': {
        templateUrl: "templates/page/transfer/transfer_friend.html",
        controller: 'TransferCtrl'
      }
    }
  })
  .state('app.transferFriendAccount', {
    url: "/transferFriendAccount",
    views: {
      'menuContent': {
        templateUrl: "templates/page/transfer/transfer_friend_account.html",
        controller: 'TransferCtrl'
      }
    }
  })
  .state('app.transferToAccount', {
    url: "/transferToAccount",
    views: {
      'menuContent': {
        templateUrl: "templates/page/transfer/transfer_to_account.html",
        controller: 'TransferCtrl'
      }
    }
  })
  .state('app.transferToBankCard', {
    url: "/transferToBankCard",
    views: {
      'menuContent': {
        templateUrl: "templates/page/transfer/to_bank_card.html",
        controller: 'TransferCtrl'
      }
    }
  })
  // =============Tab Discover===========
  // =============Tab Transfer===========
  .state('app.discoverDetail', {
    url: "/discoverDetail",
    views: {
      'menuContent': {
        templateUrl: "templates/page/discover/discover_detail.html",
        controller: 'DiscoverCtrl'
      }
    }
  })
  .state('app.discover', {
    url: "/discover",
    views: {
      'menuContent': {
        templateUrl: "templates/discover.html",
        controller: 'DiscoverCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
