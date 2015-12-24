(function(){
  
  angular
  .module("eatChallengeApp",['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('start', {
      url: '/',
      templateUrl: '../views/start.html'
    })
  });

})();
