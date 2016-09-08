mui.init({
	pullRefresh: {
		container: "#firstlist", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		up: {
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: "没有更多数据了", //可选，请求完毕若没有更多数据时显示的提醒内容；
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

//有荐，精，顶图标
var html1 = '<a><img class="mui-media-object mui-pull-left" src="../../images/logo.png"><div class="mui-media-body"><span><div class="mui-ellipsis"><font color="red">荐&nbsp;</font><font color="green">&nbsp;精&nbsp;</font><font color="orange">&nbsp;顶&nbsp;</font><font>&nbsp;一二三四五六七八九十一二三四五六七八九十</font></div></span><p><span><div class="mui-ellipsis"><font>小熊猫</font><font color="blue">V&nbsp;</font><font>09月06日&nbsp;阅100&nbsp;回100</font></div></span></p></div></a>';
//没有荐，精，顶图标
var html12 = '<a><img class="mui-media-object mui-pull-left" src="../../images/logo.png"><div class="mui-media-body"><span><div class="mui-ellipsis"><font>&nbsp;一二三四五六七八九十一二三四五六七八九十</font></div></span><p><span><div class="mui-ellipsis"><font>小熊猫</font><font color="blue">V&nbsp;</font><font>09月06日&nbsp;阅100&nbsp;回100</font></div></span></p></div></a>';
mui.plusReady((function() {
	var table = document.body.querySelector('.mui-table-view');
	//生成第一个列表的数据
	for(var i = 0; i < 5; i++) {
		var li = document.createElement('li');
		li.className = 'mui-table-view-cell mui-media';
		li.innerHTML = html1;
		table.appendChild(li);
	}
	for(var i = 0; i < 5; i++) {
		var li2 = document.createElement('li');
		li2.className = 'mui-table-view-cell mui-media';
		li2.innerHTML = html12;
		table.appendChild(li2);
	}
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
			var htmlRefresh = '<a><img class="mui-media-object mui-pull-left" src="../../images/logo.png"><div class="mui-media-body"><span><div class="mui-ellipsis"><font color="red">新&nbsp;' + num + '</font><font color="red">荐&nbsp;</font><font color="green">&nbsp;精&nbsp;</font><font color="orange">&nbsp;顶&nbsp;</font><font>&nbsp;一二三四五六七八九十一二三四五六七八九十</font></div></span><p><span><div class="mui-ellipsis"><font>小熊猫</font><font color="blue">V&nbsp;</font><font>09月06日&nbsp;阅100&nbsp;回100</font></div></span></p></div></a>';
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell mui-media';
			li.innerHTML = htmlRefresh;
			//下拉刷新，新纪录插到最前面；
			table.appendChild(li);
		}
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 500);
}
//刷新数
var more = 0;
var count = 0;
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
			var htmlmore = '<a><img class="mui-media-object mui-pull-left" src="../../images/logo.png"><div class="mui-media-body"><span><div class="mui-ellipsis"><font color="red">更多&nbsp;' + more + '</font><font>&nbsp;一二三四五六七八九十一二三四五六七八九十</font></div></span><p><span><div class="mui-ellipsis"><font>小熊猫</font><font color="blue">V&nbsp;</font><font>09月06日&nbsp;阅100&nbsp;回100</font></div></span></p></div></a>';
			li.className = 'mui-table-view-cell mui-media';
			li.innerHTML = htmlmore;
			table.appendChild(li);
		}
	}, 500);
	 this.endPullupToRefresh();
}
