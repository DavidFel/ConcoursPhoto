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
        	//UserPhotoVote.save(vm.userPhotoVote);
        	}

        	function saveComment () {
        	console.log ("Comment en cours de constructions");
        	//UserPhotoComment.save(vm.UserPhotoComment, null, null);
        	}

        function register () {
            $state.go('register');
        }
    }
})();
