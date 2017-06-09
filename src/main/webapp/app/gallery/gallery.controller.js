(function() {
    'use strict';

    angular
        .module('concoursphotoApp')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$scope', 'Principal', 'LoginService', 'Photo', '$state', 'UserPhotoVote', 'UserPhotoComment'];

    function GalleryController ($scope, Principal, LoginService, Photo, $state, UserPhotoVote,UserPhotoComment) {   
        var vm = this;
		vm.myFile=null;
        vm.account = null;
        vm.userPhotoVote = {};
        vm.UserPhotoComment={};
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.MsgComment= "...";

        vm.vote= function Vote(ValueVote,PhotoID,UserID) {
			console.log ({ValueVote});
			console.log ({PhotoID}) ;
			console.log ({UserID}) ;
			saveVote();
        };
         vm.ValiderComment=function ValiderComment(text,PhotoID,UserID){
			console.log ({text}) ;
			console.log ({PhotoID}) ;
			console.log ({UserID}) ;
			saveComment();
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
        
        function saveVote () {
        	console.log ("Vote en cours de constructions");
        }
        
        function saveComment () {
    		console.log ("Comment en cours de constructions");
        }
        
        function register () {
            $state.go('register');
        }
    }
})();
