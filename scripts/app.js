(function(){
  
  angular
  .module("eatChallengeApp",['ui.router'])
  .config(configure);

  configure.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configure ($stateProvider, $urlRouterProvider){

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
