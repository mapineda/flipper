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

.factory('posts', [function() {
	var o = {
		posts: []
	};
	return o;
}])

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
				{author: 'joe', body: 'I too share your feeling', upvotes: 0 },
				{author: 'bob', body: 'great idea...everything is great!', upvotes: 5}
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

.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {
	$scope.posts = posts.posts[$stateParams.id];

}]);