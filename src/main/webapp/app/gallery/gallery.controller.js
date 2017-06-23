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
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.MsgComment= "Saisir votre commentaire....";
        vm.VoteOnePhoto = [];
        vm.CommentOnePhoto=[];
        vm.userPhotoVote = {};
        vm.UserPhotoComment={};
        vm.nbVote=0;


        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });
	
	init();
	function init() {
        getAccount();
        loadAllPhoto();
        loadAllCommentPhoto();
        loadAllVotePhoto();
	       }
		//Charger le user
        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        
        //Charger toutes les photos
        function loadAllPhoto() {
        	Photo.query(function(result) {
        		vm.photos = result;
                vm.searchQuery = null;
				angular.forEach(result,function(value,prop,obj){
					loadVoteOnePhoto(value.id);
					loadCommentsOnePhoto(value.id);
				});
        	});
        };
        
        //Charger tous les commentaires
        function loadAllCommentPhoto() {
        	UserPhotoComment.query(function(result) {
        		vm.comments = result;
                vm.searchQuery = null;
        	});
        };
        
        //Charger tous les votes
        function loadAllVotePhoto() {
        	UserPhotoVote.query(function(result) {
        		vm.votes = result;
                vm.searchQuery = null;
        	});
        };
        
        
        //Charger tous les votes d'une photo
        function loadVoteOnePhoto(id) {
    		if (id==null) {
				console.log("Photo Id NUll");
			}
			else{
				var objectToSend = new FormData();
				objectToSend.append("id", id);
				var req = $http.post('/api/user-photo-votes-onePhoto',objectToSend, {
				
				transformRequest: angular.identity,
				headers: {
				'Content-Type': undefined,
				}
				
				}).success(function(data, status, headers, config) {
				
					angular.forEach(data,function(value,prop,obj){
						vm.VoteOnePhoto.push ({idPhoto : id, valueVote : value.stars});
					});
					
				})
				.error(function(err) {
					console.log("ERROR", err);
				});
			}	
        };
        
        
        
        //Charger tous les commentaire d'une photo
        function loadCommentsOnePhoto(id) {
    		if (id==null) {
				console.log("Photo Id NUll");
			}
			else{
			
				var objectToSend = new FormData();
				objectToSend.append("id", id);
				
				
				var req = $http.post('/api/user-photo-comment-one-photo',objectToSend, {
				
				transformRequest: angular.identity,
				headers: {
				'Content-Type': undefined,
				}
				
				}).success(function(data, status, headers, config) {
					angular.forEach(data,function(value,prop,obj){
						vm.CommentOnePhoto.push ({idPhoto : id, valueComment : value.comment});
					});
					
				})
				.error(function(err) {
					console.log("ERROR", err);
				});
			}		
        };
        
		// Calcul moyenne d'une photo
        vm.calculMoyenne= function(id)
        {	
        	vm.nbVote=0;
        	var nb=0;
        	var moyenne=0;
        	angular.forEach(vm.VoteOnePhoto,function(value,prop,obj){
	     		if (value.idPhoto== id)
	     		{
					nb=nb+1;
	     			moyenne = ( moyenne * (nb-1) + value.valueVote ) / nb;
	     		}
		     		});
     		vm.nbVote=nb;
			return moyenne;
        };
		
        // Comparer 2 id et return boolean
        vm.photoAreEquals = function(id1,id2){
			return (id1 == id2);
        };
		
		
		// Fonction qui va verifier si le user à déja voter
        vm.verifVote = function(id){
			return false;
        }; 
		
		
		//Fonction pour SVG un vote
        vm.saveVote=function (ValueVote,PhotoID,UserID) {
        
			if (ValueVote==0 || PhotoID==0 || UserID ==0 ) {
				console.log("vote non initialise");
			}
			else{
				var objectToSend = new FormData();
		
				objectToSend.append("photoID", PhotoID);
				objectToSend.append("userID", UserID);
				objectToSend.append("valueVote", ValueVote);
		
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
			//loadVoteOnePhoto(PhotoID);
		}; // Fin vote
    	    
	  	//Fonction pour SVG un commentaire
     	vm.saveComment=function (Text,PhotoID,UserID){
			if (Text=="") {
				console.log("Pas de commentaire");
			}
			else{
				var objectToSend = new FormData();
		
				objectToSend.append("ValueComment", Text);
				objectToSend.append("UserID", UserID);
				objectToSend.append("PhotoID", PhotoID);
		
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

			loadCommentsOnePhoto(PhotoID);
			vm.MsgComment= "Saisir votre commentaire....";
        };// Fin save comment
        
        
        function register () {
            $state.go('register');
        }
    }
})();
