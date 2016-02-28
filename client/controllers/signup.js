(function() {
    'use strict';

    angular
      .module('eatChallengeApp')
      .controller('signupController', signupController);
    signupController.$inject = ['$scope', 'auth', 'Sections'];

    function signupController($scope, auth, Sections) {
        console.log(auth.getUserStatus());
        var vm = $scope;
        var user = {};
        vm.submit = submit;
        vm.user = user;

        function submit() {
            vm.error = false;
            // TODO: add loading icon to UI when disabled === true
            vm.disabled = true;

            auth.signup(user.email, user.password)
            .then(successHandler, errorHandler);

            function successHandler() {
                vm.disabled = false;
                vm.signupForm = {}; //Reset form
                vm.message = 'successfully created an account';
                Sections.goBack();
            }

            function errorHandler(err) {
                console.log(err);
                vm.error = true;
                vm.message = 'Something went wrong. Please try again';
                vm.disabled = false;
                // vm.signupForm = {}

            }
        }
    }

})();
