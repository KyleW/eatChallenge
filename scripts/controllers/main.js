(function() {

angular
    .module('eatChallengeApp')
    .controller('mainController', mainController);

mainController.$inject = ['$mdDialog', '$mdMedia', '$scope', 'Household'];

function mainController ($mdDialog, $mdMedia, $scope, Household) {
    // TODO: replace scope with vm
    $scope.schoolDistrict = 'Oakland Unified School District';
    $scope.studentStatuses = ['in school', 'home schooled', 'some other status'];
    $scope.household = Household.get();
    $scope.$watch('household.childCount', function(newVal) {
        while (newVal > $scope.household.children.length) {
            $scope.household.incrementChildCount();
        }
    });
}

})();
