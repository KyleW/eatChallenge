(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .service('auth', AuthService);

    AuthService.$inject = ['$http', '$q'];

    function AuthService($http, $q) {
        var user = null;

        var service = {};
        service.isLoggedIn = isLoggedIn;
        service.getUserStatus = getUserStatus;
        service.signup = signup;
        service.login = login;
        service.logout = logout;

        return service;
        ///////////////////////////

        function isLoggedIn() {
            if (user) {
                return true;
            }
            return false;
        }

        function getUserStatus() {
            return user;
        }

        function signup(email, password) {
            var data = {
                username: email,
                password: password
            };
            var deferred = $q.defer();
            $http.post('/user/signup', data)
                .then(successHandler, errorHandler);

            function successHandler(data, status) {
                if (status === 200 && data.status) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            }

            function errorHandler() {
                deferred.reject();
            }

            return deferred.promise;

        }

        function login(email, password) {
            var data = {
                username: email,
                password: password
            };
            var deferred = $q.defer();

            $http.post('/user/login', data)
                .then(successHandler, errorHandler);

            function successHandler(data, status) {
                if (status === 200 && data.status) {
                    user = true;
                    deferred.resolve();
                } else {
                    user = false;
                    deferred.reject();
                }
            }

            function errorHandler() {
                user = false;
                deferred.reject();
            }

            return deferred.promise;
        }

        function logout() {
            return $http.get('user/logout')
                .then(successHandler, errorHandler);

            function successHandler() {
                user = false;
            }

            function errorHandler() {
                user = false;
            }
        }
    }

})();
