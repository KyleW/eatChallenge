(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .controller('householdIncome', householdIncome);

    householdIncome.$inject = [
        '$scope',
        '$state',
        'Auth',
        'Household',
        'Sections'
    ];

    function householdIncome ($scope, $state, Auth, Household, Sections, HouseholdIncome) {
        /* jshint validthis: true */
        var vm = $scope;
        var incomeSources = {};

        vm.household = Household.get();
        vm.navigateToNextSection = navigateToNextSection;
        vm.incomeSources = incomeSources;

        /////////////////////////////

        incomeSources.fromWork = {
            work: {
                vaule:'work',
                checkboxLabel: 'Work outside the home in a non-military capacity ',
                shortLabel: 'Earnings from work',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: 'Please report gross income. This is the amount of income earned before any money is taken out for taxes or deductions. Include salary, wages, and cash bonuses.'
            },
            selfEmployed: {
                vaule:'selfEmployed',
                shortLabel: 'Earnings from self employment',
                checkboxLabel: 'Self-employed',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: 'For household members that are self-employed, report income from that work as a net amount. This is calculated by subtracting the total operating expenses of the business from its gross receipts or revenue.'

            },
            onStrike: {
                vaule:'onStrike',
                checkboxLabel: 'On Strike',
                shortLabel: 'Strike Benefits',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                // annotation:
            },
            military: {
                // TODO: add space for housing allowance per doc
                vaule:'military',
                checkboxLabel: 'In the U.S. military',
                shortLabel: 'Basic pay and cash bonuses',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: 'Please do not include combat pay, FSSA, or private housing allowances.'
            }
        };

        incomeSources.publicAssistance = {
            unemployment: {
                vaule:'unemployment',
                checkboxLabel: 'Unemployment benefits',
                shortLabel: 'Unemployment benefits',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                // annotation: 'Please report gross income. This is the amount of income earned before any money is taken out for taxes or deductions. Include salary, wages, and cash bonuses.'
            },
            workersComp: {
                vaule:'workersComp',
                checkboxLabel: 'Worker’s compensation',
                shortLabel: 'Worker’s compensation',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                // annotation: 'Please report gross income. This is the amount of income earned before any money is taken out for taxes or deductions. Include salary, wages, and cash bonuses.'
            },
            ssi: {
                vaule:'ssi',
                checkboxLabel: 'Supplemental Security Income (SSI)',
                shortLabel: 'Supplemental Security Income (SSI)',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                // annotation: 'Please report gross income. This is the amount of income earned before any money is taken out for taxes or deductions. Include salary, wages, and cash bonuses.'
            },
            cashAssistance: {
                vaule:'cashAssistance',
                checkboxLabel: 'Cash assistance from State or local government',
                shortLabel: 'Cash assistance',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: 'This could include TANF or General Assistance money'
            },
            veteransBenefits: {
                vaule:'veteransBenefits',
                checkboxLabel: 'Veteran’s benefits',
                shortLabel: 'Veteran’s benefits',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: 'This could include TANF or General Assistance money'
            },
        };

        incomeSources.alimony = {
            alimony: {
                vaule: 'alimony',
                checkboxLabel: 'alimony payments',
                shortLabel: 'Alimony payment',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: 'If income is received from child support or alimony, only court-ordered payments should be reported here. Informal but regular payments should be reported later as “other” income.'
            }
        };

        incomeSources.childSupport = {
            childSupport: {
                vaule: 'childSupport',
                checkboxLabel: 'any child support',
                shortLabel: 'Child support payment',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: 'If income is received from child support or childSupport, only court-ordered payments should be reported here. Informal but regular payments should be reported later as “other” income.'
            }
        };

        incomeSources.retirement = {
            retirment: {
                // TODO sub groups
                vaule: 'retirement',
                checkboxLabel: 'any pension or retirement money',
                shortLabel: 'pension or retirement money',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                // annotation: 'If income is received from child support or childSupport, only court-ordered payments should be reported here. Informal but regular payments should be reported later as “other” income.'
            }
        };

        incomeSources.otherIncome = {
            otherIncome: {
                // TODO sub groups
                vaule: 'otherIncome',
                checkboxLabel: 'money through any other source',
                shortLabel: 'pension or retirement money',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                // annotation: 'If income is received from child support or childSupport, only court-ordered payments should be reported here. Informal but regular payments should be reported later as “other” income.'
            }
        };

        /////////////////////////////////////
        function navigateToNextSection() {
            Household.save();
            var updated = Sections.updateRequiredSections($scope.household);
            Sections.navigateToNext($state.$current.self.name);
        }
    }

})();
