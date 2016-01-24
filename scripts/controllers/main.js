(function(){

angular
    .module('eatChallengeApp')
    .controller('mainController', mainController);

    mainController.$inject = ['$mdDialog', '$mdMedia', '$scope'];

    function mainController ($mdDialog, $mdMedia, $scope) {            
      $scope.studentStatuses = ['in school', 'home schooled', 'some other status'];
      // Classes
      var Person = {
        init: function() {
          this.incomeSourceCount= 0;
          this.incomeSources= [];
        },

        incrementIncomeSources: function(){
          this.incomeSourceCount++;
          while(this.incomeSourceCount > this.incomeSources.length) {
            this.incomeSources.push({});
          }
        }
      };


      var Household = {
        init: function () {
          this.children = [];
          this.childCount = 0;
          this.incrementChildCount();

          this.otherMembers = [];
          this.otherMembersCount = 0;
          this.incrementOtherMembersCount();
        },

        incrementChildCount: function(){
          this.childCount++;
          while (this.childCount > this.children.length) {
            var newChild = Object.create(Person)
            newChild.init();
            this.children.push(newChild);
          }
        },

        incrementOtherMembersCount: function() {
          this.otherMembersCount++;
          while (this.otherMembersCount > this.otherMembers.length) {
            var newMember = Object.create(Person);
            newMember.init();
            this.otherMembers.push(newMember);
          }
        }

      }


      var household = Object.create(Household)
      household.init();
      // TODO: replace scope with vm
      $scope.household = household

      $scope.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete this entry?')
          .textContent('The data you have entered about this child will be removed')
          .ariaLabel('delete child')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');
      $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };

    };

})();
