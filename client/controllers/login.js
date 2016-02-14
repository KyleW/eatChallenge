(function() {

    angular
      .module('eatChallengeApp')
      .controller('loginController', [loginController]);

    function loginController() {
        var loginVM = this;
        console.log('running ok');
    }

})();
