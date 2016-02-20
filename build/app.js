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
            var updated = Sections.updateRequiredSections($scope.household);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2V4cG9ydC5qcyIsImNvbnRyb2xsZXJzL2hvdXNlaG9sZEluY29tZS5qcyIsImNvbnRyb2xsZXJzL2xvZ2luLmpzIiwiY29udHJvbGxlcnMvbWFpbi5qcyIsImNvbnRyb2xsZXJzL3NpZGVuYXYuanMiLCJkaXJlY3RpdmVzL2luY29tZS5qcyIsImRpcmVjdGl2ZXMveWVzbm8uanMiLCJzZXJ2aWNlcy9hdXRoLmpzIiwic2VydmljZXMvaG91c2Vob2xkLmpzIiwic2VydmljZXMvc2VjdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcsWyduZ0Nvb2tpZXMnLCAnbmdDc3YnLCduZ01hdGVyaWFsJywgJ25nU2FuaXRpemUnLCAndWkucm91dGVyJ10pXG4gICAgLmNvbmZpZyhyb3V0ZXJDb25maWcpXG4gICAgLmNvbmZpZyhtYXRlcmlhbERlc2lnblRoZW1lcik7XG5cbiAgICBtYXRlcmlhbERlc2lnblRoZW1lci4kaW5qZWN0ID0gWyckbWRUaGVtaW5nUHJvdmlkZXInXTtcbiAgICBmdW5jdGlvbiBtYXRlcmlhbERlc2lnblRoZW1lcigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcbiAgICAgICAgLy8gJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdsaWdodC1ibHVlJyk7XG4gICAgICAgIC8vIC5wcmltYXJ5UGFsZXR0ZSgncGluaycsIHtcbiAgICAgICAgLy8gICAnZGVmYXVsdCc6ICc0MDAnLCAvLyBieSBkZWZhdWx0IHVzZSBzaGFkZSA0MDAgZnJvbSB0aGUgcGluayBwYWxldHRlIGZvciBwcmltYXJ5IGludGVudGlvbnNcbiAgICAgICAgLy8gICAnaHVlLTEnOiAnMTAwJywgLy8gdXNlIHNoYWRlIDEwMCBmb3IgdGhlIDxjb2RlPm1kLWh1ZS0xPC9jb2RlPiBjbGFzc1xuICAgICAgICAvLyAgICdodWUtMic6ICc2MDAnLCAvLyB1c2Ugc2hhZGUgNjAwIGZvciB0aGUgPGNvZGU+bWQtaHVlLTI8L2NvZGU+IGNsYXNzXG4gICAgICAgIC8vICAgJ2h1ZS0zJzogJ0ExMDAnIC8vIHVzZSBzaGFkZSBBMTAwIGZvciB0aGUgPGNvZGU+bWQtaHVlLTM8L2NvZGU+IGNsYXNzXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC8vIElmIHlvdSBzcGVjaWZ5IGxlc3MgdGhhbiBhbGwgb2YgdGhlIGtleXMsIGl0IHdpbGwgaW5oZXJpdCBmcm9tIHRoZVxuICAgICAgICAvLyAvLyBkZWZhdWx0IHNoYWRlc1xuICAgICAgICAvLyAuYWNjZW50UGFsZXR0ZSgncHVycGxlJywge1xuICAgICAgICAvLyAgICdkZWZhdWx0JzogJzIwMCcgLy8gdXNlIHNoYWRlIDIwMCBmb3IgZGVmYXVsdCwgYW5kIGtlZXAgYWxsIG90aGVyIHNoYWRlcyB0aGUgc2FtZVxuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICByb3V0ZXJDb25maWcuJGluamVjdCA9IFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJ107XG5cbiAgICBmdW5jdGlvbiByb3V0ZXJDb25maWcgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICByb3V0ZXIoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcik7XG5cbiAgICAgICAgLy8vLy8vLy8vL1xuICAgICAgICBmdW5jdGlvbiByb3V0ZXIoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICAgICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdzdGFydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3N0YXJ0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnY2hpbGRyZW4nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2NoaWxkcmVuLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnY2hpbGRJbmNvbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NoaWxkSW5jb21lJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvY2hpbGRJbmNvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnaG91c2Vob2xkJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ob3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvaG91c2Vob2xkLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnaG91c2Vob2xkSW5jb21lJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9ob3VzZWhvbGQtaW5jb21lJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzaWRlTmF2Q29udHJvbGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2hvdXNlaG9sZEluY29tZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob3VzZWhvbGRJbmNvbWUnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdzaWduYXR1cmUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3NpZ25hdHVyZScsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZ25hdHVyZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdjb25maXJtYXRpb24nLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2NvbmZpcm1hdGlvbicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lkZU5hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2NvbmZpcm1hdGlvbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdleHBvcnQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2V4cG9ydCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3NpZGUtbmF2Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NpZGVOYXZDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvZXhwb3J0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V4cG9ydENvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdzaWdudXAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWdudXAuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICAnc2lkZS1uYXYnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZGVOYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdtYWluJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9sb2dpbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdzb0ZhcicsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvc28tZmFyJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgICdzaWRlLW5hdic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWRlTmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lkZU5hdkNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc29GYXIuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignZXhwb3J0Q29udHJvbGxlcicsIGV4cG9ydENvbnRyb2xsZXIpO1xuXG4gICAgZXhwb3J0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckaHR0cCcsICckc2NvcGUnXTtcblxuICAgIGZ1bmN0aW9uIGV4cG9ydENvbnRyb2xsZXIoJGh0dHAsICRzY29wZSkge1xuICAgICAgICAkaHR0cC5nZXQoJy9ob3VzZWhvbGQvY29tcGxldGVkJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbXBsZXRlZEFwcGxpY2F0aW9ucyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdob3VzZWhvbGRJbmNvbWUnLCBob3VzZWhvbGRJbmNvbWUpO1xuXG4gICAgaG91c2Vob2xkSW5jb21lLiRpbmplY3QgPSBbXG4gICAgICAgICckc2NvcGUnLFxuICAgICAgICAnJHN0YXRlJyxcbiAgICAgICAgJ0F1dGgnLFxuICAgICAgICAnSG91c2Vob2xkJyxcbiAgICAgICAgJ1NlY3Rpb25zJ1xuICAgIF07XG5cbiAgICBmdW5jdGlvbiBob3VzZWhvbGRJbmNvbWUgKCRzY29wZSwgJHN0YXRlLCBBdXRoLCBIb3VzZWhvbGQsIFNlY3Rpb25zLCBIb3VzZWhvbGRJbmNvbWUpIHtcbiAgICAgICAgdmFyIHZtID0gJHNjb3BlO1xuICAgICAgICB2YXIgaG91c2Vob2xkID0gSG91c2Vob2xkLmdldCgpO1xuXG4gICAgICAgIHZhciB3b3JrID0ge1xuICAgICAgICAgICAgY2F0ZWdvcnlOYW1lOiAnd29yaycsXG4gICAgICAgICAgICBoZWFkbGluZTogJ1dvcmsgSW5jb21lJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAnZWFybiBtb25leSB0aHJvdWdoIHdvcmsnLFxuICAgICAgICAgICAgc291cmNlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J3dvcmsnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnV29yayBvdXRzaWRlIHRoZSBob21lIGluIGEgbm9uLW1pbGl0YXJ5IGNhcGFjaXR5ICcsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdFYXJuaW5ncyBmcm9tIHdvcmsnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ1BsZWFzZSByZXBvcnQgZ3Jvc3MgaW5jb21lLiBUaGlzIGlzIHRoZSBhbW91bnQgb2YgaW5jb21lIGVhcm5lZCBiZWZvcmUgYW55IG1vbmV5IGlzIHRha2VuIG91dCBmb3IgdGF4ZXMgb3IgZGVkdWN0aW9ucy4gSW5jbHVkZSBzYWxhcnksIHdhZ2VzLCBhbmQgY2FzaCBib251c2VzLidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J3NlbGZFbXBsb3llZCcsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdFYXJuaW5ncyBmcm9tIHNlbGYgZW1wbG95bWVudCcsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdTZWxmLWVtcGxveWVkJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdGb3IgaG91c2Vob2xkIG1lbWJlcnMgdGhhdCBhcmUgc2VsZi1lbXBsb3llZCwgcmVwb3J0IGluY29tZSBmcm9tIHRoYXQgd29yayBhcyBhIG5ldCBhbW91bnQuIFRoaXMgaXMgY2FsY3VsYXRlZCBieSBzdWJ0cmFjdGluZyB0aGUgdG90YWwgb3BlcmF0aW5nIGV4cGVuc2VzIG9mIHRoZSBidXNpbmVzcyBmcm9tIGl0cyBncm9zcyByZWNlaXB0cyBvciByZXZlbnVlLidcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTonb25TdHJpa2UnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnT24gU3RyaWtlJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1N0cmlrZSBCZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBhZGQgc3BhY2UgZm9yIGhvdXNpbmcgYWxsb3dhbmNlIHBlciBkb2NcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J21pbGl0YXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ0luIHRoZSBVLlMuIG1pbGl0YXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0Jhc2ljIHBheSBhbmQgY2FzaCBib251c2VzJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdQbGVhc2UgZG8gbm90IGluY2x1ZGUgY29tYmF0IHBheSwgRlNTQSwgb3IgcHJpdmF0ZSBob3VzaW5nIGFsbG93YW5jZXMuJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcHVibGljQXNzaXN0YW5jZSA9IHtcbiAgICAgICAgICAgIGNhdGVnb3J5TmFtZTogJ3B1YmxpY0Fzc2lzdGFuY2UnLFxuICAgICAgICAgICAgaGVhZGxpbmU6ICdQdWJsaWMgQXNzaXN0YW5jZScsXG4gICAgICAgICAgICBxdWVzdGlvbjogJ3JlY2VpdmUgYW55IHB1YmxpYyBhc3Npc3RhbmNlIGJlbmVmaXRzJyxcbiAgICAgICAgICAgIHNvdXJjZXM6W1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J3VuZW1wbG95bWVudCcsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdVbmVtcGxveW1lbnQgYmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnVW5lbXBsb3ltZW50IGJlbmVmaXRzJyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOid3b3JrZXJzQ29tcCcsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdXb3JrZXLigJlzIGNvbXBlbnNhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdXb3JrZXLigJlzIGNvbXBlbnNhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTonc3NpJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1N1cHBsZW1lbnRhbCBTZWN1cml0eSBJbmNvbWUgKFNTSSknLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnU3VwcGxlbWVudGFsIFNlY3VyaXR5IEluY29tZSAoU1NJKScsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTonY2FzaEFzc2lzdGFuY2UnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnQ2FzaCBhc3Npc3RhbmNlIGZyb20gU3RhdGUgb3IgbG9jYWwgZ292ZXJubWVudCcsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdDYXNoIGFzc2lzdGFuY2UnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ1RoaXMgY291bGQgaW5jbHVkZSBUQU5GIG9yIEdlbmVyYWwgQXNzaXN0YW5jZSBtb25leSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6J3ZldGVyYW5zQmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnVmV0ZXJhbuKAmXMgYmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnVmV0ZXJhbuKAmXMgYmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbjogJ1RoaXMgY291bGQgaW5jbHVkZSBUQU5GIG9yIEdlbmVyYWwgQXNzaXN0YW5jZSBtb25leSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGFsaW1vbnkgPSB7XG4gICAgICAgICAgICBjYXRlZ29yeU5hbWU6ICdhbGltb255JyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiAnQWxpbW9ueScsXG4gICAgICAgICAgICBxdWVzdGlvbjogJ3JlY2VpdmUgYWxpbW9ueSBwYXltZW50cycsXG4gICAgICAgICAgICBzb3VyY2VzOltcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAnYWxpbW9ueScsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdhbGltb255IHBheW1lbnRzJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0FsaW1vbnkgcGF5bWVudCcsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnSWYgaW5jb21lIGlzIHJlY2VpdmVkIGZyb20gY2hpbGQgc3VwcG9ydCBvciBhbGltb255LCBvbmx5IGNvdXJ0LW9yZGVyZWQgcGF5bWVudHMgc2hvdWxkIGJlIHJlcG9ydGVkIGhlcmUuIEluZm9ybWFsIGJ1dCByZWd1bGFyIHBheW1lbnRzIHNob3VsZCBiZSByZXBvcnRlZCBsYXRlciBhcyDigJxvdGhlcuKAnSBpbmNvbWUuJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgY2hpbGRTdXBwb3J0ID0ge1xuICAgICAgICAgICAgY2F0ZWdvcnlOYW1lOiAnY2hpbGRTdXBwb3J0JyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiAnQ2hpbGQgU3VwcG9ydCcsXG4gICAgICAgICAgICBxdWVzdGlvbjogJ3JlY2VpdmUgYW55IGNoaWxkIHN1cHBvcnQnLFxuICAgICAgICAgICAgc291cmNlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdjaGlsZFN1cHBvcnQnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnYW55IGNoaWxkIHN1cHBvcnQnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnQ2hpbGQgc3VwcG9ydCBwYXltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb246ICdJZiBpbmNvbWUgaXMgcmVjZWl2ZWQgZnJvbSBjaGlsZCBzdXBwb3J0IG9yIGNoaWxkU3VwcG9ydCwgb25seSBjb3VydC1vcmRlcmVkIHBheW1lbnRzIHNob3VsZCBiZSByZXBvcnRlZCBoZXJlLiBJbmZvcm1hbCBidXQgcmVndWxhciBwYXltZW50cyBzaG91bGQgYmUgcmVwb3J0ZWQgbGF0ZXIgYXMg4oCcb3RoZXLigJ0gaW5jb21lLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJldGlyZW1lbnQgPSB7XG4gICAgICAgICAgICBjYXRlZ29yeU5hbWU6ICdyZXRpcmVtZW50JyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiAnUGVuc2lvbiBhbmQgUmV0aXJlbWVudCcsXG4gICAgICAgICAgICBxdWVzdGlvbjogJ3JlY2VpdmUgYW55IHBlbnNpb24gb3IgcmV0aXJlbWVudCBtb25leScsXG4gICAgICAgICAgICBzb3VyY2VzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ3NvY2lhbFNlY3VyaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1NvY2lhbCBTZWN1cml0eSAoaW5jbHVkaW5nIHJhaWxyb2FkIHJldGlyZW1lbnQgYW5kIGJsYWNrIGx1bmcgYmVuZWZpdHMpJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ1NvY2lhbCBzZWN1cml0eScsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnUGxlYXNlIGluY2x1ZGUgcmFpbHJvYWQgcmV0aXJlbWVudCBhbmQgYmxhY2sgbHVuZyBiZW5lZml0cydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdwcml2YXRlUGVuc2lvbicsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdQcml2YXRlIHBlbnNpb25zIG9yIGRpc2FiaWxpdHknLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnUHJpdmF0ZSBwZW5zaW9ucyBvciBkaXNhYmlsaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvdGhlckluY29tZSA9IHtcbiAgICAgICAgICAgIGNhdGVnb3J5TmFtZTogJ290aGVySW5jb21lJyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiAnT3RoZXIgSW5jb21lJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAncmVjaWV2ZSBtb25leSB0aHJvdWdoIGFueSBvdGhlciBzb3VyY2UnLFxuICAgICAgICAgICAgc291cmNlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICd0cnVzdHMnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnSW5jb21lIGZyb20gdHJ1c3RzIG9yIGVzdGF0ZXMnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnSW5jb21lIGZyb20gdHJ1c3RzIG9yIGVzdGF0ZXMnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdhbm51aXRpZXMnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnQW5udWl0aWVzJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRMYWJlbDogJ0luY29tZSBmcm9tIGFubnVpdGllcycsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ2ludmVzdG1lbnQnLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveExhYmVsOiAnSW52ZXN0bWVudCBpbmNvbWUnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnSW52ZXN0bWVudCBpbmNvbWUnLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmF1bGU6ICdpbnRlcmVzdCcsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdFYXJuZWQgaW50ZXJlc3QnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnRWFybmVkIGludGVyZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBbJ3dlZWtseScsICdiaXdlZWtseScsICcyeCBtb250aCcsICdtb250aGx5J10sXG4gICAgICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb246ICcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhdWxlOiAncmVudGFsSW5jb21lJyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hMYWJlbDogJ1JlbnRhbCBpbmNvbWUnLFxuICAgICAgICAgICAgICAgICAgICBzaG9ydExhYmVsOiAnUmVudGFsIGluY29tZScsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXVsZTogJ290aGVyQ2FzaCcsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94TGFiZWw6ICdSZWd1bGFyIGNhc2ggcGF5bWVudHMgZnJvbSBvdXRzaWRlIGhvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TGFiZWw6ICdSZWd1bGFyIGNhc2ggcGF5bWVudHMgZnJvbSBvdXRzaWRlIGhvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiAnU3VjaCBjYXNoIHBheW1lbnRzIHNob3VsZCBpbmNsdWRlIHJlZ3VsYXIgY2hpbGQgc3VwcG9ydCBvciBhbGltb255IHBheW1lbnRzIHJlY2VpdmVkIGJ5IHRoZSBob3VzZWhvbGQgdGhhdCBhcmUgbm90IGNvdXJ0LW9yZGVyZWQuJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gbmF2aWdhdGVUb05leHRTZWN0aW9uKCkge1xuICAgICAgICAgICAgSG91c2Vob2xkLnNhdmUoKTtcbiAgICAgICAgICAgIHZhciB1cGRhdGVkID0gU2VjdGlvbnMudXBkYXRlUmVxdWlyZWRTZWN0aW9ucygkc2NvcGUuaG91c2Vob2xkKTtcbiAgICAgICAgICAgIFNlY3Rpb25zLm5hdmlnYXRlVG9OZXh0KCRzdGF0ZS4kY3VycmVudC5zZWxmLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluY29tZUNhdGVnb3JpZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1YmxpY0Fzc2lzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaW1vbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkU3VwcG9ydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0aXJlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJJbmNvbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIHZtLmhvdXNlaG9sZCA9IGhvdXNlaG9sZDtcbiAgICAgICAgdm0ubmF2aWdhdGVUb05leHRTZWN0aW9uID0gbmF2aWdhdGVUb05leHRTZWN0aW9uO1xuICAgICAgICB2bS5pbmNvbWVDYXRlZ29yaWVzID0gaW5jb21lQ2F0ZWdvcmllcztcblxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgLmNvbnRyb2xsZXIoJ2xvZ2luQ29udHJvbGxlcicsIFtsb2dpbkNvbnRyb2xsZXJdKTtcbiAgICBsb2dpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2F0aW9uJywgJyRzY29wZSddO1xuICAgIGZ1bmN0aW9uIGxvZ2luQ29udHJvbGxlcigkbG9jYXRpb24sICRzY29wZSkge1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG4gICAgICAgIC8vIGRlYnVnZ2VyO1xuICAgICAgICAvLyB2bS5lcnJvciA9ICRsb2NhdGlvbjtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignbWFpbkNvbnRyb2xsZXInLCBtYWluQ29udHJvbGxlcik7XG5cbiAgICBtYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1xuICAgICAgICAnJGh0dHAnLFxuICAgICAgICAnJGludGVydmFsJyxcbiAgICAgICAgJyRtZERpYWxvZycsXG4gICAgICAgICckbWRNZWRpYScsXG4gICAgICAgICckc2NvcGUnLFxuICAgICAgICAnJHN0YXRlJyxcbiAgICAgICAgJ0F1dGgnLFxuICAgICAgICAnSG91c2Vob2xkJyxcbiAgICAgICAgJ1NlY3Rpb25zJ1xuICAgIF07XG5cbiAgICBmdW5jdGlvbiBtYWluQ29udHJvbGxlciAoJGh0dHAsICRpbnRlcnZhbCwgJG1kRGlhbG9nLCAkbWRNZWRpYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLCAkc3RhdGUsIEF1dGgsIEhvdXNlaG9sZCwgU2VjdGlvbnMpIHtcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG5cbiAgICAgICAgdm0uaG91c2Vob2xkID0gSG91c2Vob2xkLmdldCgpO1xuICAgICAgICB2bS5zY2hvb2xEaXN0cmljdCA9ICdPYWtsYW5kIFVuaWZpZWQgU2Nob29sIERpc3RyaWN0JztcblxuICAgICAgICB2bS5uYXZpZ2F0ZVRvTmV4dFNlY3Rpb24gPSBuYXZpZ2F0ZVRvTmV4dFNlY3Rpb247XG4gICAgICAgIHZtLnN1Ym1pdEFwcGxpY2F0aW9uID0gc3VibWl0QXBwbGljYXRpb247XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICBmdW5jdGlvbiBhZGRDaGlsZChuZXdWYWwpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPiAkc2NvcGUuaG91c2Vob2xkLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRodHRwLmdldCgnL2NoaWxkJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Q2hpbGQgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaG91c2Vob2xkLmNoaWxkcmVuLnB1c2gobmV3Q2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBhZGRDaGlsZChuZXdWYWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzogTW92ZSB0byBtb25nb29zZSBtb2RlbFxuICAgICAgICB2YXIgSG91c2Vob2xkTWVtYmVyID0ge1xuICAgICAgICAgICAgaW5jb21lOiB7fVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gYWRkT3RoZXJNZW1iZXIobmV3VmFsKSB7XG4gICAgICAgICAgICB3aGlsZSAobmV3VmFsID4gJHNjb3BlLmhvdXNlaG9sZC5vdGhlck1lbWJlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhvdXNlaG9sZE1lbWJlciA9IE9iamVjdC5jcmVhdGUoSG91c2Vob2xkTWVtYmVyKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaG91c2Vob2xkLm90aGVyTWVtYmVycy5wdXNoKGhvdXNlaG9sZE1lbWJlcik7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG5hdmlnYXRlVG9OZXh0U2VjdGlvbigpIHtcbiAgICAgICAgICAgIEhvdXNlaG9sZC5zYXZlKCk7XG4gICAgICAgICAgICB2YXIgdXBkYXRlZCA9IFNlY3Rpb25zLnVwZGF0ZVJlcXVpcmVkU2VjdGlvbnMoJHNjb3BlLmhvdXNlaG9sZCk7XG4gICAgICAgICAgICBTZWN0aW9ucy5uYXZpZ2F0ZVRvTmV4dCgkc3RhdGUuJGN1cnJlbnQuc2VsZi5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHN1Ym1pdEFwcGxpY2F0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmhvdXNlaG9sZC5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgbmF2aWdhdGVUb05leHRTZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXYXRjaGVyc1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdob3VzZWhvbGQuY2hpbGRDb3VudCcsIGFkZENoaWxkKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaG91c2Vob2xkLm90aGVyTWVtYmVyc0NvdW50JywgYWRkT3RoZXJNZW1iZXIpO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdzaWRlTmF2Q29udHJvbGxlcicsIHNpZGVOYXZDb250cm9sbGVyKTtcblxuICAgIHNpZGVOYXZDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckc3RhdGUnLCAnU2VjdGlvbnMnXTtcblxuICAgIGZ1bmN0aW9uIHNpZGVOYXZDb250cm9sbGVyICgkc2NvcGUsICRzdGF0ZSwgU2VjdGlvbnMpIHtcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgICAgICB2YXIgdm0gPSAkc2NvcGU7XG5cbiAgICAgICAgdm0uY3VycmVudFN0YXRlID0gJHN0YXRlLiRjdXJyZW50LnNlbGYubmFtZTtcbiAgICAgICAgdm0uc2VjdGlvbnMgPSBTZWN0aW9ucy5zZWN0aW9ucztcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuZGlyZWN0aXZlKCdpbmNvbWVRdWVzdGlvbnMnLCBpbmNvbWVEaXJlY3RpdmUpO1xuXG4gICAgZnVuY3Rpb24gaW5jb21lRGlyZWN0aXZlKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtZW1iZXI6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9pbmNvbWUuaHRtbCcsXG4gICAgICAgICAgICBsaW5rOiBsaW5rXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9XG5cbiAgICAvLyBsaW5rLiRpbmplY3QgPSBbJ3Njb3BlJ107XG5cbiAgICBmdW5jdGlvbiBsaW5rKHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLmluY29tZVNvdXJjZXMgPSB7XG4gICAgICAgICAgICB3b3JrOiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J3dvcmsnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnRWFybmluZ3MgZnJvbSB3b3JrJyxcbiAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiAnQSBjaGlsZCBoYXMgYSBqb2Igd2hlcmUgdGhleSBlYXJuIHNhbGFyeSBvciB3YWdlcyAnLFxuICAgICAgICAgICAgICAgICAgICBvdGhlck1lbWJlcjogJycsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvY2lhbFNlY3VyaXR5OiB7XG4gICAgICAgICAgICAgICAgdmF1bGU6J3NvY2lhbFNlY3VyaXR5JyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1NvY2lhbCBTZWN1cml0eSBEaXNhYmlsaXR5IFBheW1lbnRzIG9yIFN1cnZpdm9y4oCZcyBCZW5lZml0cyAnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWydtb250aGx5J10sXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZDogJ0EgY2hpbGQgaXMgYmxpbmQgb3IgZGlzYWJsZWQgYW5kIHJlY2VpdmVzIFNvY2lhbCBTZWN1cml0eSBiZW5lZml0cy4nLFxuICAgICAgICAgICAgICAgICAgICAvLyAnIEEgcGFyZW50IGlzIGRpc2FibGVkLCByZXRpcmVkLCBvciBkZWNlYXNlZCwgYW5kIHRoZWlyIGNoaWxkIHJlY2VpdmVzIHNvY2lhbCBzZWN1cml0eSBiZW5lZml0cycsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyTWVtYmVyOiAnJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3RoZXJQZXJzb246IHtcbiAgICAgICAgICAgICAgICB2YXVsZTonb3RoZXJQZXJzb24nLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnSW5jb21lIGZyb20gcGVyc29ucyBvdXRzaWRlIHRoZSBob3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogWyd3ZWVrbHknLCAnYml3ZWVrbHknLCAnMnggbW9udGgnLCAnbW9udGhseSddLFxuICAgICAgICAgICAgICAgIGFubm90YXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6ICdBIGZyaWVuZCBvciBleHRlbmRlZCBmYW1pbHkgbWVtYmVyIHJlZ3VsYXJseSBnaXZlcyBhIGNoaWxkIHNwZW5kaW5nIG1vbmV5JyxcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJNZW1iZXI6ICcnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdGhlclNvdXJjZToge1xuICAgICAgICAgICAgICAgIHZhdWxlOidvdGhlclNvdXJjZScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdJbmNvbWUgZnJvbSBhbnkgb3RoZXIgc291cmNlJyxcbiAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IFsnd2Vla2x5JywgJ2Jpd2Vla2x5JywgJzJ4IG1vbnRoJywgJ21vbnRobHknXSxcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiAnQSBjaGlsZCByZWNlaXZlcyBpbmNvbWUgZnJvbSBhIHByaXZhdGUgcGVuc2lvbiBmdW5kLCBhbm51aXR5LCBvciB0cnVzdCcsXG4gICAgICAgICAgICAgICAgICAgIG90aGVyTWVtYmVyOiAnJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNjb3BlLm1lbWJlci5pbmNvbWVTb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2NvcGUubWVtYmVyLmluY29tZVNvdXJjZXMgPSBbXTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHNjb3BlLmluY29tZVNvdXJjZXMpLmZvckVhY2goZnVuY3Rpb24oaW5jb21lU291cmNlKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUubWVtYmVyLmluY29tZVNvdXJjZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGluY29tZVNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IG51bGxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmRpcmVjdGl2ZSgneWVzTm9JbnB1dCcsIHllc05vSW5wdXQpO1xuXG4gICAgZnVuY3Rpb24geWVzTm9JbnB1dCAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIG1vZGVsOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MveWVzbm8uaHRtbCcsXG4gICAgICAgIH07XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLnNlcnZpY2UoJ0F1dGgnLCBBdXRoKTtcblxuICAgIEF1dGguJGluamVjdCA9IFsnJGh0dHAnXTtcblxuICAgIGZ1bmN0aW9uIEF1dGgoJGh0dHApIHtcblxuICAgICAgICB2YXIgdXNlciA9IGZhbHNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNpZ251cChlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvdXNlci9zaWdudXAnLCBkYXRhKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB1c2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gLmVycm9yKGZ1bmN0aW9uKGRhdGEpIHt9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9naW4oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvdXNlci9sb2dpbicsIGRhdGEpXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHVzZXIgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAuZXJyb3IoZnVuY3Rpb24oZGF0YSkge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9nb3V0KCkge1xuICAgICAgICAgICAgJGh0dHAucG9zdCgnL3VzZXIvbG9nb3V0Jykuc3VjY2VzcyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB1c2VyID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8vLy8vLy9cbiAgICAgICAgdmFyIHNlcnZpY2UgID0ge1xuICAgICAgICAgICAgbG9naW46IGxvZ2luLFxuICAgICAgICAgICAgbG9nb3V0OiBsb2dvdXQsXG4gICAgICAgICAgICB1c2VyOiB1c2VyXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLnNlcnZpY2UoJ0hvdXNlaG9sZCcsIGhvdXNlaG9sZFNlcnZpY2UpO1xuXG4gICAgaG91c2Vob2xkU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCddO1xuXG4gICAgZnVuY3Rpb24gaG91c2Vob2xkU2VydmljZSgkaHR0cCkge1xuICAgICAgICB0aGlzLmdldCA9IGdldDtcbiAgICAgICAgdGhpcy5zYXZlID0gc2F2ZTtcbiAgICAgICAgdGhpcy5jbGVhciA9IGNsZWFyO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgdmFyIGhvdXNlaG9sZDtcblxuICAgICAgICB2YXIgUGVyc29uID0ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNvbWVTb3VyY2VDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNvbWVTb3VyY2VzID0gW107XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFRvZG86IGNvbnNpZGVyIG1vdmluZyB0byBzZXJ2ZXI/P1xuICAgICAgICB2YXIgSG91c2Vob2xkID0ge1xuICAgICAgICAgICAgY2hpbGRDb3VudDogMCxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgICAgIG90aGVyTWVtYmVyc0NvdW50OiAwLFxuICAgICAgICAgICAgb3RoZXJNZW1iZXJzOiBbXSxcbiAgICAgICAgICAgIGNvbXBsZXRlZEFwcGxpY2F0aW9uOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIGlmIChob3VzZWhvbGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG91c2Vob2xkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaG91c2Vob2xkID0gT2JqZWN0LmNyZWF0ZShIb3VzZWhvbGQpO1xuICAgICAgICAgICAgcmV0dXJuIGhvdXNlaG9sZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2hvdXNlaG9sZCcsIGhvdXNlaG9sZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGhvdXNlaG9sZCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICAgICAgICAgIHZhciBob3VzZWhvbGQgPSB7fTtcbiAgICAgICAgICAgIHJldHVybiBob3VzZWhvbGQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdlYXRDaGFsbGVuZ2VBcHAnKVxuICAgICAgICAuc2VydmljZSgnU2VjdGlvbnMnLCBzZWN0aW9uc1NlcnZpY2UpO1xuXG4gICAgc2VjdGlvbnNTZXJ2aWNlLiRpbmplY3QgPSBbJyRyb290U2NvcGUnICwnJHN0YXRlJ107XG5cbiAgICBmdW5jdGlvbiBzZWN0aW9uc1NlcnZpY2UoJHJvb3RTY29wZSwgJHN0YXRlKSB7XG4gICAgICAgIHZhciBwcmV2aW91c1N0YXRlLFxuICAgICAgICAgICAgY3VycmVudFN0YXRlO1xuXG4gICAgICAgIHZhciBzZWN0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNoaWxkcmVuJ3MgSW5jb21lXCIsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdjaGlsZEluY29tZScsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0hvdXNlaG9sZCcsXG4gICAgICAgICAgICAgICAgc3RhdGU6ICdob3VzZWhvbGQnLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdIb3VzZWhvbGQgSW5jb21lJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ2hvdXNlaG9sZEluY29tZScsXG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1NpZ24gYW5kIENvbmZpcm0nLFxuICAgICAgICAgICAgICAgIHN0YXRlOiAnc2lnbmF0dXJlJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHZhciBpbmRleGVkU2VjdGlvbnMgPSBfLmluZGV4Qnkoc2VjdGlvbnMsICdzdGF0ZScpO1xuXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xuICAgICAgICAgICAgc2VjdGlvbnM6IHNlY3Rpb25zLFxuICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zOiBpbmRleGVkU2VjdGlvbnMsXG4gICAgICAgICAgICBuYXZpZ2F0ZVRvTmV4dDogbmF2aWdhdGVUb05leHQsXG4gICAgICAgICAgICB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zOiB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVSZXF1aXJlZFNlY3Rpb25zKGhvdXNlaG9sZCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRDaGlsZDtcbiAgICAgICAgICAgIHZhciBhc3Npc3RhbmNlUHJvZ3JhbUhvdXNlaG9sZCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHNwZWNpYWxTdGF0dXNDb3VudCA9IDA7XG4gICAgICAgICAgICB2YXIgc2tpcE1lYW5zVGVzdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCBob3VzZWhvbGQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQgPSBob3VzZWhvbGQuY2hpbGRyZW5baV07XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudENoaWxkLmFzc2lzdGFuY2VQcm9ncmFtICYmIGN1cnJlbnRDaGlsZC5hc3Npc3RhbmNlUHJvZ3JhbS5wYXJ0aWNpcGFudCkge1xuICAgICAgICAgICAgICAgICAgICBhc3Npc3RhbmNlUHJvZ3JhbUhvdXNlaG9sZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cyAmJiBjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5mb3N0ZXJDaGlsZCB8fFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQuc3BlY2lhbFN0YXR1cy5ob21lbGVzc01pZ3JhbnRSdW5hd2F5IHx8XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZC5zcGVjaWFsU3RhdHVzLmhlYWRTdGFydFBhcnRpY2lwYW50XG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWNpYWxTdGF0dXNDb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2tpcE1lYW5zVGVzdCA9IGFzc2lzdGFuY2VQcm9ncmFtSG91c2Vob2xkIHx8XG4gICAgICAgICAgICAgICAgKGhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgIGhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGggPT09IHNwZWNpYWxTdGF0dXNDb3VudCk7XG5cbiAgICAgICAgICAgIGlmIChza2lwTWVhbnNUZXN0KSB7XG4gICAgICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zWydjaGlsZEluY29tZSddLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5kZXhlZFNlY3Rpb25zWydob3VzZWhvbGQnXS5yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGluZGV4ZWRTZWN0aW9uc1snaG91c2Vob2xkSW5jb21lJ10ucmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24ucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmROZXh0KGN1cnJlbnRTdGF0ZSkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IF8uZmluZEluZGV4KHNlY3Rpb25zLCBmdW5jdGlvbihzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb24uc3RhdGUgPT09IGN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBMb29rIGZvciB0aGUgbmV4dCByZXF1aXJlZCBzZWN0aW9uXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gY3VycmVudEluZGV4ICsgMTsgaSA8IHNlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlY3Rpb25zW2ldLnJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWN0aW9uc1tpXS5zdGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIHJlcXVpcmVkIHNlY3Rpb25zLCB3ZSdyZSBkb25lLlxuICAgICAgICAgICAgcmV0dXJuICdjb25maXJtYXRpb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbmF2aWdhdGVUb05leHQoY3VycmVudFN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgbmV4dFNlY3Rpb24gID0gZmluZE5leHQoY3VycmVudFN0YXRlKTtcbiAgICAgICAgICAgICRzdGF0ZS5nbyhuZXh0U2VjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihldiwgdG8sIHRvUGFyYW1zLCBmcm9tLCBmcm9tUGFyYW1zKSB7XG4gICAgICAgICAgICBwcmV2aW91c1N0YXRlID0gZnJvbS5uYW1lO1xuICAgICAgICAgICAgY3VycmVudFN0YXRlID0gdG8ubmFtZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQcmV2aW91cyBzdGF0ZTonICsgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ3VycmVudCBzdGF0ZTonICsgY3VycmVudFN0YXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
