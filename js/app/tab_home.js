//提醒界面js

//在mui.init方法中配置的功能包括：创建子页面、关闭页面、手势事件配置、预加载、下拉刷新、上拉加载、设置系统状态栏背景颜色。
mui.init({
	//禁止右滑关闭
	swipeBack: false
});
//若要使用HTML5+扩展api，必须等plusready事件发生后才能正常使用
mui.plusReady(function() {
//.on()方法实现批量元素的事件绑定
//.on(event,selector,handle)

//event
//Type: String
//需监听的事件名称，例如：'tap'

//selector
//Type: String
//选择器

//handler
//Type: Function( Event event )
//事件触发时的回调函数，通过回调中的event参数可以获得事件详情
	mui(".mui-table-view").on('tap', '.mui-table-view-cell', function() {
			//获取id
			var id = this.getAttribute("id");
			switch(id) {

				case "campus_notice":
					mui.openWindow({
						id: 'touPiao',
						url: 'html/remind/campusNotice.html',
						show: {
							aniShow: 'pop-in'
						}
					});
					break;
				case "class_post":
					mui.openWindow({
						id: "classPost",
						url: 'html/remind/classPost.html'
					});
					break;
				case "xiaoBo":
					mui.openWindow({
						id: "xiaoBo",
						url: 'html/application/xiaoBo.html'
					});
					break;
				case "sunshine_sports":
					mui.openWindow({
						id: "sunSports",
						url: 'html/remind/sunSports.html'
					});
					break;

			}

		})
		//点击我的作业
		//addEventListener()方法监听某个特定元素上的事件
	document.getElementById("my_job").addEventListener('tap', function() {
		//获得主页面的webview
		var main = plus.webview.currentWebview().parent();
		//触发主页面的goemai事件
		mui.fire(main, 'goemai');

	});
	/*点击加号触发*/
	document.getElementById('openPopover').addEventListener('tap', function() {
		if(mui.os.plus) {//返回是否在基座中运行
			var a = [{
				title: "班内发帖"
			}, {
				title: "上传照片"
			}];
			plus.nativeUI.actionSheet({
				title: "选择发布内容",
				cancel: "取消",
				buttons: a
			}, function(b) { /*actionSheet 按钮点击事件*/
				switch(b.index) {
					case 0:
						break;
					case 1:
						newPost(); /*班内发帖*/
						break;
					case 2:
						upImage(); /*上传照片*/
						break;
					default:
						break;
				}
			})
		}
	}, false);
	//拍照 
	function newPost() {
		mui.openWindow({
			id: "newPost",
			url: 'html/remind/newPost.html'
		});

	}

	function upImage() {
		mui.openWindow({
			id: "upImage",
			url: 'html/remind/upImage.html'
		});
	}

	//点击左上角图标，打开帮助；
	document.getElementById('help').addEventListener('tap', function() {
		console.log("help");
		//打开登录页面
		mui.openWindow({
			url: 'help.html',
			id: 'help'
		});
	});
});