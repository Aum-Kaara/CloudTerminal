'use strict';
angular.module('AzureApp')
    .controller('MasterController', ['$scope', '$location', '$route', 'AzureFactory', '$routeParams', 'blockUI', 'inform', '$stateParams', function ($scope, $location, $route, AzureFactory, $routeParams, blockUI, inform, $stateParams, $state) {
        $scope.data = [];
        inform.clear();
        inform.add('Please Sign into Cloud Terminal using Microsoft Live Account.', {
            ttl: 10000, type: 'warning'
        });

        $scope.inform = inform;
        $scope.SubscriptionId = $stateParams.SubId;
        $scope.WebsiteList = [];
        $scope.VMList = [];
        $scope.StorageList = [];
        $scope.SQLDbList = [];
        $scope.SQLServerList = [];
        $scope.MSList = [];
        $scope.ServiceBusList = [];
        $scope.QueueList = [];
        
        $scope.VMAC = {};
        $scope.Item = {};

        $scope.ListAllResources = function () {
            console.log('ListAllResources');
           
            blockUI.start();
            AzureFactory.resources().then(function (response) {
                console.log(response.data);
                $scope.data = response.data;
                blockUI.stop();
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
        };

        $scope.GetVMInfo = function (item) {
            console.log('GetVMInfo');
            AzureFactory.GetVMInfo(item.id).then(function (response) {
                $scope.VMAC = response.data;
            }, function (error) {
                $scope.status = 'Unable to load data: ' + error.message;
            });
        };


        $scope.Split = function (input, splitChar, splitIndex) {
            console.log(input);
            return input.split(splitChar)[splitIndex];
        };


        $scope.ListAllBoardResources = function () {
            console.log('ListAllBoardResources');
            $scope.WebsiteList = [];
            $scope.VMList = [];
            $scope.StorageList = [];
            $scope.SQLDbList = [];
            $scope.SQLServerList = [];
            $scope.ServiceBusList = [];

            $scope.SubscriptionId = $stateParams.SubId;
            blockUI.start();
            AzureFactory.ListAllBoardResources($stateParams.SubId).then(function (response) {
                console.log(response.data);
                $scope.data = response.data;
                angular.forEach(response.data.value, function (value) {
                    if (value.type == 'Microsoft.ClassicCompute/virtualMachines') {
                        $scope.VMList.push(value);
                    }
                    else if (value.type == 'Microsoft.Web/classicMobileServices') {
                        $scope.MSList.push(value);
                    }
                    else if (value.type == 'Microsoft.ClassicStorage/storageAccounts') {
                        $scope.StorageList.push(value);
                    } else if (value.type == 'Microsoft.Sql/servers') {
                        $scope.SQLServerList.push(value);
                    } else if (value.type == 'Microsoft.Web/sites' && value.kind != 'gateway') {
                        $scope.WebsiteList.push(value);
                    } else if (value.type == 'Microsoft.ServiceBus/namespaces') {
                        $scope.ServiceBusList.push(value);
                    } else if (value.type == 'Microsoft.Sql/servers/databases') {
                        $scope.SQLDbList.push(value);
                        console.log(value);
                    }

                });
                console.log($scope.SQLServerList);
                blockUI.stop();
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
        };

        // $scope.breadcrumb = $route.current.data.breadcrumb;

     


        $scope.GetDBServerProp = function (item) {
            console.log('GetDBServerProp');
            blockUI.start();
            AzureFactory.GetDBServerProp(item.id).then(function (response) {
                console.log(response.data);
                $scope.ServerProp = response.data;
                blockUI.stop();
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
        };

        
        $scope.GetDBProp = function (item) {
            console.log('GetDBProp');
            blockUI.start();
            AzureFactory.GetDBServerProp(item.id).then(function (response) {
                console.log(response.data);
                $scope.DBProp = response.data;
                blockUI.stop();
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
        };

        $scope.VMOperation = function (item, Operation) {
            console.log('VMOperation');

            if (Operation == 'Delete' && (item.type == 'Microsoft.Sql/servers/databases' || item.type == 'Microsoft.Sql/servers')) {
                var route = 'https://management.azure.com/' + item.id + '?api-version=2014-04-01-preview';
                var _TYPE = 'DELETE';
            } else if (Operation == 'Delete') {
                var route = 'https://management.azure.com/' + item.id + '?api-version=2016-04-01';
                var _TYPE = 'DELETE';
            } else {
                var route = 'https://management.azure.com/' + item.id + '/' + Operation + '?api-version=2016-04-01';
                var _TYPE = 'POST';
            }

            
            blockUI.start();
            AzureFactory.AjaxGet(route, _TYPE).then(function (response) {
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
        

   

        $scope.GetItemDetail = function (Item) {
            console.log(Item);
            if (Item.type == 'Microsoft.Web/sites') {
                var route = 'https://management.azure.com/' + Item.id + '?api-version=2015-08-01-preview';
            } else if (Item.type == 'Microsoft.ServiceBus/namespaces') {
                var route = 'https://management.azure.com/' + Item.id + '?api-version=2015-08-01';
            }else {
                var route = 'https://management.azure.com/' + Item.id + '?api-version=2016-04-01';
            }
            blockUI.start();
            AzureFactory.AjaxGet(route).then(function (response) {
                $scope.Item = response.data;
                blockUI.stop();
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
        };

        $scope.GetNsKeys = function (Item) {
            console.log('GetNsKeys');
            var route = 'https://management.azure.com/' + Item.id + '/authorizationRules/RootManageSharedAccessKey/ListKeys?api-version=2015-08-01';
            var _TYPE = 'POST';
            blockUI.start();
            AzureFactory.AjaxGet(route,_TYPE).then(function (response) {
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