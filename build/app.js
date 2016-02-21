(function() {
    'use strict';

    angular
    .module('eatChallengeApp',['ngCookies', 'ngCsv','ngMaterial', 'ngSanitize', 'ui.router'])
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
                    checkboxLabel: 'On Strike',
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
                    annotation: 'This could include TANF or General Assistance money'
                },
                {
                    vaule:'veteransBenefits',
                    checkboxLabel: 'Veteran’s benefits',
                    shortLabel: 'Veteran’s benefits',
                    frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                    annotation: 'This could include TANF or General Assistance money'
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
                annotation: 'A child has a job where they earn salary or wages ',
                
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
                annotation: 'A friend or extended family member regularly gives a child spending money',
                
            },
            otherSource: {
                vaule:'otherSource',
                label: 'Income from any other source',
                frequency: ['weekly', 'biweekly', '2x month', 'monthly'],
                annotation: 'A child receives income from a private pension fund, annuity, or trust',
                
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2V4cG9ydC5qcyIsImNvbnRyb2xsZXJzL2hvdXNlaG9sZEluY29tZS5qcyIsImNvbnRyb2xsZXJzL2xvZ2luLmpzIiwiY29udHJvbGxlcnMvbWFpbi5qcyIsImNvbnRyb2xsZXJzL3NpZGVuYXYuanMiLCJzZXJ2aWNlcy9hdXRoLmpzIiwic2VydmljZXMvaG91c2Vob2xkLmpzIiwic2VydmljZXMvc2VjdGlvbnMuanMiLCJkaXJlY3RpdmVzL2luY29tZS5qcyIsImRpcmVjdGl2ZXMveWVzbm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnLFsnbmdDb29raWVzJywgJ25nQ3N2JywnbmdNYXRlcmlhbCcsICduZ1Nhbml0aXplJywgJ3VpLnJvdXRlciddKVxuICAgIC5jb25maWcocm91dGVyQ29uZmlnKVxuICAgIC5jb25maWcobWF0ZXJpYWxEZXNpZ25UaGVtZXIpO1xuXG4gICAgbWF0ZXJpYWxEZXNpZ25UaGVtZXIuJGluamVjdCA9IFsnJG1kVGhlbWluZ1Byb3ZpZGVyJ107XG4gICAgZnVuY3Rpb24gbWF0ZXJpYWxEZXNpZ25UaGVtZXIoJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XG4gICAgICAgIC8vICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbGlnaHQtYmx1ZScpO1xuICAgICAgICAvLyAucHJpbWFyeVBhbGV0dGUoJ3BpbmsnLCB7XG4gICAgICAgIC8vICAgJ2RlZmF1bHQnOiAnNDAwJywgLy8gYnkgZGVmYXVsdCB1c2Ugc2hhZGUgNDAwIGZyb20gdGhlIHBpbmsgcGFsZXR0ZSBmb3IgcHJpbWFyeSBpbnRlbnRpb25zXG4gICAgICAgIC8vICAgJ2h1ZS0xJzogJzEwMCcsIC8vIHVzZSBzaGFkZSAxMDAgZm9yIHRoZSA8Y29kZT5tZC1odWUtMTwvY29kZT4gY2xhc3NcbiAgICAgICAgLy8gICAnaHVlLTInOiAnNjAwJywgLy8gdXNlIHNoYWRlIDYwMCBmb3IgdGhlIDxjb2RlPm1kLWh1ZS0yPC9jb2RlPiBjbGFzc1xuICAgICAgICAvLyAgICdodWUtMyc6ICdBMTAwJyAvLyB1c2Ugc2hhZGUgQTEwMCBmb3IgdGhlIDxjb2RlPm1kLWh1ZS0zPC9jb2RlPiBjbGFzc1xuICAgICAgICAvLyB9KVxuICAgICAgICAvLyAvLyBJZiB5b3Ugc3BlY2lmeSBsZXNzIHRoYW4gYWxsIG9mIHRoZSBrZXlzLCBpdCB3aWxsIGluaGVyaXQgZnJvbSB0aGVcbiAgICAgICAgLy8gLy8gZGVmYXVsdCBzaGFkZXNcbiAgICAgICAgLy8gLmFjY2VudFBhbGV0dGUoJ3B1cnBsZScsIHtcbiAgICAgICAgLy8gICAnZGVmYXVsdCc6ICcyMDAnIC8vIHVzZSBzaGFkZSAyMDAgZm9yIGRlZmF1bHQsIGFuZCBrZWVwIGFsbCBvdGhlciBzaGFkZXMgdGhlIHNhbWVcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgcm91dGVyQ29uZmlnLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlciddO1xuXG4gICAgZnVuY3Rpb24gcm91dGVyQ29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgcm91dGVyKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpO1xuXG4gICAgICAgIC8vLy8vLy8vLy9cbiAgICAgICAgZnVuY3Rpb24gcm91dGVyKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAgICAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zdGFydC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2NoaWxkcmVuJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jaGlsZHJlbicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9jaGlsZHJlbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2NoaWxkSW5jb21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jaGlsZEluY29tZScsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2NoaWxkSW5jb21lLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2hvdXNlaG9sZCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2hvdXNlaG9sZC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2hvdXNlaG9sZEluY29tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaG91c2Vob2xkLWluY29tZScsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9ob3VzZWhvbGRJbmNvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG91c2Vob2xkSW5jb21lJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnc2lnbmF0dXJlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zaWduYXR1cmUnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWduYXR1cmUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnY29uZmlybWF0aW9uJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9jb25maXJtYXRpb24nLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9jb25maXJtYXRpb24uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnZXhwb3J0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9leHBvcnQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2V4cG9ydC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdleHBvcnRDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnc2lnbnVwJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lnbnVwLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9naW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnc29GYXInLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3NvLWZhcicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NvRmFyLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2V4cG9ydENvbnRyb2xsZXInLCBleHBvcnRDb250cm9sbGVyKTtcblxuICAgIGV4cG9ydENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGh0dHAnLCAnJHNjb3BlJ107XG5cbiAgICBmdW5jdGlvbiBleHBvcnRDb250cm9sbGVyKCRodHRwLCAkc2NvcGUpIHtcbiAgICAgICAgJGh0dHAuZ2V0KCcvaG91c2Vob2xkL2NvbXBsZXRlZCcpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICRzY29wZS5jb21wbGV0ZWRBcHBsaWNhdGlvbnMgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignaG91c2Vob2xkSW5jb21lJywgaG91c2Vob2xkSW5jb21lKTtcblxuICAgIGhvdXNlaG9sZEluY29tZS4kaW5qZWN0ID0gW1xuICAgICAgICAnJHNjb3BlJyxcbiAgICAgICAgJyRzdGF0ZScsXG4gICAgICAgICdBdXRoJyxcbiAgICAgICAgJ0hvdXNlaG9sZCcsXG4gICAgICAgICdTZWN0aW9ucydcbiAgICBdO1xuXG4gICAgZnVuY3Rpb24gaG91c2Vob2xkSW5jb21lICgkc2NvcGUsICRzdGF0ZSwgQXV0aCwgSG91c2Vob2xkLCBTZWN0aW9ucywgSG91c2Vob2xkSW5jb21lKSB7XG4gICAgICAgIHZhciB2bSA9ICRzY29wZTtcbiAgICAgICAgdmFyIGhvdXNlaG9sZCA9IEhvdXNlaG9sZC5nZXQoKTtcblxuICAgICAgICB2YXIgd29yayA9IHtcbiAgICAgICAgICAgIGNhdGVnb3J5TmFtZTogJ3dvcmsnLFxuICAgICAgICAgICAgaGVhZGxpbmU6ICdXb3JrIEluY29tZScsXG4gICAgICAgICAgICBxdWVzdGlvbjogJ2Vhcm4gbW9uZXkgdGhyb3VnaCB3b3JrJyxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOid3b3JrJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1dvcmsgb3V0c2lkZSB0aGUgaG9tZSBpbiBhIG5vbi1taWxpdGFyeSBjYXBhY2l0eSAnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnRWFybmluZ3MgZnJvbSB3b3JrJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdQbGVhc2UgcmVwb3J0IGdyb3NzIGluY29tZS4gVGhpcyBpcyB0aGUgYW1vdW50IG9mIGluY29tZSBlYXJuZWQgYmVmb3JlIGFueSBtb25leSBpcyB0YWtlbiBvdXQgZm9yIHRheGVzIG9yIGRlZHVjdGlvbnMuIEluY2x1ZGUgc2FsYXJ5LCB3YWdlcywgYW5kIGNhc2ggYm9udXNlcy4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOidzZWxmRW1wbG95ZWQnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnRWFybmluZ3MgZnJvbSBzZWxmIGVtcGxveW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnU2VsZi1lbXBsb3llZCcsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnRm9yIGhvdXNlaG9sZCBtZW1iZXJzIHRoYXQgYXJlIHNlbGYtZW1wbG95ZWQsIHJlcG9ydCBpbmNvbWUgZnJvbSB0aGF0IHdvcmsgYXMgYSBuZXQgYW1vdW50LiBUaGlzIGlzIGNhbGN1bGF0ZWQgYnkgc3VidHJhY3RpbmcgdGhlIHRvdGFsIG9wZXJhdGluZyBleHBlbnNlcyBvZiB0aGUgYnVzaW5lc3MgZnJvbSBpdHMgZ3Jvc3MgcmVjZWlwdHMgb3IgcmV2ZW51ZS4nXG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J29uU3RyaWtlJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ09uIFN0cmlrZScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdTdHJpa2UgQmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjpcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYWRkIHNwYWNlIGZvciBob3VzaW5nIGFsbG93YW5jZSBwZXIgZG9jXG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOidtaWxpdGFyeScsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdJbiB0aGUgVS5TLiBtaWxpdGFyeScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdCYXNpYyBwYXkgYW5kIGNhc2ggYm9udXNlcycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnUGxlYXNlIGRvIG5vdCBpbmNsdWRlIGNvbWJhdCBwYXksIEZTU0EsIG9yIHByaXZhdGUgaG91c2luZyBhbGxvd2FuY2VzLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHB1YmxpY0Fzc2lzdGFuY2UgPSB7XG4gICAgICAgICAgICBjYXRlZ29yeU5hbWU6ICdwdWJsaWNBc3Npc3RhbmNlJyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiAnUHVibGljIEFzc2lzdGFuY2UnLFxuICAgICAgICAgICAgcXVlc3Rpb246ICdyZWNlaXZlIGFueSBwdWJsaWMgYXNzaXN0YW5jZSBiZW5lZml0cycsXG4gICAgICAgICAgICBzb3VyY2VzOltcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOid1bmVtcGxveW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnVW5lbXBsb3ltZW50IGJlbmVmaXRzJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1VuZW1wbG95bWVudCBiZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTond29ya2Vyc0NvbXAnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnV29ya2Vy4oCZcyBjb21wZW5zYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnV29ya2Vy4oCZcyBjb21wZW5zYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J3NzaScsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdTdXBwbGVtZW50YWwgU2VjdXJpdHkgSW5jb21lIChTU0kpJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1N1cHBsZW1lbnRhbCBTZWN1cml0eSBJbmNvbWUgKFNTSSknLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J2Nhc2hBc3Npc3RhbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ0Nhc2ggYXNzaXN0YW5jZSBmcm9tIFN0YXRlIG9yIGxvY2FsIGdvdmVybm1lbnQnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnQ2FzaCBhc3Npc3RhbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdUaGlzIGNvdWxkIGluY2x1ZGUgVEFORiBvciBHZW5lcmFsIEFzc2lzdGFuY2UgbW9uZXknXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOid2ZXRlcmFuc0JlbmVmaXRzJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1ZldGVyYW7igJlzIGJlbmVmaXRzJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1ZldGVyYW7igJlzIGJlbmVmaXRzJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdUaGlzIGNvdWxkIGluY2x1ZGUgVEFORiBvciBHZW5lcmFsIEFzc2lzdGFuY2UgbW9uZXknXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBhbGltb255ID0ge1xuICAgICAgICAgICAgY2F0ZWdvcnlOYW1lOiAnYWxpbW9ueScsXG4gICAgICAgICAgICBoZWFkbGluZTogJ0FsaW1vbnknLFxuICAgICAgICAgICAgcXVlc3Rpb246ICdyZWNlaXZlIGFsaW1vbnkgcGF5bWVudHMnLFxuICAgICAgICAgICAgc291cmNlczpbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ2FsaW1vbnknLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnYWxpbW9ueSBwYXltZW50cycsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdBbGltb255IHBheW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ0lmIGluY29tZSBpcyByZWNlaXZlZCBmcm9tIGNoaWxkIHN1cHBvcnQgb3IgYWxpbW9ueSwgb25seSBjb3VydC1vcmRlcmVkIHBheW1lbnRzIHNob3VsZCBiZSByZXBvcnRlZCBoZXJlLiBJbmZvcm1hbCBidXQgcmVndWxhciBwYXltZW50cyBzaG91bGQgYmUgcmVwb3J0ZWQgbGF0ZXIgYXMg4oCcb3RoZXLigJ0gaW5jb21lLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNoaWxkU3VwcG9ydCA9IHtcbiAgICAgICAgICAgIGNhdGVnb3J5TmFtZTogJ2NoaWxkU3VwcG9ydCcsXG4gICAgICAgICAgICBoZWFkbGluZTogJ0NoaWxkIFN1cHBvcnQnLFxuICAgICAgICAgICAgcXVlc3Rpb246ICdyZWNlaXZlIGFueSBjaGlsZCBzdXBwb3J0JyxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAnY2hpbGRTdXBwb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ2FueSBjaGlsZCBzdXBwb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0NoaWxkIHN1cHBvcnQgcGF5bWVudCcsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnSWYgaW5jb21lIGlzIHJlY2VpdmVkIGZyb20gY2hpbGQgc3VwcG9ydCBvciBjaGlsZFN1cHBvcnQsIG9ubHkgY291cnQtb3JkZXJlZCBwYXltZW50cyBzaG91bGQgYmUgcmVwb3J0ZWQgaGVyZS4gSW5mb3JtYWwgYnV0IHJlZ3VsYXIgcGF5bWVudHMgc2hvdWxkIGJlIHJlcG9ydGVkIGxhdGVyIGFzIOKAnG90aGVy4oCdIGluY29tZS4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciByZXRpcmVtZW50ID0ge1xuICAgICAgICAgICAgY2F0ZWdvcnlOYW1lOiAncmV0aXJlbWVudCcsXG4gICAgICAgICAgICBoZWFkbGluZTogJ1BlbnNpb24gYW5kIFJldGlyZW1lbnQnLFxuICAgICAgICAgICAgcXVlc3Rpb246ICdyZWNlaXZlIGFueSBwZW5zaW9uIG9yIHJldGlyZW1lbnQgbW9uZXknLFxuICAgICAgICAgICAgc291cmNlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdzb2NpYWxTZWN1cml0eScsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdTb2NpYWwgU2VjdXJpdHkgKGluY2x1ZGluZyByYWlscm9hZCByZXRpcmVtZW50IGFuZCBibGFjayBsdW5nIGJlbmVmaXRzKScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdTb2NpYWwgc2VjdXJpdHknLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ1BsZWFzZSBpbmNsdWRlIHJhaWxyb2FkIHJldGlyZW1lbnQgYW5kIGJsYWNrIGx1bmcgYmVuZWZpdHMnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAncHJpdmF0ZVBlbnNpb24nLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnUHJpdmF0ZSBwZW5zaW9ucyBvciBkaXNhYmlsaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1ByaXZhdGUgcGVuc2lvbnMgb3IgZGlzYWJpbGl0eScsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb3RoZXJJbmNvbWUgPSB7XG4gICAgICAgICAgICBjYXRlZ29yeU5hbWU6ICdvdGhlckluY29tZScsXG4gICAgICAgICAgICBoZWFkbGluZTogJ090aGVyIEluY29tZScsXG4gICAgICAgICAgICBxdWVzdGlvbjogJ3JlY2lldmUgbW9uZXkgdGhyb3VnaCBhbnkgb3RoZXIgc291cmNlJyxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAndHJ1c3RzJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ0luY29tZSBmcm9tIHRydXN0cyBvciBlc3RhdGVzJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0luY29tZSBmcm9tIHRydXN0cyBvciBlc3RhdGVzJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAnYW5udWl0aWVzJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ0FubnVpdGllcycsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdJbmNvbWUgZnJvbSBhbm51aXRpZXMnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdpbnZlc3RtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ0ludmVzdG1lbnQgaW5jb21lJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0ludmVzdG1lbnQgaW5jb21lJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAnaW50ZXJlc3QnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnRWFybmVkIGludGVyZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0Vhcm5lZCBpbnRlcmVzdCcsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ3JlbnRhbEluY29tZScsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdSZW50YWwgaW5jb21lJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1JlbnRhbCBpbmNvbWUnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdvdGhlckNhc2gnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnUmVndWxhciBjYXNoIHBheW1lbnRzIGZyb20gb3V0c2lkZSBob3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnUmVndWxhciBjYXNoIHBheW1lbnRzIGZyb20gb3V0c2lkZSBob3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ1N1Y2ggY2FzaCBwYXltZW50cyBzaG91bGQgaW5jbHVkZSByZWd1bGFyIGNoaWxkIHN1cHBvcnQgb3IgYWxpbW9ueSBwYXltZW50cyByZWNlaXZlZCBieSB0aGUgaG91c2Vob2xkIHRoYXQgYXJlIG5vdCBjb3VydC1vcmRlcmVkLidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIG5hdmlnYXRlVG9OZXh0U2VjdGlvbigpIHtcbiAgICAgICAgICAgIEhvdXNlaG9sZC5zYXZlKCk7XG4gICAgICAgICAgICBTZWN0aW9ucy51cGRhdGVSZXF1aXJlZFNlY3Rpb25zKCRzY29wZS5ob3VzZWhvbGQpO1xuICAgICAgICAgICAgU2VjdGlvbnMubmF2aWdhdGVUb05leHQoJHN0YXRlLiRjdXJyZW50LnNlbGYubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5jb21lQ2F0ZWdvcmllcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29yayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGljQXNzaXN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpbW9ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRTdXBwb3J0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRpcmVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckluY29tZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgICAgdm0uaG91c2Vob2xkID0gaG91c2Vob2xkO1xuICAgICAgICB2bS5uYXZpZ2F0ZVRvTmV4dFNlY3Rpb24gPSBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb247XG4gICAgICAgIHZtLmluY29tZUNhdGVnb3JpZXMgPSBpbmNvbWVDYXRlZ29yaWVzO1xuXG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAuY29udHJvbGxlcignbG9naW5Db250cm9sbGVyJywgW2xvZ2luQ29udHJvbGxlcl0pO1xuICAgIGxvZ2luQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnJHNjb3BlJ107XG4gICAgZnVuY3Rpb24gbG9naW5Db250cm9sbGVyKCRsb2NhdGlvbiwgJHNjb3BlKSB7XG4gICAgICAgIHZhciB2bSA9ICRzY29wZTtcbiAgICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAgIC8vIHZtLmVycm9yID0gJGxvY2F0aW9uO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdtYWluQ29udHJvbGxlcicsIG1haW5Db250cm9sbGVyKTtcblxuICAgIG1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbXG4gICAgICAgICckaHR0cCcsXG4gICAgICAgICckaW50ZXJ2YWwnLFxuICAgICAgICAnJG1kRGlhbG9nJyxcbiAgICAgICAgJyRtZE1lZGlhJyxcbiAgICAgICAgJyRzY29wZScsXG4gICAgICAgICckc3RhdGUnLFxuICAgICAgICAnQXV0aCcsXG4gICAgICAgICdIb3VzZWhvbGQnLFxuICAgICAgICAnU2VjdGlvbnMnXG4gICAgXTtcblxuICAgIGZ1bmN0aW9uIG1haW5Db250cm9sbGVyICgkaHR0cCwgJGludGVydmFsLCAkbWREaWFsb2csICRtZE1lZGlhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUsICRzdGF0ZSwgQXV0aCwgSG91c2Vob2xkLCBTZWN0aW9ucykge1xuICAgICAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOiB0cnVlICovXG4gICAgICAgIHZhciB2bSA9ICRzY29wZTtcblxuICAgICAgICB2bS5ob3VzZWhvbGQgPSBIb3VzZWhvbGQuZ2V0KCk7XG4gICAgICAgIHZtLnNjaG9vbERpc3RyaWN0ID0gJ09ha2xhbmQgVW5pZmllZCBTY2hvb2wgRGlzdHJpY3QnO1xuXG4gICAgICAgIHZtLm5hdmlnYXRlVG9OZXh0U2VjdGlvbiA9IG5hdmlnYXRlVG9OZXh0U2VjdGlvbjtcbiAgICAgICAgdm0uc3VibWl0QXBwbGljYXRpb24gPSBzdWJtaXRBcHBsaWNhdGlvbjtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIGZ1bmN0aW9uIGFkZENoaWxkKG5ld1ZhbCkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbCA+ICRzY29wZS5ob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcvY2hpbGQnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdDaGlsZCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5ob3VzZWhvbGQuY2hpbGRyZW4ucHVzaChuZXdDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZENoaWxkKG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiBNb3ZlIHRvIG1vbmdvb3NlIG1vZGVsXG4gICAgICAgIHZhciBIb3VzZWhvbGRNZW1iZXIgPSB7XG4gICAgICAgICAgICBpbmNvbWU6IHt9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBhZGRPdGhlck1lbWJlcihuZXdWYWwpIHtcbiAgICAgICAgICAgIHdoaWxlIChuZXdWYWwgPiAkc2NvcGUuaG91c2Vob2xkLm90aGVyTWVtYmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaG91c2Vob2xkTWVtYmVyID0gT2JqZWN0LmNyZWF0ZShIb3VzZWhvbGRNZW1iZXIpO1xuICAgICAgICAgICAgICAgICRzY29wZS5ob3VzZWhvbGQub3RoZXJNZW1iZXJzLnB1c2goaG91c2Vob2xkTWVtYmVyKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbmF2aWdhdGVUb05leHRTZWN0aW9uKCkge1xuICAgICAgICAgICAgSG91c2Vob2xkLnNhdmUoKTtcbiAgICAgICAgICAgIFNlY3Rpb25zLnVwZGF0ZVJlcXVpcmVkU2VjdGlvbnMoJHNjb3BlLmhvdXNlaG9sZCk7XG4gICAgICAgICAgICBTZWN0aW9ucy5uYXZpZ2F0ZVRvTmV4dCgkc3RhdGUuJGN1cnJlbnQuc2VsZi5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHN1Ym1pdEFwcGxpY2F0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmhvdXNlaG9sZC5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgbmF2aWdhdGVUb05leHRTZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXYXRjaGVyc1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdob3VzZWhvbGQuY2hpbGRDb3VudCcsIGFkZENoaWxkKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaG91c2Vob2xkLm90aGVyTWVtYmVyc0NvdW50JywgYWRkT3RoZXJNZW1iZXIpO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdzaWRlTmF2Q29udHJvbGxlcicsIHNpZGVOYXZDb250cm9sbGVyKTtcblxuICAgIHNpZGVOYXZDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckc3RhdGUnLCAnU2VjdGlvbnMnXTtcblxuICAgIGZ1bmN0aW9uIHNpZGVOYXZDb250cm9sbGVyICgkc2NvcGUsICRzdGF0ZSwgU2VjdGlvbnMpIHtcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG5cbiAgICAgICAgdm0uY3VycmVudFN0YXRlID0gJHN0YXRlLiRjdXJyZW50LnNlbGYubmFtZTtcbiAgICAgICAgdm0uc2VjdGlvbnMgPSBTZWN0aW9ucy5zZWN0aW9ucztcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuc2VydmljZSgnQXV0aCcsIEF1dGgpO1xuXG4gICAgQXV0aC4kaW5qZWN0ID0gWyckaHR0cCddO1xuXG4gICAgZnVuY3Rpb24gQXV0aCgkaHR0cCkge1xuXG4gICAgICAgIHZhciB1c2VyID0gZmFsc2U7XG5cbiAgICAgICAgZnVuY3Rpb24gc2lnbnVwKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwLnBvc3QoJy91c2VyL3NpZ251cCcsIGRhdGEpXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHVzZXIgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAuZXJyb3IoZnVuY3Rpb24oZGF0YSkge30pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dpbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwLnBvc3QoJy91c2VyL2xvZ2luJywgZGF0YSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdXNlciA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIC5lcnJvcihmdW5jdGlvbihkYXRhKSB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvdXNlci9sb2dvdXQnKS5zdWNjZXNzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHVzZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLy8vLy8vL1xuICAgICAgICB2YXIgc2VydmljZSAgPSB7XG4gICAgICAgICAgICBsb2dpbjogbG9naW4sXG4gICAgICAgICAgICBsb2dvdXQ6IGxvZ291dCxcbiAgICAgICAgICAgIHVzZXI6IHVzZXJcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuc2VydmljZSgnSG91c2Vob2xkJywgaG91c2Vob2xkU2VydmljZSk7XG5cbiAgICBob3VzZWhvbGRTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XG5cbiAgICBmdW5jdGlvbiBob3VzZWhvbGRTZXJ2aWNlKCRodHRwKSB7XG4gICAgICAgIHRoaXMuZ2V0ID0gZ2V0O1xuICAgICAgICB0aGlzLnNhdmUgPSBzYXZlO1xuICAgICAgICB0aGlzLmNsZWFyID0gY2xlYXI7XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICB2YXIgaG91c2Vob2xkO1xuXG4gICAgICAgIHZhciBQZXJzb24gPSB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluY29tZVNvdXJjZUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmluY29tZVNvdXJjZXMgPSBbXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVG9kbzogY29uc2lkZXIgbW92aW5nIHRvIHNlcnZlcj8/XG4gICAgICAgIHZhciBIb3VzZWhvbGQgPSB7XG4gICAgICAgICAgICBjaGlsZENvdW50OiAwLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgICAgb3RoZXJNZW1iZXJzQ291bnQ6IDAsXG4gICAgICAgICAgICBvdGhlck1lbWJlcnM6IFtdLFxuICAgICAgICAgICAgY29tcGxldGVkQXBwbGljYXRpb246IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgaWYgKGhvdXNlaG9sZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3VzZWhvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBob3VzZWhvbGQgPSBPYmplY3QuY3JlYXRlKEhvdXNlaG9sZCk7XG4gICAgICAgICAgICByZXR1cm4gaG91c2Vob2xkO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2F2ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvaG91c2Vob2xkJywgaG91c2Vob2xkKTtcbiAgICAgICAgICAgIC8vIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyAgICAgaG91c2Vob2xkID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgICAgICAgICAgdmFyIGhvdXNlaG9sZCA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIGhvdXNlaG9sZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5zZXJ2aWNlKCdTZWN0aW9ucycsIHNlY3Rpb25zU2VydmljZSk7XG5cbiAgICBzZWN0aW9uc1NlcnZpY2UuJGluamVjdCA9IFsnJHJvb3RTY29wZScgLCckc3RhdGUnXTtcblxuICAgIGZ1bmN0aW9uIHNlY3Rpb25zU2VydmljZSgkcm9vdFNjb3BlLCAkc3RhdGUpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzU3RhdGUsXG4gICAgICAgICAgICBjdXJyZW50U3RhdGU7XG5cbiAgICAgICAgdmFyIHNlY3Rpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2hpbGRyZW4nLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnY2hpbGRyZW4nLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDaGlsZHJlblxcJ3MgSW5jb21lJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2NoaWxkSW5jb21lJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnSG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2hvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0hvdXNlaG9sZCBJbmNvbWUnLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnaG91c2Vob2xkSW5jb21lJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnU2lnbiBhbmQgQ29uZmlybScsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdzaWduYXR1cmUnLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdmFyIGluZGV4ZWRTZWN0aW9ucyA9IF8uaW5kZXhCeShzZWN0aW9ucywgJ3N0YXRlJyk7XG5cbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBzZWN0aW9uczogc2VjdGlvbnMsXG4gICAgICAgICAgICBpbmRleGVkU2VjdGlvbnM6IGluZGV4ZWRTZWN0aW9ucyxcbiAgICAgICAgICAgIG5hdmlnYXRlVG9OZXh0OiBuYXZpZ2F0ZVRvTmV4dCxcbiAgICAgICAgICAgIHVwZGF0ZVJlcXVpcmVkU2VjdGlvbnM6IHVwZGF0ZVJlcXVpcmVkU2VjdGlvbnNcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVJlcXVpcmVkU2VjdGlvbnMoaG91c2Vob2xkKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudENoaWxkO1xuICAgICAgICAgICAgdmFyIGFzc2lzdGFuY2VQcm9ncmFtSG91c2Vob2xkID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgc3BlY2lhbFN0YXR1c0NvdW50ID0gMDtcbiAgICAgICAgICAgIHZhciBza2lwTWVhbnNUZXN0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwIDsgaSA8IGhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZCA9IGhvdXNlaG9sZC5jaGlsZHJlbltpXTtcblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q2hpbGQuYXNzaXN0YW5jZVByb2dyYW0gJiYgY3VycmVudENoaWxkLmFzc2lzdGFuY2VQcm9ncmFtLnBhcnRpY2lwYW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2lzdGFuY2VQcm9ncmFtSG91c2Vob2xkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRDaGlsZC5zcGVjaWFsU3RhdHVzICYmIChjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5mb3N0ZXJDaGlsZCB8fFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5ob21lbGVzc01pZ3JhbnRSdW5hd2F5IHx8XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZC5zcGVjaWFsU3RhdHVzLmhlYWRTdGFydFBhcnRpY2lwYW50KVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBzcGVjaWFsU3RhdHVzQ291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNraXBNZWFuc1Rlc3QgPSBhc3Npc3RhbmNlUHJvZ3JhbUhvdXNlaG9sZCB8fFxuICAgICAgICAgICAgICAgIChob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICBob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoID09PSBzcGVjaWFsU3RhdHVzQ291bnQpO1xuXG4gICAgICAgICAgICBpZiAoc2tpcE1lYW5zVGVzdCkge1xuICAgICAgICAgICAgICAgIGluZGV4ZWRTZWN0aW9uc1snY2hpbGRJbmNvbWUnXS5yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGluZGV4ZWRTZWN0aW9uc1snaG91c2Vob2xkJ10ucmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbmRleGVkU2VjdGlvbnNbJ2hvdXNlaG9sZEluY29tZSddLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmaW5kTmV4dChjdXJyZW50U3RhdGUpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBfLmZpbmRJbmRleChzZWN0aW9ucywgZnVuY3Rpb24oc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWN0aW9uLnN0YXRlID09PSBjdXJyZW50U3RhdGU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gTG9vayBmb3IgdGhlIG5leHQgcmVxdWlyZWQgc2VjdGlvblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGN1cnJlbnRJbmRleCArIDE7IGkgPCBzZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzZWN0aW9uc1tpXS5yZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VjdGlvbnNbaV0uc3RhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gbW9yZSByZXF1aXJlZCBzZWN0aW9ucywgd2UncmUgZG9uZS5cbiAgICAgICAgICAgIHJldHVybiAnY29uZmlybWF0aW9uJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG5hdmlnYXRlVG9OZXh0KGN1cnJlbnRTdGF0ZSkge1xuICAgICAgICAgICAgdmFyIG5leHRTZWN0aW9uICA9IGZpbmROZXh0KGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgICAgICAkc3RhdGUuZ28obmV4dFNlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXYsIHRvLCB0b1BhcmFtcywgZnJvbSwgZnJvbVBhcmFtcykge1xuICAgICAgICAgICAgcHJldmlvdXNTdGF0ZSA9IGZyb20ubmFtZTtcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IHRvLm5hbWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUHJldmlvdXMgc3RhdGU6JyArIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0N1cnJlbnQgc3RhdGU6JyArIGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmRpcmVjdGl2ZSgnaW5jb21lUXVlc3Rpb25zJywgaW5jb21lRGlyZWN0aXZlKTtcblxuICAgIGZ1bmN0aW9uIGluY29tZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgbWVtYmVyOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvaW5jb21lLmh0bWwnLFxuICAgICAgICAgICAgbGluazogbGlua1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfVxuXG4gICAgLy8gbGluay4kaW5qZWN0ID0gWydzY29wZSddO1xuXG4gICAgZnVuY3Rpb24gbGluayhzY29wZSkge1xuICAgICAgICBzY29wZS5pbmNvbWVTb3VyY2VzID0ge1xuICAgICAgICAgICAgd29yazoge1xuICAgICAgICAgICAgICAgIHZhdWxlOid3b3JrJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0Vhcm5pbmdzIGZyb20gd29yaycsXG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ0EgY2hpbGQgaGFzIGEgam9iIHdoZXJlIHRoZXkgZWFybiBzYWxhcnkgb3Igd2FnZXMgJyxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzb2NpYWxTZWN1cml0eToge1xuICAgICAgICAgICAgICAgIHZhdWxlOidzb2NpYWxTZWN1cml0eScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTb2NpYWwgU2VjdXJpdHkgRGlzYWJpbGl0eSBQYXltZW50cyBvciBTdXJ2aXZvcuKAmXMgQmVuZWZpdHMgJyxcbiAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdBIGNoaWxkIGlzIGJsaW5kIG9yIGRpc2FibGVkIGFuZCByZWNlaXZlcyBTb2NpYWwgU2VjdXJpdHkgYmVuZWZpdHMuJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gJyBBIHBhcmVudCBpcyBkaXNhYmxlZCwgcmV0aXJlZCwgb3IgZGVjZWFzZWQsIGFuZCB0aGVpciBjaGlsZCByZWNlaXZlcyBzb2NpYWwgc2VjdXJpdHkgYmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG90aGVyUGVyc29uOiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J290aGVyUGVyc29uJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0luY29tZSBmcm9tIHBlcnNvbnMgb3V0c2lkZSB0aGUgaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnQSBmcmllbmQgb3IgZXh0ZW5kZWQgZmFtaWx5IG1lbWJlciByZWd1bGFybHkgZ2l2ZXMgYSBjaGlsZCBzcGVuZGluZyBtb25leScsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3RoZXJTb3VyY2U6IHtcbiAgICAgICAgICAgICAgICB2YXVsZTonb3RoZXJTb3VyY2UnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnSW5jb21lIGZyb20gYW55IG90aGVyIHNvdXJjZScsXG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ0EgY2hpbGQgcmVjZWl2ZXMgaW5jb21lIGZyb20gYSBwcml2YXRlIHBlbnNpb24gZnVuZCwgYW5udWl0eSwgb3IgdHJ1c3QnLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzY29wZS5tZW1iZXIuaW5jb21lU291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHNjb3BlLm1lbWJlci5pbmNvbWVTb3VyY2VzID0gW107XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzY29wZS5pbmNvbWVTb3VyY2VzKS5mb3JFYWNoKGZ1bmN0aW9uKGluY29tZVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLm1lbWJlci5pbmNvbWVTb3VyY2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBpbmNvbWVTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgIGFtb3VudDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBudWxsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ3llc05vSW5wdXQnLCB5ZXNOb0lucHV0KTtcblxuICAgIGZ1bmN0aW9uIHllc05vSW5wdXQgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtb2RlbDogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3llc25vLmh0bWwnLFxuICAgICAgICB9O1xuICAgIH1cblxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
