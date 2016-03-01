(function() {
    'use strict';

    angular
        .module('eatChallengeApp')
        .controller('exportController', exportController);

    exportController.$inject = ['$http', '$scope'];

    function exportController($http, $scope) {
        $http.get('/household/completed').then(function(response) {
            var rawAppllications = response.data || [];
            $scope.completedApplications = normalizeApplications(rawAppllications);
            $scope.csvHeaders = Object.keys($scope.completedApplications[0]);
        });
    }
    function normalizeApplications(applications) {
        var application;
        var normalizedAppliation;
        var result = [];
        for (var i = 0; i < applications.length; i++) {
            application = applications[i];
            normalizedAppliation = {};
            // mapping data to normalized fields
            normalizedAppliation.application_id = application._id;
            normalizedAppliation.user_id = application.userId;

            normalizedAppliation.child_count = application.childCount;
            normalizedAppliation.child_1 = JSON.stringify(application.children[0]);
            normalizedAppliation.child_2 = JSON.stringify(application.children[1]);
            normalizedAppliation.child_3 = JSON.stringify(application.children[2]);
            normalizedAppliation.child_4 = JSON.stringify(application.children[3]);
            normalizedAppliation.child_5 = JSON.stringify(application.children[4]);
            normalizedAppliation.child_additional = JSON.stringify(application.children.slice(5));

            normalizedAppliation.other_household_member_count = application.otherMembersCount;
            normalizedAppliation.adult_1 = JSON.stringify(application.otherMembers[0]);
            normalizedAppliation.adult_2 = JSON.stringify(application.otherMembers[1]);
            normalizedAppliation.adult_3 = JSON.stringify(application.otherMembers[2]);
            normalizedAppliation.adult_4 = JSON.stringify(application.otherMembers[3]);
            normalizedAppliation.adult_5 = JSON.stringify(application.otherMembers[4]);
            normalizedAppliation.adult_additional = JSON.stringify(application.otherMembers.slice(5));

            normalizedAppliation.completed = application.completed;
            normalizedAppliation.signature = application.signature;
            normalizedAppliation.signed_on_date = application.signedOn;
            normalizedAppliation.street_address = application.streetAddress;
            normalizedAppliation.city = application.city;
            normalizedAppliation.state = application.state;
            normalizedAppliation.zip = application.zip;
            normalizedAppliation.phone = application.phone;
            normalizedAppliation.email = application.email;
            normalizedAppliation.last_4_ssn = application.last4ssn;

            result.push(normalizedAppliation);
        }

        return result;
    }
})();

