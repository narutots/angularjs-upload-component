# angularjs-upload-component
a uploadcomponent with angularjs1.X and angular-file-upload

基于angularjs1.x和angular-file-upload的附件上传组件 
==================================================
实例项目使用https://github.com/angular/angular-seed模板搭建

项目下载启动:<br>
--
 >git clone https://github.com/narutots/angularjs-upload-component.git<br>
 >angularjs-upload-component<br>
 >npm install<br>
 >npm start<br>
 
上传组件使用:<br>
--
>入口页面引入upload-component.js<br>
>修改上传路径和下载基路径constants.js
```
//上传接口
UPLOAD_URL:"http://192.168.1.106:8090/test/test/testUpload/upload",  
//文件下载基路径
DOWNLOAD_URL:"http://" + window.location.host+"/"				 
```
>页面使用：
```
<upload-file file-result="uploadFileList(uploadResult)"  upload-result="uploadResult" modeify-file='{{modeifyFile}}' type='test' length='2' form='|docx|doc|pdf|zip|pptx|ppt|'></upload-file>
```
> 回传用： file-result或者upload-result<br> 
>回显用：modeify-file <br> 
>附件类型: type<br> 
>数量限制:length<br> 
>文件类型限制：form<br> 
>上传文件后台接口返回数据格式
```
{
	"rectype": "1",
	"attachmentname": "***.docx",
	"ftpPath": "download\\1\\11571821916800\\**.docx"
}
```
>后台接口参考[这里](https://blog.csdn.net/narutots/article/details/78481475)

 
 
