(function() {

angular
    .module('eatChallengeApp')
    .controller('mainController', mainController);

mainController.$inject = ['$mdDialog', '$mdMedia', '$rootScope', '$scope', '$state', 'Household', 'Sections'];

function mainController ($mdDialog, $mdMedia, $scope, $rootScope, $state, Household, Sections) {
    // TODO: replace scope with vm
    $scope.schoolDistrict = 'Oakland Unified School District';
    $scope.studentStatuses = ['in school', 'home schooled', 'some other status'];

    $scope.household = Household.get();
    $scope.navigateToNextSection = Sections.navigateToNext;

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

    $scope.currentState = $state.$current.self.name;
    
    // TODO: move this to config or something
    $rootScope.$on('$stateChangeSuccess', function() {
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

}

})();
