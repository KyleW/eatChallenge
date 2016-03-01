(function() {
    angular
        .module('eatChallengeApp')
        .service('Household', householdService);

    householdService.$inject = ['$http', '$rootScope'];

    function householdService($http, $rootScope) {
        // Todo: consider moving to server??
        var Household =  {
            childCount: null,
            children: [],
            otherMembersCount: null,
            otherMembers: [],
            completedApplication: false
        };

        $rootScope.household = angular.copy(Household);

        var service = {};
        service.retrieveForUser = retrieveForUser;
        service.save = save;
        service.clear = clear;
        service.submit = submit;

        return service;
        //////////////////////////////////

        function retrieveForUser(user) {
            $http.get('/household/' + user._id)
                .then(function(response) {
                    $rootScope.household = response.data;
                });
        }

        function save() {
            // Only save on the last page or when 
            // there's a signed in user
            if (!$rootScope.user) {
                return;
            }
            $rootScope.household.userId = $rootScope.user._id;
            return $http.post('/household', $rootScope.household)
                    .then(function(response) {
                        $rootScope.household = response.data;
                    });
        }

        function submit() {
            if ($rootScope.user) {
                $rootScope.household.userId = $rootScope.user._id;
            }

            return $http.post('/household', $rootScope.household);
        }

        function clear () {
            $rootScope.household = Object.create(Household);
        }
    }

})();
