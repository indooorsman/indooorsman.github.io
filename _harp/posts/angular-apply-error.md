<h1>AngularJs "$apply in progress"错误的一种情况<sub>2015-9-10</sub></h1>

    angular.module('testApp',[])
      .controller('testCtrl', ['$scope', function($scope) {
        $scope.data = [];
        
        funcOutOfAngular(function(data) {
          $scope.$apply(function() {
            $scope.data = data;
          });
        })
      }])

    function funcOutOfAngular(callback) {
      if (window.data) {
        return callback(window.data);
      }
      fetchDataFromRemoteWithAjax(function(data) {
        window.data = data;
        callback(data);
      });
    }

在angular的代码中调用了第三方的一个“貌似异步”的函数，所以回调中用到了`$scope.$apply`，但是其实这个貌似异步的函数，有时候是同步执行的，从代码中可以看出第一次调用后`data`会缓存到`window`对象中，之后再次调用就是同步的了，此时再用`$apply`就会出现`Error: $rootScope:inprog Action Already In Progress ($apply already in progress)`的错误了

官方文档中有针对这种情况的[描述和解决方案](https://docs.angularjs.org/error/$rootScope/inprog?p0=$apply)，即用`$timeout`使得`funcOutOfAngular`的回调永远是“异步”的：
    
    angular.module('testApp',[])
      .controller('testCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.data = [];
        
        funcOutOfAngular(function(data) {
          $timeout(function() {
            $scope.data = data;
          }, 0);
        })
      }])
