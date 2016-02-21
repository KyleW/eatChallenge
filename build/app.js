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
            .state('disclosure', {
                url: '/disclosure',
                views:{
                    'side-nav': {
                        templateUrl: '../views/sideNav.html',
                        controller: 'sideNavController'
                    },
                    'main': {
                        templateUrl: '../views/disclosure.html',
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
                label: 'Disclosure',
                state: 'disclosure',
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2V4cG9ydC5qcyIsImNvbnRyb2xsZXJzL2hvdXNlaG9sZEluY29tZS5qcyIsImNvbnRyb2xsZXJzL2xvZ2luLmpzIiwiY29udHJvbGxlcnMvbWFpbi5qcyIsImNvbnRyb2xsZXJzL3NpZGVuYXYuanMiLCJkaXJlY3RpdmVzL2luY29tZS5qcyIsImRpcmVjdGl2ZXMveWVzbm8uanMiLCJzZXJ2aWNlcy9hdXRoLmpzIiwic2VydmljZXMvaG91c2Vob2xkLmpzIiwic2VydmljZXMvc2VjdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcsWyduZ0Nvb2tpZXMnLCAnbmdDc3YnLCduZ01hdGVyaWFsJywgJ25nU2FuaXRpemUnLCAndWkucm91dGVyJ10pXG4gICAgLmNvbmZpZyhyb3V0ZXJDb25maWcpXG4gICAgLmNvbmZpZyhtYXRlcmlhbERlc2lnblRoZW1lcilcbiAgICAucnVuKGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcbiAgICAgICAgLy8gc2Nyb2xsIHRvIHRoZSB0b3Agb24gcGFnZSB0cmFuc2l0aW9uXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIG1hdGVyaWFsRGVzaWduVGhlbWVyLiRpbmplY3QgPSBbJyRtZFRoZW1pbmdQcm92aWRlciddO1xuICAgIGZ1bmN0aW9uIG1hdGVyaWFsRGVzaWduVGhlbWVyKCRtZFRoZW1pbmdQcm92aWRlcikge1xuICAgICAgICAvLyAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2xpZ2h0LWJsdWUnKTtcbiAgICAgICAgLy8gLnByaW1hcnlQYWxldHRlKCdwaW5rJywge1xuICAgICAgICAvLyAgICdkZWZhdWx0JzogJzQwMCcsIC8vIGJ5IGRlZmF1bHQgdXNlIHNoYWRlIDQwMCBmcm9tIHRoZSBwaW5rIHBhbGV0dGUgZm9yIHByaW1hcnkgaW50ZW50aW9uc1xuICAgICAgICAvLyAgICdodWUtMSc6ICcxMDAnLCAvLyB1c2Ugc2hhZGUgMTAwIGZvciB0aGUgPGNvZGU+bWQtaHVlLTE8L2NvZGU+IGNsYXNzXG4gICAgICAgIC8vICAgJ2h1ZS0yJzogJzYwMCcsIC8vIHVzZSBzaGFkZSA2MDAgZm9yIHRoZSA8Y29kZT5tZC1odWUtMjwvY29kZT4gY2xhc3NcbiAgICAgICAgLy8gICAnaHVlLTMnOiAnQTEwMCcgLy8gdXNlIHNoYWRlIEExMDAgZm9yIHRoZSA8Y29kZT5tZC1odWUtMzwvY29kZT4gY2xhc3NcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gLy8gSWYgeW91IHNwZWNpZnkgbGVzcyB0aGFuIGFsbCBvZiB0aGUga2V5cywgaXQgd2lsbCBpbmhlcml0IGZyb20gdGhlXG4gICAgICAgIC8vIC8vIGRlZmF1bHQgc2hhZGVzXG4gICAgICAgIC8vIC5hY2NlbnRQYWxldHRlKCdwdXJwbGUnLCB7XG4gICAgICAgIC8vICAgJ2RlZmF1bHQnOiAnMjAwJyAvLyB1c2Ugc2hhZGUgMjAwIGZvciBkZWZhdWx0LCBhbmQga2VlcCBhbGwgb3RoZXIgc2hhZGVzIHRoZSBzYW1lXG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIHJvdXRlckNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInXTtcblxuICAgIGZ1bmN0aW9uIHJvdXRlckNvbmZpZyAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAgIHJvdXRlcigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKTtcblxuICAgICAgICAvLy8vLy8vLy8vXG4gICAgICAgIGZ1bmN0aW9uIHJvdXRlcigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgICAgICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ3N0YXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc3RhcnQuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdjaGlsZHJlbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY2hpbGRyZW4nLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvY2hpbGRyZW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdjaGlsZEluY29tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY2hpbGRJbmNvbWUnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9jaGlsZEluY29tZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdob3VzZWhvbGQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2hvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9ob3VzZWhvbGQuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdob3VzZWhvbGRJbmNvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2hvdXNlaG9sZC1pbmNvbWUnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvaG91c2Vob2xkSW5jb21lLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvdXNlaG9sZEluY29tZSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2Rpc2Nsb3N1cmUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2Rpc2Nsb3N1cmUnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvZGlzY2xvc3VyZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3NpZ25hdHVyZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbmF0dXJlJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lnbmF0dXJlLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbmZpcm1hdGlvbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29uZmlybWF0aW9uJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvY29uZmlybWF0aW9uLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2V4cG9ydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwb3J0JyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9leHBvcnQuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZXhwb3J0Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3NpZ251cCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZ251cC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2xvZ2luLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3NvRmFyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zby1mYXInLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zb0Zhci5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdleHBvcnRDb250cm9sbGVyJywgZXhwb3J0Q29udHJvbGxlcik7XG5cbiAgICBleHBvcnRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRodHRwJywgJyRzY29wZSddO1xuXG4gICAgZnVuY3Rpb24gZXhwb3J0Q29udHJvbGxlcigkaHR0cCwgJHNjb3BlKSB7XG4gICAgICAgICRodHRwLmdldCgnL2hvdXNlaG9sZC9jb21wbGV0ZWQnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAkc2NvcGUuY29tcGxldGVkQXBwbGljYXRpb25zID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2hvdXNlaG9sZEluY29tZScsIGhvdXNlaG9sZEluY29tZSk7XG5cbiAgICBob3VzZWhvbGRJbmNvbWUuJGluamVjdCA9IFtcbiAgICAgICAgJyRzY29wZScsXG4gICAgICAgICckc3RhdGUnLFxuICAgICAgICAnQXV0aCcsXG4gICAgICAgICdIb3VzZWhvbGQnLFxuICAgICAgICAnU2VjdGlvbnMnXG4gICAgXTtcblxuICAgIGZ1bmN0aW9uIGhvdXNlaG9sZEluY29tZSAoJHNjb3BlLCAkc3RhdGUsIEF1dGgsIEhvdXNlaG9sZCwgU2VjdGlvbnMsIEhvdXNlaG9sZEluY29tZSkge1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG4gICAgICAgIHZhciBob3VzZWhvbGQgPSBIb3VzZWhvbGQuZ2V0KCk7XG5cbiAgICAgICAgdmFyIHdvcmsgPSB7XG4gICAgICAgICAgICBjYXRlZ29yeU5hbWU6ICd3b3JrJyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiAnV29yayBJbmNvbWUnLFxuICAgICAgICAgICAgcXVlc3Rpb246ICdlYXJuIG1vbmV5IHRocm91Z2ggd29yaycsXG4gICAgICAgICAgICBzb3VyY2VzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTond29yaycsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdXb3JrIG91dHNpZGUgdGhlIGhvbWUgaW4gYSBub24tbWlsaXRhcnkgY2FwYWNpdHkgJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0Vhcm5pbmdzIGZyb20gd29yaycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnUGxlYXNlIHJlcG9ydCBncm9zcyBpbmNvbWUuIFRoaXMgaXMgdGhlIGFtb3VudCBvZiBpbmNvbWUgZWFybmVkIGJlZm9yZSBhbnkgbW9uZXkgaXMgdGFrZW4gb3V0IGZvciB0YXhlcyBvciBkZWR1Y3Rpb25zLiBJbmNsdWRlIHNhbGFyeSwgd2FnZXMsIGFuZCBjYXNoIGJvbnVzZXMuJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTonc2VsZkVtcGxveWVkJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0Vhcm5pbmdzIGZyb20gc2VsZiBlbXBsb3ltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1NlbGYtZW1wbG95ZWQnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ0ZvciBob3VzZWhvbGQgbWVtYmVycyB0aGF0IGFyZSBzZWxmLWVtcGxveWVkLCByZXBvcnQgaW5jb21lIGZyb20gdGhhdCB3b3JrIGFzIGEgbmV0IGFtb3VudC4gVGhpcyBpcyBjYWxjdWxhdGVkIGJ5IHN1YnRyYWN0aW5nIHRoZSB0b3RhbCBvcGVyYXRpbmcgZXhwZW5zZXMgb2YgdGhlIGJ1c2luZXNzIGZyb20gaXRzIGdyb3NzIHJlY2VpcHRzIG9yIHJldmVudWUuJ1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOidvblN0cmlrZScsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdPbiBzdHJpa2UnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnU3RyaWtlIEJlbmVmaXRzJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGFkZCBzcGFjZSBmb3IgaG91c2luZyBhbGxvd2FuY2UgcGVyIGRvY1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTonbWlsaXRhcnknLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnSW4gdGhlIFUuUy4gbWlsaXRhcnknLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnQmFzaWMgcGF5IGFuZCBjYXNoIGJvbnVzZXMnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ1BsZWFzZSBkbyBub3QgaW5jbHVkZSBjb21iYXQgcGF5LCBGU1NBLCBvciBwcml2YXRlIGhvdXNpbmcgYWxsb3dhbmNlcy4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwdWJsaWNBc3Npc3RhbmNlID0ge1xuICAgICAgICAgICAgY2F0ZWdvcnlOYW1lOiAncHVibGljQXNzaXN0YW5jZScsXG4gICAgICAgICAgICBoZWFkbGluZTogJ1B1YmxpYyBBc3Npc3RhbmNlJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAncmVjZWl2ZSBhbnkgcHVibGljIGFzc2lzdGFuY2UgYmVuZWZpdHMnLFxuICAgICAgICAgICAgc291cmNlczpbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTondW5lbXBsb3ltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1VuZW1wbG95bWVudCBiZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdVbmVtcGxveW1lbnQgYmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J3dvcmtlcnNDb21wJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1dvcmtlcuKAmXMgY29tcGVuc2F0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1dvcmtlcuKAmXMgY29tcGVuc2F0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOidzc2knLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnU3VwcGxlbWVudGFsIFNlY3VyaXR5IEluY29tZSAoU1NJKScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdTdXBwbGVtZW50YWwgU2VjdXJpdHkgSW5jb21lIChTU0kpJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOidjYXNoQXNzaXN0YW5jZScsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdDYXNoIGFzc2lzdGFuY2UgZnJvbSBTdGF0ZSBvciBsb2NhbCBnb3Zlcm5tZW50JyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0Nhc2ggYXNzaXN0YW5jZScsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnVGhpcyBjb3VsZCBpbmNsdWRlIFRBTkYgb3IgR2VuZXJhbCBBc3Npc3RhbmNlIG1vbmV5LidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J3ZldGVyYW5zQmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnVmV0ZXJhbuKAmXMgYmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnVmV0ZXJhbuKAmXMgYmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJ1RoaXMgY291bGQgaW5jbHVkZSBUQU5GIG9yIEdlbmVyYWwgQXNzaXN0YW5jZSBtb25leSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGFsaW1vbnkgPSB7XG4gICAgICAgICAgICBjYXRlZ29yeU5hbWU6ICdhbGltb255JyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiAnQWxpbW9ueScsXG4gICAgICAgICAgICBxdWVzdGlvbjogJ3JlY2VpdmUgYWxpbW9ueSBwYXltZW50cycsXG4gICAgICAgICAgICBzb3VyY2VzOltcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAnYWxpbW9ueScsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdhbGltb255IHBheW1lbnRzJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0FsaW1vbnkgcGF5bWVudCcsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnSWYgaW5jb21lIGlzIHJlY2VpdmVkIGZyb20gY2hpbGQgc3VwcG9ydCBvciBhbGltb255LCBvbmx5IGNvdXJ0LW9yZGVyZWQgcGF5bWVudHMgc2hvdWxkIGJlIHJlcG9ydGVkIGhlcmUuIEluZm9ybWFsIGJ1dCByZWd1bGFyIHBheW1lbnRzIHNob3VsZCBiZSByZXBvcnRlZCBsYXRlciBhcyDigJxvdGhlcuKAnSBpbmNvbWUuJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgY2hpbGRTdXBwb3J0ID0ge1xuICAgICAgICAgICAgY2F0ZWdvcnlOYW1lOiAnY2hpbGRTdXBwb3J0JyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiAnQ2hpbGQgU3VwcG9ydCcsXG4gICAgICAgICAgICBxdWVzdGlvbjogJ3JlY2VpdmUgYW55IGNoaWxkIHN1cHBvcnQnLFxuICAgICAgICAgICAgc291cmNlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdjaGlsZFN1cHBvcnQnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnYW55IGNoaWxkIHN1cHBvcnQnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnQ2hpbGQgc3VwcG9ydCBwYXltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdJZiBpbmNvbWUgaXMgcmVjZWl2ZWQgZnJvbSBjaGlsZCBzdXBwb3J0IG9yIGNoaWxkU3VwcG9ydCwgb25seSBjb3VydC1vcmRlcmVkIHBheW1lbnRzIHNob3VsZCBiZSByZXBvcnRlZCBoZXJlLiBJbmZvcm1hbCBidXQgcmVndWxhciBwYXltZW50cyBzaG91bGQgYmUgcmVwb3J0ZWQgbGF0ZXIgYXMg4oCcb3RoZXLigJ0gaW5jb21lLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJldGlyZW1lbnQgPSB7XG4gICAgICAgICAgICBjYXRlZ29yeU5hbWU6ICdyZXRpcmVtZW50JyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiAnUGVuc2lvbiBhbmQgUmV0aXJlbWVudCcsXG4gICAgICAgICAgICBxdWVzdGlvbjogJ3JlY2VpdmUgYW55IHBlbnNpb24gb3IgcmV0aXJlbWVudCBtb25leScsXG4gICAgICAgICAgICBzb3VyY2VzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ3NvY2lhbFNlY3VyaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1NvY2lhbCBTZWN1cml0eSAoaW5jbHVkaW5nIHJhaWxyb2FkIHJldGlyZW1lbnQgYW5kIGJsYWNrIGx1bmcgYmVuZWZpdHMpJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1NvY2lhbCBzZWN1cml0eScsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnUGxlYXNlIGluY2x1ZGUgcmFpbHJvYWQgcmV0aXJlbWVudCBhbmQgYmxhY2sgbHVuZyBiZW5lZml0cydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdwcml2YXRlUGVuc2lvbicsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdQcml2YXRlIHBlbnNpb25zIG9yIGRpc2FiaWxpdHknLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnUHJpdmF0ZSBwZW5zaW9ucyBvciBkaXNhYmlsaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvdGhlckluY29tZSA9IHtcbiAgICAgICAgICAgIGNhdGVnb3J5TmFtZTogJ290aGVySW5jb21lJyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiAnT3RoZXIgSW5jb21lJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAncmVjaWV2ZSBtb25leSB0aHJvdWdoIGFueSBvdGhlciBzb3VyY2UnLFxuICAgICAgICAgICAgc291cmNlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICd0cnVzdHMnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnSW5jb21lIGZyb20gdHJ1c3RzIG9yIGVzdGF0ZXMnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnSW5jb21lIGZyb20gdHJ1c3RzIG9yIGVzdGF0ZXMnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdhbm51aXRpZXMnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnQW5udWl0aWVzJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0luY29tZSBmcm9tIGFubnVpdGllcycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ2ludmVzdG1lbnQnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnSW52ZXN0bWVudCBpbmNvbWUnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnSW52ZXN0bWVudCBpbmNvbWUnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdpbnRlcmVzdCcsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdFYXJuZWQgaW50ZXJlc3QnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnRWFybmVkIGludGVyZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAncmVudGFsSW5jb21lJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1JlbnRhbCBpbmNvbWUnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnUmVudGFsIGluY29tZScsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ290aGVyQ2FzaCcsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdSZWd1bGFyIGNhc2ggcGF5bWVudHMgZnJvbSBvdXRzaWRlIGhvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdSZWd1bGFyIGNhc2ggcGF5bWVudHMgZnJvbSBvdXRzaWRlIGhvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnU3VjaCBjYXNoIHBheW1lbnRzIHNob3VsZCBpbmNsdWRlIHJlZ3VsYXIgY2hpbGQgc3VwcG9ydCBvciBhbGltb255IHBheW1lbnRzIHJlY2VpdmVkIGJ5IHRoZSBob3VzZWhvbGQgdGhhdCBhcmUgbm90IGNvdXJ0LW9yZGVyZWQuJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gbmF2aWdhdGVUb05leHRTZWN0aW9uKCkge1xuICAgICAgICAgICAgSG91c2Vob2xkLnNhdmUoKTtcbiAgICAgICAgICAgIFNlY3Rpb25zLnVwZGF0ZVJlcXVpcmVkU2VjdGlvbnMoJHNjb3BlLmhvdXNlaG9sZCk7XG4gICAgICAgICAgICBTZWN0aW9ucy5uYXZpZ2F0ZVRvTmV4dCgkc3RhdGUuJGN1cnJlbnQuc2VsZi5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbmNvbWVDYXRlZ29yaWVzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaWNBc3Npc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGltb255LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZFN1cHBvcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGlyZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVySW5jb21lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICB2bS5ob3VzZWhvbGQgPSBob3VzZWhvbGQ7XG4gICAgICAgIHZtLm5hdmlnYXRlVG9OZXh0U2VjdGlvbiA9IG5hdmlnYXRlVG9OZXh0U2VjdGlvbjtcbiAgICAgICAgdm0uaW5jb21lQ2F0ZWdvcmllcyA9IGluY29tZUNhdGVnb3JpZXM7XG5cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgIC5jb250cm9sbGVyKCdsb2dpbkNvbnRyb2xsZXInLCBbbG9naW5Db250cm9sbGVyXSk7XG4gICAgbG9naW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2NhdGlvbicsICckc2NvcGUnXTtcbiAgICBmdW5jdGlvbiBsb2dpbkNvbnRyb2xsZXIoJGxvY2F0aW9uLCAkc2NvcGUpIHtcbiAgICAgICAgdmFyIHZtID0gJHNjb3BlO1xuICAgICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgICAgLy8gdm0uZXJyb3IgPSAkbG9jYXRpb247XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ21haW5Db250cm9sbGVyJywgbWFpbkNvbnRyb2xsZXIpO1xuXG4gICAgbWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcbiAgICAgICAgJyRodHRwJyxcbiAgICAgICAgJyRpbnRlcnZhbCcsXG4gICAgICAgICckbWREaWFsb2cnLFxuICAgICAgICAnJG1kTWVkaWEnLFxuICAgICAgICAnJHNjb3BlJyxcbiAgICAgICAgJyRzdGF0ZScsXG4gICAgICAgICdBdXRoJyxcbiAgICAgICAgJ0hvdXNlaG9sZCcsXG4gICAgICAgICdTZWN0aW9ucydcbiAgICBdO1xuXG4gICAgZnVuY3Rpb24gbWFpbkNvbnRyb2xsZXIgKCRodHRwLCAkaW50ZXJ2YWwsICRtZERpYWxvZywgJG1kTWVkaWEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZSwgJHN0YXRlLCBBdXRoLCBIb3VzZWhvbGQsIFNlY3Rpb25zKSB7XG4gICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cbiAgICAgICAgdmFyIHZtID0gJHNjb3BlO1xuXG4gICAgICAgIHZtLmhvdXNlaG9sZCA9IEhvdXNlaG9sZC5nZXQoKTtcbiAgICAgICAgdm0uc2Nob29sRGlzdHJpY3QgPSAnT2FrbGFuZCBVbmlmaWVkIFNjaG9vbCBEaXN0cmljdCc7XG5cbiAgICAgICAgdm0ubmF2aWdhdGVUb05leHRTZWN0aW9uID0gbmF2aWdhdGVUb05leHRTZWN0aW9uO1xuICAgICAgICB2bS5zdWJtaXRBcHBsaWNhdGlvbiA9IHN1Ym1pdEFwcGxpY2F0aW9uO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgZnVuY3Rpb24gYWRkQ2hpbGQobmV3VmFsKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsID4gJHNjb3BlLmhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy9jaGlsZCcpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0NoaWxkID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmhvdXNlaG9sZC5jaGlsZHJlbi5wdXNoKG5ld0NoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2hpbGQobmV3VmFsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IE1vdmUgdG8gbW9uZ29vc2UgbW9kZWxcbiAgICAgICAgdmFyIEhvdXNlaG9sZE1lbWJlciA9IHtcbiAgICAgICAgICAgIGluY29tZToge31cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGFkZE90aGVyTWVtYmVyKG5ld1ZhbCkge1xuICAgICAgICAgICAgd2hpbGUgKG5ld1ZhbCA+ICRzY29wZS5ob3VzZWhvbGQub3RoZXJNZW1iZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBob3VzZWhvbGRNZW1iZXIgPSBPYmplY3QuY3JlYXRlKEhvdXNlaG9sZE1lbWJlcik7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmhvdXNlaG9sZC5vdGhlck1lbWJlcnMucHVzaChob3VzZWhvbGRNZW1iZXIpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb24oKSB7XG4gICAgICAgICAgICBIb3VzZWhvbGQuc2F2ZSgpO1xuICAgICAgICAgICAgU2VjdGlvbnMudXBkYXRlUmVxdWlyZWRTZWN0aW9ucygkc2NvcGUuaG91c2Vob2xkKTtcbiAgICAgICAgICAgIFNlY3Rpb25zLm5hdmlnYXRlVG9OZXh0KCRzdGF0ZS4kY3VycmVudC5zZWxmLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc3VibWl0QXBwbGljYXRpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuaG91c2Vob2xkLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdhdGNoZXJzXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2hvdXNlaG9sZC5jaGlsZENvdW50JywgYWRkQ2hpbGQpO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdob3VzZWhvbGQub3RoZXJNZW1iZXJzQ291bnQnLCBhZGRPdGhlck1lbWJlcik7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ3NpZGVOYXZDb250cm9sbGVyJywgc2lkZU5hdkNvbnRyb2xsZXIpO1xuXG4gICAgc2lkZU5hdkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRzdGF0ZScsICdTZWN0aW9ucyddO1xuXG4gICAgZnVuY3Rpb24gc2lkZU5hdkNvbnRyb2xsZXIgKCRzY29wZSwgJHN0YXRlLCBTZWN0aW9ucykge1xuICAgICAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOiB0cnVlICovXG4gICAgICAgIHZhciB2bSA9ICRzY29wZTtcblxuICAgICAgICB2bS5jdXJyZW50U3RhdGUgPSAkc3RhdGUuJGN1cnJlbnQuc2VsZi5uYW1lO1xuICAgICAgICB2bS5zZWN0aW9ucyA9IFNlY3Rpb25zLnNlY3Rpb25zO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ2luY29tZVF1ZXN0aW9ucycsIGluY29tZURpcmVjdGl2ZSk7XG5cbiAgICBmdW5jdGlvbiBpbmNvbWVEaXJlY3RpdmUoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIG1lbWJlcjogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2luY29tZS5odG1sJyxcbiAgICAgICAgICAgIGxpbms6IGxpbmtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH1cblxuICAgIC8vIGxpbmsuJGluamVjdCA9IFsnc2NvcGUnXTtcblxuICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUpIHtcbiAgICAgICAgc2NvcGUuaW5jb21lU291cmNlcyA9IHtcbiAgICAgICAgICAgIHdvcms6IHtcbiAgICAgICAgICAgICAgICB2YXVsZTond29yaycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdFYXJuaW5ncyBmcm9tIHdvcmsnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdBIGNoaWxkIGhhcyBhIGpvYiB3aGVyZSB0aGV5IGVhcm4gc2FsYXJ5IG9yIHdhZ2VzLiBQbGVhc2UgcmVwb3J0IGdyb3NzIGluY29tZS4gVGhpcyBpcyB0aGUgYW1vdW50IG9mIGluY29tZSBlYXJuZWQgYmVmb3JlIGFueSBtb25leSBpcyB0YWtlbiBvdXQgZm9yIHRheGVzIG9yIGRlZHVjdGlvbnMuIEluY2x1ZGUgc2FsYXJ5LCB3YWdlcywgYW5kIGNhc2ggYm9udXNlcy4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvY2lhbFNlY3VyaXR5OiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J3NvY2lhbFNlY3VyaXR5JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1NvY2lhbCBTZWN1cml0eSBEaXNhYmlsaXR5IFBheW1lbnRzIG9yIFN1cnZpdm9y4oCZcyBCZW5lZml0cyAnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWydtb250aGx5J10sXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ0EgY2hpbGQgaXMgYmxpbmQgb3IgZGlzYWJsZWQgYW5kIHJlY2VpdmVzIFNvY2lhbCBTZWN1cml0eSBiZW5lZml0cy4nLFxuICAgICAgICAgICAgICAgICAgICAvLyAnIEEgcGFyZW50IGlzIGRpc2FibGVkLCByZXRpcmVkLCBvciBkZWNlYXNlZCwgYW5kIHRoZWlyIGNoaWxkIHJlY2VpdmVzIHNvY2lhbCBzZWN1cml0eSBiZW5lZml0cycsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3RoZXJQZXJzb246IHtcbiAgICAgICAgICAgICAgICB2YXVsZTonb3RoZXJQZXJzb24nLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnSW5jb21lIGZyb20gcGVyc29ucyBvdXRzaWRlIHRoZSBob3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdBIGZyaWVuZCBvciBleHRlbmRlZCBmYW1pbHkgbWVtYmVyIHJlZ3VsYXJseSBnaXZlcyBhIGNoaWxkIHNwZW5kaW5nIG1vbmV5LicsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3RoZXJTb3VyY2U6IHtcbiAgICAgICAgICAgICAgICB2YXVsZTonb3RoZXJTb3VyY2UnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnSW5jb21lIGZyb20gYW55IG90aGVyIHNvdXJjZScsXG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ0EgY2hpbGQgcmVjZWl2ZXMgaW5jb21lIGZyb20gYSBwcml2YXRlIHBlbnNpb24gZnVuZCwgYW5udWl0eSwgb3IgdHJ1c3QuJyxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc2NvcGUubWVtYmVyLmluY29tZVNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzY29wZS5tZW1iZXIuaW5jb21lU291cmNlcyA9IFtdO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoc2NvcGUuaW5jb21lU291cmNlcykuZm9yRWFjaChmdW5jdGlvbihpbmNvbWVTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5tZW1iZXIuaW5jb21lU291cmNlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogaW5jb21lU291cmNlLFxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuZGlyZWN0aXZlKCd5ZXNOb0lucHV0JywgeWVzTm9JbnB1dCk7XG5cbiAgICBmdW5jdGlvbiB5ZXNOb0lucHV0ICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgbW9kZWw6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy95ZXNuby5odG1sJyxcbiAgICAgICAgfTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuc2VydmljZSgnQXV0aCcsIEF1dGgpO1xuXG4gICAgQXV0aC4kaW5qZWN0ID0gWyckaHR0cCddO1xuXG4gICAgZnVuY3Rpb24gQXV0aCgkaHR0cCkge1xuXG4gICAgICAgIHZhciB1c2VyID0gZmFsc2U7XG5cbiAgICAgICAgZnVuY3Rpb24gc2lnbnVwKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwLnBvc3QoJy91c2VyL3NpZ251cCcsIGRhdGEpXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHVzZXIgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAuZXJyb3IoZnVuY3Rpb24oZGF0YSkge30pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dpbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy91c2VyL2xvZ2luJywgZGF0YSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdXNlciA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIC5lcnJvcihmdW5jdGlvbihkYXRhKSB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvdXNlci9sb2dvdXQnKS5zdWNjZXNzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHVzZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLy8vLy8vL1xuICAgICAgICB2YXIgc2VydmljZSAgPSB7XG4gICAgICAgICAgICBsb2dpbjogbG9naW4sXG4gICAgICAgICAgICBsb2dvdXQ6IGxvZ291dCxcbiAgICAgICAgICAgIHVzZXI6IHVzZXJcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuc2VydmljZSgnSG91c2Vob2xkJywgaG91c2Vob2xkU2VydmljZSk7XG5cbiAgICBob3VzZWhvbGRTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XG5cbiAgICBmdW5jdGlvbiBob3VzZWhvbGRTZXJ2aWNlKCRodHRwKSB7XG4gICAgICAgIHRoaXMuZ2V0ID0gZ2V0O1xuICAgICAgICB0aGlzLnNhdmUgPSBzYXZlO1xuICAgICAgICB0aGlzLmNsZWFyID0gY2xlYXI7XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICB2YXIgaG91c2Vob2xkO1xuXG4gICAgICAgIHZhciBQZXJzb24gPSB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluY29tZVNvdXJjZUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmluY29tZVNvdXJjZXMgPSBbXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVG9kbzogY29uc2lkZXIgbW92aW5nIHRvIHNlcnZlcj8/XG4gICAgICAgIHZhciBIb3VzZWhvbGQgPSB7XG4gICAgICAgICAgICBjaGlsZENvdW50OiAwLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgICAgb3RoZXJNZW1iZXJzQ291bnQ6IDAsXG4gICAgICAgICAgICBvdGhlck1lbWJlcnM6IFtdLFxuICAgICAgICAgICAgY29tcGxldGVkQXBwbGljYXRpb246IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgaWYgKGhvdXNlaG9sZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3VzZWhvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBob3VzZWhvbGQgPSBPYmplY3QuY3JlYXRlKEhvdXNlaG9sZCk7XG4gICAgICAgICAgICByZXR1cm4gaG91c2Vob2xkO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2F2ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvaG91c2Vob2xkJywgaG91c2Vob2xkKTtcbiAgICAgICAgICAgIC8vIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyAgICAgaG91c2Vob2xkID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgICAgICAgICAgdmFyIGhvdXNlaG9sZCA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIGhvdXNlaG9sZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5zZXJ2aWNlKCdTZWN0aW9ucycsIHNlY3Rpb25zU2VydmljZSk7XG5cbiAgICBzZWN0aW9uc1NlcnZpY2UuJGluamVjdCA9IFsnJHJvb3RTY29wZScgLCckc3RhdGUnXTtcblxuICAgIGZ1bmN0aW9uIHNlY3Rpb25zU2VydmljZSgkcm9vdFNjb3BlLCAkc3RhdGUpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzU3RhdGUsXG4gICAgICAgICAgICBjdXJyZW50U3RhdGU7XG5cbiAgICAgICAgdmFyIHNlY3Rpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnR2V0dGluZyBTdGFydGVkJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LCAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2hpbGRyZW5cXCdzIEluY29tZScsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdjaGlsZEluY29tZScsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0hvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdob3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdIb3VzZWhvbGQgSW5jb21lJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2hvdXNlaG9sZEluY29tZScsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0Rpc2Nsb3N1cmUnLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnZGlzY2xvc3VyZScsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1NpZ24gYW5kIENvbmZpcm0nLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnc2lnbmF0dXJlJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHZhciBpbmRleGVkU2VjdGlvbnMgPSBfLmluZGV4Qnkoc2VjdGlvbnMsICdzdGF0ZScpO1xuXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICAgICAgc2VjdGlvbnM6IHNlY3Rpb25zLFxuICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zOiBpbmRleGVkU2VjdGlvbnMsXG4gICAgICAgICAgICBuYXZpZ2F0ZVRvTmV4dDogbmF2aWdhdGVUb05leHQsXG4gICAgICAgICAgICB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zOiB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zKGhvdXNlaG9sZCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRDaGlsZDtcbiAgICAgICAgICAgIHZhciBhc3Npc3RhbmNlUHJvZ3JhbUhvdXNlaG9sZCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHNwZWNpYWxTdGF0dXNDb3VudCA9IDA7XG4gICAgICAgICAgICB2YXIgc2tpcE1lYW5zVGVzdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCBob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQgPSBob3VzZWhvbGQuY2hpbGRyZW5baV07XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudENoaWxkLmFzc2lzdGFuY2VQcm9ncmFtICYmIGN1cnJlbnRDaGlsZC5hc3Npc3RhbmNlUHJvZ3JhbS5wYXJ0aWNpcGFudCkge1xuICAgICAgICAgICAgICAgICAgICBhc3Npc3RhbmNlUHJvZ3JhbUhvdXNlaG9sZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cyAmJiAoY3VycmVudENoaWxkLnNwZWNpYWxTdGF0dXMuZm9zdGVyQ2hpbGQgfHxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENoaWxkLnNwZWNpYWxTdGF0dXMuaG9tZWxlc3NNaWdyYW50UnVuYXdheSB8fFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5oZWFkU3RhcnRQYXJ0aWNpcGFudClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgc3BlY2lhbFN0YXR1c0NvdW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBza2lwTWVhbnNUZXN0ID0gYXNzaXN0YW5jZVByb2dyYW1Ib3VzZWhvbGQgfHxcbiAgICAgICAgICAgICAgICAoaG91c2Vob2xkLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgaG91c2Vob2xkLmNoaWxkcmVuLmxlbmd0aCA9PT0gc3BlY2lhbFN0YXR1c0NvdW50KTtcblxuICAgICAgICAgICAgaWYgKHNraXBNZWFuc1Rlc3QpIHtcbiAgICAgICAgICAgICAgICBpbmRleGVkU2VjdGlvbnNbJ2NoaWxkSW5jb21lJ10ucmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbmRleGVkU2VjdGlvbnNbJ2hvdXNlaG9sZCddLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zWydob3VzZWhvbGRJbmNvbWUnXS5yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZmluZE5leHQoY3VycmVudFN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gXy5maW5kSW5kZXgoc2VjdGlvbnMsIGZ1bmN0aW9uKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VjdGlvbi5zdGF0ZSA9PT0gY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIExvb2sgZm9yIHRoZSBuZXh0IHJlcXVpcmVkIHNlY3Rpb25cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBjdXJyZW50SW5kZXggKyAxOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VjdGlvbnNbaV0ucmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25zW2ldLnN0YXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgcmVxdWlyZWQgc2VjdGlvbnMsIHdlJ3JlIGRvbmUuXG4gICAgICAgICAgICByZXR1cm4gJ2NvbmZpcm1hdGlvbic7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBuYXZpZ2F0ZVRvTmV4dChjdXJyZW50U3RhdGUpIHtcbiAgICAgICAgICAgIHZhciBuZXh0U2VjdGlvbiAgPSBmaW5kTmV4dChjdXJyZW50U3RhdGUpO1xuICAgICAgICAgICAgJHN0YXRlLmdvKG5leHRTZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXYsIHRvLCB0b1BhcmFtcywgZnJvbSwgZnJvbVBhcmFtcykge1xuICAgICAgICAgICAgcHJldmlvdXNTdGF0ZSA9IGZyb20ubmFtZTtcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IHRvLm5hbWU7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnUHJldmlvdXMgc3RhdGU6JyArIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0N1cnJlbnQgc3RhdGU6JyArIGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
