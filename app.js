var app = angular.module("widgets", []);

app.controller("RestaurantCtrl", ['$scope',
  function($scope){
    $scope.restaurants = [];
    $scope.name;
    $scope.type;
    $scope.src;
    $scope.searchCriteria;
    $scope.createRestaurant = function(){
      var newRestaurant = { name: $scope.name, type: $scope.type, src: $scope.src}
      $scope.restaurants.push(newRestaurant)
      $scope.name = "";
      $scope.type = "";
      $scope.src  = "";
      console.log($scope.restaurants);
    };
    $scope.deleteRestaurant = function(idx){
      $scope.restaurants.splice(idx,1);
    }
  }]);