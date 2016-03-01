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

        function showConfirm() {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Ready to go on?')
                  .textContent('It looks like you have some errors or missing information in this section. Do you want to fix it now?')
                  .ariaLabel('Lucky day')
                  .targetEvent(ev)
                  .ok('Move Ahead Anyway')
                  .cancel('Go Back and Fix It Now');
            return $mdDialog.show(confirm);
        }

        function goBack() {
            Household.save();
            Sections.updateRequiredSections();
            Sections.goBack();
        }

        //Form Validation
        function isInvalidForm() {
            if ($rootScope.currentState === 'children' && !vm.childrenForm.$valid) {
                return true;
            }

            return false;
        }

        function fixItHandler() {
            vm.showErrors = true;
        }

        function moveAheadHandler() {
            Household.save();
            Sections.updateRequiredSections();
            Sections.navigateToNext();
        }

        function navigateToNextSection() {
            if (isInvalidForm()) {
                // open confirmation modal
                showConfirm().then(moveAheadHandler,fixItHandler);
            } else {
                moveAheadHandler();
            }
        }

        function submitApplication() {
            trimChildren($rootScope.household);
            trimOtherMembers($rootScope.household);
            $rootScope.household.completed = true;
            navigateToNextSection();
        }

        // Watchers
        $scope.$watch('household.childCount', addChild);
        $scope.$watch('household.otherMembersCount', addOtherMember);
    }

})();
