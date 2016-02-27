(function() {
    'use strict';

    angular
      .module('eatChallengeApp')
      .controller('loginController', loginController);
    loginController.$inject = ['$scope', 'auth'];
    function loginController($scope, auth) {
        var vm = $scope;
        var user = {};
        vm.submit = submit;
        vm.user = user;
        console.log(auth.getUserStatus());
        //////////////////////
        function submit() {
            vm.error = false;
            vm.disabled = true;
            auth.login(user.email, user.password)
            .then(successHandler)
            .catch(errorHandler);

            function successHandler() {
                // TODO: redirect somewhere??
                vm.disabled = false;
                vm.loginForm = {};
                console.log('login success');
            }

            function errorHandler() {
                vm.error = true;
                vm.errorMessage = 'Something went wrong. Please try again';
                vm.disabled = false;
                console.log('login fail');
                // vm.loginForm = {}
            }

        }
    }

})();
