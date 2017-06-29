(function() {
    'use strict';

    angular
        .module('concoursphotoApp')
        .controller('ResultController', ResultController);

    ResultController.$inject = ['$http', '$scope', 'Principal', 'LoginService', 'Photo', '$state', 'UserPhotoVote'];

    function ResultController ($http, $scope, Principal, LoginService, Photo, $state, UserPhotoVote) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
		vm.votes = null;

		
		vm.uriBestPhoto= getURIBestPhoto();
		vm.DescriptionPhoto="";
		vm.titlePhoto="";
		vm.userPhoto="";
		vm.laMoyenne=0;
		vm.nbVote=0;
        vm.photos =null;
        
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();
		
		
        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        
        function register () {
            $state.go('register');
        }

        
        function getURIBestPhoto() {

        	var URI= "";
        	var MaxVote=0;
        	Photo.query(function(result) {
        	vm.photos = result;
            vm.searchQuery = null;
        	angular.forEach(vm.photos,function(value,prop,obj){
					if (value.score > MaxVote) {
						MaxVote = value.score;
						URI = value.uri;
						vm.titlePhoto=value.title;
						vm.DescriptionPhoto=value.description;
						vm.uriBestPhoto=URI;
						vm.userPhoto=value.siteUser.firstName;
						vm.laMoyenne=value.score;
						vm.nbVote=value.nbVue;
					}
				});
			});
			return URI;
        };
  
    }
})();
