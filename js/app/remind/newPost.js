(function() {
		mui.init({
			swipBack: false
		})
		mui.plusReady(
			function() {
				//点击未分类
				var subcategory = document.getElementById("subcategory");
				document.getElementById("category").addEventListener('tap', function() {
					console.log(window.images.files.length);
						mui.openWindow({
							id: "category",
							url: 'category.html'
						});

					})
					//选择分类后刷新数据
				window.addEventListener('pageflowrefresh', function(e) {
					console.log(9);
					if(typeof(e.detail.data) !== 'undefined') {
						subcategory.innerText = e.detail.data
					}
					if(typeof(e.detail.subject) !== 'undefined') {
						subcategory.innerText = e.detail.subject
					}

				})
			}
		)
//		var index = 1; //文件name赋值时用到
//		var size = null; //图片大小
//		var imageIndexIdNum = 0;
//		var starIndex = 0;
//		//创建对象newPost 其属性为页面上的元素节点
//		var newPost = {
//			subcategory: document.getElementById('subcategory'), //分类
//			title: document.getElementById('title'), //标题
//			content: document.getElementById('content'), //内容
//			imageList: document.getElementById('image-list'), //图片
//			submitBtn: document.getElementById('submit') //发送按钮
//		};
//		var url = 'http://58.56.66.215:8085/WorkPlanMobileInterface/GetWorkPlanInfoByUnitIDUserIDDate';
//		newPost.files = []; //要上传的图片文件的url地址
//		newPost.uploader = null; //  Uploader模块管理网络上传任务，用于从本地上传各种文件到服务器
//		newPost.deviceInfo = null; //要上传的设备详情
//		mui.plusReady(function() {
//			//设备信息，无需修改
//			newPost.deviceInfo = {
//				appid: plus.runtime.appid,
//				imei: plus.device.imei, //设备标识
//				images: newPost.files, //图片文件
//				p: mui.os.android ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
//				md: plus.device.model, //设备型号
//				app_version: plus.runtime.version,
//				plus_version: plus.runtime.innerVersion, //基座版本号
//				os: mui.os.version,
//				net: '' + plus.networkinfo.getCurrentType()
//			}
//		});
//		/**
//		 *提交成功之后，清空界面数据 
//		 */
//		newPost.clearForm = function() {
//			newPost.subcategory.value = '';
//			newPost.title.value = '';
//			newPost.content.value = '';
//			newPost.imageList.innerHTML = '';
//			newPost.newPlaceholder();
//			newPost.files = [];
//			index = 0;
//			size = 0;
//			imageIndexIdNum = 0;
//			starIndex = 0;
//
//		};
//		//class属性为file的所有元素转化成数组
//		newPost.getFileInputArray = function() {
//			return [].slice.call(newPost.imageList.querySelectorAll('.file'));
//		};
//		//添加文件的url地址 和文件名称
//		newPost.addFile = function(path) {
//			//向数组末尾添加添加一个元素
//			newPost.files.push({
//				name: "images" + index,
//				path: path
//			});
//			index++;
//		};
//		/**
//		 * 初始化图片域占位
//		 */
//		newPost.newPlaceholder = function() {
//
//			var fileInputArray = newPost.getFileInputArray();
//
//			if(fileInputArray &&
//				fileInputArray.length > 0 &&
//				fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
//
//				return;
//			};
//			imageIndexIdNum++;
//			var placeholder = document.createElement('div');
//			placeholder.setAttribute('class', 'image-item space');
//			var up = document.createElement("div");
//			up.setAttribute('class', 'image-up')
//				//删除图片
//			var closeButton = document.createElement('div');
//			closeButton.setAttribute('class', 'image-close');
//			closeButton.innerHTML = 'X';
//			//小X的点击事件
//			closeButton.addEventListener('tap', function(event) {
//				setTimeout(function() {
//					newPost.imageList.removeChild(placeholder);
//				}, 0);
//				return false;
//			}, false);
//
//			//
//			var fileInput = document.createElement('div');
//			fileInput.setAttribute('class', 'file');
//			fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
//			fileInput.addEventListener('tap', function(event) {
//					var self = this;
//					var index = (this.id).substr(-1);
//					if(mui.os.plus) {
//						var a = [{
//							title: "拍照"
//						}, {
//							title: "从手机相册选择"
//						}];
//						plus.nativeUI.actionSheet({
//								title: "请选择图片位置",
//								cancel: "取消",
//								buttons: a
//							}, function(b) { /*actionSheet 按钮点击事件*/
//								switch(b.index) {
//									case 0:
//										break;
//									case 1:
//										//拍照回调函数
//										//							plus.camera.getCamera().captureImage( successCB, errorCB, option );  
//										//第一个是拍照成功的回调，第二个是拍照失败的回调，第三个是拍照的设置，其中一三是必选的。
//										//
//										//拍照成功后会返回文件的url地址，
//										plus.camera.getCamera().captureImage(function(e) { //e：文件的url地址
//											console.log("event:" + e);
//											var name = e.substr(e.lastIndexOf('/') + 1);
//											console.log("name:" + name);
//											//图片压缩转换
//											//
//											//
//											//void plus.zip.compressImage( options, successCB, errorCB);
//											//				
//											//说明：
//											//
//											//可用于图片的质量压缩、大小缩放、方向旋转、区域裁剪、格式转换等。
//											//
//											//参数：
//											//
//											//options: ( CompressImageOptions ) 必选 
//											//图片压缩转换的参数
//											//successCB: ( CompressImageSuccessCallback ) 可选 
//											//图片压缩转换操作成功回调，操作成功时调用。
//											//errorCB: ( ZipErrorCallback ) 可选 
//											//图片压缩转换操作失败回调，操作失败时调用。
//											//返回值：
//											//
//											//void : 无	
//											plus.zip.compressImage({
//											src: e, //压缩转换原始图片的路径
//												dst: '_doc/' + name, //压缩转换目标图片的路径
//												overwrite: true, //覆盖生成新文件
//												quality: 50 //压缩图片的质量 取值范围为1-100，1表示使用最低的图片质量（转换后的图片文件最小）、100表示使用最高的图片质量（转换后的图片文件最大）； 默认值为50
//										}, function(zip) { //图片压缩转换后的图片信息
//											size += zip.size //// 压缩转换后图片的大小，单位为字节（Byte）
//											console.log("filesize:" + zip.size + ",totalsize:" + size);
//											if(size > (10 * 1024 * 1024)) {
//												return mui.toast('文件超大,请重新选择~');
//											}
//											if(!self.parentNode.classList.contains('space')) { //已有图片
//												//替换图片
//												//arrayObject.splice(index,howmany,item1,.....,itemX)
//												//index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
//												//howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
//												//item1, ..., itemX	可选。向数组添加的新项目。
//												newPost.files.splice(index - 1, 1, {
//													name: "images" + index,//index=1 表示第一张图片
//													path: e
//												});
//											} else { //点击加号 
//												placeholder.classList.remove('space');//去掉class属性中的space
//												newPost.addFile(zip.target);// 压缩转换后的图片url路径，以"file://"开头
//												newPost.newPlaceholder();//添加加号图片
//											}
//											up.classList.remove('image-up');
//											placeholder.style.backgroundImage = 'url(' + zip.target + ')';
//										}, function(zipe) {
//											mui.toast('压缩失败！')
//										});
//
//								},
//								function(e) {
//									mui.toast(e.message);
//								}, {});
//							break;
//							case 2:
//								//void plus.gallery.pick(successCB, errorCB, option);
//
//								//说明：从系统相册中选择图片或视频文件。每次仅能选择一个文件，选择后将返回选择的文件路径。
//								//
//								//参数：
//								//
//								//succesCB: ( GalleryPickSuccessCallback | GalleryMultiplePickSuccessCallback ) 必选 从系统相册中选择文件完成后的回调函数，单选时通过GalleryPickSuccessCallback回调函数返回选择的图片或视频文件路径，多选时通过GalleryMultiplePickSuccessCallback回调函数返回图片或视频文件路径。
//								//
//								//errorCB: ( GalleryErrorCallback) 可选 从系统相册中选择文件操作错误的回调函数。
//								//
//								//option: ( GalleryOptions) 可选 设置选择文件的参数
//								//
//								//返回值：void : 无
//								plus.gallery.pick(function(e) { //e:文件路径
//									console.log("event:" + e);
//									var name = e.substr(e.lastIndexOf('/') + 1);
//									console.log("name:" + name);
//
//									plus.zip.compressImage({
//										src: e,
//										dst: '_doc/' + name,
//										overwrite: true,
//										quality: 50
//									}, function(zip) {
//										size += zip.size
//										console.log("filesize:" + zip.size + ",totalsize:" + size);
//										if(size > (10 * 1024 * 1024)) {
//											return mui.toast('文件超大,请重新选择~');
//										}
//										if(!self.parentNode.classList.contains('space')) { //已有图片
//											newPost.files.splice(index - 1, 1, {
//												name: "images" + index,
//												path: e
//											});
//										} else { //加号
//											placeholder.classList.remove('space');
//											newPost.addFile(zip.target);
//											newPost.newPlaceholder();
//										}
//										up.classList.remove('image-up');
//										placeholder.style.backgroundImage = 'url(' + zip.target + ')';
//									}, function(zipe) {
//										mui.toast('压缩失败！')
//									});
//
//								}, function(e) {
//									mui.toast(e.message);
//								}, {});
//								break;
//							default:
//								break;
//						}
//					})
//			}
//
//		}, false);
//		placeholder.appendChild(closeButton); 
//		placeholder.appendChild(up); 
//		placeholder.appendChild(fileInput); 
//		newPost.imageList.appendChild(placeholder);
//};
//
//newPost.newPlaceholder();
//newPost.submitBtn.addEventListener('tap', function(event) {
//	console.log(document.body.innerHTML);
//	//		if(newPost.title.value == '') {
//	//			return mui.toast('标题不能为空');
//	//		}
//	//		if(newPost.content.value == '') {
//	//			return mui.toast('正文不能为空');
//	//		}
//	//
//	//		if(newPost.subcategory.innerHTML == '未分类') {
//	//			return mui.toast('请选择分类');
//	//		}
//
//	//判断网络连接
//	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
//		return mui.toast("连接网络失败，请稍后再试");
//	}
//	//http请求函数 参数是要上传的数据
//	//		将两个对象合并成一个对象。
//	//
//	//.extend( target , object1 [, objectN] )
//	//target
//	//Type: Object
//	//需合并的目标对象
//	//object1
//	//Type: Object
//	//需合并的对象
//	//objectN
//	//Type: Object
//	//需合并的对象
//	newPost.send(mui.extend({}, newPost.deviceInfo, {
//		UnitID: '990',
//		UserID: '701',
//		WorkPlanDate: '2016-9-13',
//	}))
//}, false)
//newPost.send = function(content) {
////Upload plus.uploader.createUpload( url, options, completedCB );
////
////说明：请求上传管理创建新的上传任务，创建成功则返回Upload对象，用于管理上传任务。
////
////参数：
////
////url: ( String ) 必选 要上传文件的目标地址。上传服务器的url地址，仅支持http或https协议。 允许创建多个相同url地址的上传任务。
////
////options: ( UploadOptions ) 可选 上传任务的参数。可通过此参数设置定义上传任务属性，如请求类型、上传优先级等。
////
////completedCB: ( UploadCompletedCallback ) 可选 上传任务完成回调函数。当上传任务提交完成时触发，成功或失败都会触发。
////
////返回值：Upload : Upload对象
//
//newPost.uploader = plus.uploader.createUpload(url, {
//		method: 'POST'
//	},
//	//成功或失败的回调
//	function(upload, status) {
//		//			plus.nativeUI.closeWaiting()
//		console.log("upload cb:" + upload.responseText);
//		if(status == 200) {
//			var data = JSON.parse(upload.responseText); //转成对象类型
//			//上传成功，重置表单
//			if(data.ResultCode == 0) {
//				mui.toast('上传成功~')
//				console.log("upload success");
//				var arr = data.Data; //属性为Data的对象数组
//				console.log(arr[0].sWorkPlace); //数组中第一个对象的sWorkPlace属性的值
//
//				//					newPost.clearForm();
//			}
//		} else {
//			console.log("upload fail");
//		}
//
//	});
////添加上传数据
////		mui.each( obj , handler )
////obj
////Type: Array||JSONObj
////需遍历的对象或数组；若为对象，仅遍历对象根节点下的key
////handler
////Type: Function( Integer||String index,Anything element)
////为每个元素执行的回调函数；其中，index表示当前元素的下标或key，element表示当前匹配元素
////mui(selector).each( handler )
////handler
////Type: Function( Integer index,Element element)
////为每个匹配元素执行的回调函数；其中，index表示当前元素在匹配元素中的位置（下标，从0开始），element表示当前匹配元素，可用this关键字代替
//mui.each(content, function(index, element) {
//	if(index !== 'images') {
//		console.log("addData:" + index + "," + element);
//		//				console.log(index);
//		newPost.uploader.addData(index, element)
//	}
//});
////添加上传文件
//mui.each(newPost.files, function(index, element) {
//	var f = newPost.files[index];
//	console.log("addFile:" + JSON.stringify(f));
//	newPost.uploader.addFile(f.path, {
//		key: f.name
//	});
//});
////开始上传任务
//newPost.uploader.start();
//
//};

})();