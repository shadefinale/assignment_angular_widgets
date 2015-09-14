var app = angular.module("widgets", []);

app.controller("RestaurantCtrl", ['$scope',
  function($scope){
    $scope.restaurants = [];
    $scope.name;
    $scope.type;
    $scope.src;
    $scope.searchCriteria;
    $scope.orderCriteria;
    $scope.createRestaurant = function(){
      var newRestaurant = { name: $scope.name, type: $scope.type, src: $scope.src};
      $scope.restaurants.push(newRestaurant);
      $scope.name = "";
      $scope.type = "";
      $scope.src  = "";
      console.log($scope.restaurants);
    };
    $scope.deleteRestaurant = function(idx){
      $scope.restaurants.splice(idx,1);
    };

    $scope.orderRestaurants = function(arg){
      $scope.orderCriteria = arg;
      console.log(arg);
    };
  }]);

app.controller("PhotoCtrl", ['$scope',
  function($scope){
    $scope.rawFeed = instagramResponse.data;
    $scope.page = 0;
    $scope.filterSelect;
    $scope.hashTagSelect;
    $scope.results;
    $scope.pageSize = 12;
    $scope.currentUser = "";

    // If you're on page 19 and change search criteria, show from first page on.
    $scope.$watch('filterSelect', function(){ $scope.page = 0 })
    $scope.$watch('hashTagSelect', function(){ $scope.page = 0 })

    $scope.nextPage = function(){
      if( ($scope.page + 1)*$scope.pageSize < $scope.results.length ){
        $scope.page++;
      }
    };

    $scope.prevPage = function(){
      if ($scope.page > 0) $scope.page--;
    };
    $scope.hashTagSelect = [];

    $scope.filters = function(){
      return $scope.rawFeed.reduce(function(collect, cur){
        if (collect.indexOf(cur.filter) == -1){
          collect.push(cur.filter);
        }
        return collect;
      }, []);
    };

    $scope.hashTags = function(){
      return $scope.rawFeed.reduce(function(collect, cur){
        cur.tags.forEach(function(tag){
          if (collect.indexOf(tag) == -1){
            collect.push(tag);
          }
        });
        return collect;
      }, []);
    };

    $scope.selectUser = function(username){
      $scope.currentUser = username;
      console.log(username);
    };

  }]);

// Cooler filter
app.filter('selectedTags', function(){
  // The filter applies the following logic
  // collection is the collection to be filtered
  return function(collection, selectedTags){
    // If there is no other collection, or they chose the empty space, return the whole collection back
    if( !selectedTags || selectedTags.length === 0) return collection;

    var tagList = selectedTags.split(" ");
    // Otherwise, filter the collection, keeping elements that have a tag in common with the selectedTags.
    return collection.filter(function(element){
      var result = false;
      element.tags.forEach(function(tag){
        if(tagList.indexOf(tag) != -1 ){
          result = true;
        }
      });
      return result;
    });
  };
});

app.filter('onPage', function(){

  return function(collection, page, pageSize){
    return collection.slice(page * pageSize, page * pageSize + pageSize);
  };

});
