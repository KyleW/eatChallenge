(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .controller('householdIncome', householdIncome);

    householdIncome.$inject = [
        '$mdDialog',
        '$mdMedia',
        '$rootScope',
        '$scope',
        '$state',
        'Household',
        'Sections'
    ];

    function householdIncome ($mdDialog, $mdMedia, $rootScope, $scope, $state, Household, Sections, HouseholdIncome) {
        var vm = $scope;
        vm.numberRegex =  '^[1-9][0-9]*$';
        vm.navigateToNextSection = navigateToNextSection;

        var work = {
            categoryName: 'work',
            headline: 'Work Income',
            question: 'earn money through work',
            sources: [
                {
                    value:'work',
                    checkboxLabel: 'Work outside the home in a non-military capacity ',
                    shortLabel: 'Earnings from work',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    annotation: 'Please report gross income. This is the amount of income earned before any money is taken out for taxes or deductions. Include salary, wages, and cash bonuses.'
                },
                {
                    value:'selfEmployed',
                    shortLabel: 'Earnings from self employment',
                    checkboxLabel: 'Self-employed',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    annotation: 'For household members that are self-employed, report income from that work as a net amount. This is calculated by subtracting the total operating expenses of the business from its gross receipts or revenue.'

                },
                {
                    value:'onStrike',
                    checkboxLabel: 'On strike',
                    shortLabel: 'Strike Benefits',
                    frequency: ['weekly', 'every 2 weeks', '2x month', 'monthly'],
                    // annotation:
                },
                {
                    // TODO: add space for housing allowance per doc
                    value:'military',
                    checkboxLabel: 'In the U.S. military',
                    shortLabel: 'Basic pay and cash bonuses',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
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
                    value:'unemployment',
                    checkboxLabel: 'Unemployment benefits',
                    shortLabel: 'Unemployment benefits',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    // annotation: ''
                },
                {
                    value:'workersComp',
                    checkboxLabel: 'Worker’s compensation',
                    shortLabel: 'Worker’s compensation',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    // annotation: ''
                },
                {
                    value:'ssi',
                    checkboxLabel: 'Supplemental Security Income (SSI)',
                    shortLabel: 'Supplemental Security Income (SSI)',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    // annotation: ''
                },
                {
                    value:'cashAssistance',
                    checkboxLabel: 'Cash assistance from State or local government',
                    shortLabel: 'Cash assistance',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    annotation: 'This could include TANF or General Assistance money.'
                },
                {
                    value:'veteransBenefits',
                    checkboxLabel: 'Veteran’s benefits',
                    shortLabel: 'Veteran’s benefits',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
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
                    value: 'alimony',
                    checkboxLabel: 'alimony payments',
                    shortLabel: 'Alimony payment',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    annotation: 'If income is received from alimony, only court-ordered payments should be reported here. Informal but regular payments should be reported later as “other” income.'
                }
            ]
        };

        var childSupport = {
            categoryName: 'childSupport',
            headline: 'Child Support',
            question: 'receive any child support',
            sources: [
                {
                    value: 'childSupport',
                    checkboxLabel: 'any child support',
                    shortLabel: 'Child support payment',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    annotation: 'If income is received from child support, only court-ordered payments should be reported here. Informal but regular payments should be reported later as “other” income.'
                }
            ]
        };

        var retirement = {
            categoryName: 'retirement',
            headline: 'Pension and Retirement',
            question: 'receive any pension or retirement money',
            sources: [
                {
                    value: 'socialSecurity',
                    checkboxLabel: 'Social Security',
                    shortLabel: 'Social security',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    annotation: 'Please include railroad retirement and black lung benefits'
                },
                {
                    value: 'privatePension',
                    checkboxLabel: 'Private pensions or disability',
                    shortLabel: 'Private pensions or disability',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
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
                    value: 'trusts',
                    checkboxLabel: 'Income from trusts or estates',
                    shortLabel: 'Income from trusts or estates',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    // annotation: ''
                },
                {
                    value: 'annuities',
                    checkboxLabel: 'Annuities',
                    shortLabel: 'Income from annuities',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    // annotation: ''
                },
                {
                    value: 'investment',
                    checkboxLabel: 'Investment income',
                    shortLabel: 'Investment income',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    // annotation: ''
                },
                {
                    value: 'interest',
                    checkboxLabel: 'Earned interest',
                    shortLabel: 'Earned interest',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    // annotation: ''
                },
                {
                    value: 'rentalIncome',
                    checkboxLabel: 'Rental income',
                    shortLabel: 'Rental income',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    // annotation: ''
                },
                {
                    value: 'otherCash',
                    checkboxLabel: 'Regular cash payments from outside household',
                    shortLabel: 'Regular cash payments from outside household',
                    frequency: ['weekly', 'every 2 weeks', 'twice a month', 'monthly'],
                    annotation: 'Such cash payments should include regular child support or alimony payments received by the household that are not court-ordered.'
                },
            ]
        };

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

        // TODO: duplicated with main.js. Share in a better way
        function isInvalidForm() {
            var member;

            if (vm.form && (!vm.form.$valid)) {
                return true;
            }

            for (var i = 0; i < $rootScope.household.otherMembers.length ; i++) {
                member = $rootScope.household.otherMembers[i];
                for (var key in member.incomeCategory) {
                    if (member.incomeCategory[key].showCheckboxes === undefined) {
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
        vm.goBack = goBack;
        function goBack() {
            Household.save();
            Sections.updateRequiredSections();
            Sections.goBack();
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
