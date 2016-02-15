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
              templateUrl: '../views/export.html',
              controller: 'mainController'
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
            Household.completed = true;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luLmpzIiwiY29udHJvbGxlcnMvbWFpbi5qcyIsImNvbnRyb2xsZXJzL3NpZGVuYXYuanMiLCJkaXJlY3RpdmVzL2luY29tZS5qcyIsImRpcmVjdGl2ZXMveWVzbm8uanMiLCJzZXJ2aWNlcy9ob3VzZWhvbGQuanMiLCJzZXJ2aWNlcy9zZWN0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcblxuICAgIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnLFsnbmdNYXRlcmlhbCcsJ3VpLnJvdXRlciddKVxuICAgIC5jb25maWcocm91dGVyQ29uZmlnKVxuICAgIC5jb25maWcobWF0ZXJpYWxEZXNpZ25UaGVtZXIpO1xuXG4gICAgbWF0ZXJpYWxEZXNpZ25UaGVtZXIuJGluamVjdCA9IFsnJG1kVGhlbWluZ1Byb3ZpZGVyJ107XG4gICAgZnVuY3Rpb24gbWF0ZXJpYWxEZXNpZ25UaGVtZXIoJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XG4gICAgICAgIC8vICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbGlnaHQtYmx1ZScpO1xuICAgICAgICAvLyAucHJpbWFyeVBhbGV0dGUoJ3BpbmsnLCB7XG4gICAgICAgIC8vICAgJ2RlZmF1bHQnOiAnNDAwJywgLy8gYnkgZGVmYXVsdCB1c2Ugc2hhZGUgNDAwIGZyb20gdGhlIHBpbmsgcGFsZXR0ZSBmb3IgcHJpbWFyeSBpbnRlbnRpb25zXG4gICAgICAgIC8vICAgJ2h1ZS0xJzogJzEwMCcsIC8vIHVzZSBzaGFkZSAxMDAgZm9yIHRoZSA8Y29kZT5tZC1odWUtMTwvY29kZT4gY2xhc3NcbiAgICAgICAgLy8gICAnaHVlLTInOiAnNjAwJywgLy8gdXNlIHNoYWRlIDYwMCBmb3IgdGhlIDxjb2RlPm1kLWh1ZS0yPC9jb2RlPiBjbGFzc1xuICAgICAgICAvLyAgICdodWUtMyc6ICdBMTAwJyAvLyB1c2Ugc2hhZGUgQTEwMCBmb3IgdGhlIDxjb2RlPm1kLWh1ZS0zPC9jb2RlPiBjbGFzc1xuICAgICAgICAvLyB9KVxuICAgICAgICAvLyAvLyBJZiB5b3Ugc3BlY2lmeSBsZXNzIHRoYW4gYWxsIG9mIHRoZSBrZXlzLCBpdCB3aWxsIGluaGVyaXQgZnJvbSB0aGVcbiAgICAgICAgLy8gLy8gZGVmYXVsdCBzaGFkZXNcbiAgICAgICAgLy8gLmFjY2VudFBhbGV0dGUoJ3B1cnBsZScsIHtcbiAgICAgICAgLy8gICAnZGVmYXVsdCc6ICcyMDAnIC8vIHVzZSBzaGFkZSAyMDAgZm9yIGRlZmF1bHQsIGFuZCBrZWVwIGFsbCBvdGhlciBzaGFkZXMgdGhlIHNhbWVcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgcm91dGVyQ29uZmlnLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlciddO1xuXG4gICAgZnVuY3Rpb24gcm91dGVyQ29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgcm91dGVyKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpO1xuXG4gICAgICAgIC8vLy8vLy8vLy9cbiAgICAgICAgZnVuY3Rpb24gcm91dGVyKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAgICAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zdGFydC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2NoaWxkcmVuJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jaGlsZHJlbicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9jaGlsZHJlbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2NoaWxkSW5jb21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jaGlsZEluY29tZScsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2NoaWxkSW5jb21lLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2hvdXNlaG9sZCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvaG91c2Vob2xkLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3NpZ25hdHVyZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbmF0dXJlJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lnbmF0dXJlLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbmZpcm1hdGlvbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29uZmlybWF0aW9uJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvY29uZmlybWF0aW9uLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2V4cG9ydCcsIHtcbiAgICAgICAgICAgICAgdXJsOiAnL2V4cG9ydCcsXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvZXhwb3J0Lmh0bWwnLFxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnc3R5bGVndWlkZScsIHtcbiAgICAgICAgICAgICAgdXJsOiAnL3N0eWxlZ3VpZGUnLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3N0eWxlZ3VpZGUuaHRtbCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdzaWdudXAnLCB7XG4gICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZ251cC5odG1sJyxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9sb2dpbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnc29GYXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3NvLWZhcicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NvRmFyLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgYW5ndWxhclxuICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgIC5jb250cm9sbGVyKCdsb2dpbkNvbnRyb2xsZXInLCBbbG9naW5Db250cm9sbGVyXSk7XG5cbiAgICBmdW5jdGlvbiBsb2dpbkNvbnRyb2xsZXIoKSB7XG4gICAgICAgIHZhciBsb2dpblZNID0gdGhpcztcbiAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgb2snKTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnXG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdtYWluQ29udHJvbGxlcicsIG1haW5Db250cm9sbGVyKTtcblxuICAgIG1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRodHRwJywgJyRpbnRlcnZhbCcsICckbWREaWFsb2cnLCAnJG1kTWVkaWEnLCAnJHNjb3BlJywgJyRzdGF0ZScsICdIb3VzZWhvbGQnLCAnU2VjdGlvbnMnXTtcblxuICAgIGZ1bmN0aW9uIG1haW5Db250cm9sbGVyICgkaHR0cCwgJGludGVydmFsLCAkbWREaWFsb2csICRtZE1lZGlhLCAkc2NvcGUsICRzdGF0ZSwgSG91c2Vob2xkLCBTZWN0aW9ucykge1xuICAgICAgICAvLyBUT0RPOiByZXBsYWNlIHNjb3BlIHdpdGggdm1cbiAgICAgICAgJHNjb3BlLmhvdXNlaG9sZCA9IEhvdXNlaG9sZC5nZXQoKTtcbiAgICAgICAgJHNjb3BlLnNjaG9vbERpc3RyaWN0ID0gJ09ha2xhbmQgVW5pZmllZCBTY2hvb2wgRGlzdHJpY3QnO1xuXG4gICAgICAgICRzY29wZS5uYXZpZ2F0ZVRvTmV4dFNlY3Rpb24gPSBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb247XG4gICAgICAgICRzY29wZS5zdWJtaXRBcHBsaWNhdGlvbiA9IHN1Ym1pdEFwcGxpY2F0aW9uO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICBmdW5jdGlvbiBhZGRDaGlsZChuZXdWYWwpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPiAkc2NvcGUuaG91c2Vob2xkLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRodHRwLmdldCgnL2NoaWxkJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Q2hpbGQgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaG91c2Vob2xkLmNoaWxkcmVuLnB1c2gobmV3Q2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBhZGRDaGlsZChuZXdWYWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaG91c2Vob2xkLmNoaWxkQ291bnQnLCBhZGRDaGlsZCk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2hvdXNlaG9sZC5vdGhlck1lbWJlcnNDb3VudCcsIGZ1bmN0aW9uKG5ld1ZhbCkge1xuICAgICAgICAgICAgd2hpbGUgKG5ld1ZhbCA+ICRzY29wZS5ob3VzZWhvbGQub3RoZXJNZW1iZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5ob3VzZWhvbGQuaW5jcmVtZW50T3RoZXJNZW1iZXJzQ291bnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gbmF2aWdhdGVUb05leHRTZWN0aW9uKCkge1xuICAgICAgICAgICAgSG91c2Vob2xkLnNhdmUoKTtcbiAgICAgICAgICAgIHZhciB1cGRhdGVkID0gU2VjdGlvbnMudXBkYXRlUmVxdWlyZWRTZWN0aW9ucygkc2NvcGUuaG91c2Vob2xkKTtcbiAgICAgICAgICAgIFNlY3Rpb25zLm5hdmlnYXRlVG9OZXh0KCRzdGF0ZS4kY3VycmVudC5zZWxmLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc3VibWl0QXBwbGljYXRpb24oKSB7XG4gICAgICAgICAgICBIb3VzZWhvbGQuY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG5hdmlnYXRlVG9OZXh0U2VjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdzaWRlTmF2Q29udHJvbGxlcicsIHNpZGVOYXZDb250cm9sbGVyKTtcblxuICAgIHNpZGVOYXZDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckc3RhdGUnLCAnU2VjdGlvbnMnXTtcblxuICAgIGZ1bmN0aW9uIHNpZGVOYXZDb250cm9sbGVyICgkc2NvcGUsICRzdGF0ZSwgU2VjdGlvbnMpIHtcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG5cbiAgICAgICAgdm0uY3VycmVudFN0YXRlID0gJHN0YXRlLiRjdXJyZW50LnNlbGYubmFtZTtcbiAgICAgICAgdm0uc2VjdGlvbnMgPSBTZWN0aW9ucy5zZWN0aW9ucztcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ2luY29tZVF1ZXN0aW9ucycsIGluY29tZURpcmVjdGl2ZSk7XG5cbiAgICBmdW5jdGlvbiBpbmNvbWVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIG1lbWJlcjogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2luY29tZS5odG1sJyxcbiAgICAgICAgICAgIGxpbms6IGxpbmtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH1cblxuICAgIC8vIGxpbmsuJGluamVjdCA9IFsnc2NvcGUnXTtcblxuICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUpIHtcbiAgICAgICAgc2NvcGUuaW5jb21lU291cmNlcyA9IHtcbiAgICAgICAgICAgIHdvcms6IHtcbiAgICAgICAgICAgICAgICB2YXVsZTond29yaycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdFYXJuaW5ncyBmcm9tIHdvcmsnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6ICdBIGNoaWxkIGhhcyBhIGpvYiB3aGVyZSB0aGV5IGVhcm4gc2FsYXJ5IG9yIHdhZ2VzICcsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyTWVtYmVyOiAnJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc29jaWFsU2VjdXJpdHk6IHtcbiAgICAgICAgICAgICAgICB2YXVsZTonc29jaWFsU2VjdXJpdHknLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU29jaWFsIFNlY3VyaXR5IERpc2FiaWxpdHkgUGF5bWVudHMgb3IgU3Vydml2b3LigJlzIEJlbmVmaXRzICcsXG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiAnQSBjaGlsZCBpcyBibGluZCBvciBkaXNhYmxlZCBhbmQgcmVjZWl2ZXMgU29jaWFsIFNlY3VyaXR5IGJlbmVmaXRzLicsXG4gICAgICAgICAgICAgICAgICAgIC8vICcgQSBwYXJlbnQgaXMgZGlzYWJsZWQsIHJldGlyZWQsIG9yIGRlY2Vhc2VkLCBhbmQgdGhlaXIgY2hpbGQgcmVjZWl2ZXMgc29jaWFsIHNlY3VyaXR5IGJlbmVmaXRzJyxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJNZW1iZXI6ICcnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdGhlclBlcnNvbjoge1xuICAgICAgICAgICAgICAgIHZhdWxlOidvdGhlclBlcnNvbicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdJbmNvbWUgZnJvbSBwZXJzb25zIG91dHNpZGUgdGhlIGhvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZDogJ0EgZnJpZW5kIG9yIGV4dGVuZGVkIGZhbWlseSBtZW1iZXIgcmVndWxhcmx5IGdpdmVzIGEgY2hpbGQgc3BlbmRpbmcgbW9uZXknLFxuICAgICAgICAgICAgICAgICAgICBvdGhlck1lbWJlcjogJycsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG90aGVyU291cmNlOiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J290aGVyU291cmNlJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0luY29tZSBmcm9tIGFueSBvdGhlciBzb3VyY2UnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6ICdBIGNoaWxkIHJlY2VpdmVzIGluY29tZSBmcm9tIGEgcHJpdmF0ZSBwZW5zaW9uIGZ1bmQsIGFubnVpdHksIG9yIHRydXN0JyxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJNZW1iZXI6ICcnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc2NvcGUubWVtYmVyLmluY29tZVNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzY29wZS5tZW1iZXIuaW5jb21lU291cmNlcyA9IFtdO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoc2NvcGUuaW5jb21lU291cmNlcykuZm9yRWFjaChmdW5jdGlvbihpbmNvbWVTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5tZW1iZXIuaW5jb21lU291cmNlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogaW5jb21lU291cmNlLFxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ3llc05vSW5wdXQnLCB5ZXNOb0lucHV0KTtcblxuICAgIGZ1bmN0aW9uIHllc05vSW5wdXQgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtb2RlbDogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3llc25vLmh0bWwnLFxuICAgICAgICB9O1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5zZXJ2aWNlKCdIb3VzZWhvbGQnLCBob3VzZWhvbGRTZXJ2aWNlKTtcblxuICAgIGhvdXNlaG9sZFNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcblxuICAgIGZ1bmN0aW9uIGhvdXNlaG9sZFNlcnZpY2UoJGh0dHApIHtcbiAgICAgICAgdGhpcy5nZXQgPSBnZXQ7XG4gICAgICAgIHRoaXMuc2F2ZSA9IHNhdmU7XG4gICAgICAgIHRoaXMuY2xlYXIgPSBjbGVhcjtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIHZhciBob3VzZWhvbGQ7XG5cbiAgICAgICAgdmFyIFBlcnNvbiA9IHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jb21lU291cmNlQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jb21lU291cmNlcyA9IFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBNb2RlbFxuICAgICAgICAvLyBUb2RvOiBjb25zaWRlciBtb3ZpbmcgdG8gc2VydmVyPz9cbiAgICAgICAgdmFyIEhvdXNlaG9sZCA9IHtcbiAgICAgICAgICAgIGNoaWxkQ291bnQ6IDAsXG4gICAgICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgICAgICBvdGhlck1lbWJlcnNDb3VudDogMCxcbiAgICAgICAgICAgIG90aGVyTWVtYmVyczogW10sXG4gICAgICAgICAgICBjb21wbGV0ZWRBcHBsaWNhdGlvbjogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICBpZiAoaG91c2Vob2xkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvdXNlaG9sZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhvdXNlaG9sZCA9IE9iamVjdC5jcmVhdGUoSG91c2Vob2xkKTtcbiAgICAgICAgICAgIHJldHVybiBob3VzZWhvbGQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzYXZlKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9ob3VzZWhvbGQnLCBob3VzZWhvbGQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBob3VzZWhvbGQgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgICAgICAgICB2YXIgaG91c2Vob2xkID0ge307XG4gICAgICAgICAgICByZXR1cm4gaG91c2Vob2xkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuc2VydmljZSgnU2VjdGlvbnMnLCBzZWN0aW9uc1NlcnZpY2UpO1xuXG4gICAgc2VjdGlvbnNTZXJ2aWNlLiRpbmplY3QgPSBbJyRyb290U2NvcGUnICwnJHN0YXRlJ107XG5cbiAgICBmdW5jdGlvbiBzZWN0aW9uc1NlcnZpY2UoJHJvb3RTY29wZSwgJHN0YXRlKSB7XG4gICAgICAgIHZhciBwcmV2aW91c1N0YXRlLFxuICAgICAgICAgICAgY3VycmVudFN0YXRlO1xuICAgICAgICBcbiAgICAgICAgdmFyIHNlY3Rpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2hpbGRyZW4nLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnY2hpbGRyZW4nLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDaGlsZCBJbmNvbWUnLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnY2hpbGRJbmNvbWUnLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdIb3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnU2lnbiBhbmQgQ29uZmlybScsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdzaWduYXR1cmUnLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdmFyIGluZGV4ZWRTZWN0aW9ucyA9IF8uaW5kZXhCeShzZWN0aW9ucywgJ3N0YXRlJyk7XG5cbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBzZWN0aW9uczogc2VjdGlvbnMsXG4gICAgICAgICAgICBpbmRleGVkU2VjdGlvbnM6IGluZGV4ZWRTZWN0aW9ucyxcbiAgICAgICAgICAgIG5hdmlnYXRlVG9OZXh0OiBuYXZpZ2F0ZVRvTmV4dCxcbiAgICAgICAgICAgIHVwZGF0ZVJlcXVpcmVkU2VjdGlvbnM6IHVwZGF0ZVJlcXVpcmVkU2VjdGlvbnNcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUmVxdWlyZWRTZWN0aW9ucyhob3VzZWhvbGQpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgYXNzaXN0YW5jZVByb2dyYW1Ib3VzZWhvbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBzcGVjaWFsU3RhdHVzQ291bnQgPSAwO1xuICAgICAgICAgICAgdmFyIHNraXBNZWFuc1Rlc3QgPSBmYWxzZTtcblxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCBob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQgPSBob3VzZWhvbGQuY2hpbGRyZW5baV07XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudENoaWxkLmFzc2lzdGFuY2VQcm9ncmFtICYmIGN1cnJlbnRDaGlsZC5hc3Npc3RhbmNlUHJvZ3JhbS5wYXJ0aWNpcGFudCkge1xuICAgICAgICAgICAgICAgICAgICBhc3Npc3RhbmNlUHJvZ3JhbUhvdXNlaG9sZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cyAmJiBjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5mb3N0ZXJDaGlsZCB8fFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5ob21lbGVzc01pZ3JhbnRSdW5hd2F5IHx8XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZC5zcGVjaWFsU3RhdHVzLmhlYWRTdGFydFBhcnRpY2lwYW50XG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWNpYWxTdGF0dXNDb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2tpcE1lYW5zVGVzdCA9IGFzc2lzdGFuY2VQcm9ncmFtSG91c2Vob2xkIHx8XG4gICAgICAgICAgICAgICAgKGhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgIGhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGggPT09IHNwZWNpYWxTdGF0dXNDb3VudCk7XG5cbiAgICAgICAgICAgIGlmIChza2lwTWVhbnNUZXN0KSB7XG4gICAgICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zWydjaGlsZEluY29tZSddLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zWydob3VzZWhvbGQnXS5yZXF1aXJlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmaW5kTmV4dChjdXJyZW50U3RhdGUpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBfLmZpbmRJbmRleChzZWN0aW9ucywgZnVuY3Rpb24oc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWN0aW9uLnN0YXRlID09PSBjdXJyZW50U3RhdGU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gTG9vayBmb3IgdGhlIG5leHQgcmVxdWlyZWQgc2VjdGlvblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGN1cnJlbnRJbmRleCArIDE7IGkgPCBzZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzZWN0aW9uc1tpXS5yZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VjdGlvbnNbaV0uc3RhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gbW9yZSByZXF1aXJlZCBzZWN0aW9ucywgd2UncmUgZG9uZS5cbiAgICAgICAgICAgIHJldHVybiAnY29uZmlybWF0aW9uJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG5hdmlnYXRlVG9OZXh0KGN1cnJlbnRTdGF0ZSkge1xuICAgICAgICAgICAgdmFyIG5leHRTZWN0aW9uICA9IGZpbmROZXh0KGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgICAgICAkc3RhdGUuZ28obmV4dFNlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXYsIHRvLCB0b1BhcmFtcywgZnJvbSwgZnJvbVBhcmFtcykge1xuICAgICAgICAgICAgcHJldmlvdXNTdGF0ZSA9IGZyb20ubmFtZTtcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IHRvLm5hbWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUHJldmlvdXMgc3RhdGU6JyArIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0N1cnJlbnQgc3RhdGU6JyArIGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
