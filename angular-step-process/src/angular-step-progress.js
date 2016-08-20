/**
 * Created by max on 8/10/16.
 */
(function () {
    function stepListDirective() {
        return {
            restrict: "E",
            template: "<ul class='progress-indicator' ng-transclude></ul>",
            bindToController: {
                currentStep: "="
            },
            transclude: true,
            controller: function () {
            },
            link: function (scope, elm, ctrl) {
                scope.$watch(ctrl.currentStep, function (step) {
                    scope.$broadcast('stepchange', step);
                })
            },
            controllerAs: "list"
        }
    }

    function stepItemDirective() {
        return {
            restrict: "E",
            require: "^stepList",
            replace: true,
            scope: {
                stepId: "@",
                name: "@"
            },
            template: "<li><span class='bubble'></span>{{name}}</li>",
            link: function (scope, elm, attr, listCtrl) {
                scope.$on('stepchange', function (e, current) {
                    if (typeof current != "undefined") {
                        if (scope.stepId <= current) {
                            elm.addClass("completed");
                        }
                        else {
                            elm.removeClass('completed');
                        }
                    }
                })
            }
        }
    }

    angular.module("stepProgress", [])
        .directive("stepList", stepListDirective)
        .directive("stepItem", stepItemDirective)
})();