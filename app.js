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
      var newRestaurant = { name: $scope.name, type: $scope.type, src: $scope.src}
      $scope.restaurants.push(newRestaurant)
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
    $scope.nextPage = function(){
      $scope.page++;
    }

    $scope.prevPage = function(){
      if ($scope.page > 0) $scope.page--;
    }
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
  }]);

// Cooler filter
app.filter('selectedTags', function(){
  // The filter applies the following logic
  // collection is the collection to be filtered
  return function(collection, selectedTags){
    // If there is no other collection, or they chose the empty space, return the whole collection back
    if( !selectedTags || selectedTags.length == 0 || selectedTags[0].length == 0) return collection;

    // Otherwise, filter the collection, keeping elements that have a tag in common with the selectedTags.
    return collection.filter(function(element){
      var result = false;
      element.tags.forEach(function(tag){
        if(selectedTags.indexOf(tag) != -1 ){
          result = true;
        }
      });
      return result;
    });
  };
});

app.filter('onPage', function(){

  return function(collection, page){
    return collection.slice(page * 12, page * 12 + 12)
  }

})









