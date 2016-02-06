!function(){function e(e){e.theme("light-blue")}function t(e,t){function o(e,t){t.otherwise("/"),e.state("start",{url:"/",templateUrl:"../views/start.html",controller:"mainController"}).state("children",{url:"/children",templateUrl:"../views/children.html",controller:"mainController"}).state("childIncome",{url:"/childIncome",templateUrl:"../views/childIncome.html",controller:"mainController"}).state("household",{url:"/household",templateUrl:"../views/household.html",controller:"mainController"}).state("signature",{url:"/signature",templateUrl:"../views/signature.html",controller:"mainController"}).state("confirmation",{url:"/confirmation",templateUrl:"../views/confirmation.html",controller:"mainController"}).state("export",{url:"/export",templateUrl:"../views/export.html",controller:"mainController"}).state("styleguide",{url:"/styleguide",templateUrl:"../views/styleguide.html",controller:"mainController"}).state("signup",{url:"/signup",templateUrl:"../views/signup.html"}).state("signin",{url:"/signin",templateUrl:"../views/signin.html"})}o(e,t)}angular.module("eatChallengeApp",["ngMaterial","ui.router"]).config(t).config(e),e.$inject=["$mdThemingProvider"],t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){function e(e,t,o){o.schoolDistrict="Oakland Unified School District",o.studentStatuses=["in school","home schooled","some other status"];var n={init:function(){this.incomeSourceCount=0,this.incomeSources=[]},incrementIncomeSources:function(){for(this.incomeSourceCount++;this.incomeSourceCount>this.incomeSources.length;)this.incomeSources.push({})}},i={init:function(){this.children=[],this.childCount=0,this.incrementChildCount(),this.otherMembers=[],this.otherMembersCount=0,this.incrementOtherMembersCount()},incrementChildCount:function(){for(this.childCount++;this.childCount>this.children.length;){var e=Object.create(n);e.init(),this.children.push(e)}},incrementOtherMembersCount:function(){for(this.otherMembersCount++;this.otherMembersCount>this.otherMembers.length;){var e=Object.create(n);e.init(),this.otherMembers.push(e)}}},r=Object.create(i);r.init(),o.household=r,o.$watch("household.childCount",function(e){for(;e>o.household.children.length;)o.household.incrementChildCount()}),o.showConfirm=function(t){var n=e.confirm().title("Would you like to delete this entry?").textContent("The data you have entered about this child will be removed").ariaLabel("delete child").targetEvent(t).ok("Yes").cancel("No");e.show(n).then(function(){o.status="You decided to get rid of your debt."},function(){o.status="You decided to keep your debt."})}}angular.module("eatChallengeApp").controller("mainController",e),e.$inject=["$mdDialog","$mdMedia","$scope"]}(),function(){function e(){return{scope:{member:"="},restrict:"A",replace:!0,templateUrl:"../views/income.html"}}angular.module("eatChallengeApp").directive("incomeQuestions",e)}(),function(){function e(){return{scope:{model:"="},restrict:"A",replace:!0,templateUrl:"../views/yesno.html"}}angular.module("eatChallengeApp").directive("yesNoInput",e)}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL21haW4uanMiLCJkaXJlY3RpdmVzL2luY29tZS5qcyIsImRpcmVjdGl2ZXMveWVzbm8uanMiXSwibmFtZXMiOlsibWF0ZXJpYWxEZXNpZ25UaGVtZXIiLCIkbWRUaGVtaW5nUHJvdmlkZXIiLCJ0aGVtZSIsInJvdXRlckNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwicm91dGVyIiwib3RoZXJ3aXNlIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXIiLCJhbmd1bGFyIiwibW9kdWxlIiwiY29uZmlnIiwiJGluamVjdCIsIm1haW5Db250cm9sbGVyIiwiJG1kRGlhbG9nIiwiJG1kTWVkaWEiLCIkc2NvcGUiLCJzY2hvb2xEaXN0cmljdCIsInN0dWRlbnRTdGF0dXNlcyIsIlBlcnNvbiIsImluaXQiLCJ0aGlzIiwiaW5jb21lU291cmNlQ291bnQiLCJpbmNvbWVTb3VyY2VzIiwiaW5jcmVtZW50SW5jb21lU291cmNlcyIsImxlbmd0aCIsInB1c2giLCJIb3VzZWhvbGQiLCJjaGlsZHJlbiIsImNoaWxkQ291bnQiLCJpbmNyZW1lbnRDaGlsZENvdW50Iiwib3RoZXJNZW1iZXJzIiwib3RoZXJNZW1iZXJzQ291bnQiLCJpbmNyZW1lbnRPdGhlck1lbWJlcnNDb3VudCIsIm5ld0NoaWxkIiwiT2JqZWN0IiwiY3JlYXRlIiwibmV3TWVtYmVyIiwiaG91c2Vob2xkIiwiJHdhdGNoIiwibmV3VmFsIiwic2hvd0NvbmZpcm0iLCJldiIsImNvbmZpcm0iLCJ0aXRsZSIsInRleHRDb250ZW50IiwiYXJpYUxhYmVsIiwidGFyZ2V0RXZlbnQiLCJvayIsImNhbmNlbCIsInNob3ciLCJ0aGVuIiwic3RhdHVzIiwiaW5jb21lRGlyZWN0aXZlIiwic2NvcGUiLCJtZW1iZXIiLCJyZXN0cmljdCIsInJlcGxhY2UiLCJkaXJlY3RpdmUiLCJ5ZXNOb0lucHV0IiwibW9kZWwiXSwibWFw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TUFBQSxLQUVBSixTQUFBLElBQ0FDLFNBQUEsRUFDQWxELFlBQUEsdUJBWEFFLFFBQ0FDLE9BQUEsbUJBQ0FnRCxVQUFBLGFBQUFDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcblxuICAgIGFuZ3VsYXJcbiAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcsWyduZ01hdGVyaWFsJywndWkucm91dGVyJ10pXG4gICAgICAuY29uZmlnKHJvdXRlckNvbmZpZylcbiAgICAgIC5jb25maWcobWF0ZXJpYWxEZXNpZ25UaGVtZXIpO1xuXG4gICAgbWF0ZXJpYWxEZXNpZ25UaGVtZXIuJGluamVjdCA9IFsnJG1kVGhlbWluZ1Byb3ZpZGVyJ107XG4gICAgZnVuY3Rpb24gbWF0ZXJpYWxEZXNpZ25UaGVtZXIoJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbGlnaHQtYmx1ZScpO1xuICAgICAgICAvLyAucHJpbWFyeVBhbGV0dGUoJ3BpbmsnLCB7XG4gICAgICAgIC8vICAgJ2RlZmF1bHQnOiAnNDAwJywgLy8gYnkgZGVmYXVsdCB1c2Ugc2hhZGUgNDAwIGZyb20gdGhlIHBpbmsgcGFsZXR0ZSBmb3IgcHJpbWFyeSBpbnRlbnRpb25zXG4gICAgICAgIC8vICAgJ2h1ZS0xJzogJzEwMCcsIC8vIHVzZSBzaGFkZSAxMDAgZm9yIHRoZSA8Y29kZT5tZC1odWUtMTwvY29kZT4gY2xhc3NcbiAgICAgICAgLy8gICAnaHVlLTInOiAnNjAwJywgLy8gdXNlIHNoYWRlIDYwMCBmb3IgdGhlIDxjb2RlPm1kLWh1ZS0yPC9jb2RlPiBjbGFzc1xuICAgICAgICAvLyAgICdodWUtMyc6ICdBMTAwJyAvLyB1c2Ugc2hhZGUgQTEwMCBmb3IgdGhlIDxjb2RlPm1kLWh1ZS0zPC9jb2RlPiBjbGFzc1xuICAgICAgICAvLyB9KVxuICAgICAgICAvLyAvLyBJZiB5b3Ugc3BlY2lmeSBsZXNzIHRoYW4gYWxsIG9mIHRoZSBrZXlzLCBpdCB3aWxsIGluaGVyaXQgZnJvbSB0aGVcbiAgICAgICAgLy8gLy8gZGVmYXVsdCBzaGFkZXNcbiAgICAgICAgLy8gLmFjY2VudFBhbGV0dGUoJ3B1cnBsZScsIHtcbiAgICAgICAgLy8gICAnZGVmYXVsdCc6ICcyMDAnIC8vIHVzZSBzaGFkZSAyMDAgZm9yIGRlZmF1bHQsIGFuZCBrZWVwIGFsbCBvdGhlciBzaGFkZXMgdGhlIHNhbWVcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgcm91dGVyQ29uZmlnLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlciddO1xuXG4gICAgZnVuY3Rpb24gcm91dGVyQ29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgcm91dGVyKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpO1xuXG4gICAgICAgIC8vLy8vLy8vLy9cbiAgICAgICAgZnVuY3Rpb24gcm91dGVyKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAgICAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZSgnc3RhcnQnLCB7XG4gICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zdGFydC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICB9KVxuICAgICAgLnN0YXRlKCdjaGlsZHJlbicsIHtcbiAgICAgICAgICB1cmw6ICcvY2hpbGRyZW4nLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvY2hpbGRyZW4uaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnY2hpbGRJbmNvbWUnLCB7XG4gICAgICAgICAgdXJsOiAnL2NoaWxkSW5jb21lJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2NoaWxkSW5jb21lLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ2hvdXNlaG9sZCcsIHtcbiAgICAgICAgICB1cmw6ICcvaG91c2Vob2xkJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2hvdXNlaG9sZC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICB9KVxuICAgICAgLnN0YXRlKCdzaWduYXR1cmUnLCB7XG4gICAgICAgICAgdXJsOiAnL3NpZ25hdHVyZScsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi92aWV3cy9zaWduYXR1cmUuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnY29uZmlybWF0aW9uJywge1xuICAgICAgICAgIHVybDogJy9jb25maXJtYXRpb24nLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3MvY29uZmlybWF0aW9uLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ2V4cG9ydCcsIHtcbiAgICAgICAgICB1cmw6ICcvZXhwb3J0JyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2V4cG9ydC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICB9KVxuICAgICAgLnN0YXRlKCdzdHlsZWd1aWRlJywge1xuICAgICAgICAgIHVybDogJy9zdHlsZWd1aWRlJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3N0eWxlZ3VpZGUuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ21haW5Db250cm9sbGVyJ1xuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnc2lnbnVwJywge1xuICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdmlld3Mvc2lnbnVwLmh0bWwnLFxuICAgICAgICAgIC8vIGNvbnRyb2xsZXI6ICdtYWluQ29udHJvbGxlcidcbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ3NpZ25pbicsIHtcbiAgICAgICAgICB1cmw6ICcvc2lnbmluJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3NpZ25pbi5odG1sJyxcbiAgICAgICAgICAvLyBjb250cm9sbGVyOiAnbWFpbkNvbnRyb2xsZXInXG4gICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcblxuYW5ndWxhclxuICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ21haW5Db250cm9sbGVyJywgbWFpbkNvbnRyb2xsZXIpO1xuXG5tYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbWREaWFsb2cnLCAnJG1kTWVkaWEnLCAnJHNjb3BlJ107XG5cbmZ1bmN0aW9uIG1haW5Db250cm9sbGVyICgkbWREaWFsb2csICRtZE1lZGlhLCAkc2NvcGUpIHtcbiAgICAkc2NvcGUuc2Nob29sRGlzdHJpY3QgPSAnT2FrbGFuZCBVbmlmaWVkIFNjaG9vbCBEaXN0cmljdCc7XG4gICAgJHNjb3BlLnN0dWRlbnRTdGF0dXNlcyA9IFsnaW4gc2Nob29sJywgJ2hvbWUgc2Nob29sZWQnLCAnc29tZSBvdGhlciBzdGF0dXMnXTtcbiAgICAvLyBDbGFzc2VzXG4gICAgdmFyIFBlcnNvbiA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmluY29tZVNvdXJjZUNvdW50ID0gMDtcbiAgICAgICAgICAgIHRoaXMuaW5jb21lU291cmNlcyA9IFtdO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluY3JlbWVudEluY29tZVNvdXJjZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5pbmNvbWVTb3VyY2VDb3VudCsrO1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMuaW5jb21lU291cmNlQ291bnQgPiB0aGlzLmluY29tZVNvdXJjZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNvbWVTb3VyY2VzLnB1c2goe30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBIb3VzZWhvbGQgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRDb3VudCA9IDA7XG4gICAgICAgICAgICB0aGlzLmluY3JlbWVudENoaWxkQ291bnQoKTtcblxuICAgICAgICAgICAgdGhpcy5vdGhlck1lbWJlcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMub3RoZXJNZW1iZXJzQ291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRPdGhlck1lbWJlcnNDb3VudCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluY3JlbWVudENoaWxkQ291bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZENvdW50Kys7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5jaGlsZENvdW50ID4gdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3Q2hpbGQgPSBPYmplY3QuY3JlYXRlKFBlcnNvbik7XG4gICAgICAgICAgICAgICAgbmV3Q2hpbGQuaW5pdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChuZXdDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5jcmVtZW50T3RoZXJNZW1iZXJzQ291bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5vdGhlck1lbWJlcnNDb3VudCsrO1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMub3RoZXJNZW1iZXJzQ291bnQgPiB0aGlzLm90aGVyTWVtYmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3TWVtYmVyID0gT2JqZWN0LmNyZWF0ZShQZXJzb24pO1xuICAgICAgICAgICAgICAgIG5ld01lbWJlci5pbml0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vdGhlck1lbWJlcnMucHVzaChuZXdNZW1iZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdmFyIGhvdXNlaG9sZCA9IE9iamVjdC5jcmVhdGUoSG91c2Vob2xkKTtcbiAgICBob3VzZWhvbGQuaW5pdCgpO1xuICAgIC8vIFRPRE86IHJlcGxhY2Ugc2NvcGUgd2l0aCB2bVxuICAgICRzY29wZS5ob3VzZWhvbGQgPSBob3VzZWhvbGQ7XG5cbiAgICAkc2NvcGUuJHdhdGNoKCdob3VzZWhvbGQuY2hpbGRDb3VudCcsIGZ1bmN0aW9uKG5ld1ZhbCkge1xuICAgICAgICB3aGlsZSAobmV3VmFsID4gJHNjb3BlLmhvdXNlaG9sZC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICRzY29wZS5ob3VzZWhvbGQuaW5jcmVtZW50Q2hpbGRDb3VudCgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkc2NvcGUuc2hvd0NvbmZpcm0gPSBmdW5jdGlvbihldikge1xuICAgICAgICAvLyBBcHBlbmRpbmcgZGlhbG9nIHRvIGRvY3VtZW50LmJvZHkgdG8gY292ZXIgc2lkZW5hdiBpbiBkb2NzIGFwcFxuICAgICAgICB2YXIgY29uZmlybSA9ICRtZERpYWxvZy5jb25maXJtKClcbiAgICAgICAgICAudGl0bGUoJ1dvdWxkIHlvdSBsaWtlIHRvIGRlbGV0ZSB0aGlzIGVudHJ5PycpXG4gICAgICAgICAgLnRleHRDb250ZW50KCdUaGUgZGF0YSB5b3UgaGF2ZSBlbnRlcmVkIGFib3V0IHRoaXMgY2hpbGQgd2lsbCBiZSByZW1vdmVkJylcbiAgICAgICAgICAuYXJpYUxhYmVsKCdkZWxldGUgY2hpbGQnKVxuICAgICAgICAgIC50YXJnZXRFdmVudChldilcbiAgICAgICAgICAub2soJ1llcycpXG4gICAgICAgICAgLmNhbmNlbCgnTm8nKTtcbiAgICAgICAgJG1kRGlhbG9nLnNob3coY29uZmlybSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5zdGF0dXMgPSAnWW91IGRlY2lkZWQgdG8gZ2V0IHJpZCBvZiB5b3VyIGRlYnQuJztcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuc3RhdHVzID0gJ1lvdSBkZWNpZGVkIHRvIGtlZXAgeW91ciBkZWJ0Lic7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbn1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnZWF0Q2hhbGxlbmdlQXBwJylcbiAgICAgICAgLmRpcmVjdGl2ZSgnaW5jb21lUXVlc3Rpb25zJywgaW5jb21lRGlyZWN0aXZlKTtcblxuICAgIGZ1bmN0aW9uIGluY29tZURpcmVjdGl2ZSAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIG1lbWJlcjogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL2luY29tZS5odG1sJyxcbiAgICAgICAgfTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2VhdENoYWxsZW5nZUFwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ3llc05vSW5wdXQnLCB5ZXNOb0lucHV0KTtcblxuICAgIGZ1bmN0aW9uIHllc05vSW5wdXQgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBtb2RlbDogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3ZpZXdzL3llc25vLmh0bWwnLFxuICAgICAgICB9O1xuICAgIH1cblxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
