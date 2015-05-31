var app = angular.module('reddit');

app.service('FirebaseService', function($http, $q){

	this.returnPost = function(){
		return $http({
			method: 'GET',
			url: 'https://devmtn.firebaseio.com/posts.json'
		});
	}

	var postPost = function(post){
		console.log(post)
		return $http({
			method: 'PUT',
			url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
			data: post
		});
	};

	this.addPost = function(post){
		post.timestamp = Date.now();
		post.comments = [];
		post.karma = 0;
		post.id = guid();
		return postPost(post);
	};

	var guid = function() {
   		var s4 = function() {
    		return Math.floor((1 + Math.random()) * 0x10000)
       			.toString(16)
        		.substring(1);
    	}
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  	}

  	this.vote = function(post, direction){
  		if(direction === 'up') {
    		post.karma++;
    	} else if(direction === 'down'){
    		post.karma--;
    	}
    	return $http({
			method: 'PATCH',
			url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
			data: post
    	})
  	}


  	this.comments = function(post, commentForm){
  		post.comments.push(commentForm)
  		return $http({
  			method: 'PATCH',
  			url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
  			data: post
  		});
  	}

});