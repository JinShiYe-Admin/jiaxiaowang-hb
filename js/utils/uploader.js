/**
 * @author an
 * @param {Object} $ mui
 * @param {Object} owner muiUploader
 */
(function($,owner){
	owner.utask=null;
	owner.uploadOptions={
		method:"POST",//(String) 网络请求类型 仅支持http协议的post请求
		//(number)上传任务每次上传的块大小（仅在支持断点续传的服务有效）
		blocksize:102400,//单位为字节，若设置值小于等于0，则表示不分块上传
		priority:0,//（number） 上传的优先级 ，数值越大，优先级越高
		timeout:120,//(number) 上传任务的超时时间，单位为秒,如果为0，则表示永不超时
		retry:3,//(number)上传任务的重试次数
		retryInterval:30//(number) 上传任务重试间隔时间，单位为秒
	}
	/**
	 * 监听上传任务状态
	 * @param {Object} upload
	 * @param {Object} status
	 */
	owner.onStateChanged=function(upload,status){
		if(upload.state==4&&status==200){
			console.log("Upload success:"+upload.getFileName())
		}else{
			console.log("Upload failed:"+status)
		}
	}
	/**
	 * 创建上传任务
	 * @param {Object} urls (string)必选 要上传文件的目标地址
	 * @param {Object} options (UploadOptions)可选 上传任务的参数
	 * @param {Object} callback (UploadCompletedCallback)可选 上传任务完成回调函数
	 */
	owner.createUploader=function(urls,options,callback){
		utask=plus.uploader.createUpload(urls,options,callback)
		utask.addFile(filePath,fileOptions)
		utask.addData(dataKey,dataValue)
		//如果上传任务已加载回调，不用加载状态监听
	//	utask.addEventListener("statechanged",onStateChanged,false)
		utask.start()
	}
	/**
	 * 上传任务的回调函数
	 * @param {Object} t
	 * @param {Object} status 状态
	 */
	owner.callback=function(t,status){
		if(status==200){
			console.log("Upload success:"+t.url)
		}else{
			console.log("Upload failed:"+status)
		}
	}
	/**
	 * 清除所有上传任务
	 */
	owner.clearUpload=function(){
		plus.uploader.clear()
	}
	/**
	 * 开始所有上传任务
	 */
	owner.startAllUpload=function(){
		plus.uploader.startAll();
	}
	/**
	 * 暂停任务
	 */
	owner.pauseUpload=function(){
		utask.pause()
	}
	/**
	 * 恢复暂停的上传任务
	 */
	owner.resumeUpload=function(){
		utask.resume()
	}
	/**
	 * 取消上传任务
	 */
	function abortUpload=function(){
		utask.abort()
	}
})(mui,window.muiUploader={})
