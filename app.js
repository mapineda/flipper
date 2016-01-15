var app = angular.module('flipperNews', []);

app.controller('MainCtrl', [
	'$scope',
	function($scope){
		$scope.test = 'Hello World!';
		$scope.posts = [
			{title: 'post 1', upvotes: 5},
			{title: 'post 2', upvotes: 2},
			{title: 'post 3', upvotes: 7},
			{title: 'post 4', upvotes: 9},
			{title: 'post 5', upvotes: 4}
		];

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