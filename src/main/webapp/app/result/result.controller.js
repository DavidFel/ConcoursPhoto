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
		vm.photos=null;
		vm.VoteOnePhoto={};

		vm.uriBestPhoto= getURIBestPhoto();
        
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
        	UserPhotoVote.query(function(result) {
    			vm.votes = result;
            	vm.searchQuery = null;
            	angular.forEach(vm.votes,function(value,prop,obj){
						//console.log(value.stars + " " + value.photo.uri);
						if (value.stars > MaxVote) {
							MaxVote = value.stars;
							URI = value.photo.uri;
							console.log("La valeur de URI : " + URI );
							vm.uriBestPhoto=URI;
						}
					});
				});
			//return URI;
        };
  
    }
})();
