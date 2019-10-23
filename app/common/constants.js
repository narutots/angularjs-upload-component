
'use.strict'
angular.module('services.common.constants',[])
	.service('Constants',[function(){
		var _API = {
			    //上传接口
				UPLOAD_URL:"http://192.168.1.106:8090/mmdp/a/test/testUpload/upload",  
			    //文件下载基路径
				DOWNLOAD_URL:"http://" + window.location.host+"/",
				 
			}; 
			var constants = {
				API : _API
			};
	  	
		return constants;
	}]);