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
        

        //vm.uploadFileToUrl(files[0],fileToUpload);

       
		vm.DefineFileToUpload= function(files){
			vm.fileToUpload=files
		}
		
        vm.uploadFiles = function(files,description,titre) {
        	console.log({description});
        	console.log({titre});
        	if (!files || files.length === 0) {
            	console.log("nothing to upload");
        	}
        	else{
        	console.log("uploading..");
       	 	var fd = new FormData();
       	 	//Take the first selected file
       	 	fd.append("file",files[0]);
       	    //$http.get('http://localhost:8080/#/depot')
       	 	console.log(files.length);
       	       
       	        /*var reqImageData = {
       			fileName: files[0].fileName
       			};*/
       	 	

   	        /*var reqImageData = {
   			file: files[0]
   			};*/

   	        console.log("file : ? " + file);
   	        
    	    var req = $http.post('/api/content/imagesData',fd, { /*reqImageData*/
    	        	//withCredentials: true,
    	    	
    	        transformRequest: angular.identity,
    	        headers: {
    	        	'Content-Type': undefined,
    	        	'Accept': "*/*"
    	        }
    	    
    	    
    	    
    	    }).success(function(data, status, headers, config) {
    	    	console.log("uploading imageData OK");
    	    	

    	    	console.log("data test : " + data);
    	    //	console.log("status test : " + status);
    	    	console.log("fd test : " + fd);
    	    	//console.log("fd get byte test : " + fd.getByte());
    	    	
    	    	//files[0] = fd;
    	    	
    	    	//console.log(files);
    	    	
    	    })
    	    .error(function(err) {
    	    	console.log("uploading imageData ERROR", err);
    	    });
    	    
    	    
    	    console.log(req);
    	    
    	 }
       	 	
       	 	
        };
       
        
        vm.uploadFile=function() {
        	console.log("ok uploadFile...");
             
          
            console.info('fileToUpload: ', vm.fileToUpload);
            
        }
        
    
    }
})();
