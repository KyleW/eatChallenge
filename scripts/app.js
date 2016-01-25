(function(){
  
  angular
  .module("eatChallengeApp",['ngMaterial','ui.router'])
  .config(routerConfig)
  .config(materialDesignConfig);

  materialDesignConfig.$inject = ['$mdThemingProvider'];

  function materialDesignConfig($mdThemingProvider) {
       $mdThemingProvider.theme('default')
              .primaryPalette('brown')
              .accentPalette('red');
    // $mdThemingProvider.theme('default')

    // .backgroundPalette('blue-grey');
    // .dark();
      // .primaryPalette('pink')
      // .accentPalette('orange');
      // theme.warnPalette
      // .backgroundPalette
  }

  
  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  
  function routerConfig ($stateProvider, $urlRouterProvider){

    router($stateProvider, $urlRouterProvider);

    //////////
    function router($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      
      $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '../views/main.html',
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
