/*'use strict';


Application.Directives.directive('header', [ '$window', function(  $window ) {
    return {
        templateUrl: 'views/partials/header.html',
        restrict: 'E',
        link: function(scope, elem, attrs) {

            var win = angular.element($window);
            var resizeContent = function() { 
            	var header = document.getElementsByTagName('header')[0];
            	var footer = document.getElementsByTagName('footer')[0];
            	var body = document.getElementsByTagName('body')[0];
            	var content = document.getElementsByClassName('container-fluid')[0];
            	var size = body.clientHeight - header.clientHeight
            	content.style.height = size + 'px';
            }
            // bind event 
            win.bind("resize", resizeContent);
            // start resize
            resizeContent();
        }
    }

}]);
*/