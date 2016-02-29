(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .controller('soFarController', soFarController);

    soFarController.$inject = [
        '$http',
        '$interval',
        '$mdDialog',
        '$mdMedia',
        '$rootScope',
        '$scope',
        '$state',
        'Household',
        'Sections'
    ];

    function soFarController ($http, $interval, $mdDialog, $mdMedia, $rootScope,
                             $scope, $state, Household, Sections) {
        /* jshint validthis: true */
        var vm = $scope;
        vm.meansTest = Sections.meansTest;

        vm.childrenLabel = 'children';
        vm.adultsLabel = 'adults';

        vm.incomeEarnersCount = countEarners($rootScope.household);
        vm.incomeEstimate = estimateIncome($rootScope.household);

        // navigation
        vm.goBack = goBack;
        vm.navigateToNextSection = navigateToNextSection;

        /////////////////////////////////////

        function init() {
            if ($rootScope.household.children.length === 1) {
                vm.childrenLabel = 'child';
            }
            if ($rootScope.household.otherMembers.length === 1) {
                vm.adultsLabel = 'adult';
            }
        }

        init();

        

        function estimateIncome() {
            var frequencyMulitplier = {
                weekly: 52,
                'every 2 weeks': 26,
                'twice a month': 24,
                monthly: 12
            };

            function getTotalforSource(source) {
                return source.amount * frequencyMulitplier[source.frequency];
            }

            var estimatedAnnualIncome = 0;

            $rootScope.household.children.forEach(function(child) {
                if (child.earnsIncome) {
                    child.incomeSources.forEach(function(incomeSource) {
                        if (incomeSource.amount > 0) {
                            estimatedAnnualIncome += getTotalforSource(incomeSource);
                        }
                    });
                }
            });

            $rootScope.household.otherMembers.forEach(function(member) {
                if (!member.incomeCategory) {
                    return;
                }
                var incomeSource;
                for (var key in member.incomeCategory) {
                    // This value gets stashed in the same place
                    incomeSource = member.incomeCategory[key];
                    for (var k in incomeSource) {
                        if (k !== 'showCheckboxes') {
                            var source = incomeSource[k];
                            estimatedAnnualIncome += getTotalforSource(source);
                        }
                    }
                }
            });

            return Math.round(estimatedAnnualIncome);
        }

        function countEarners(household) {
            var earnersCount = 0;
            $rootScope.household.children.forEach(function(child) {
                if (child.earnsIncome) {
                    earnersCount++;
                }
            });

            $rootScope.household.otherMembers.forEach(function(member) {
                if (member.incomeCategory && Object.keys(member.incomeCategory) > 0) {
                    earnersCount++;
                }
            });

            return earnersCount;
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
    }

})();
