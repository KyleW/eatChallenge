(function() {
    'use strict';

    angular
      .module('eatChallengeApp')
      .controller('loginController', [loginController]);
    loginController.$inject = ['$scope', 'auth'];
    function loginController($scope, auth) {
        var vm = $scope;

        console.log(auth.getUserStatus());
    }

})();
