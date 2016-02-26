(function() {
    angular
        .module('eatChallengeApp')
        .service('Household', householdService);

    householdService.$inject = ['$http'];

    function householdService($http) {
        // Todo: consider moving to server??
        var Household =  {};

        // this.get = get;
        this.save = save;
        this.clear = clear;
        this.household = {
            childCount: 0,
            children: [],
            otherMembersCount: 0,
            otherMembers: [],
            completedApplication: false
        };

        //////////////////////////////////
        function get() {
            // if (this.household) {
            //     return this.household;
            // }
            // // household = 
            // return household;
        }

        function save(household) {
            return $http.post('/household', household);
            // .then(function(response) {
            //     return response.data;
            // });
        }

        function clear () {
            this.household = Object.create(Household);
        }

        return this;
    }

})();
