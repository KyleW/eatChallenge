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
      .state('start', {
        url: '/',
        templateUrl: '../views/start.html'
      })
      .state('overview', {
        url: '/overview',
        templateUrl: '../views/overview.html',
        controller: 'mainController'
      })
      .state('children', {
        url: '/children',
        templateUrl: '../views/children.html',
        controller: 'mainController'
      })
      .state('household', {
        url: '/household',
        templateUrl: '../views/household.html',
        controller: 'mainController'
      })
      .state('income', {
        url: '/income',
        templateUrl: '../views/income.html',
        controller: 'mainController'
      })
      .state('signature', {
        url: '/signature',
        templateUrl: '../views/signature.html',
        controller: 'mainController'
      });
    };
  }



})();
