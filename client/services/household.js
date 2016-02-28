(function() {
    angular
        .module('eatChallengeApp')
        .service('Household', householdService);

    householdService.$inject = ['$http', '$rootScope'];

    function householdService($http, $rootScope) {
        // Todo: consider moving to server??
        var Household =  {
            childCount: 0,
            children: [],
            otherMembersCount: 0,
            otherMembers: [],
            completedApplication: false
        };

        var service = {};
        service.get = get;
        service.retrieveForUser = retrieveForUser;
        service.save = save;
        service.clear = clear;
        service.household = Object.create(Household);

        return service;
        //////////////////////////////////

        function get() {
            if (service.household) {
                return service.household;
            }
        }

        function retrieveForUser(user) {
            $http.get('/household/' + user._id)
                .then(function(response) {
                    service.household = response.data;
                });
        }

        function save(household) {
            household = household || service.household;
            if ($rootScope.user) {
                household.userId = $rootScope.user._id;
            }

            return $http.post('/household', household);
        }

        function clear () {
            service.household = Object.create(Household);
        }
    }

})();
