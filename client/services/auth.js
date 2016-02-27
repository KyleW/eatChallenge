(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .service('auth', AuthService);

    AuthService.$inject = ['$cookieStore', 'Household', 'User'];

    function AuthService($cookieStore, Household, User) {
        
        var service = {};
        service.signup = signup;
        service.setCredentials = setCredentials;
        service.clearCredentials = clearCredentials;

        return service;
        ///////////////////////////

        function errorHandler(err) {
            console.log(err);
        }

        function signup(email,password) {
            console.log(email, password);
            
            User.create(email, password);
                // .then(successHandler,errorHandler);

            // function successHandler(response) {
            //     setCredentials(response.data);
            // }
        }

        function login(email,password) {
            User.get({email:email, password:password})
                .then(successHandler,errorHandler);

            //retrieve application

            function successHandler(response) {
                setCredentials(response.data);
            }
        }

        function logout() {
            clearCredentials();
        }


        function setCredentials() {
            // TODO: Replace with encoding
            // var authdata = Base64.encode(username + ':' + password);

        }

        function getCredentialis() {

        }

        function clearCredentials() {
            // $rootScope.session = {};
            // $cookieStore.remove('globals');
            // $http.defaults.headers.common.Authorization = 'Basic';
        }

    }

})();
