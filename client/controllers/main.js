(function() {

    angular
        .module('eatChallengeApp')
        .controller('mainController', mainController);

    mainController.$inject = ['$interval', '$mdDialog', '$mdMedia', '$rootScope', '$scope', '$state', 'Household', 'Sections'];

    function mainController ($interval, $mdDialog, $mdMedia, $scope, $rootScope, $state, Household, Sections) {
        // TODO: replace scope with vm
        $scope.schoolDistrict = 'Oakland Unified School District';
        $scope.studentStatuses = ['in school', 'home schooled', 'some other status'];

        $scope.household = Household.get();
        $scope.navigateToNextSection = navigateToNextSection;

        /////////////////////////////////////

        $scope.$watch('household.childCount', function(newVal) {
            while (newVal > $scope.household.children.length) {
                $scope.household.incrementChildCount();
            }
        });

        $scope.$watch('household.otherMembersCount', function(newVal) {
            while (newVal > $scope.household.otherMembers.length) {
                $scope.household.incrementOtherMembersCount();
            }
        });

        // TODO: move this to config or something
        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        // $rootScope.previousState;
        // $rootScope.currentState;
        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            Sections.previousState = from.name;
            Sections.currentState = to.name;
            console.log('Previous state:' + Sections.previousState);
            console.log('Current state:' + Sections.currentState);
        });

        function navigateToNextSection() {
            Household.save();
            var updated = Sections.updateRequiredSections($scope.household);
            Sections.navigateToNext($state.$current.self.name);
        }

    }

})();
