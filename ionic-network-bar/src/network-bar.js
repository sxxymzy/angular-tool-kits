/**
 * Created by max on 7/20/16.
 */
// todo
(function () {
    function networkBar(DeviceFactory, $translate) {
        return {
            restrict: 'A',
            link: function (scope, elm) {
                $translate('NETWORK_FAILED_ALERT')
                    .then(function (translation) {
                        var _$network_bar,
                            _$ion_content = elm.find('ion-content');
                        _$network_bar = angular.element('<div class="bar bar-subheader bar-network"><i class="icon ion-android-alert"></i><lable class="network-alert-text">' + translation + '</lable></div>');
                        _$network_bar.find("label").html();
                        elm.append(_$network_bar);
                        scope.$watch('status.is_online', function (is_online) {
                            if (is_online) {
                                _$network_bar.css({'display': 'none'});
                                _$ion_content.removeClass('has-subheader has-network-bar');
                            }
                            else {
                                _$network_bar.css({'display': 'flex'});
                                _$ion_content.addClass('has-subheader has-network-bar');
                            }
                        })
                    });
            },
            controller: function ($scope) {
                $scope.status = DeviceFactory.network_status;
            },
            controllerAs: 'net'
        }
    }

})();

