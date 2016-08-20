/**
 * Created by max on 7/3/16.
 */
(function () {
    var redBubble = angular.module("redBubble", []);
    redBubble.directive("redBubble", function (RedBubbleFactory) {
        return {
            restrict: 'A',
            scope: {
                'bubble_id': '@redBubble',
                'bubble_only': '@bubbleOnly'
            },
            link: function (scope, elm) {
                RedBubbleFactory.set_bubble(scope.bubble_id, 0);
                scope.bubbles = RedBubbleFactory.bubbles;
                scope.$watch("bubbles." + scope.bubble_id + ".counter", function (newV) {
                    elm.addClass('red-bubble');
                    if (typeof newV != "undefined") {
                        elm.attr("counter", newV);
                        if (!(scope.bubble_only && scope.bubble_only.toLowerCase() == 'true')) {
                            elm.addClass('bubble-content');
                        }
                        if (newV <= 0) {
                            elm.addClass('red-bubble-hide');
                        }
                        else {
                            elm.removeClass('red-bubble-hide');
                        }
                    }
                });
            }
        }
    });
    redBubble.factory("RedBubbleFactory", function () {
        var self = this;
        var _bubbles = {};

        function Bubble(id, counter) {
            var bb = this;
            bb.counter = angular.isUndefined(counter) ? 0 : counter;

            bb._id = id;

            bb.set_counter = function (new_counter) {
                bb.counter = new_counter
            };

            bb.increase = function () {
                bb.counter++;
            };

            bb.decrease = function () {
                if (bb.counter > 0)
                    bb.counter--;
                else
                    bb.counter = 0;
            };

            bb.clear_counter = function () {
                bb.counter = 0;
            }
        }

        angular.extend(self, {
            bubbles: _bubbles,
            bubble: function (id) {
                if (!_bubbles.hasOwnProperty(id)) {
                    self.set_bubble(id, 0);
                }
                return _bubbles[id]
            },
            set_bubble: function (id, counter) {
                if (_bubbles.hasOwnProperty(id)) {
                    _bubbles[id].set_counter(counter);
                }
                else {
                    _bubbles[id] = new Bubble(id, counter);
                }
            }
        });
        return self;
    });
})();
