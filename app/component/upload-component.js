 
myApp.component('uploadFile',{
	  template:'<div class="width-80 pull-left">'
		       +'<ol id="filesPreview"  class="ml0">'
		       +'<li ng-repeat="item in uploadfileinf" style="list-style:none;padding-top:5px;">'				
			   +'<a ng-href="{{basePath}}{{item.ftpPath}}" download={{item.attachmentname}}>{{item.attachmentname}}</a>'
			   +'<i style="padding:5px 8px;color:#f00;font-style:normal;cursor:pointer;" ng-click="deleteUploadfile($index)">[删除]</i>'
		       +'</li>'
	           +'</ol>'
     	       +'<div class="upload-btn" style="padding-bottom:15px;"><input type="file"  nv-file-select  uploader="uploader"  multiple value="1"/></div>'
               +'</div>',
  controller:function($scope,Constants,FileUploader) {
    	     var ctrl=this;
    	     //上传附件
 		      $scope.uploadfileinf =[];
     	 	 //上传文件的类型
			   var type=this.type;
			   //上传文件数量
			   var length=this.length;
			   //上传文件类型
			   var form=this.form; 
			
 		//监听回显
 		  this.$onChanges = function(changes){
 	 		 
 	 		  if(changes.modeifyFile)
 	 			  { 
 	 			  //回显用
 	 		      var modeifyFile=this.modeifyFile;
 	 		    	if(modeifyFile!=null && modeifyFile!=undefined && modeifyFile!="")
 	 		    		{
 	 		    		
 	 		    		$scope.uploadfileinf=JSON.parse(modeifyFile);
 	 		    		//放入上传队列中 	
 	 		    		} 
 	 			   
					}
				if(changes.length)
				{
					length=this.length;

				}
				if(changes.form)
				{
					form=this.form;

				}
				if(changes.type)
				{
					type=this.type;

				}			
 	   		 
 			};
     
    	//这里函数名不能用uploadResult 出现重复错误
        $scope.fileResult=function(uploadResult)
    	  { 
            ctrl.fileResult({uploadResult:uploadResult});
    	  }
     
		var uploader = $scope.uploader = new FileUploader({
	        url :Constants.API.UPLOAD_URL,
	        method: 'POST', 
	        autoUpload:true,
	        formData:[{type:type}]
	    });
		
	 	
		//文件类型过滤器
		  uploader.filters.push({
	        name: 'customFilter',
	        fn: function(item /*{File|FileLikeObject}*/, options) {
	            return this.queue.length < length;
	        }
	    });
	 	   uploader.filters.push({
		       name: 'filetypeFilter',
		        fn: function(item /*{File|FileLikeObject}*/, options) {
		            var type = '|' + item.name.slice(item.name.lastIndexOf('.') + 1) + '|';
		            return form.indexOf(type) !== -1;
		        }
		    });
		   
		   uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
		       console.info('onWhenAddingFileFailed', item, filter, options);
		       if(filter.name=="filetypeFilter")
		    	   {
		    	   
					alert(item.name+"文件格式不符合！");
		    	   }
		       else if(filter.name=="customFilter")
		    	   {
		    	   alert("文件数量超过限制！"); 
		    	   
		    	   }
		        
		   };
		uploader.onSuccessItem = function(fileItem, response, status, headers) {
			console.log(response);
			var uploadFile={
					"rectype":type,
					"attachmentname":response.attachmentname,
					"ftpPath":response.ftpPath
			}
			$scope.uploadfileinf.push(uploadFile);
         	
			ctrl.uploadResult=$scope.uploadfileinf;
			//回调
		    $scope.fileResult($scope.uploadfileinf); 
		 	
	    };
	    uploader.onErrorItem = function(fileItem, response, status, headers) {
	    	alert("文件上传出错,文件过大或者系统错误！");
	   };
	   $scope. deleteUploadfile = function(index){
		     
			  $scope.uploadfileinf.splice(index,1);
			 
			  ctrl.uploadResult=$scope.uploadfileinf;
			  //回调
			  $scope.fileResult($scope.uploadfileinf); 
			  //从上传队列中去除,----回显时从队列中删除,会在控制台报错，无其他影响，未处理。
			  uploader.removeFromQueue(index);
		 	  
		  }
	     //文件下载首路径
	      var downloadPath=Constants.API.DOWNLOAD_URL;
           $scope.basePath=downloadPath;
         
             },
      bindings:{
    	  modeifyFile:'@',
    	  uploadResult:'=',
    	  type:'@',
    	  length:'@',//数量限制
    	  form:'@',//上传文件的类型限制
    	   //通过&绑定父控制器的方法用以实现数据回传
    	  fileResult:'&' 
      }
    });