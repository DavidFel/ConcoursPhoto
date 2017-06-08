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

<<<<<<< HEAD
        vm.vote= function(ValueVote,PhotoID,UserID) {
        	vm.userPhotoVote.stars = ValueVote;
            vm.userPhotoVote.siteUser = {id :1};
            vm.userPhotoVote.photo = {id: PhotoID};
			//console.log ({ValueVote}) ;
			//console.log ({PhotoID}) ;
			//console.log ({UserID}) ;
            saveVote();
        };
         vm.ValiderComment=function(text,PhotoID,UserID){
			//console.log ({text}) ;
			//console.log ({PhotoID}) ;
			//console.log ({UserID}) ;
=======
        vm.vote= function Vote(ValueVote,PhotoID,UserID) {
        	vm.userPhotoVote.stars = ValueVote;
        	vm.userPhotoVote.siteUser = {id :1};
        	vm.userPhotoVote.photo = {id: PhotoID};
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
>>>>>>> 8950291ecfd9ffe7986ea4901e8a0954836ea184
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
<<<<<<< HEAD
        	//UserPhotoVote.save(vm.userPhotoVote);
        	}

        	function saveComment () {
        	console.log ("Comment en cours de constructions");
        	//UserPhotoComment.save(vm.UserPhotoComment, null, null);
        	}

=======
            //UserPhotoVote.save(vm.userPhotoVote);
        }
        
        function saveComment () {
    		console.log ("Comment en cours de constructions");
            //UserPhotoComment.save(vm.UserPhotoComment, null, null);
        }
        
>>>>>>> 8950291ecfd9ffe7986ea4901e8a0954836ea184
        function register () {
            $state.go('register');
        }
    }
})();
