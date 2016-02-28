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

        this.get = get;
        this.set = set;
        this.save = save;
        this.clear = clear;
        this.household = Object.create(Household);

        return this;
        //////////////////////////////////

        function get() {
            if (this.household) {
                return this.household;
            }
            // household = 
            // return household;
        }

        function set(retrievedHousehold) {
            this.household = retrievedHousehold;
        }

        function save(household) {
            if ($rootScope.user) {
                household.userId = $rootScope.user._id;
            }

            return $http.post('/household', household);
            // .then(function(response) {
            //     return response.data;
            // });
        }

        function clear () {
            this.household = Object.create(Household);
        }
    }

})();
