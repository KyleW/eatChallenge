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
        '$scope',
        '$state',
        'Auth',
        'Household',
        'Sections'
    ];

    function mainController ($http, $interval, $mdDialog, $mdMedia,
                             $scope, $state, Auth, Household, Sections) {
        /* jshint validthis: true */
        var vm = $scope;
        var household = Household.get();

        vm.schoolDistrict = 'Oakland Unified School District';

        vm.household = household;
        vm.meansTest = Sections.meansTest;
        vm.estimatedIncome = estimateIncome(household);

        vm.childrenLabel = 'children';
        vm.adultsLabel = 'adults';

        // navigation
        vm.goBack = goBack;
        vm.navigateToNextSection = navigateToNextSection;
        vm.submitApplication = submitApplication;
        

        /////////////////////////////////////
        function init() {
            if (household.children.length === 1) {
                vm.childrenLabel = 'child';
            }
            if (household.otherMembers.length === 1) {
                vm.adultsLabel = 'adult';
            }

        }

        init();

        function addChild(newVal) {
            if (newVal > $scope.household.children.length) {
                $http.get('/child').then(function(response) {
                    var newChild = response.data;
                    $scope.household.children.push(newChild);
                    addChild(newVal);
                });
            }
        }

        // TODO: Move to mongoose model
        var HouseholdMember = {
            income: {}
        };

        function addOtherMember(newVal) {
            while (newVal > $scope.household.otherMembers.length) {
                var householdMember = Object.create(HouseholdMember);
                $scope.household.otherMembers.push(householdMember);

            }
        }

        // TODO: finish this function
        function estimateIncome(household) {
            return 47;
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
            Sections.updateRequiredSections($scope.household);
            Sections.goBack();
        }

        function navigateToNextSection() {
            trimChildren(household);
            trimOtherMembers(household);

            Household.save();
            Sections.updateRequiredSections($scope.household);
            Sections.navigateToNext();
        }

        function submitApplication() {
            $scope.household.completed = true;
            navigateToNextSection();
        }

        // Watchers
        $scope.$watch('household.childCount', addChild);
        $scope.$watch('household.otherMembersCount', addOtherMember);
    }

})();
