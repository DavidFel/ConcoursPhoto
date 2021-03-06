(function() {
    'use strict';

    angular
        .module('concoursphotoApp')
        .controller('PhotoDetailController', PhotoDetailController);

    PhotoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Photo', 'UserPhotoVote', 'UserPhotoComment', 'SiteUser', 'Concours'];

    function PhotoDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Photo, UserPhotoVote, UserPhotoComment, SiteUser, Concours) {
        var vm = this;

        vm.photo = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('concoursphotoApp:photoUpdate', function(event, result) {
            vm.photo = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
