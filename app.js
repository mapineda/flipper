var app = angular.module('flipperNews', []);

app.controller('MainCtrl', [
	'$scope',
	function($scope){
		$scope.test = 'Hello World!';
	}]);