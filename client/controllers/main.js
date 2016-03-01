(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .controller('mainController', mainController);

    mainController.$inject = [
        '$http',
        '$mdDialog',
        '$mdMedia',
        '$rootScope',
        '$scope',
        '$state',
        '$timeout',
        'Household',
        'Sections'
    ];

    function mainController ($http, $mdDialog, $mdMedia, $rootScope,
                             $scope, $state, $timeout, Household, Sections) {
        /* jshint validthis: true */
        var vm = $scope;
        vm.schoolDistrict = 'Oakland Unified School District';

        // navigation
        vm.goBack = goBack;
        vm.navigateToNextSection = navigateToNextSection;
        vm.submitApplication = submitApplication;
        vm.showErrors = false;
        vm.numberRegex =  '^[1-9][0-9]*$';
        vm.childIncomeSources = {
            work: {
                vaule:'work',
                label: 'Earnings from work:',
                frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                annotation: 'A child has a job where they earn salary or wages. Please report gross income. This is the amount of income earned before any money is taken out for taxes or deductions. Include salary, wages, and cash bonuses.',
            },
            socialSecurity: {
                vaule:'socialSecurity',
                label: 'Social Security Disability Payments or Survivor’s Benefits:',
                frequency: ['monthly'],
                // annotation: 'A child is blind or disabled and receives Social Security benefits.',
                // ' A parent is disabled, retired, or deceased, and their child receives social security benefits',

            },
            otherPerson: {
                vaule:'otherPerson',
                label: 'Income from persons outside the household:',
                frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                annotation: 'A friend or extended family member regularly gives a child spending money.',
            },
            otherSource: {
                vaule:'otherSource',
                label: 'Income from any other source:',
                frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                annotation: 'A child receives income from a private pension fund, annuity, or trust.',
            }
        };
        /////////////////////////////////////

        //New children and household members are created
        //by calling the server to make use of mongoose models
        function addChild(newVal) {
            if (newVal > $rootScope.household.children.length) {
                $http.get('/child').then(function(response) {
                    var newChild = response.data;
                    newChild.incomeSources =  Object.keys(vm.childIncomeSources).map(function(incomeSource) {
                        return {type: incomeSource, amount: null, frequency: null};
                    });
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

        function showConfirm(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Ready to go on?')
                  .textContent('It looks like you have some errors or missing information in this section. Do you want to fix it now?')
                  .ariaLabel('Ready to go on?')
                  .targetEvent(ev)
                  .ok('Move Ahead Anyway')
                  .cancel('Go Back and Fix It Now');
            return $mdDialog.show(confirm);
        }

        function goBack() {
            Household.save()
            Sections.updateRequiredSections();
            Sections.goBack();
        }

        //Form Validation
        function isInvalidForm() {
            var child;

            if ($rootScope.currentState === 'childIncome') {
                for (var j = 0; j < $rootScope.household.children.length; j++) {
                    child = $rootScope.household.children[j];
                    if (child.earnsIncome === undefined) {
                        return true;
                    }
                    if (child.earnsIncome === true && !vm.form.$valid) {
                        return true;
                    }
                }

                return false;
            }

            if (vm.form && (!vm.form.$valid)) {
                return true;
            }

            if ($rootScope.currentState === 'children') {
                for (var i = 0; i < $rootScope.household.children.length; i++) {
                    child = $rootScope.household.children[i];
                    if (child.enrolled === undefined) {
                        return true;
                    }
                }
            }

            return false;
        }

        function fixItHandler() {
            vm.showErrors = true;
            document.body.scrollTop = document.documentElement.scrollTop = 0;
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
            if (isInvalidForm()) {
                // open confirmation modal
                showConfirm().then(moveAheadHandler,fixItHandler);
            } else {
                Household.submit();
                Sections.updateRequiredSections();
                Sections.navigateToNext();
            }
        }

        // Watchers
        $scope.$watch('household.childCount', addChild);
        $scope.$watch('household.otherMembersCount', addOtherMember);
    }

})();
