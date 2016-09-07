mui.init({
	swipeBack: false,
});
//设置默认打开首页显示的子页序号；
var Index = 0;
//把子页的路径写在数组里面
var subpages = ['tab_home.html', 'tab_class.html', 'tab_application.html', 'tab_me.html'];
//所有的plus-*方法写在mui.plusReady中或者后面。
mui.plusReady(function() {
	//获取当前页面所属的Webview窗口对象
	main = plus.webview.currentWebview();
	for(var i = 0; i < 4; i++) {
		//创建webview子页
		var sub = plus.webview.create(
			subpages[i], //子页url
			subpages[i], //子页id
			{
				top: '0px', //设置距离顶部的距离
				bottom: '50px' //设置距离底部的距离
			}
		);
		//如不是我们设置的默认的子页则隐藏，否则添加到窗口中
		if(i != Index) {
			sub.hide();
		}
		//将webview对象填充到窗口
		main.append(sub);
	}

	//当前激活选项
	var activeTab = subpages[Index]
		//选项卡点击事件
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		//获取目标子页的id
		var targetTab = this.getAttribute('href');
		if(targetTab == activeTab) {
			return;
		}
		//显示目标选项卡
		plus.webview.show(targetTab);
		//隐藏当前选项卡
		plus.webview.hide(activeTab);
		//更改当前活跃的选项卡
		console.trace(targetTab)
		console.trace(activeTab)
		activeTab = targetTab;
	});
				document.addEventListener('goemai', function() {
				var tabclass = document.getElementById("tabclass");
				//模拟首页点击
				mui.trigger(tabclass, 'tap');
				//切换选项卡高亮
				var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
				if (tabclass !== current) {
					current.classList.remove('mui-active');
					tabclass.classList.add('mui-active');
				}
			});
});
