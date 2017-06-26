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

		vm.uriBestPhoto= vm.uriBestPhoto="content/images/comment-dessiner-un-visage-walter-white.jpg";
        
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
        
        //Charger tous les votes
        function loadAllVotePhoto() {
        	UserPhotoVote.query(function(result) {
        		vm.votes = result;
                vm.searchQuery = null;
        	});
        };
  
    }
})();
