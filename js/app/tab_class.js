/**
 * 作者：莫尚霖
 * 时间：2016-9-13
 * 描述：tab_class.html作为父页面，通过顶部导航的两个按钮控制两个子页面切换
 */

mui.init();
//把子页的路径写在数组里面（我的班级，全校班级 ）两个子页面
var subpages = ['html/class/myclasshead.html', 'html/class/allclass.html'];
var subpage_style = { //子页面样式
	top: '45px', //设置距离顶部的距离
	bottom: '0px' //设置距离底部的距离
};
var aniShow = {};

mui.plusReady(function() {
	//顶部导航
	var header = document.getElementById("header");
	var btn_allclass = document.getElementById('allclass');
	var btn_myclass = document.getElementById('myclass');
	//创建右上角按钮
	var righticon = document.createElement('a');
	//设置按钮的class
	righticon.className = 'mui-icon mui-action-menu mui-icon-plusempty mui-pull-right';
	//设置按钮的id
	righticon.id = 'picture-btn';
	//移除header的一个子节点，这里用来移除右上角的加号
	function remove(selector) {
		//获取header中第一个selector元素
		var elem = header.querySelector(selector);
		if(elem) {
			//移除header的子节点elem
			header.removeChild(elem);
		}
	}

	//创建子页面，首个选项卡页面显示，其它均隐藏；
	//获取当前页面所属的Webview窗口对象
	var self = plus.webview.currentWebview();
	for(var i = 0; i < 2; i++) {
		var temp = {};
		//创建webview子页
		var sub = plus.webview.create(
			subpages[i], //子页url
			subpages[i], //子页id
			subpage_style);
		if(i > 0) {
			sub.hide(); //首个选项卡页面显示，其它均隐藏
		} else {
			temp[subpages[i]] = "true";
			mui.extend(aniShow, temp);
		}
		self.append(sub);
	}
	header.appendChild(righticon); //在导航增加右上角按钮
	addrighticonlistener(); //增加右上角按钮监听事件
	btn_myclass.innerText = '一年级一班'; //将我的班级设置为一年级一班

	var activeTab = subpages[0]; //当前激活选项
	//增加顶部导航两个选项监听事件
	mui('.mui-bar-nav').on('tap', 'button', function(e) {
		var targetTab = this.getAttribute('href');
		if(targetTab == activeTab) {
			return;
		}
		//显示目标选项卡
		//若为iOS平台或非首次显示，则直接显示
		if(mui.os.ios || aniShow[targetTab]) {
			plus.webview.show(targetTab);
		} else {
			//否则，使用fade-in动画，且保存变量
			var temp = {};
			temp[targetTab] = "true";
			mui.extend(aniShow, temp);
			plus.webview.show(targetTab, "fade-in", 300);
		}

		//隐藏当前;
		plus.webview.hide(activeTab);
		//更改当前活跃的选项卡
		activeTab = targetTab;
		if(activeTab == subpages[0]) { //我的班级
			header.appendChild(righticon);
			btn_myclass.innerText = '一年级一班';
			btn_allclass.className = 'mui-btn ';
			btn_myclass.className = 'mui-btn mui-btn-success';
		} else { //全校班级
			remove('.mui-pull-right')
			btn_myclass.innerText = '我的班级';
			btn_allclass.className = 'mui-btn mui-btn-success';
			btn_myclass.className = 'mui-btn';
		}
	});

	//进入对数据库操作
	document.getElementById('mydb').addEventListener('tap',function () {
	        mui.openWindow({
	        	url:'html/db/mydb.html'
	        })
	})
});

/**
 * 增加右上角按钮监听事件
 */
function addrighticonlistener() {
	//增加右上角按钮点击事件
	document.getElementById("picture-btn").addEventListener('tap', function() {
		var btnArray = [{
			title: "班内发帖"
		}, {
			title: "上传照片"
		}];
		plus.nativeUI.actionSheet({
			title: "选择发布内容",
			cancel: "取消",
			buttons: btnArray
		}, function(e) {
			var index = e.index;
			var text = "";
			switch(index) {
				case 0:
					text += "取消";
					break;
				case 1:
					text += "班内发帖";
					newPost(); /*班内发帖*/
					break;
				case 2:
					text += "上传照片";
					upImage(); /*上传照片*/
					break;
			}
		});
	});
}
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