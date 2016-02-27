(function() {
    'use strict';

    angular
      .module('eatChallengeApp')
      .controller('signupController', signupController);
    signupController.$inject = ['$scope', 'auth'];
    
    function signupController($scope, auth) {
        var vm = $scope;
        var user = {}
        vm.submit = submit;
        vm.user = user;

        function submit() {
            auth.signup(user.email, user.password);
        }
    }

})();
