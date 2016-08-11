'use strict';
angular.module('AzureApp')
    .controller('DataServiceController', ['$scope', 'AzureFactory', 'blockUI', function ($scope, AzureFactory, blockUI) {

        $scope.SelectedItem = {};

        $scope.SelectItem = function (Item) {
            console.log('SelectItem');
            $scope.SelectedItem = Item;
        };

        $scope.StartDatabaseCopy = function (SourceDb, TarDbName, TarDbServer) {

            var XMLData = '<ServiceResource xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/windowsazure">'
                      + '<PartnerServer>' + TarDbServer + '</PartnerServer>'
                      + '<PartnerDatabase>' + TarDbName + '</PartnerDatabase>'
                      + '<IsContinuous>False</IsContinuous>  '
                      + '<IsOfflineSecondary>False</IsOfflineSecondary>  '
          + '</ServiceResource>';
            console.log('StartDatabaseCopy');
            console.log(SourceDb);
            console.log(TarDbName);
            var route = '';

            $.ajax({
                url: 'https://management.azure.com/subscriptions/' + SourceDb.id + '/databasecopies',
                type: 'POST',
                data: XMLData,
                success: function (data) {

                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('x-ms-version', "2012-03-01");
                },
                error: function (rcvData) {
                }
            });
        };

    }]);