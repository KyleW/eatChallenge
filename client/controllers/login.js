(function() {
    'use strict';

    angular
      .module('eatChallengeApp')
      .controller('loginController', loginController);
    loginController.$inject = ['$scope', '$state', 'auth', 'Household', 'Sections'];
    function loginController($scope, $state, auth, Household, Sections) {
        var vm = $scope;
        var user = {};
        vm.submit = submit;
        vm.user = user;
        //////////////////////

        function submit() {
            // vm.disabled = true;

            auth
            .login(user.email, user.password)
            .then(successHandler, errorHandler);

            function successHandler(response) {
                // vm.disabled = false;
                vm.loginForm = {};
                vm.message = 'successfully logged in';
                $state.go('soFar');
            }

            function errorHandler(response) {
                vm.message = 'Something went wrong. Please try again';
                // vm.disabled = false;
            }

        }
    }

})();
