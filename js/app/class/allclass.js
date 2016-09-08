/**
 * 全校班级
 */
mui.init({
	//下拉刷新、上拉加载
	pullRefresh: {
		container: "#allclass", //通过id找到下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		down: {
			contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
			callback: pulldownRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	}
});
mui.plusReady(function() {
	//在body中找到第一个mui-table-view类
	var table = document.body.querySelector('.mui-table-view');
	//生成进入页面后的数据
	for(var i = 0; i < 6; i++) {
		for(var j = 0; j < 6; j++) {
			//创建一个li元素
			var li = document.createElement('li');
			//改变这个li元素的class属性
			li.className = 'mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3';
			//改变这个li元素的html
			li.innerHTML = '<img class="mui-media-object mui-pull-left" src="../../images/qq.png"><div class="mui-media-body">' + (i + 1) + '年级' + (j + 1) + '班 </div>';
			//将li作为table的子节点添加到table中
			table.appendChild(li);
		}
	}
	//通过id找到元素并且添加点击事件
	document.getElementById("finishedschool").addEventListener('tap', function(e) {
		//创建一个新页面
		mui.openWindow({
			url: 'finishedschool.html',
			id: 'finishedschool'
		})
	});
});
//刷新数
var num = 0;
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() { //延时
		//在body中找到第一个mui-table-view类
		var table = document.body.querySelector('.mui-table-view');
		//清空table的html代码
		table.innerHTML = '';
		for(var i = 0; i < 5; i++) {
			for(var j = 0; j < 6; j++) {
				num = num + 1;
				var htmlRefresh = '<img class="mui-media-object mui-pull-left" src="../../images/qq.png"><div class="mui-media-body">' + (i + 1) + '年级' + (j + 1) + '班 ' + '新' + num + '</div>';
				//创建一个li元素
				var li = document.createElement('li');
				//改变这个li元素的class属性
				li.className = 'mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3';
				//改变这个li元素的html
				li.innerHTML = htmlRefresh;
				//下拉刷新，新纪录插到最前面；
				table.appendChild(li);
			}
		}
		//注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
		mui('#allclass').pullRefresh().endPulldownToRefresh();
	}, 500);
}