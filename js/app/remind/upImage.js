(function() {
	
	var index = 1;
	var size = null;
	var imageIndexIdNum = 0;
	var starIndex = 0;
	var newPost = {
		subcategory: document.getElementById('subcategory'),
		title: document.getElementById('title'),
		content: document.getElementById('content'),
		imageList: document.getElementById('image-list'),
		submitBtn: document.getElementById('submit')
	};
	var url = 'https://service.dcloud.net.cn/feedback';
	newPost.files = [];
	newPost.uploader = null;
	newPost.deviceInfo = null;
	mui.plusReady(function() {
		//设备信息，无需修改
		newPost.deviceInfo = {
			appid: plus.runtime.appid,
			imei: plus.device.imei, //设备标识
			images: newPost.files, //图片文件
			p: mui.os.android ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
			md: plus.device.model, //设备型号
			app_version: plus.runtime.version,
			plus_version: plus.runtime.innerVersion, //基座版本号
			os: mui.os.version,
			net: '' + plus.networkinfo.getCurrentType()
		}
	});
	/**
	 *提交成功之后，恢复表单项 
	 */
	newPost.clearForm = function() {
		newPost.subcategory.value = '';
		newPost.title.value = '';
		newPost.content.value = '';
		newPost.imageList.innerHTML = '';
		newPost.newPlaceholder();
		newPost.files = [];
		index = 0;
		size = 0;
		imageIndexIdNum = 0;
		starIndex = 0;

	};
	newPost.getFileInputArray = function() {
		return [].slice.call(newPost.imageList.querySelectorAll('.file'));
	};
	newPost.addFile = function(path) {
		newPost.files.push({
			name: "images" + index,
			path: path
		});
		index++;
	};
	/**
	 * 初始化图片域占位
	 */
	newPost.newPlaceholder = function() {
		var fileInputArray = newPost.getFileInputArray();
		if(fileInputArray &&
			fileInputArray.length > 0 &&
			fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
			return;
		};
		imageIndexIdNum++;
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		var up = document.createElement("div");
		up.setAttribute('class', 'image-up')
			//删除图片
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		//小X的点击事件
		closeButton.addEventListener('tap', function(event) {
			setTimeout(function() {
				newPost.imageList.removeChild(placeholder);
			}, 0);
			return false;
		}, false);

		//
		var fileInput = document.createElement('div');
		fileInput.setAttribute('class', 'file');
		fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
		fileInput.addEventListener('tap', function(event) {
			var self = this;
			var index = (this.id).substr(-1);
			if(mui.os.plus) {
				var a = [{
					title: "拍照"
				}, {
					title: "从手机相册选择"
				}];
				plus.nativeUI.actionSheet({
					title: "请选择图片位置",
					cancel: "取消",
					buttons: a
				}, function(b) { /*actionSheet 按钮点击事件*/
					switch(b.index) {
						case 0:
							break;
						case 1:
							plus.camera.getCamera().captureImage(function(e) {
								console.log("event:" + e);
								var name = e.substr(e.lastIndexOf('/') + 1);
								console.log("name:" + name);

								plus.zip.compressImage({
									src: e,
									dst: '_doc/' + name,
									overwrite: true,
									quality: 50
								}, function(zip) {
									size += zip.size
									console.log("filesize:" + zip.size + ",totalsize:" + size);
									if(size > (10 * 1024 * 1024)) {
										return mui.toast('文件超大,请重新选择~');
									}
									if(!self.parentNode.classList.contains('space')) { //已有图片
										newPost.files.splice(index - 1, 1, {
											name: "images" + index,
											path: e
										});
									} else { //加号
										placeholder.classList.remove('space');
										newPost.addFile(zip.target);
										newPost.newPlaceholder();
									}
									up.classList.remove('image-up');
									placeholder.style.backgroundImage = 'url(' + zip.target + ')';
								}, function(zipe) {
									mui.toast('压缩失败！')
								});

							}, function(e) {
								mui.toast(e.message);
							}, {});
							break;
						case 2:
							plus.gallery.pick(function(e) {
								console.log("event:" + e);
								var name = e.substr(e.lastIndexOf('/') + 1);
								console.log("name:" + name);

								plus.zip.compressImage({
									src: e,
									dst: '_doc/' + name,
									overwrite: true,
									quality: 50
								}, function(zip) {
									size += zip.size
									console.log("filesize:" + zip.size + ",totalsize:" + size);
									if(size > (10 * 1024 * 1024)) {
										return mui.toast('文件超大,请重新选择~');
									}
									if(!self.parentNode.classList.contains('space')) { //已有图片
										newPost.files.splice(index - 1, 1, {
											name: "images" + index,
											path: e
										});
									} else { //加号
										placeholder.classList.remove('space');
										newPost.addFile(zip.target);
										newPost.newPlaceholder();
									}
									up.classList.remove('image-up');
									placeholder.style.backgroundImage = 'url(' + zip.target + ')';
								}, function(zipe) {
									mui.toast('压缩失败！')
								});

							}, function(e) {
								mui.toast(e.message);
							}, {});
							break;
						default:
							break;
					}
				})
			}

		}, false);
		placeholder.appendChild(closeButton);
		placeholder.appendChild(up);
		placeholder.appendChild(fileInput);
		newPost.imageList.appendChild(placeholder);
	};
	newPost.newPlaceholder();
	newPost.submitBtn.addEventListener('tap', function(event) {

		//判断网络连接
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			return mui.toast("连接网络失败，请稍后再试");
		}
		newPost.send(mui.extend({}, newPost.deviceInfo, {
			content: "hao",
			content: "hao",
			images: newPost.files,
		}))
	}, false)
	newPost.send = function(content) {
		newPost.uploader = plus.uploader.createUpload(url, {
			method: 'POST'
		}, function(upload, status) {
			//			plus.nativeUI.closeWaiting()
			console.log("upload cb:" + upload.responseText);
			if(status == 200) {
				var data = JSON.parse(upload.responseText);
				//上传成功，重置表单
				if(data.ret === 0 && data.desc === 'Success') {
					mui.toast('上传成功~')
					console.log("upload success");
					//					newPost.clearForm();
				}
			} else {
				console.log("upload fail");
			}

		});
		//添加上传数据
		mui.each(content, function(index, element) {
			if(index !== 'images') {
				console.log("addData:" + index + "," + element);
				//				console.log(index);
				newPost.uploader.addData(index, element)
			}
		});
		//添加上传文件
		mui.each(newPost.files, function(index, element) {
			var f = newPost.files[index];
			console.log("addFile:" + JSON.stringify(f));
			newPost.uploader.addFile(f.path, {
				key: f.name
			});
		});
		//开始上传任务
		newPost.uploader.start();

	};

})();