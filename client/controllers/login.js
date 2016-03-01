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

            auth
            .login(user.email, user.password)
            .then(successHandler, errorHandler);

            function successHandler(response) {
                console.log('calls success');
                auth.setCredentials(response.data.user);
                Household.retrieveForUser(response.data.user);
                vm.loginForm = {};
                vm.message = 'successfully logged in';
                $state.go('children');
            }

            function errorHandler() {
                auth.clearCredentials();
                vm.message = 'Please check your username and password and try again.';
            }

        }
    }

})();
