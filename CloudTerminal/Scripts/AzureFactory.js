(function () {
    'use strict';

    var serviceId = 'AzureFactory';

    angular.module('AzureApp').factory(serviceId,
        ['$http', AzureFactory]);

    function AzureFactory($http) {

        function Signin() {
            return $http.get('/CloudSense/Account/Signin?isMSA=true&directoryName=mohitguptaakgechotmail.onmicrosoft.com');
        }

        function resources() {
            return $http.get('Account/Resources');
        }

        function GetVirtualMachines(id) {
            return $http.get('Home/GetVirtualMachines?SubId=' + id);
        }

        function GetVMInfo(id) {
            return $http.get('Home/GetVMInfo?Id=' + id);
        }

        function ListAllBoardResources(id) {
            console.log();
            var _API = 'https://management.azure.com/subscriptions/' + id + '/resources?api-version=2015-11-01';
            return $http.get('Home/CallAPI?API=' + _API);
        }

        function GetDBServerProp(id) {
            var _API = 'https://management.azure.com/' + id + '?api-version=2014-04-01-preview';
            return $http.get('Home/CallAPI?API=' + _API);
        }

        function AjaxGet(route,type) {
            return $http.get('Home/CallAPI?API=' + route + '&ApiType=' + type);
        }

        var service = {
            Signin: Signin,
            resources: resources,
            GetVirtualMachines: GetVirtualMachines,
            GetVMInfo: GetVMInfo,
            ListAllBoardResources: ListAllBoardResources,
            GetDBServerProp: GetDBServerProp,
            AjaxGet: AjaxGet
        };

        return service;
    }
})();