mui.init({
	swipeBack: false,
	beforeback: back
});
//设置默认打开首页显示的子页序号；
var Index = 0;
//把子页的路径写在数组里面
var subpages = ['tab_home.html', 'tab_chat.html', 'tab_pengyouquan.html', 'tab_contact.html', 'tab_setting.html'];
var main, menu, mask = mui.createMask(_closeMenu);
var showMenu = false,
	mode = 'main-move';
//所有的plus-*方法写在mui.plusReady中或者后面。
if(!mui.os.android) {
	//整体滑动暂不支持android手机，因为两个页面的移动动画，无法保证同步性；
	document.getElementById("move-togger").classList.remove('mui-hidden');
	var spans = document.querySelectorAll('.android-only');
	for(var i = 0, len = spans.length; i < len; i++) {
		spans[i].style.display = "none";
	}
}
mui.plusReady(function() {
	//获取当前页面所属的Webview窗口对象
	main = plus.webview.currentWebview();
	for(var i = 0; i < 5; i++) {
		//创建webview子页
		var sub = plus.webview.create(
			subpages[i], //子页url
			subpages[i], //子页id
			{
				top: '45px', //设置距离顶部的距离
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
	var activeTab = subpages[Index],
		title = document.querySelector(".mui-title");
	//选项卡点击事件
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		//获取目标子页的id
		var targetTab = this.getAttribute('href');
		if(targetTab == activeTab) {
			return;
		}
		//更换标题
		title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
		//显示目标选项卡
		plus.webview.show(targetTab);
		//隐藏当前选项卡
		plus.webview.hide(activeTab);
		//更改当前活跃的选项卡
		console.trace(targetTab)
		console.trace(activeTab)
		activeTab = targetTab;
	});

	//setTimeout的目的是等待窗体动画结束后，再执行create webview操作，避免资源竞争，导致窗口动画不流畅；
	setTimeout(function() {
		//侧滑菜单默认隐藏，这样可以节省内存；
		menu = mui.preload({
			id: 'bar_menu',
			url: 'bar_menu.html',
			styles: {
				left: 0,
				width: '70%',
				zindex: 9997
			}
		});
	}, 300);
	//点击左上角图标，打开侧滑菜单；
	document.querySelector('.mui-icon-bars').addEventListener('tap', openMenu);
});

function back() {
	if(showMenu) {
		//菜单处于显示状态，返回键应该先关闭菜单,阻止主窗口执行mui.back逻辑；
		closeMenu();
		return false;
	} else {
		//菜单处于隐藏状态，执行返回时，要先close菜单页面，然后继续执行mui.back逻辑关闭主窗口；
		menu.close('none');
		return true;
	}
}
/**
 * 显示菜单菜单
 */
function openMenu() {
	if(!showMenu) {
		//侧滑菜单处于隐藏状态，则立即显示出来；
		//显示完毕后，根据不同动画效果移动窗体；
		menu.show('none', 0, function() {
			switch(mode) {
				case 'main-move':
					//主窗体开始侧滑；
					main.setStyle({
						left: '70%',
						transition: {
							duration: 150
						}
					});
					break;
				case 'menu-move':
					menu.setStyle({
						left: '0%',
						transition: {
							duration: 150
						}
					});
					break;
				case 'all-move':
					main.setStyle({
						left: '70%',
						transition: {
							duration: 150
						}
					});
					menu.setStyle({
						left: '0%',
						transition: {
							duration: 150
						}
					});
					break;
			}
		});
		//显示遮罩
		mask.show();
		showMenu = true;
	}
}
/**
 * 关闭侧滑菜单
 */
function closeMenu() {
	_closeMenu();
	//关闭遮罩
	mask.close();
}

/**
 * 关闭侧滑菜单（业务部分）
 */
function _closeMenu() {
	if(showMenu) {
		//关闭遮罩；
		switch(mode) {
			case 'main-move':
				//主窗体开始侧滑；
				main.setStyle({
					left: '0',
					transition: {
						duration: 150
					}
				});
				break;
			case 'menu-move':
				//主窗体开始侧滑；
				menu.setStyle({
					left: '-70%',
					transition: {
						duration: 150
					}
				});
				break;
			case 'all-move':
				//主窗体开始侧滑；
				main.setStyle({
					left: '0',
					transition: {
						duration: 150
					}
				});
				//menu页面同时移动
				menu.setStyle({
					left: '-70%',
					transition: {
						duration: 150
					}
				});

				break;
		}

		//等窗体动画结束后，隐藏菜单webview，节省资源；
		setTimeout(function() {
			menu.hide();
		}, 200);
		//改变标志位
		showMenu = false;
	}
}

//变换侧滑动画移动效果；
mui('.mui-input-group').on('change', 'input', function() {
	if(this.checked) {
		switch(this.value) {
			case 'main-move':
				//仅主窗口移动的时候，menu页面的zindex值要低一点；
				menu.setStyle({
					left: '0',
					zindex: 9997
				});
				if(mode == 'all-move') {
					menu.setStyle({
						left: '0%'
					});
				}
				mode = 'main-move';
				break;
			case 'menu-move':
				menu.setStyle({
					left: '-70%',
					zindex: 9999
				});
				if(mode == 'all-move') {
					menu.setStyle({
						left: '0%'
					});
				}
				mode = 'menu-move';
				break;
			case 'all-move':
				//切换为整体移动
				//首先改变移动标志
				slideTogether = true;
				//变换menu界面初始化位置，整体移动时，Menu界面left需要在-70%的地方；
				menu.setStyle({
					left: '-70%'
				});
				mode = 'all-move';
				break;
		}
	}
});

//在android4.4中的swipe事件，需要preventDefault一下，否则触发不正常
//故，在dragleft，dragright中preventDefault
window.addEventListener('dragright', function(e) {
	e.detail.gesture.preventDefault();
});
window.addEventListener('dragleft', function(e) {
	e.detail.gesture.preventDefault();
});
//主界面向右滑动，若菜单未显示，则显示菜单；否则不做任何操作；
window.addEventListener("swiperight", openMenu);
//主界面向左滑动，若菜单已显示，则关闭菜单；否则，不做任何操作；
window.addEventListener("swipeleft", closeMenu);
//menu页面向左滑动，关闭菜单；
window.addEventListener("menu:swipeleft", closeMenu);

//重写mui.menu方法，Android版本menu按键按下可自动打开、关闭侧滑菜单；
mui.menu = function() {
	if(showMenu) {
		closeMenu();
	} else {
		openMenu();
	}
}