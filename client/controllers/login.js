(function() {
    'use strict';

    angular
      .module('eatChallengeApp')
      .controller('loginController', loginController);
    loginController.$inject = ['$scope', 'auth', 'Household', 'Sections'];
    function loginController($scope, auth, Household, Sections) {
        var vm = $scope;
        var user = {};
        vm.submit = submit;
        vm.user = user;
        //////////////////////

        function submit() {
            vm.error = false;
            vm.disabled = true;

            auth
            .login(user.email, user.password)
            .then(successHandler, errorHandler);

            function successHandler(response) {
                vm.disabled = false;
                vm.loginForm = {};
                vm.success = 'successfully logged in';
                // Household.save(Household.household);
                Sections.goBack();
            }

            function errorHandler(response) {
                vm.error = true;
                vm.errorMessage = 'Something went wrong. Please try again';
                vm.disabled = false;
            }

        }
    }

})();
