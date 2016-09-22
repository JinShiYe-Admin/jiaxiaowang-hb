/*添加图片功能时引入addimage.js和addimage.css 通过window.images获取所需要的图片数组*/
(function(addimage) {

		var index = 1; //文件name赋值时用到
		var size = null; //图片大小
		var imageIndexIdNum = 0;
		var starIndex = 0;
		addimage.imageList = 
		//创建对象addimage 其属性为页面上的元素节点

		addimage.imageList = document.getElementById('image-list'), //图片
		addimage.files = []; //要上传的图片文件的url地址
		addimage.uploader = null; //  Uploader模块管理网络上传任务，用于从本地上传各种文件到服务器


		//class属性为file的所有元素转化成数组
		addimage.getFileInputArray = function() {
			return [].slice.call(addimage.imageList.querySelectorAll('.file'));
		};
		//添加文件的url地址 和文件名称
		addimage.addFile = function(path) {
			//向数组末尾添加添加一个元素
			addimage.files.push({
				name: "images" + index,
				path: path
			});
			index++;
		};
		/**
		 * 初始化图片域占位
		 */
		addimage.newPlaceholder = function() {

			var fileInputArray = addimage.getFileInputArray();

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
					addimage.imageList.removeChild(placeholder);
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
										//拍照回调函数
										//							plus.camera.getCamera().captureImage( successCB, errorCB, option );  
										//第一个是拍照成功的回调，第二个是拍照失败的回调，第三个是拍照的设置，其中一三是必选的。
										//
										//拍照成功后会返回文件的url地址，
										plus.camera.getCamera().captureImage(function(e) { //e：文件的url地址
											console.log("event:" + e);
											var name = e.substr(e.lastIndexOf('/') + 1);
											console.log("name:" + name);
											//图片压缩转换
											//
											//
											//void plus.zip.compressImage( options, successCB, errorCB);
											//				
											//说明：
											//
											//可用于图片的质量压缩、大小缩放、方向旋转、区域裁剪、格式转换等。
											//
											//参数：
											//
											//options: ( CompressImageOptions ) 必选 
											//图片压缩转换的参数
											//successCB: ( CompressImageSuccessCallback ) 可选 
											//图片压缩转换操作成功回调，操作成功时调用。
											//errorCB: ( ZipErrorCallback ) 可选 
											//图片压缩转换操作失败回调，操作失败时调用。
											//返回值：
											//
											//void : 无	
											plus.zip.compressImage({
											src: e, //压缩转换原始图片的路径
												dst: '_doc/' + name, //压缩转换目标图片的路径
												overwrite: true, //覆盖生成新文件
												quality: 50 //压缩图片的质量 取值范围为1-100，1表示使用最低的图片质量（转换后的图片文件最小）、100表示使用最高的图片质量（转换后的图片文件最大）； 默认值为50
										}, function(zip) { //图片压缩转换后的图片信息
											size += zip.size //// 压缩转换后图片的大小，单位为字节（Byte）
											console.log("filesize:" + zip.size + ",totalsize:" + size);
											if(size > (10 * 1024 * 1024)) {
												return mui.toast('文件超大,请重新选择~');
											}
											if(!self.parentNode.classList.contains('space')) { //已有图片
												//替换图片
												//arrayObject.splice(index,howmany,item1,.....,itemX)
												//index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
												//howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
												//item1, ..., itemX	可选。向数组添加的新项目。
												addimage.files.splice(index - 1, 1, {
													name: "images" + index,//index=1 表示第一张图片
													path: e
												});
											} else { //点击加号 
												placeholder.classList.remove('space');//去掉class属性中的space
												addimage.addFile(zip.target);// 压缩转换后的图片url路径，以"file://"开头
												addimage.newPlaceholder();//添加加号图片
											}
											up.classList.remove('image-up');
											placeholder.style.backgroundImage = 'url(' + zip.target + ')';
										}, function(zipe) {
											mui.toast('压缩失败！')
										});

								},
								function(e) {
									mui.toast(e.message);
								}, {});
							break;
							case 2:
								//void plus.gallery.pick(successCB, errorCB, option);

								//说明：从系统相册中选择图片或视频文件。每次仅能选择一个文件，选择后将返回选择的文件路径。
								//
								//参数：
								//
								//succesCB: ( GalleryPickSuccessCallback | GalleryMultiplePickSuccessCallback ) 必选 从系统相册中选择文件完成后的回调函数，单选时通过GalleryPickSuccessCallback回调函数返回选择的图片或视频文件路径，多选时通过GalleryMultiplePickSuccessCallback回调函数返回图片或视频文件路径。
								//
								//errorCB: ( GalleryErrorCallback) 可选 从系统相册中选择文件操作错误的回调函数。
								//
								//option: ( GalleryOptions) 可选 设置选择文件的参数
								//
								//返回值：void : 无
								plus.gallery.pick(function(e) { //e:文件路径
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
											addimage.files.splice(index - 1, 1, {
												name: "images" + index,
												path: e
											});
										} else { //加号
											placeholder.classList.remove('space');
											addimage.addFile(zip.target);
											addimage.newPlaceholder();
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
		addimage.imageList.appendChild(placeholder);
};

addimage.newPlaceholder();

})(window.images={});
