(function() {
    'use strict';

    angular
      .module('eatChallengeApp')
      .controller('signupController', signupController);
    signupController.$inject = ['$scope', 'auth'];
    
    function signupController($scope, auth) {
        var vm = $scope;
        vm.submit = submit;
        vm.user = {};

        function submit() {
            // console.log(vm.signupForm.email);
            // console.log(vm.user.email, vm.user.password);
            auth.signup(vm.user.email, vm.user.password);
        }
    }

})();
