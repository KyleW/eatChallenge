(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .service('auth', AuthService);

    AuthService.$inject = ['$cookies', '$http', '$q', '$rootScope', '$state', 'Household'];

    function AuthService($cookies, $http, $q, $rootScope, $state, Household) {
        $rootScope.user = null;
        init();
        var service = {};
        service.isLoggedIn = isLoggedIn;
        service.getUserStatus = getUserStatus;
        service.signup = signup;
        service.login = login;
        service.logout = logout;
        service.init = init;
        service.setCredentials = setCredentials;
        service.clearCredentials = clearCredentials;

        return service;
        ///////////////////////////
        function init() {
            // Check for user on start
            var user = getCredentials();
            if (user) {
                $rootScope.user = user;
                Household.retrieveForUser(user);
            }

        }

        function isLoggedIn() {
            if ($rootScope.user) {
                return true;
            }
            return false;
        }

        function getUserStatus() {
            return $rootScope.user;
        }

        function signup(email, password) {
            return $http
                .post('/user/signup', {username: email, password: password});
        }

        function login(email, password) {
            var data = {
                username: email,
                password: password
            };

            return $http.post('/user/login', data);
        }

        function logout() {
            return $http
                .get('user/logout')
                .then(successHandler, errorHandler);

            function successHandler() {
                clearCredentials();
                Household.clear();
            }

            function errorHandler() {
                clearCredentials();
                Household.clear();
            }
        }

        function setCredentials(user) {
            $rootScope.user = user;
            return $cookies.putObject('user', user);
        }

        function getCredentials() {
            return $cookies.getObject('user');
        }

        function clearCredentials() {
            $rootScope.user = null;
            return $cookies.remove('user');
        }
    }

})();
