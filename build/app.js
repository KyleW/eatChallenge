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
              templateUrl: '../views/signup.html',
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

    function loginController() {
        var loginVM = this;
        console.log('running ok');
    }

})();

(function() {
    'use strict'

    angular
        .module('eatChallengeApp')
        .controller('mainController', mainController);

    mainController.$inject = ['$http', '$interval', '$mdDialog', '$mdMedia', '$scope', '$state', 'Household', 'Sections'];

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2V4cG9ydC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luLmpzIiwiY29udHJvbGxlcnMvbWFpbi5qcyIsImNvbnRyb2xsZXJzL3NpZGVuYXYuanMiLCJkaXJlY3RpdmVzL2luY29tZS5qcyIsImRpcmVjdGl2ZXMveWVzbm8uanMiLCJzZXJ2aWNlcy9ob3VzZWhvbGQuanMiLCJzZXJ2aWNlcy9zZWN0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuXG4gICAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcsWyduZ0NzdicsJ25nTWF0ZXJpYWwnLCAnbmdTYW5pdGl6ZScsICd1aS5yb3V0ZXInXSlcbiAgICAuY29uZmlnKHJvdXRlckNvbmZpZylcbiAgICAuY29uZmlnKG1hdGVyaWFsRGVzaWduVGhlbWVyKTtcblxuICAgIG1hdGVyaWFsRGVzaWduVGhlbWVyLiRpbmplY3QgPSBbJyRtZFRoZW1pbmdQcm92aWRlciddO1xuICAgIGZ1bmN0aW9uIG1hdGVyaWFsRGVzaWduVGhlbWVyKCRtZFRoZW1pbmdQcm92aWRlcikge1xuICAgICAgICAvLyAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2xpZ2h0LWJsdWUnKTtcbiAgICAgICAgLy8gLnByaW1hcnlQYWxldHRlKCdwaW5rJywge1xuICAgICAgICAvLyAgICdkZWZhdWx0JzogJzQwMCcsIC8vIGJ5IGRlZmF1bHQgdXNlIHNoYWRlIDQwMCBmcm9tIHRoZSBwaW5rIHBhbGV0dGUgZm9yIHByaW1hcnkgaW50ZW50aW9uc1xuICAgICAgICAvLyAgICdodWUtMSc6ICcxMDAnLCAvLyB1c2Ugc2hhZGUgMTAwIGZvciB0aGUgPGNvZGU+bWQtaHVlLTE8L2NvZGU+IGNsYXNzXG4gICAgICAgIC8vICAgJ2h1ZS0yJzogJzYwMCcsIC8vIHVzZSBzaGFkZSA2MDAgZm9yIHRoZSA8Y29kZT5tZC1odWUtMjwvY29kZT4gY2xhc3NcbiAgICAgICAgLy8gICAnaHVlLTMnOiAnQTEwMCcgLy8gdXNlIHNoYWRlIEExMDAgZm9yIHRoZSA8Y29kZT5tZC1odWUtMzwvY29kZT4gY2xhc3NcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gLy8gSWYgeW91IHNwZWNpZnkgbGVzcyB0aGFuIGFsbCBvZiB0aGUga2V5cywgaXQgd2lsbCBpbmhlcml0IGZyb20gdGhlXG4gICAgICAgIC8vIC8vIGRlZmF1bHQgc2hhZGVzXG4gICAgICAgIC8vIC5hY2NlbnRQYWxldHRlKCdwdXJwbGUnLCB7XG4gICAgICAgIC8vICAgJ2RlZmF1bHQnOiAnMjAwJyAvLyB1c2Ugc2hhZGUgMjAwIGZvciBkZWZhdWx0LCBhbmQga2VlcCBhbGwgb3RoZXIgc2hhZGVzIHRoZSBzYW1lXG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIHJvdXRlckNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInXTtcblxuICAgIGZ1bmN0aW9uIHJvdXRlckNvbmZpZyAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAgIHJvdXRlcigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKTtcblxuICAgICAgICAvLy8vLy8vLy8vXG4gICAgICAgIGZ1bmN0aW9uIHJvdXRlcigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgICAgICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ3N0YXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc3RhcnQuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdjaGlsZHJlbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY2hpbGRyZW4nLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvY2hpbGRyZW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdjaGlsZEluY29tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY2hpbGRJbmNvbWUnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9jaGlsZEluY29tZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdob3VzZWhvbGQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2hvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2hvdXNlaG9sZC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdzaWduYXR1cmUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3NpZ25hdHVyZScsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZ25hdHVyZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdjb25maXJtYXRpb24nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbmZpcm1hdGlvbicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2NvbmZpcm1hdGlvbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdleHBvcnQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2V4cG9ydCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvZXhwb3J0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V4cG9ydENvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdzdHlsZWd1aWRlJywge1xuICAgICAgICAgICAgICB1cmw6ICcvc3R5bGVndWlkZScsXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc3R5bGVndWlkZS5odG1sJyxcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnc2lnbnVwJywge1xuICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWdudXAuaHRtbCcsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9naW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnc29GYXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3NvLWZhcicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NvRmFyLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignZXhwb3J0Q29udHJvbGxlcicsIGV4cG9ydENvbnRyb2xsZXIpO1xuXG4gICAgZXhwb3J0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckaHR0cCcsICckc2NvcGUnXTtcblxuICAgIGZ1bmN0aW9uIGV4cG9ydENvbnRyb2xsZXIoJGh0dHAsICRzY29wZSkge1xuICAgICAgICAkaHR0cC5nZXQoJy9ob3VzZWhvbGQvY29tcGxldGVkJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbXBsZXRlZEFwcGxpY2F0aW9ucyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcblxuICAgIGFuZ3VsYXJcbiAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAuY29udHJvbGxlcignbG9naW5Db250cm9sbGVyJywgW2xvZ2luQ29udHJvbGxlcl0pO1xuXG4gICAgZnVuY3Rpb24gbG9naW5Db250cm9sbGVyKCkge1xuICAgICAgICB2YXIgbG9naW5WTSA9IHRoaXM7XG4gICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIG9rJyk7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignbWFpbkNvbnRyb2xsZXInLCBtYWluQ29udHJvbGxlcik7XG5cbiAgICBtYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWyckaHR0cCcsICckaW50ZXJ2YWwnLCAnJG1kRGlhbG9nJywgJyRtZE1lZGlhJywgJyRzY29wZScsICckc3RhdGUnLCAnSG91c2Vob2xkJywgJ1NlY3Rpb25zJ107XG5cbiAgICBmdW5jdGlvbiBtYWluQ29udHJvbGxlciAoJGh0dHAsICRpbnRlcnZhbCwgJG1kRGlhbG9nLCAkbWRNZWRpYSwgJHNjb3BlLCAkc3RhdGUsIEhvdXNlaG9sZCwgU2VjdGlvbnMpIHtcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG5cbiAgICAgICAgdm0uaG91c2Vob2xkID0gSG91c2Vob2xkLmdldCgpO1xuICAgICAgICB2bS5zY2hvb2xEaXN0cmljdCA9ICdPYWtsYW5kIFVuaWZpZWQgU2Nob29sIERpc3RyaWN0JztcblxuICAgICAgICB2bS5uYXZpZ2F0ZVRvTmV4dFNlY3Rpb24gPSBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb247XG4gICAgICAgIHZtLnN1Ym1pdEFwcGxpY2F0aW9uID0gc3VibWl0QXBwbGljYXRpb247XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZENoaWxkKG5ld1ZhbCkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbCA+ICRzY29wZS5ob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvY2hpbGQnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdDaGlsZCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5ob3VzZWhvbGQuY2hpbGRyZW4ucHVzaChuZXdDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZENoaWxkKG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRPdGhlck1lbWJlcihuZXdWYWwpIHtcbiAgICAgICAgICAgIHdoaWxlIChuZXdWYWwgPiAkc2NvcGUuaG91c2Vob2xkLm90aGVyTWVtYmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaG91c2Vob2xkLmluY3JlbWVudE90aGVyTWVtYmVyc0NvdW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb24oKSB7XG4gICAgICAgICAgICBIb3VzZWhvbGQuc2F2ZSgpO1xuICAgICAgICAgICAgdmFyIHVwZGF0ZWQgPSBTZWN0aW9ucy51cGRhdGVSZXF1aXJlZFNlY3Rpb25zKCRzY29wZS5ob3VzZWhvbGQpO1xuICAgICAgICAgICAgU2VjdGlvbnMubmF2aWdhdGVUb05leHQoJHN0YXRlLiRjdXJyZW50LnNlbGYubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdWJtaXRBcHBsaWNhdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5ob3VzZWhvbGQuY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG5hdmlnYXRlVG9OZXh0U2VjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2F0Y2hlcnNcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaG91c2Vob2xkLmNoaWxkQ291bnQnLCBhZGRDaGlsZCk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2hvdXNlaG9sZC5vdGhlck1lbWJlcnNDb3VudCcsIGFkZE90aGVyTWVtYmVyKTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdzaWRlTmF2Q29udHJvbGxlcicsIHNpZGVOYXZDb250cm9sbGVyKTtcblxuICAgIHNpZGVOYXZDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckc3RhdGUnLCAnU2VjdGlvbnMnXTtcblxuICAgIGZ1bmN0aW9uIHNpZGVOYXZDb250cm9sbGVyICgkc2NvcGUsICRzdGF0ZSwgU2VjdGlvbnMpIHtcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG5cbiAgICAgICAgdm0uY3VycmVudFN0YXRlID0gJHN0YXRlLiRjdXJyZW50LnNlbGYubmFtZTtcbiAgICAgICAgdm0uc2VjdGlvbnMgPSBTZWN0aW9ucy5zZWN0aW9ucztcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ2luY29tZVF1ZXN0aW9ucycsIGluY29tZURpcmVjdGl2ZSk7XG5cbiAgICBmdW5jdGlvbiBpbmNvbWVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIG1lbWJlcjogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2luY29tZS5odG1sJyxcbiAgICAgICAgICAgIGxpbms6IGxpbmtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH1cblxuICAgIC8vIGxpbmsuJGluamVjdCA9IFsnc2NvcGUnXTtcblxuICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUpIHtcbiAgICAgICAgc2NvcGUuaW5jb21lU291cmNlcyA9IHtcbiAgICAgICAgICAgIHdvcms6IHtcbiAgICAgICAgICAgICAgICB2YXVsZTond29yaycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdFYXJuaW5ncyBmcm9tIHdvcmsnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6ICdBIGNoaWxkIGhhcyBhIGpvYiB3aGVyZSB0aGV5IGVhcm4gc2FsYXJ5IG9yIHdhZ2VzICcsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyTWVtYmVyOiAnJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc29jaWFsU2VjdXJpdHk6IHtcbiAgICAgICAgICAgICAgICB2YXVsZTonc29jaWFsU2VjdXJpdHknLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU29jaWFsIFNlY3VyaXR5IERpc2FiaWxpdHkgUGF5bWVudHMgb3IgU3Vydml2b3LigJlzIEJlbmVmaXRzICcsXG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiAnQSBjaGlsZCBpcyBibGluZCBvciBkaXNhYmxlZCBhbmQgcmVjZWl2ZXMgU29jaWFsIFNlY3VyaXR5IGJlbmVmaXRzLicsXG4gICAgICAgICAgICAgICAgICAgIC8vICcgQSBwYXJlbnQgaXMgZGlzYWJsZWQsIHJldGlyZWQsIG9yIGRlY2Vhc2VkLCBhbmQgdGhlaXIgY2hpbGQgcmVjZWl2ZXMgc29jaWFsIHNlY3VyaXR5IGJlbmVmaXRzJyxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJNZW1iZXI6ICcnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdGhlclBlcnNvbjoge1xuICAgICAgICAgICAgICAgIHZhdWxlOidvdGhlclBlcnNvbicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdJbmNvbWUgZnJvbSBwZXJzb25zIG91dHNpZGUgdGhlIGhvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZDogJ0EgZnJpZW5kIG9yIGV4dGVuZGVkIGZhbWlseSBtZW1iZXIgcmVndWxhcmx5IGdpdmVzIGEgY2hpbGQgc3BlbmRpbmcgbW9uZXknLFxuICAgICAgICAgICAgICAgICAgICBvdGhlck1lbWJlcjogJycsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG90aGVyU291cmNlOiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J290aGVyU291cmNlJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0luY29tZSBmcm9tIGFueSBvdGhlciBzb3VyY2UnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6ICdBIGNoaWxkIHJlY2VpdmVzIGluY29tZSBmcm9tIGEgcHJpdmF0ZSBwZW5zaW9uIGZ1bmQsIGFubnVpdHksIG9yIHRydXN0JyxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJNZW1iZXI6ICcnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc2NvcGUubWVtYmVyLmluY29tZVNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzY29wZS5tZW1iZXIuaW5jb21lU291cmNlcyA9IFtdO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoc2NvcGUuaW5jb21lU291cmNlcykuZm9yRWFjaChmdW5jdGlvbihpbmNvbWVTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5tZW1iZXIuaW5jb21lU291cmNlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogaW5jb21lU291cmNlLFxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ3llc05vSW5wdXQnLCB5ZXNOb0lucHV0KTtcblxuICAgIGZ1bmN0aW9uIHllc05vSW5wdXQgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtb2RlbDogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3llc25vLmh0bWwnLFxuICAgICAgICB9O1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5zZXJ2aWNlKCdIb3VzZWhvbGQnLCBob3VzZWhvbGRTZXJ2aWNlKTtcblxuICAgIGhvdXNlaG9sZFNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcblxuICAgIGZ1bmN0aW9uIGhvdXNlaG9sZFNlcnZpY2UoJGh0dHApIHtcbiAgICAgICAgdGhpcy5nZXQgPSBnZXQ7XG4gICAgICAgIHRoaXMuc2F2ZSA9IHNhdmU7XG4gICAgICAgIHRoaXMuY2xlYXIgPSBjbGVhcjtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIHZhciBob3VzZWhvbGQ7XG5cbiAgICAgICAgdmFyIFBlcnNvbiA9IHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jb21lU291cmNlQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jb21lU291cmNlcyA9IFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBNb2RlbFxuICAgICAgICAvLyBUb2RvOiBjb25zaWRlciBtb3ZpbmcgdG8gc2VydmVyPz9cbiAgICAgICAgdmFyIEhvdXNlaG9sZCA9IHtcbiAgICAgICAgICAgIGNoaWxkQ291bnQ6IDAsXG4gICAgICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgICAgICBvdGhlck1lbWJlcnNDb3VudDogMCxcbiAgICAgICAgICAgIG90aGVyTWVtYmVyczogW10sXG4gICAgICAgICAgICBjb21wbGV0ZWRBcHBsaWNhdGlvbjogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICBpZiAoaG91c2Vob2xkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvdXNlaG9sZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhvdXNlaG9sZCA9IE9iamVjdC5jcmVhdGUoSG91c2Vob2xkKTtcbiAgICAgICAgICAgIHJldHVybiBob3VzZWhvbGQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzYXZlKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9ob3VzZWhvbGQnLCBob3VzZWhvbGQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBob3VzZWhvbGQgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgICAgICAgICB2YXIgaG91c2Vob2xkID0ge307XG4gICAgICAgICAgICByZXR1cm4gaG91c2Vob2xkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuc2VydmljZSgnU2VjdGlvbnMnLCBzZWN0aW9uc1NlcnZpY2UpO1xuXG4gICAgc2VjdGlvbnNTZXJ2aWNlLiRpbmplY3QgPSBbJyRyb290U2NvcGUnICwnJHN0YXRlJ107XG5cbiAgICBmdW5jdGlvbiBzZWN0aW9uc1NlcnZpY2UoJHJvb3RTY29wZSwgJHN0YXRlKSB7XG4gICAgICAgIHZhciBwcmV2aW91c1N0YXRlLFxuICAgICAgICAgICAgY3VycmVudFN0YXRlO1xuICAgICAgICBcbiAgICAgICAgdmFyIHNlY3Rpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2hpbGRyZW4nLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnY2hpbGRyZW4nLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDaGlsZCBJbmNvbWUnLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnY2hpbGRJbmNvbWUnLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdIb3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnU2lnbiBhbmQgQ29uZmlybScsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdzaWduYXR1cmUnLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdmFyIGluZGV4ZWRTZWN0aW9ucyA9IF8uaW5kZXhCeShzZWN0aW9ucywgJ3N0YXRlJyk7XG5cbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBzZWN0aW9uczogc2VjdGlvbnMsXG4gICAgICAgICAgICBpbmRleGVkU2VjdGlvbnM6IGluZGV4ZWRTZWN0aW9ucyxcbiAgICAgICAgICAgIG5hdmlnYXRlVG9OZXh0OiBuYXZpZ2F0ZVRvTmV4dCxcbiAgICAgICAgICAgIHVwZGF0ZVJlcXVpcmVkU2VjdGlvbnM6IHVwZGF0ZVJlcXVpcmVkU2VjdGlvbnNcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUmVxdWlyZWRTZWN0aW9ucyhob3VzZWhvbGQpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgYXNzaXN0YW5jZVByb2dyYW1Ib3VzZWhvbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBzcGVjaWFsU3RhdHVzQ291bnQgPSAwO1xuICAgICAgICAgICAgdmFyIHNraXBNZWFuc1Rlc3QgPSBmYWxzZTtcblxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCBob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQgPSBob3VzZWhvbGQuY2hpbGRyZW5baV07XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudENoaWxkLmFzc2lzdGFuY2VQcm9ncmFtICYmIGN1cnJlbnRDaGlsZC5hc3Npc3RhbmNlUHJvZ3JhbS5wYXJ0aWNpcGFudCkge1xuICAgICAgICAgICAgICAgICAgICBhc3Npc3RhbmNlUHJvZ3JhbUhvdXNlaG9sZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cyAmJiBjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5mb3N0ZXJDaGlsZCB8fFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5ob21lbGVzc01pZ3JhbnRSdW5hd2F5IHx8XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZC5zcGVjaWFsU3RhdHVzLmhlYWRTdGFydFBhcnRpY2lwYW50XG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWNpYWxTdGF0dXNDb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2tpcE1lYW5zVGVzdCA9IGFzc2lzdGFuY2VQcm9ncmFtSG91c2Vob2xkIHx8XG4gICAgICAgICAgICAgICAgKGhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgIGhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGggPT09IHNwZWNpYWxTdGF0dXNDb3VudCk7XG5cbiAgICAgICAgICAgIGlmIChza2lwTWVhbnNUZXN0KSB7XG4gICAgICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zWydjaGlsZEluY29tZSddLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zWydob3VzZWhvbGQnXS5yZXF1aXJlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmaW5kTmV4dChjdXJyZW50U3RhdGUpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBfLmZpbmRJbmRleChzZWN0aW9ucywgZnVuY3Rpb24oc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWN0aW9uLnN0YXRlID09PSBjdXJyZW50U3RhdGU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gTG9vayBmb3IgdGhlIG5leHQgcmVxdWlyZWQgc2VjdGlvblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGN1cnJlbnRJbmRleCArIDE7IGkgPCBzZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzZWN0aW9uc1tpXS5yZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VjdGlvbnNbaV0uc3RhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gbW9yZSByZXF1aXJlZCBzZWN0aW9ucywgd2UncmUgZG9uZS5cbiAgICAgICAgICAgIHJldHVybiAnY29uZmlybWF0aW9uJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG5hdmlnYXRlVG9OZXh0KGN1cnJlbnRTdGF0ZSkge1xuICAgICAgICAgICAgdmFyIG5leHRTZWN0aW9uICA9IGZpbmROZXh0KGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgICAgICAkc3RhdGUuZ28obmV4dFNlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXYsIHRvLCB0b1BhcmFtcywgZnJvbSwgZnJvbVBhcmFtcykge1xuICAgICAgICAgICAgcHJldmlvdXNTdGF0ZSA9IGZyb20ubmFtZTtcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IHRvLm5hbWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUHJldmlvdXMgc3RhdGU6JyArIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0N1cnJlbnQgc3RhdGU6JyArIGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
