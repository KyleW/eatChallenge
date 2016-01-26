(function(){
  
  angular
  .module("eatChallengeApp",['ngMaterial','ui.router'])
  .config(routerConfig);
  
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
