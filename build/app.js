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
            return $http.post('/household', household)
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
                label: "Children's Income",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2V4cG9ydC5qcyIsImNvbnRyb2xsZXJzL2hvdXNlaG9sZEluY29tZS5qcyIsImNvbnRyb2xsZXJzL2xvZ2luLmpzIiwiY29udHJvbGxlcnMvbWFpbi5qcyIsImNvbnRyb2xsZXJzL3NpZGVuYXYuanMiLCJkaXJlY3RpdmVzL2luY29tZS5qcyIsImRpcmVjdGl2ZXMveWVzbm8uanMiLCJzZXJ2aWNlcy9hdXRoLmpzIiwic2VydmljZXMvaG91c2Vob2xkLmpzIiwic2VydmljZXMvc2VjdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJyxbJ25nQ29va2llcycsICduZ0NzdicsJ25nTWF0ZXJpYWwnLCAnbmdTYW5pdGl6ZScsICd1aS5yb3V0ZXInXSlcbiAgICAuY29uZmlnKHJvdXRlckNvbmZpZylcbiAgICAuY29uZmlnKG1hdGVyaWFsRGVzaWduVGhlbWVyKTtcblxuICAgIG1hdGVyaWFsRGVzaWduVGhlbWVyLiRpbmplY3QgPSBbJyRtZFRoZW1pbmdQcm92aWRlciddO1xuICAgIGZ1bmN0aW9uIG1hdGVyaWFsRGVzaWduVGhlbWVyKCRtZFRoZW1pbmdQcm92aWRlcikge1xuICAgICAgICAvLyAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2xpZ2h0LWJsdWUnKTtcbiAgICAgICAgLy8gLnByaW1hcnlQYWxldHRlKCdwaW5rJywge1xuICAgICAgICAvLyAgICdkZWZhdWx0JzogJzQwMCcsIC8vIGJ5IGRlZmF1bHQgdXNlIHNoYWRlIDQwMCBmcm9tIHRoZSBwaW5rIHBhbGV0dGUgZm9yIHByaW1hcnkgaW50ZW50aW9uc1xuICAgICAgICAvLyAgICdodWUtMSc6ICcxMDAnLCAvLyB1c2Ugc2hhZGUgMTAwIGZvciB0aGUgPGNvZGU+bWQtaHVlLTE8L2NvZGU+IGNsYXNzXG4gICAgICAgIC8vICAgJ2h1ZS0yJzogJzYwMCcsIC8vIHVzZSBzaGFkZSA2MDAgZm9yIHRoZSA8Y29kZT5tZC1odWUtMjwvY29kZT4gY2xhc3NcbiAgICAgICAgLy8gICAnaHVlLTMnOiAnQTEwMCcgLy8gdXNlIHNoYWRlIEExMDAgZm9yIHRoZSA8Y29kZT5tZC1odWUtMzwvY29kZT4gY2xhc3NcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gLy8gSWYgeW91IHNwZWNpZnkgbGVzcyB0aGFuIGFsbCBvZiB0aGUga2V5cywgaXQgd2lsbCBpbmhlcml0IGZyb20gdGhlXG4gICAgICAgIC8vIC8vIGRlZmF1bHQgc2hhZGVzXG4gICAgICAgIC8vIC5hY2NlbnRQYWxldHRlKCdwdXJwbGUnLCB7XG4gICAgICAgIC8vICAgJ2RlZmF1bHQnOiAnMjAwJyAvLyB1c2Ugc2hhZGUgMjAwIGZvciBkZWZhdWx0LCBhbmQga2VlcCBhbGwgb3RoZXIgc2hhZGVzIHRoZSBzYW1lXG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIHJvdXRlckNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInXTtcblxuICAgIGZ1bmN0aW9uIHJvdXRlckNvbmZpZyAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAgIHJvdXRlcigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKTtcblxuICAgICAgICAvLy8vLy8vLy8vXG4gICAgICAgIGZ1bmN0aW9uIHJvdXRlcigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgICAgICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ3N0YXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc3RhcnQuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdjaGlsZHJlbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY2hpbGRyZW4nLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvY2hpbGRyZW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdjaGlsZEluY29tZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY2hpbGRJbmNvbWUnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9jaGlsZEluY29tZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdob3VzZWhvbGQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2hvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9ob3VzZWhvbGQuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdob3VzZWhvbGRJbmNvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2hvdXNlaG9sZC1pbmNvbWUnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvaG91c2Vob2xkSW5jb21lLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvdXNlaG9sZEluY29tZSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3NpZ25hdHVyZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbmF0dXJlJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lnbmF0dXJlLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbmZpcm1hdGlvbicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvY29uZmlybWF0aW9uJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvY29uZmlybWF0aW9uLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2V4cG9ydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvZXhwb3J0JyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9leHBvcnQuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZXhwb3J0Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3NpZ251cCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZ251cC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2xvZ2luLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3NvRmFyJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9zby1mYXInLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zb0Zhci5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdleHBvcnRDb250cm9sbGVyJywgZXhwb3J0Q29udHJvbGxlcik7XG5cbiAgICBleHBvcnRDb250cm9sbGVyLiRpbmplY3QgPSBbJyRodHRwJywgJyRzY29wZSddO1xuXG4gICAgZnVuY3Rpb24gZXhwb3J0Q29udHJvbGxlcigkaHR0cCwgJHNjb3BlKSB7XG4gICAgICAgICRodHRwLmdldCgnL2hvdXNlaG9sZC9jb21wbGV0ZWQnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAkc2NvcGUuY29tcGxldGVkQXBwbGljYXRpb25zID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2hvdXNlaG9sZEluY29tZScsIGhvdXNlaG9sZEluY29tZSk7XG5cbiAgICBob3VzZWhvbGRJbmNvbWUuJGluamVjdCA9IFtcbiAgICAgICAgJyRzY29wZScsXG4gICAgICAgICckc3RhdGUnLFxuICAgICAgICAnQXV0aCcsXG4gICAgICAgICdIb3VzZWhvbGQnLFxuICAgICAgICAnU2VjdGlvbnMnXG4gICAgXTtcblxuICAgIGZ1bmN0aW9uIGhvdXNlaG9sZEluY29tZSAoJHNjb3BlLCAkc3RhdGUsIEF1dGgsIEhvdXNlaG9sZCwgU2VjdGlvbnMsIEhvdXNlaG9sZEluY29tZSkge1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG4gICAgICAgIHZhciBob3VzZWhvbGQgPSBIb3VzZWhvbGQuZ2V0KCk7XG5cbiAgICAgICAgdmFyIHdvcmsgPSB7XG4gICAgICAgICAgICBjYXRlZ29yeU5hbWU6ICd3b3JrJyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiAnV29yayBJbmNvbWUnLFxuICAgICAgICAgICAgcXVlc3Rpb246ICdlYXJuIG1vbmV5IHRocm91Z2ggd29yaycsXG4gICAgICAgICAgICBzb3VyY2VzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTond29yaycsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdXb3JrIG91dHNpZGUgdGhlIGhvbWUgaW4gYSBub24tbWlsaXRhcnkgY2FwYWNpdHkgJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0Vhcm5pbmdzIGZyb20gd29yaycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnUGxlYXNlIHJlcG9ydCBncm9zcyBpbmNvbWUuIFRoaXMgaXMgdGhlIGFtb3VudCBvZiBpbmNvbWUgZWFybmVkIGJlZm9yZSBhbnkgbW9uZXkgaXMgdGFrZW4gb3V0IGZvciB0YXhlcyBvciBkZWR1Y3Rpb25zLiBJbmNsdWRlIHNhbGFyeSwgd2FnZXMsIGFuZCBjYXNoIGJvbnVzZXMuJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTonc2VsZkVtcGxveWVkJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0Vhcm5pbmdzIGZyb20gc2VsZiBlbXBsb3ltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1NlbGYtZW1wbG95ZWQnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ0ZvciBob3VzZWhvbGQgbWVtYmVycyB0aGF0IGFyZSBzZWxmLWVtcGxveWVkLCByZXBvcnQgaW5jb21lIGZyb20gdGhhdCB3b3JrIGFzIGEgbmV0IGFtb3VudC4gVGhpcyBpcyBjYWxjdWxhdGVkIGJ5IHN1YnRyYWN0aW5nIHRoZSB0b3RhbCBvcGVyYXRpbmcgZXhwZW5zZXMgb2YgdGhlIGJ1c2luZXNzIGZyb20gaXRzIGdyb3NzIHJlY2VpcHRzIG9yIHJldmVudWUuJ1xuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOidvblN0cmlrZScsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdPbiBTdHJpa2UnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnU3RyaWtlIEJlbmVmaXRzJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGFkZCBzcGFjZSBmb3IgaG91c2luZyBhbGxvd2FuY2UgcGVyIGRvY1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTonbWlsaXRhcnknLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnSW4gdGhlIFUuUy4gbWlsaXRhcnknLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnQmFzaWMgcGF5IGFuZCBjYXNoIGJvbnVzZXMnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ1BsZWFzZSBkbyBub3QgaW5jbHVkZSBjb21iYXQgcGF5LCBGU1NBLCBvciBwcml2YXRlIGhvdXNpbmcgYWxsb3dhbmNlcy4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwdWJsaWNBc3Npc3RhbmNlID0ge1xuICAgICAgICAgICAgY2F0ZWdvcnlOYW1lOiAncHVibGljQXNzaXN0YW5jZScsXG4gICAgICAgICAgICBoZWFkbGluZTogJ1B1YmxpYyBBc3Npc3RhbmNlJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAncmVjZWl2ZSBhbnkgcHVibGljIGFzc2lzdGFuY2UgYmVuZWZpdHMnLFxuICAgICAgICAgICAgc291cmNlczpbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTondW5lbXBsb3ltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1VuZW1wbG95bWVudCBiZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdVbmVtcGxveW1lbnQgYmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J3dvcmtlcnNDb21wJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1dvcmtlcuKAmXMgY29tcGVuc2F0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1dvcmtlcuKAmXMgY29tcGVuc2F0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOidzc2knLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnU3VwcGxlbWVudGFsIFNlY3VyaXR5IEluY29tZSAoU1NJKScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdTdXBwbGVtZW50YWwgU2VjdXJpdHkgSW5jb21lIChTU0kpJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOidjYXNoQXNzaXN0YW5jZScsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdDYXNoIGFzc2lzdGFuY2UgZnJvbSBTdGF0ZSBvciBsb2NhbCBnb3Zlcm5tZW50JyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0Nhc2ggYXNzaXN0YW5jZScsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnVGhpcyBjb3VsZCBpbmNsdWRlIFRBTkYgb3IgR2VuZXJhbCBBc3Npc3RhbmNlIG1vbmV5J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTondmV0ZXJhbnNCZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdWZXRlcmFu4oCZcyBiZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdWZXRlcmFu4oCZcyBiZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnVGhpcyBjb3VsZCBpbmNsdWRlIFRBTkYgb3IgR2VuZXJhbCBBc3Npc3RhbmNlIG1vbmV5J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgYWxpbW9ueSA9IHtcbiAgICAgICAgICAgIGNhdGVnb3J5TmFtZTogJ2FsaW1vbnknLFxuICAgICAgICAgICAgaGVhZGxpbmU6ICdBbGltb255JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAncmVjZWl2ZSBhbGltb255IHBheW1lbnRzJyxcbiAgICAgICAgICAgIHNvdXJjZXM6W1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdhbGltb255JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ2FsaW1vbnkgcGF5bWVudHMnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnQWxpbW9ueSBwYXltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdJZiBpbmNvbWUgaXMgcmVjZWl2ZWQgZnJvbSBjaGlsZCBzdXBwb3J0IG9yIGFsaW1vbnksIG9ubHkgY291cnQtb3JkZXJlZCBwYXltZW50cyBzaG91bGQgYmUgcmVwb3J0ZWQgaGVyZS4gSW5mb3JtYWwgYnV0IHJlZ3VsYXIgcGF5bWVudHMgc2hvdWxkIGJlIHJlcG9ydGVkIGxhdGVyIGFzIOKAnG90aGVy4oCdIGluY29tZS4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjaGlsZFN1cHBvcnQgPSB7XG4gICAgICAgICAgICBjYXRlZ29yeU5hbWU6ICdjaGlsZFN1cHBvcnQnLFxuICAgICAgICAgICAgaGVhZGxpbmU6ICdDaGlsZCBTdXBwb3J0JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAncmVjZWl2ZSBhbnkgY2hpbGQgc3VwcG9ydCcsXG4gICAgICAgICAgICBzb3VyY2VzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ2NoaWxkU3VwcG9ydCcsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdhbnkgY2hpbGQgc3VwcG9ydCcsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdDaGlsZCBzdXBwb3J0IHBheW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ0lmIGluY29tZSBpcyByZWNlaXZlZCBmcm9tIGNoaWxkIHN1cHBvcnQgb3IgY2hpbGRTdXBwb3J0LCBvbmx5IGNvdXJ0LW9yZGVyZWQgcGF5bWVudHMgc2hvdWxkIGJlIHJlcG9ydGVkIGhlcmUuIEluZm9ybWFsIGJ1dCByZWd1bGFyIHBheW1lbnRzIHNob3VsZCBiZSByZXBvcnRlZCBsYXRlciBhcyDigJxvdGhlcuKAnSBpbmNvbWUuJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcmV0aXJlbWVudCA9IHtcbiAgICAgICAgICAgIGNhdGVnb3J5TmFtZTogJ3JldGlyZW1lbnQnLFxuICAgICAgICAgICAgaGVhZGxpbmU6ICdQZW5zaW9uIGFuZCBSZXRpcmVtZW50JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAncmVjZWl2ZSBhbnkgcGVuc2lvbiBvciByZXRpcmVtZW50IG1vbmV5JyxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAnc29jaWFsU2VjdXJpdHknLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnU29jaWFsIFNlY3VyaXR5IChpbmNsdWRpbmcgcmFpbHJvYWQgcmV0aXJlbWVudCBhbmQgYmxhY2sgbHVuZyBiZW5lZml0cyknLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnU29jaWFsIHNlY3VyaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdQbGVhc2UgaW5jbHVkZSByYWlscm9hZCByZXRpcmVtZW50IGFuZCBibGFjayBsdW5nIGJlbmVmaXRzJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ3ByaXZhdGVQZW5zaW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1ByaXZhdGUgcGVuc2lvbnMgb3IgZGlzYWJpbGl0eScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdQcml2YXRlIHBlbnNpb25zIG9yIGRpc2FiaWxpdHknLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG90aGVySW5jb21lID0ge1xuICAgICAgICAgICAgY2F0ZWdvcnlOYW1lOiAnb3RoZXJJbmNvbWUnLFxuICAgICAgICAgICAgaGVhZGxpbmU6ICdPdGhlciBJbmNvbWUnLFxuICAgICAgICAgICAgcXVlc3Rpb246ICdyZWNpZXZlIG1vbmV5IHRocm91Z2ggYW55IG90aGVyIHNvdXJjZScsXG4gICAgICAgICAgICBzb3VyY2VzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ3RydXN0cycsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdJbmNvbWUgZnJvbSB0cnVzdHMgb3IgZXN0YXRlcycsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdJbmNvbWUgZnJvbSB0cnVzdHMgb3IgZXN0YXRlcycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ2FubnVpdGllcycsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdBbm51aXRpZXMnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnSW5jb21lIGZyb20gYW5udWl0aWVzJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAnaW52ZXN0bWVudCcsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdJbnZlc3RtZW50IGluY29tZScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdJbnZlc3RtZW50IGluY29tZScsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ2ludGVyZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ0Vhcm5lZCBpbnRlcmVzdCcsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdFYXJuZWQgaW50ZXJlc3QnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdyZW50YWxJbmNvbWUnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnUmVudGFsIGluY29tZScsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdSZW50YWwgaW5jb21lJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAnb3RoZXJDYXNoJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1JlZ3VsYXIgY2FzaCBwYXltZW50cyBmcm9tIG91dHNpZGUgaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1JlZ3VsYXIgY2FzaCBwYXltZW50cyBmcm9tIG91dHNpZGUgaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdTdWNoIGNhc2ggcGF5bWVudHMgc2hvdWxkIGluY2x1ZGUgcmVndWxhciBjaGlsZCBzdXBwb3J0IG9yIGFsaW1vbnkgcGF5bWVudHMgcmVjZWl2ZWQgYnkgdGhlIGhvdXNlaG9sZCB0aGF0IGFyZSBub3QgY291cnQtb3JkZXJlZC4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb24oKSB7XG4gICAgICAgICAgICBIb3VzZWhvbGQuc2F2ZSgpO1xuICAgICAgICAgICAgU2VjdGlvbnMudXBkYXRlUmVxdWlyZWRTZWN0aW9ucygkc2NvcGUuaG91c2Vob2xkKTtcbiAgICAgICAgICAgIFNlY3Rpb25zLm5hdmlnYXRlVG9OZXh0KCRzdGF0ZS4kY3VycmVudC5zZWxmLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluY29tZUNhdGVnb3JpZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1YmxpY0Fzc2lzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaW1vbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkU3VwcG9ydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0aXJlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJJbmNvbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIHZtLmhvdXNlaG9sZCA9IGhvdXNlaG9sZDtcbiAgICAgICAgdm0ubmF2aWdhdGVUb05leHRTZWN0aW9uID0gbmF2aWdhdGVUb05leHRTZWN0aW9uO1xuICAgICAgICB2bS5pbmNvbWVDYXRlZ29yaWVzID0gaW5jb21lQ2F0ZWdvcmllcztcblxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgLmNvbnRyb2xsZXIoJ2xvZ2luQ29udHJvbGxlcicsIFtsb2dpbkNvbnRyb2xsZXJdKTtcbiAgICBsb2dpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2F0aW9uJywgJyRzY29wZSddO1xuICAgIGZ1bmN0aW9uIGxvZ2luQ29udHJvbGxlcigkbG9jYXRpb24sICRzY29wZSkge1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG4gICAgICAgIC8vIGRlYnVnZ2VyO1xuICAgICAgICAvLyB2bS5lcnJvciA9ICRsb2NhdGlvbjtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignbWFpbkNvbnRyb2xsZXInLCBtYWluQ29udHJvbGxlcik7XG5cbiAgICBtYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1xuICAgICAgICAnJGh0dHAnLFxuICAgICAgICAnJGludGVydmFsJyxcbiAgICAgICAgJyRtZERpYWxvZycsXG4gICAgICAgICckbWRNZWRpYScsXG4gICAgICAgICckc2NvcGUnLFxuICAgICAgICAnJHN0YXRlJyxcbiAgICAgICAgJ0F1dGgnLFxuICAgICAgICAnSG91c2Vob2xkJyxcbiAgICAgICAgJ1NlY3Rpb25zJ1xuICAgIF07XG5cbiAgICBmdW5jdGlvbiBtYWluQ29udHJvbGxlciAoJGh0dHAsICRpbnRlcnZhbCwgJG1kRGlhbG9nLCAkbWRNZWRpYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLCAkc3RhdGUsIEF1dGgsIEhvdXNlaG9sZCwgU2VjdGlvbnMpIHtcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG5cbiAgICAgICAgdm0uaG91c2Vob2xkID0gSG91c2Vob2xkLmdldCgpO1xuICAgICAgICB2bS5zY2hvb2xEaXN0cmljdCA9ICdPYWtsYW5kIFVuaWZpZWQgU2Nob29sIERpc3RyaWN0JztcblxuICAgICAgICB2bS5uYXZpZ2F0ZVRvTmV4dFNlY3Rpb24gPSBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb247XG4gICAgICAgIHZtLnN1Ym1pdEFwcGxpY2F0aW9uID0gc3VibWl0QXBwbGljYXRpb247XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICBmdW5jdGlvbiBhZGRDaGlsZChuZXdWYWwpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPiAkc2NvcGUuaG91c2Vob2xkLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRodHRwLmdldCgnL2NoaWxkJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Q2hpbGQgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaG91c2Vob2xkLmNoaWxkcmVuLnB1c2gobmV3Q2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBhZGRDaGlsZChuZXdWYWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzogTW92ZSB0byBtb25nb29zZSBtb2RlbFxuICAgICAgICB2YXIgSG91c2Vob2xkTWVtYmVyID0ge1xuICAgICAgICAgICAgaW5jb21lOiB7fVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gYWRkT3RoZXJNZW1iZXIobmV3VmFsKSB7XG4gICAgICAgICAgICB3aGlsZSAobmV3VmFsID4gJHNjb3BlLmhvdXNlaG9sZC5vdGhlck1lbWJlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhvdXNlaG9sZE1lbWJlciA9IE9iamVjdC5jcmVhdGUoSG91c2Vob2xkTWVtYmVyKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaG91c2Vob2xkLm90aGVyTWVtYmVycy5wdXNoKGhvdXNlaG9sZE1lbWJlcik7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG5hdmlnYXRlVG9OZXh0U2VjdGlvbigpIHtcbiAgICAgICAgICAgIEhvdXNlaG9sZC5zYXZlKCk7XG4gICAgICAgICAgICBTZWN0aW9ucy51cGRhdGVSZXF1aXJlZFNlY3Rpb25zKCRzY29wZS5ob3VzZWhvbGQpO1xuICAgICAgICAgICAgU2VjdGlvbnMubmF2aWdhdGVUb05leHQoJHN0YXRlLiRjdXJyZW50LnNlbGYubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdWJtaXRBcHBsaWNhdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5ob3VzZWhvbGQuY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG5hdmlnYXRlVG9OZXh0U2VjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2F0Y2hlcnNcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaG91c2Vob2xkLmNoaWxkQ291bnQnLCBhZGRDaGlsZCk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2hvdXNlaG9sZC5vdGhlck1lbWJlcnNDb3VudCcsIGFkZE90aGVyTWVtYmVyKTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignc2lkZU5hdkNvbnRyb2xsZXInLCBzaWRlTmF2Q29udHJvbGxlcik7XG5cbiAgICBzaWRlTmF2Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlJywgJ1NlY3Rpb25zJ107XG5cbiAgICBmdW5jdGlvbiBzaWRlTmF2Q29udHJvbGxlciAoJHNjb3BlLCAkc3RhdGUsIFNlY3Rpb25zKSB7XG4gICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cbiAgICAgICAgdmFyIHZtID0gJHNjb3BlO1xuXG4gICAgICAgIHZtLmN1cnJlbnRTdGF0ZSA9ICRzdGF0ZS4kY3VycmVudC5zZWxmLm5hbWU7XG4gICAgICAgIHZtLnNlY3Rpb25zID0gU2VjdGlvbnMuc2VjdGlvbnM7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmRpcmVjdGl2ZSgnaW5jb21lUXVlc3Rpb25zJywgaW5jb21lRGlyZWN0aXZlKTtcblxuICAgIGZ1bmN0aW9uIGluY29tZURpcmVjdGl2ZSgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgbWVtYmVyOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvaW5jb21lLmh0bWwnLFxuICAgICAgICAgICAgbGluazogbGlua1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfVxuXG4gICAgLy8gbGluay4kaW5qZWN0ID0gWydzY29wZSddO1xuXG4gICAgZnVuY3Rpb24gbGluayhzY29wZSkge1xuICAgICAgICBzY29wZS5pbmNvbWVTb3VyY2VzID0ge1xuICAgICAgICAgICAgd29yazoge1xuICAgICAgICAgICAgICAgIHZhdWxlOid3b3JrJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0Vhcm5pbmdzIGZyb20gd29yaycsXG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZDogJ0EgY2hpbGQgaGFzIGEgam9iIHdoZXJlIHRoZXkgZWFybiBzYWxhcnkgb3Igd2FnZXMgJyxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJNZW1iZXI6ICcnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzb2NpYWxTZWN1cml0eToge1xuICAgICAgICAgICAgICAgIHZhdWxlOidzb2NpYWxTZWN1cml0eScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTb2NpYWwgU2VjdXJpdHkgRGlzYWJpbGl0eSBQYXltZW50cyBvciBTdXJ2aXZvcuKAmXMgQmVuZWZpdHMgJyxcbiAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6ICdBIGNoaWxkIGlzIGJsaW5kIG9yIGRpc2FibGVkIGFuZCByZWNlaXZlcyBTb2NpYWwgU2VjdXJpdHkgYmVuZWZpdHMuJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gJyBBIHBhcmVudCBpcyBkaXNhYmxlZCwgcmV0aXJlZCwgb3IgZGVjZWFzZWQsIGFuZCB0aGVpciBjaGlsZCByZWNlaXZlcyBzb2NpYWwgc2VjdXJpdHkgYmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICBvdGhlck1lbWJlcjogJycsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG90aGVyUGVyc29uOiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J290aGVyUGVyc29uJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0luY29tZSBmcm9tIHBlcnNvbnMgb3V0c2lkZSB0aGUgaG91c2Vob2xkJyxcbiAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiAnQSBmcmllbmQgb3IgZXh0ZW5kZWQgZmFtaWx5IG1lbWJlciByZWd1bGFybHkgZ2l2ZXMgYSBjaGlsZCBzcGVuZGluZyBtb25leScsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyTWVtYmVyOiAnJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3RoZXJTb3VyY2U6IHtcbiAgICAgICAgICAgICAgICB2YXVsZTonb3RoZXJTb3VyY2UnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnSW5jb21lIGZyb20gYW55IG90aGVyIHNvdXJjZScsXG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZDogJ0EgY2hpbGQgcmVjZWl2ZXMgaW5jb21lIGZyb20gYSBwcml2YXRlIHBlbnNpb24gZnVuZCwgYW5udWl0eSwgb3IgdHJ1c3QnLFxuICAgICAgICAgICAgICAgICAgICBvdGhlck1lbWJlcjogJycsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzY29wZS5tZW1iZXIuaW5jb21lU291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHNjb3BlLm1lbWJlci5pbmNvbWVTb3VyY2VzID0gW107XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzY29wZS5pbmNvbWVTb3VyY2VzKS5mb3JFYWNoKGZ1bmN0aW9uKGluY29tZVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLm1lbWJlci5pbmNvbWVTb3VyY2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBpbmNvbWVTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgIGFtb3VudDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBudWxsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ3llc05vSW5wdXQnLCB5ZXNOb0lucHV0KTtcblxuICAgIGZ1bmN0aW9uIHllc05vSW5wdXQgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtb2RlbDogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3llc25vLmh0bWwnLFxuICAgICAgICB9O1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5zZXJ2aWNlKCdBdXRoJywgQXV0aCk7XG5cbiAgICBBdXRoLiRpbmplY3QgPSBbJyRodHRwJ107XG5cbiAgICBmdW5jdGlvbiBBdXRoKCRodHRwKSB7XG5cbiAgICAgICAgdmFyIHVzZXIgPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiBzaWdudXAoZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGh0dHAucG9zdCgnL3VzZXIvc2lnbnVwJywgZGF0YSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdXNlciA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIC5lcnJvcihmdW5jdGlvbihkYXRhKSB7fSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGxvZ2luKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL3VzZXIvbG9naW4nLCBkYXRhKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB1c2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gLmVycm9yKGZ1bmN0aW9uKGRhdGEpIHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgICAgICAgICAgICRodHRwLnBvc3QoJy91c2VyL2xvZ291dCcpLnN1Y2Nlc3MoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdXNlciA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLy8vLy8vXG4gICAgICAgIHZhciBzZXJ2aWNlICA9IHtcbiAgICAgICAgICAgIGxvZ2luOiBsb2dpbixcbiAgICAgICAgICAgIGxvZ291dDogbG9nb3V0LFxuICAgICAgICAgICAgdXNlcjogdXNlclxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5zZXJ2aWNlKCdIb3VzZWhvbGQnLCBob3VzZWhvbGRTZXJ2aWNlKTtcblxuICAgIGhvdXNlaG9sZFNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcblxuICAgIGZ1bmN0aW9uIGhvdXNlaG9sZFNlcnZpY2UoJGh0dHApIHtcbiAgICAgICAgdGhpcy5nZXQgPSBnZXQ7XG4gICAgICAgIHRoaXMuc2F2ZSA9IHNhdmU7XG4gICAgICAgIHRoaXMuY2xlYXIgPSBjbGVhcjtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIHZhciBob3VzZWhvbGQ7XG5cbiAgICAgICAgdmFyIFBlcnNvbiA9IHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jb21lU291cmNlQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jb21lU291cmNlcyA9IFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUb2RvOiBjb25zaWRlciBtb3ZpbmcgdG8gc2VydmVyPz9cbiAgICAgICAgdmFyIEhvdXNlaG9sZCA9IHtcbiAgICAgICAgICAgIGNoaWxkQ291bnQ6IDAsXG4gICAgICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgICAgICBvdGhlck1lbWJlcnNDb3VudDogMCxcbiAgICAgICAgICAgIG90aGVyTWVtYmVyczogW10sXG4gICAgICAgICAgICBjb21wbGV0ZWRBcHBsaWNhdGlvbjogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICBpZiAoaG91c2Vob2xkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvdXNlaG9sZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhvdXNlaG9sZCA9IE9iamVjdC5jcmVhdGUoSG91c2Vob2xkKTtcbiAgICAgICAgICAgIHJldHVybiBob3VzZWhvbGQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzYXZlKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9ob3VzZWhvbGQnLCBob3VzZWhvbGQpXG4gICAgICAgICAgICAvLyAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gICAgIGhvdXNlaG9sZCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICAgICAgICAgIHZhciBob3VzZWhvbGQgPSB7fTtcbiAgICAgICAgICAgIHJldHVybiBob3VzZWhvbGQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuc2VydmljZSgnU2VjdGlvbnMnLCBzZWN0aW9uc1NlcnZpY2UpO1xuXG4gICAgc2VjdGlvbnNTZXJ2aWNlLiRpbmplY3QgPSBbJyRyb290U2NvcGUnICwnJHN0YXRlJ107XG5cbiAgICBmdW5jdGlvbiBzZWN0aW9uc1NlcnZpY2UoJHJvb3RTY29wZSwgJHN0YXRlKSB7XG4gICAgICAgIHZhciBwcmV2aW91c1N0YXRlLFxuICAgICAgICAgICAgY3VycmVudFN0YXRlO1xuXG4gICAgICAgIHZhciBzZWN0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNoaWxkcmVuJ3MgSW5jb21lXCIsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdjaGlsZEluY29tZScsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0hvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdob3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdIb3VzZWhvbGQgSW5jb21lJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2hvdXNlaG9sZEluY29tZScsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1NpZ24gYW5kIENvbmZpcm0nLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnc2lnbmF0dXJlJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHZhciBpbmRleGVkU2VjdGlvbnMgPSBfLmluZGV4Qnkoc2VjdGlvbnMsICdzdGF0ZScpO1xuXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICAgICAgc2VjdGlvbnM6IHNlY3Rpb25zLFxuICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zOiBpbmRleGVkU2VjdGlvbnMsXG4gICAgICAgICAgICBuYXZpZ2F0ZVRvTmV4dDogbmF2aWdhdGVUb05leHQsXG4gICAgICAgICAgICB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zOiB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zKGhvdXNlaG9sZCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRDaGlsZDtcbiAgICAgICAgICAgIHZhciBhc3Npc3RhbmNlUHJvZ3JhbUhvdXNlaG9sZCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHNwZWNpYWxTdGF0dXNDb3VudCA9IDA7XG4gICAgICAgICAgICB2YXIgc2tpcE1lYW5zVGVzdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCBob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQgPSBob3VzZWhvbGQuY2hpbGRyZW5baV07XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudENoaWxkLmFzc2lzdGFuY2VQcm9ncmFtICYmIGN1cnJlbnRDaGlsZC5hc3Npc3RhbmNlUHJvZ3JhbS5wYXJ0aWNpcGFudCkge1xuICAgICAgICAgICAgICAgICAgICBhc3Npc3RhbmNlUHJvZ3JhbUhvdXNlaG9sZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cyAmJiBjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5mb3N0ZXJDaGlsZCB8fFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5ob21lbGVzc01pZ3JhbnRSdW5hd2F5IHx8XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZC5zcGVjaWFsU3RhdHVzLmhlYWRTdGFydFBhcnRpY2lwYW50XG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWNpYWxTdGF0dXNDb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2tpcE1lYW5zVGVzdCA9IGFzc2lzdGFuY2VQcm9ncmFtSG91c2Vob2xkIHx8XG4gICAgICAgICAgICAgICAgKGhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgIGhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGggPT09IHNwZWNpYWxTdGF0dXNDb3VudCk7XG5cbiAgICAgICAgICAgIGlmIChza2lwTWVhbnNUZXN0KSB7XG4gICAgICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zWydjaGlsZEluY29tZSddLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zWydob3VzZWhvbGQnXS5yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGluZGV4ZWRTZWN0aW9uc1snaG91c2Vob2xkSW5jb21lJ10ucmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24ucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmROZXh0KGN1cnJlbnRTdGF0ZSkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IF8uZmluZEluZGV4KHNlY3Rpb25zLCBmdW5jdGlvbihzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb24uc3RhdGUgPT09IGN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBMb29rIGZvciB0aGUgbmV4dCByZXF1aXJlZCBzZWN0aW9uXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gY3VycmVudEluZGV4ICsgMTsgaSA8IHNlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlY3Rpb25zW2ldLnJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWN0aW9uc1tpXS5zdGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIHJlcXVpcmVkIHNlY3Rpb25zLCB3ZSdyZSBkb25lLlxuICAgICAgICAgICAgcmV0dXJuICdjb25maXJtYXRpb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbmF2aWdhdGVUb05leHQoY3VycmVudFN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgbmV4dFNlY3Rpb24gID0gZmluZE5leHQoY3VycmVudFN0YXRlKTtcbiAgICAgICAgICAgICRzdGF0ZS5nbyhuZXh0U2VjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihldiwgdG8sIHRvUGFyYW1zLCBmcm9tLCBmcm9tUGFyYW1zKSB7XG4gICAgICAgICAgICBwcmV2aW91c1N0YXRlID0gZnJvbS5uYW1lO1xuICAgICAgICAgICAgY3VycmVudFN0YXRlID0gdG8ubmFtZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQcmV2aW91cyBzdGF0ZTonICsgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ3VycmVudCBzdGF0ZTonICsgY3VycmVudFN0YXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
