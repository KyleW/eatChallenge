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

        var Person = {
            init: function() {
                this.incomeSourceCount = 0;
                this.incomeSources = [];
            },

            incrementIncomeSources: function() {
                this.incomeSourceCount++;
                while (this.incomeSourceCount > this.incomeSources.length) {
                    this.incomeSources.push({});
                }
            }
        };

        var Household = {
            init: function () {
                this.children = [];
                this.childCount = 0;
                this.incrementChildCount();

                this.otherMembers = [];
                this.otherMembersCount = 0;
                this.incrementOtherMembersCount();
            },
            incrementChildCount: function() {
                this.childCount++;
                while (this.childCount > this.children.length) {
                    var newChild = Object.create(Person);
                    newChild.init();

                    //add child specific fields
                    newChild.isChild = true;
                    newChild.specialStatus = {};
                    newChild.assistanceProgram = {};

                    this.children.push(newChild);
                }
            },
            incrementOtherMembersCount: function() {
                this.otherMembersCount++;
                while (this.otherMembersCount > this.otherMembers.length) {
                    var newMember = Object.create(Person);
                    newMember.init();
                    newMember.isChild = false;
                    this.otherMembers.push(newMember);
                }
            }

        };

        var household;

        function get() {
            if (household) {
                return household;
            }

            //TODO: if there's a userid, return the household associated with it
            // if (userid) {
            //     // TODO: add error handling
            //     $http.get('/household').then(function(data) {
            //         return household = data;
            //     });
            // } else {
            //     // create a new household if one doesn't exist
            household = Object.create(Household);
            household.init();
            // }

            return household;
        }

        function save() {
            // TODO: handle errors
            return $http.post('/household', household);
        }

        function clear () {
            var household = {};
            return household;
        }

        return this;
    }

})();
