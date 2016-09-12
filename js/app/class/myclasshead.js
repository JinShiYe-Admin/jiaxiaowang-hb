mui.init({
	subpages: [{
		url: 'myclass.html',
		styles: {
			top: '43px',
			bottom: '0px',
		}
	}]
});
mui.init({
	swipeBack: false
});

var index = 0; //当前显示的列表

mui.plusReady((function() {
	//监听切换列表
	var mslider = document.getElementById('slider');
	mslider.addEventListener('slide', function(e) {
		if(e.detail.slideNumber === 0) { //帖子列表
			changeIndex(0);
		} else if(e.detail.slideNumber === 1) { //作业列表
			changeIndex(1);
		} else if(e.detail.slideNumber === 2) { //相册列表
			changeIndex(2);
		} else if(e.detail.slideNumber === 3) { //成员列表
			changeIndex(3);
		}
	});

}));

function changeIndex(num) {
	var main = plus.webview.getWebviewById('myclass.html');
	mui.fire(main, "changeitem", {
		id: num
	})
}

window.addEventListener("changeitem", function(e) {
	var id = e.detail.id;
	var gallery = mui('.mui-slider');
	gallery.slider().gotoItem(id);
});