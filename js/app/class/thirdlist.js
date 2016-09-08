/**
 * 班级页第三个列表
 */
mui.init({
	pullRefresh: {
		container: "#thirdlist", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		up: {
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: pullupRefresh
		},
		down: {
			contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
			callback: pulldownRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	}
});

var html = '<a><div style="position: relative;" class="mui-media-body mui-pull-left"><img src="../../images/shuijiao.jpg" style="height: 61px;"/><p class="focus-text">555张</p></div><div class="mui-media-body" style="padding-left: 20px;">一年级上学期</div><div class="mui-media-body" style="padding-left: 20px;"><span style=" position:absolute;bottom:0px;text-align: left;"><p>李宽<font color="blue">V</font></p><p>09月05日&nbsp;100阅&nbsp;100回</p></span></div></a>';
mui.plusReady((function() {
	var table = document.body.querySelector('.mui-table-view');
	//生成第一个列表的数据
	for(var i = 0; i < 5; i++) {
		var li = document.createElement('li');
		li.className = 'mui-card mui-table-view-cell';
		li.innerHTML = html;
		table.appendChild(li);
	}
	//通过标签名获取元素
	var firstlist = document.getElementsByTagName('html')[0];
	//增加向左滑动事件
	firstlist.addEventListener('swipeleft', function() {
		var main = plus.webview.getWebviewById('html/class/myclass.html');
		//执行main中的changeitems事件
		mui.fire(main, "changeitem", {
			id: 3
		})
	});
	//增加向右滑动事件
	firstlist.addEventListener('swiperight', function() {
		var main = plus.webview.getWebviewById('html/class/myclass.html');
		//执行main中的changeitems事件
		mui.fire(main, "changeitem", {
			id: 1
		})
	});
}));

//刷新数
var num = 0;
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		//下拉刷新
		var table = document.body.querySelector('.mui-table-view');
		table.innerHTML = '';
		for(var i = 0; i < 5; i++) {
			num = num + 1;
			var htmlRefresh = '<a><div style="position: relative;" class="mui-media-body mui-pull-left"><img src="../../images/shuijiao.jpg" style="height: 61px;"/><p class="focus-text">555张</p></div><div class="mui-media-body" style="padding-left: 20px;">一年级上学期' + ' 新 ' + num + '</div><div class="mui-media-body" style="padding-left: 20px;"><span style=" position:absolute;bottom:0px;text-align: left;"><p>李宽<font color="blue">V</font></p><p>09月05日&nbsp;100阅&nbsp;100回</p></span></div></a>';
			var li = document.createElement('li');
			li.className = 'mui-card mui-table-view-cell';
			li.innerHTML = htmlRefresh;
			//下拉刷新，新纪录插到最前面；
			table.appendChild(li);
		}
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 500);
}
//刷新数
var more = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
		var table = document.body.querySelector('.mui-table-view');
		for(var i = 0; i < 10; i++) {
			more = more + 1;
			var li = document.createElement('li');
			var htmlmore = '<a><div style="position: relative;" class="mui-media-body mui-pull-left"><img src="../../images/shuijiao.jpg" style="height: 61px;"/><p class="focus-text">555张</p></div><div class="mui-media-body" style="padding-left: 20px;">一年级上学期' + ' 更多 ' + more + '</div><div class="mui-media-body" style="padding-left: 20px;"><span style=" position:absolute;bottom:0px;text-align: left;"><p>李宽<font color="blue">V</font></p><p>09月05日&nbsp;100阅&nbsp;100回</p></span></div></a>';
			li.className = 'mui-card mui-table-view-cell';
			li.innerHTML = htmlmore;
			table.appendChild(li);
		}
	}, 500);
	this.endPullupToRefresh();
}