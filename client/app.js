(function() {
    'use strict';

    angular
    .module('eatChallengeApp',['ngCookies', 'ngCsv','ngMaterial', 'ngSanitize', 'ui.router'])
    .config(routerConfig)
    .config(materialDesignThemer)
    .config(errorDecorator)
    .run(scroller);
    ///////////////////////////////////

    //Show source maps in errors
    errorDecorator.$inject = ['$provide'];
    function errorDecorator($provide) {
        $provide.decorator('$exceptionHandler', decorateError);
        decorateError.$inject = ['$delegate'];
        function decorateError($delegate) {
            return function(exception, cause) {
                $delegate(exception, cause);
                throw exception;
            };
        }
    }

    //Routing enhancements
    scroller.$inject = ['$rootScope'];
    function scroller($rootScope) {
        // scroll to the top on page transition
        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        // Keep track of history
        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from.name;
            $rootScope.currentState = to.name;
        });
    }

    //Color themes for buttons
    materialDesignThemer.$inject = ['$mdThemingProvider'];
    function materialDesignThemer($mdThemingProvider) {
        $mdThemingProvider.theme('default').primaryPalette('teal')
                          .backgroundPalette('brown', {'default': '50'})
                          .foregroundPalette[3] = 'rgba(0,0,0,0.67)';
    }

    // UI router
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
                    // 'user-controls': {
                    //     templateUrl: '../views/user-controls.html',
                    //     controller: 'userControlsController'
                    // },
                    // 'side-nav': {
                    //     templateUrl: '../views/sideNav.html',
                    //     controller: 'sideNavController'
                    // },
                    'main': {
                        templateUrl: '../views/start.html',
                        controller: 'mainController'
                    }
                }
            })
            .state('children', {
                url: '/children',
                views:{
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
                    //     'side-nav': {
                    //     templateUrl: '../views/sideNav.html',
                    //     controller: 'sideNavController'
                    // },
                    'main': {
                    templateUrl: '../views/children.html',
                    controller: 'mainController'
                }
                }
            })
            .state('childIncome', {
                url: '/childIncome',
                views:{
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
                    //     'side-nav': {
                    //     templateUrl: '../views/sideNav.html',
                    //     controller: 'sideNavController'
                    // },
                    'main': {
                    templateUrl: '../views/childIncome.html',
                    controller: 'mainController'
                }
                }
            })
            .state('household', {
                url: '/household',
                views:{
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
                    // 'side-nav': {
                    //     templateUrl: '../views/sideNav.html',
                    //     controller: 'sideNavController'
                    // },
                    'main': {
                        templateUrl: '../views/household.html',
                        controller: 'mainController'
                    }
                }
            })
            .state('householdIncome', {
                url: '/household-income',
                views:{
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
                    // 'side-nav': {
                    //     templateUrl: '../views/sideNav.html',
                    //     controller: 'sideNavController'
                    // },
                    'main': {
                        templateUrl: '../views/householdIncome.html',
                        controller: 'householdIncome'
                    }
                }
            })
            .state('disclosure', {
                url: '/disclosure',
                views:{
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
                    // 'side-nav': {
                    //     templateUrl: '../views/sideNav.html',
                    //     controller: 'sideNavController'
                    // },
                    'main': {
                        templateUrl: '../views/disclosure.html',
                        controller: 'mainController'
                    }
                }
            })
            .state('signature', {
                url: '/signature',
                views:{
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
                    //     'side-nav': {
                    //     templateUrl: '../views/sideNav.html',
                    //     controller: 'sideNavController'
                    // },
                    'main': {
                    templateUrl: '../views/signature.html',
                    controller: 'mainController'
                }
                }
            })
            .state('confirmation', {
                url: '/confirmation',
                views:{
                    // 'user-controls': {
                    //     templateUrl: '../views/user-controls.html',
                    //     controller: 'userControlsController'
                    // },
                    //     'side-nav': {
                    //     templateUrl: '../views/sideNav.html',
                    //     controller: 'sideNavController'
                    // },
                    'main': {
                    templateUrl: '../views/confirmation.html',
                    controller: 'mainController'
                }
                }
            })
            .state('export', {
                url: '/export',
                views: {
                    // 'user-controls': {
                    //     templateUrl: '../views/user-controls.html',
                    //     controller: 'userControlsController'
                    // },
                    // 'side-nav': {
                    //     templateUrl: '../views/sideNav.html',
                    //     controller: 'sideNavController'
                    // },
                    'main': {
                        templateUrl: '../views/export.html',
                        controller: 'exportController'
                    }
                }
            })
            .state('signup', {
                url: '/signup',
                views:{
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
                    // 'side-nav': {
                    //     templateUrl: '../views/sideNav.html',
                    //     controller: 'sideNavController'
                    // },
                    'main': {
                        templateUrl: '../views/signup.html',
                        controller: 'signupController'
                    }
                }

            })
            .state('login', {
                url: '/login',
                views:{
                    // 'user-controls': {
                    //     templateUrl: '../views/user-controls.html',
                    //     controller: 'userControlsController'
                    // },
                    // 'side-nav': {
                    //     templateUrl: '../views/sideNav.html',
                    //     controller: 'sideNavController'
                    // },
                    'main': {
                        templateUrl: '../views/login.html',
                        controller: 'loginController'
                    }
                }
            })
            .state('soFar', {
                url: '/so-far',
                views:{
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
                    'side-nav': {
                        templateUrl: '../views/sideNav.html',
                        controller: 'sideNavController'
                    },
                    'main': {
                        templateUrl: '../views/soFar.html',
                        controller: 'soFarController'
                    }
                }
            })
            .state('saveAndExit', {
                url: '/save-and-exit',
                views:{
                    // 'user-controls': {
                    //     templateUrl: '../views/user-controls.html',
                    //     controller: 'userControlsController'
                    // },
                    //     'side-nav': {
                    //     templateUrl: '../views/sideNav.html',
                    //     controller: 'sideNavController'
                    // },
                    'main': {
                        templateUrl: '../views/save-and-exit.html',
                        controller: 'mainController'
                    }
                }
            });
        }
    }

})();
