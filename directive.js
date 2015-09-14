app.directive('photoInfo', function(){
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'photo_partial.html'
  };
});
