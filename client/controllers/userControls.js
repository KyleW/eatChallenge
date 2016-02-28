(function() {
    'use strict';

    angular
      .module('eatChallengeApp')
      .controller('userControlsController', userControlsController);
    userControlsController.$inject = ['$rootScope', '$scope', '$state', 'auth'];
    function userControlsController($rootScope, $scope, $state, auth) {
        var vm = $scope;
        vm.loggedIn = auth.getUserStatus();
        vm.logout = logout;
        vm.user = $rootScope.user;
        /////////////////////////
        function logout() {
            auth.logout();
            vm.loggedIn = auth.getUserStatus();
            $state.go('saveAndExit');
        }

        $rootScope.$watch('user', function() {
            vm.loggedIn = auth.getUserStatus();
            vm.user = $rootScope.user;
        });
    }

})();
