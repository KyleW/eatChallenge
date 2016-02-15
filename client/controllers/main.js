(function() {
    'use strict'

    angular
        .module('eatChallengeApp')
        .controller('mainController', mainController);

    mainController.$inject = ['$http', '$interval', '$mdDialog', '$mdMedia', '$scope', '$state', 'Household', 'Sections'];

    function mainController ($http, $interval, $mdDialog, $mdMedia, $scope, $state, Household, Sections) {
        // TODO: replace scope with vm
        $scope.household = Household.get();
        $scope.schoolDistrict = 'Oakland Unified School District';

        $scope.navigateToNextSection = navigateToNextSection;
        $scope.submitApplication = submitApplication;

        /////////////////////////////////////

        function addChild(newVal) {
            if (newVal > $scope.household.children.length) {
                $http.get('/child').then(function(response) {
                    var newChild = response.data;
                    $scope.household.children.push(newChild);
                    addChild(newVal);
                });
            }
        }

        $scope.$watch('household.childCount', addChild);
        $scope.$watch('household.otherMembersCount', function(newVal) {
            while (newVal > $scope.household.otherMembers.length) {
                $scope.household.incrementOtherMembersCount();
            }
        });

        function navigateToNextSection() {
            Household.save();
            var updated = Sections.updateRequiredSections($scope.household);
            Sections.navigateToNext($state.$current.self.name);
        }

        function submitApplication() {
            Household.completed = true;
            navigateToNextSection();
        }

    }

})();
