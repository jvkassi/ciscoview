'use strict';

function getById(arr, id) {
    for (var d = 0, len = arr.length; d < len; d += 1) {
        if (arr[d].id === id) {
            return d;
        }
    }
}

function inherit(parent, child) {
    angular.forEach(child, function(func, s) {
        // inherit functions :D
        if (typeof(func) === "function") {
            parent[s] = func;
        }
    });
}
