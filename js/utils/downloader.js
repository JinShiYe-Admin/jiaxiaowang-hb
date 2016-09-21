/**
 * @author an
 * @param {Object} $ mui
 * @param {Object} owner sownloader
 */
(function($, owner) {
	owner.dtask = null;
	//下载任务参数
	owner.downloadOptions={
		method:"GET"||"POST",//网络请求类型
		data:"",//POST请求时提交的数据
		filename:"",//下载文件请求的路径
		prioprity:0,//下载任务的优先级 数字越大，优先级越高
		timeout:15,//下载任务超时时间，单位是秒
		retry:3,//下载任务的重试次数
		retyInterval:30//下载任务的重试时间间隔
	}
	/**
	 * 创建下载任务
	 * @param {Object} urls  ( String ) 必选 要下载文件资源地址 
	 * 要下载文件的url地址，仅支持网络资源地址，支持http或https协议。 允许创建多个相同url地址的下载任务
	 * @param {Object} options 可选 下载任务的参数
	 * 可通过此参数设置下载任务属性，如保存文件路径、下载优先级等
	 * @param {Object} callback  可选 下载任务完成回调函数
	 * 当下载任务下载完成时触发，成功或失败都会触发。
	 */
	owner.createDownload = function(urls, options, callback) {
			dtask = plus.downloader.createDownload(urls,options,callback)
			//加载状态监听 如果加载这个方法 就不用 callback参数
			//"statechanged": (String 类型 )下载任务状态变化事件
//			dtask.addEventListener( "statechanged", onStateChanged, false );
			dtask.start(); 
		}
	/**
	 * 下载的回调函数
	 * @param {Object} file 下载的文件
	 * @param {Object} status 下载状态
	 */
	owner.callback = function(file, status) {
			if(status == 200) {
				console.log("download success" + file.filename)
			} else {
				console.log("download failed" + status)
			}
		}
	/**
	 * 清除指定状态的下载任务
	 * @param {Object} state 可选 清除下载任务的状态
	 * 如果未指定state值，则清除所有未完成的下载任务。
	 */
	owner.clear = function(state) {
			plus.downloader.clear(state)
		}
	/**
	 * 开始所有下载任务
	 * 开始所有处于为开始调度或暂停状态的下载任务。 若下载任务数超过可并发处理的总数，
	 * 超出的任务处于调度状态（等待下载），当有任务完成时根据调度状态任务的优先级选择任务开始下载。
	 */
	owner.startAll = function() {
			plus.downloader.startAll()
		}
	/**
	 * 暂停下载任务
	 */
	owner.pauseDownload = function() {
			dtask.pause();
		}
	/**
	 * 恢复暂停的下载任务
	 */
	owner.resumeDownload=function(){
		  dtask.resume()
	}
	/**
	 * 取消下载任务
	 */
	owner.abortDownload = function() {
			dtask.abort()
		}
	// 监听下载任务状态 
	owner.onStateChanged = function(download, status) {
		// 下载完成 
		if(download.state == 4 && status == 200) {
			console.log("Download success: " + download.getFileName());
		//下载失败
		}else{
			console.log("Download failed:"+status)
		}
	}

})(mui, window.muiDownloader = {})