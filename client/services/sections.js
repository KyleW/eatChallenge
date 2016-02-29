(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .service('Sections', sectionsService);

    sectionsService.$inject = ['$rootScope' ,'$state'];

    function sectionsService($rootScope, $state) {
        var sections = [
            {
                label: 'Let\’s Get Started! ',
                state: 'start',
                completed: false,
                required: true,
                showSummaryAfter: false
            },            {
                label: 'Children',
                state: 'children',
                completed: false,
                required: true,
                showSummaryAfter: true
            },
            {
                label: 'Household Members',
                state: 'household',
                completed: false,
                required: true,
                showSummaryAfter: true
            },
            {
                label: 'Children\'s Income',
                state: 'childIncome',
                completed: false,
                required: true,
                showSummaryAfter: true
            },
            {
                label: 'Household Income',
                state: 'householdIncome',
                completed: false,
                required: true,
                showSummaryAfter: true
            },
            {
                label: 'Disclosure',
                state: 'disclosure',
                completed: false,
                required: true,
                showSummaryAfter: false
            },
            {
                label: 'Sign and Confirm',
                state: 'signature',
                completed: false,
                required: true,
                showSummaryAfter: false
            },
        ];

        var indexedSections = _.indexBy(sections, 'state');

        var service = {
            meansTest: true,
            sections: sections,
            indexedSections: indexedSections,
            navigateToNext: navigateToNext,
            goBack: goBack,
            updateRequiredSections: updateRequiredSections
        };

        return service;
        //////////////////////

        function updateRequiredSections() {
            var household = $rootScope.household;
            service.meansTest = true;
            var assistanceProgramHousehold = isAssistanceHousehold(household);
            var categoricallyQualified = allStudentsCategoricallyQualify(household);

            if (assistanceProgramHousehold || categoricallyQualified) {
                service.meansTest = false;
                indexedSections['childIncome'].required = false;
                indexedSections['household'].required = false;
                indexedSections['householdIncome'].required = false;
                return;
            }

            sections.forEach(function(section) {
                section.required = true;
            });
        }

        function isAssistanceHousehold(household) {
            var currentChild;
            for (var i = 0 ; i < household.children.length; i++) {
                currentChild = household.children[i];
                if (currentChild.assistanceProgram && currentChild.assistanceProgram.participant) {
                    return true;
                }
            }
            return false;
        }

        function allStudentsCategoricallyQualify(household) {
            var currentChild, childQualifies;

            var enrolledChildren = _.filter(household.children, function(c) {
                return c.enrolled === true;
            });

            // must have kids to qualify
            if (enrolledChildren.length === 0) {
                return false;
            }

            //all children are categorically qualified
            for (var i = 0 ; i < enrolledChildren.length; i++) {
                currentChild = household.children[i];
                if (!currentChild.specialStatus.fosterChild &&
                    !currentChild.specialStatus.homelessMigrantRunaway &&
                    !currentChild.specialStatus.headStartParticipant
                ) {
                    return false;
                }
            }

            return true;

        }

        function findNext(currentState) {
            var currentIndex = _.findIndex(sections, function(section) {
                return section.state === currentState;
            });

            // Look for the next required section
            for (var i = currentIndex + 1; i < sections.length; i++) {
                if (sections[i].required) {
                    return sections[i].state;
                }
            }

            // if there are no more required sections, we're done.
            return 'confirmation';
        }

        function navigateToNext() {
            var nextSection;
            var currentState = $rootScope.currentState || $state.$current.self.name;
            var previousState = $rootScope.previousState || 'start';
            // If on the summary page go to the next form page
            if (currentState === 'soFar') {
                if (previousState) {
                    nextSection  = findNext(previousState);
                } else {
                    // This happens if you refresh the page on the so far screen.
                    // Come up with something better? stash in url?
                    nextSection = 'start';
                }
            } else if (indexedSections[currentState].showSummaryAfter) {
                // if on a form page, go to summary page
                nextSection = 'soFar';
            } else {
                // If you're on some other page like start or signature
                // Move ahead as normal
                nextSection  = findNext(currentState);
            }

            $state.go(nextSection);
        }

        function goBack() {
            var previousState = $rootScope.previousState || 'start';
            $state.go(previousState);
        }

    }

})();
