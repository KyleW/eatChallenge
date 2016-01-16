(function(){
  
  angular
  .module("eatChallengeApp",['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('start', {
      url: '/',
      templateUrl: '../views/start.html'
    })

    $stateProvider
    .state('question', {
      url: '/question',
      templateUrl: '../views/question.html'
    })

  });

})();
