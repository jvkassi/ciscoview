'use strict';

angular.module('sailsApiAngularApp')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
    $stateProvider
        .state('features', {
            abstract: true,
            templateUrl: "views/features.html",
            controller: 'FeaturesCtrl'
        })
        .state('features.list', {
            url: "/features",
            templateUrl: "views/features.list.html"
        })
        .state('features.create', {
            url: "/features/create",
            templateUrl: "views/features.edit.html"
        })
        .state('features.list.detail', {
            url: '/view/{featureId:[0-9]{1,4}}',
            templateUrl: "views/features.detail.html",
            controller: 'FeatureSelectedCtrl'
        })
        .state('features.list.edit', {
            url: '/edit/{featureId:[0-9]{1,4}}',
            templateUrl: "views/features.edit.html",
            controller: 'FeatureSelectedCtrl'
        });
  }])
  .controller('FeaturesCtrl', ['$scope', '$state', '_', 'Feature', function ($scope, $state, _, Feature) {
    $scope.features = Feature.query();

    $scope.deleteAllFeatures = function() {
      _.remove($scope.features, function(feature) {
        feature.$delete();
        return true;
      });
      $state.go('features.list');
    };

    $scope.save = function() {
      if (_.isUndefined(this.feature.id)) {
        new Feature(this.feature)
            .$save(function(feature) {
              $scope.features.push(feature);
              $state.transitionTo('features.list.detail', {featureId: feature.id});
            });
      } else {
        this.feature.$update();
        $state.transitionTo('features.list.detail', {featureId: this.feature.id});
      }
    };

    $scope.delete = function() {
      this.feature.$delete(function(feature) {
        _.remove($scope.features, {id: feature.id});
        $state.go('features.list');
      });
    };

  }])
  .controller('FeatureSelectedCtrl', ['$scope', '$stateParams', '_', function ($scope, $stateParams, _) {
    // Feature.query() returns an array containing a promise, so in order to use the values in the array, the promise
    // must be resolved (and calling .then(<f>) on an already resolved promise immediately runs the function <f>).
    $scope.features.$promise.then(function() {
      $scope.feature = _.findWhere($scope.features, {id: parseInt($stateParams.featureId)});
    });
  }]);