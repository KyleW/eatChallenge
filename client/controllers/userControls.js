(function() {
    'use strict';

    angular
      .module('eatChallengeApp')
      .controller('userControlsController', userControlsController);
    userControlsController.$inject = ['$scope', 'auth'];
    function userControlsController($scope, auth) {
        var vm = $scope;
        vm.logout = auth.logout;
        console.log('user controls controller');
        console.log(auth.getUserStatus());
        //////////////////////
    }

})();
