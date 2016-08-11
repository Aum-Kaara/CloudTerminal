'use strict';
angular.module('AzureApp')
    .controller('AppServiceController', ['$scope', 'AzureFactory', 'blockUI', '$stateParams', '$rootScope', function ($scope, AzureFactory, blockUI, $stateParams, $rootScope) {

        $scope.SelectedItem = '';
        $scope.QueueList = [];
        $scope.TopicList = [];
        $scope.SelectedQueue = {};


        $scope.InitializeController = function () {
            console.log('InitializeController');
            console.log($stateParams.Id);
            $scope.SelectedItem = $stateParams.Id;
            // $('#toggle-one').bootstrapToggle();
            //$('#toggle-two').bootstrapToggle();
        };

        $scope.menuOptions = [
           ['Send a Message', function ($itemScope) {
               console.log($itemScope);
               $scope.QueueMessage($itemScope.item);
           }], ['Receive a Message', function ($itemScope) {
               console.log($itemScope);
           }]
        ];

        $scope.SelectQueue = function (Item) {
            $scope.SelectedQueue = Item;
        };

        $scope.QueueMessage = function (Item) {
            console.log(Item);
        };

        $scope.GetAllQueue = function () {
            console.log('GetAllQueue');
            var route = 'https://management.azure.com/' + $scope.SelectedItem + '/queues?api-version=2015-08-01';
            blockUI.start();
            AzureFactory.AjaxGet(route).then(function (response) {
                console.log(response.data);
                $scope.QueueList = response.data.value;
                blockUI.stop();
            }, function (error) {
                console.log(error);
                inform.clear();
                inform.add(error.statusText, {
                    ttl: 10000, type: 'danger'
                });
                blockUI.stop();
            });

        };


        $scope.GetAllTopics = function () {
            console.log('GetAllTopics');
            var route = 'https://management.azure.com/' + $scope.SelectedItem + '/topics?api-version=2015-08-01';
            blockUI.start();
            AzureFactory.AjaxGet(route).then(function (response) {
                console.log(response.data);
                $scope.TopicList = response.data.value;
                blockUI.stop();
            }, function (error) {
                console.log(error);
                inform.clear();
                inform.add(error.statusText, {
                    ttl: 10000, type: 'danger'
                });
                blockUI.stop();
            });
        };

        
        $scope.GetNsKeys = function (Item) {
            console.log('GetNsKeys');
            var route = 'https://management.azure.com/' + Item + '/authorizationRules?api-version=2015-08-01';
            blockUI.start();
            AzureFactory.AjaxGet(route).then(function (response) {
                console.log(response.data);
                blockUI.stop();
            }, function (error) {
                console.log(error);
                inform.clear();
                inform.add(error.statusText, {
                    ttl: 10000, type: 'danger'
                });
                blockUI.stop();
            });
        };
    }]);