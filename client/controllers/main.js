(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .controller('mainController', mainController);

    mainController.$inject = [
        '$http',
        '$interval',
        '$mdDialog',
        '$mdMedia',
        '$scope',
        '$state',
        'Auth',
        'Household',
        'Sections'
    ];

    function mainController ($http, $interval, $mdDialog, $mdMedia,
                             $scope, $state, Auth, Household, Sections) {
        /* jshint validthis: true */
        var vm = $scope;
        vm.schoolDistrict = 'Oakland Unified School District';

        vm.household = Household.household;
        vm.meansTest = Sections.meansTest;
        // vm.estimatedIncome = estimateIncome(household);

        vm.childrenLabel = 'children';
        vm.adultsLabel = 'adults';

        // navigation
        vm.goBack = goBack;
        vm.navigateToNextSection = navigateToNextSection;
        vm.submitApplication = submitApplication;

        /////////////////////////////////////
        function init() {
            if (vm.household.children.length === 1) {
                vm.childrenLabel = 'child';
            }
            if (vm.household.otherMembers.length === 1) {
                vm.adultsLabel = 'adult';
            }

        }

        init();

        //New children and household members are created
        //by calling the server to make use of mongoose models
        function addChild(newVal) {
            // var newChild = {
            //     firstName:'',
            //     middleInitial: '',
            //     lastName: '',
            //     enrolled: null,
            //     specialStatus: {
            //         fosterChild: false,
            //         headStartParticipant: false,
            //         homelessMigrantRunaway: false
            //     },
            //     assistanceProgram: {},
            //     incomeSources: []
            // };

            // while (newVal > $scope.household.children.length) {
            //     $scope.household.children.push(Object.create(newChild));
            // }

            if (newVal > vm.household.children.length) {
                $http.get('/child').then(function(response) {
                    var newChild = response.data;
                    vm.household.children.push(newChild);
                    // Recurse if necessary
                    addChild(newVal);
                });
            }
        }

        function addOtherMember(newVal) {
            if (newVal > vm.household.otherMembers.length) {
                $http.get('/household-member').then(function(response) {
                    var newHouseholdMember = response.data;
                    newHouseholdMember = {};
                    vm.household.otherMembers.push(newHouseholdMember);
                    // Recurse if necessary
                    addOtherMember(newVal);
                });
            }
        }

        // TODO: finish this function
        function estimateIncome(household) {
            return 47;
        }

        function trimChildren(household) {
            // get rid of extra empty child obejcets created in process
            if (household.children.length > household.childCount) {
                household.children = household.children.slice(0, household.childCount);
            }
            return household;
        }

        function trimOtherMembers(household) {
            // get rid of extra empty otherMember obejcets created in process
            if (household.otherMembers.length > household.otherMembersCount) {
                household.otherMembers.slice(0, household.otherMembersCount);
            }
            return household;
        }

        function goBack() {
            Household.save();
            Sections.updateRequiredSections(vm.household);
            Sections.goBack();
        }

        function navigateToNextSection() {
            trimChildren(vm.household);
            trimOtherMembers(vm.household);

            Household.save(vm.household).then(function() {
                Sections.updateRequiredSections(vm.household);
                Sections.navigateToNext();
            });
        }

        function submitApplication() {
            $scope.household.completed = true;
            navigateToNextSection();
        }

        // Watchers
        $scope.$watch('household.childCount', addChild);
        $scope.$watch('household.otherMembersCount', addOtherMember);
    }

})();
