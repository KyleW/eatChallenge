(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .service('Auth', Auth);

    Auth.$inject = ['$cookies'];

    function Auth($cookies) {

        var currentUser =  $cookies.get('user') || null;
        console.log({currentUser: currentUser});

        function login() {

        }

        function logout() {

        }

        ////////
        var service  = {
            login: login,
            logout: logout,
            currentUser: currentUser
        };

        return service;
    }

})();
