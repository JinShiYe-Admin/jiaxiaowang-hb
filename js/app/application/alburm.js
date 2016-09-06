mui.init({
	swipeBack: false,
});

var subpages = ['alburm_school.html', 'alburm_my.html'];
var subpage_style = {
	top: '45px',
	bottom: '0px'
};

var aniShow = {};

mui.plusReady(function() {
	//顶部导航
	var header = document.getElementById("header");
	var btn_shool = document.getElementById('alburm_school');
	var btn_my = document.getElementById('alburm_my');

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

//	btn_myclass.innerText = '';
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
		if(activeTab == subpages[0]) { 
			header.appendChild(righticon);
			btn_my.className='mui-btn'
			btn_shool.className = 'mui-btn mui-btn-success';
		} else { //全校班级
			remove('.mui-pull-right')
			
			btn_my.className = 'mui-btn mui-btn-success';
			btn_school.className = 'mui-btn';
		}
	});
});

