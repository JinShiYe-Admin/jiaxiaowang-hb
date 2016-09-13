mui.init({
	swipeBack: false,
});

var subpages = ['html/class/myclasshead.html', 'html/class/allclass.html'];
var subpage_style = {
	top: '45px',
	bottom: '0px'
};

var aniShow = {};

mui.plusReady(function() {
	//顶部导航
	var header = document.getElementById("header");
	var btn_allclass = document.getElementById('allclass');
	var btn_myclass = document.getElementById('myclass');
	//创建右上角按钮
	var righticon = document.createElement('a');
	righticon.className = 'mui-icon mui-action-menu mui-icon-plusempty mui-pull-right';
	righticon.id = 'picture-btn';
	//移除右上角按钮
	function remove(selector) {
		var elem = header.querySelector(selector);
		if(elem) {
			header.removeChild(elem);
		}
	}
	//创建子页面，首个选项卡页面显示，其它均隐藏；
	var self = plus.webview.currentWebview();
	for(var i = 0; i < 2; i++) {
		var temp = {};
		var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
		if(i > 0) {
			sub.hide();
		} else {
			temp[subpages[i]] = "true";
			mui.extend(aniShow, temp);
		}
		self.append(sub);
	}
	header.appendChild(righticon); //增加右上角按钮
	addrighticonlistener(); //增加右上角按钮监听事件
	btn_myclass.innerText = '一年级一班';
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
});

function addrighticonlistener() {
	//增加右上角按钮监听事件
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
					upImage();/*上传照片*/
					break;
			}
			console.log("你刚点击了：" + text);
		});
	});
}
                //拍照 
        function newPost() { 
	mui.openWindow({
    id:"newPost",
    url:'html/remind/newPost.html'
});

        } 
                function upImage() { 
	mui.openWindow({
    id:"upImage",
    url:'html/remind/upImage.html'
});
}