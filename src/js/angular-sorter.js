(function () {
    'use strict';

    angular.module('angularSorter', [])
        .directive('angularSorter', ['$timeout', '$compile', '$parse', function ($timeout, $compile, $parse) {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {angularSorter: '=', options: '='},
                template: '<div class=btn-group>' +
                '<button ng-repeat="item in items" ng-show="item.selected" class="btn btn-default btn-xs" ng-click="set(item)">' +
                '<i class="fa fa-fw {{item.reversed && \'fa-sort-alpha-desc\' || \'fa-sort-alpha-asc\'}}"></i> Ordered by {{item.label||item.field}}' +
                '</button>' +
                '<button class="btn btn-default btn-xs dropdown-toggle" data-toggle=dropdown><span class=caret></span></button>' +
                '<ul class="dropdown-menu pull-right">' +
                '<li ng-repeat="item in items"><a href="" ng-click="set(item)"><i class="fa fa-fw {{item.selected && \'fa-check\' || \'\'}}"></i> Ordered by {{item.label||item.field}}</a></li>' +
                '</ul>' +
                '</div>',
                link: function ($scope, element, attrs, ngModel) {
                    $scope.redraw = function () {
                        $scope.items = $scope.angularSorter || [{field: 'updated_at', label: 'Last updated'}];

                        if (!_.findWhere($scope.items, {selected: true})) {
                            $scope.set($scope.items[0]);
                        }
                    };

                    $scope.set = function (item) {
                        angular.forEach($scope.items, function (v, k) {
                            if (v === item && v.selected) {
                                v.reversed = !v.reversed;
                            } else {
                                v.selected = v === item;
                            }
                        });

                        ngModel.$setViewValue(item);
                    };

                    ngModel.$render = $scope.redraw;
                }
            };
        }])
})();
