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
      .state('question', {
        url: '/question',
        templateUrl: '../views/question.html',
        controller: 'mainController'
      });
    };
  }



})();
