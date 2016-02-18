var app = angular.module('flipperNews', ['ui.router'])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})

		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});

		$urlRouterProvider.otherwise('home');
	}])
	// factory for posts
	.factory('posts', [function() {
		var o = {
			posts: []
		};
		o.getAll = function() {
	 return $http.get('/posts').success(function(data){
		 angular.copy(data, o.posts);
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
				$scope.posts.push({
					title: $scope.title,
					link: $scope.link,
					upvotes: 0,
					comments: [
						{author: 'Joe', body: 'I too, oft, feel this way', upvotes: 0},
						{author: 'Steve', body:'It is raining sideways!', upvotes: 0}
					]
				});
				//clear out title and link after enter button is hit
				$scope.title = '';
				$scope.link = '';
			}
			//upvote feature
			$scope.incrementUpvotes = function(post) {
				post.upvotes += 1;
			}

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
