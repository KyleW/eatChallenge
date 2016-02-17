(function() {

    angular
    .module('eatChallengeApp',['ngCsv','ngMaterial', 'ngSanitize', 'ui.router'])
    .config(routerConfig)
    .config(materialDesignThemer);

    materialDesignThemer.$inject = ['$mdThemingProvider'];
    function materialDesignThemer($mdThemingProvider) {
        // $mdThemingProvider.theme('light-blue');
        // .primaryPalette('pink', {
        //   'default': '400', // by default use shade 400 from the pink palette for primary intentions
        //   'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        //   'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        //   'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        // })
        // // If you specify less than all of the keys, it will inherit from the
        // // default shades
        // .accentPalette('purple', {
        //   'default': '200' // use shade 200 for default, and keep all other shades the same
        // });
    }

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerConfig ($stateProvider, $urlRouterProvider) {

        router($stateProvider, $urlRouterProvider);

        //////////
        function router($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
            .state('start', {
                url: '/',
                views:{
                    'side-nav': {
                        templateUrl: '../views/sideNav.html',
                        controller: 'sideNavController'
                    },
                    'main': {
                        templateUrl: '../views/start.html',
                        controller: 'mainController'
                    }
                }
            })
            .state('children', {
                url: '/children',
                views:{
                'side-nav': {
                    templateUrl: '../views/sideNav.html',
                    controller: 'sideNavController'
                },
                'main': {
                    templateUrl: '../views/children.html',
                    controller: 'mainController'
                }
            }
            })
            .state('childIncome', {
                url: '/childIncome',
                views:{
                    'side-nav': {
                    templateUrl: '../views/sideNav.html',
                    controller: 'sideNavController'
                },
                    'main': {
                    templateUrl: '../views/childIncome.html',
                    controller: 'mainController'
                }
                }
            })
            .state('household', {
                url: '/household',
                views:{
                    'side-nav': {
                    templateUrl: '../views/sideNav.html',
                    controller: 'sideNavController'
                },
                    'main': {
                    templateUrl: '../views/household.html',
                    controller: 'mainController'
                }
                }
            })
            .state('signature', {
                url: '/signature',
                views:{
                    'side-nav': {
                    templateUrl: '../views/sideNav.html',
                    controller: 'sideNavController'
                },
                    'main': {
                    templateUrl: '../views/signature.html',
                    controller: 'mainController'
                }
                }
            })
            .state('confirmation', {
                url: '/confirmation',
                views:{
                    'side-nav': {
                    templateUrl: '../views/sideNav.html',
                    controller: 'sideNavController'
                },
                    'main': {
                    templateUrl: '../views/confirmation.html',
                    controller: 'mainController'
                }
                }
            })
            .state('export', {
                url: '/export',
                views: {
                    'side-nav': {
                        templateUrl: '../views/sideNav.html',
                        controller: 'sideNavController'
                    },
                    'main': {
                        templateUrl: '../views/export.html',
                        controller: 'exportController'
                    }
                }
            })
            .state('styleguide', {
              url: '/styleguide',
              templateUrl: '../views/styleguide.html',
              controller: 'mainController'
            })
            .state('signup', {
              url: '/signup',
              views:{
                    'side-nav': {
                        templateUrl: '../views/sideNav.html',
                        controller: 'sideNavController'
                    },
                    'main': {
                        templateUrl: '../views/signup.html',
                        controller: 'mainController'
                    }
                }
              
            })
            .state('login', {
                url: '/login',
                views:{
                    'side-nav': {
                        templateUrl: '../views/sideNav.html',
                        controller: 'sideNavController'
                    },
                    'main': {
                        templateUrl: '../views/login.html',
                        controller: 'loginController'
                    }
                }
            })
            .state('soFar', {
                url: '/so-far',
                views:{
                    'side-nav': {
                    templateUrl: '../views/sideNav.html',
                    controller: 'sideNavController'
                },
                    'main': {
                    templateUrl: '../views/soFar.html',
                    controller: 'mainController'
                }
                }
            });
        }
    }

})();

(function() {
    'use strict'

    angular
        .module('eatChallengeApp')
        .controller('exportController', exportController);

    exportController.$inject = ['$http', '$scope'];

    function exportController($http, $scope) {
        $http.get('/household/completed').then(function(response) {
            $scope.completedApplications = response.data;
        });
    }

})();

(function() {

    angular
      .module('eatChallengeApp')
      .controller('loginController', [loginController]);
    loginController.$inject = ['$location', '$scope'];
    function loginController($location, $scope) {
        var vm = $scope;
        // debugger;
        // vm.error = $location;
    }

})();

(function() {
    'use strict'

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
        'Household',
        'Sections'
    ];

    function mainController ($http, $interval, $mdDialog, $mdMedia, $scope, $state, Household, Sections) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.household = Household.get();
        vm.schoolDistrict = 'Oakland Unified School District';

        vm.navigateToNextSection = navigateToNextSection;
        vm.submitApplication = submitApplication;

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

        function addOtherMember(newVal) {
            while (newVal > $scope.household.otherMembers.length) {
                $scope.household.incrementOtherMembersCount();
            }
        }

        function navigateToNextSection() {
            Household.save();
            var updated = Sections.updateRequiredSections($scope.household);
            Sections.navigateToNext($state.$current.self.name);
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

(function() {

    angular
        .module('eatChallengeApp')
        .controller('sideNavController', sideNavController);

    sideNavController.$inject = ['$scope', '$state', 'Sections'];

    function sideNavController ($scope, $state, Sections) {
        /* jshint validthis: true */
        var vm = $scope;

        vm.currentState = $state.$current.self.name;
        vm.sections = Sections.sections;
    }

})();

(function() {

    angular
        .module('eatChallengeApp')
        .directive('incomeQuestions', incomeDirective);

    function incomeDirective() {
        var directive = {
            scope: {
                member: '='
            },
            restrict: 'A',
            replace: true,
            templateUrl: '../views/income.html',
            link: link
        };

        return directive;
    }

    // link.$inject = ['scope'];

    function link(scope) {
        scope.incomeSources = {
            work: {
                vaule:'work',
                label: 'Earnings from work',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: {
                    child: 'A child has a job where they earn salary or wages ',
                    otherMember: '',
                }
            },
            socialSecurity: {
                vaule:'socialSecurity',
                label: 'Social Security Disability Payments or Survivor’s Benefits ',
                frequency: ['monthly'],
                annotation: {
                    child: 'A child is blind or disabled and receives Social Security benefits.',
                    // ' A parent is disabled, retired, or deceased, and their child receives social security benefits',
                    otherMember: '',
                }
            },
            otherPerson: {
                vaule:'otherPerson',
                label: 'Income from persons outside the household',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: {
                    child: 'A friend or extended family member regularly gives a child spending money',
                    otherMember: '',
                }
            },
            otherSource: {
                vaule:'otherSource',
                label: 'Income from any other source',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: {
                    child: 'A child receives income from a private pension fund, annuity, or trust',
                    otherMember: '',
                }
            }
        };

        if (scope.member.incomeSources.length === 0) {
            scope.member.incomeSources = [];
            Object.keys(scope.incomeSources).forEach(function(incomeSource) {
                scope.member.incomeSources.push({
                    type: incomeSource,
                    amount: null,
                    frequency: null
                });
            });
        }
    }

})();

(function() {

    angular
        .module('eatChallengeApp')
        .directive('yesNoInput', yesNoInput);

    function yesNoInput () {
        return {
            scope: {
                model: '='
            },
            restrict: 'A',
            replace: true,
            templateUrl: '../views/yesno.html',
        };
    }

})();

(function() {
    angular
        .module('eatChallengeApp')
        .service('Household', householdService);

    householdService.$inject = ['$http'];

    function householdService($http) {
        this.get = get;
        this.save = save;
        this.clear = clear;

        //////////////////////////////////
        var household;

        var Person = {
            init: function() {
                this.incomeSourceCount = 0;
                this.incomeSources = [];
            },
        };

        // Model
        // Todo: consider moving to server??
        var Household = {
            childCount: 0,
            children: [],
            otherMembersCount: 0,
            otherMembers: [],
            completedApplication: false
        };

        function get() {
            if (household) {
                return household;
            }
            household = Object.create(Household);
            return household;
        }

        function save() {
            return $http.post('/household', household).then(function(response) {
                household = response.data;
            });
        }

        function clear () {
            var household = {};
            return household;
        }

        return this;
    }

})();

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2V4cG9ydC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luLmpzIiwiY29udHJvbGxlcnMvbWFpbi5qcyIsImNvbnRyb2xsZXJzL3NpZGVuYXYuanMiLCJkaXJlY3RpdmVzL2luY29tZS5qcyIsImRpcmVjdGl2ZXMveWVzbm8uanMiLCJzZXJ2aWNlcy9ob3VzZWhvbGQuanMiLCJzZXJ2aWNlcy9zZWN0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcblxuICAgIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnLFsnbmdDc3YnLCduZ01hdGVyaWFsJywgJ25nU2FuaXRpemUnLCAndWkucm91dGVyJ10pXG4gICAgLmNvbmZpZyhyb3V0ZXJDb25maWcpXG4gICAgLmNvbmZpZyhtYXRlcmlhbERlc2lnblRoZW1lcik7XG5cbiAgICBtYXRlcmlhbERlc2lnblRoZW1lci4kaW5qZWN0ID0gWyckbWRUaGVtaW5nUHJvdmlkZXInXTtcbiAgICBmdW5jdGlvbiBtYXRlcmlhbERlc2lnblRoZW1lcigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcbiAgICAgICAgLy8gJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdsaWdodC1ibHVlJyk7XG4gICAgICAgIC8vIC5wcmltYXJ5UGFsZXR0ZSgncGluaycsIHtcbiAgICAgICAgLy8gICAnZGVmYXVsdCc6ICc0MDAnLCAvLyBieSBkZWZhdWx0IHVzZSBzaGFkZSA0MDAgZnJvbSB0aGUgcGluayBwYWxldHRlIGZvciBwcmltYXJ5IGludGVudGlvbnNcbiAgICAgICAgLy8gICAnaHVlLTEnOiAnMTAwJywgLy8gdXNlIHNoYWRlIDEwMCBmb3IgdGhlIDxjb2RlPm1kLWh1ZS0xPC9jb2RlPiBjbGFzc1xuICAgICAgICAvLyAgICdodWUtMic6ICc2MDAnLCAvLyB1c2Ugc2hhZGUgNjAwIGZvciB0aGUgPGNvZGU+bWQtaHVlLTI8L2NvZGU+IGNsYXNzXG4gICAgICAgIC8vICAgJ2h1ZS0zJzogJ0ExMDAnIC8vIHVzZSBzaGFkZSBBMTAwIGZvciB0aGUgPGNvZGU+bWQtaHVlLTM8L2NvZGU+IGNsYXNzXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC8vIElmIHlvdSBzcGVjaWZ5IGxlc3MgdGhhbiBhbGwgb2YgdGhlIGtleXMsIGl0IHdpbGwgaW5oZXJpdCBmcm9tIHRoZVxuICAgICAgICAvLyAvLyBkZWZhdWx0IHNoYWRlc1xuICAgICAgICAvLyAuYWNjZW50UGFsZXR0ZSgncHVycGxlJywge1xuICAgICAgICAvLyAgICdkZWZhdWx0JzogJzIwMCcgLy8gdXNlIHNoYWRlIDIwMCBmb3IgZGVmYXVsdCwgYW5kIGtlZXAgYWxsIG90aGVyIHNoYWRlcyB0aGUgc2FtZVxuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICByb3V0ZXJDb25maWcuJGluamVjdCA9IFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJ107XG5cbiAgICBmdW5jdGlvbiByb3V0ZXJDb25maWcgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICByb3V0ZXIoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcik7XG5cbiAgICAgICAgLy8vLy8vLy8vL1xuICAgICAgICBmdW5jdGlvbiByb3V0ZXIoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICAgICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdzdGFydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3N0YXJ0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnY2hpbGRyZW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2NoaWxkcmVuLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnY2hpbGRJbmNvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NoaWxkSW5jb21lJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvY2hpbGRJbmNvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnaG91c2Vob2xkJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ob3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9ob3VzZWhvbGQuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnc2lnbmF0dXJlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zaWduYXR1cmUnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWduYXR1cmUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnY29uZmlybWF0aW9uJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb25maXJtYXRpb24nLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9jb25maXJtYXRpb24uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnZXhwb3J0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBvcnQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2V4cG9ydC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdleHBvcnRDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnc3R5bGVndWlkZScsIHtcbiAgICAgICAgICAgICAgdXJsOiAnL3N0eWxlZ3VpZGUnLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3N0eWxlZ3VpZGUuaHRtbCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3NpZ251cCcsIHtcbiAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lnbnVwLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9sb2dpbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdzb0ZhcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvc28tZmFyJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc29GYXIuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnXG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdleHBvcnRDb250cm9sbGVyJywgZXhwb3J0Q29udHJvbGxlcik7XG5cbiAgICBleHBvcnRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRodHRwJywgJyRzY29wZSddO1xuXG4gICAgZnVuY3Rpb24gZXhwb3J0Q29udHJvbGxlcigkaHR0cCwgJHNjb3BlKSB7XG4gICAgICAgICRodHRwLmdldCgnL2hvdXNlaG9sZC9jb21wbGV0ZWQnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAkc2NvcGUuY29tcGxldGVkQXBwbGljYXRpb25zID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgYW5ndWxhclxuICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgIC5jb250cm9sbGVyKCdsb2dpbkNvbnRyb2xsZXInLCBbbG9naW5Db250cm9sbGVyXSk7XG4gICAgbG9naW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2NhdGlvbicsICckc2NvcGUnXTtcbiAgICBmdW5jdGlvbiBsb2dpbkNvbnRyb2xsZXIoJGxvY2F0aW9uLCAkc2NvcGUpIHtcbiAgICAgICAgdmFyIHZtID0gJHNjb3BlO1xuICAgICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgICAgLy8gdm0uZXJyb3IgPSAkbG9jYXRpb247XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignbWFpbkNvbnRyb2xsZXInLCBtYWluQ29udHJvbGxlcik7XG5cbiAgICBtYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1xuICAgICAgICAnJGh0dHAnLFxuICAgICAgICAnJGludGVydmFsJyxcbiAgICAgICAgJyRtZERpYWxvZycsXG4gICAgICAgICckbWRNZWRpYScsXG4gICAgICAgICckc2NvcGUnLFxuICAgICAgICAnJHN0YXRlJyxcbiAgICAgICAgJ0hvdXNlaG9sZCcsXG4gICAgICAgICdTZWN0aW9ucydcbiAgICBdO1xuXG4gICAgZnVuY3Rpb24gbWFpbkNvbnRyb2xsZXIgKCRodHRwLCAkaW50ZXJ2YWwsICRtZERpYWxvZywgJG1kTWVkaWEsICRzY29wZSwgJHN0YXRlLCBIb3VzZWhvbGQsIFNlY3Rpb25zKSB7XG4gICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cbiAgICAgICAgdmFyIHZtID0gJHNjb3BlO1xuXG4gICAgICAgIHZtLmhvdXNlaG9sZCA9IEhvdXNlaG9sZC5nZXQoKTtcbiAgICAgICAgdm0uc2Nob29sRGlzdHJpY3QgPSAnT2FrbGFuZCBVbmlmaWVkIFNjaG9vbCBEaXN0cmljdCc7XG5cbiAgICAgICAgdm0ubmF2aWdhdGVUb05leHRTZWN0aW9uID0gbmF2aWdhdGVUb05leHRTZWN0aW9uO1xuICAgICAgICB2bS5zdWJtaXRBcHBsaWNhdGlvbiA9IHN1Ym1pdEFwcGxpY2F0aW9uO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICBmdW5jdGlvbiBhZGRDaGlsZChuZXdWYWwpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPiAkc2NvcGUuaG91c2Vob2xkLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRodHRwLmdldCgnL2NoaWxkJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Q2hpbGQgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaG91c2Vob2xkLmNoaWxkcmVuLnB1c2gobmV3Q2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBhZGRDaGlsZChuZXdWYWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkT3RoZXJNZW1iZXIobmV3VmFsKSB7XG4gICAgICAgICAgICB3aGlsZSAobmV3VmFsID4gJHNjb3BlLmhvdXNlaG9sZC5vdGhlck1lbWJlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmhvdXNlaG9sZC5pbmNyZW1lbnRPdGhlck1lbWJlcnNDb3VudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbmF2aWdhdGVUb05leHRTZWN0aW9uKCkge1xuICAgICAgICAgICAgSG91c2Vob2xkLnNhdmUoKTtcbiAgICAgICAgICAgIHZhciB1cGRhdGVkID0gU2VjdGlvbnMudXBkYXRlUmVxdWlyZWRTZWN0aW9ucygkc2NvcGUuaG91c2Vob2xkKTtcbiAgICAgICAgICAgIFNlY3Rpb25zLm5hdmlnYXRlVG9OZXh0KCRzdGF0ZS4kY3VycmVudC5zZWxmLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc3VibWl0QXBwbGljYXRpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuaG91c2Vob2xkLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdhdGNoZXJzXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2hvdXNlaG9sZC5jaGlsZENvdW50JywgYWRkQ2hpbGQpO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdob3VzZWhvbGQub3RoZXJNZW1iZXJzQ291bnQnLCBhZGRPdGhlck1lbWJlcik7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignc2lkZU5hdkNvbnRyb2xsZXInLCBzaWRlTmF2Q29udHJvbGxlcik7XG5cbiAgICBzaWRlTmF2Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlJywgJ1NlY3Rpb25zJ107XG5cbiAgICBmdW5jdGlvbiBzaWRlTmF2Q29udHJvbGxlciAoJHNjb3BlLCAkc3RhdGUsIFNlY3Rpb25zKSB7XG4gICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cbiAgICAgICAgdmFyIHZtID0gJHNjb3BlO1xuXG4gICAgICAgIHZtLmN1cnJlbnRTdGF0ZSA9ICRzdGF0ZS4kY3VycmVudC5zZWxmLm5hbWU7XG4gICAgICAgIHZtLnNlY3Rpb25zID0gU2VjdGlvbnMuc2VjdGlvbnM7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuZGlyZWN0aXZlKCdpbmNvbWVRdWVzdGlvbnMnLCBpbmNvbWVEaXJlY3RpdmUpO1xuXG4gICAgZnVuY3Rpb24gaW5jb21lRGlyZWN0aXZlKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtZW1iZXI6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9pbmNvbWUuaHRtbCcsXG4gICAgICAgICAgICBsaW5rOiBsaW5rXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9XG5cbiAgICAvLyBsaW5rLiRpbmplY3QgPSBbJ3Njb3BlJ107XG5cbiAgICBmdW5jdGlvbiBsaW5rKHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLmluY29tZVNvdXJjZXMgPSB7XG4gICAgICAgICAgICB3b3JrOiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J3dvcmsnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnRWFybmluZ3MgZnJvbSB3b3JrJyxcbiAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiAnQSBjaGlsZCBoYXMgYSBqb2Igd2hlcmUgdGhleSBlYXJuIHNhbGFyeSBvciB3YWdlcyAnLFxuICAgICAgICAgICAgICAgICAgICBvdGhlck1lbWJlcjogJycsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvY2lhbFNlY3VyaXR5OiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J3NvY2lhbFNlY3VyaXR5JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1NvY2lhbCBTZWN1cml0eSBEaXNhYmlsaXR5IFBheW1lbnRzIG9yIFN1cnZpdm9y4oCZcyBCZW5lZml0cyAnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWydtb250aGx5J10sXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZDogJ0EgY2hpbGQgaXMgYmxpbmQgb3IgZGlzYWJsZWQgYW5kIHJlY2VpdmVzIFNvY2lhbCBTZWN1cml0eSBiZW5lZml0cy4nLFxuICAgICAgICAgICAgICAgICAgICAvLyAnIEEgcGFyZW50IGlzIGRpc2FibGVkLCByZXRpcmVkLCBvciBkZWNlYXNlZCwgYW5kIHRoZWlyIGNoaWxkIHJlY2VpdmVzIHNvY2lhbCBzZWN1cml0eSBiZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyTWVtYmVyOiAnJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3RoZXJQZXJzb246IHtcbiAgICAgICAgICAgICAgICB2YXVsZTonb3RoZXJQZXJzb24nLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnSW5jb21lIGZyb20gcGVyc29ucyBvdXRzaWRlIHRoZSBob3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6ICdBIGZyaWVuZCBvciBleHRlbmRlZCBmYW1pbHkgbWVtYmVyIHJlZ3VsYXJseSBnaXZlcyBhIGNoaWxkIHNwZW5kaW5nIG1vbmV5JyxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJNZW1iZXI6ICcnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdGhlclNvdXJjZToge1xuICAgICAgICAgICAgICAgIHZhdWxlOidvdGhlclNvdXJjZScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdJbmNvbWUgZnJvbSBhbnkgb3RoZXIgc291cmNlJyxcbiAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiAnQSBjaGlsZCByZWNlaXZlcyBpbmNvbWUgZnJvbSBhIHByaXZhdGUgcGVuc2lvbiBmdW5kLCBhbm51aXR5LCBvciB0cnVzdCcsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyTWVtYmVyOiAnJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNjb3BlLm1lbWJlci5pbmNvbWVTb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2NvcGUubWVtYmVyLmluY29tZVNvdXJjZXMgPSBbXTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHNjb3BlLmluY29tZVNvdXJjZXMpLmZvckVhY2goZnVuY3Rpb24oaW5jb21lU291cmNlKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubWVtYmVyLmluY29tZVNvdXJjZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGluY29tZVNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IG51bGxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuZGlyZWN0aXZlKCd5ZXNOb0lucHV0JywgeWVzTm9JbnB1dCk7XG5cbiAgICBmdW5jdGlvbiB5ZXNOb0lucHV0ICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgbW9kZWw6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy95ZXNuby5odG1sJyxcbiAgICAgICAgfTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuc2VydmljZSgnSG91c2Vob2xkJywgaG91c2Vob2xkU2VydmljZSk7XG5cbiAgICBob3VzZWhvbGRTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XG5cbiAgICBmdW5jdGlvbiBob3VzZWhvbGRTZXJ2aWNlKCRodHRwKSB7XG4gICAgICAgIHRoaXMuZ2V0ID0gZ2V0O1xuICAgICAgICB0aGlzLnNhdmUgPSBzYXZlO1xuICAgICAgICB0aGlzLmNsZWFyID0gY2xlYXI7XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICB2YXIgaG91c2Vob2xkO1xuXG4gICAgICAgIHZhciBQZXJzb24gPSB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluY29tZVNvdXJjZUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmluY29tZVNvdXJjZXMgPSBbXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gTW9kZWxcbiAgICAgICAgLy8gVG9kbzogY29uc2lkZXIgbW92aW5nIHRvIHNlcnZlcj8/XG4gICAgICAgIHZhciBIb3VzZWhvbGQgPSB7XG4gICAgICAgICAgICBjaGlsZENvdW50OiAwLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgICAgb3RoZXJNZW1iZXJzQ291bnQ6IDAsXG4gICAgICAgICAgICBvdGhlck1lbWJlcnM6IFtdLFxuICAgICAgICAgICAgY29tcGxldGVkQXBwbGljYXRpb246IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgaWYgKGhvdXNlaG9sZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3VzZWhvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBob3VzZWhvbGQgPSBPYmplY3QuY3JlYXRlKEhvdXNlaG9sZCk7XG4gICAgICAgICAgICByZXR1cm4gaG91c2Vob2xkO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2F2ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvaG91c2Vob2xkJywgaG91c2Vob2xkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaG91c2Vob2xkID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgICAgICAgICAgdmFyIGhvdXNlaG9sZCA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIGhvdXNlaG9sZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCdcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLnNlcnZpY2UoJ1NlY3Rpb25zJywgc2VjdGlvbnNTZXJ2aWNlKTtcblxuICAgIHNlY3Rpb25zU2VydmljZS4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJyAsJyRzdGF0ZSddO1xuXG4gICAgZnVuY3Rpb24gc2VjdGlvbnNTZXJ2aWNlKCRyb290U2NvcGUsICRzdGF0ZSkge1xuICAgICAgICB2YXIgcHJldmlvdXNTdGF0ZSxcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZTtcbiAgICAgICAgXG4gICAgICAgIHZhciBzZWN0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2hpbGQgSW5jb21lJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2NoaWxkSW5jb21lJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnSG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2hvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1NpZ24gYW5kIENvbmZpcm0nLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnc2lnbmF0dXJlJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHZhciBpbmRleGVkU2VjdGlvbnMgPSBfLmluZGV4Qnkoc2VjdGlvbnMsICdzdGF0ZScpO1xuXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICAgICAgc2VjdGlvbnM6IHNlY3Rpb25zLFxuICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zOiBpbmRleGVkU2VjdGlvbnMsXG4gICAgICAgICAgICBuYXZpZ2F0ZVRvTmV4dDogbmF2aWdhdGVUb05leHQsXG4gICAgICAgICAgICB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zOiB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVJlcXVpcmVkU2VjdGlvbnMoaG91c2Vob2xkKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudENoaWxkO1xuICAgICAgICAgICAgdmFyIGFzc2lzdGFuY2VQcm9ncmFtSG91c2Vob2xkID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgc3BlY2lhbFN0YXR1c0NvdW50ID0gMDtcbiAgICAgICAgICAgIHZhciBza2lwTWVhbnNUZXN0ID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgaG91c2Vob2xkLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudENoaWxkID0gaG91c2Vob2xkLmNoaWxkcmVuW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRDaGlsZC5hc3Npc3RhbmNlUHJvZ3JhbSAmJiBjdXJyZW50Q2hpbGQuYXNzaXN0YW5jZVByb2dyYW0ucGFydGljaXBhbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzaXN0YW5jZVByb2dyYW1Ib3VzZWhvbGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudENoaWxkLnNwZWNpYWxTdGF0dXMgJiYgY3VycmVudENoaWxkLnNwZWNpYWxTdGF0dXMuZm9zdGVyQ2hpbGQgfHxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENoaWxkLnNwZWNpYWxTdGF0dXMuaG9tZWxlc3NNaWdyYW50UnVuYXdheSB8fFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5oZWFkU3RhcnRQYXJ0aWNpcGFudFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBzcGVjaWFsU3RhdHVzQ291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNraXBNZWFuc1Rlc3QgPSBhc3Npc3RhbmNlUHJvZ3JhbUhvdXNlaG9sZCB8fFxuICAgICAgICAgICAgICAgIChob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICBob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoID09PSBzcGVjaWFsU3RhdHVzQ291bnQpO1xuXG4gICAgICAgICAgICBpZiAoc2tpcE1lYW5zVGVzdCkge1xuICAgICAgICAgICAgICAgIGluZGV4ZWRTZWN0aW9uc1snY2hpbGRJbmNvbWUnXS5yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGluZGV4ZWRTZWN0aW9uc1snaG91c2Vob2xkJ10ucmVxdWlyZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZmluZE5leHQoY3VycmVudFN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gXy5maW5kSW5kZXgoc2VjdGlvbnMsIGZ1bmN0aW9uKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VjdGlvbi5zdGF0ZSA9PT0gY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIExvb2sgZm9yIHRoZSBuZXh0IHJlcXVpcmVkIHNlY3Rpb25cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBjdXJyZW50SW5kZXggKyAxOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VjdGlvbnNbaV0ucmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25zW2ldLnN0YXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgcmVxdWlyZWQgc2VjdGlvbnMsIHdlJ3JlIGRvbmUuXG4gICAgICAgICAgICByZXR1cm4gJ2NvbmZpcm1hdGlvbic7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBuYXZpZ2F0ZVRvTmV4dChjdXJyZW50U3RhdGUpIHtcbiAgICAgICAgICAgIHZhciBuZXh0U2VjdGlvbiAgPSBmaW5kTmV4dChjdXJyZW50U3RhdGUpO1xuICAgICAgICAgICAgJHN0YXRlLmdvKG5leHRTZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGV2LCB0bywgdG9QYXJhbXMsIGZyb20sIGZyb21QYXJhbXMpIHtcbiAgICAgICAgICAgIHByZXZpb3VzU3RhdGUgPSBmcm9tLm5hbWU7XG4gICAgICAgICAgICBjdXJyZW50U3RhdGUgPSB0by5uYW1lO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1ByZXZpb3VzIHN0YXRlOicgKyBwcmV2aW91c1N0YXRlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDdXJyZW50IHN0YXRlOicgKyBjdXJyZW50U3RhdGUpO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
