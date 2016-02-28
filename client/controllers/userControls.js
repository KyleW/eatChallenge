(function() {
    'use strict';

    angular
      .module('eatChallengeApp')
      .controller('userControlsController', userControlsController);
    userControlsController.$inject = ['$rootScope', '$scope', 'auth'];
    function userControlsController($rootScope, $scope, auth) {
        var vm = $scope;
        vm.loggedIn = auth.getUserStatus();
        vm.logout = logout;
        vm.user = $rootScope.user;
        /////////////////////////
        function logout() {
            auth.logout();
            vm.loggedIn = auth.getUserStatus();
        }

        $rootScope.$watch('user', function() {
            vm.loggedIn = auth.getUserStatus();
            vm.user = $rootScope.user;
        });
    }

})();
