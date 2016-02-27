(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .service('User', User);

    User.$inject = ['$http'];

    function User($http) {
        var service  = {};
        service.create = create;
            // login: login,
            // logout: logout,
            // user: user

        return service;

        // var user = false;

        function create(email, password) {
            var data = {
                username: email,
                password: password
            };
            return $http.post('/user/signup', data)
            .success(function(response) {
                console.log('successfully returned');
                console.log(response);
            }).error(function(err) {
                console.log(err);
            });

        }

        function login(email, password) {
            var data = {
                email: email,
                password: password
            };

            $http.post('/user/login', data)
            .success(function(response) {
                user = true;
            });
            // .error(function(data) {});
        }

        function logout() {
            $http.post('/user/logout').success(function() {
                user = false;
            });

        }
        
    }

})();
