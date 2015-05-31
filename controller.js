var app = angular.module('reddit');

app.controller('PostsController', function($scope, FirebaseService){

	var getPost = function(){
		FirebaseService.returnPost().then(function(results){
			$scope.posts = results.data;
		});
	};

	getPost()

	$scope.addPost = function(newPost){
		FirebaseService.addPost($scope.newPost).then(function(){
			getPost();
		});
	};

	$scope.vote = function(post, direction){
		FirebaseService.vote(post, direction)
		.then(function(){
			getPost();
		});
	};

	$scope.submitComment = function(post, commentForm){
		FirebaseService.comments(post, commentForm)
		.then(function(){
			getPost();
		});
	}

});