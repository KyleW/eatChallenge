(function(){

  angular
      .module('eatChallengeApp')
      .directive('incomeQuestions', incomeDirective);

      // incomeDirective.$inject = ['$mdDialog', '$mdMedia', '$scope'];

      function incomeDirective () {            
        return {
          scope: {
            member: "="
          },
          restrict: 'A',
          replace: true,
          templateUrl: '../views/income.html',
        };
      }

})();
