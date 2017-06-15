(function() {
    'use strict';

    angular
        .module('concoursphotoApp')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$http', '$scope', 'Principal', 'LoginService', 'Photo', '$state', 'UserPhotoVote', 'UserPhotoComment'];

    function GalleryController ($http, $scope, Principal, LoginService, Photo, $state, UserPhotoVote,UserPhotoComment) {   
        var vm = this;
		vm.myFile=null;
        vm.account = null;
        vm.userPhotoVote = {};
        vm.UserPhotoComment={};
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.MsgComment= "Saisir votre commentaire....";
        vm.moyenne =  4;
        
        vm.calculMoyenne= function(MyData)
        {	
 			/*
 			if (MyData.length==0)
 			{
 				vm.moyenne =  0;
 			}else
 			{
	 			var sum = 0; 
				for(var i = 0; i < MyData.length; i++){
	    			sum += parseInt(MyData[i]); 
				}
	    		var avg = sum/MyData.length;
	    		vm.moyenne=avg;
			}
			*/
			return vm.moyenne;
        };
        
        
        vm.calculMoyenneTEST= function(idPhoto)
        {	
 			if (idPhoto ==null ) {
				console.log("Erreur");
			}
			else
			{
				console.log(idPhoto);
			}
				
        };
        
        vm.photoAreEquals = function(id1,id2)
        {
        	if (id1 == id2)
        	{
        		return true;
        	}else
        	{
        		return false;
    		}
        };

        vm.verifVote = function()
        {
        	// Fonction qui va verifier si le user à déja voter
			return true;
        };

        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();
        loadAllPhoto();
        loadCommentOnePhoto();
        loadVoteOnePhoto();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        
        function loadAllPhoto() {
        	Photo.query(function(result) {
        		vm.photos = result;
                vm.searchQuery = null;
        	});
        };
        
        
        function loadCommentOnePhoto() {
        	UserPhotoComment.query(function(result) {
        		vm.comments = result;
                vm.searchQuery = null;
        	});
        };
        
        function loadVoteOnePhoto() {
        	UserPhotoVote.query(function(result) {
        		vm.votes = result;
                vm.searchQuery = null;
        	});
        };

        vm.saveVote=function (ValueVote,PhotoID,UserID) {
        
			if (ValueVote==0 || PhotoID==0 || UserID ==0 ) {
				console.log("vote non initialise");
			}
			else{
				console.log("saveVote..");
				var objectToSend = new FormData();
		
				objectToSend.append("photoID", PhotoID);
				objectToSend.append("userID", UserID);
				objectToSend.append("valueVote", ValueVote);
				
				console.log("object envoye :",objectToSend);
		
				var req = $http.post('/api/add-vote',objectToSend, {

				transformRequest: angular.identity,
				headers: {
				'Content-Type': undefined,
				}
				
				}).success(function(data, status, headers, config) {
				console.log("Success");
		
				})
				.error(function(err) {
				console.log("ERROR", err);
				});
			}
			loadVoteOnePhoto();
		}; // Fin vote
    	    
         vm.saveComment=function ValiderComment(Text,PhotoID,UserID){
			
			if (Text=="") {
				console.log("Pas de commentaire");
			}
			else{
				console.log("Construction Commentaire..");
				var objectToSend = new FormData();
		
				objectToSend.append("ValueComment", Text);
				objectToSend.append("UserID", UserID);
				objectToSend.append("PhotoID", PhotoID);
				
				console.log("object envoye :",objectToSend);
		
				var req = $http.post('/api/add-comment',objectToSend, {

				transformRequest: angular.identity,
				headers: {
				'Content-Type': undefined,
				}
				
				}).success(function(data, status, headers, config) {
				console.log("Success");
		
				})
				.error(function(err) {
				console.log("ERROR", err);
				});
			}

			loadCommentOnePhoto();

        };// Fin save comment
        
        function register () {
            $state.go('register');
        }
    }
})();
