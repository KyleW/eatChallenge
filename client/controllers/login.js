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
        console.log(auth.isLoggedIn());
        //////////////////////
        
        function submit() {
            vm.error = false;
            vm.disabled = true;
            auth.login(user.email, user.password)
            .then(successHandler, errorHandler);

            function successHandler(response) {
                console.log('success');
                console.log(response)
                // TODO: redirect somewhere??
                vm.disabled = false;
                vm.loginForm = {};
                vm.success = 'successfully logged in';
            }

            function errorHandler(response) {
                vm.error = true;
                vm.errorMessage = 'Something went wrong. Please try again';
                vm.disabled = false;
                console.log('login fail');
                console.log(response);
                // vm.loginForm = {}
            }

        }
    }

})();
