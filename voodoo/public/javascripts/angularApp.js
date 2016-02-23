var app = angular.module('flipperNews', ['ui.router'])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl',
			resolve: {
				postPromise: ['posts', function(posts) {
					return posts.getAll();
				}]
			}
		})

		.state('posts', {
		  url: '/posts/{id}',
		  templateUrl: '/posts.html',
		  controller: 'PostsCtrl',
		  resolve: {
		    post: ['$stateParams', 'posts', function($stateParams, posts) {
		      return posts.get($stateParams.id);
		    }]
		  }
		});

		$urlRouterProvider.otherwise('home');
	}])

	.factory('auth', ['$http', '$window', function($http, $window){
	   var auth = {};

		auth.saveToken = function (token){
		$window.localStorage['voodoo-token'] = token;
		};

		auth.getToken = function (){
		return $window.localStorage['voodoo-token'];
		}

		auth.isLoggedIn = function(){
			var token = auth.getToken();

			if(token){
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};

		auth.currentUser = function(){
		  if(auth.isLoggedIn()){
		    var token = auth.getToken();
		    var payload = JSON.parse($window.atob(token.split('.')[1]));

		    return payload.username;
		  }
		};

		auth.register = function(user){
		  return $http.post('/register', user).success(function(data){
		    auth.saveToken(data.token);
		  });
		};

		auth.logIn = function(user){
		  return $http.post('/login', user).success(function(data){
		    auth.saveToken(data.token);
		  });
		};

		auth.logOut = function(){
		  $window.localStorage.removeItem('flapper-news-token');
		};

	  return auth;
	}])

	// factory for posts
	.factory('posts', [ '$http', function($http) {
		var o = {
			posts: []
		};
		o.getAll = function() {
	 return $http.get('/posts').success(function(data){
		 angular.copy(data, o.posts);
	 });
 };

 o.get = function(id) {
	 return $http.get('/posts/' + id).then(function(res){
		 return res.data;
	 });
};
	 o.create = function(post) {
	 return $http.post('/posts', post).success(function(data){
		 o.posts.push(data);
	 });
};

	o.upvote = function(post) {
  return $http.put('/posts/' + post._id + '/upvote')
    .success(function(data){
      post.upvotes += 1;
    });
};

o.addComment = function(id, comment) {
  return $http.post('/posts/' + id + '/comments', comment);
};

		return o;
	}])
	// main controller
	.controller('MainCtrl', ['$scope', 'posts', function($scope, posts) {
			$scope.test = 'Hello World!';

			$scope.posts = posts.posts;

			//post posts
			$scope.addPost = function() {
				//prevent users from posting empty post.
				if ($scope.title === '' ) { return; }
				posts.create({
					title: $scope.title,
					link: $scope.link,

				});
				//clear out title and link after enter button is hit
				$scope.title = '';
				$scope.link = '';
			}
			//upvote feature
			$scope.incrementUpvotes = function(post) {
	  posts.upvote(post);
	};

}])
	//PostsCtrl
	app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', 'post', function($scope, $stateParams, posts, post){
		$scope.post = post;

		//post comment
		$scope.addComment = function(){
  if($scope.body === '') { return; }
  posts.addComment(post._id, {
    body: $scope.body,
    author: 'user',
  }).success(function(comment) {
    $scope.post.comments.push(comment);
  });
  $scope.body = '';
};

	}]);
