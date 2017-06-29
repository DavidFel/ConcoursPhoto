(function() {
    'use strict';

    angular
        .module('concoursphotoApp')
        .controller('DepotController', depotController);

    depotController.$inject = ['$http', '$scope', 'Principal', 'LoginService', '$state'];

    function depotController ($http, $scope, Principal, LoginService, $state) {
        var vm = this;
        console.log("init depotController");
        
        vm.fileToUpload = null;
        vm.fileDescription= "......";
        vm.fileTitle="Tapez votre titre";
    	vm.account = null;
    	
    	
    $scope.$on('authenticationSuccess', function() {
            getAccount();
        });
	
	getAccount();
		//Charger le user
    function getAccount() {
        Principal.identity().then(function(account) {
            vm.account = account;
            vm.isAuthenticated = Principal.isAuthenticated;
        });
    }
        
        

        //vm.uploadFileToUrl(files[0],fileToUpload);

       

		vm.DefineFileToUpload= function(files){
			vm.fileToUpload=files
		}
		
        vm.uploadFiles = function(files,description,titre,idUser) {
        	if (!files || files.length === 0) {
            	console.log("nothing to upload");
        	}
        	else{
        	console.log("uploading..");
       	 	var fd = new FormData();
       	 	//Take the first selected file
       	 	fd.append("file",files[0]);
       	 	fd.append("description",description);
       	 	fd.append("titre",titre);
       	 	fd.append("idUser",idUser);
			
			console.log("idUser : " + idUser);

    	    var req = $http.post('/api/content/imagesData',fd, { 

    	        transformRequest: angular.identity,
    	        headers: {
    	        	'Content-Type': undefined,
    	        	'Accept': "*/*"
    	        }

    	    }).success(function(data, status, headers, config) {
    	    	console.log("uploading imageData OK");

    	    })
    	    .error(function(err) {
    	    	console.log("uploading imageData ERROR", err);
    	    });
    	    
    	 }
       	
       	 	
        };

    }
})();
