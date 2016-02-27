(function() {
    'use strict';

    angular
      .module('eatChallengeApp')
      .controller('signupController', signupController);
    signupController.$inject = ['$scope', 'auth'];

    function signupController($scope, auth) {
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
            .then(successHandler)
            .catch(errorHandler);

            function successHandler() {
                //TODO: Redirect to . ..  somewhere?
                // Household.save().then(function(){
                // Sections.goBack();
                vm.disabled = false;
                vm.signupForm = {}; //Reset form
                console.log('signup success');
                // });
            }

            function errorHandler(err) {
                console.log(err);
                vm.error = true;
                vm.errorMessage = 'Something went wrong. Please try again';
                vm.disabled = false;
                console.log('signup fail');
                // vm.signupForm = {}

            }
        }
    }

})();
