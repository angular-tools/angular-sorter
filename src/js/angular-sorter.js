(function () {
    'use strict';

    angular.module('angularSorter', [])
        .directive('angularSorter', ['$timeout', '$compile', '$parse', function ($timeout, $compile, $parse) {
            return {
                restrict: 'A',
                replace: true,
                priority: 10000,
                compile: function (element, attrs) {
                    var repeat = attrs.ngRepeat;
                    if (!repeat) {
                        throw new Error("This directive only works with ng-repeat");
                    }

                    var expression = /(\w+)\s+in\s+(\w+)/.exec(repeat);
                    var item = expression[1];
                    var model = expression[2];

                    expression = /orderBy\s*:\s*['"](.*?)['"]/.exec(repeat);
                    var priority = expression[2] || 'priority';

                    element.attr('data-unique-id', '{{' + item + '[' + item + '.getPK()]}}');

                    return {
                        post: function ($scope, element, attrs) {
                            $timeout(function () {
                                element.parent().sortable({
                                    stop: function (event, ui) {
                                        ui.item.siblings('[ng-repeat]').addBack().each(function (index, item) {
                                            if ($scope[model]) {
                                                for (var i = 0; i < $scope[model].length; i++) {
                                                    if ($scope[model][i].getPKValue() == $(item).data('unique-id')) {
                                                        $scope[model][i].set(priority, index + 1);
                                                        break;
                                                    }
                                                }
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    }
                }
            };
        }])
})();
