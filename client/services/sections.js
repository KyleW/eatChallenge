(function() {
    'use strict'

    angular
        .module('eatChallengeApp')
        .service('Sections', sectionsService);

    sectionsService.$inject = ['$rootScope' ,'$state'];

    function sectionsService($rootScope, $state) {
        var previousState,
            currentState;
        
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

        var service = {
            sections: sections,
            indexedSections: indexedSections,
            navigateToNext: navigateToNext,
            updateRequiredSections: updateRequiredSections
        };

        return service;
        //////////////////////


        function updateRequiredSections(household) {
            var currentChild;
            var assistanceProgramHousehold = false;
            var specialStatusCount = 0;
            var skipMeansTest = false;


            for (var i = 0 ; i < household.children.length; i++) {
                currentChild = household.children[i];

                if (currentChild.assistanceProgram && currentChild.assistanceProgram.participant) {
                    assistanceProgramHousehold = true;
                    break;
                }

                if (currentChild.specialStatus && currentChild.specialStatus.fosterChild ||
                    currentChild.specialStatus.homelessMigrantRunaway ||
                    currentChild.specialStatus.headStartParticipant
                ) {
                    specialStatusCount++;
                }
            }

            skipMeansTest = assistanceProgramHousehold ||
                (household.children.length > 0 &&
                 household.children.length === specialStatusCount);

            if (skipMeansTest) {
                indexedSections['childIncome'].required = false;
                indexedSections['household'].required = false;

                return;
            }

            sections.forEach(function(section) {
                section.required = true;
            });

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

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            previousState = from.name;
            currentState = to.name;
            console.log('Previous state:' + previousState);
            console.log('Current state:' + currentState);
        });


    }

})();
