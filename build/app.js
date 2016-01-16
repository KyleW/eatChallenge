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

(function(){

  // angular
  //   .module('eatChallengeApp')
  //   .controller('loginController', [loginController]);

  //   function loginController () {
  //     var loginVM = this;
  //   };

})();

(function(){

angular
    .module('eatChallengeApp')
    .controller('mainController', mainController);

    function mainController () {
      var main = this;
    };

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luLmpzIiwiY29udHJvbGxlcnMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcbiAgXG4gIGFuZ3VsYXJcbiAgLm1vZHVsZShcImVhdENoYWxsZW5nZUFwcFwiLFsndWkucm91dGVyJ10pXG4gIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbiAgICBcbiAgICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnc3RhcnQnLCB7XG4gICAgICB1cmw6ICcvJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc3RhcnQuaHRtbCdcbiAgICB9KVxuXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ3F1ZXN0aW9uJywge1xuICAgICAgdXJsOiAnL3F1ZXN0aW9uJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvcXVlc3Rpb24uaHRtbCdcbiAgICB9KVxuXG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cbiAgLy8gYW5ndWxhclxuICAvLyAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gIC8vICAgLmNvbnRyb2xsZXIoJ2xvZ2luQ29udHJvbGxlcicsIFtsb2dpbkNvbnRyb2xsZXJdKTtcblxuICAvLyAgIGZ1bmN0aW9uIGxvZ2luQ29udHJvbGxlciAoKSB7XG4gIC8vICAgICB2YXIgbG9naW5WTSA9IHRoaXM7XG4gIC8vICAgfTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXG5hbmd1bGFyXG4gICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAuY29udHJvbGxlcignbWFpbkNvbnRyb2xsZXInLCBtYWluQ29udHJvbGxlcik7XG5cbiAgICBmdW5jdGlvbiBtYWluQ29udHJvbGxlciAoKSB7XG4gICAgICB2YXIgbWFpbiA9IHRoaXM7XG4gICAgfTtcblxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
