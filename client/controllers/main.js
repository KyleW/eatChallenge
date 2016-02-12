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

        function navigateToNextSection() {
            Sections.updateRequiredSections($scope.household);
            Sections.navigateToNext($state.$current.self.name);
        }
        // // TODO - make this work
        // function updateCompleted() {
        //     // console.log('valid', childrenForm.$valid);
        //     if (childrenForm.$valid) {
        //         // console.log('this ran- complete');
        //         Sections.indexedSections.children.completed = true;
        //     } else {
        //         // console.log('this ran- not complete');
        //         Sections.indexedSections.children.completed = false;
        //     }
        // }

        // // $interval(updateCompleted, 1000);
        // $scope.$watch('childrenForm.$invalid', function(newVal) {
        //     console.log('new val ', newVal);
        //     //$scope.valid = newVal;
        //     // $scope.informationStatus = true;
        // }, true);

    }

})();
