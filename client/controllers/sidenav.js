(function() {

    angular
        .module('eatChallengeApp')
        .controller('sideNavController', sideNavController);

    sideNavController.$inject = ['$scope','Sections'];

    function sideNavController ($scope, Sections) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.sections = Sections.sections;

    }

})();
