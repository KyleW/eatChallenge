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

    mainController.$inject = ['$scope'];

    function mainController ($scope) {            
      
      // Classes
      var Person = {
        init: function() {
          this.incomeSourceCount= 0;
          this.incomeSources= [];
        },

        incrementIncomeSources: function(){
          this.incomeSourceCount++;
          while(this.incomeSourceCount > this.incomeSources.length) {
            this.incomeSources.push({});
          }
        }
      };


      var Household = {
        init: function () {
          this.children = [];
          this.childCount = 0;
          this.incrementChildCount();

          this.otherMembers = [];
          this.otherMembersCount = 0;
          this.incrementOtherMembersCount();
        },

        incrementChildCount: function(){
          this.childCount++;
          while (this.childCount > this.children.length) {
            var newChild = Object.create(Person)
            newChild.init();
            this.children.push(newChild);
          }
        },

        incrementOtherMembersCount: function() {
          this.otherMembersCount++;
          while (this.otherMembersCount > this.otherMembers.length) {
            var newMember = Object.create(Person);
            newMember.init();
            this.otherMembers.push(newMember);
          }
        }

      }


      var household = Object.create(Household)
      household.init();
      // TODO: replace scope with vm
      $scope.household = household

    };

})();
