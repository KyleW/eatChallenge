(function(){
  
  angular
  .module("eatChallengeApp",['ngMaterial','ui.router'])
  .config(routerConfig)
  .config(materialDesignThemer);
  
  materialDesignThemer.$inject= ['$mdThemingProvider'];
  function materialDesignThemer($mdThemingProvider) {
    $mdThemingProvider.theme('light-blue');
      // .primaryPalette('pink', {
      //   'default': '400', // by default use shade 400 from the pink palette for primary intentions
      //   'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      //   'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      //   'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      // })
      // // If you specify less than all of the keys, it will inherit from the
      // // default shades
      // .accentPalette('purple', {
      //   'default': '200' // use shade 200 for default, and keep all other shades the same
      // });
  }


  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  
  function routerConfig ($stateProvider, $urlRouterProvider){

    router($stateProvider, $urlRouterProvider);

    //////////
    function router($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      
      $stateProvider
      .state('start', {
        url: '/',
        templateUrl: '../views/start.html',
        controller: 'mainController'
      })
      .state('children', {
        url: '/children',
        templateUrl: '../views/children.html',
        controller: 'mainController'
      })
      .state('childIncome', {
        url: '/childIncome',
        templateUrl: '../views/childIncome.html',
        controller: 'mainController'
      })
      .state('household', {
        url: '/household',
        templateUrl: '../views/household.html',
        controller: 'mainController'
      })
      .state('signature', {
        url: '/signature',
        templateUrl: '../views/signature.html',
        controller: 'mainController'
      })
      .state('confirmation', {
        url: '/confirmation',
        templateUrl: '../views/confirmation.html',
        controller: 'mainController'
      })
      .state('styleguide', {
        url: '/styleguide',
        templateUrl: '../views/styleguide.html',
        controller: 'mainController'
      });
    }
  }



})();
