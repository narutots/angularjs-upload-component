'use strict'; 
angular.module('uploadFileTest', [])
.controller('uploadFileTestCtrl', function($scope) {
      
    var result=[];
     $scope.uploadResult=[];
    //回传数据方式1，方法回调 
     $scope.uploadFileList=function(uploadResult)
     {  result=uploadResult; 
     }
     // 回传数据方式2，数据绑定
     result= $scope.uploadResult;
 
   

});