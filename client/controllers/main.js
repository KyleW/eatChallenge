(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .controller('mainController', mainController);

    mainController.$inject = [
        '$http',
        '$interval',
        '$mdDialog',
        '$mdMedia',
        '$rootScope',
        '$scope',
        '$state',
        '$timeout',
        'Household',
        'Sections'
    ];

    function mainController ($http, $interval, $mdDialog, $mdMedia, $rootScope,
                             $scope, $state, $timeout, Household, Sections) {
        /* jshint validthis: true */
        var vm = $scope;
        vm.schoolDistrict = 'Oakland Unified School District';

        // navigation
        vm.goBack = goBack;
        vm.navigateToNextSection = navigateToNextSection;
        vm.submitApplication = submitApplication;
        vm.showErrors = false;
        /////////////////////////////////////

        $timeout(function() {
            vm.showErrors = true;
        }, 7000)

        //New children and household members are created
        //by calling the server to make use of mongoose models
        function addChild(newVal) {
            if (newVal > $rootScope.household.children.length) {
                $http.get('/child').then(function(response) {
                    var newChild = response.data;
                    $rootScope.household.children.push(newChild);
                    // Recurse if necessary
                    addChild(newVal);
                });
            }
        }

        function addOtherMember(newVal) {
            if (newVal > $rootScope.household.otherMembers.length) {
                $http.get('/household-member').then(function(response) {
                    var newHouseholdMember = response.data;
                    newHouseholdMember = {};
                    $rootScope.household.otherMembers.push(newHouseholdMember);
                    // Recurse if necessary
                    addOtherMember(newVal);
                });
            }
        }

        function trimChildren(household) {
            // get rid of extra empty child obejcets created in process
            if (household.children.length > household.childCount) {
                household.children = household.children.slice(0, household.childCount);
            }
            return household;
        }

        function trimOtherMembers(household) {
            // get rid of extra empty otherMember obejcets created in process
            if (household.otherMembers.length > household.otherMembersCount) {
                household.otherMembers.slice(0, household.otherMembersCount);
            }
            return household;
        }

        function goBack() {
            Household.save();
            Sections.updateRequiredSections();
            Sections.goBack();
        }

        function navigateToNextSection() {
            Household.save();
            Sections.updateRequiredSections();
            Sections.navigateToNext();
        }

        function submitApplication() {
            trimChildren($rootScope.household);
            trimOtherMembers($rootScope.household);

            $rootScope.household.completed = true;
            Household.submit();
            Sections.updateRequiredSections();
            Sections.navigateToNext();
        }

        // Watchers
        $scope.$watch('household.childCount', addChild);
        $scope.$watch('household.otherMembersCount', addOtherMember);
    }

})();
