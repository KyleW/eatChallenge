(function() {

    angular
    .module('eatChallengeApp',['ngMaterial','ui.router'])
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
            $scope.household.completed = true;
            navigateToNextSection();
        }

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImRpcmVjdGl2ZXMvaW5jb21lLmpzIiwiZGlyZWN0aXZlcy95ZXNuby5qcyIsImNvbnRyb2xsZXJzL2V4cG9ydC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luLmpzIiwiY29udHJvbGxlcnMvbWFpbi5qcyIsImNvbnRyb2xsZXJzL3NpZGVuYXYuanMiLCJzZXJ2aWNlcy9ob3VzZWhvbGQuanMiLCJzZXJ2aWNlcy9zZWN0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcblxuICAgIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnLFsnbmdNYXRlcmlhbCcsJ3VpLnJvdXRlciddKVxuICAgIC5jb25maWcocm91dGVyQ29uZmlnKVxuICAgIC5jb25maWcobWF0ZXJpYWxEZXNpZ25UaGVtZXIpO1xuXG4gICAgbWF0ZXJpYWxEZXNpZ25UaGVtZXIuJGluamVjdCA9IFsnJG1kVGhlbWluZ1Byb3ZpZGVyJ107XG4gICAgZnVuY3Rpb24gbWF0ZXJpYWxEZXNpZ25UaGVtZXIoJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XG4gICAgICAgIC8vICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbGlnaHQtYmx1ZScpO1xuICAgICAgICAvLyAucHJpbWFyeVBhbGV0dGUoJ3BpbmsnLCB7XG4gICAgICAgIC8vICAgJ2RlZmF1bHQnOiAnNDAwJywgLy8gYnkgZGVmYXVsdCB1c2Ugc2hhZGUgNDAwIGZyb20gdGhlIHBpbmsgcGFsZXR0ZSBmb3IgcHJpbWFyeSBpbnRlbnRpb25zXG4gICAgICAgIC8vICAgJ2h1ZS0xJzogJzEwMCcsIC8vIHVzZSBzaGFkZSAxMDAgZm9yIHRoZSA8Y29kZT5tZC1odWUtMTwvY29kZT4gY2xhc3NcbiAgICAgICAgLy8gICAnaHVlLTInOiAnNjAwJywgLy8gdXNlIHNoYWRlIDYwMCBmb3IgdGhlIDxjb2RlPm1kLWh1ZS0yPC9jb2RlPiBjbGFzc1xuICAgICAgICAvLyAgICdodWUtMyc6ICdBMTAwJyAvLyB1c2Ugc2hhZGUgQTEwMCBmb3IgdGhlIDxjb2RlPm1kLWh1ZS0zPC9jb2RlPiBjbGFzc1xuICAgICAgICAvLyB9KVxuICAgICAgICAvLyAvLyBJZiB5b3Ugc3BlY2lmeSBsZXNzIHRoYW4gYWxsIG9mIHRoZSBrZXlzLCBpdCB3aWxsIGluaGVyaXQgZnJvbSB0aGVcbiAgICAgICAgLy8gLy8gZGVmYXVsdCBzaGFkZXNcbiAgICAgICAgLy8gLmFjY2VudFBhbGV0dGUoJ3B1cnBsZScsIHtcbiAgICAgICAgLy8gICAnZGVmYXVsdCc6ICcyMDAnIC8vIHVzZSBzaGFkZSAyMDAgZm9yIGRlZmF1bHQsIGFuZCBrZWVwIGFsbCBvdGhlciBzaGFkZXMgdGhlIHNhbWVcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgcm91dGVyQ29uZmlnLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlciddO1xuXG4gICAgZnVuY3Rpb24gcm91dGVyQ29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgcm91dGVyKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpO1xuXG4gICAgICAgIC8vLy8vLy8vLy9cbiAgICAgICAgZnVuY3Rpb24gcm91dGVyKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAgICAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zdGFydC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2NoaWxkcmVuJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jaGlsZHJlbicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9jaGlsZHJlbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2NoaWxkSW5jb21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jaGlsZEluY29tZScsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2NoaWxkSW5jb21lLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2hvdXNlaG9sZCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvaG91c2Vob2xkLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3NpZ25hdHVyZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbmF0dXJlJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lnbmF0dXJlLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbmZpcm1hdGlvbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29uZmlybWF0aW9uJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvY29uZmlybWF0aW9uLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2V4cG9ydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwb3J0JyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9leHBvcnQuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZXhwb3J0Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3N0eWxlZ3VpZGUnLCB7XG4gICAgICAgICAgICAgIHVybDogJy9zdHlsZWd1aWRlJyxcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zdHlsZWd1aWRlLmh0bWwnLFxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdzaWdudXAnLCB7XG4gICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZ251cC5odG1sJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9sb2dpbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdzb0ZhcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvc28tZmFyJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc29GYXIuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ2luY29tZVF1ZXN0aW9ucycsIGluY29tZURpcmVjdGl2ZSk7XG5cbiAgICBmdW5jdGlvbiBpbmNvbWVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIG1lbWJlcjogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2luY29tZS5odG1sJyxcbiAgICAgICAgICAgIGxpbms6IGxpbmtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH1cblxuICAgIC8vIGxpbmsuJGluamVjdCA9IFsnc2NvcGUnXTtcblxuICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUpIHtcbiAgICAgICAgc2NvcGUuaW5jb21lU291cmNlcyA9IHtcbiAgICAgICAgICAgIHdvcms6IHtcbiAgICAgICAgICAgICAgICB2YXVsZTond29yaycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdFYXJuaW5ncyBmcm9tIHdvcmsnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6ICdBIGNoaWxkIGhhcyBhIGpvYiB3aGVyZSB0aGV5IGVhcm4gc2FsYXJ5IG9yIHdhZ2VzICcsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyTWVtYmVyOiAnJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc29jaWFsU2VjdXJpdHk6IHtcbiAgICAgICAgICAgICAgICB2YXVsZTonc29jaWFsU2VjdXJpdHknLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU29jaWFsIFNlY3VyaXR5IERpc2FiaWxpdHkgUGF5bWVudHMgb3IgU3Vydml2b3LigJlzIEJlbmVmaXRzICcsXG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiAnQSBjaGlsZCBpcyBibGluZCBvciBkaXNhYmxlZCBhbmQgcmVjZWl2ZXMgU29jaWFsIFNlY3VyaXR5IGJlbmVmaXRzLicsXG4gICAgICAgICAgICAgICAgICAgIC8vICcgQSBwYXJlbnQgaXMgZGlzYWJsZWQsIHJldGlyZWQsIG9yIGRlY2Vhc2VkLCBhbmQgdGhlaXIgY2hpbGQgcmVjZWl2ZXMgc29jaWFsIHNlY3VyaXR5IGJlbmVmaXRzJyxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJNZW1iZXI6ICcnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdGhlclBlcnNvbjoge1xuICAgICAgICAgICAgICAgIHZhdWxlOidvdGhlclBlcnNvbicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdJbmNvbWUgZnJvbSBwZXJzb25zIG91dHNpZGUgdGhlIGhvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZDogJ0EgZnJpZW5kIG9yIGV4dGVuZGVkIGZhbWlseSBtZW1iZXIgcmVndWxhcmx5IGdpdmVzIGEgY2hpbGQgc3BlbmRpbmcgbW9uZXknLFxuICAgICAgICAgICAgICAgICAgICBvdGhlck1lbWJlcjogJycsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG90aGVyU291cmNlOiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J290aGVyU291cmNlJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0luY29tZSBmcm9tIGFueSBvdGhlciBzb3VyY2UnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6ICdBIGNoaWxkIHJlY2VpdmVzIGluY29tZSBmcm9tIGEgcHJpdmF0ZSBwZW5zaW9uIGZ1bmQsIGFubnVpdHksIG9yIHRydXN0JyxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJNZW1iZXI6ICcnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc2NvcGUubWVtYmVyLmluY29tZVNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzY29wZS5tZW1iZXIuaW5jb21lU291cmNlcyA9IFtdO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoc2NvcGUuaW5jb21lU291cmNlcykuZm9yRWFjaChmdW5jdGlvbihpbmNvbWVTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5tZW1iZXIuaW5jb21lU291cmNlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogaW5jb21lU291cmNlLFxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ3llc05vSW5wdXQnLCB5ZXNOb0lucHV0KTtcblxuICAgIGZ1bmN0aW9uIHllc05vSW5wdXQgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtb2RlbDogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3llc25vLmh0bWwnLFxuICAgICAgICB9O1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCdcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2V4cG9ydENvbnRyb2xsZXInLCBleHBvcnRDb250cm9sbGVyKTtcblxuICAgIGV4cG9ydENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGh0dHAnLCAnJHNjb3BlJ107XG5cbiAgICBmdW5jdGlvbiBleHBvcnRDb250cm9sbGVyKCRodHRwLCAkc2NvcGUpIHtcbiAgICAgICAgJGh0dHAuZ2V0KCcvaG91c2Vob2xkL2NvbXBsZXRlZCcpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICRzY29wZS5jb21wbGV0ZWRBcHBsaWNhdGlvbnMgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBhbmd1bGFyXG4gICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgLmNvbnRyb2xsZXIoJ2xvZ2luQ29udHJvbGxlcicsIFtsb2dpbkNvbnRyb2xsZXJdKTtcblxuICAgIGZ1bmN0aW9uIGxvZ2luQ29udHJvbGxlcigpIHtcbiAgICAgICAgdmFyIGxvZ2luVk0gPSB0aGlzO1xuICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBvaycpO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCdcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ21haW5Db250cm9sbGVyJywgbWFpbkNvbnRyb2xsZXIpO1xuXG4gICAgbWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGh0dHAnLCAnJGludGVydmFsJywgJyRtZERpYWxvZycsICckbWRNZWRpYScsICckc2NvcGUnLCAnJHN0YXRlJywgJ0hvdXNlaG9sZCcsICdTZWN0aW9ucyddO1xuXG4gICAgZnVuY3Rpb24gbWFpbkNvbnRyb2xsZXIgKCRodHRwLCAkaW50ZXJ2YWwsICRtZERpYWxvZywgJG1kTWVkaWEsICRzY29wZSwgJHN0YXRlLCBIb3VzZWhvbGQsIFNlY3Rpb25zKSB7XG4gICAgICAgIC8vIFRPRE86IHJlcGxhY2Ugc2NvcGUgd2l0aCB2bVxuICAgICAgICAkc2NvcGUuaG91c2Vob2xkID0gSG91c2Vob2xkLmdldCgpO1xuICAgICAgICAkc2NvcGUuc2Nob29sRGlzdHJpY3QgPSAnT2FrbGFuZCBVbmlmaWVkIFNjaG9vbCBEaXN0cmljdCc7XG5cbiAgICAgICAgJHNjb3BlLm5hdmlnYXRlVG9OZXh0U2VjdGlvbiA9IG5hdmlnYXRlVG9OZXh0U2VjdGlvbjtcbiAgICAgICAgJHNjb3BlLnN1Ym1pdEFwcGxpY2F0aW9uID0gc3VibWl0QXBwbGljYXRpb247XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZENoaWxkKG5ld1ZhbCkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbCA+ICRzY29wZS5ob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvY2hpbGQnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdDaGlsZCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5ob3VzZWhvbGQuY2hpbGRyZW4ucHVzaChuZXdDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZENoaWxkKG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdob3VzZWhvbGQuY2hpbGRDb3VudCcsIGFkZENoaWxkKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaG91c2Vob2xkLm90aGVyTWVtYmVyc0NvdW50JywgZnVuY3Rpb24obmV3VmFsKSB7XG4gICAgICAgICAgICB3aGlsZSAobmV3VmFsID4gJHNjb3BlLmhvdXNlaG9sZC5vdGhlck1lbWJlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmhvdXNlaG9sZC5pbmNyZW1lbnRPdGhlck1lbWJlcnNDb3VudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb24oKSB7XG4gICAgICAgICAgICBIb3VzZWhvbGQuc2F2ZSgpO1xuICAgICAgICAgICAgdmFyIHVwZGF0ZWQgPSBTZWN0aW9ucy51cGRhdGVSZXF1aXJlZFNlY3Rpb25zKCRzY29wZS5ob3VzZWhvbGQpO1xuICAgICAgICAgICAgU2VjdGlvbnMubmF2aWdhdGVUb05leHQoJHN0YXRlLiRjdXJyZW50LnNlbGYubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdWJtaXRBcHBsaWNhdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5ob3VzZWhvbGQuY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG5hdmlnYXRlVG9OZXh0U2VjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdzaWRlTmF2Q29udHJvbGxlcicsIHNpZGVOYXZDb250cm9sbGVyKTtcblxuICAgIHNpZGVOYXZDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckc3RhdGUnLCAnU2VjdGlvbnMnXTtcblxuICAgIGZ1bmN0aW9uIHNpZGVOYXZDb250cm9sbGVyICgkc2NvcGUsICRzdGF0ZSwgU2VjdGlvbnMpIHtcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG5cbiAgICAgICAgdm0uY3VycmVudFN0YXRlID0gJHN0YXRlLiRjdXJyZW50LnNlbGYubmFtZTtcbiAgICAgICAgdm0uc2VjdGlvbnMgPSBTZWN0aW9ucy5zZWN0aW9ucztcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuc2VydmljZSgnSG91c2Vob2xkJywgaG91c2Vob2xkU2VydmljZSk7XG5cbiAgICBob3VzZWhvbGRTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XG5cbiAgICBmdW5jdGlvbiBob3VzZWhvbGRTZXJ2aWNlKCRodHRwKSB7XG4gICAgICAgIHRoaXMuZ2V0ID0gZ2V0O1xuICAgICAgICB0aGlzLnNhdmUgPSBzYXZlO1xuICAgICAgICB0aGlzLmNsZWFyID0gY2xlYXI7XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICB2YXIgaG91c2Vob2xkO1xuXG4gICAgICAgIHZhciBQZXJzb24gPSB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluY29tZVNvdXJjZUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmluY29tZVNvdXJjZXMgPSBbXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gTW9kZWxcbiAgICAgICAgLy8gVG9kbzogY29uc2lkZXIgbW92aW5nIHRvIHNlcnZlcj8/XG4gICAgICAgIHZhciBIb3VzZWhvbGQgPSB7XG4gICAgICAgICAgICBjaGlsZENvdW50OiAwLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgICAgb3RoZXJNZW1iZXJzQ291bnQ6IDAsXG4gICAgICAgICAgICBvdGhlck1lbWJlcnM6IFtdLFxuICAgICAgICAgICAgY29tcGxldGVkQXBwbGljYXRpb246IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgaWYgKGhvdXNlaG9sZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3VzZWhvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBob3VzZWhvbGQgPSBPYmplY3QuY3JlYXRlKEhvdXNlaG9sZCk7XG4gICAgICAgICAgICByZXR1cm4gaG91c2Vob2xkO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2F2ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvaG91c2Vob2xkJywgaG91c2Vob2xkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaG91c2Vob2xkID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgICAgICAgICAgdmFyIGhvdXNlaG9sZCA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIGhvdXNlaG9sZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCdcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLnNlcnZpY2UoJ1NlY3Rpb25zJywgc2VjdGlvbnNTZXJ2aWNlKTtcblxuICAgIHNlY3Rpb25zU2VydmljZS4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJyAsJyRzdGF0ZSddO1xuXG4gICAgZnVuY3Rpb24gc2VjdGlvbnNTZXJ2aWNlKCRyb290U2NvcGUsICRzdGF0ZSkge1xuICAgICAgICB2YXIgcHJldmlvdXNTdGF0ZSxcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZTtcbiAgICAgICAgXG4gICAgICAgIHZhciBzZWN0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2hpbGQgSW5jb21lJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2NoaWxkSW5jb21lJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnSG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2hvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1NpZ24gYW5kIENvbmZpcm0nLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnc2lnbmF0dXJlJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHZhciBpbmRleGVkU2VjdGlvbnMgPSBfLmluZGV4Qnkoc2VjdGlvbnMsICdzdGF0ZScpO1xuXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICAgICAgc2VjdGlvbnM6IHNlY3Rpb25zLFxuICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zOiBpbmRleGVkU2VjdGlvbnMsXG4gICAgICAgICAgICBuYXZpZ2F0ZVRvTmV4dDogbmF2aWdhdGVUb05leHQsXG4gICAgICAgICAgICB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zOiB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVJlcXVpcmVkU2VjdGlvbnMoaG91c2Vob2xkKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudENoaWxkO1xuICAgICAgICAgICAgdmFyIGFzc2lzdGFuY2VQcm9ncmFtSG91c2Vob2xkID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgc3BlY2lhbFN0YXR1c0NvdW50ID0gMDtcbiAgICAgICAgICAgIHZhciBza2lwTWVhbnNUZXN0ID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgaG91c2Vob2xkLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudENoaWxkID0gaG91c2Vob2xkLmNoaWxkcmVuW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRDaGlsZC5hc3Npc3RhbmNlUHJvZ3JhbSAmJiBjdXJyZW50Q2hpbGQuYXNzaXN0YW5jZVByb2dyYW0ucGFydGljaXBhbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzaXN0YW5jZVByb2dyYW1Ib3VzZWhvbGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudENoaWxkLnNwZWNpYWxTdGF0dXMgJiYgY3VycmVudENoaWxkLnNwZWNpYWxTdGF0dXMuZm9zdGVyQ2hpbGQgfHxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENoaWxkLnNwZWNpYWxTdGF0dXMuaG9tZWxlc3NNaWdyYW50UnVuYXdheSB8fFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5oZWFkU3RhcnRQYXJ0aWNpcGFudFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBzcGVjaWFsU3RhdHVzQ291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNraXBNZWFuc1Rlc3QgPSBhc3Npc3RhbmNlUHJvZ3JhbUhvdXNlaG9sZCB8fFxuICAgICAgICAgICAgICAgIChob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICBob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoID09PSBzcGVjaWFsU3RhdHVzQ291bnQpO1xuXG4gICAgICAgICAgICBpZiAoc2tpcE1lYW5zVGVzdCkge1xuICAgICAgICAgICAgICAgIGluZGV4ZWRTZWN0aW9uc1snY2hpbGRJbmNvbWUnXS5yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGluZGV4ZWRTZWN0aW9uc1snaG91c2Vob2xkJ10ucmVxdWlyZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZmluZE5leHQoY3VycmVudFN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gXy5maW5kSW5kZXgoc2VjdGlvbnMsIGZ1bmN0aW9uKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VjdGlvbi5zdGF0ZSA9PT0gY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIExvb2sgZm9yIHRoZSBuZXh0IHJlcXVpcmVkIHNlY3Rpb25cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBjdXJyZW50SW5kZXggKyAxOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VjdGlvbnNbaV0ucmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25zW2ldLnN0YXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgcmVxdWlyZWQgc2VjdGlvbnMsIHdlJ3JlIGRvbmUuXG4gICAgICAgICAgICByZXR1cm4gJ2NvbmZpcm1hdGlvbic7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBuYXZpZ2F0ZVRvTmV4dChjdXJyZW50U3RhdGUpIHtcbiAgICAgICAgICAgIHZhciBuZXh0U2VjdGlvbiAgPSBmaW5kTmV4dChjdXJyZW50U3RhdGUpO1xuICAgICAgICAgICAgJHN0YXRlLmdvKG5leHRTZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGV2LCB0bywgdG9QYXJhbXMsIGZyb20sIGZyb21QYXJhbXMpIHtcbiAgICAgICAgICAgIHByZXZpb3VzU3RhdGUgPSBmcm9tLm5hbWU7XG4gICAgICAgICAgICBjdXJyZW50U3RhdGUgPSB0by5uYW1lO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1ByZXZpb3VzIHN0YXRlOicgKyBwcmV2aW91c1N0YXRlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDdXJyZW50IHN0YXRlOicgKyBjdXJyZW50U3RhdGUpO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
