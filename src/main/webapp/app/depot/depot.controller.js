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
        vm.fileDescription= "...";
        
        vm.uploadFileToUrl= function(files[0]);
       
        vm.uploadFiles = function(files) {
        	if (!files || files.length === 0) {
            	console.log("nothing to upload");
        	}
        	else{
        	console.log("uploading..");
       	 	var fd = new FormData();
       	 	//Take the first selected file
       	 	fd.append("file", files[0]);
       	 //	$http.get('http://localhost:8080/#/depot')
       	 	console.log(files.length);
       	 	
       	 	
        	    $http.post('http://localhost:8080/gallery', files[0], {
        	        	withCredentials: true,
        	        headers: {'Content-Type': undefined },
        	        transformRequest: angular.identity
        	    }).success(function() {
        	    	console.log("uploading OK");
        	    })
        	    .error(function(err) {
        	    	console.log("uploading ERROR", err);
        	    });
       	 	
       	 	
        	 }
       	 	
       	 	
        };
       
        
        vm.uploadFile=function() {
        	console.log("ok uploadFile...");
             
          
            console.info('fileToUpload: ', vm.fileToUpload);
            
        }
        
    
    
    }
})();
