(function() {
    'use strict';

    angular
        .module('concoursphotoApp')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$scope', 'Principal', 'LoginService', 'Photo', '$state'];

    function GalleryController ($scope, Principal, LoginService, Photo, $state) {   
        var vm = this;
		vm.myFile=null;
        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.MsgComment= "...";

        vm.vote= function Vote(ValueVote,PhotoID,UserID) {
			console.log ({ValueVote}) ;
			console.log ({PhotoID}) ;
			console.log ({UserID}) ;
        };
         vm.ValiderComment=function ValiderComment(text,PhotoID,UserID){
			console.log ({text}) ;
			console.log ({PhotoID}) ;
			console.log ({UserID}) ;
        };

        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();
        loadAll();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function loadAll() {
        	Photo.query(function(result) {
        		vm.photos = result;
                vm.searchQuery = null;
        	});
        };
        
        function register () {
            $state.go('register');
        }
    }
})();
