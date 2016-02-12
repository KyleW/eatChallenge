(function() {
    angular
        .module('eatChallengeApp')
        .service('Sections', sectionsService);

    sectionsService.$inject = ['$state'];

    function sectionsService($state) {

        var sections = [
            {
                label: 'Children',
                state: 'children',
                completed: false,
                required: true
            },
            {
                label: 'Child Income',
                state: 'childIncome',
                completed: false,
                required: true
            },
            {
                label: 'Household',
                state: 'household',
                completed: false,
                required: true
            },
            {
                label: 'Sign and Confirm',
                state: 'signature',
                completed: false,
                required: true
            },
        ];

        var indexedSections = _.indexBy(sections, 'state');

        // TODO: Put skip logic here
        function updateRequiredSections(household) {
            var currentChild;
            var assistanceProgramHousehold = true;
            var fosterChildCount = 0;
            var shouldMeansTest = true;

            for (var i = 0 ; i < household.children.length; i++) {
                currentChild = household.children[i];

                if (currentChild.assistanceProgram.participant) {
                    assistanceProgramHousehold = false;
                    break;
                }

                if (currentChild.specialStatus.fosterChild) {
                    fosterChildCount++;
                }
            }

            if (assistanceProgramHousehold ||
                household.children.length === fosterChildCount) {
                shouldMeansTest = false;
            }

            if (shouldMeansTest) {
                sections.forEach(function(section) {
                    section.required = true;
                });
            } else {
                indexedSections['childIncome'].required = false;
                indexedSections['household'].required = false;
            }

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

        function navigateToNext(currentState) {
            var nextSection  = findNext(currentState);
            $state.go(nextSection);
        }

        //////////////////////
        var service = {
            sections: sections,
            indexedSections: indexedSections,
            navigateToNext: navigateToNext,
            updateRequiredSections: updateRequiredSections
        };

        return service;

    }

})();