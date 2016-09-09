/**
 * 班级页第四个列表
 */
mui.init({
	pullRefresh: {
		container: "#fourthlist", //通过id找到下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
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

var html = '<a><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src="../../images/logo.png"style="height: 61px;"></div><div class="oa-contact-content" style="padding-left: 20px;"><div><span> <font size="4">庞欢fourthlist</font><font color="orange">V</font><font>[语文]</font></span></div><p class="oa-contact-email mui-h6">夏天的西瓜</p></div><div class="mui-table-cell" style="width: 50px;padding-left: 20px;"><img src="../../images/qq.png" style="height: 61px;"/></div></div></a>';
mui.plusReady((function() {
	//在body中找到第一个mui-table-view类
	var table = document.body.querySelector('.mui-table-view');
	//生成第一个列表的数据
	for(var i = 0; i < 5; i++) {
		//创建一个li元素
		var li = document.createElement('li');
		//改变这个li元素的class属性
		li.className = 'mui-table-view-cell';
		//改变这个li元素的html
		li.innerHTML = html;
		//将li作为table的子节点添加到table中
		table.appendChild(li);
	}
	//通过标签名获取元素
	var firstlist = document.getElementsByTagName('html')[0];
	//增加向右滑动事件
	firstlist.addEventListener('swiperight', function() {
		var main = plus.webview.getWebviewById('html/class/myclass.html');
		//执行main中的changeitems事件
		mui.fire(main, "changeitem", {
			id: 2
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
		//在body中找到第一个mui-table-view类
		var table = document.body.querySelector('.mui-table-view');
		table.innerHTML = '';
		for(var i = 0; i < 5; i++) {
			num = num + 1;
			var htmlRefresh = '<a><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src="../../images/logo.png"style="height: 61px;"></div><div class="oa-contact-content" style="padding-left: 20px;"><div><span> <font size="4">庞欢fourthlist</font><font color="orange">V</font><font>[语文]' + '新' + num + '</font></span></div><p class="oa-contact-email mui-h6">夏天的西瓜</p></div><div class="mui-table-cell" style="width: 50px;padding-left: 20px;"><img src="../../images/qq.png" style="height: 61px;"/></div></div></a>';
			//创建一个li元素
			var li = document.createElement('li');
			//改变这个li元素的class属性
			li.className = 'mui-table-view-cell';
			//改变这个li元素的html
			li.innerHTML = htmlRefresh;
			//将li作为table的子节点添加到table中
			table.appendChild(li);
		}
		//注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
		mui('#fourthlist').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 500);
}
//刷新数
var more = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		//在body中找到第一个mui-table-view类
		var table = document.body.querySelector('.mui-table-view');
		for(var i = 0; i < 10; i++) {
			more = more + 1;
			//创建一个li元素
			var li = document.createElement('li');
			var htmlmore = '<a><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src="../../images/logo.png"style="height: 61px;"></div><div class="oa-contact-content" style="padding-left: 20px;"><div><span> <font size="4">庞欢fourthlist</font><font color="orange">V</font><font>[语文]</font></span></div><p class="oa-contact-email mui-h6">夏天的西瓜' + '更多' + more + '</p></div><div class="mui-table-cell" style="width: 50px;padding-left: 20px;"><img src="../../images/qq.png" style="height: 61px;"/></div></div></a>';
			//改变这个li元素的class属性
			li.className = 'mui-table-view-cell';
			//改变这个li元素的html
			li.innerHTML = htmlmore;
			//将li作为table的子节点添加到table中
			table.appendChild(li);
		}
	}, 500);
	//注意：
	//1、加载完新数据后，必须执行如下代码，true表示没有更多数据了：
	//2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
	//this.endPullupToRefresh(true|false);
	this.endPullupToRefresh();
}