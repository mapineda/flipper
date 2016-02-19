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
			controller: 'PostsCtrl'
		});

		$urlRouterProvider.otherwise('home');
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
	app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts){
		$scope.post = posts.posts[$stateParams.id];

		//post comment
		$scope.addComment = function(){
		  if($scope.body === '') { return; }
		  $scope.post.comments.push({
		    body: $scope.body,
		    author: 'user',
		    upvotes: 0
		  });
		  $scope.body = '';
		};

	}]);
