(function() {
    'use strict';

    angular
      .module('eatChallengeApp')
      .controller('signupController', signupController);
    signupController.$inject = ['$scope', 'auth', 'Household', 'Sections'];

    function signupController($scope, auth, Household, Sections) {
        var vm = $scope;
        var user = {};
        vm.submit = submit;
        vm.user = user;

        function submit() {
            vm.error = false;
            auth.signup(user.email, user.password)
                .then(successHandler, errorHandler);

            function successHandler(response) {
                auth.setCredentials(response.data.user);
                Household.save();
                vm.signupForm = {}; //Reset form
                vm.message = 'successfully created an account';
                Sections.goBack();
            }

            function errorHandler(err) {
                vm.error = true;
                vm.message = 'There\'s already an account associated with this email. Please log in or try again with a different address.';
            }
        }
    }

})();
