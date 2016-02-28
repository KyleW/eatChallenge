(function() {
    'use strict';

    angular
    .module('eatChallengeApp',['ngCookies', 'ngCsv','ngMaterial', 'ngSanitize', 'ui.router'])
    .config(routerConfig)
    .config(materialDesignThemer)
    .config(errorDecorator)
    .run(scroller);

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

    materialDesignThemer.$inject = ['$mdThemingProvider'];
    function materialDesignThemer($mdThemingProvider) {
        $mdThemingProvider.theme('default')
       // .primaryPalette('blue-grey')
       .primaryPalette('teal')
        .backgroundPalette('brown', {
            'default': '50'
        });
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
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
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
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
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
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
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
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
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
                    'user-controls': {
                        templateUrl: '../views/user-controls.html',
                        controller: 'userControlsController'
                    },
                    'side-nav': {
                        templateUrl: '../views/sideNav.html',
                        controller: 'sideNavController'
                    },
                    'main': {
                        templateUrl: '../views/signup.html',
                        controller: 'signupController'
                    }
                }

            })
            .state('login', {
                url: '/login',
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
                //     'side-nav': {
                //     templateUrl: '../views/sideNav.html',
                //     controller: 'sideNavController'
                // },
                    'main': {
                    templateUrl: '../views/soFar.html',
                    controller: 'mainController'
                }
                }
            });
        }
    }

})();
