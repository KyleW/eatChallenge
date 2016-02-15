(function() {
    angular
        .module('eatChallengeApp')
        .service('Household', householdService);

    householdService.$inject = ['$http'];

    function householdService($http) {
        this.get = get;
        this.save = save;
        this.clear = clear;

        //////////////////////////////////
        var household;

        var Person = {
            init: function() {
                this.incomeSourceCount = 0;
                this.incomeSources = [];
            },
        };

        // Model
        // Todo: consider moving to server??
        var Household = {
            childCount: 0,
            children: [],
            otherMembersCount: 0,
            otherMembers: [],
            completedApplication: false
        };

        function get() {
            if (household) {
                return household;
            }
            household = Object.create(Household);
            return household;
        }

        function save() {
            return $http.post('/household', household).then(function(response) {
                household = response.data;
            });
        }

        function clear () {
            var household = {};
            return household;
        }

        return this;
    }

})();
