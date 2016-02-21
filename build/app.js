(function() {
    'use strict';

    angular
    .module('eatChallengeApp',['ngCookies', 'ngCsv','ngMaterial', 'ngSanitize', 'ui.router'])
    .config(routerConfig)
    .config(materialDesignThemer)
    .run(function($rootScope) {
        // scroll to the top on page transition
        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    });

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
            .state('householdIncome', {
                url: '/household-income',
                views:{
                    'side-nav': {
                        templateUrl: '../views/sideNav.html',
                        controller: 'sideNavController'
                    },
                    'main': {
                        templateUrl: '../views/householdIncome.html',
                        controller: 'householdIncome'
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
    'use strict';

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
                annotation: 'A child has a job where they earn salary or wages. Please report gross income. This is the amount of income earned before any money is taken out for taxes or deductions. Include salary, wages, and cash bonuses.',
            },
            socialSecurity: {
                vaule:'socialSecurity',
                label: 'Social Security Disability Payments or Survivor’s Benefits ',
                frequency: ['monthly'],
                annotation: 'A child is blind or disabled and receives Social Security benefits.',
                    // ' A parent is disabled, retired, or deceased, and their child receives social security benefits',
                
            },
            otherPerson: {
                vaule:'otherPerson',
                label: 'Income from persons outside the household',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: 'A friend or extended family member regularly gives a child spending money.',
                
            },
            otherSource: {
                vaule:'otherSource',
                label: 'Income from any other source',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: 'A child receives income from a private pension fund, annuity, or trust.',
                
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
    'use strict';

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
    'use strict';

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
    'use strict';

    angular
        .module('eatChallengeApp')
        .controller('householdIncome', householdIncome);

    householdIncome.$inject = [
        '$scope',
        '$state',
        'Auth',
        'Household',
        'Sections'
    ];

    function householdIncome ($scope, $state, Auth, Household, Sections, HouseholdIncome) {
        var vm = $scope;
        var household = Household.get();

        var work = {
            categoryName: 'work',
            headline: 'Work Income',
            question: 'earn money through work',
            sources: [
                {
                    vaule:'work',
                    checkboxLabel: 'Work outside the home in a non-military capacity ',
                    shortLabel: 'Earnings from work',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'Please report gross income. This is the amount of income earned before any money is taken out for taxes or deductions. Include salary, wages, and cash bonuses.'
                },
                {
                    vaule:'selfEmployed',
                    shortLabel: 'Earnings from self employment',
                    checkboxLabel: 'Self-employed',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'For household members that are self-employed, report income from that work as a net amount. This is calculated by subtracting the total operating expenses of the business from its gross receipts or revenue.'

                },
                {
                    vaule:'onStrike',
                    checkboxLabel: 'On strike',
                    shortLabel: 'Strike Benefits',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation:
                },
                {
                    // TODO: add space for housing allowance per doc
                    vaule:'military',
                    checkboxLabel: 'In the U.S. military',
                    shortLabel: 'Basic pay and cash bonuses',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'Please do not include combat pay, FSSA, or private housing allowances.'
                }
            ]
        };

        var publicAssistance = {
            categoryName: 'publicAssistance',
            headline: 'Public Assistance',
            question: 'receive any public assistance benefits',
            sources:[
                {
                    vaule:'unemployment',
                    checkboxLabel: 'Unemployment benefits',
                    shortLabel: 'Unemployment benefits',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule:'workersComp',
                    checkboxLabel: 'Worker’s compensation',
                    shortLabel: 'Worker’s compensation',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule:'ssi',
                    checkboxLabel: 'Supplemental Security Income (SSI)',
                    shortLabel: 'Supplemental Security Income (SSI)',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule:'cashAssistance',
                    checkboxLabel: 'Cash assistance from State or local government',
                    shortLabel: 'Cash assistance',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'This could include TANF or General Assistance money.'
                },
                {
                    vaule:'veteransBenefits',
                    checkboxLabel: 'Veteran’s benefits',
                    shortLabel: 'Veteran’s benefits',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: 'This could include TANF or General Assistance money'
                }
            ]
        };

        var alimony = {
            categoryName: 'alimony',
            headline: 'Alimony',
            question: 'receive alimony payments',
            sources:[
                {
                    vaule: 'alimony',
                    checkboxLabel: 'alimony payments',
                    shortLabel: 'Alimony payment',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'If income is received from child support or alimony, only court-ordered payments should be reported here. Informal but regular payments should be reported later as “other” income.'
                }
            ]
        };

        var childSupport = {
            categoryName: 'childSupport',
            headline: 'Child Support',
            question: 'receive any child support',
            sources: [
                {
                    vaule: 'childSupport',
                    checkboxLabel: 'any child support',
                    shortLabel: 'Child support payment',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'If income is received from child support or childSupport, only court-ordered payments should be reported here. Informal but regular payments should be reported later as “other” income.'
                }
            ]
        };

        var retirement = {
            categoryName: 'retirement',
            headline: 'Pension and Retirement',
            question: 'receive any pension or retirement money',
            sources: [
                {
                    vaule: 'socialSecurity',
                    checkboxLabel: 'Social Security (including railroad retirement and black lung benefits)',
                    shortLabel: 'Social security',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'Please include railroad retirement and black lung benefits'
                },
                {
                    vaule: 'privatePension',
                    checkboxLabel: 'Private pensions or disability',
                    shortLabel: 'Private pensions or disability',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                }
            ]
        };

        var otherIncome = {
            categoryName: 'otherIncome',
            headline: 'Other Income',
            question: 'recieve money through any other source',
            sources: [
                {
                    vaule: 'trusts',
                    checkboxLabel: 'Income from trusts or estates',
                    shortLabel: 'Income from trusts or estates',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule: 'annuities',
                    checkboxLabel: 'Annuities',
                    shortLabel: 'Income from annuities',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule: 'investment',
                    checkboxLabel: 'Investment income',
                    shortLabel: 'Investment income',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule: 'interest',
                    checkboxLabel: 'Earned interest',
                    shortLabel: 'Earned interest',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule: 'rentalIncome',
                    checkboxLabel: 'Rental income',
                    shortLabel: 'Rental income',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    // annotation: ''
                },
                {
                    vaule: 'otherCash',
                    checkboxLabel: 'Regular cash payments from outside household',
                    shortLabel: 'Regular cash payments from outside household',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'Such cash payments should include regular child support or alimony payments received by the household that are not court-ordered.'
                },
            ]
        };

        function navigateToNextSection() {
            Household.save();
            Sections.updateRequiredSections($scope.household);
            Sections.navigateToNext($state.$current.self.name);
        }

        var incomeCategories = [
                                work,
                                publicAssistance,
                                alimony,
                                childSupport,
                                retirement,
                                otherIncome
                                ];

        /////////////////////////////

        vm.household = household;
        vm.navigateToNextSection = navigateToNextSection;
        vm.incomeCategories = incomeCategories;

    }

})();

(function() {
    'use strict';

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

        // TODO: Move to mongoose model
        var HouseholdMember = {
            income: {}
        };
        
        function addOtherMember(newVal) {
            while (newVal > $scope.household.otherMembers.length) {
                var householdMember = Object.create(HouseholdMember);
                $scope.household.otherMembers.push(householdMember);

            }
        }

        function navigateToNextSection() {
            Household.save();
            Sections.updateRequiredSections($scope.household);
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
    'use strict';

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
    'use strict';

    angular
        .module('eatChallengeApp')
        .service('Auth', Auth);

    Auth.$inject = ['$http'];

    function Auth($http) {

        var user = false;

        function signup(email, password) {
            var data = {
                email: email,
                password: password
            };
            $http.post('/user/signup', data)
            .success(function(response) {
                user = true;
            });
            // .error(function(data) {});

        }

        function login(email, password) {
            var data = {
                email: email,
                password: password
            };

            $http.post('/user/login', data)
            .success(function(response) {
                user = true;
            });
            // .error(function(data) {});
        }

        function logout() {
            $http.post('/user/logout').success(function() {
                user = false;
            });

        }

        ////////
        var service  = {
            login: login,
            logout: logout,
            user: user
        };

        return service;
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
            return $http.post('/household', household);
            // .then(function(response) {
            //     household = response.data;
            // });
        }

        function clear () {
            var household = {};
            return household;
        }

        return this;
    }

})();

(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .service('Sections', sectionsService);

    sectionsService.$inject = ['$rootScope' ,'$state'];

    function sectionsService($rootScope, $state) {
        var previousState,
            currentState;

        var sections = [
            {
                label: 'Getting Started',
                state: 'start',
                completed: false,
                required: true
            },            {
                label: 'Children',
                state: 'children',
                completed: false,
                required: true
            },
            {
                label: 'Children\'s Income',
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
                label: 'Household Income',
                state: 'householdIncome',
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

                if (currentChild.specialStatus && (currentChild.specialStatus.fosterChild ||
                    currentChild.specialStatus.homelessMigrantRunaway ||
                    currentChild.specialStatus.headStartParticipant)
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
                indexedSections['householdIncome'].required = false;
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

        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            previousState = from.name;
            currentState = to.name;
            // console.log('Previous state:' + previousState);
            // console.log('Current state:' + currentState);
        });

    }

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImRpcmVjdGl2ZXMvaW5jb21lLmpzIiwiZGlyZWN0aXZlcy95ZXNuby5qcyIsImNvbnRyb2xsZXJzL2V4cG9ydC5qcyIsImNvbnRyb2xsZXJzL2hvdXNlaG9sZEluY29tZS5qcyIsImNvbnRyb2xsZXJzL2xvZ2luLmpzIiwiY29udHJvbGxlcnMvbWFpbi5qcyIsImNvbnRyb2xsZXJzL3NpZGVuYXYuanMiLCJzZXJ2aWNlcy9hdXRoLmpzIiwic2VydmljZXMvaG91c2Vob2xkLmpzIiwic2VydmljZXMvc2VjdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnLFsnbmdDb29raWVzJywgJ25nQ3N2JywnbmdNYXRlcmlhbCcsICduZ1Nhbml0aXplJywgJ3VpLnJvdXRlciddKVxuICAgIC5jb25maWcocm91dGVyQ29uZmlnKVxuICAgIC5jb25maWcobWF0ZXJpYWxEZXNpZ25UaGVtZXIpXG4gICAgLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG4gICAgICAgIC8vIHNjcm9sbCB0byB0aGUgdG9wIG9uIHBhZ2UgdHJhbnNpdGlvblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBtYXRlcmlhbERlc2lnblRoZW1lci4kaW5qZWN0ID0gWyckbWRUaGVtaW5nUHJvdmlkZXInXTtcbiAgICBmdW5jdGlvbiBtYXRlcmlhbERlc2lnblRoZW1lcigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcbiAgICAgICAgLy8gJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdsaWdodC1ibHVlJyk7XG4gICAgICAgIC8vIC5wcmltYXJ5UGFsZXR0ZSgncGluaycsIHtcbiAgICAgICAgLy8gICAnZGVmYXVsdCc6ICc0MDAnLCAvLyBieSBkZWZhdWx0IHVzZSBzaGFkZSA0MDAgZnJvbSB0aGUgcGluayBwYWxldHRlIGZvciBwcmltYXJ5IGludGVudGlvbnNcbiAgICAgICAgLy8gICAnaHVlLTEnOiAnMTAwJywgLy8gdXNlIHNoYWRlIDEwMCBmb3IgdGhlIDxjb2RlPm1kLWh1ZS0xPC9jb2RlPiBjbGFzc1xuICAgICAgICAvLyAgICdodWUtMic6ICc2MDAnLCAvLyB1c2Ugc2hhZGUgNjAwIGZvciB0aGUgPGNvZGU+bWQtaHVlLTI8L2NvZGU+IGNsYXNzXG4gICAgICAgIC8vICAgJ2h1ZS0zJzogJ0ExMDAnIC8vIHVzZSBzaGFkZSBBMTAwIGZvciB0aGUgPGNvZGU+bWQtaHVlLTM8L2NvZGU+IGNsYXNzXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC8vIElmIHlvdSBzcGVjaWZ5IGxlc3MgdGhhbiBhbGwgb2YgdGhlIGtleXMsIGl0IHdpbGwgaW5oZXJpdCBmcm9tIHRoZVxuICAgICAgICAvLyAvLyBkZWZhdWx0IHNoYWRlc1xuICAgICAgICAvLyAuYWNjZW50UGFsZXR0ZSgncHVycGxlJywge1xuICAgICAgICAvLyAgICdkZWZhdWx0JzogJzIwMCcgLy8gdXNlIHNoYWRlIDIwMCBmb3IgZGVmYXVsdCwgYW5kIGtlZXAgYWxsIG90aGVyIHNoYWRlcyB0aGUgc2FtZVxuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICByb3V0ZXJDb25maWcuJGluamVjdCA9IFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJ107XG5cbiAgICBmdW5jdGlvbiByb3V0ZXJDb25maWcgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICByb3V0ZXIoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcik7XG5cbiAgICAgICAgLy8vLy8vLy8vL1xuICAgICAgICBmdW5jdGlvbiByb3V0ZXIoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICAgICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdzdGFydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3N0YXJ0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnY2hpbGRyZW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2NoaWxkcmVuLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnY2hpbGRJbmNvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NoaWxkSW5jb21lJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvY2hpbGRJbmNvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnaG91c2Vob2xkJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ob3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvaG91c2Vob2xkLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnaG91c2Vob2xkSW5jb21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ob3VzZWhvbGQtaW5jb21lJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2hvdXNlaG9sZEluY29tZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob3VzZWhvbGRJbmNvbWUnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdzaWduYXR1cmUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3NpZ25hdHVyZScsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZ25hdHVyZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdjb25maXJtYXRpb24nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbmZpcm1hdGlvbicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2NvbmZpcm1hdGlvbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdleHBvcnQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2V4cG9ydCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvZXhwb3J0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V4cG9ydENvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdzaWdudXAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWdudXAuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9sb2dpbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdzb0ZhcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvc28tZmFyJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc29GYXIuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuZGlyZWN0aXZlKCdpbmNvbWVRdWVzdGlvbnMnLCBpbmNvbWVEaXJlY3RpdmUpO1xuXG4gICAgZnVuY3Rpb24gaW5jb21lRGlyZWN0aXZlKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtZW1iZXI6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9pbmNvbWUuaHRtbCcsXG4gICAgICAgICAgICBsaW5rOiBsaW5rXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9XG5cbiAgICAvLyBsaW5rLiRpbmplY3QgPSBbJ3Njb3BlJ107XG5cbiAgICBmdW5jdGlvbiBsaW5rKHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLmluY29tZVNvdXJjZXMgPSB7XG4gICAgICAgICAgICB3b3JrOiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J3dvcmsnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnRWFybmluZ3MgZnJvbSB3b3JrJyxcbiAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnQSBjaGlsZCBoYXMgYSBqb2Igd2hlcmUgdGhleSBlYXJuIHNhbGFyeSBvciB3YWdlcy4gUGxlYXNlIHJlcG9ydCBncm9zcyBpbmNvbWUuIFRoaXMgaXMgdGhlIGFtb3VudCBvZiBpbmNvbWUgZWFybmVkIGJlZm9yZSBhbnkgbW9uZXkgaXMgdGFrZW4gb3V0IGZvciB0YXhlcyBvciBkZWR1Y3Rpb25zLiBJbmNsdWRlIHNhbGFyeSwgd2FnZXMsIGFuZCBjYXNoIGJvbnVzZXMuJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzb2NpYWxTZWN1cml0eToge1xuICAgICAgICAgICAgICAgIHZhdWxlOidzb2NpYWxTZWN1cml0eScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTb2NpYWwgU2VjdXJpdHkgRGlzYWJpbGl0eSBQYXltZW50cyBvciBTdXJ2aXZvcuKAmXMgQmVuZWZpdHMgJyxcbiAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdBIGNoaWxkIGlzIGJsaW5kIG9yIGRpc2FibGVkIGFuZCByZWNlaXZlcyBTb2NpYWwgU2VjdXJpdHkgYmVuZWZpdHMuJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gJyBBIHBhcmVudCBpcyBkaXNhYmxlZCwgcmV0aXJlZCwgb3IgZGVjZWFzZWQsIGFuZCB0aGVpciBjaGlsZCByZWNlaXZlcyBzb2NpYWwgc2VjdXJpdHkgYmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG90aGVyUGVyc29uOiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J290aGVyUGVyc29uJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0luY29tZSBmcm9tIHBlcnNvbnMgb3V0c2lkZSB0aGUgaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnQSBmcmllbmQgb3IgZXh0ZW5kZWQgZmFtaWx5IG1lbWJlciByZWd1bGFybHkgZ2l2ZXMgYSBjaGlsZCBzcGVuZGluZyBtb25leS4nLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG90aGVyU291cmNlOiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J290aGVyU291cmNlJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0luY29tZSBmcm9tIGFueSBvdGhlciBzb3VyY2UnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdBIGNoaWxkIHJlY2VpdmVzIGluY29tZSBmcm9tIGEgcHJpdmF0ZSBwZW5zaW9uIGZ1bmQsIGFubnVpdHksIG9yIHRydXN0LicsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNjb3BlLm1lbWJlci5pbmNvbWVTb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2NvcGUubWVtYmVyLmluY29tZVNvdXJjZXMgPSBbXTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHNjb3BlLmluY29tZVNvdXJjZXMpLmZvckVhY2goZnVuY3Rpb24oaW5jb21lU291cmNlKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubWVtYmVyLmluY29tZVNvdXJjZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGluY29tZVNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IG51bGxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmRpcmVjdGl2ZSgneWVzTm9JbnB1dCcsIHllc05vSW5wdXQpO1xuXG4gICAgZnVuY3Rpb24geWVzTm9JbnB1dCAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIG1vZGVsOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MveWVzbm8uaHRtbCcsXG4gICAgICAgIH07XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2V4cG9ydENvbnRyb2xsZXInLCBleHBvcnRDb250cm9sbGVyKTtcblxuICAgIGV4cG9ydENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGh0dHAnLCAnJHNjb3BlJ107XG5cbiAgICBmdW5jdGlvbiBleHBvcnRDb250cm9sbGVyKCRodHRwLCAkc2NvcGUpIHtcbiAgICAgICAgJGh0dHAuZ2V0KCcvaG91c2Vob2xkL2NvbXBsZXRlZCcpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICRzY29wZS5jb21wbGV0ZWRBcHBsaWNhdGlvbnMgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignaG91c2Vob2xkSW5jb21lJywgaG91c2Vob2xkSW5jb21lKTtcblxuICAgIGhvdXNlaG9sZEluY29tZS4kaW5qZWN0ID0gW1xuICAgICAgICAnJHNjb3BlJyxcbiAgICAgICAgJyRzdGF0ZScsXG4gICAgICAgICdBdXRoJyxcbiAgICAgICAgJ0hvdXNlaG9sZCcsXG4gICAgICAgICdTZWN0aW9ucydcbiAgICBdO1xuXG4gICAgZnVuY3Rpb24gaG91c2Vob2xkSW5jb21lICgkc2NvcGUsICRzdGF0ZSwgQXV0aCwgSG91c2Vob2xkLCBTZWN0aW9ucywgSG91c2Vob2xkSW5jb21lKSB7XG4gICAgICAgIHZhciB2bSA9ICRzY29wZTtcbiAgICAgICAgdmFyIGhvdXNlaG9sZCA9IEhvdXNlaG9sZC5nZXQoKTtcblxuICAgICAgICB2YXIgd29yayA9IHtcbiAgICAgICAgICAgIGNhdGVnb3J5TmFtZTogJ3dvcmsnLFxuICAgICAgICAgICAgaGVhZGxpbmU6ICdXb3JrIEluY29tZScsXG4gICAgICAgICAgICBxdWVzdGlvbjogJ2Vhcm4gbW9uZXkgdGhyb3VnaCB3b3JrJyxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOid3b3JrJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1dvcmsgb3V0c2lkZSB0aGUgaG9tZSBpbiBhIG5vbi1taWxpdGFyeSBjYXBhY2l0eSAnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnRWFybmluZ3MgZnJvbSB3b3JrJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdQbGVhc2UgcmVwb3J0IGdyb3NzIGluY29tZS4gVGhpcyBpcyB0aGUgYW1vdW50IG9mIGluY29tZSBlYXJuZWQgYmVmb3JlIGFueSBtb25leSBpcyB0YWtlbiBvdXQgZm9yIHRheGVzIG9yIGRlZHVjdGlvbnMuIEluY2x1ZGUgc2FsYXJ5LCB3YWdlcywgYW5kIGNhc2ggYm9udXNlcy4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOidzZWxmRW1wbG95ZWQnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnRWFybmluZ3MgZnJvbSBzZWxmIGVtcGxveW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnU2VsZi1lbXBsb3llZCcsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnRm9yIGhvdXNlaG9sZCBtZW1iZXJzIHRoYXQgYXJlIHNlbGYtZW1wbG95ZWQsIHJlcG9ydCBpbmNvbWUgZnJvbSB0aGF0IHdvcmsgYXMgYSBuZXQgYW1vdW50LiBUaGlzIGlzIGNhbGN1bGF0ZWQgYnkgc3VidHJhY3RpbmcgdGhlIHRvdGFsIG9wZXJhdGluZyBleHBlbnNlcyBvZiB0aGUgYnVzaW5lc3MgZnJvbSBpdHMgZ3Jvc3MgcmVjZWlwdHMgb3IgcmV2ZW51ZS4nXG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J29uU3RyaWtlJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ09uIHN0cmlrZScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdTdHJpa2UgQmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjpcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYWRkIHNwYWNlIGZvciBob3VzaW5nIGFsbG93YW5jZSBwZXIgZG9jXG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOidtaWxpdGFyeScsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdJbiB0aGUgVS5TLiBtaWxpdGFyeScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdCYXNpYyBwYXkgYW5kIGNhc2ggYm9udXNlcycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnUGxlYXNlIGRvIG5vdCBpbmNsdWRlIGNvbWJhdCBwYXksIEZTU0EsIG9yIHByaXZhdGUgaG91c2luZyBhbGxvd2FuY2VzLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHB1YmxpY0Fzc2lzdGFuY2UgPSB7XG4gICAgICAgICAgICBjYXRlZ29yeU5hbWU6ICdwdWJsaWNBc3Npc3RhbmNlJyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiAnUHVibGljIEFzc2lzdGFuY2UnLFxuICAgICAgICAgICAgcXVlc3Rpb246ICdyZWNlaXZlIGFueSBwdWJsaWMgYXNzaXN0YW5jZSBiZW5lZml0cycsXG4gICAgICAgICAgICBzb3VyY2VzOltcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOid1bmVtcGxveW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnVW5lbXBsb3ltZW50IGJlbmVmaXRzJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1VuZW1wbG95bWVudCBiZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTond29ya2Vyc0NvbXAnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnV29ya2Vy4oCZcyBjb21wZW5zYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnV29ya2Vy4oCZcyBjb21wZW5zYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J3NzaScsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdTdXBwbGVtZW50YWwgU2VjdXJpdHkgSW5jb21lIChTU0kpJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1N1cHBsZW1lbnRhbCBTZWN1cml0eSBJbmNvbWUgKFNTSSknLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J2Nhc2hBc3Npc3RhbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ0Nhc2ggYXNzaXN0YW5jZSBmcm9tIFN0YXRlIG9yIGxvY2FsIGdvdmVybm1lbnQnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnQ2FzaCBhc3Npc3RhbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdUaGlzIGNvdWxkIGluY2x1ZGUgVEFORiBvciBHZW5lcmFsIEFzc2lzdGFuY2UgbW9uZXkuJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTondmV0ZXJhbnNCZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdWZXRlcmFu4oCZcyBiZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdWZXRlcmFu4oCZcyBiZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnVGhpcyBjb3VsZCBpbmNsdWRlIFRBTkYgb3IgR2VuZXJhbCBBc3Npc3RhbmNlIG1vbmV5J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgYWxpbW9ueSA9IHtcbiAgICAgICAgICAgIGNhdGVnb3J5TmFtZTogJ2FsaW1vbnknLFxuICAgICAgICAgICAgaGVhZGxpbmU6ICdBbGltb255JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAncmVjZWl2ZSBhbGltb255IHBheW1lbnRzJyxcbiAgICAgICAgICAgIHNvdXJjZXM6W1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdhbGltb255JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ2FsaW1vbnkgcGF5bWVudHMnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnQWxpbW9ueSBwYXltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdJZiBpbmNvbWUgaXMgcmVjZWl2ZWQgZnJvbSBjaGlsZCBzdXBwb3J0IG9yIGFsaW1vbnksIG9ubHkgY291cnQtb3JkZXJlZCBwYXltZW50cyBzaG91bGQgYmUgcmVwb3J0ZWQgaGVyZS4gSW5mb3JtYWwgYnV0IHJlZ3VsYXIgcGF5bWVudHMgc2hvdWxkIGJlIHJlcG9ydGVkIGxhdGVyIGFzIOKAnG90aGVy4oCdIGluY29tZS4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjaGlsZFN1cHBvcnQgPSB7XG4gICAgICAgICAgICBjYXRlZ29yeU5hbWU6ICdjaGlsZFN1cHBvcnQnLFxuICAgICAgICAgICAgaGVhZGxpbmU6ICdDaGlsZCBTdXBwb3J0JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAncmVjZWl2ZSBhbnkgY2hpbGQgc3VwcG9ydCcsXG4gICAgICAgICAgICBzb3VyY2VzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ2NoaWxkU3VwcG9ydCcsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdhbnkgY2hpbGQgc3VwcG9ydCcsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdDaGlsZCBzdXBwb3J0IHBheW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ0lmIGluY29tZSBpcyByZWNlaXZlZCBmcm9tIGNoaWxkIHN1cHBvcnQgb3IgY2hpbGRTdXBwb3J0LCBvbmx5IGNvdXJ0LW9yZGVyZWQgcGF5bWVudHMgc2hvdWxkIGJlIHJlcG9ydGVkIGhlcmUuIEluZm9ybWFsIGJ1dCByZWd1bGFyIHBheW1lbnRzIHNob3VsZCBiZSByZXBvcnRlZCBsYXRlciBhcyDigJxvdGhlcuKAnSBpbmNvbWUuJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcmV0aXJlbWVudCA9IHtcbiAgICAgICAgICAgIGNhdGVnb3J5TmFtZTogJ3JldGlyZW1lbnQnLFxuICAgICAgICAgICAgaGVhZGxpbmU6ICdQZW5zaW9uIGFuZCBSZXRpcmVtZW50JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAncmVjZWl2ZSBhbnkgcGVuc2lvbiBvciByZXRpcmVtZW50IG1vbmV5JyxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAnc29jaWFsU2VjdXJpdHknLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnU29jaWFsIFNlY3VyaXR5IChpbmNsdWRpbmcgcmFpbHJvYWQgcmV0aXJlbWVudCBhbmQgYmxhY2sgbHVuZyBiZW5lZml0cyknLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnU29jaWFsIHNlY3VyaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdQbGVhc2UgaW5jbHVkZSByYWlscm9hZCByZXRpcmVtZW50IGFuZCBibGFjayBsdW5nIGJlbmVmaXRzJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ3ByaXZhdGVQZW5zaW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1ByaXZhdGUgcGVuc2lvbnMgb3IgZGlzYWJpbGl0eScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdQcml2YXRlIHBlbnNpb25zIG9yIGRpc2FiaWxpdHknLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG90aGVySW5jb21lID0ge1xuICAgICAgICAgICAgY2F0ZWdvcnlOYW1lOiAnb3RoZXJJbmNvbWUnLFxuICAgICAgICAgICAgaGVhZGxpbmU6ICdPdGhlciBJbmNvbWUnLFxuICAgICAgICAgICAgcXVlc3Rpb246ICdyZWNpZXZlIG1vbmV5IHRocm91Z2ggYW55IG90aGVyIHNvdXJjZScsXG4gICAgICAgICAgICBzb3VyY2VzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ3RydXN0cycsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdJbmNvbWUgZnJvbSB0cnVzdHMgb3IgZXN0YXRlcycsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdJbmNvbWUgZnJvbSB0cnVzdHMgb3IgZXN0YXRlcycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ2FubnVpdGllcycsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdBbm51aXRpZXMnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnSW5jb21lIGZyb20gYW5udWl0aWVzJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAnaW52ZXN0bWVudCcsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdJbnZlc3RtZW50IGluY29tZScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdJbnZlc3RtZW50IGluY29tZScsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ2ludGVyZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ0Vhcm5lZCBpbnRlcmVzdCcsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdFYXJuZWQgaW50ZXJlc3QnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdyZW50YWxJbmNvbWUnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnUmVudGFsIGluY29tZScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdSZW50YWwgaW5jb21lJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAnb3RoZXJDYXNoJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1JlZ3VsYXIgY2FzaCBwYXltZW50cyBmcm9tIG91dHNpZGUgaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1JlZ3VsYXIgY2FzaCBwYXltZW50cyBmcm9tIG91dHNpZGUgaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdTdWNoIGNhc2ggcGF5bWVudHMgc2hvdWxkIGluY2x1ZGUgcmVndWxhciBjaGlsZCBzdXBwb3J0IG9yIGFsaW1vbnkgcGF5bWVudHMgcmVjZWl2ZWQgYnkgdGhlIGhvdXNlaG9sZCB0aGF0IGFyZSBub3QgY291cnQtb3JkZXJlZC4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb24oKSB7XG4gICAgICAgICAgICBIb3VzZWhvbGQuc2F2ZSgpO1xuICAgICAgICAgICAgU2VjdGlvbnMudXBkYXRlUmVxdWlyZWRTZWN0aW9ucygkc2NvcGUuaG91c2Vob2xkKTtcbiAgICAgICAgICAgIFNlY3Rpb25zLm5hdmlnYXRlVG9OZXh0KCRzdGF0ZS4kY3VycmVudC5zZWxmLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluY29tZUNhdGVnb3JpZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1YmxpY0Fzc2lzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaW1vbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkU3VwcG9ydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0aXJlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJJbmNvbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIHZtLmhvdXNlaG9sZCA9IGhvdXNlaG9sZDtcbiAgICAgICAgdm0ubmF2aWdhdGVUb05leHRTZWN0aW9uID0gbmF2aWdhdGVUb05leHRTZWN0aW9uO1xuICAgICAgICB2bS5pbmNvbWVDYXRlZ29yaWVzID0gaW5jb21lQ2F0ZWdvcmllcztcblxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgLmNvbnRyb2xsZXIoJ2xvZ2luQ29udHJvbGxlcicsIFtsb2dpbkNvbnRyb2xsZXJdKTtcbiAgICBsb2dpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2F0aW9uJywgJyRzY29wZSddO1xuICAgIGZ1bmN0aW9uIGxvZ2luQ29udHJvbGxlcigkbG9jYXRpb24sICRzY29wZSkge1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG4gICAgICAgIC8vIGRlYnVnZ2VyO1xuICAgICAgICAvLyB2bS5lcnJvciA9ICRsb2NhdGlvbjtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignbWFpbkNvbnRyb2xsZXInLCBtYWluQ29udHJvbGxlcik7XG5cbiAgICBtYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1xuICAgICAgICAnJGh0dHAnLFxuICAgICAgICAnJGludGVydmFsJyxcbiAgICAgICAgJyRtZERpYWxvZycsXG4gICAgICAgICckbWRNZWRpYScsXG4gICAgICAgICckc2NvcGUnLFxuICAgICAgICAnJHN0YXRlJyxcbiAgICAgICAgJ0F1dGgnLFxuICAgICAgICAnSG91c2Vob2xkJyxcbiAgICAgICAgJ1NlY3Rpb25zJ1xuICAgIF07XG5cbiAgICBmdW5jdGlvbiBtYWluQ29udHJvbGxlciAoJGh0dHAsICRpbnRlcnZhbCwgJG1kRGlhbG9nLCAkbWRNZWRpYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLCAkc3RhdGUsIEF1dGgsIEhvdXNlaG9sZCwgU2VjdGlvbnMpIHtcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG5cbiAgICAgICAgdm0uaG91c2Vob2xkID0gSG91c2Vob2xkLmdldCgpO1xuICAgICAgICB2bS5zY2hvb2xEaXN0cmljdCA9ICdPYWtsYW5kIFVuaWZpZWQgU2Nob29sIERpc3RyaWN0JztcblxuICAgICAgICB2bS5uYXZpZ2F0ZVRvTmV4dFNlY3Rpb24gPSBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb247XG4gICAgICAgIHZtLnN1Ym1pdEFwcGxpY2F0aW9uID0gc3VibWl0QXBwbGljYXRpb247XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICBmdW5jdGlvbiBhZGRDaGlsZChuZXdWYWwpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPiAkc2NvcGUuaG91c2Vob2xkLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRodHRwLmdldCgnL2NoaWxkJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Q2hpbGQgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaG91c2Vob2xkLmNoaWxkcmVuLnB1c2gobmV3Q2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBhZGRDaGlsZChuZXdWYWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzogTW92ZSB0byBtb25nb29zZSBtb2RlbFxuICAgICAgICB2YXIgSG91c2Vob2xkTWVtYmVyID0ge1xuICAgICAgICAgICAgaW5jb21lOiB7fVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gYWRkT3RoZXJNZW1iZXIobmV3VmFsKSB7XG4gICAgICAgICAgICB3aGlsZSAobmV3VmFsID4gJHNjb3BlLmhvdXNlaG9sZC5vdGhlck1lbWJlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhvdXNlaG9sZE1lbWJlciA9IE9iamVjdC5jcmVhdGUoSG91c2Vob2xkTWVtYmVyKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaG91c2Vob2xkLm90aGVyTWVtYmVycy5wdXNoKGhvdXNlaG9sZE1lbWJlcik7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG5hdmlnYXRlVG9OZXh0U2VjdGlvbigpIHtcbiAgICAgICAgICAgIEhvdXNlaG9sZC5zYXZlKCk7XG4gICAgICAgICAgICBTZWN0aW9ucy51cGRhdGVSZXF1aXJlZFNlY3Rpb25zKCRzY29wZS5ob3VzZWhvbGQpO1xuICAgICAgICAgICAgU2VjdGlvbnMubmF2aWdhdGVUb05leHQoJHN0YXRlLiRjdXJyZW50LnNlbGYubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdWJtaXRBcHBsaWNhdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5ob3VzZWhvbGQuY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG5hdmlnYXRlVG9OZXh0U2VjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2F0Y2hlcnNcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaG91c2Vob2xkLmNoaWxkQ291bnQnLCBhZGRDaGlsZCk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2hvdXNlaG9sZC5vdGhlck1lbWJlcnNDb3VudCcsIGFkZE90aGVyTWVtYmVyKTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignc2lkZU5hdkNvbnRyb2xsZXInLCBzaWRlTmF2Q29udHJvbGxlcik7XG5cbiAgICBzaWRlTmF2Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlJywgJ1NlY3Rpb25zJ107XG5cbiAgICBmdW5jdGlvbiBzaWRlTmF2Q29udHJvbGxlciAoJHNjb3BlLCAkc3RhdGUsIFNlY3Rpb25zKSB7XG4gICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cbiAgICAgICAgdmFyIHZtID0gJHNjb3BlO1xuXG4gICAgICAgIHZtLmN1cnJlbnRTdGF0ZSA9ICRzdGF0ZS4kY3VycmVudC5zZWxmLm5hbWU7XG4gICAgICAgIHZtLnNlY3Rpb25zID0gU2VjdGlvbnMuc2VjdGlvbnM7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLnNlcnZpY2UoJ0F1dGgnLCBBdXRoKTtcblxuICAgIEF1dGguJGluamVjdCA9IFsnJGh0dHAnXTtcblxuICAgIGZ1bmN0aW9uIEF1dGgoJGh0dHApIHtcblxuICAgICAgICB2YXIgdXNlciA9IGZhbHNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNpZ251cChlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvdXNlci9zaWdudXAnLCBkYXRhKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB1c2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gLmVycm9yKGZ1bmN0aW9uKGRhdGEpIHt9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9naW4oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvdXNlci9sb2dpbicsIGRhdGEpXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHVzZXIgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAuZXJyb3IoZnVuY3Rpb24oZGF0YSkge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9nb3V0KCkge1xuICAgICAgICAgICAgJGh0dHAucG9zdCgnL3VzZXIvbG9nb3V0Jykuc3VjY2VzcyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB1c2VyID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8vLy8vLy9cbiAgICAgICAgdmFyIHNlcnZpY2UgID0ge1xuICAgICAgICAgICAgbG9naW46IGxvZ2luLFxuICAgICAgICAgICAgbG9nb3V0OiBsb2dvdXQsXG4gICAgICAgICAgICB1c2VyOiB1c2VyXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLnNlcnZpY2UoJ0hvdXNlaG9sZCcsIGhvdXNlaG9sZFNlcnZpY2UpO1xuXG4gICAgaG91c2Vob2xkU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCddO1xuXG4gICAgZnVuY3Rpb24gaG91c2Vob2xkU2VydmljZSgkaHR0cCkge1xuICAgICAgICB0aGlzLmdldCA9IGdldDtcbiAgICAgICAgdGhpcy5zYXZlID0gc2F2ZTtcbiAgICAgICAgdGhpcy5jbGVhciA9IGNsZWFyO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgdmFyIGhvdXNlaG9sZDtcblxuICAgICAgICB2YXIgUGVyc29uID0ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNvbWVTb3VyY2VDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNvbWVTb3VyY2VzID0gW107XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFRvZG86IGNvbnNpZGVyIG1vdmluZyB0byBzZXJ2ZXI/P1xuICAgICAgICB2YXIgSG91c2Vob2xkID0ge1xuICAgICAgICAgICAgY2hpbGRDb3VudDogMCxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgICAgIG90aGVyTWVtYmVyc0NvdW50OiAwLFxuICAgICAgICAgICAgb3RoZXJNZW1iZXJzOiBbXSxcbiAgICAgICAgICAgIGNvbXBsZXRlZEFwcGxpY2F0aW9uOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIGlmIChob3VzZWhvbGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG91c2Vob2xkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaG91c2Vob2xkID0gT2JqZWN0LmNyZWF0ZShIb3VzZWhvbGQpO1xuICAgICAgICAgICAgcmV0dXJuIGhvdXNlaG9sZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2hvdXNlaG9sZCcsIGhvdXNlaG9sZCk7XG4gICAgICAgICAgICAvLyAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gICAgIGhvdXNlaG9sZCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICAgICAgICAgIHZhciBob3VzZWhvbGQgPSB7fTtcbiAgICAgICAgICAgIHJldHVybiBob3VzZWhvbGQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuc2VydmljZSgnU2VjdGlvbnMnLCBzZWN0aW9uc1NlcnZpY2UpO1xuXG4gICAgc2VjdGlvbnNTZXJ2aWNlLiRpbmplY3QgPSBbJyRyb290U2NvcGUnICwnJHN0YXRlJ107XG5cbiAgICBmdW5jdGlvbiBzZWN0aW9uc1NlcnZpY2UoJHJvb3RTY29wZSwgJHN0YXRlKSB7XG4gICAgICAgIHZhciBwcmV2aW91c1N0YXRlLFxuICAgICAgICAgICAgY3VycmVudFN0YXRlO1xuXG4gICAgICAgIHZhciBzZWN0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0dldHRpbmcgU3RhcnRlZCcsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSwgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDaGlsZHJlbicsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdjaGlsZHJlbicsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NoaWxkcmVuXFwncyBJbmNvbWUnLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnY2hpbGRJbmNvbWUnLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdIb3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnSG91c2Vob2xkIEluY29tZScsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdob3VzZWhvbGRJbmNvbWUnLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTaWduIGFuZCBDb25maXJtJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ3NpZ25hdHVyZScsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICB2YXIgaW5kZXhlZFNlY3Rpb25zID0gXy5pbmRleEJ5KHNlY3Rpb25zLCAnc3RhdGUnKTtcblxuICAgICAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgICAgIHNlY3Rpb25zOiBzZWN0aW9ucyxcbiAgICAgICAgICAgIGluZGV4ZWRTZWN0aW9uczogaW5kZXhlZFNlY3Rpb25zLFxuICAgICAgICAgICAgbmF2aWdhdGVUb05leHQ6IG5hdmlnYXRlVG9OZXh0LFxuICAgICAgICAgICAgdXBkYXRlUmVxdWlyZWRTZWN0aW9uczogdXBkYXRlUmVxdWlyZWRTZWN0aW9uc1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUmVxdWlyZWRTZWN0aW9ucyhob3VzZWhvbGQpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgYXNzaXN0YW5jZVByb2dyYW1Ib3VzZWhvbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBzcGVjaWFsU3RhdHVzQ291bnQgPSAwO1xuICAgICAgICAgICAgdmFyIHNraXBNZWFuc1Rlc3QgPSBmYWxzZTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgaG91c2Vob2xkLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudENoaWxkID0gaG91c2Vob2xkLmNoaWxkcmVuW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRDaGlsZC5hc3Npc3RhbmNlUHJvZ3JhbSAmJiBjdXJyZW50Q2hpbGQuYXNzaXN0YW5jZVByb2dyYW0ucGFydGljaXBhbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzaXN0YW5jZVByb2dyYW1Ib3VzZWhvbGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudENoaWxkLnNwZWNpYWxTdGF0dXMgJiYgKGN1cnJlbnRDaGlsZC5zcGVjaWFsU3RhdHVzLmZvc3RlckNoaWxkIHx8XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZC5zcGVjaWFsU3RhdHVzLmhvbWVsZXNzTWlncmFudFJ1bmF3YXkgfHxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENoaWxkLnNwZWNpYWxTdGF0dXMuaGVhZFN0YXJ0UGFydGljaXBhbnQpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWNpYWxTdGF0dXNDb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2tpcE1lYW5zVGVzdCA9IGFzc2lzdGFuY2VQcm9ncmFtSG91c2Vob2xkIHx8XG4gICAgICAgICAgICAgICAgKGhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgIGhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGggPT09IHNwZWNpYWxTdGF0dXNDb3VudCk7XG5cbiAgICAgICAgICAgIGlmIChza2lwTWVhbnNUZXN0KSB7XG4gICAgICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zWydjaGlsZEluY29tZSddLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zWydob3VzZWhvbGQnXS5yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGluZGV4ZWRTZWN0aW9uc1snaG91c2Vob2xkSW5jb21lJ10ucmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24ucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmROZXh0KGN1cnJlbnRTdGF0ZSkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IF8uZmluZEluZGV4KHNlY3Rpb25zLCBmdW5jdGlvbihzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb24uc3RhdGUgPT09IGN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBMb29rIGZvciB0aGUgbmV4dCByZXF1aXJlZCBzZWN0aW9uXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gY3VycmVudEluZGV4ICsgMTsgaSA8IHNlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlY3Rpb25zW2ldLnJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWN0aW9uc1tpXS5zdGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIHJlcXVpcmVkIHNlY3Rpb25zLCB3ZSdyZSBkb25lLlxuICAgICAgICAgICAgcmV0dXJuICdjb25maXJtYXRpb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbmF2aWdhdGVUb05leHQoY3VycmVudFN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgbmV4dFNlY3Rpb24gID0gZmluZE5leHQoY3VycmVudFN0YXRlKTtcbiAgICAgICAgICAgICRzdGF0ZS5nbyhuZXh0U2VjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGV2LCB0bywgdG9QYXJhbXMsIGZyb20sIGZyb21QYXJhbXMpIHtcbiAgICAgICAgICAgIHByZXZpb3VzU3RhdGUgPSBmcm9tLm5hbWU7XG4gICAgICAgICAgICBjdXJyZW50U3RhdGUgPSB0by5uYW1lO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1ByZXZpb3VzIHN0YXRlOicgKyBwcmV2aW91c1N0YXRlKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdDdXJyZW50IHN0YXRlOicgKyBjdXJyZW50U3RhdGUpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
