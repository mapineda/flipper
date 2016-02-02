var app = angular.module('flipperNews', ['ui.router'])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		});

		$urlRouterProvider.otherwise('home');
	}])
	// factory for posts
	.factory('posts', [function() {
		var o = {
			posts: []
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
					upvotes: 0
				});
				//clear out title and link after enter button is hit
				$scope.title = '';
				$scope.link = '';
			}
			//upvote feature
			$scope.incrementUpvotes = function(post) {
				post.upvotes += 1;
			}

	}]);
