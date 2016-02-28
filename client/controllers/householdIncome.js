(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .controller('householdIncome', householdIncome);

    householdIncome.$inject = [
        '$scope',
        '$state',
        'Household',
        'Sections'
    ];

    function householdIncome ($scope, $state, Household, Sections, HouseholdIncome) {
        var vm = $scope;
        vm.household = Household.household;
        vm.navigateToNextSection = navigateToNextSection;

        var work = {
            categoryName: 'work',
            headline: 'Work Income',
            question: 'earn money through work',
            sources: [
                {
                    vaule:'work',
                    checkboxLabel: 'Work outside the home in a non-military capacity ',
                    shortLabel: 'Earnings from work',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'Please report gross income. This is the amount of income earned before any money is taken out for taxes or deductions. Include salary, wages, and cash bonuses.'
                },
                {
                    vaule:'selfEmployed',
                    shortLabel: 'Earnings from self employment',
                    checkboxLabel: 'Self-employed',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'For household members that are self-employed, report income from that work as a net amount. This is calculated by subtracting the total operating expenses of the business from its gross receipts or revenue.'

                },
                {
                    vaule:'onStrike',
                    checkboxLabel: 'On strike',
                    shortLabel: 'Strike Benefits',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation:
                },
                {
                    // TODO: add space for housing allowance per doc
                    vaule:'military',
                    checkboxLabel: 'In the U.S. military',
                    shortLabel: 'Basic pay and cash bonuses',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'Please do not include combat pay, FSSA, or private housing allowances.'
                }
            ]
        };

        var publicAssistance = {
            categoryName: 'publicAssistance',
            headline: 'Public Assistance',
            question: 'receive any public assistance benefits',
            sources:[
                {
                    vaule:'unemployment',
                    checkboxLabel: 'Unemployment benefits',
                    shortLabel: 'Unemployment benefits',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule:'workersComp',
                    checkboxLabel: 'Worker’s compensation',
                    shortLabel: 'Worker’s compensation',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule:'ssi',
                    checkboxLabel: 'Supplemental Security Income (SSI)',
                    shortLabel: 'Supplemental Security Income (SSI)',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule:'cashAssistance',
                    checkboxLabel: 'Cash assistance from State or local government',
                    shortLabel: 'Cash assistance',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'This could include TANF or General Assistance money.'
                },
                {
                    vaule:'veteransBenefits',
                    checkboxLabel: 'Veteran’s benefits',
                    shortLabel: 'Veteran’s benefits',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: 'This could include TANF or General Assistance money'
                }
            ]
        };

        var alimony = {
            categoryName: 'alimony',
            headline: 'Alimony',
            question: 'receive alimony payments',
            sources:[
                {
                    vaule: 'alimony',
                    checkboxLabel: 'alimony payments',
                    shortLabel: 'Alimony payment',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'If income is received from child support or alimony, only court-ordered payments should be reported here. Informal but regular payments should be reported later as “other” income.'
                }
            ]
        };

        var childSupport = {
            categoryName: 'childSupport',
            headline: 'Child Support',
            question: 'receive any child support',
            sources: [
                {
                    vaule: 'childSupport',
                    checkboxLabel: 'any child support',
                    shortLabel: 'Child support payment',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'If income is received from child support or childSupport, only court-ordered payments should be reported here. Informal but regular payments should be reported later as “other” income.'
                }
            ]
        };

        var retirement = {
            categoryName: 'retirement',
            headline: 'Pension and Retirement',
            question: 'receive any pension or retirement money',
            sources: [
                {
                    vaule: 'socialSecurity',
                    checkboxLabel: 'Social Security (including railroad retirement and black lung benefits)',
                    shortLabel: 'Social security',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'Please include railroad retirement and black lung benefits'
                },
                {
                    vaule: 'privatePension',
                    checkboxLabel: 'Private pensions or disability',
                    shortLabel: 'Private pensions or disability',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                }
            ]
        };

        var otherIncome = {
            categoryName: 'otherIncome',
            headline: 'Other Income',
            question: 'recieve money through any other source',
            sources: [
                {
                    vaule: 'trusts',
                    checkboxLabel: 'Income from trusts or estates',
                    shortLabel: 'Income from trusts or estates',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule: 'annuities',
                    checkboxLabel: 'Annuities',
                    shortLabel: 'Income from annuities',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule: 'investment',
                    checkboxLabel: 'Investment income',
                    shortLabel: 'Investment income',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule: 'interest',
                    checkboxLabel: 'Earned interest',
                    shortLabel: 'Earned interest',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule: 'rentalIncome',
                    checkboxLabel: 'Rental income',
                    shortLabel: 'Rental income',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule: 'otherCash',
                    checkboxLabel: 'Regular cash payments from outside household',
                    shortLabel: 'Regular cash payments from outside household',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'Such cash payments should include regular child support or alimony payments received by the household that are not court-ordered.'
                },
            ]
        };

        // TODO: duplicated with main.js. Share in a better way
        function navigateToNextSection() {
            Household.save(vm.household).then(function() {
                Sections.updateRequiredSections(vm.household);
                Sections.navigateToNext();
            });
        }

        vm.incomeCategories = [
                                work,
                                publicAssistance,
                                alimony,
                                childSupport,
                                retirement,
                                otherIncome
                              ];

    }

})();
